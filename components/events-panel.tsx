"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrendingDown, AlertTriangle, Zap } from "lucide-react"
import { crashEvents } from "@/data/crash-data"

interface EventsPanelProps {
  theme: string
}

export function EventsPanel({ theme }: EventsPanelProps) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Extreme":
        return <Zap className="h-4 w-4 text-red-500" />
      case "High":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return <TrendingDown className="h-4 w-4 text-yellow-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Extreme":
        return "bg-red-600"
      case "High":
        return "bg-orange-600"
      default:
        return "bg-yellow-600"
    }
  }

  return (
    <Card
      className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : theme === "light" ? "bg-white" : "bg-gray-900 border-green-900"}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingDown className="h-5 w-5 text-red-500" />
          <span>Market Shockwaves</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="space-y-3">
            {crashEvents.map((event) => (
              <div key={event.id} className="p-3 rounded-lg bg-gray-700/50 border border-gray-600">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getSeverityIcon(event.severity)}
                    <h4 className="font-medium text-sm">{event.name}</h4>
                  </div>
                  <Badge className={getSeverityColor(event.severity)}>{event.severity}</Badge>
                </div>

                <div className="text-xs text-gray-400 mb-2">
                  {new Date(event.date).toLocaleDateString()} • {event.impact}
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">{event.description}</p>

                {event.recovery && <div className="mt-2 text-xs text-green-400">Recovery: {event.recovery}</div>}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
