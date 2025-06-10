"use client"

import { useState } from "react"
import { TrendingUp, BookOpen, Users, Target, Lightbulb, BarChart3, Waves, Calculator } from "lucide-react"
import { CustomElliottChart } from "@/components/custom-elliott-chart"
import { EducationalOverlay } from "@/components/educational-overlay"
import { ElliottWaveEducation } from "@/components/elliott-wave-education"
import { FibonacciEducation } from "@/components/fibonacci-education"
import { MarketPsychologyEducation } from "@/components/market-psychology-education"
import { InteractiveChart } from "@/components/interactive-chart"
import { useShockwavesData } from "@/hooks/use-shockwaves-data"

export default function FinancialEducationPlatform() {
  const [activeSection, setActiveSection] = useState("overview")
  const { data, isLoading, error } = useShockwavesData()

  const sections = [
    { id: "overview", label: "Overzicht", icon: BookOpen },
    { id: "elliott", label: "Elliott Waves", icon: Waves },
    { id: "fibonacci", label: "Fibonacci", icon: Calculator },
    { id: "psychology", label: "Marktpsychologie", icon: Users },
    { id: "interactive", label: "Interactieve Chart", icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Financiële Educatie</h1>
                <p className="text-xs text-gray-400">Begrijp de patronen, zie de waarheid</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-300">
                <span className="text-green-400">●</span> Gratis Educatie
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mission Statement */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl border border-blue-800/50">
          <div className="flex items-start space-x-4">
            <Target className="h-8 w-8 text-blue-400 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-3 text-blue-300">Onze Missie</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Wij geloven dat financiële markten voorspelbare patronen volgen. Door deze kennis te delen, kunnen
                gewone mensen begrijpen hoe het systeem werkt en hoe gebeurtenissen zoals crises vaak voorspelbaar zijn.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-green-400" />
                  <span>Gratis educatie voor iedereen</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Waves className="h-4 w-4 text-blue-400" />
                  <span>Elliott Wave Theory uitgelegd</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-purple-400" />
                  <span>Patronen herkennen in markten</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeSection === section.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{section.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Sections */}
        {activeSection === "overview" && (
          <div className="space-y-8">
            {/* Custom Elliott Wave Chart */}
            {isLoading ? (
              <div className="bg-gray-900/50 rounded-2xl border border-gray-700 p-8">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading market data...</p>
                  </div>
                </div>
              </div>
            ) : (
              <CustomElliottChart data={data} />
            )}

            <EducationalOverlay />
          </div>
        )}

        {activeSection === "elliott" && <ElliottWaveEducation />}
        {activeSection === "fibonacci" && <FibonacciEducation />}
        {activeSection === "psychology" && <MarketPsychologyEducation />}
        {activeSection === "interactive" && <InteractiveChart />}

        {/* Educational Disclaimer */}
        <div className="mt-12 p-6 bg-yellow-900/20 border border-yellow-800 rounded-2xl">
          <h3 className="text-yellow-400 font-semibold mb-3">📚 Educatieve Disclaimer</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Deze website is puur educatief en bedoeld om mensen te leren over financiële markten en patronen. Dit is
            geen financieel advies en geen aanbeveling om te investeren. Alle informatie dient alleen voor educatieve
            doeleinden. Doe altijd je eigen onderzoek en raadpleeg een financieel adviseur voordat je
            investeringsbeslissingen neemt.
          </p>
        </div>
      </div>
    </div>
  )
}
