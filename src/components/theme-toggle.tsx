"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useHotkeys } from "react-hotkeys-hook"
import { MoonIcon, SunIcon } from "lucide-react"

import { META_THEME_COLORS } from "@/config/site"
import { useClickSound } from "@/hooks/soundcn/use-click-sound"
import { useMetaColor } from "@/hooks/use-meta-color"

import { Tooltip, TooltipContent, TooltipTrigger } from "./base/ui/tooltip"
import { Button } from "./ui/button"
import { Kbd } from "./ui/kbd"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => { setMounted(true) }, [])

  const { setMetaColor } = useMetaColor()

  const [click] = useClickSound()

  const switchTheme = () => {
    click()
    const next = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(next)
    setMetaColor(
      next === "dark" ? META_THEME_COLORS.dark : META_THEME_COLORS.light
    )
  }

  useHotkeys("d", () => switchTheme())

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            className="relative touch-manipulation border-none"
            variant="ghost"
            size="icon-sm"
            aria-label="Toggle Mode"
            onClick={() => switchTheme()}
          >
            <span
              className="absolute size-12 pointer-fine:hidden"
              aria-hidden
            />
            {mounted && resolvedTheme === "dark" ? (
              <MoonIcon className="size-4" aria-hidden />
            ) : (
              <SunIcon className="size-4" aria-hidden />
            )}
          </Button>
        }
      />
      <TooltipContent className="pr-2 pl-3">
        <div className="flex items-center gap-3">
          Toggle Mode
          <Kbd>D</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
