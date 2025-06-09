"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Play, BookOpen } from "lucide-react"

export function TradingViewTutorial() {
  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-300">
          <BookOpen className="h-6 w-6" />
          <span>Maak je Eigen Elliott Wave Chart op TradingView</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <h4 className="text-blue-400 font-semibold mb-2">🎯 Waarom je eigen chart maken?</h4>
          <p className="text-gray-300 text-sm">
            Door je eigen publieke chart te maken op TradingView kun je jouw Elliott Wave analyse delen met de wereld.
            Dit geeft je volledige controle over de educatieve content en laat zien hoe patronen zich ontwikkelen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-400">📝 Stap-voor-Stap Gids</h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
                <h4 className="font-semibold text-green-300">1. Account Aanmaken</h4>
                <p className="text-sm text-gray-300">Ga naar TradingView.com en maak een gratis account</p>
              </div>

              <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                <h4 className="font-semibold text-blue-300">2. Chart Openen</h4>
                <p className="text-sm text-gray-300">Zoek naar "DJI" en open de chart</p>
              </div>

              <div className="p-3 bg-purple-900/20 border border-purple-800 rounded-lg">
                <h4 className="font-semibold text-purple-300">3. Tools Gebruiken</h4>
                <p className="text-sm text-gray-300">Gebruik Elliott Wave tool en Fibonacci retracements</p>
              </div>

              <div className="p-3 bg-orange-900/20 border border-orange-800 rounded-lg">
                <h4 className="font-semibold text-orange-300">4. Publiek Maken</h4>
                <p className="text-sm text-gray-300">Klik "Publish Idea" en maak je analyse publiek</p>
              </div>

              <div className="p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                <h4 className="font-semibold text-yellow-300">5. Embed Link</h4>
                <p className="text-sm text-gray-300">Kopieer de embed link en gebruik op je website</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-400">🛠️ Welke Tools te Gebruiken</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                <h4 className="font-semibold text-blue-300">🌊 Elliott Wave Tool</h4>
                <p className="text-sm text-gray-300">Automatisch golven nummeren (1-2-3-4-5, A-B-C)</p>
              </div>

              <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
                <h4 className="font-semibold text-green-300">📐 Fibonacci Retracement</h4>
                <p className="text-sm text-gray-300">23.6%, 38.2%, 61.8% support/resistance levels</p>
              </div>

              <div className="p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                <h4 className="font-semibold text-yellow-300">📈 Fibonacci Extension</h4>
                <p className="text-sm text-gray-300">127.2%, 161.8% price targets</p>
              </div>

              <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg">
                <h4 className="font-semibold text-red-300">📝 Text Labels</h4>
                <p className="text-sm text-gray-300">Voeg educatieve uitleg toe aan je chart</p>
              </div>

              <div className="p-3 bg-purple-900/20 border border-purple-800 rounded-lg">
                <h4 className="font-semibold text-purple-300">📊 Trendlines</h4>
                <p className="text-sm text-gray-300">Verbind toppen en bodems voor trend analyse</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg">
            <h4 className="font-semibold text-green-400 mb-2">✅ Voordelen van Eigen Chart</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Volledige controle over analyse</li>
              <li>• Educatieve labels en uitleg</li>
              <li>• Updates in real-time</li>
              <li>• Gratis te gebruiken</li>
              <li>• Professionele uitstraling</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
            <h4 className="font-semibold text-blue-400 mb-2">🎯 Tips voor Goede Analyse</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Start met de grote trend</li>
              <li>• Gebruik meerdere timeframes</li>
              <li>• Voeg educatieve tekst toe</li>
              <li>• Update regelmatig</li>
              <li>• Deel je redenering</li>
            </ul>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-800/50">
          <h4 className="font-semibold text-blue-300 mb-3">🚀 Volgende Stappen</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Zodra je je eigen Elliott Wave analyse hebt gemaakt op TradingView, kun je de embed link gebruiken om deze
            op je educatieve website te tonen. Dit geeft bezoekers een live, interactieve ervaring met jouw expertise.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.tradingview.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Ga naar TradingView</span>
            </a>
            <a
              href="https://www.tradingview.com/support/solutions/43000474364-how-to-publish-and-share-a-chart/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>TradingView Tutorial</span>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
