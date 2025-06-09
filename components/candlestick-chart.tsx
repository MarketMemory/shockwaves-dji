"use client"

import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Bar } from "recharts"
import { format } from "date-fns"
import { crashEvents, elliottWaves } from "@/data/crash-data"

interface CandlestickChartProps {
  data: any[]
  isLogScale: boolean
  theme: string
  onChartClick: (event: any) => void
  userWaves: any[]
  onRemoveWave: (id: number) => void
  selectedWaveDegree: string
  selectedWaveType: string
  onWaveDegreeChange: (degree: string) => void
  onWaveTypeChange: (type: string) => void
}

// Custom Candlestick Component
const CandlestickBar = (props: any) => {
  const { payload, x, y, width, height } = props

  if (!payload || !payload.open || !payload.close || !payload.high || !payload.low) {
    return null
  }

  const { open, high, low, close } = payload
  const isGreen = close >= open
  const color = isGreen ? "#10b981" : "#ef4444"

  // Calculate positions
  const maxPrice = Math.max(high, Math.max(open, close))
  const minPrice = Math.min(low, Math.min(open, close))
  const priceRange = maxPrice - minPrice

  if (priceRange === 0) return null

  // Body dimensions
  const bodyTop = Math.min(open, close)
  const bodyBottom = Math.max(open, close)
  const bodyHeight = Math.abs(close - open)

  // Scale to chart coordinates
  const scale = height / priceRange
  const wickX = x + width / 2
  const bodyX = x + width * 0.25
  const bodyWidth = width * 0.5

  const highY = y + (maxPrice - high) * scale
  const lowY = y + (maxPrice - low) * scale
  const bodyTopY = y + (maxPrice - Math.max(open, close)) * scale
  const bodyBottomY = y + (maxPrice - Math.min(open, close)) * scale

  return (
    <g>
      {/* High-Low Wick */}
      <line x1={wickX} y1={highY} x2={wickX} y2={lowY} stroke={color} strokeWidth={1} />

      {/* Open-Close Body */}
      <rect
        x={bodyX}
        y={bodyTopY}
        width={bodyWidth}
        height={Math.max(bodyBottomY - bodyTopY, 1)}
        fill={isGreen ? color : "transparent"}
        stroke={color}
        strokeWidth={1}
      />
    </g>
  )
}

export function CandlestickChart({
  data,
  isLogScale,
  theme,
  onChartClick,
  userWaves,
  onRemoveWave,
  selectedWaveDegree,
  selectedWaveType,
  onWaveDegreeChange,
  onWaveTypeChange,
}: CandlestickChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center">
        <p className="text-gray-400">No candlestick data available</p>
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

  return (
    <div className="space-y-4">
      {/* Wave Controls */}
      <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
        <div className="flex items-center space-x-2">
          <label className="text-sm">Wave Degree:</label>
          <select
            value={selectedWaveDegree}
            onChange={(e) => onWaveDegreeChange(e.target.value)}
            className="bg-gray-700 text-white px-2 py-1 rounded text-sm"
          >
            <option value="Grand Supercycle">Grand Supercycle</option>
            <option value="Supercycle">Supercycle</option>
            <option value="Cycle">Cycle</option>
            <option value="Primary">Primary</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Minor">Minor</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm">Wave Type:</label>
          <select
            value={selectedWaveType}
            onChange={(e) => onWaveTypeChange(e.target.value)}
            className="bg-gray-700 text-white px-2 py-1 rounded text-sm"
          >
            <option value="1">Wave 1</option>
            <option value="2">Wave 2</option>
            <option value="3">Wave 3</option>
            <option value="4">Wave 4</option>
            <option value="5">Wave 5</option>
            <option value="A">Wave A</option>
            <option value="B">Wave B</option>
            <option value="C">Wave C</option>
          </select>
        </div>

        <div className="text-xs text-green-400">🕯️ Candlestick Mode - Click to place Elliott Waves</div>
      </div>

      {/* User Waves List */}
      {userWaves.length > 0 && (
        <div className="p-4 bg-gray-800/50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Your Elliott Waves:</h4>
          <div className="space-y-1">
            {userWaves.map((wave) => (
              <div key={wave.id} className="flex items-center justify-between text-xs">
                <span>
                  {wave.degree} {wave.type} - {new Date(wave.date).toLocaleDateString()}
                </span>
                <button onClick={() => onRemoveWave(wave.id)} className="text-red-400 hover:text-red-300">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Candlestick Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} onClick={onChartClick} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
              domain={isLogScale ? ["dataMin", "dataMax"] : ["auto", "auto"]}
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

            {/* Volume bars at bottom */}
            <Bar dataKey="volume" fill={`${colors.text}20`} yAxisId="volume" />

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

            {/* User Waves */}
            {userWaves.map((wave) => (
              <ReferenceLine
                key={wave.id}
                x={wave.date}
                stroke="#ff69b4"
                strokeWidth={2}
                label={{ value: `${wave.degree} ${wave.type}`, position: "top", fontSize: 10 }}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Candlestick Legend */}
      <div className="flex items-center justify-center space-x-6 p-3 bg-gray-800/30 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-6 bg-green-500 border border-green-500"></div>
          <span className="text-xs">Bullish (Close &gt; Open)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-6 border border-red-500"></div>
          <span className="text-xs">Bearish (Close &lt; Open)</span>
        </div>
        <div className="text-xs text-gray-400">Wicks show High/Low, Body shows Open/Close</div>
      </div>
    </div>
  )
}
