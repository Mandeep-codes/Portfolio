"use client"

import { useEffect, useState } from "react"
import { EyeIcon } from "lucide-react"

const SESSION_KEY = "pf_counted"

export function VisitorCounter() {
  const [count, setCount] = useState<number | null | "...">("...")

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem(SESSION_KEY)
    const url = alreadyCounted ? "/api/views" : "/api/views?increment=1"

    fetch(url)
      .then((r) => r.json())
      .then((data: unknown) => {
        const d = data as { count?: number }
        if (typeof d.count === "number") {
          setCount(d.count)
          if (!alreadyCounted) sessionStorage.setItem(SESSION_KEY, "1")
        } else {
          setCount(null)
        }
      })
      .catch(() => setCount(null))
  }, [])

  if (count === null) return null

  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground font-mono">
      <EyeIcon className="size-4" aria-hidden />
      {typeof count === "number" ? count.toLocaleString() : count}
    </span>
  )
}
