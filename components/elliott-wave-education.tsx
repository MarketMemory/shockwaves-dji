"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Waves, BarChart3 } from "lucide-react"

export function ElliottWaveEducation() {
  return (
    <div className="space-y-8">
      {/* Elliott Wave Basics */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-300">
            <Waves className="h-6 w-6" />
            <span>Elliott Wave Theory - De Basis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-400">🌊 Impuls Golven (1-2-3-4-5)</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <h4 className="font-semibold text-green-300">Golf 1: De Start</h4>
                  <p className="text-sm text-gray-300">
                    Eerste beweging omhoog. Vaak klein en wordt genegeerd door de massa.
                  </p>
                </div>
                <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <h4 className="font-semibold text-red-300">Golf 2: Correctie</h4>
                  <p className="text-sm text-gray-300">
                    Terugval, vaak diep (50-78% van golf 1). Mensen denken dat de trend voorbij is.
                  </p>
                </div>
                <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <h4 className="font-semibold text-green-300">Golf 3: De Krachtigste</h4>
                  <p className="text-sm text-gray-300">
                    Meestal de langste en sterkste golf. Media en publiek worden enthousiast.
                  </p>
                </div>
                <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <h4 className="font-semibold text-red-300">Golf 4: Kleine Correctie</h4>
                  <p className="text-sm text-gray-300">Minder diepe correctie dan golf 2. Vaak zijwaartse beweging.</p>
                </div>
                <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <h4 className="font-semibold text-green-300">Golf 5: Finale</h4>
                  <p className="text-sm text-gray-300">
                    Laatste golf omhoog. Vaak met minder kracht. Publiek is nu volledig optimistisch.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-orange-400">🔄 Correctie Golven (A-B-C)</h3>
              <div className="space-y-3">
                <div className="p-3 bg-orange-900/20 border border-orange-800 rounded-lg">
                  <h4 className="font-semibold text-orange-300">Golf A: Eerste Daling</h4>
                  <p className="text-sm text-gray-300">
                    Eerste beweging omlaag na de 5-golf cyclus. Vaak gezien als 'tijdelijke correctie'.
                  </p>
                </div>
                <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                  <h4 className="font-semibold text-blue-300">Golf B: Valse Hoop</h4>
                  <p className="text-sm text-gray-300">
                    Beweging omhoog die hoop geeft. Mensen denken dat de bull market terug is.
                  </p>
                </div>
                <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <h4 className="font-semibold text-red-300">Golf C: De Klap</h4>
                  <p className="text-sm text-gray-300">
                    Vaak de meest destructieve golf. Paniek, kapitulatie, en wanhoop domineren.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-purple-900/20 border border-purple-800 rounded-lg">
                <h4 className="font-semibold text-purple-400 mb-2">🔄 Fractale Natuur</h4>
                <p className="text-sm text-gray-300">
                  Elliott Waves zijn fractaal - ze herhalen zich op alle tijdschalen. Een golf 1 op de dagchart bevat
                  een complete 5-golf cyclus op de uurchart.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Praktische Toepassing */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-300">
            <BarChart3 className="h-6 w-6" />
            <span>Praktische Toepassing</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">✅ Wat te Doen</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Koop in golf 2 correcties</li>
                <li>• Verkoop in golf 5 toppen</li>
                <li>• Wacht op golf C bodems</li>
                <li>• Gebruik Fibonacci voor targets</li>
              </ul>
            </div>

            <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
              <h4 className="font-semibold text-red-400 mb-2">❌ Wat te Vermijden</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Kopen in golf B rallies</li>
                <li>• FOMO in golf 3 toppen</li>
                <li>• Paniek verkopen in golf 4</li>
                <li>• Negeren van de grote cyclus</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">🎯 Belangrijke Regels</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Golf 2 mag niet onder golf 1</li>
                <li>• Golf 3 is nooit de kortste</li>
                <li>• Golf 4 mag niet in golf 1</li>
                <li>• Alternatie tussen golven 2 en 4</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Waarom Elliott Waves Werken */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-300">🧠 Waarom Elliott Waves Werken</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-900/20 border border-yellow-800 rounded-lg">
              <h4 className="font-semibold text-yellow-400 mb-2">Menselijke Psychologie</h4>
              <p className="text-sm text-gray-300">
                Markten worden gedreven door menselijke emoties: angst en hebzucht. Deze emoties volgen voorspelbare
                patronen die zich herhalen in cycli.
              </p>
            </div>

            <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">Natuurlijke Patronen</h4>
              <p className="text-sm text-gray-300">
                Elliott Waves zijn gebaseerd op de Fibonacci reeks, die overal in de natuur voorkomt. Van
                zonnebloemzaden tot galaxieën - alles volgt deze verhoudingen.
              </p>
            </div>

            <div className="p-4 bg-purple-900/20 border border-purple-800 rounded-lg">
              <h4 className="font-semibold text-purple-400 mb-2">Zelfvervullende Voorspelling</h4>
              <p className="text-sm text-gray-300">
                Omdat veel traders Elliott Waves gebruiken, worden de patronen sterker. Wanneer iedereen hetzelfde
                support niveau ziet, wordt het een echte support.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
