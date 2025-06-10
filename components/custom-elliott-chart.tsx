"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Waves, TrendingUp } from "lucide-react"

// Historical data (1896–June 2025)
const historicalData = [
  { date: "1896-05-26", open: 28.89, high: 28.89, low: 28.89, close: 28.89, volume: 0 },
  { date: "1900-01-01", open: 66.08, high: 66.08, low: 66.08, close: 66.08, volume: 0 },
  { date: "1905-01-01", open: 96.2, high: 96.2, low: 96.2, close: 96.2, volume: 0 },
  { date: "1910-01-01", open: 81.36, high: 81.36, low: 81.36, close: 81.36, volume: 0 },
  { date: "1915-01-01", open: 99.15, high: 99.15, low: 99.15, close: 99.15, volume: 0 },
  { date: "1920-01-01", open: 107.23, high: 107.23, low: 107.23, close: 107.23, volume: 0 },
  { date: "1925-01-01", open: 159.39, high: 159.39, low: 159.39, close: 159.39, volume: 0 },
  { date: "1929-09-03", open: 381.17, high: 381.17, low: 381.17, close: 381.17, volume: 0 },
  { date: "1929-10-29", open: 230.07, high: 230.07, low: 230.07, close: 230.07, volume: 0 },
  { date: "1932-07-08", open: 41.22, high: 41.22, low: 41.22, close: 41.22, volume: 0 },
  { date: "1935-01-01", open: 144.13, high: 144.13, low: 144.13, close: 144.13, volume: 0 },
  { date: "1940-01-01", open: 150.24, high: 150.24, low: 150.24, close: 150.24, volume: 0 },
  { date: "1945-01-01", open: 192.91, high: 192.91, low: 192.91, close: 192.91, volume: 0 },
  { date: "1950-01-01", open: 200.13, high: 200.13, low: 200.13, close: 200.13, volume: 0 },
  { date: "1955-01-01", open: 488.4, high: 488.4, low: 488.4, close: 488.4, volume: 0 },
  { date: "1960-01-01", open: 679.36, high: 679.36, low: 679.36, close: 679.36, volume: 0 },
  { date: "1965-01-01", open: 969.26, high: 969.26, low: 969.26, close: 969.26, volume: 0 },
  { date: "1970-01-01", open: 809.2, high: 809.2, low: 809.2, close: 809.2, volume: 0 },
  { date: "1974-12-06", open: 577.6, high: 577.6, low: 577.6, close: 577.6, volume: 0 },
  { date: "1975-01-01", open: 852.41, high: 852.41, low: 852.41, close: 852.41, volume: 0 },
  { date: "1980-01-01", open: 838.74, high: 838.74, low: 838.74, close: 838.74, volume: 0 },
  { date: "1985-01-01", open: 1546.67, high: 1546.67, low: 1546.67, close: 1546.67, volume: 0 },
  { date: "1987-10-19", open: 1738.74, high: 1738.74, low: 1738.74, close: 1738.74, volume: 0 },
  { date: "1990-01-01", open: 2753.2, high: 2753.2, low: 2753.2, close: 2753.2, volume: 0 },
  { date: "1995-01-01", open: 5117.12, high: 5117.12, low: 5117.12, close: 5117.12, volume: 0 },
  { date: "2000-01-14", open: 11722.98, high: 11722.98, low: 11722.98, close: 11722.98, volume: 0 },
  { date: "2005-01-01", open: 10783.75, high: 10783.75, low: 10783.75, close: 10783.75, volume: 0 },
  { date: "2009-03-09", open: 6547.05, high: 6547.05, low: 6547.05, close: 6547.05, volume: 0 },
  { date: "2010-01-01", open: 10428.05, high: 10428.05, low: 10428.05, close: 10428.05, volume: 0 },
  { date: "2015-01-01", open: 17823.07, high: 17823.07, low: 17823.07, close: 17823.07, volume: 0 },
  { date: "2020-01-01", open: 28634.88, high: 28634.88, high: 28634.88, low: 28634.88, volume: 0 },
  { date: "2020-03-31", open: 21917.16, high: 21917.16, low: 21917.16, close: 21917.16, volume: 0 },
  { date: "2020-12-31", open: 30606.48, high: 30606.48, low: 30606.48, close: 30606.48, volume: 0 },
  { date: "2024-12-31", open: 42520.53, high: 42520.53, low: 42520.53, close: 42520.53, volume: 0 },
  { date: "2025-06-06", open: 42762.87, high: 42762.87, low: 42762.87, close: 42762.87, volume: 0 }
]

interface CustomElliottChartProps {
  data: any[]
}

