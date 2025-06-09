"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Palette, Moon, Sun, Monitor } from "lucide-react"

interface ThemeSelectorProps {
  theme: string
  onThemeChange: (theme: string) => void
}

export function ThemeSelector({ theme, onThemeChange }: ThemeSelectorProps) {
  const themes = [
    { value: "dark", label: "Dark", icon: Moon },
    { value: "light", label: "Light", icon: Sun },
    { value: "tradingview", label: "TradingView", icon: Monitor },
  ]

  const currentTheme = themes.find((t) => t.value === theme)
  const CurrentIcon = currentTheme?.icon || Palette

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <CurrentIcon className="h-4 w-4 mr-2" />
          {currentTheme?.label || "Theme"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon
          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => onThemeChange(themeOption.value)}
              className={theme === themeOption.value ? "bg-gray-100 dark:bg-gray-800" : ""}
            >
              <Icon className="h-4 w-4 mr-2" />
              {themeOption.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
