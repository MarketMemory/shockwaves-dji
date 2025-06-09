"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Eye } from "lucide-react"

export function EducationalOverlay() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Wat zie je in de chart */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-300">
            <Eye className="h-5 w-5" />
            <span>Wat zie je in deze chart?</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
            <h4 className="font-semibold text-blue-400 mb-2">📈 Prijsbeweging</h4>
            <p className="text-sm text-gray-300">
              Elke candle toont de open, high, low en close prijs voor die periode. Groene candles = prijs omhoog, rode
              candles = prijs omlaag.
            </p>
          </div>

          <div className="p-4 bg-purple-900/20 border border-purple-800 rounded-lg">
            <h4 className="font-semibold text-purple-400 mb-2">🌊 Elliott Wave Patronen</h4>
            <p className="text-sm text-gray-300">
              Markten bewegen in voorspelbare golf-patronen. 5 golven omhoog (impuls), 3 golven omlaag (correctie). Dit
              herhaalt zich op alle tijdschalen.
            </p>
          </div>

          <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg">
            <h4 className="font-semibold text-green-400 mb-2">📐 Fibonacci Niveaus</h4>
            <p className="text-sm text-gray-300">
              Natuurlijke verhoudingen (23.6%, 38.2%, 61.8%) die vaak fungeren als support en resistance niveaus.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Waarom dit belangrijk is */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-300">
            <Lightbulb className="h-5 w-5" />
            <span>Waarom is dit belangrijk?</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-orange-900/20 border border-orange-800 rounded-lg">
            <h4 className="font-semibold text-orange-400 mb-2">🎯 Voorspelbaarheid</h4>
            <p className="text-sm text-gray-300">
              Als je patronen kunt herkennen, kun je beter begrijpen wanneer markten gaan stijgen of dalen. Dit geeft
              inzicht in economische cycli.
            </p>
          </div>

          <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
            <h4 className="font-semibold text-red-400 mb-2">⚠️ Crises zijn Voorspelbaar</h4>
            <p className="text-sm text-gray-300">
              Financiële crises volgen vaak dezelfde patronen. Door deze te begrijpen, kun je zien wanneer het systeem
              kwetsbaar wordt.
            </p>
          </div>

          <div className="p-4 bg-yellow-900/20 border border-yellow-800 rounded-lg">
            <h4 className="font-semibold text-yellow-400 mb-2">💡 Bewustwording</h4>
            <p className="text-sm text-gray-300">
              Hoe meer mensen deze patronen begrijpen, hoe minder macht de 'makers van het systeem' hebben om mensen te
              misleiden.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
