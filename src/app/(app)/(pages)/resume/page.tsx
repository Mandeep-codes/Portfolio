import type { Metadata } from "next"
import { DownloadIcon, LinkIcon, MailIcon, MapPinIcon } from "lucide-react"
import Link from "next/link"

import { Tag } from "@/components/ui/tag"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"

export const metadata: Metadata = {
  title: "Resume",
  description: "Mandeep Singh — Full Stack Developer resume.",
}

const SKILLS = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Three.js"],
  Backend: ["Node.js", "Express.js", "Java", "Python", "FastAPI"],
  Database: ["MongoDB", "PostgreSQL", "H2", "Drizzle ORM"],
  Tools: ["Git", "Docker", "Maven", "Linux", "REST APIs", "OAuth 2.0"],
  "AI / ML": ["PyTorch", "scikit-learn", "librosa", "Ollama"],
}

const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "Freelance / Personal Projects",
    period: "2024 – Present",
    bullets: [
      "Built 6+ production-grade projects spanning web, desktop, and AI domains",
      "Deployed multi-service architectures on Render & Vercel with cross-origin session handling",
      "Developed ML-powered tools including a CNN-LSTM respiratory classifier with FastAPI backend",
    ],
  },
]

const EDUCATION = [
  {
    degree: "B.Tech – Computer Science & Engineering",
    school: "Lovely Professional University",
    period: "2023 – 2027",
    note: "Specialization in AI/ML",
  },
]

const PROJECTS = [
  { name: "Finvoke", desc: "Full-stack stock trading simulation platform", href: "/projects/finvoke" },
  { name: "MailX", desc: "Local Gmail analyzer & bulk cleaner desktop app", href: "/projects/mailx" },
  { name: "BreathAI", desc: "CNN-LSTM respiratory disease classifier + 3D frontend", href: "/projects/breathingai" },
  { name: "CircuitDebugger", desc: "ML-powered electronic circuit debugging GUI", href: "/projects/circuitdebugger" },
  { name: "DwellNest", desc: "Property listing platform with geolocation & cloud storage", href: "/projects/dwellnest" },
  { name: "Nivaro Dashboard", desc: "Modern admin dashboard UI (React + TypeScript)", href: "/projects/dashboard" },
]

export default function ResumePage() {
  return (
    <div className="min-h-svh">
      <PageHeading>
        <PageHeadingTagline>Resume</PageHeadingTagline>
        <PageHeadingTitle>Mandeep Singh</PageHeadingTitle>
      </PageHeading>

      {/* Header info + download */}
      <div className="flex flex-col gap-3 border-b border-line px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon className="size-3.5" />
            India
          </span>
          <a
            href="mailto:mandeepnehra.work@gmail.com"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <MailIcon className="size-3.5" />
            mandeepnehra.work@gmail.com
          </a>
          <a
            href="https://github.com/Mandeep-codes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <LinkIcon className="size-3.5" />
            Mandeep-codes
          </a>
        </div>

        <a
          href="/resume.pdf"
          download
          className="inline-flex w-fit items-center gap-1.5 rounded-md border border-line bg-foreground px-3 py-1.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
        >
          <DownloadIcon className="size-3.5" />
          Download PDF
        </a>
      </div>

      {/* Skills */}
      <section className="border-b border-line px-4 py-5">
        <SectionTitle>Skills</SectionTitle>
        <div className="space-y-3">
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span className="w-20 shrink-0 text-xs font-medium text-muted-foreground">{cat}</span>
              <ul className="flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <li key={s}><Tag>{s}</Tag></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="border-b border-line px-4 py-5">
        <SectionTitle>Experience</SectionTitle>
        <div className="space-y-5">
          {EXPERIENCE.map((exp) => (
            <div key={exp.role}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="font-medium">{exp.role}</p>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                </div>
                <span className="text-sm text-muted-foreground">{exp.period}</span>
              </div>
              <ul className="mt-2 space-y-1">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="border-b border-line px-4 py-5">
        <SectionTitle>Projects</SectionTitle>
        <ul className="space-y-2">
          {PROJECTS.map((p) => (
            <li key={p.name} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <Link
                href={p.href}
                className="font-medium hover:text-muted-foreground transition-colors"
              >
                {p.name}
              </Link>
              <span className="text-sm text-muted-foreground">— {p.desc}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Education */}
      <section className="border-b border-line px-4 py-5">
        <SectionTitle>Education</SectionTitle>
        <div className="space-y-3">
          {EDUCATION.map((edu) => (
            <div key={edu.degree} className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="font-medium">{edu.degree}</p>
                <p className="text-sm text-muted-foreground">{edu.school}</p>
                {edu.note && <p className="text-xs text-muted-foreground">{edu.note}</p>}
              </div>
              <span className="text-sm text-muted-foreground">{edu.period}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="h-16" />
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </h2>
  )
}
