"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Waves, TrendingUp } from "lucide-react"

interface CustomElliottChartProps {
  data: any[]
}

export function CustomElliottChart({ data }: CustomElliottChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredPoint, setHoveredPoint] = useState<any>(null)
  const [showElliottWaves, setShowElliottWaves] = useState(true)
  const [showFibonacci, setShowFibonacci] = useState(true)
  const [isLogScale, setIsLogScale] = useState(true) // Default op true voor logaritmische schaal

  // Elliott Wave annotations - educatieve markers
  const elliottWavePoints = [
    { date: "2020-03-23", type: "1", label: "Wave 1 Start", description: "Begin van nieuwe bull cycle na COVID crash" },
    { date: "2020-09-02", type: "2", label: "Wave 2", description: "Correctie - gezonde terugval" },
    { date: "2021-01-01", type: "3", label: "Wave 3", description: "Krachtigste golf - media wordt bullish" },
    { date: "2022-01-04", type: "4", label: "Wave 4", description: "Zijwaartse correctie" },
    { date: "2024-01-01", type: "5", label: "Wave 5?", description: "Mogelijke finale golf - let op divergenties" },
  ]

  // Fibonacci levels voor educatie
  const fibonacciLevels = [
    { level: 0.236, color: "#10b981", label: "23.6% - Zwakke retracement" },
    { level: 0.382, color: "#f59e0b", label: "38.2% - Normale retracement" },
    { level: 0.618, color: "#ef4444", label: "61.8% - Gouden verhouding" },
    { level: 0.786, color: "#8b5cf6", label: "78.6% - Diepe retracement" },
  ]

  useEffect(() => {
    drawChart()
  }, [data, showElliottWaves, showFibonacci, isLogScale])

  const drawChart = () => {
    const canvas = canvasRef.current
    if (!canvas || !data || data.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = canvas
    const padding = { top: 40, right: 80, bottom: 60, left: 80 }
    const plotWidth = width - padding.left - padding.right
    const plotHeight = height - padding.top - padding.bottom

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Find min/max for scaling
    const prices = data.map((d) => d.close).filter((p) => p > 0)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice
    const pricePadding = priceRange * 0.1

    // Scale functions
    const scaleX = (index: number) => padding.left + (index / (data.length - 1)) * plotWidth
    const scaleY = (price: number) => {
      if (isLogScale) {
        // Logaritmische schaal
        const logMin = Math.log(minPrice - pricePadding > 0 ? minPrice - pricePadding : 1)
        const logMax = Math.log(maxPrice + pricePadding)
        const logPrice = Math.log(price)
        return padding.top + plotHeight - ((logPrice - logMin) / (logMax - logMin)) * plotHeight
      } else {
        // Lineaire schaal
        return (
          padding.top +
          plotHeight -
          ((price - (minPrice - pricePadding)) / (priceRange + 2 * pricePadding)) * plotHeight
        )
      }
    }

    // Draw grid
    ctx.strokeStyle = "#374151"
    ctx.lineWidth = 1
    ctx.setLineDash([2, 4])
    ctx.globalAlpha = 0.3

    // Horizontal grid
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (i / 5) * plotHeight
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()
    }

    // Vertical grid
    for (let i = 0; i <= 8; i++) {
      const x = padding.left + (i / 8) * plotWidth
      ctx.beginPath()
      ctx.moveTo(x, padding.top)
      ctx.lineTo(x, height - padding.bottom)
      ctx.stroke()
    }

    ctx.setLineDash([])
    ctx.globalAlpha = 1.0

    // Draw price line
    ctx.strokeStyle = "#f59e0b"
    ctx.lineWidth = 3
    ctx.beginPath()

    data.forEach((point, index) => {
      const x = scaleX(index)
      const y = scaleY(point.close)

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw Fibonacci levels if enabled
    if (showFibonacci) {
      const recentHigh = Math.max(...data.slice(-100).map((d) => d.close))
      const recentLow = Math.min(...data.slice(-100).map((d) => d.close))

      fibonacciLevels.forEach((fib) => {
        let fibPrice

        if (isLogScale) {
          // Logaritmische Fibonacci berekening
          const logHigh = Math.log(recentHigh)
          const logLow = Math.log(recentLow)
          const logRange = logHigh - logLow
          fibPrice = Math.exp(logHigh - logRange * fib.level)
        } else {
          // Lineaire Fibonacci berekening
          const fibRange = recentHigh - recentLow
          fibPrice = recentHigh - fibRange * fib.level
        }

        const y = scaleY(fibPrice)

        ctx.strokeStyle = fib.color
        ctx.lineWidth = 1
        ctx.setLineDash([5, 5])
        ctx.globalAlpha = 0.7

        ctx.beginPath()
        ctx.moveTo(padding.left, y)
        ctx.lineTo(width - padding.right, y)
        ctx.stroke()

        // Label
        ctx.fillStyle = fib.color
        ctx.font = "12px monospace"
        ctx.fillText(`${(fib.level * 100).toFixed(1)}%`, width - padding.right + 5, y + 4)

        ctx.setLineDash([])
        ctx.globalAlpha = 1.0
      })
    }

    // Draw Elliott Wave markers if enabled
    if (showElliottWaves) {
      elliottWavePoints.forEach((wave) => {
        const dataIndex = data.findIndex((d) => d.date >= wave.date)
        if (dataIndex === -1) return

        const x = scaleX(dataIndex)
        const y = scaleY(data[dataIndex].close)

        // Wave marker
        ctx.fillStyle = wave.type === "1" || wave.type === "3" || wave.type === "5" ? "#10b981" : "#ef4444"
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, 2 * Math.PI)
        ctx.fill()

        // Wave number
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(wave.type, x, y + 4)

        // Vertical line
        ctx.strokeStyle = ctx.fillStyle =
          wave.type === "1" || wave.type === "3" || wave.type === "5" ? "#10b981" : "#ef4444"
        ctx.lineWidth = 2
        ctx.setLineDash([3, 3])
        ctx.globalAlpha = 0.5

        ctx.beginPath()
        ctx.moveTo(x, padding.top)
        ctx.lineTo(x, height - padding.bottom)
        ctx.stroke()

        ctx.setLineDash([])
        ctx.globalAlpha = 1.0
      })
    }

    // Draw axes
    ctx.strokeStyle = "#6b7280"
    ctx.lineWidth = 2

    // X-axis
    ctx.beginPath()
    ctx.moveTo(padding.left, height - padding.bottom)
    ctx.lineTo(width - padding.right, height - padding.bottom)
    ctx.stroke()

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, height - padding.bottom)
    ctx.stroke()

    // X-axis labels
    ctx.fillStyle = "#9ca3af"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"

    const labelStep = Math.max(Math.floor(data.length / 8), 1)
    for (let i = 0; i < data.length; i += labelStep) {
      const x = scaleX(i)
      const date = new Date(data[i].date)
      ctx.fillText(format(date, "MMM yyyy"), x, height - padding.bottom + 20)
    }

    // Y-axis labels
    ctx.textAlign = "right"
    for (let i = 0; i <= 5; i++) {
      const price = minPrice - pricePadding + (i / 5) * (priceRange + 2 * pricePadding)
      const y = scaleY(price)
      const formattedPrice = price >= 1000 ? `${(price / 1000).toFixed(1)}k` : price.toFixed(0)
      ctx.fillText(formattedPrice, padding.left - 10, y + 4)
    }
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Find nearest data point
    const plotWidth = canvas.width - 160
    const dataIndex = Math.round(((x - 80) / plotWidth) * (data.length - 1))

    if (dataIndex >= 0 && dataIndex < data.length) {
      setHoveredPoint(data[dataIndex])
    }
  }

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Waves className="h-6 w-6 text-blue-400" />
            <span>Elliott Wave Educatie Chart - DJI</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={showElliottWaves ? "default" : "outline"}
              size="sm"
              onClick={() => setShowElliottWaves(!showElliottWaves)}
            >
              Elliott Waves
            </Button>
            <Button
              variant={showFibonacci ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFibonacci(!showFibonacci)}
            >
              Fibonacci
            </Button>
            <Button variant={isLogScale ? "default" : "outline"} size="sm" onClick={() => setIsLogScale(!isLogScale)}>
              Log Scale
            </Button>
            <a
              href="https://www.tradingview.com/chart/?symbol=TVC%3ADJI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>TradingView</span>
            </a>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Canvas Chart */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="w-full h-auto bg-gray-900 rounded-lg cursor-crosshair"
            onClick={handleCanvasClick}
          />

          {/* Tooltip */}
          {hoveredPoint && (
            <div className="absolute top-4 left-4 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl">
              <div className="text-sm font-medium text-white mb-1">{format(new Date(hoveredPoint.date), "PPP")}</div>
              <div className="text-xs text-gray-300">Close: {hoveredPoint.close.toLocaleString()} points</div>
            </div>
          )}
        </div>

        {/* Educational Explanations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {showElliottWaves && (
            <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-3 flex items-center space-x-2">
                <Waves className="h-4 w-4" />
                <span>Elliott Wave Uitleg</span>
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                {elliottWavePoints.map((wave, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        wave.type === "1" || wave.type === "3" || wave.type === "5"
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {wave.type}
                    </div>
                    <div>
                      <div className="font-medium">{wave.label}</div>
                      <div className="text-xs text-gray-400">{wave.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showFibonacci && (
            <div className="p-4 bg-orange-900/20 border border-orange-800 rounded-lg">
              <h4 className="font-semibold text-orange-400 mb-3 flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Fibonacci Levels</span>
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                {fibonacciLevels.map((fib, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-4 h-2 rounded" style={{ backgroundColor: fib.color }} />
                    <span>{fib.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-gray-400">
                Fibonacci retracements helpen support en resistance levels te identificeren
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg">
          <h4 className="font-semibold text-green-400 mb-2">🎓 Leer Meer over Elliott Wave Theory</h4>
          <p className="text-sm text-gray-300 mb-3">
            Deze chart toont hoe Elliott Wave patronen zich ontwikkelen in real-time. Klik op de verschillende secties
            hierboven om dieper in te gaan op de theorie achter deze krachtige analyse methode.
          </p>
          <div className="text-xs text-gray-400">💡 Tip: Klik op de chart om details van specifieke datums te zien</div>
        </div>
      </CardContent>
    </Card>
  )
}
