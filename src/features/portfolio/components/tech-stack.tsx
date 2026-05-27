import Image from "next/image"

import { TECH_STACK } from "../data/tech-stack"
import { Panel, PanelContent } from "./panel"

export function TechStack() {
  return (
    <Panel id="stack" className="before:content-none">
      <h2 className="sr-only">Stack</h2>

      <PanelContent>
        <ul className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => {
            if (!tech.icon) return null
            return (
              <li key={tech.key} className="flex">
                <a
                  href={tech.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={tech.title}
                  className="flex items-center gap-1.5 rounded-full bg-zinc-50 px-1.5 py-0.5 text-xs tracking-wide text-foreground ring-1 ring-border/80 select-none dark:bg-zinc-900 [&_img]:size-3.5"
                >
                  {tech.theme && tech.iconDark ? (
                    <>
                      <Image
                        className="hidden [html.light_&]:block"
                        src={tech.icon}
                        alt={`${tech.title} icon`}
                        width={14}
                        height={14}
                        unoptimized
                      />
                      <Image
                        className="hidden [html.dark_&]:block"
                        src={tech.iconDark}
                        alt={`${tech.title} icon`}
                        width={14}
                        height={14}
                        unoptimized
                      />
                    </>
                  ) : (
                    <Image
                      src={tech.icon}
                      alt={`${tech.title} icon`}
                      width={14}
                      height={14}
                      unoptimized
                    />
                  )}
                  {tech.title}
                </a>
              </li>
            )
          })}
        </ul>
      </PanelContent>

      <div className="flex h-px" />
    </Panel>
  )
}
