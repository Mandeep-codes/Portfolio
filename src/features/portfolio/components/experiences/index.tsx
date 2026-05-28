import React from "react"

import { EXPERIENCES } from "../../data/experiences"
import { Panel, PanelHeader } from "../panel"
import { PanelTitleShimmer } from "../panel-title-shimmer"
import { ExperienceItem } from "./experience-item"

export function Experiences() {
  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitleShimmer>Experience</PanelTitleShimmer>
      </PanelHeader>

      <div className="pr-2 pl-4">
        {EXPERIENCES.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
    </Panel>
  )
}
