import { AvatarLights } from "@/registry/components/avatar-lights"
import { USER } from "@/features/portfolio/data/user"
import { PokemonFollower } from "@/components/pokemon-follower"

import { AvatarLightsToggle } from "./avatar-lights-toggle"
import { FlipSentences } from "./flip-sentences"
import { PronounceMyName } from "./pronounce-my-name"
import { VerifiedIcon } from "./verified-icon"

export function ProfileHeader() {
  return (
    <div className="screen-line-bottom flex border-x border-line relative bg-gradient-to-br from-violet-50/40 to-transparent dark:from-violet-950/20 dark:to-transparent">
      <div className="shrink-0 border-r border-line">
        <AvatarLightsToggle className="group/avatar-lights-toggle mx-0.5 my-0.75 flex outline-none">
          <AvatarLights
            className="ring-border ring-offset-2 ring-offset-background group-focus-visible/avatar-lights-toggle:ring-1"
            variants={USER.avatarVariants}
          />
        </AvatarLightsToggle>
      </div>

      <div className="flex flex-1 flex-col relative">
        <div className="border-t border-line">
          <div className="flex items-center gap-2 pl-4 pt-3 pb-1 flex-wrap">
            <h1 className="text-3xl font-extrabold tracking-[-0.03em] bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              {USER.displayName}
            </h1>

            <VerifiedIcon
              className="size-4.5 text-info select-none"
              aria-hidden
            />

            {USER.namePronunciationUrl && (
              <PronounceMyName
                namePronunciationUrl={USER.namePronunciationUrl}
              />
            )}
          </div>

          <FlipSentences className="h-12.5 border-t border-line py-1 pl-4 sm:h-9">
            {USER.flipSentences}
          </FlipSentences>
        </div>

        {/* Pokemon in bottom-right corner of the header box */}
        <div className="absolute bottom-2 right-3 pointer-events-none select-none">
          <PokemonFollower />
        </div>
      </div>
    </div>
  )
}
