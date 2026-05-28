import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { CollapsibleList } from "@/components/collapsible-list"

import { PROJECTS } from "../../data/projects"
import { Panel, PanelHeader, PanelTitleSup } from "../panel"
import { PanelTitleShimmer } from "../panel-title-shimmer"
import { ProjectItem } from "./project-item"

export function Projects() {
  return (
    <Panel id="projects">
      <PanelHeader className="flex items-center justify-between">
        <PanelTitleShimmer>
          Projects
          <PanelTitleSup>[{PROJECTS.length}]</PanelTitleSup>
        </PanelTitleShimmer>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors pr-1"
        >
          View all
          <ArrowRightIcon className="size-3" />
        </Link>
      </PanelHeader>

      <CollapsibleList
        items={PROJECTS}
        max={4}
        renderItem={(item) => <ProjectItem project={item} />}
      />
    </Panel>
  )
}
