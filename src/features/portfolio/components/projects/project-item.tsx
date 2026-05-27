"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { addQueryParams } from "@/utils/url"
import { BoxIcon, InfinityIcon, LinkIcon } from "lucide-react"

import { UTM_PARAMS } from "@/config/site"
import { Tag } from "@/components/ui/tag"
import { Prose } from "@/components/ui/typography"
import {
  Collapsible,
  CollapsibleChevronsIcon,
} from "@/components/base/collapsible-animated"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"


import type { Project } from "../../types/projects"

export function ProjectItem({
  className,
  project,
}: {
  className?: string
  project: Project
}) {
  const { start, end } = project.period
  const isOngoing = !end
  const isSinglePeriod = end === start

  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [shine, setShine] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })

    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2
    const rotateY = (offsetX / rect.width) * 20
    const rotateX = -(offsetY / rect.height) * 20
    const shineX = ((e.clientX - rect.left) / rect.width) * 100
    const shineY = ((e.clientY - rect.top) / rect.height) * 100

    setTilt({ rotateX, rotateY })
    setShine({ x: shineX, y: shineY })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setTilt({ rotateX: 0, rotateY: 0 })
    setShine({ x: 50, y: 50 })
  }

  return (
    <Collapsible
      className={className}
      defaultOpen={project.isExpanded}
      style={{
        transform: hovered
          ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.01)`
          : "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: "transform 0.15s ease-out",
        willChange: "transform",
        position: "relative",
        zIndex: hovered ? 10 : "auto",
      }}
    >
      {/* White shine overlay */}
      {hovered && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.10), transparent 65%)`,
          }}
        />
      )}

      <div
        ref={cardRef}
        className="flex items-center hover:bg-accent-muted relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {project.logo ? (
          <Image
            src={project.logo}
            alt={project.title}
            width={32}
            height={32}
            quality={100}
            className="mx-4 flex size-6 shrink-0 select-none"
            unoptimized
            aria-hidden
          />
        ) : (
          <div className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-line ring-offset-1 ring-offset-background select-none">
            <BoxIcon className="size-4" />
          </div>
        )}

        <div className="flex-1 border-l border-dashed border-line">
          <CollapsibleTrigger className="flex w-full items-center gap-2 p-4 pr-2 text-left">
            <div className="flex-1">
              <Link
                href={`/projects/${project.id}`}
                className="group/title"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="mb-1 leading-snug font-medium text-balance group-hover/title:underline underline-offset-2">
                  {project.title}
                </h3>
              </Link>

              <dl className="text-sm text-muted-foreground">
                <dt className="sr-only">Period</dt>
                <dd className="flex items-center gap-0.5">
                  <span>{start}</span>
                  {!isSinglePeriod && (
                    <>
                      <span className="font-mono">—</span>
                      {isOngoing ? (
                        <InfinityIcon
                          className="size-4.5 translate-y-[0.5px]"
                          aria-label="Present"
                        />
                      ) : (
                        <span>{end}</span>
                      )}
                    </>
                  )}
                </dd>
              </dl>
            </div>

            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                    href={addQueryParams(project.link, UTM_PARAMS)}
                    target="_blank"
                    rel="noopener"
                    aria-label="Open Project Link"
                  >
                    <LinkIcon className="pointer-events-none size-4" />
                  </a>
                }
              />
              <TooltipContent>
                <p>Open Project Link</p>
              </TooltipContent>
            </Tooltip>

            <div className="shrink-0 text-muted-foreground [&_svg]:size-4">
              <CollapsibleChevronsIcon duration={0.15} />
            </div>
          </CollapsibleTrigger>
        </div>
      </div>

      {/* Hover preview image */}
      {project.previewImage && hovered && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: mousePos.x + 20,
            top: mousePos.y - 80,
          }}
        >
          <div className="rounded-lg overflow-hidden border border-line shadow-2xl bg-background">
            <Image
              src={project.previewImage}
              alt={`${project.title} preview`}
              width={280}
              height={160}
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      )}

      <CollapsibleContent className="overflow-hidden">
        <div className="space-y-4 border-t border-line p-4">
          {project.description && (
            <Prose>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{project.description.split("\n")[0]}</p>
            </Prose>
          )}

          {project.skills.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {project.skills.map((skill, index) => (
                <li key={index} className="flex">
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
