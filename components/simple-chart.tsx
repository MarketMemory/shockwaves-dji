"use client"

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Area,
  AreaChart,
  ComposedChart,
  Line,
  Rectangle,
} from "recharts"
import { format } from "date-fns"
import { crashEvents, elliottWaves } from "@/data/crash-data"
import { useState } from "react"

interface SimpleChartProps {
  data: any[]
  interval: string
  isLogScale: boolean
  theme: string
  chartType: "line" | "candlestick"
}

// Custom Candlestick Component
const CandlestickBar = (props: any) => {
  const { x, y, width, height, open, close, low, high, fill } = props

  if (!open || !close || !low || !high) return null

  const isGreen = close >= open
  const color = isGreen ? "#10b981" : "#ef4444"

  // Calculate positions
  const wickX = x + width / 2
  const wickTop = y + height * (1 - (high - low) / (high - low))
  const wickBottom = y + height

  const bodyTop = y + height * (1 - (Math.max(open, close) - low) / (high - low))
  const bodyBottom = y + height * (1 - (Math.min(open, close) - low) / (high - low))
  const bodyHeight = bodyBottom - bodyTop

  return (
    <g>
      {/* Wick */}
      <line x1={wickX} y1={wickTop} x2={wickX} y2={wickBottom} stroke={color} />

      {/* Body */}
      <Rectangle
        x={x}
        y={bodyTop}
        width={width}
        height={bodyHeight}
        fill={isGreen ? color : "transparent"}
        stroke={color}
      />
    </g>
  )
}

