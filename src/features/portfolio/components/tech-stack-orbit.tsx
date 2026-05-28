"use client"

import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import Image from "next/image"
import { motion, useAnimationFrame } from "motion/react"
import type { TechStack } from "../types/tech-stack"

interface OrbitingIconProps {
  tech: TechStack
  angle: number
  radius: number
  magnetX: number
  magnetY: number
  size: number
}

function OrbitingIcon({ tech, angle, radius, magnetX, magnetY, size }: OrbitingIconProps) {
  const magnetStrength = 28
  const x = Math.cos(angle) * radius + magnetX * magnetStrength
  const y = Math.sin(angle) * radius + magnetY * magnetStrength

  return (
    <motion.a
      href={tech.href}
      target="_blank"
      rel="noopener"
      aria-label={tech.title}
      title={tech.title}
      style={{ x, y, translateX: "-50%", translateY: "-50%", width: size, height: size }}
      className="absolute top-1/2 left-1/2 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm ring-1 ring-blue-200/70 dark:ring-blue-800/50 shadow-sm hover:ring-info/70 hover:shadow-info/20 hover:shadow-md transition-[box-shadow,ring-color] cursor-pointer select-none"
      whileHover={{ scale: 1.25 }}
    >
      {tech.theme && tech.iconDark ? (
        <>
          <Image
            className="hidden [html.light_&]:block"
            src={tech.icon!}
            alt={tech.title}
            width={size * 0.5}
            height={size * 0.5}
            unoptimized
          />
          <Image
            className="hidden [html.dark_&]:block"
            src={tech.iconDark}
            alt={tech.title}
            width={size * 0.5}
            height={size * 0.5}
            unoptimized
          />
        </>
      ) : (
        <Image
          src={tech.icon!}
          alt={tech.title}
          width={size * 0.5}
          height={size * 0.5}
          unoptimized
        />
      )}
    </motion.a>
  )
}

interface RingConfig {
  techs: TechStack[]
  radius: number
  speed: number
  size: number
  initialOffset: number
}

export function TechStackOrbit({ items }: { items: TechStack[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const magnetRef = useRef({ x: 0, y: 0 })
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 })
  const anglesRef = useRef<number[][]>([])
  const [angles, setAngles] = useState<number[][]>([])
  const lastTimeRef = useRef<number | null>(null)

  const rings: RingConfig[] = useMemo(() => [
    { techs: items.slice(0, 5),  radius: 68,  speed:  0.38, size: 32, initialOffset: 0 },
    { techs: items.slice(5, 10), radius: 110, speed: -0.28, size: 36, initialOffset: Math.PI / 4 },
    { techs: items.slice(10),    radius: 152, speed:  0.20, size: 40, initialOffset: Math.PI / 6 },
  ], [items])

  // Init angles once
  useEffect(() => {
    const init = rings.map((ring) =>
      ring.techs.map((_, i) => ring.initialOffset + (i / ring.techs.length) * Math.PI * 2)
    )
    anglesRef.current = init
    setAngles(init)
    lastTimeRef.current = null
  }, [rings])

  // Store rings in ref so animation frame can read latest without re-subscription
  const ringsRef = useRef(rings)
  ringsRef.current = rings

  useAnimationFrame((t) => {
    if (lastTimeRef.current === null) { lastTimeRef.current = t; return }
    const dt = Math.min((t - lastTimeRef.current) / 1000, 0.05) // cap at 50ms
    lastTimeRef.current = t

    if (anglesRef.current.length === 0) return

    anglesRef.current = anglesRef.current.map((ringAngles, ri) =>
      ringAngles.map((a) => a + (ringsRef.current[ri]?.speed ?? 0) * dt)
    )
    setAngles([...anglesRef.current])

    const target = magnetRef.current
    setMagnetPos((prev) => ({
      x: prev.x + (target.x - prev.x) * 0.08,
      y: prev.y + (target.y - prev.y) * 0.08,
    }))
  })

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    magnetRef.current = {
      x: (e.clientX - cx) / (rect.width / 2),
      y: (e.clientY - cy) / (rect.height / 2),
    }
  }, [])

  const handlePointerLeave = useCallback(() => {
    magnetRef.current = { x: 0, y: 0 }
  }, [])

  const canvasSize = (152 + 26) * 2 + 8

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex items-center justify-center"
      style={{ width: canvasSize, height: canvasSize }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Orbit ring guides */}
      {rings.map((ring, ri) => (
        <div
          key={ri}
          className="absolute rounded-full border border-blue-200/30 dark:border-blue-800/20 pointer-events-none"
          style={{
            width: ring.radius * 2,
            height: ring.radius * 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-info/70 shadow-[0_0_16px_6px] shadow-info/40 pointer-events-none" />

      {/* Orbiting icons */}
      {angles.length > 0 &&
        rings.map((ring, ri) =>
          ring.techs.map((tech, ti) => (
            <OrbitingIcon
              key={tech.key}
              tech={tech}
              angle={angles[ri]?.[ti] ?? 0}
              radius={ring.radius}
              magnetX={magnetPos.x}
              magnetY={magnetPos.y}
              size={ring.size}
            />
          ))
        )}
    </div>
  )
}
