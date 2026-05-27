"use client"

import { motion, useMotionValue, useSpring } from "motion/react"

/**
 * Same letter geometry as chanhdai-mark.tsx (confirmed correct D-E-E-P),
 * adapted to a wider viewBox with inter-letter spacing for the big footer logotype.
 *
 * Original viewBox: 0 0 880 256 (letters at x: D=0, E=240, E=440, P=640)
 * We keep the same offsets — just use the exact same paths.
 */

const VIEWBOX_WIDTH = 880
const DEFAULT_GRADIENT_X = 440

export function SiteFooterInteractiveLogotype() {
  const gradientXRaw = useMotionValue(DEFAULT_GRADIENT_X)
  const gradientX = useSpring(gradientXRaw, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
  })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const normalizedX = (mouseX / rect.width) * VIEWBOX_WIDTH
    gradientXRaw.set(Math.max(0, Math.min(VIEWBOX_WIDTH, normalizedX)))
  }

  const handleMouseLeave = () => {
    gradientXRaw.set(DEFAULT_GRADIENT_X)
  }

  // Exact paths from chanhdai-mark.tsx — confirmed to render D E E P correctly
  const letterPaths = [
    // D
    "M0 0h80c70 0 112 45 112 128s-42 128-112 128H0V0Zm64 48v160h16c34 0 48-28 48-80s-14-80-48-80H64Z",
    // E (first)
    "M240 0h160v48H304v64h96v48H304v48h96v48H240V0Z",
    // E (second)
    "M440 0h160v48H504v64h96v48H504v48h96v48H440V0Z",
    // P
    "M640 0h128c53 0 96 35 96 96s-43 96-96 96H704v64h-64V0Zm64 48v96h64c20 0 32-18 32-48s-12-48-32-48H704Z",
  ]

  return (
    <div className="screen-line-bottom after:z-1 after:bg-foreground/15">
      <div
        className="overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex w-full translate-y-[37.5%] items-center justify-center">
          <svg
            className="container size-full"
            viewBox={`0 0 ${VIEWBOX_WIDTH} 256`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Gradient-filled letters */}
            {letterPaths.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="url(#deep_grad)"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            ))}

            {/* Outline layer */}
            {letterPaths.map((d, i) => (
              <path
                key={`o-${i}`}
                d={d}
                className="stroke-foreground/10"
                strokeWidth="1.5"
                fill="none"
                fillRule="evenodd"
              />
            ))}

            <defs>
              <motion.linearGradient
                id="deep_grad"
                x1={gradientX}
                y1="0"
                x2={gradientX}
                y2="256"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="var(--foreground)" stopOpacity="0" />
                <stop offset="1" stopColor="var(--foreground)" />
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
