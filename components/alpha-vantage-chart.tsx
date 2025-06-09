"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { format } from "date-fns"

interface AlphaVantageChartProps {
  timeframe: string
}

export function AlphaVantageChart({ timeframe }: AlphaVantageChartProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDJIData()
  }, [timeframe])

  const fetchDJIData = async () => {
    setLoading(true)
    setError(null)

    try {
      const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || "demo"

      // Try different DJI symbols that might work with Alpha Vantage
      const djiSymbols = ["DJI", "^DJI", "DJIA", "DIA"] // DIA is the DJI ETF
      let functionType = "TIME_SERIES_DAILY"
      let outputSize = "compact"

      if (timeframe === "ALL" || timeframe === "5Y") {
        functionType = "TIME_SERIES_WEEKLY"
        outputSize = "full"
      } else if (timeframe === "1Y") {
        functionType = "TIME_SERIES_DAILY"
        outputSize = "full"
      }

      let successfulData = null
      let usedSymbol = ""

      // Try each DJI symbol until one works
      for (const symbol of djiSymbols) {
        try {
          console.log(`🎯 Trying DJI symbol: ${symbol}`)

          const response = await fetch(
            `https://www.alphavantage.co/query?function=${functionType}&symbol=${symbol}&outputsize=${outputSize}&apikey=${apiKey}`,
          )

          if (!response.ok) continue

          const result = await response.json()
          console.log(`Response for ${symbol}:`, Object.keys(result))

          // Check for API errors
          if (result["Error Message"] || result["Note"] || result["Information"]) {
            console.log(`${symbol} failed:`, result["Error Message"] || result["Note"] || result["Information"])
            continue
          }

          // Find time series data
          const timeSeriesKey = Object.keys(result).find(
            (key) => key.includes("Time Series") || key.includes("Weekly") || key.includes("Monthly"),
          )

          if (timeSeriesKey && result[timeSeriesKey]) {
            successfulData = result[timeSeriesKey]
            usedSymbol = symbol
            console.log(`✅ Success with ${symbol}!`)
            break
          }
        } catch (e) {
          console.log(`Error with ${symbol}:`, e)
          continue
        }
      }

      if (!successfulData) {
        throw new Error("Could not fetch DJI data from any symbol variant")
      }

      // Parse the successful data
      const chartData = Object.entries(successfulData)
        .map(([date, values]: [string, any]) => {
          try {
            return {
              date,
              open: Number.parseFloat(values["1. open"]) || 0,
              high: Number.parseFloat(values["2. high"]) || 0,
              low: Number.parseFloat(values["3. low"]) || 0,
              close: Number.parseFloat(values["4. close"]) || 0,
              volume: Number.parseInt(values["5. volume"] || "0") || 0,
            }
          } catch (e) {
            return null
          }
        })
        .filter((item) => item !== null && item.close > 0)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      if (chartData.length === 0) {
        throw new Error("No valid DJI data points found")
      }

      console.log(`✅ Successfully loaded ${chartData.length} DJI data points using symbol: ${usedSymbol}`)
      setData(chartData)
      setError(null)
    } catch (err) {
      console.error("Error fetching DJI data:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch DJI data")

      // Generate realistic DJI demo data as fallback
      console.log("🔄 Using DJI demo data as fallback")
      setData(generateDJIDemoData())
    } finally {
      setLoading(false)
    }
  }

  const generateDJIDemoData = () => {
    const data = []
    const startDate = new Date("2020-01-01")
    const endDate = new Date()
    let currentPrice = 28000 // Realistic DJI starting price

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      if (d.getDay() !== 0 && d.getDay() !== 6) {
        // Skip weekends
        const volatility = 0.015
        const trend = 0.0002 // Slight upward trend
        const change = (Math.random() - 0.5) * volatility + trend
        const open = currentPrice
        const close = currentPrice * (1 + change)
        const high = Math.max(open, close) * (1 + Math.random() * 0.008)
        const low = Math.min(open, close) * (1 - Math.random() * 0.008)

        data.push({
          date: d.toISOString().split("T")[0],
          open: Math.round(open),
          high: Math.round(high),
          low: Math.round(low),
          close: Math.round(close),
          volume: Math.floor(Math.random() * 1000000000) + 500000000,
        })

        currentPrice = close
      }
    }

    return data.slice(-252) // Last year of trading days
  }

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading DJI data...</p>
          <p className="text-xs text-gray-500 mt-2">Trying multiple DJI symbol variants</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
        <p className="text-green-400 text-sm">
          🎯 Alpha Vantage: DJI (Dow Jones Industrial Average) • {data.length} data points
          {error && " • Using demo data as fallback"}
        </p>
      </div>

      {error && (
        <div className="p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
          <p className="text-yellow-400 text-sm">⚠️ {error}</p>
          <button
            onClick={fetchDJIData}
            className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
          >
            Retry DJI Data
          </button>
        </div>
      )}

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                try {
                  return format(new Date(value), "MMM dd")
                } catch {
                  return value
                }
              }}
              stroke="#9ca3af"
            />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              labelFormatter={(label) => {
                try {
                  return format(new Date(label), "PPP")
                } catch {
                  return label
                }
              }}
              formatter={(value: number, name: string) => [`${value?.toLocaleString() || "N/A"} points`, "DJI Close"]}
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#d1d5db",
              }}
            />
            <Line type="monotone" dataKey="close" stroke="#f59e0b" strokeWidth={2} dot={false} connectNulls={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
