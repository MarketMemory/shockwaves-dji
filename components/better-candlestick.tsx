"use client"

import { useState } from "react"
import { format } from "date-fns"

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

  // SIMPELE data filtering - geen complexe sampling
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

  // SIMPELE chart afmetingen
  const chartWidth = 800
  const chartHeight = 400
  const padding = { top: 20, right: 30, bottom: 60, left: 60 }
  const plotWidth = chartWidth - padding.left - padding.right
  const plotHeight = chartHeight - padding.top - padding.bottom

  // Find min/max values
  const minPrice = Math.min(...chartData.map((d) => d.low))
  const maxPrice = Math.max(...chartData.map((d) => d.high))
  const priceRange = maxPrice - minPrice

  // SIMPELE scale functions
  const scaleX = (index: number) => {
    if (chartData.length <= 1) return padding.left
    return padding.left + (index / (chartData.length - 1)) * plotWidth
  }

  const scaleY = (price: number) => {
    if (priceRange === 0) return padding.top + plotHeight / 2
    return padding.top + plotHeight - ((price - minPrice) / priceRange) * plotHeight
  }

  // SIMPELE candle width
  const candleWidth = Math.max((plotWidth / chartData.length) * 0.8, 3)

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
    const candleHeight = Math.max(Math.abs(close - open), 1)

    return (
      <g key={i} onMouseEnter={() => setHoveredCandle(d)} onMouseLeave={() => setHoveredCandle(null)}>
        {/* Wick */}
        <line x1={x} y1={high} x2={x} y2={low} stroke={color} strokeWidth={1} />

        {/* Body */}
        <rect
          x={candleX}
          y={candleY}
          width={candleWidth}
          height={candleHeight}
          fill={isGreen ? color : "transparent"}
          stroke={color}
          strokeWidth={1}
        />
      </g>
    )
  })

  // SIMPELE grid
  const gridLines = []
  for (let i = 0; i <= 5; i++) {
    const y = padding.top + (i / 5) * plotHeight
    gridLines.push(
      <line
        key={`grid-${i}`}
        x1={padding.left}
        y1={y}
        x2={chartWidth - padding.right}
        y2={y}
        stroke={colors.grid}
        strokeDasharray="2,2"
        opacity={0.3}
      />,
    )
  }

  // SIMPELE X-axis met jaartallen
  const numLabels = Math.min(chartData.length, 10)
  const labelStep = Math.floor(chartData.length / numLabels) || 1

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
        .filter((_, i) => i % labelStep === 0)
        .map((d, i) => {
          const actualIndex = chartData.findIndex((item) => item.date.getTime() === d.date.getTime())
          const x = scaleX(actualIndex)

          return (
            <g key={`x-label-${i}`}>
              <line
                x1={x}
                y1={chartHeight - padding.bottom}
                x2={x}
                y2={chartHeight - padding.bottom + 5}
                stroke={colors.axisColor}
              />
              <text x={x} y={chartHeight - padding.bottom + 20} textAnchor="middle" fill={colors.text} fontSize={12}>
                {format(d.date, "yyyy")}
              </text>
            </g>
          )
        })}
    </g>
  )

  // SIMPELE Y-axis
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
        const y = scaleY(price)

        return (
          <g key={`y-tick-${i}`}>
            <line x1={padding.left - 5} y1={y} x2={padding.left} y2={y} stroke={colors.axisColor} />
            <text
              x={padding.left - 10}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
              fill={colors.text}
              fontSize={10}
            >
              {price >= 1000 ? `${(price / 1000).toFixed(1)}k` : price.toFixed(0)}
            </text>
          </g>
        )
      })}
    </g>
  )

  // Tooltip
  const tooltip = hoveredCandle && (
    <g>
      <rect
        x={10}
        y={10}
        width={160}
        height={100}
        fill={colors.background}
        fillOpacity={0.9}
        stroke={colors.grid}
        rx={4}
      />
      <text x={20} y={30} fill={colors.text} fontSize={12} fontWeight="bold">
        {format(hoveredCandle.date, "MMM dd, yyyy")}
      </text>
      <text x={20} y={50} fill={colors.text} fontSize={11}>
        Open: {hoveredCandle.open.toLocaleString()}
      </text>
      <text x={20} y={65} fill={colors.text} fontSize={11}>
        High: {hoveredCandle.high.toLocaleString()}
      </text>
      <text x={20} y={80} fill={colors.text} fontSize={11}>
        Low: {hoveredCandle.low.toLocaleString()}
      </text>
      <text x={20} y={95} fill={colors.text} fontSize={11}>
        Close: {hoveredCandle.close.toLocaleString()}
      </text>
    </g>
  )

  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
        <p className="text-xs text-blue-400">🕯️ Candlestick Chart - {chartData.length} datapunten</p>
      </div>

      <div className="h-96 w-full bg-gray-900/30 rounded-lg p-4">
        <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
          <rect x={0} y={0} width={chartWidth} height={chartHeight} fill={colors.background} rx={8} />

          {gridLines}
          {xAxis}
          {yAxis}
          {candlesticks}
          {tooltip}
        </svg>
      </div>
    </div>
  )
}
