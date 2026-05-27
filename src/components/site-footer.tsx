import { RssIcon } from "lucide-react"

import { SITE_INFO } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"


export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-top mx-auto border-x border-line pt-4 group-has-data-[slot=layout-wide]/layout:container md:max-w-3xl">
        <p className="mb-4 px-4 text-center font-mono text-sm text-balance text-muted-foreground">
          Made with code and Anime
        </p>

        <div className="screen-line-top screen-line-bottom flex w-full before:z-1 after:z-1">
          <div className="mx-auto flex items-center justify-center gap-3 border-x border-line bg-background px-4">
            <a
              className="flex font-mono text-xs font-medium text-muted-foreground transition-[color] hover:text-foreground max-sm:hidden"
              href={`${SITE_INFO.url}/llms.txt`}
              target="_blank"
              rel="noopener"
            >
              llms.txt
            </a>

            <Separator className="max-sm:hidden" />

            <a
              className="flex items-center text-muted-foreground transition-[color] hover:text-foreground"
              href="https://github.com/Mandeep-codes"
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
            >
              <Icons.github className="size-4" />
            </a>

            <Separator />

            <a
              className="flex items-center text-muted-foreground transition-[color] hover:text-foreground"
              href="https://www.linkedin.com/in/mandeep-nehra-6b3b57298"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
            >
              <Icons.linkedin className="size-4" />
            </a>

            <Separator />

            <a
              className="flex items-center text-muted-foreground transition-[color] hover:text-foreground"
              href={`${SITE_INFO.url}/rss`}
              target="_blank"
              rel="noopener"
              aria-label="RSS"
            >
              <RssIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="pb-[env(safe-area-inset-bottom,0px)]" />
    </footer>
  )
}

function Separator({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex h-11 w-px bg-line", className)} {...props} />
}
