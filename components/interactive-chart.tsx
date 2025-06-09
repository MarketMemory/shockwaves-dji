"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Eraser, Download, RotateCcw } from "lucide-react"

export function InteractiveChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<"pen" | "eraser">("pen")
  const [drawings, setDrawings] = useState<any[]>([])
  const [currentPath, setCurrentPath] = useState<any[]>([])

  // Sample market data for the background
  const marketData = [
    { x: 50, y: 300 },
    { x: 100, y: 280 },
    { x: 150, y: 320 },
    { x: 200, y: 250 },
    { x: 250, y: 200 },
    { x: 300, y: 180 },
    { x: 350, y: 220 },
    { x: 400, y: 160 },
    { x: 450, y: 140 },
    { x: 500, y: 180 },
    { x: 550, y: 120 },
    { x: 600, y: 100 },
    { x: 650, y: 140 },
    { x: 700, y: 160 },
    { x: 750, y: 120 },
  ]

  useEffect(() => {
    drawChart()
  }, [drawings])

  const drawChart = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#374151"
    ctx.lineWidth = 1
    ctx.setLineDash([2, 4])

    // Vertical lines
    for (let x = 0; x <= canvas.width; x += 50) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += 50) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    ctx.setLineDash([])

    // Draw market data
    ctx.strokeStyle = "#f59e0b"
    ctx.lineWidth = 3
    ctx.beginPath()

    marketData.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        ctx.lineTo(point.x, point.y)
      }
    })

    ctx.stroke()

    // Draw market data points
    ctx.fillStyle = "#f59e0b"
    marketData.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI)
      ctx.fill()
    })

    // Draw user drawings
    drawings.forEach((drawing) => {
      ctx.strokeStyle = drawing.color
      ctx.lineWidth = drawing.width
      ctx.beginPath()

      drawing.path.forEach((point: any, index: number) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }
      })

      ctx.stroke()
    })

    // Draw current path
    if (currentPath.length > 0) {
      ctx.strokeStyle = tool === "pen" ? "#10b981" : "#ef4444"
      ctx.lineWidth = tool === "pen" ? 2 : 8
      ctx.beginPath()

      currentPath.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }
      })

      ctx.stroke()
    }
  }

  const startDrawing = (e: React.MouseEvent) => {
    setIsDrawing(true)
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setCurrentPath([{ x, y }])
    }
  }

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return

    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setCurrentPath((prev) => [...prev, { x, y }])
    }
  }

  const stopDrawing = () => {
    if (isDrawing && currentPath.length > 0) {
      const newDrawing = {
        path: currentPath,
        color: tool === "pen" ? "#10b981" : "#ef4444",
        width: tool === "pen" ? 2 : 8,
        tool,
      }
      setDrawings((prev) => [...prev, newDrawing])
    }
    setIsDrawing(false)
    setCurrentPath([])
  }

  const clearCanvas = () => {
    setDrawings([])
    setCurrentPath([])
  }

  const saveDrawing = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const link = document.createElement("a")
      link.download = "market-analysis.png"
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-300">
            <Pencil className="h-6 w-6" />
            <span>Interactieve Chart - Teken je Eigen Analyse</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tools */}
          <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Button
                variant={tool === "pen" ? "default" : "outline"}
                size="sm"
                onClick={() => setTool("pen")}
                className="flex items-center space-x-2"
              >
                <Pencil className="h-4 w-4" />
                <span>Tekenen</span>
              </Button>
              <Button
                variant={tool === "eraser" ? "default" : "outline"}
                size="sm"
                onClick={() => setTool("eraser")}
                className="flex items-center space-x-2"
              >
                <Eraser className="h-4 w-4" />
                <span>Gum</span>
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={clearCanvas} className="flex items-center space-x-2">
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </Button>
              <Button variant="outline" size="sm" onClick={saveDrawing} className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="border border-gray-600 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              width={800}
              height={400}
              className="w-full h-auto bg-gray-900 cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>

          {/* Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">📈 Trendlijnen</h4>
              <p className="text-sm text-gray-300">
                Teken lijnen die de toppen en bodems verbinden om trends te identificeren.
              </p>
            </div>

            <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">🌊 Elliott Waves</h4>
              <p className="text-sm text-gray-300">Markeer de 5-golf impuls patronen en 3-golf correctie patronen.</p>
            </div>

            <div className="p-4 bg-purple-900/20 border border-purple-800 rounded-lg">
              <h4 className="font-semibold text-purple-400 mb-2">📐 Support/Resistance</h4>
              <p className="text-sm text-gray-300">
                Teken horizontale lijnen waar de prijs vaak stuit of support vindt.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Educational Tips */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-300">💡 Tips voor Chart Analyse</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-yellow-400">✅ Wat te Zoeken</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Hogere toppen en hogere bodems (uptrend)</li>
                <li>• Lagere toppen en lagere bodems (downtrend)</li>
                <li>• Breakouts uit consolidatie patronen</li>
                <li>• Volume confirmatie bij bewegingen</li>
                <li>• Divergenties tussen prijs en momentum</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-red-400">❌ Veelgemaakte Fouten</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Te veel lijnen tekenen (chart vervuiling)</li>
                <li>• Lijnen forceren waar geen patroon is</li>
                <li>• Negeren van de grotere trend</li>
                <li>• Emotioneel reageren op korte bewegingen</li>
                <li>• Vergeten van risicomanagement</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-900/20 border border-green-800 rounded-lg">
            <h4 className="font-semibold text-green-400 mb-2">🎯 Oefening Maakt de Meester</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Gebruik deze interactieve chart om te oefenen met het herkennen van patronen. Begin met het tekenen van
              eenvoudige trendlijnen en werk je weg omhoog naar complexere Elliott Wave analyses. Hoe meer je oefent,
              hoe beter je wordt in het zien van de onderliggende structuur van marktbewegingen.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
