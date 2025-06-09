"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Brain, AlertTriangle, TrendingUp } from "lucide-react"

export function MarketPsychologyEducation() {
  return (
    <div className="space-y-8">
      {/* Market Psychology Cycle */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-300">
            <Brain className="h-6 w-6" />
            <span>De Psychologie van Marktcycli</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-400">📈 Bull Market Psychologie</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <h4 className="font-semibold text-green-300">1. Ongeloof</h4>
                  <p className="text-sm text-gray-300">"Dit kan niet lang duren, het is een valse rally"</p>
                </div>
                <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <h4 className="font-semibold text-blue-300">2. Hoop</h4>
                  <p className="text-sm text-gray-300">"Misschien is dit wel het begin van iets goeds"</p>
                </div>
                <div className="p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <h4 className="font-semibold text-yellow-300">3. Optimisme</h4>
                  <p className="text-sm text-gray-300">"De markt gaat omhoog, ik ga wat kopen"</p>
                </div>
                <div className="p-3 bg-orange-900/20 border border-orange-800 rounded-lg">
                  <h4 className="font-semibold text-orange-300">4. Enthousiasme</h4>
                  <p className="text-sm text-gray-300">"Ik verdien geld! Ik ga meer kopen!"</p>
                </div>
                <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <h4 className="font-semibold text-red-300">5. Euforie</h4>
                  <p className="text-sm text-gray-300">"Iedereen wordt rijk! Dit gaat voor altijd door!"</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-400">📉 Bear Market Psychologie</h3>
              <div className="space-y-3">
                <div className="p-3 bg-orange-900/20 border border-orange-800 rounded-lg">
                  <h4 className="font-semibold text-orange-300">6. Angst</h4>
                  <p className="text-sm text-gray-300">"Dit is een correctie, het komt wel goed"</p>
                </div>
                <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <h4 className="font-semibold text-red-300">7. Wanhoop</h4>
                  <p className="text-sm text-gray-300">"Ik verlies alles! Wat moet ik doen?"</p>
                </div>
                <div className="p-3 bg-purple-900/20 border border-purple-800 rounded-lg">
                  <h4 className="font-semibold text-purple-300">8. Paniek</h4>
                  <p className="text-sm text-gray-300">"VERKOOP ALLES! Red wat er te redden valt!"</p>
                </div>
                <div className="p-3 bg-gray-800/50 border border-gray-600 rounded-lg">
                  <h4 className="font-semibold text-gray-300">9. Kapitulatie</h4>
                  <p className="text-sm text-gray-300">"Ik geef op. Markten zijn kwaadaardig."</p>
                </div>
                <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <h4 className="font-semibold text-blue-300">10. Depressie</h4>
                  <p className="text-sm text-gray-300">"Ik ga nooit meer beleggen. Het is allemaal oplichterij."</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crowd Behavior */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-300">
            <Users className="h-6 w-6" />
            <span>Kuddegedrag en Massa Psychologie</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-400">🐑 Waarom Mensen de Kudde Volgen</h3>
              <div className="space-y-3">
                <div className="p-3 bg-orange-900/20 border border-orange-800 rounded-lg">
                  <h4 className="font-semibold text-orange-300">FOMO - Fear of Missing Out</h4>
                  <p className="text-sm text-gray-300">
                    "Iedereen wordt rijk behalve ik! Ik moet nu kopen voordat het te laat is!"
                  </p>
                </div>
                <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <h4 className="font-semibold text-red-300">Sociale Validatie</h4>
                  <p className="text-sm text-gray-300">
                    "Als iedereen het doet, moet het wel goed zijn. Ik wil er ook bij horen."
                  </p>
                </div>
                <div className="p-3 bg-purple-900/20 border border-purple-800 rounded-lg">
                  <h4 className="font-semibold text-purple-300">Media Invloed</h4>
                  <p className="text-sm text-gray-300">
                    "De TV zegt dat dit de kans van een leven is. Het moet waar zijn!"
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">🧠 Cognitieve Biases</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <h4 className="font-semibold text-blue-300">Confirmation Bias</h4>
                  <p className="text-sm text-gray-300">Alleen informatie zoeken die je mening bevestigt</p>
                </div>
                <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <h4 className="font-semibold text-green-300">Recency Bias</h4>
                  <p className="text-sm text-gray-300">Denken dat recente trends voor altijd doorgaan</p>
                </div>
                <div className="p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <h4 className="font-semibold text-yellow-300">Loss Aversion</h4>
                  <p className="text-sm text-gray-300">Verlies voelt 2x erger dan winst goed voelt</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How to Think Differently */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-300">
            <TrendingUp className="h-6 w-6" />
            <span>Hoe Anders te Denken dan de Massa</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-3">💡 Contrarian Thinking</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Koop wanneer anderen verkopen</li>
                <li>• Verkoop wanneer anderen kopen</li>
                <li>• "Be fearful when others are greedy"</li>
                <li>• Zoek naar value in onpopulaire assets</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-3">📊 Data-Driven Decisions</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Gebruik technische analyse</li>
                <li>• Volg Elliott Wave patronen</li>
                <li>• Kijk naar Fibonacci levels</li>
                <li>• Negeer emotionele nieuws</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-900/20 border border-purple-800 rounded-lg">
              <h4 className="font-semibold text-purple-400 mb-3">🎯 Long-Term Perspective</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Denk in cycli, niet dagen</li>
                <li>• Begrijp de grote trends</li>
                <li>• Wees geduldig met posities</li>
                <li>• Focus op risicomanagement</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-yellow-900/20 border border-yellow-800 rounded-lg">
            <h4 className="font-semibold text-yellow-400 mb-3">🔑 De Sleutel tot Succes</h4>
            <p className="text-gray-300 leading-relaxed">
              De meeste mensen verliezen geld in markten omdat ze emotioneel handelen en de kudde volgen. Door patronen
              te begrijpen, emoties te controleren, en contrarian te denken, kun je de markt gebruiken in plaats van dat
              de markt jou gebruikt. Het gaat niet om geluk - het gaat om discipline en kennis.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* System Manipulation */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-300">
            <AlertTriangle className="h-6 w-6" />
            <span>Hoe het Systeem de Massa Manipuleert</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-400">🎭 Manipulatie Tactieken</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <h4 className="font-semibold text-red-300">Media Sentiment</h4>
                  <p className="text-sm text-gray-300">
                    Bullish nieuws bij toppen, bearish nieuws bij bodems. Media volgt de markt, voorspelt hem niet.
                  </p>
                </div>
                <div className="p-3 bg-orange-900/20 border border-orange-800 rounded-lg">
                  <h4 className="font-semibold text-orange-300">Expert Opinions</h4>
                  <p className="text-sm text-gray-300">
                    "Experts" zijn vaak het meest bullish bij toppen en bearish bij bodems. Ze volgen de trend.
                  </p>
                </div>
                <div className="p-3 bg-purple-900/20 border border-purple-800 rounded-lg">
                  <h4 className="font-semibold text-purple-300">FOMO Marketing</h4>
                  <p className="text-sm text-gray-300">
                    "Laatste kans!", "Exclusieve deal!", "Iedereen doet het!" - Druk om snel te handelen.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">🛡️ Hoe je Jezelf Beschermt</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <h4 className="font-semibold text-blue-300">Educatie</h4>
                  <p className="text-sm text-gray-300">
                    Leer hoe markten echt werken. Begrijp Elliott Waves, Fibonacci, en marktpsychologie.
                  </p>
                </div>
                <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <h4 className="font-semibold text-green-300">Onafhankelijk Denken</h4>
                  <p className="text-sm text-gray-300">
                    Vorm je eigen mening gebaseerd op data, niet op wat anderen zeggen of doen.
                  </p>
                </div>
                <div className="p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <h4 className="font-semibold text-yellow-300">Emotionele Controle</h4>
                  <p className="text-sm text-gray-300">
                    Herken je emoties en handel niet vanuit angst of hebzucht. Maak een plan en volg het.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