export function CustomElliottChart({ data }: CustomElliottChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredPoint, setHoveredPoint] = useState<any>(null)
  const [showElliottWaves, setShowElliottWaves] = useState(true)
  const [showFibonacci, setShowFibonacci] = useState(true)
  const [isLogScale, setIsLogScale] = useState(true)

  // Updated Elliott Wave annotations for historicalData
  const elliottWavePoints = [
    { date: "1932-07-08", type: "1", label: "Wave 1 Start", description: "Begin van herstel na Depressie crash" },
    { date: "1940-01-01", type: "2", label: "Wave 2", description: "Correctie na herstel" },
    { date: "1965-01-01", type: "3", label: "Wave 3", description: "Krachtige bull markt" },
    { date: "1974-12-06", type: "4", label: "Wave 4", description: "Bear markt correctie" },
    { date: "2000-01-14", type: "5", label: "Wave 5", description: "Dot-com piek" },
    { date: "2009-03-09", type: "1", label: "Wave 1 Start", description: "Herstel na financiële crisis" },
    { date: "2020-03-31", type: "2", label: "Wave 2", description: "COVID-19 correctie" },
    { date: "2025-06-06", type: "3", label: "Wave 3", description: "Huidige bull markt" },
  ]

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

    ctx.clearRect(0, 0, width, height)

    const prices = data.map((d) => d.close).filter((p) => p > 0)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice
    const pricePadding = priceRange * 0.1

    const scaleX = (index: number) => padding.left + (index / (data.length - 1)) * plotWidth
    const scaleY = (price: number) => {
      if (isLogScale) {
        const logMin = Math.log(minPrice - pricePadding > 0 ? minPrice - pricePadding : 1)
        const logMax = Math.log(maxPrice + pricePadding)
        const logPrice = Math.log(price)
        return padding.top + plotHeight - ((logPrice - logMin) / (logMax - logMin)) * plotHeight
      } else {
        return (
          padding.top +
          plotHeight -
          ((price - (minPrice - pricePadding)) / (priceRange + 2 * pricePadding)) * plotHeight
        )
      }
    }

    ctx.strokeStyle = "#374151"
    ctx.lineWidth = 1
    ctx.setLineDash([2, 4])
    ctx.globalAlpha = 0.3

    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (i / 5) * plotHeight
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()
    }

    for (let i = 0; i <= 8; i++) {
      const x = padding.left + (i / 8) * plotWidth
      ctx.beginPath()
      ctx.moveTo(x, padding.top)
      ctx.lineTo(x, height - padding.bottom)
      ctx.stroke()
    }

    ctx.setLineDash([])
    ctx.globalAlpha = 1.0

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

    if (showFibonacci) {
      const recentHigh = Math.max(...data.slice(-100).map((d) => d.close))
      const recentLow = Math.min(...data.slice(-100).map((d) => d.close))

      fibonacciLevels.forEach((fib) => {
        let fibPrice
        if (isLogScale) {
          const logHigh = Math.log(recentHigh)
          const logLow = Math.log(recentLow)
          const logRange = logHigh - logLow
          fibPrice = Math.exp(logHigh - logRange * fib.level)
        } else {
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

        ctx.fillStyle = fib.color
        ctx.font = "12px monospace"
        ctx.fillText(`${(fib.level * 100).toFixed(1)}%`, width - padding.right + 5, y + 4)

        ctx.setLineDash([])
        ctx.globalAlpha = 1.0
      })
    }

    if (showElliottWaves) {
      elliottWavePoints.forEach((wave) => {
        const dataIndex = data.findIndex((d) => d.date >= wave.date)
        if (dataIndex === -1) return

        const x = scaleX(dataIndex)
        const y = scaleY(data[dataIndex].close)

        ctx.fillStyle = wave.type === "1" || wave.type === "3" || wave.type === "5" ? "#10b981" : "#ef4444"
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, 2 * Math.PI)
        ctx.fill()

        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(wave.type, x, y + 4)

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

    ctx.strokeStyle = "#6b7280"
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(padding.left, height - padding.bottom)
    ctx.lineTo(width - padding.right, height - padding.bottom)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, height - padding.bottom)
    ctx.stroke()

    ctx.fillStyle = "#9ca3af"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"

    const labelStep = Math.max(Math.floor(data.length / 8), 1)
    for (let i = 0; i < data.length; i += labelStep) {
      const x = scaleX(i)
      const date = new Date(data[i].date)
      ctx.fillText(format(date, "MMM yyyy"), x, height - padding.bottom + 20)
    }

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
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="w-full h-auto bg-gray-900 rounded-lg cursor-crosshair"
            onClick={handleCanvasClick}
          />
          {hoveredPoint && (
            <div className="absolute top-4 left-4 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl">
              <div className="text-sm font-medium text-white mb-1">{format(new Date(hoveredPoint.date), "PPP")}</div>
              <div className="text-xs text-gray-300">Close: {hoveredPoint.close.toLocaleString()} points</div>
            </div>
          )}
        </div>
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
                Fibonacci retracements helpen support en resistance levels
              </div>
            </div>
          )}
        </div>
        <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg">
          <h4 className="font-semibold text-green-400 mb-2">History & Learning</h4>
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

export default function App() {
  return <CustomElliottChart data={historicalData} />
}
