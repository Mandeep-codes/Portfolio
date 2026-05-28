import type { Metadata } from "next"
import type { ProfilePage as PageSchema, WithContext } from "schema-dts"

import { cn } from "@/lib/utils"
import { About } from "@/features/portfolio/components/about"
import { Experiences } from "@/features/portfolio/components/experiences"
import { GitHubContributions } from "@/features/portfolio/components/github-contributions"
import { Overview } from "@/features/portfolio/components/overview"
import { ProfileActivityMosaicCover } from "@/features/portfolio/components/profile-activity-mosaic-cover"
import { ProfileHeader } from "@/features/portfolio/components/profile-header"
import { Projects } from "@/features/portfolio/components/projects"
import { SocialLinks } from "@/features/portfolio/components/social-links"
import { TechStack } from "@/features/portfolio/components/tech-stack"
import { USER } from "@/features/portfolio/data/user"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
        <ProfileActivityMosaicCover />
        <ProfileHeader />
        <Separator />

        <Overview />
        <SocialLinks />
        <Separator />

        <Experiences />
        <Separator />

        <Projects />
        <Separator />

        <About />
        <Separator />

        <TechStack />
        <Separator />

        <GitHubContributions />
        <Separator />
      </div>
    </>
  )
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  }
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-5 w-full border-x border-line",
        "before:absolute before:left-[-100vw] before:-z-1 before:h-5 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(45deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[6px_6px] before:[--pattern-foreground:var(--color-info)]/15",
        className
      )}
    />
  )
}
