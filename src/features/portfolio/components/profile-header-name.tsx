"use client"

import { useRef, useCallback } from "react"
import { USER } from "@/features/portfolio/data/user"

export function ProfileHeaderName() {
  const ref = useRef<HTMLHeadingElement>(null)

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLHeadingElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width  // 0..1
    // shift hue from cold blue (244) toward violet (280) based on cursor X
    const hue = 244 + px * 36
    el.style.setProperty("--name-hue", `${hue}`)
  }, [])

  const handlePointerLeave = useCallback(() => {
    ref.current?.style.removeProperty("--name-hue")
  }, [])

  return (
    <h1
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="text-3xl font-extrabold tracking-[-0.03em] select-none cursor-default"
      style={{
        backgroundImage:
          "linear-gradient(to right, oklch(0.9 0.08 var(--name-hue, 244)) 0%, oklch(0.72 0.18 var(--name-hue, 244)) 50%, oklch(0.67 0.17 calc(var(--name-hue, 244) + 20)) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        transition: "background-image 0.1s ease",
      }}
    >
      {USER.displayName}
    </h1>
  )
}
