"use client"

import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts"
import { format } from "date-fns"
import { crashEvents, elliottWaves } from "@/data/crash-data"

interface AdvancedCandlestickProps {
  data: any[]
  isLogScale: boolean
  theme: string
  onChartClick?: (event: any) => void
}

// Custom Candlestick Shape Component
const Candlestick = (props: any) => {
  const { payload, x, y, width, height, index } = props

  if (!payload || typeof payload.open !== "number" || typeof payload.close !== "number") {
    return null
  }

  const { open, high, low, close } = payload
  const isGreen = close >= open
  const color = isGreen ? "#10b981" : "#ef4444"

  // Calculate the price range for this data point
  const priceRange = high - low
  if (priceRange <= 0) return null

  // Calculate positions relative to the chart
  const centerX = x + width / 2
  const bodyWidth = Math.max(width * 0.6, 2)
  const bodyX = centerX - bodyWidth / 2

  // Calculate Y positions (note: Y increases downward in SVG)
  const highY = y
  const lowY = y + height
  const openY = y + ((high - open) / priceRange) * height
  const closeY = y + ((high - close) / priceRange) * height

  const bodyTop = Math.min(openY, closeY)
  const bodyBottom = Math.max(openY, closeY)
  const bodyHeight = Math.max(Math.abs(closeY - openY), 1)

  return (
    <g>
      {/* High-Low Wick */}
      <line x1={centerX} y1={highY} x2={centerX} y2={lowY} stroke={color} strokeWidth={1} />

      {/* Open-Close Body */}
      <rect
        x={bodyX}
        y={bodyTop}
        width={bodyWidth}
        height={bodyHeight}
        fill={isGreen ? color : "transparent"}
        stroke={color}
        strokeWidth={1}
      />
    </g>
  )
}

export function AdvancedCandlestick({ data, isLogScale, theme, onChartClick }: AdvancedCandlestickProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center">
        <p className="text-gray-400">No data available for candlestick chart</p>
      </div>
    )
  }

  const getThemeColors = () => {
    switch (theme) {
      case "light":
        return {
          grid: "#e5e7eb",
          text: "#374151",
          background: "#ffffff",
        }
      case "tradingview":
        return {
          grid: "#1e3a2e",
          text: "#00ff88",
          background: "#0d1421",
        }
      default:
        return {
          grid: "#374151",
          text: "#d1d5db",
          background: "#1f2937",
        }
    }
  }

  const colors = getThemeColors()

  // Prepare data with proper OHLC values
  const chartData = data
    .map((item, index) => ({
      ...item,
      index,
      // Ensure we have valid OHLC data
      open: Number(item.open) || Number(item.close) || 0,
      high: Number(item.high) || Number(item.close) || 0,
      low: Number(item.low) || Number(item.close) || 0,
      close: Number(item.close) || 0,
    }))
    .filter((item) => item.close > 0)

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} onClick={onChartClick} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => {
              try {
                return format(new Date(value), "MMM dd")
              } catch {
                return value
              }
            }}
            stroke={colors.text}
            fontSize={12}
          />
          <YAxis
            scale={isLogScale ? "log" : "linear"}
            domain={["dataMin - 100", "dataMax + 100"]}
            stroke={colors.text}
            fontSize={12}
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
              return [value?.toLocaleString() || "N/A", name.toUpperCase()]
            }}
            contentStyle={{
              backgroundColor: colors.background,
              border: `1px solid ${colors.grid}`,
              borderRadius: "8px",
              color: colors.text,
            }}
          />

          {/* Render candlesticks manually */}
          {chartData.map((item, index) => (
            <Candlestick
              key={index}
              payload={item}
              x={(index / chartData.length) * 800} // Approximate positioning
              y={50}
              width={800 / chartData.length}
              height={300}
              index={index}
            />
          ))}

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
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
