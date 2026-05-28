import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { Tag } from "@/components/ui/tag"
import { PageHeading, PageHeadingTagline, PageHeadingTitle } from "@/components/page-heading"
import { PROJECTS } from "@/features/portfolio/data/projects"

export const metadata: Metadata = {
  title: "Projects",
  description: "All projects by Mandeep Nehra",
}

export default function ProjectsPage() {
  return (
    <div className="min-h-svh">
      {/* Back */}
      <div className="px-4 pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="size-3.5" />
          Home
        </Link>
      </div>

      <PageHeading className="mt-2">
        <PageHeadingTagline>Work</PageHeadingTagline>
        <PageHeadingTitle>
          Projects
          <sup className="ml-1 text-sm font-medium tracking-normal text-muted-foreground">
            [{PROJECTS.length}]
          </sup>
        </PageHeadingTitle>
      </PageHeading>

      <div className="divide-y divide-line border-t border-line">
        {PROJECTS.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group flex items-start gap-4 px-4 py-5 transition-colors hover:bg-accent-muted"
          >
            {/* Logo */}
            <div className="mt-0.5 shrink-0 overflow-hidden rounded-lg border border-line size-10 bg-muted">
              {project.logo && (
                <Image
                  src={project.logo}
                  alt={project.title}
                  width={40}
                  height={40}
                  unoptimized
                  className="size-full object-cover"
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-semibold text-sm leading-snug group-hover:text-foreground text-foreground/90 truncate">
                  {project.title}
                </h2>
                <div className="flex items-center gap-1 shrink-0 text-muted-foreground">
                  <span className="text-xs">{project.period.start}</span>
                  <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>

              {project.description && (
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {project.description.split("\n")[0]}
                </p>
              )}

              {project.skills.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-1">
                  {project.skills.slice(0, 5).map((skill) => (
                    <li key={skill}>
                      <Tag className="text-[10px] px-1.5 py-0">{skill}</Tag>
                    </li>
                  ))}
                  {project.skills.length > 5 && (
                    <li>
                      <Tag className="text-[10px] px-1.5 py-0">
                        +{project.skills.length - 5}
                      </Tag>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="h-16" />
    </div>
  )
}
