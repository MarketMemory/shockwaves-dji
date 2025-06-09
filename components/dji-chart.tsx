"use client"

import { useState, useMemo } from "react"
import { subDays, subMonths, subYears } from "date-fns"
import { SimpleChart } from "@/components/simple-chart"
import { CandlestickChart } from "@/components/candlestick-chart"

interface DJIChartProps {
  data: any[]
  interval: string
  isLogScale: boolean
  chartType: "line" | "candlestick"
  theme: string
  isLoading: boolean
}

export function DJIChart({ data, interval, isLogScale, chartType, theme, isLoading }: DJIChartProps) {
  const [userWaves, setUserWaves] = useState<any[]>([])
  const [selectedWaveDegree, setSelectedWaveDegree] = useState("Primary")
  const [selectedWaveType, setSelectedWaveType] = useState("1")

  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return []

    const now = new Date()
    let startDate: Date

    switch (interval) {
      case "1W":
        startDate = subDays(now, 7)
        break
      case "1M":
        startDate = subMonths(now, 1)
        break
      case "3M":
        startDate = subMonths(now, 3)
        break
      case "6M":
        startDate = subMonths(now, 6)
        break
      case "1Y":
        startDate = subYears(now, 1)
        break
      default:
        return data
    }

    return data.filter((item) => {
      try {
        const itemDate = new Date(item.date)
        return !isNaN(itemDate.getTime()) && itemDate >= startDate
      } catch {
        return false
      }
    })
  }, [data, interval])

  const handleChartClick = (event: any) => {
    if (event && event.activeLabel) {
      const newWave = {
        id: Date.now(),
        date: event.activeLabel,
        degree: selectedWaveDegree,
        type: selectedWaveType,
        confidence: "Medium",
        user: true,
      }
      setUserWaves([...userWaves, newWave])
    }
  }

  const removeUserWave = (id: number) => {
    setUserWaves(userWaves.filter((wave) => wave.id !== id))
  }

  if (chartType === "candlestick") {
    return (
      <CandlestickChart
        data={filteredData}
        isLogScale={isLogScale}
        theme={theme}
        onChartClick={handleChartClick}
        userWaves={userWaves}
        onRemoveWave={removeUserWave}
        selectedWaveDegree={selectedWaveDegree}
        selectedWaveType={selectedWaveType}
        onWaveDegreeChange={setSelectedWaveDegree}
        onWaveTypeChange={setSelectedWaveType}
      />
    )
  }

  return (
    <div className="space-y-4">
      {/* Wave Controls */}
      <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
        <div className="flex items-center space-x-2">
          <label className="text-sm">Wave Degree:</label>
          <select
            value={selectedWaveDegree}
            onChange={(e) => setSelectedWaveDegree(e.target.value)}
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
            onChange={(e) => setSelectedWaveType(e.target.value)}
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

        <div className="text-xs text-gray-400">Click on chart to place waves</div>
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
                <button onClick={() => removeUserWave(wave.id)} className="text-red-400 hover:text-red-300">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <SimpleChart
        data={filteredData}
        interval={interval}
        isLogScale={isLogScale}
        theme={theme}
        isLoading={isLoading}
      />
    </div>
  )
}
