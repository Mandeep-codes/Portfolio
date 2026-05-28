"use client"

import { useRef } from "react"
import { useInView } from "motion/react"

import { PanelTitle } from "./panel"

export function PanelTitleShimmer({
  children,
  ...props
}: React.ComponentProps<typeof PanelTitle>) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" })

  return (
    <PanelTitle
      ref={ref}
      data-in-view={isInView ? "true" : undefined}
      {...props}
    >
      {children}
    </PanelTitle>
  )
}
