import type { Project } from "../types/projects"
import finvokeImage from "./images/finvoke.png"
import mailxImage from "./images/mailX.png"
import omnibriefImage from "./images/omnibrief.png"
import SketchifyImage from "./images/sketchify.png"

export const PROJECTS: Project[] = [
  {
    id: "omnibrief",
    title: "OmniBrief",
    period: {
      start: "2026",
      end: "2026",
    },
    link: "https://github.com/Mandeep-codes/RAG---Ai-video-",
    skills: [
      "Python",
      "ChromaDB",
      "Flask",
      "Mistral AI",
      "LangChain",
      "OpenAI Whisper",
      "JavaScript",
      "React",
    ],
    description: `Built a full-stack video intelligence engine that ingests YouTube videos and local files, generating transcripts, summaries, decisions, and action items through AI-powered analysis. Additionally, implemented a RAG-based conversational interface using ChromaDB and LangChain, enabling users to query video content with contextual accuracy.`,
    logo: omnibriefImage.src,
    previewImage: omnibriefImage.src,
    isExpanded: true,
  },
  {
    id: "finvoke",
    title: "Finvoke – Trade Simulator",
    period: {
      start: "2024",
      end: "2024",
    },
    link: "https://github.com/Mandeep-codes/FInvoke",
    skills: ["React", "Express.js", "Node.js", "MongoDB", "Tailwind CSS"],
    description: `Full-stack stock trading simulation platform where users can register, log in, manage virtual funds, buy/sell stocks, and track orders and positions through a React dashboard.
- Virtual portfolio management with real-time order tracking
- Secure auth system with session management
- Clean dashboard UI with position & P&L tracking
`,
    logo: finvokeImage.src,
    previewImage: finvokeImage.src,
    isExpanded: true,
  },
  {
    id: "mailx",
    title: "MailX – Email Cleaner Desktop App",
    period: {
      start: "2024",
      end: "2024",
    },
    link: "https://github.com/Mandeep-codes/EmailCleaner",
    skills: [
      "Java",
      "JavaFX",
      "OAuth 2.0",
      "Gmail API",
      "JSoup",
      "Maven",
      "H2",
    ],
    description: `Powerful desktop app for analyzing, organizing, and cleaning your Gmail inbox. Runs fully locally while securely connecting to Gmail via OAuth 2.0.
- Local-first — no data leaves your machine
- Smart inbox analysis and bulk cleanup
- Built with Java & JavaFX for native performance
`,
    logo: mailxImage.src,
    previewImage: mailxImage.src,
    isExpanded: true,
  },
  {
    id: "Sketchify",
    title: "Sketchify – AI Image Generation App",
    period: {
      start: "2024",
    },
    link: "https://github.com/Mandeep-codes/Sketchify",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "Vite",
      "Drizzle ORM",
      "Expo",
      "Electron",
    ],
    description: `Sketchify is an AI-powered sketch-to-art platform where anyone can draw, choose a style, and instantly transform simple doodles into beautiful artwork. With AR visualization, reel generation, creative challenges, and a social community, Sketchify makes creating and sharing art accessible to everyone—regardless of artistic skill.
`,
    logo: SketchifyImage.src,
    previewImage: SketchifyImage.src,
  },
]
