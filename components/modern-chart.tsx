"use client"

import { useEffect, useRef, useState } from "react"
import { format } from "date-fns"

interface ModernChartProps {
  data: any[]
  timeframe: string
}

export function ModernChart({ data, timeframe }: ModernChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [hoveredPoint, setHoveredPoint] = useState<any>(null)
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)

  // Bepaal chart type gebaseerd op timeframe
  const isLongTimeframe = ["1Y", "5Y", "ALL"].includes(timeframe)
  const chartType = isLongTimeframe ? "line" : "candlestick"

  // Process data
  const chartData = data
    .map((item) => ({
      ...item,
      date: new Date(item.date),
      open: Number(item.open) || Number(item.close) || 0,
      high: Number(item.high) || Number(item.close) || 0,
      low: Number(item.low) || Number(item.close) || 0,
      close: Number(item.close) || 0,
      volume: Number(item.volume) || 0,
    }))
    .filter((item) => !isNaN(item.date.getTime()) && item.close > 0)
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const container = canvas.parentElement
        if (container) {
          const { width, height } = container.getBoundingClientRect()
          setChartDimensions({ width, height })
          canvas.width = width * window.devicePixelRatio
          canvas.height = height * window.devicePixelRatio
          canvas.style.width = `${width}px`
          canvas.style.height = `${height}px`
          drawChart()
        }
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Reset offset and scale when timeframe changes
  useEffect(() => {
    setOffset({ x: 0, y: 0 })
    setScale(1)
  }, [timeframe])

  // Redraw when data or options change
  useEffect(() => {
    drawChart()
  }, [data, timeframe, chartDimensions, offset, scale])

  // Mouse event handlers
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Find nearest point
      const pointIndex = findNearestPointIndex(x)
      if (pointIndex >= 0 && pointIndex < chartData.length) {
        setHoveredPoint(chartData[pointIndex])

        // Position tooltip
        if (tooltipRef.current) {
          tooltipRef.current.style.left = `${e.clientX + 15}px`
          tooltipRef.current.style.top = `${e.clientY - 10}px`
        }
      } else {
        setHoveredPoint(null)
      }

      // Handle dragging
      if (isDragging) {
        const dx = e.clientX - dragStart.x
        setOffset((prev) => ({ ...prev, x: prev.x + dx }))
        setDragStart({ x: e.clientX, y: e.clientY })
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      setDragStart({ x: e.clientX, y: e.clientY })
      canvas.style.cursor = "grabbing"
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      canvas.style.cursor = "crosshair"
    }

    const handleMouseLeave = () => {
      setHoveredPoint(null)
      setIsDragging(false)
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left

      // Calculate zoom factor
      const zoomIntensity = 0.1
      const zoomFactor = e.deltaY < 0 ? 1 + zoomIntensity : 1 - zoomIntensity

      // Limit scale
      const newScale = Math.min(Math.max(scale * zoomFactor, 1), 10)

      // Adjust offset to zoom toward mouse position
      const scaleChange = newScale - scale
      const offsetChange = (mouseX - offset.x) * (scaleChange / scale)

      setScale(newScale)
      setOffset((prev) => ({
        ...prev,
        x: prev.x - offsetChange,
      }))
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("wheel", handleWheel)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("wheel", handleWheel)
    }
  }, [chartData, isDragging, dragStart, offset, scale])

  // Find nearest point to mouse position
  const findNearestPointIndex = (mouseX: number) => {
    if (chartData.length === 0) return -1

    const { width } = chartDimensions
    const padding = { left: 60, right: 60 }
    const plotWidth = width - padding.left - padding.right

    // Calculate visible data range
    const visibleDataCount = chartData.length
    const startIdx = Math.max(0, Math.floor(-offset.x / (plotWidth / visibleDataCount)))
    const endIdx = Math.min(
      chartData.length,
      startIdx + Math.ceil((plotWidth / (plotWidth / visibleDataCount)) * scale),
    )

    // Convert mouse position to data index
    const dataRange = endIdx - startIdx
    const positionInPlot = mouseX - padding.left
    const indexOffset = (positionInPlot / plotWidth) * dataRange
    const index = Math.round(startIdx + indexOffset)

    return Math.max(0, Math.min(chartData.length - 1, index))
  }

  // Draw the chart
  const drawChart = () => {
    const canvas = canvasRef.current
    if (!canvas || chartData.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = chartDimensions
    const dpr = window.devicePixelRatio
    const padding = { top: 20 * dpr, right: 60 * dpr, bottom: 40 * dpr, left: 60 * dpr }
    const plotWidth = width * dpr - padding.left - padding.right
    const plotHeight = height * dpr - padding.top - padding.bottom

    // Clear canvas
    ctx.clearRect(0, 0, width * dpr, height * dpr)

    // Set high-quality rendering
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"

    // Sample data voor lange timeframes
    let processedData = chartData
    if (timeframe === "ALL" && chartData.length > 200) {
      const step = Math.ceil(chartData.length / 200)
      processedData = chartData.filter((_, index) => index % step === 0)
    } else if (timeframe === "5Y" && chartData.length > 150) {
      const step = Math.ceil(chartData.length / 150)
      processedData = chartData.filter((_, index) => index % step === 0)
    } else if (timeframe === "1Y" && chartData.length > 100) {
      const step = Math.ceil(chartData.length / 100)
      processedData = chartData.filter((_, index) => index % step === 0)
    }

    // Find min/max prices
    const minPrice = Math.min(...processedData.map((d) => (chartType === "line" ? d.close : d.low)))
    const maxPrice = Math.max(...processedData.map((d) => (chartType === "line" ? d.close : d.high)))
    const priceRange = maxPrice - minPrice
    const pricePadding = priceRange * 0.05

    // Scale functions
    const scaleX = (index: number) => {
      return padding.left + (index / (processedData.length - 1)) * plotWidth
    }

    const scaleY = (price: number) => {
      return (
        padding.top + plotHeight - ((price - (minPrice - pricePadding)) / (priceRange + 2 * pricePadding)) * plotHeight
      )
    }

    // Draw grid
    ctx.strokeStyle = "#374151"
    ctx.lineWidth = 1
    ctx.setLineDash([2, 4])
    ctx.globalAlpha = 0.3

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (i / 5) * plotHeight
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width * dpr - padding.right, y)
      ctx.stroke()
    }

    // Vertical grid lines
    const numVerticalLines = 8
    for (let i = 0; i <= numVerticalLines; i++) {
      const x = padding.left + (i / numVerticalLines) * plotWidth
      ctx.beginPath()
      ctx.moveTo(x, padding.top)
      ctx.lineTo(x, height * dpr - padding.bottom)
      ctx.stroke()
    }

    ctx.setLineDash([])
    ctx.globalAlpha = 1.0

    // Draw axes
    ctx.strokeStyle = "#6b7280"
    ctx.lineWidth = 1

    // X-axis
    ctx.beginPath()
    ctx.moveTo(padding.left, height * dpr - padding.bottom)
    ctx.lineTo(width * dpr - padding.right, height * dpr - padding.bottom)
    ctx.stroke()

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, height * dpr - padding.bottom)
    ctx.stroke()

    if (chartType === "line") {
      // Draw line chart voor lange timeframes
      ctx.strokeStyle = "#f59e0b"
      ctx.lineWidth = 2 * dpr
      ctx.beginPath()

      processedData.forEach((d, i) => {
        const x = scaleX(i)
        const y = scaleY(d.close)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()

      // Draw area fill
      ctx.fillStyle = "#f59e0b20"
      ctx.beginPath()
      processedData.forEach((d, i) => {
        const x = scaleX(i)
        const y = scaleY(d.close)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.lineTo(scaleX(processedData.length - 1), height * dpr - padding.bottom)
      ctx.lineTo(scaleX(0), height * dpr - padding.bottom)
      ctx.closePath()
      ctx.fill()

      // Draw points
      ctx.fillStyle = "#f59e0b"
      processedData.forEach((d, i) => {
        const x = scaleX(i)
        const y = scaleY(d.close)
        ctx.beginPath()
        ctx.arc(x, y, 3 * dpr, 0, 2 * Math.PI)
        ctx.fill()
      })
    } else {
      // Draw candlesticks voor korte timeframes
      const candleWidth = Math.max((plotWidth / processedData.length) * 0.7, 4 * dpr)

      processedData.forEach((d, i) => {
        const x = scaleX(i)
        const open = scaleY(d.open)
        const close = scaleY(d.close)
        const high = scaleY(d.high)
        const low = scaleY(d.low)

        const isGreen = d.close >= d.open
        ctx.strokeStyle = isGreen ? "#10b981" : "#ef4444"
        ctx.fillStyle = isGreen ? "#10b981" : "#ef4444"

        // Draw wick
        ctx.beginPath()
        ctx.moveTo(x, high)
        ctx.lineTo(x, low)
        ctx.stroke()

        // Draw body
        const candleX = x - candleWidth / 2
        const candleY = Math.min(open, close)
        const candleHeight = Math.max(Math.abs(close - open), 1)

        if (isGreen) {
          ctx.fillRect(candleX, candleY, candleWidth, candleHeight)
        } else {
          ctx.strokeRect(candleX, candleY, candleWidth, candleHeight)
        }
      })
    }

    // Draw X-axis labels
    ctx.fillStyle = "#9ca3af"
    ctx.font = `${11 * dpr}px ui-monospace, monospace`
    ctx.textAlign = "center"
    ctx.textBaseline = "top"

    const labelStep = Math.max(Math.floor(processedData.length / 8), 1)
    const dateFormat = getDateFormat()

    for (let i = 0; i < processedData.length; i += labelStep) {
      const x = scaleX(i)
      const date = processedData[i].date
      ctx.fillText(format(date, dateFormat), x, height * dpr - padding.bottom + 10 * dpr)
    }

    // Draw Y-axis labels
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"

    for (let i = 0; i <= 5; i++) {
      const price = minPrice - pricePadding + (i / 5) * (priceRange + 2 * pricePadding)
      const y = scaleY(price)
      const formattedPrice = price >= 1000 ? `${(price / 1000).toFixed(1)}k` : price.toFixed(0)
      ctx.fillText(formattedPrice, padding.left - 10 * dpr, y)
    }

    // Draw crosshair if hovering
    if (hoveredPoint) {
      const hoverIndex = processedData.indexOf(hoveredPoint)
      if (hoverIndex >= 0) {
        const x = scaleX(hoverIndex)
        const y = scaleY(hoveredPoint.close)

        ctx.strokeStyle = "#9ca3af"
        ctx.lineWidth = 1
        ctx.setLineDash([4, 4])
        ctx.globalAlpha = 0.5

        // Vertical line
        ctx.beginPath()
        ctx.moveTo(x, padding.top)
        ctx.lineTo(x, height * dpr - padding.bottom)
        ctx.stroke()

        // Horizontal line
        ctx.beginPath()
        ctx.moveTo(padding.left, y)
        ctx.lineTo(width * dpr - padding.right, y)
        ctx.stroke()

        ctx.setLineDash([])
        ctx.globalAlpha = 1.0
      }
    }
  }

  // Get date format based on timeframe
  const getDateFormat = () => {
    switch (timeframe) {
      case "1D":
        return "HH:mm"
      case "1W":
        return "EEE"
      case "1M":
        return "dd MMM"
      case "3M":
      case "6M":
        return "dd MMM"
      case "1Y":
        return "MMM yyyy"
      default:
        return "yyyy"
    }
  }

  if (!chartData || chartData.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center">
        <p className="text-gray-400">No data available</p>
      </div>
    )
  }

  return (
    <div className="relative h-96 w-full">
      {/* Chart type indicator */}
      <div className="absolute top-2 left-2 text-xs text-gray-500">
        {chartType === "line" ? "📈 Line Chart" : "🕯️ Candlestick"} • Drag to pan • Scroll to zoom
      </div>

      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" style={{ touchAction: "none" }} />

      {/* Floating tooltip */}
      {hoveredPoint && (
        <div
          ref={tooltipRef}
          className="fixed z-50 bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl pointer-events-none"
        >
          <div className="text-xs font-medium text-white mb-2">{format(hoveredPoint.date, "PPP")}</div>
          {chartType === "line" ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div className="text-gray-400">Price:</div>
              <div className="font-mono text-white">{hoveredPoint.close.toLocaleString()}</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div className="text-gray-400">Open:</div>
              <div className="font-mono text-white">{hoveredPoint.open.toLocaleString()}</div>
              <div className="text-gray-400">High:</div>
              <div className="font-mono text-green-400">{hoveredPoint.high.toLocaleString()}</div>
              <div className="text-gray-400">Low:</div>
              <div className="font-mono text-red-400">{hoveredPoint.low.toLocaleString()}</div>
              <div className="text-gray-400">Close:</div>
              <div className="font-mono text-white">{hoveredPoint.close.toLocaleString()}</div>
            </div>
          )}
        </div>
      )}

      {/* Chart controls */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button
          onClick={() => {
            setScale(1)
            setOffset({ x: 0, y: 0 })
          }}
          className="bg-gray-800 hover:bg-gray-700 text-gray-300 p-1 rounded"
          title="Reset view"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
        </button>
        <button
          onClick={() => setScale(Math.min(scale * 1.2, 10))}
          className="bg-gray-800 hover:bg-gray-700 text-gray-300 p-1 rounded"
          title="Zoom in"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
        <button
          onClick={() => setScale(Math.max(scale / 1.2, 1))}
          className="bg-gray-800 hover:bg-gray-700 text-gray-300 p-1 rounded"
          title="Zoom out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
      </div>
    </div>
  )
}
