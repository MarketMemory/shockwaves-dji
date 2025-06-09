"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Waves, Plus } from "lucide-react"
import { elliottWaves } from "@/data/crash-data"

interface ElliottWavePanelProps {
  theme: string
}

export function ElliottWavePanel({ theme }: ElliottWavePanelProps) {
  const [visibleDegrees, setVisibleDegrees] = useState<Record<string, boolean>>({
    "Grand Supercycle": true,
    Supercycle: true,
    Cycle: true,
    Primary: true,
    Intermediate: false,
    Minor: false,
  })

  const toggleDegree = (degree: string) => {
    setVisibleDegrees((prev) => ({
      ...prev,
      [degree]: !prev[degree],
    }))
  }

  const getDegreeColor = (degree: string) => {
    switch (degree) {
      case "Grand Supercycle":
        return "bg-yellow-600"
      case "Supercycle":
        return "bg-orange-600"
      case "Cycle":
        return "bg-teal-600"
      case "Primary":
        return "bg-blue-600"
      case "Intermediate":
        return "bg-green-600"
      case "Minor":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "High":
        return "text-green-400"
      case "Medium":
        return "text-yellow-400"
      case "Low":
        return "text-orange-400"
      case "Projection":
        return "text-purple-400"
      default:
        return "text-gray-400"
    }
  }

  const degrees = ["Grand Supercycle", "Supercycle", "Cycle", "Primary", "Intermediate", "Minor"]
  const filteredWaves = elliottWaves.filter((wave) => visibleDegrees[wave.degree])

  return (
    <Card
      className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : theme === "light" ? "bg-white" : "bg-gray-900 border-green-900"}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Waves className="h-5 w-5 text-blue-500" />
          <span>Elliott Waves</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Degree Toggles */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Wave Degrees</h4>
          <div className="grid grid-cols-1 gap-2">
            {degrees.map((degree) => (
              <div key={degree} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded ${getDegreeColor(degree)}`} />
                  <Label htmlFor={degree} className="text-xs">
                    {degree}
                  </Label>
                </div>
                <Switch
                  id={degree}
                  checked={visibleDegrees[degree]}
                  onCheckedChange={() => toggleDegree(degree)}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Add Wave Button */}
        <Button variant="outline" size="sm" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Elliott Wave
        </Button>

        {/* Waves List */}
        <div>
          <h4 className="text-sm font-medium mb-2">Active Waves ({filteredWaves.length})</h4>
          <ScrollArea className="h-48">
            <div className="space-y-2">
              {filteredWaves.map((wave) => (
                <div key={wave.id} className="p-2 rounded-lg bg-gray-700/50 border border-gray-600">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded ${getDegreeColor(wave.degree)}`} />
                      <span className="text-xs font-medium">{wave.label}</span>
                    </div>
                    <Badge variant="outline" className={getConfidenceColor(wave.confidence)}>
                      {wave.confidence}
                    </Badge>
                  </div>

                  <div className="text-xs text-gray-400 mb-1">
                    {new Date(wave.date).toLocaleDateString()} • {wave.type}
                  </div>

                  <div className="text-xs text-gray-300">{wave.degree} degree wave</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Wave Theory Info */}
        <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-800">
          <h4 className="text-xs font-medium text-blue-400 mb-1">Elliott Wave Theory</h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            Markets move in predictable wave patterns. Impulse waves (1,3,5) move with the trend, corrective waves
            (2,4,A,B,C) move against it.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