export function SimpleChart({ data, interval, isLogScale, theme, chartType }: SimpleChartProps) {
  const [resetTrigger, setResetTrigger] = useState(0)

  if (!data || data.length === 0) {
    return (
      <div className="h-[calc(100vh-100px)] flex items-center justify-center">
        <p className="text-gray-400">No data available</p>
      </div>
    )
  }

  const getThemeColors = () => {
    switch (theme) {
      case "light":
        return {
          grid: "#e5e7eb",
          text: "#374151",
          line: "#3b82f6",
          area: "#3b82f680",
          upColor: "#10b981",
          downColor: "#ef4444",
          background: "#ffffff",
        }
      case "tradingview":
        return {
          grid: "#1e3a2e",
          text: "#00ff88",
          line: "#00ff88",
          area: "#00ff8880",
          upColor: "#26a69a",
          downColor: "#ef5350",
          background: "#0d1421",
        }
      default:
        return {
          grid: "#374151",
          text: "#d1d5db",
          line: "#f59e0b",
          area: "#f59e0b80",
          upColor: "#10b981",
          downColor: "#ef4444",
          background: "#1f2937",
        }
    }
  }

  const colors = getThemeColors()

  const formatXAxisLabel = (tickItem: string) => {
    try {
      const date = new Date(tickItem)
      if (isNaN(date.getTime())) return tickItem

      switch (interval) {
        case "1W":
        case "1M":
          return format(date, "MMM dd")
        case "3M":
        case "6M":
        case "1Y":
          return format(date, "MMM yyyy")
        default:
          return format(date, "yyyy")
      }
    } catch {
      return tickItem
    }
  }

  // Prepare data for candlestick representation
  const chartData = data.map((item) => ({
    ...item,
    // Add color for candlestick mode
    color: item.close >= item.open ? colors.upColor : colors.downColor,
    // Ensure we have valid values
    open: Number(item.open) || Number(item.close) || 0,
    high: Number(item.high) || Number(item.close) || 0,
    low: Number(item.low) || Number(item.close) || 0,
    close: Number(item.close) || 0,
    volume: Number(item.volume) || 0,
  }))

  // Calculate dynamic Y-axis domain with padding
  const getYDomain = () => {
    const prices = chartType === "candlestick" 
      ? chartData.flatMap((item) => [item.low, item.high])
      : chartData.map((item) => item.close)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const padding = (maxPrice - minPrice) * 0.02 // Verlaagd van impliciete standaard naar 0.02
    return isLogScale 
      ? [minPrice > 0 ? minPrice : "dataMin", "dataMax"]
      : [minPrice - padding, maxPrice + padding]
  }

  // Common chart props
  const commonProps = {
    data: chartData,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  }

  // Common axis props
  const renderAxes = () => (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
      <XAxis dataKey="date" tickFormatter={formatXAxisLabel} stroke={colors.text} fontSize={12} />
      <YAxis
        scale={isLogScale ? "log" : "linear"}
        domain={getYDomain()}
        stroke={colors.text}
        fontSize={12}
        tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toFixed(0)}
      />
      <Tooltip
        labelFormatter={(label) => {
          try {
            return format(new Date(label), "PPP")
          } catch {
            return label
          }
        }}
        formatter={(value: number, name: string) => {
          if (name === "volume") return [value?.toLocaleString() || "0", "Volume"]
          if (name === "open") return [value?.toLocaleString() || "N/A", "Open"]
          if (name === "high") return [value?.toLocaleString() || "N/A", "High"]
          if (name === "low") return [value?.toLocaleString() || "N/A", "Low"]
          if (name === "close") return [value?.toLocaleString() || "N/A", "Close"]
          return [value?.toLocaleString() || "N/A", name]
        }}
        contentStyle={{
          backgroundColor: colors.background,
          border: `1px solid ${colors.grid}`,
          borderRadius: "8px",
          color: colors.text,
        }}
      />
    </>
  )

  // Common reference lines
  const renderReferenceLines = () => (
    <>
      {/* Crash Events */}
      {crashEvents.map((event) => (
        <ReferenceLine
          key={event.id}
          x={event.date}
          stroke="#ef4444"
          strokeDasharray="5 5"
          label={{ value: event.name, position: "top", fontSize: 10 }}
        />
      ))}

      {/* Elliott Waves */}
      {elliottWaves.slice(0, 5).map((wave) => (
        <ReferenceLine
          key={wave.id}
          x={wave.date}
          stroke={
            wave.degree === "Grand Supercycle"
              ? "#ffd700"
              : wave.degree === "Supercycle"
                ? "#ff6b35"
                : wave.degree === "Cycle"
                  ? "#4ecdc4"
                  : wave.degree === "Primary"
                    ? "#45b7d1"
                    : "#96ceb4"
          }
          strokeDasharray={wave.confidence === "Projection" ? "10 5" : "none"}
          label={{ value: wave.label, position: "bottom", fontSize: 10 }}
        />
      ))}
    </>
  )

  return (
    <div className="space-y-4">
      {chartType === "candlestick" && (
        <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-xs text-blue-400">🕯️ Candlestick Mode - OHLC data in tooltips</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500"></div>
                <span className="text-xs">Bullish (Close > Open)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 border border-red-500"></div>
                <span className="text-xs">Bearish (Close < Open)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative h-[calc(100vh-100px)]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "candlestick" ? (
            <ComposedChart {...commonProps}>
              {renderAxes()}

              {/* Candlestick representation using lines */}
              {chartData.map((entry, index) => (
                <Line
                  key={`candle-${index}`}
                  type="monotone"
                  dataKey="close"
                  data={[entry]}
                  stroke={entry.color}
                  dot={<CandlestickBar />}
                  activeDot={false}
                  isAnimationActive={false}
                />
              ))}

              {/* High-Low lines */}
              {chartData.map((entry, index) => (
                <Line
                  key={`hl-${index}`}
                  type="monotone"
                  dataKey="high"
                  data={[entry]}
                  stroke={entry.color}
                  dot={false}
                  activeDot={false}
                  isAnimationActive={false}
                />
              ))}

              {renderReferenceLines()}
            </ComposedChart>
          ) : (
            <AreaChart {...commonProps}>
              {renderAxes()}

              <Area
                type="monotone"
                dataKey="close"
                stroke={colors.line}
                fill={colors.area}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: colors.line }}
              />

              {renderReferenceLines()}
            </AreaChart>
          )}
        </ResponsiveContainer>
        {/* Fit to Screen Button */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button
            onClick={() => setResetTrigger((prev) => prev + 1)}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 p-1 rounded"
            title="Fit to Screen"
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
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <path d="M7 7h10v10H7z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}