"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Target } from "lucide-react"

export function FibonacciEducation() {
  return (
    <div className="space-y-8">
      {/* Fibonacci Basics */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-golden">
            <Calculator className="h-6 w-6" />
            <span>Fibonacci - De Gouden Verhouding</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-yellow-400">🔢 De Fibonacci Reeks</h3>
              <div className="p-4 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                <p className="text-gray-300 mb-3">
                  De Fibonacci reeks begint met 0 en 1, en elk volgend getal is de som van de twee vorige:
                </p>
                <div className="font-mono text-yellow-400 text-lg">0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...</div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-yellow-300">📐 Belangrijke Verhoudingen:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-blue-900/20 border border-blue-800 rounded text-center">
                    <div className="font-mono text-blue-400">23.6%</div>
                    <div className="text-xs text-gray-400">Zwakke retracement</div>
                  </div>
                  <div className="p-2 bg-green-900/20 border border-green-800 rounded text-center">
                    <div className="font-mono text-green-400">38.2%</div>
                    <div className="text-xs text-gray-400">Normale retracement</div>
                  </div>
                  <div className="p-2 bg-orange-900/20 border border-orange-800 rounded text-center">
                    <div className="font-mono text-orange-400">61.8%</div>
                    <div className="text-xs text-gray-400">Gouden verhouding</div>
                  </div>
                  <div className="p-2 bg-red-900/20 border border-red-800 rounded text-center">
                    <div className="font-mono text-red-400">78.6%</div>
                    <div className="text-xs text-gray-400">Diepe retracement</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-400">🌿 Fibonacci in de Natuur</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <h4 className="font-semibold text-green-300">🌻 Zonnebloemzaden</h4>
                  <p className="text-sm text-gray-300">Spiralen van 21, 34, 55, of 89 zaden</p>
                </div>
                <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <h4 className="font-semibold text-blue-300">🐚 Nautilus Schelp</h4>
                  <p className="text-sm text-gray-300">Perfecte gouden spiraal</p>
                </div>
                <div className="p-3 bg-purple-900/20 border border-purple-800 rounded-lg">
                  <h4 className="font-semibold text-purple-300">🌌 Galaxieën</h4>
                  <p className="text-sm text-gray-300">Spiraalvormige structuren</p>
                </div>
                <div className="p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <h4 className="font-semibold text-yellow-300">👤 Menselijk Lichaam</h4>
                  <p className="text-sm text-gray-300">Verhoudingen van ledematen</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fibonacci in Trading */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-300">
            <Target className="h-6 w-6" />
            <span>Fibonacci in Financiële Markten</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">📉 Fibonacci Retracements</h3>
              <p className="text-gray-300 text-sm">
                Meet hoeveel een prijs terugvalt na een sterke beweging. Gebruikt om support en resistance te vinden.
              </p>

              <div className="space-y-2">
                <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 font-semibold">23.6% Retracement</span>
                    <span className="text-xs text-gray-400">Zwakke correctie</span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">Sterke trend, kleine terugval</p>
                </div>

                <div className="p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-semibold">38.2% Retracement</span>
                    <span className="text-xs text-gray-400">Normale correctie</span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">Gezonde terugval in uptrend</p>
                </div>

                <div className="p-3 bg-orange-900/20 border border-orange-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-orange-400 font-semibold">61.8% Retracement</span>
                    <span className="text-xs text-gray-400">Gouden verhouding</span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">Krachtige support/resistance</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-400">📈 Fibonacci Extensions</h3>
              <p className="text-gray-300 text-sm">
                Voorspelt waar de prijs naartoe kan gaan na een retracement. Gebruikt voor profit targets.
              </p>

              <div className="space-y-2">
                <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-400 font-semibold">127.2% Extension</span>
                    <span className="text-xs text-gray-400">Eerste target</span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">Conservatief doel</p>
                </div>

                <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 font-semibold">161.8% Extension</span>
                    <span className="text-xs text-gray-400">Gouden target</span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">Meest betrouwbare doel</p>
                </div>

                <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-red-400 font-semibold">261.8% Extension</span>
                    <span className="text-xs text-gray-400">Extreme target</span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">Voor zeer sterke trends</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Praktische Tips */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-green-300">💡 Praktische Tips voor Fibonacci</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">✅ Beste Praktijken</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Gebruik op duidelijke trends</li>
                <li>• Combineer met Elliott Waves</li>
                <li>• Zoek naar confluences</li>
                <li>• Gebruik meerdere timeframes</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-900/20 border border-yellow-800 rounded-lg">
              <h4 className="font-semibold text-yellow-400 mb-2">⚠️ Waarschuwingen</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Niet 100% accuraat</li>
                <li>• Werkt niet in zijwaartse markten</li>
                <li>• Subjectief bij het tekenen</li>
                <li>• Gebruik altijd stop losses</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">🎯 Confluence Zones</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Fibonacci + Support/Resistance</li>
                <li>• Fibonacci + Moving Averages</li>
                <li>• Fibonacci + Elliott Wave targets</li>
                <li>• Meerdere Fib levels samen</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
