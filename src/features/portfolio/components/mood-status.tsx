"use client"

import { useEffect, useState } from "react"
import { TZDate } from "@date-fns/tz"

type Mood = {
  label: string
  color: string
  dotColor: string
}

function getMood(hour: number): Mood {
  if (hour >= 7 && hour < 9) {
    return { label: "Morning grind", color: "text-emerald-600 dark:text-emerald-400", dotColor: "bg-emerald-500" }
  }
  if (hour >= 9 && hour < 17) {
    return { label: "Coding", color: "text-blue-600 dark:text-blue-400", dotColor: "bg-blue-500" }
  }
  if (hour >= 17 && hour < 22) {
    return { label: "Building side projects", color: "text-zinc-700 dark:text-zinc-300", dotColor: "bg-zinc-500" }
  }
  if (hour >= 22 || hour < 1) {
    return { label: "Late night grind", color: "text-amber-600 dark:text-amber-400", dotColor: "bg-amber-500" }
  }
  return { label: "Sleeping", color: "text-muted-foreground", dotColor: "bg-zinc-400" }
}

export function MoodStatus() {
  const [mood, setMood] = useState<Mood | null>(null)

  useEffect(() => {
    const update = () => {
      const ist = TZDate.tz("Asia/Kolkata")
      setMood(getMood(ist.getHours()))
    }
    update()
    const interval = setInterval(update, 60_000)
    return () => clearInterval(interval)
  }, [])

  if (!mood) return null

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background px-2 py-0.5 text-xs font-medium ${mood.color} select-none`}
      title="Current status (IST)"
    >
      <span className="relative flex size-2">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${mood.dotColor}`}
        />
        <span className={`relative inline-flex size-2 rounded-full ${mood.dotColor}`} />
      </span>
      {mood.label}
    </span>
  )
}
