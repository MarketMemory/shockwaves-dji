"use client"

import { useState, useEffect } from "react"
import { historicalData, candlestickData } from "@/data/crash-data"

interface MarketData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface ShockwavesData {
  data: MarketData[]
  isLoading: boolean
  error: string | null
  dataSource: "api" | "mock" | "historical" | null
  lastUpdated: Date | null
}

export function useShockwavesData(): ShockwavesData {
  const [data, setData] = useState<MarketData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dataSource, setDataSource] = useState<"api" | "mock" | "historical" | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const validateData = (data: any[]): MarketData[] => {
    return data
      .filter((item) => {
        return (
          item &&
          typeof item.date === "string" &&
          typeof item.close === "number" &&
          !isNaN(item.close) &&
          item.close > 0
        )
      })
      .map((item) => ({
        date: item.date,
        open: Number(item.open) || item.close,
        high: Number(item.high) || item.close,
        low: Number(item.low) || item.close,
        close: Number(item.close),
        volume: Number(item.volume) || 0,
      }))
  }

  const generateMockRecentData = (): MarketData[] => {
    const mockData: MarketData[] = []
    const startDate = new Date("2020-01-01")
    const endDate = new Date()
    let currentPrice = 28000

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 7)) {
      const volatility = 0.02
      const change = (Math.random() - 0.5) * volatility
      const open = currentPrice
      const close = currentPrice * (1 + change)
      const high = Math.max(open, close) * (1 + Math.random() * 0.01)
      const low = Math.min(open, close) * (1 - Math.random() * 0.01)
      const volume = Math.floor(Math.random() * 1000000000) + 500000000

      mockData.push({
        date: d.toISOString().split("T")[0],
        open: Math.round(open),
        high: Math.round(high),
        low: Math.round(low),
        close: Math.round(close),
        volume,
      })

      currentPrice = close
    }

    return mockData
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Validate and combine historical data first
        const validHistoricalData = validateData(historicalData)
        const validCandlestickData = validateData(candlestickData)

        console.log("Historical data points:", validHistoricalData.length)
        console.log("Candlestick data points:", validCandlestickData.length)

        try {
          // Generate mock recent data
          const mockData = generateMockRecentData()
          const combinedData = [...validHistoricalData, ...validCandlestickData, ...mockData].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          )

          // Remove duplicates by date
          const uniqueDates = new Map()
          combinedData.forEach((item) => {
            uniqueDates.set(item.date, item)
          })

          const finalData = Array.from(uniqueDates.values())

          setData(finalData)
          setDataSource("mock")
          setLastUpdated(new Date())
          console.log("Successfully loaded mock data, total points:", finalData.length)
        } catch (mockError) {
          console.log("Mock data failed, using historical data only...")

          const combinedData = [...validHistoricalData, ...validCandlestickData].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          )

          setData(combinedData)
          setDataSource("historical")
          setLastUpdated(new Date())
          setError("Using historical data only")
          console.log("Loaded historical data as fallback, total points:", combinedData.length)
        }
      } catch (error) {
        console.error("Critical error loading data:", error)
        setError("Failed to load any data")
        setData([])
        setDataSource(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  return {
    data,
    isLoading,
    error,
    dataSource,
    lastUpdated,
  }
}
