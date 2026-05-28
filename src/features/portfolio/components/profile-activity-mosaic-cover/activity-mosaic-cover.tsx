"use client"

import type { Activity } from "./activity-mosaic"
import {
  ActivityMosaic,
  ActivityMosaicCell,
  ActivityMosaicGrid,
} from "./activity-mosaic"

export function ActivityMosaicCover({
  activities,
  rowCount,
  columnCount,
}: {
  activities: Activity[]
  rowCount: number
  columnCount: number
}) {
  return (
    <div
      className="screen-line-top screen-line-bottom w-full border-x border-line p-0.5 before:-top-px after:-bottom-px bg-gradient-to-r from-violet-50/30 via-transparent to-violet-50/10 dark:from-violet-950/20 dark:to-transparent"
      aria-hidden
    >
      <ActivityMosaic
        className="opacity-60 mix-blend-multiply dark:mix-blend-screen"
        activities={activities}
        rowCount={rowCount}
        columnCount={columnCount}
      >
        <ActivityMosaicGrid>
          {({ activity, rowIndex, columnIndex }) => (
            <ActivityMosaicCell
              activity={activity}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
            />
          )}
        </ActivityMosaicGrid>
      </ActivityMosaic>
    </div>
  )
}
