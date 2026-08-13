import finvokeImage from "./images/finvoke.png"
import mailxImage from "./images/mailX.png"
import omnibriefImage from "./images/omnibrief.png"
import SketchifyImage from "./images/sketchify.png"

export type ProjectDetail = {
  id: string
  demoUrl?: string
  videoUrl?: string
  screenshots: string[]
  readme: string
}

export const PROJECTS_DETAIL: Record<string, ProjectDetail> = {
  finvoke: {
    id: "finvoke",
    demoUrl: "https://finvoke-1.onrender.com",
    screenshots: [finvokeImage.src],
    readme: `
Finvoke is a full-stack stock trading simulation platform where users can register, log in, manage virtual funds, buy/sell stocks, and track orders and positions through a React dashboard.

## What it does
- Virtual portfolio management with real-time order tracking
- Secure cookie-based JWT auth system with cross-origin session handling
- Full dashboard: buy stocks, track orders, manage funds, view P&L
- Three separate deployed apps (backend, auth UI, trading dashboard) working in sync

## Key Features
- **Secure Auth** — JWT with httpOnly cookies + SameSite=None for cross-origin support
- **Order Management** — Each order is user-specific, stored with user ID in MongoDB
- **Virtual Funds** — Buy action triggers both fund deduction and order placement
- **React Context** — Global user state and modal management
- **Multi-app Deployment** — Three separate Render deployments in sync

## Tech Stack
React · Vite · Tailwind CSS · Axios · React Router · Node.js · Express · MongoDB · Mongoose · JWT · Render

## Live Links
- Backend API: https://finvoke.onrender.com
- Auth Frontend: https://finvoke-1.onrender.com
- Trading Dashboard: https://finvoke-2.onrender.com
`,
  },
  omnibrief: {
    id: "omnibrief",
    demoUrl: "https://x.com/DeepStarts/status/2059241482356506669?s=20",
    screenshots: [omnibriefImage.src],
    readme: `
OmniBrief is a full-stack video intelligence engine that ingests YouTube videos and local files, generating transcripts, summaries, decisions, and action items through AI-powered analysis. Additionally, implemented a RAG-based conversational interface using ChromaDB and LangChain, enabling users to query video content with contextual accuracy.

## What it does
- Video ingestion and processing
- AI-powered transcript generation
- Summary and action item extraction
- RAG-based conversational interface

## Key Features
- **Multi-source Ingestion** — Supports both YouTube URLs and local video file uploads
- **AI Analysis** — Uses Mistral AI for generating transcripts, summaries, decisions, and action items
- **RAG Interface** — ChromaDB + LangChain for context-aware video content querying
- **Full-stack Implementation** — React frontend with Flask backend API

## Tech Stack
Python · Flask · Mistral AI · ChromaDB · LangChain · OpenAI Whisper · JavaScript · React
`,
  },
  mailx: {
    id: "mailx",
    demoUrl:
      "https://www.linkedin.com/posts/mandeep-nehra-289224371_java-javafx-gmailapi-activity-7395050244541145089-90ZV?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFwMJokBG3jKaxWbShJQD7ylive9oiRPfeE",
    screenshots: [mailxImage.src],
    readme: `
MailX is a powerful desktop application for analyzing, organizing, and cleaning your Gmail inbox — running fully locally while securely connecting to Gmail via OAuth 2.0.

## What it does
- Scan your Gmail inbox and analyze emails by sender
- Bulk delete emails from specific senders with one click
- Categorize emails automatically (Promotional, Newsletter, Social, Important)
- Unsubscribe helper — one-click access to unsubscribe links

## Key Features
- **Local-First** — All email metadata stored on your machine. No data leaves your computer
- **OAuth 2.0** — Secure authentication, no password storage
- **Smart Scanning** — Sender grouping with storage analytics
- **Bulk Operations** — Delete all from a sender or select individually
- **Category Detection** — Auto-classifies emails using pattern matching

## Tech Stack
Java 17 · JavaFX · OAuth 2.0 · Gmail API · JSoup · Maven · H2 Database
`,
  },
  sketchify: {
    id: "sketchify",
    demoUrl: "https://x.com/DeepStarts/status/2056965653022830739?s=20",
    screenshots: [SketchifyImage.src],
    readme: `
Sketchify is an AI-powered sketch-to-art platform where anyone can draw, choose a style, and instantly transform simple doodles into beautiful artwork. With AR visualization, reel generation, creative challenges, and a social community, Sketchify makes creating and sharing art accessible to everyone—regardless of artistic skill.

## What it does
- Sketch-to-art transformation with AI
- AR visualization for immersive experience
- Reel generation for social sharing
- Creative challenges for user engagement
- Social community for feedback and collaboration

## Key Features
- **AI Art Generation** — Transforms simple sketches into detailed artwork using advanced AI models
- **AR Visualization** — View your creations in augmented reality for a unique experience
- **Reel Generation** — Automatically create shareable reels of your art process and final pieces
- **Creative Challenges** — Participate in themed challenges to inspire creativity and community interaction
- **Social Community** — Connect with other artists, share feedback, and collaborate on projects

## Tech Stack
React · TypeScript · Node.js · Tailwind CSS · Vite · Drizzle ORM · Expo · Electron
`,
  },
}
