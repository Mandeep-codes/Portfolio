import Image from "next/image"

import { TECH_STACK } from "../data/tech-stack"
import { Panel, PanelContent } from "./panel"
import { TechStackOrbit } from "./tech-stack-orbit"

export function TechStack() {
  const items = TECH_STACK.filter((t) => !!t.icon)

  return (
    <Panel id="stack" className="before:content-none">
      <h2 className="sr-only">Stack</h2>

      <PanelContent className="flex flex-col items-center gap-4">
        {/* Orbital visualization — client-only interactive */}
        <TechStackOrbit items={items} />

        {/* Accessible flat list (always rendered, screen-reader visible, hidden visually on JS) */}
        <ul className="flex flex-wrap justify-center gap-2 [.js-loaded_&]:sr-only">
          {items.map((tech) => (
            <li key={tech.key} className="flex">
              <a
                href={tech.href}
                target="_blank"
                rel="noopener"
                aria-label={tech.title}
                className="flex items-center gap-1.5 rounded-md bg-blue-50/60 px-2 py-0.5 text-xs font-medium tracking-wide text-foreground ring-1 ring-blue-200/80 select-none dark:bg-blue-950/30 dark:ring-blue-800/50 hover:ring-info/50 transition-all [&_img]:size-3.5"
              >
                {tech.theme && tech.iconDark ? (
                  <>
                    <Image
                      className="hidden [html.light_&]:block"
                      src={tech.icon!}
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
                    src={tech.icon!}
                    alt={`${tech.title} icon`}
                    width={14}
                    height={14}
                    unoptimized
                  />
                )}
                {tech.title}
              </a>
            </li>
          ))}
        </ul>
      </PanelContent>

      <div className="flex h-px" />
    </Panel>
  )
}
