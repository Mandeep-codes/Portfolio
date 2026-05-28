import { CollapsibleList } from "@/components/collapsible-list"

import { PROJECTS } from "../../data/projects"
import { Panel, PanelHeader, PanelTitleSup } from "../panel"
import { PanelTitleShimmer } from "../panel-title-shimmer"
import { ProjectItem } from "./project-item"

export function Projects() {
  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitleShimmer>
          Projects
          <PanelTitleSup>[{PROJECTS.length}]</PanelTitleSup>
        </PanelTitleShimmer>
      </PanelHeader>

      <CollapsibleList
        items={PROJECTS}
        max={4}
        renderItem={(item) => <ProjectItem project={item} />}
      />
    </Panel>
  )
}
