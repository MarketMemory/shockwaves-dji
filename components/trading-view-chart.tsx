"use client"

import { useEffect, useRef } from "react"

interface TradingViewChartProps {
  symbol?: string
  interval?: string
  theme?: "light" | "dark"
  height?: number
}

export function TradingViewChart({
  symbol = "DJI",
  interval = "D",
  theme = "dark",
  height = 400,
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear any existing widget completely
    containerRef.current.innerHTML = ""

    // Wait a bit to ensure clean slate
    const timer = setTimeout(() => {
      if (!containerRef.current) return

      // Create unique container ID
      const containerId = `tradingview_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Create container div
      const widgetContainer = document.createElement("div")
      widgetContainer.id = containerId
      widgetContainer.style.height = "100%"
      widgetContainer.style.width = "100%"
      containerRef.current.appendChild(widgetContainer)

      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
      script.type = "text/javascript"
      script.async = true

      // FORCE DJI symbol - verschillende varianten proberen
      const djiSymbol = "TVC:DJI" // Dow Jones Industrial Average

      console.log("🎯 Loading TradingView with DJI symbol:", djiSymbol)

      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: djiSymbol, // HARD-CODED DJI
        interval: interval,
        timezone: "Etc/UTC",
        theme: theme,
        style: "1", // Candlestick
        locale: "en",
        enable_publishing: false,
        backgroundColor: theme === "dark" ? "rgba(15, 23, 42, 1)" : "rgba(255, 255, 255, 1)",
        gridColor: theme === "dark" ? "rgba(55, 65, 81, 1)" : "rgba(229, 231, 235, 1)",
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        container_id: containerId,
        studies: ["Volume@tv-basicstudies"],
        overrides: {
          "paneProperties.background": theme === "dark" ? "#0f172a" : "#ffffff",
          "paneProperties.vertGridProperties.color": theme === "dark" ? "#374151" : "#e5e7eb",
          "paneProperties.horzGridProperties.color": theme === "dark" ? "#374151" : "#e5e7eb",
          "symbolWatermarkProperties.transparency": 90,
          "scalesProperties.textColor": theme === "dark" ? "#d1d5db" : "#374151",
          "mainSeriesProperties.candleStyle.upColor": "#10b981",
          "mainSeriesProperties.candleStyle.downColor": "#ef4444",
          "mainSeriesProperties.candleStyle.borderUpColor": "#10b981",
          "mainSeriesProperties.candleStyle.borderDownColor": "#ef4444",
          "mainSeriesProperties.candleStyle.wickUpColor": "#10b981",
          "mainSeriesProperties.candleStyle.wickDownColor": "#ef4444",
        },
      })

      containerRef.current.appendChild(script)
    }, 100)

    return () => {
      clearTimeout(timer)
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [symbol, interval, theme]) // Re-render when any prop changes

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <div className="p-2 bg-green-900/20 border border-green-800 rounded-t-lg">
        <p className="text-xs text-green-400">🎯 TradingView: Forcing DJI (Dow Jones Industrial Average)</p>
      </div>
      <div ref={containerRef} className="w-full h-full rounded-b-lg overflow-hidden bg-gray-900" />
    </div>
  )
}
