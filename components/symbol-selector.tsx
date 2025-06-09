"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TrendingUp } from "lucide-react"

interface SymbolSelectorProps {
  selectedSymbol: string
  onSymbolChange: (symbol: string) => void
}

export function SymbolSelector({ selectedSymbol, onSymbolChange }: SymbolSelectorProps) {
  const symbols = [
    { value: "DJI", label: "Dow Jones", description: "Dow Jones Industrial Average" },
    { value: "SPX", label: "S&P 500", description: "Standard & Poor's 500" },
    { value: "NDX", label: "NASDAQ 100", description: "NASDAQ 100 Index" },
    { value: "RUT", label: "Russell 2000", description: "Russell 2000 Small Cap" },
  ]

  const currentSymbol = symbols.find((s) => s.value === selectedSymbol)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <TrendingUp className="h-4 w-4 mr-2" />
          {currentSymbol?.label || "Select Index"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {symbols.map((symbol) => (
          <DropdownMenuItem
            key={symbol.value}
            onClick={() => onSymbolChange(symbol.value)}
            className={selectedSymbol === symbol.value ? "bg-gray-100 dark:bg-gray-800" : ""}
          >
            <div>
              <div className="font-medium">{symbol.label}</div>
              <div className="text-xs text-gray-500">{symbol.description}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
