"use client"

import { useState } from "react"
import { format } from "date-fns"
import { crashEvents, elliottWaves } from "@/data/crash-data"

interface BetterCandlestickProps {
  data: any[]
  isLogScale: boolean
  theme: string
}

export function BetterCandlestick({ data, isLogScale, theme }: BetterCandlestickProps) {
  const [hoveredCandle, setHoveredCandle] = useState<any>(null)

  if (!data || data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center">
        <p className="text-gray-400">No data available</p>
      </div>
    )
  }

  const getThemeColors = () => {
    switch (theme) {
      case "light":
        return {
          background: "#ffffff",
          grid: "#e5e7eb",
          text: "#374151",
          upColor: "#10b981",
          downColor: "#ef4444",
          axisColor: "#9ca3af",
        }
      case "tradingview":
        return {
          background: "#0d1421",
          grid: "#1e3a2e",
          text: "#00ff88",
          upColor: "#26a69a",
          downColor: "#ef5350",
          axisColor: "#4d5e8c",
        }
      default:
        return {
          background: "#1f2937",
          grid: "#374151",
          text: "#d1d5db",
          upColor: "#10b981",
          downColor: "#ef4444",
          axisColor: "#6b7280",
        }
    }
  }

  const colors = getThemeColors()

  // Filter and prepare data
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

  // Calculate chart dimensions
  const chartWidth = 800
  const chartHeight = 400
  const padding = { top: 20, right: 30, bottom: 30, left: 60 }
  const plotWidth = chartWidth - padding.left - padding.right
  const plotHeight = chartHeight - padding.top - padding.bottom

  // Find min/max values for scaling
  const minPrice = Math.min(...chartData.map((d) => d.low))
  const maxPrice = Math.max(...chartData.map((d) => d.high))
  const priceRange = maxPrice - minPrice

  // Scale functions
  const scaleX = (index: number) => padding.left + (index / (chartData.length - 1)) * plotWidth
  const scaleY = (price: number) => {
    if (isLogScale) {
      const logMin = Math.log(minPrice)
      const logMax = Math.log(maxPrice)
      const logPrice = Math.log(price)
      return padding.top + plotHeight - ((logPrice - logMin) / (logMax - logMin)) * plotHeight
    } else {
      return padding.top + plotHeight - ((price - minPrice) / priceRange) * plotHeight
    }
  }

  // Calculate candle width
  const candleWidth = Math.max(Math.min((plotWidth / chartData.length) * 0.8, 15), 2)

  // Draw candlesticks
  const candlesticks = chartData.map((d, i) => {
    const x = scaleX(i)
    const open = scaleY(d.open)
    const close = scaleY(d.close)
    const high = scaleY(d.high)
    const low = scaleY(d.low)

    const isGreen = d.close >= d.open
    const color = isGreen ? colors.upColor : colors.downColor

    const candleX = x - candleWidth / 2
    const candleY = Math.min(open, close)
    const candleHeight = Math.abs(close - open)

    return (
      <g key={i} onMouseEnter={() => setHoveredCandle(d)} onMouseLeave={() => setHoveredCandle(null)}>
        {/* Wick */}
        <line x1={x} y1={high} x2={x} y2={low} stroke={color} strokeWidth={1} />

        {/* Body */}
        <rect
          x={candleX}
          y={candleY}
          width={candleWidth}
          height={Math.max(candleHeight, 1)}
          fill={isGreen ? color : "transparent"}
          stroke={color}
          strokeWidth={1}
        />
      </g>
    )
  })

  // Draw grid lines
  const gridLines = []
  const numGridLines = 5
  for (let i = 0; i <= numGridLines; i++) {
    const y = padding.top + (i / numGridLines) * plotHeight
    gridLines.push(
      <line
        key={`grid-${i}`}
        x1={padding.left}
        y1={y}
        x2={chartWidth - padding.right}
        y2={y}
        stroke={colors.grid}
        strokeDasharray="3,3"
      />,
    )
  }

  // Draw axes
  const xAxis = (
    <g>
      <line
        x1={padding.left}
        y1={chartHeight - padding.bottom}
        x2={chartWidth - padding.right}
        y2={chartHeight - padding.bottom}
        stroke={colors.axisColor}
      />
      {chartData
        .filter((_, i) => i % Math.ceil(chartData.length / 10) === 0)
        .map((d, i) => (
          <g key={`x-tick-${i}`}>
            <line
              x1={scaleX(i * Math.ceil(chartData.length / 10))}
              y1={chartHeight - padding.bottom}
              x2={scaleX(i * Math.ceil(chartData.length / 10))}
              y2={chartHeight - padding.bottom + 5}
              stroke={colors.axisColor}
            />
            <text
              x={scaleX(i * Math.ceil(chartData.length / 10))}
              y={chartHeight - padding.bottom + 15}
              textAnchor="middle"
              fill={colors.text}
              fontSize={10}
            >
              {format(d.date, "MMM yyyy")}
            </text>
          </g>
        ))}
    </g>
  )

  const yAxis = (
    <g>
      <line
        x1={padding.left}
        y1={padding.top}
        x2={padding.left}
        y2={chartHeight - padding.bottom}
        stroke={colors.axisColor}
      />
      {Array.from({ length: 6 }).map((_, i) => {
        const price = minPrice + (i / 5) * priceRange
        return (
          <g key={`y-tick-${i}`}>
            <line
              x1={padding.left - 5}
              y1={scaleY(price)}
              x2={padding.left}
              y2={scaleY(price)}
              stroke={colors.axisColor}
            />
            <text
              x={padding.left - 10}
              y={scaleY(price)}
              textAnchor="end"
              dominantBaseline="middle"
              fill={colors.text}
              fontSize={10}
            >
              {price.toLocaleString()}
            </text>
          </g>
        )
      })}
    </g>
  )

  // Draw crash events
  const crashLines = crashEvents.map((event) => {
    const eventDate = new Date(event.date)
    const eventIndex = chartData.findIndex((d) => d.date >= eventDate)
    if (eventIndex === -1) return null

    const x = scaleX(eventIndex)
    return (
      <g key={`crash-${event.id}`}>
        <line x1={x} y1={padding.top} x2={x} y2={chartHeight - padding.bottom} stroke="#ef4444" strokeDasharray="5,5" />
        <text x={x} y={padding.top - 5} textAnchor="middle" fill="#ef4444" fontSize={10}>
          {event.name}
        </text>
      </g>
    )
  })

  // Draw Elliott waves
  const waveLines = elliottWaves.slice(0, 5).map((wave) => {
    const waveDate = new Date(wave.date)
    const waveIndex = chartData.findIndex((d) => d.date >= waveDate)
    if (waveIndex === -1) return null

    const x = scaleX(waveIndex)
    const waveColor =
      wave.degree === "Grand Supercycle"
        ? "#ffd700"
        : wave.degree === "Supercycle"
          ? "#ff6b35"
          : wave.degree === "Cycle"
            ? "#4ecdc4"
            : wave.degree === "Primary"
              ? "#45b7d1"
              : "#96ceb4"

    return (
      <g key={`wave-${wave.id}`}>
        <line
          x1={x}
          y1={padding.top}
          x2={x}
          y2={chartHeight - padding.bottom}
          stroke={waveColor}
          strokeDasharray={wave.confidence === "Projection" ? "10,5" : "none"}
        />
        <text x={x} y={chartHeight - padding.bottom + 25} textAnchor="middle" fill={waveColor} fontSize={10}>
          {wave.label}
        </text>
      </g>
    )
  })

  // Tooltip
  const tooltip = hoveredCandle && (
    <g>
      <rect
        x={10}
        y={10}
        width={180}
        height={100}
        fill={colors.background}
        fillOpacity={0.9}
        stroke={colors.grid}
        rx={4}
      />
      <text x={20} y={30} fill={colors.text} fontSize={12} fontWeight="bold">
        {format(hoveredCandle.date, "PPP")}
      </text>
      <text x={20} y={50} fill={colors.text} fontSize={12}>
        Open: {hoveredCandle.open.toLocaleString()}
      </text>
      <text x={20} y={65} fill={colors.text} fontSize={12}>
        High: {hoveredCandle.high.toLocaleString()}
      </text>
      <text x={20} y={80} fill={colors.text} fontSize={12}>
        Low: {hoveredCandle.low.toLocaleString()}
      </text>
      <text x={20} y={95} fill={colors.text} fontSize={12}>
        Close: {hoveredCandle.close.toLocaleString()}
      </text>
    </g>
  )

  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
        <div className="flex items-center justify-between">
          <p className="text-xs text-blue-400">🕯️ Verbeterde Candlestick Chart - Hover voor details</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500"></div>
              <span className="text-xs">Bullish (Close &gt; Open)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 border border-red-500"></div>
              <span className="text-xs">Bearish (Close &lt; Open)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-96 w-full overflow-hidden">
        <svg width={chartWidth} height={chartHeight} style={{ maxWidth: "100%", height: "auto" }}>
          {/* Background */}
          <rect x={0} y={0} width={chartWidth} height={chartHeight} fill={colors.background} />

          {/* Grid */}
          {gridLines}

          {/* Axes */}
          {xAxis}
          {yAxis}

          {/* Candlesticks */}
          {candlesticks}

          {/* Event lines */}
          {crashLines}
          {waveLines}

          {/* Tooltip */}
          {tooltip}
        </svg>
      </div>
    </div>
  )
}
