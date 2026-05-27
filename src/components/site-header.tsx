import dynamic from "next/dynamic"
import Link from "next/link"
import { FileTextIcon } from "lucide-react"

import { MAIN_NAV } from "@/config/site"
import { Separator } from "@/components/ui/separator"
import { ChanhDaiMark } from "@/components/chanhdai-mark"
import { NavDesktop } from "@/components/nav-desktop"
import { ThemeToggle } from "@/components/theme-toggle"
import { VisitorCounter } from "@/components/visitor-counter"
const BrandContextMenu = dynamic(
  () => import("@/components/brand-context-menu")
)

export function SiteHeader() {

  return (
    <header className="sticky top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pt-2">
      <div className="screen-line-top screen-line-bottom mx-auto flex h-12 items-center justify-between gap-2 border-x border-line px-2 group-has-data-[slot=layout-wide]/layout:container after:z-1 after:transition-[background-color] sm:gap-4 md:max-w-3xl">
        <BrandContextMenu>
          <Link href="/" aria-label="Home">
            <ChanhDaiMark className="h-8 shrink-0" />
          </Link>
        </BrandContextMenu>

        <div className="flex-1" />

        <NavDesktop items={MAIN_NAV} />

        <div className="flex items-center gap-2">
          <Link
            href="/resume"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Resume"
          >
            <FileTextIcon className="size-4" />
            <span className="hidden sm:inline">Resume</span>
          </Link>
          <VisitorCounter />
          <ThemeToggle />
        </div>

        {/* <div className="absolute top-[-3.5px] left-[-4.5px] z-2 flex size-2 border border-line bg-background" /> */}
        {/* <div className="absolute top-[-3.5px] right-[-4.5px] z-2 flex size-2 border border-line bg-background" /> */}
      </div>
    </header>
  )
}
