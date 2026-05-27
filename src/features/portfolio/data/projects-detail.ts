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
    screenshots: [
      "https://opengraph.githubassets.com/1/Mandeep-codes/FInvoke",
    ],
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
  mailx: {
    id: "mailx",
    screenshots: [
      "https://opengraph.githubassets.com/1/Mandeep-codes/EmailCleaner",
    ],
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
  dwellnest: {
    id: "dwellnest",
    screenshots: [
      "https://opengraph.githubassets.com/1/Mandeep-codes/civic-app",
    ],
    readme: `
DwellNest is a full-stack backend platform for listing and renting properties. Users upload property details with images, and the app auto-handles location mapping via third-party APIs.

## What it does
- Property listing with image uploads and cloud storage
- Automatic geolocation and map integration
- RESTful API for property CRUD operations

## Key Features
- **Cloud Storage** — Image upload via Cloudinary + Multer
- **Geolocation** — Automatic location mapping with OpenCage + Thunderforest APIs
- **Clean REST API** — Structured routes for all property operations
- **MongoDB** — Flexible document storage for property listings

## Tech Stack
Node.js · Express.js · MongoDB · Cloudinary · Multer · OpenCage API · Thunderforest API
`,
  },
  circuitdebugger: {
    id: "circuitdebugger",
    screenshots: [
      "https://opengraph.githubassets.com/1/Mandeep-codes/Debugger",
    ],
    readme: `
CircuitDebugger is a standalone GUI application built in Python to assist eSim users in debugging electronic circuits — combining a netlist analyzer, ML-powered error classifier, and AI chatbot.

## What it does
- Analyze .cir.out netlists for structural errors before simulation
- ML model classifies error logs and provides actionable fix suggestions
- AI chatbot via Ollama for real-time circuit debugging help

## Key Features
- **Netlist Analysis** — Proactively checks for dangling connections, missing .MODEL definitions
- **ML Classification** — Custom-trained scikit-learn model classifies error types automatically
- **AI Chatbot** — Connected to Ollama (qwen:4b) for guided interactive debugging
- **Dark GUI** — Modern sidebar/tab layout with SVG icons

## Tech Stack
Python · scikit-learn · Ollama · Tkinter · joblib
`,
  },
  dashboard: {
    id: "dashboard",
    demoUrl: "https://nivaro-admin.vercel.app",
    screenshots: [
      "https://opengraph.githubassets.com/1/Mandeep-codes/Dasboard",
    ],
    readme: `
Nivaro is a clean, modern admin dashboard UI built with React, TypeScript, and Tailwind CSS.

## What it does
- Full admin dashboard interface with clean UI components
- Live at nivaro-admin.vercel.app

## Key Features
- **Modern Design** — Clean layouts with responsive components
- **TypeScript** — Fully typed for reliability
- **Tailwind CSS** — Utility-first styling system

## Tech Stack
React · TypeScript · Tailwind CSS · Vite
`,
  },
  breathingai: {
    id: "breathingai",
    screenshots: [
      "https://opengraph.githubassets.com/1/Mandeep-codes/BreathingAI",
    ],
    readme: `
BreathAI is an end-to-end AI system that detects 6 respiratory conditions from breathing audio using a hybrid CNN-LSTM deep neural network, with a 3D interactive React Three Fiber frontend.

## What it does
- Records 5–30 seconds of breathing audio via browser mic
- Processes through a quality gate (SNR, clipping checks)
- Classifies into 6 conditions: Bronchiectasis, Bronchiolitis, COPD, Healthy, Pneumonia, URTI

## Key Features
- **CNN-LSTM Hybrid** — Mel spectrograms for spatial analysis + Bi-LSTM for temporal patterns
- **3D Frontend** — Animated 3D lung model, DNA helix, live waveform with React Three Fiber
- **FastAPI Backend** — REST API with Swagger docs at /docs
- **Quality Gate** — SNR and clipping validation before inference
- **Risk Assessment** — Color-coded 3D risk orb with confidence scores

## Tech Stack
Python · PyTorch · FastAPI · librosa · React 18 · Three.js (R3F) · Zustand · Framer Motion · Vite
`,
  },
}
