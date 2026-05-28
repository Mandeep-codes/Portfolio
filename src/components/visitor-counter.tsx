"use client"

import { useEffect, useState } from "react"
import { EyeIcon } from "lucide-react"

const COUNTER_UP = "https://api.counterapi.dev/v1/mandeep-portfolio/views/up/"
const COUNTER_GET = "https://api.counterapi.dev/v1/mandeep-portfolio/views/"
const SESSION_KEY = "pf_counted"

export function VisitorCounter() {
  const [count, setCount] = useState<number | null | "...">("...")

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem(SESSION_KEY)
    const url = alreadyCounted ? COUNTER_GET : COUNTER_UP

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const value = data?.count ?? data?.value ?? null
        if (typeof value === "number") {
          setCount(value)
          if (!alreadyCounted) sessionStorage.setItem(SESSION_KEY, "1")
        }
      })
      .catch(() => { setCount(null) })
  }, [])

  if (count === null) return null

  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground font-mono">
      <EyeIcon className="size-4" aria-hidden />
      {typeof count === "number" ? count.toLocaleString() : count}
    </span>
  )
}
