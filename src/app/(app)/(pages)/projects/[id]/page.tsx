import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeftIcon, ExternalLinkIcon, LinkIcon } from "lucide-react"

import { Tag } from "@/components/ui/tag"
import { Prose } from "@/components/ui/typography"
import { Markdown } from "@/components/markdown"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
  PageHeadingDescription,
} from "@/components/page-heading"

import { PROJECTS } from "@/features/portfolio/data/projects"
import { PROJECTS_DETAIL } from "@/features/portfolio/data/projects-detail"
import { ProjectScreenshot } from "./project-screenshot"

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const project = PROJECTS.find((p) => p.id === id)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description?.slice(0, 160),
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = PROJECTS.find((p) => p.id === id)
  const detail = PROJECTS_DETAIL[id]

  if (!project) notFound()

  const screenshot = detail?.screenshots?.[0] ?? project.previewImage

  return (
    <div className="min-h-svh">
      {/* Back link */}
      <div className="px-4 pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="size-3.5" />
          All projects
        </Link>
      </div>

      {/* Hero */}
      <PageHeading className="mt-2">
        <PageHeadingTagline>Project</PageHeadingTagline>
        <PageHeadingTitle>{project.title}</PageHeadingTitle>
        {project.description && (
          <PageHeadingDescription>
            {project.description.split("\n")[0]}
          </PageHeadingDescription>
        )}
      </PageHeading>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-4 border-b border-line">
        {detail?.demoUrl && (
          <a
            href={detail.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-foreground px-3 py-1.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
          >
            <ExternalLinkIcon className="size-3.5" />
            Live Demo
          </a>
        )}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent-muted transition-colors"
        >
          <LinkIcon className="size-3.5" />
          GitHub
        </a>
      </div>

      {/* Screenshot */}
      {screenshot && (
        <div className="border-b border-line">
          <ProjectScreenshot src={screenshot} alt={`${project.title} screenshot`} />
        </div>
      )}

      {/* Tech stack */}
      {project.skills.length > 0 && (
        <div className="border-b border-line px-4 py-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Tech Stack
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {project.skills.map((skill, i) => (
              <li key={i}>
                <Tag>{skill}</Tag>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* README content */}
      {detail?.readme && (
        <div className="border-b border-line px-4 py-6">
          <Prose>
            <Markdown>{detail.readme}</Markdown>
          </Prose>
        </div>
      )}

      {/* Video embed */}
      {detail?.videoUrl && (
        <div className="border-b border-line px-4 py-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Demo Video
          </p>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-line">
            <iframe
              src={detail.videoUrl}
              title={`${project.title} demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      )}

      {/* Bottom padding */}
      <div className="h-16" />
    </div>
  )
}
