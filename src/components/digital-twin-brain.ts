// Digital Twin — keyword-scoring knowledge engine (no API)
// Scores every rule by keyword hits → picks best match

export type Message = {
  role: "user" | "twin"
  content: string
}

// ─── Knowledge base ──────────────────────────────────────────────────────────

const KB = {
  name: "Mandeep Nehra",
  nickname: "Deep",
  location: "Rajasthan, India",
  email: "mandeepnehra.work@gmail.com",
  x: "@NehraWorkss",
  xUrl: "https://x.com/NehraWorkss",
  github: "github.com/Mandeep-codes",
  linkedin: "linkedin.com/in/mandeep-nehra-289224371",
  education:
    "B.Tech in Artificial Intelligence & Data Science at Gati Shakti Vishwavidyalaya (GSV), Vadodara — graduating 2028. Currently in 3rd year.",
  bio: "Full Stack Developer & Machine Learning Enthusiast. Obsessed with building clean, fast, and intuitive applications — from responsive React interfaces to reliable backend systems.",
  about:
    "I care deeply about writing code that's not just functional, but maintainable, scalable, and user-focused. Every project I build is a reflection of my mindset: learn deeply, build honestly, improve continuously.",
  hobbies:
    "Building side projects, listening to music, watching anime (currently One Piece), gaming (currently playing Elden Ring on PC), reading books & novels.",
  currentlyReading: "One Piece by Eiichiro Oda",
  currentlyPlaying: "Elden Ring on PC",
  jobTitle: "Full Stack Developer & Machine Learning Enthusiast",
  experience: [
    {
      role: "Full Stack Developer Intern",
      company: "Zenjaura Publishing House",
      period: "May 2025 – July 2025",
      desc: "Built full-stack features for an e-commerce platform with 1,000+ monthly active users. Used React, Node.js, MongoDB, Redis caching, Nginx reverse proxying.",
    },
    {
      role: "Research Intern",
      company: "Research Lab",
      period: "Jan 2026 – April 2026",
      desc: "Developed a post-quantum authenticated key agreement protocol for V2I communication in VANETs using lattice-based cryptography. Formal security verification with AVISPA, NS-3 simulations.",
    },
    {
      role: "Machine Learning Intern",
      company: "DRM (Divisional Railway Manager) Office",
      period: "May 2025 – June 2025",
      desc: "Built digital solutions for the DRM Office. Streamlined data management and reporting processes using Python, ML, SQL.",
    },
  ],
  projects: [
    {
      name: "OmniBrief",
      desc: "Full-stack video intelligence engine — ingests YouTube videos, generates transcripts, summaries, decisions, and action items via AI. RAG-based chat using ChromaDB + LangChain to query video content.",
      tech: "Python, ChromaDB, Flask, Mistral AI, LangChain, OpenAI Whisper, React",
      link: "github.com/Mandeep-codes/RAG---Ai-video-",
    },
    {
      name: "Finvoke – Trade Simulator",
      desc: "Full-stack stock trading simulation platform. Register, log in, manage virtual funds, buy/sell stocks, track orders and P&L via a React dashboard.",
      tech: "React, Express.js, Node.js, MongoDB, Tailwind CSS",
      link: "github.com/Mandeep-codes/FInvoke",
    },
    {
      name: "MailX – Email Cleaner Desktop App",
      desc: "Powerful desktop app for analyzing, organizing, and cleaning Gmail inbox. Runs fully locally with Gmail OAuth 2.0. Smart inbox analysis and bulk cleanup.",
      tech: "Java, JavaFX, OAuth 2.0, Gmail API, JSoup, Maven, H2",
      link: "github.com/Mandeep-codes/EmailCleaner",
    },
    {
      name: "Sketchify – AI Image Generation App",
      desc: "AI-powered sketch-to-art platform. Draw, pick a style, transform doodles into artwork. Features AR visualization, reel generation, creative challenges, and a social community.",
      tech: "React, TypeScript, Node.js, Tailwind CSS, Vite, Drizzle ORM, Expo, Electron",
      link: "github.com/Mandeep-codes/Sketchify",
    },
  ],
  techStack: {
    Languages: ["JavaScript", "TypeScript", "Python", "Java"],
    Frontend: ["React", "Next.js", "Tailwind CSS"],
    Backend: ["Node.js", "Express.js", "Flask"],
    Databases: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
    "Dev Tools": ["Docker", "Git", "Linux"],
    "AI/ML": ["LangChain", "ChromaDB", "TensorFlow", "scikit-learn", "NumPy", "Pandas"],
  },
  certifications: [
    "TensorFlow Developer Certificate — Google (Nov 2024)",
    "AWS Certified Cloud Practitioner (Sep 2024)",
    "Deep Learning Specialization — Coursera/deeplearning.ai (Jul 2024)",
    "Meta Front-End Developer Certificate (Apr 2024)",
    "Full Stack Open — University of Helsinki (Dec 2023)",
    "Machine Learning Specialization — Stanford/deeplearning.ai (Sep 2023)",
  ],
}

// ─── Scoring engine ───────────────────────────────────────────────────────────

type Rule = {
  keywords: string[]   // any word match scores +1
  boost?: string[]     // strong signal words score +3
  response: () => string
}

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim()
}

function score(input: string, rule: Rule): number {
  const words = new Set(input.split(" "))
  let s = 0
  for (const kw of rule.keywords) {
    if (words.has(kw) || input.includes(kw)) s += 1
  }
  for (const kw of rule.boost ?? []) {
    if (words.has(kw) || input.includes(kw)) s += 3
  }
  return s
}

// ─── Rules ────────────────────────────────────────────────────────────────────

const RULES: Rule[] = [
  // Greetings
  {
    keywords: ["hi", "hey", "hello", "sup", "yo", "howdy", "hiya", "helo", "heya"],
    boost: ["hi", "hey", "hello"],
    response: () =>
      `Hey! 👾 I'm Deep's digital twin. Ask me anything about him — projects, skills, experience, or how to reach him.`,
  },

  // Who / what is Deep / you
  {
    keywords: ["who", "what", "are", "you", "deep", "mandeep", "bot", "ai", "real", "twin", "this"],
    boost: ["who", "what are you", "who are you", "who is"],
    response: () =>
      `I'm a pixel-art digital twin of **Deep** (Mandeep Nehra) — Full Stack Developer & ML Enthusiast from Rajasthan, India. Ask me anything about him!`,
  },

  // Name
  {
    keywords: ["name", "called", "call", "full name", "your name", "his name"],
    boost: ["name"],
    response: () => `He goes by **Deep** — full name Mandeep Nehra. 🇮🇳`,
  },

  // About / bio / intro
  {
    keywords: ["about", "bio", "describe", "tell", "introduction", "intro", "himself", "yourself", "background", "summary"],
    boost: ["about", "tell me", "describe"],
    response: () =>
      `${KB.bio}\n\n${KB.about}\n\nCurrently in 3rd year of B.Tech AI & DS at GSV Vadodara, graduating 2028.`,
  },

  // What does he do
  {
    keywords: ["do", "does", "work", "role", "occupation", "profession", "field", "specializ", "focus"],
    boost: ["what do you do", "what does he do", "what do you work"],
    response: () =>
      `Deep is a **Full Stack Developer & ML Enthusiast**.\n\nHe builds web apps (React, Node.js), works with AI/ML (LangChain, TensorFlow, ChromaDB), and loves shipping things from scratch. Check his projects for proof!`,
  },

  // Location
  {
    keywords: ["where", "from", "live", "based", "location", "city", "country", "place", "india", "rajasthan", "vadodara", "gujarat"],
    boost: ["where", "from", "location"],
    response: () =>
      `Based in **Rajasthan, India** 🇮🇳. Currently studying at GSV Vadodara (Gujarat).`,
  },

  // Education / college
  {
    keywords: ["education", "college", "university", "degree", "btech", "b tech", "gsv", "gati", "shakti", "studying", "student", "graduating", "year", "course", "major", "branch", "ai", "data science"],
    boost: ["education", "college", "university", "studying", "degree"],
    response: () =>
      `📚 ${KB.education}\n\nFocused on ML, deep learning, data engineering & full-stack dev. Active in coding clubs and AI/ML communities.`,
  },

  // Projects — all
  {
    keywords: ["project", "projects", "built", "build", "made", "created", "work", "portfolio", "show", "apps", "what have", "what did"],
    boost: ["projects", "built", "portfolio", "show me"],
    response: () => {
      const list = KB.projects
        .map((p) => `• **${p.name}** — ${p.desc.split(".")[0]}.`)
        .join("\n")
      return `Here's what Deep has built:\n\n${list}\n\nAsk about any specific one for more details!`
    },
  },

  // OmniBrief
  {
    keywords: ["omnibrief", "omni", "brief", "video", "youtube", "rag", "langchain", "chroma", "transcript", "summary", "whisper"],
    boost: ["omnibrief", "video intelligence"],
    response: () => {
      const p = KB.projects[0]!
      return `**${p.name}** — ${p.desc}\n\n🛠 Stack: ${p.tech}\n🔗 ${p.link}`
    },
  },

  // Finvoke
  {
    keywords: ["finvoke", "trade", "stock", "trading", "simulator", "invest", "finance", "market", "portfolio", "buy", "sell"],
    boost: ["finvoke", "trading", "stock"],
    response: () => {
      const p = KB.projects[1]!
      return `**${p.name}** — ${p.desc}\n\n🛠 Stack: ${p.tech}\n🔗 ${p.link}`
    },
  },

  // MailX
  {
    keywords: ["mailx", "mail", "email", "gmail", "inbox", "cleaner", "javafx", "java", "desktop", "oauth"],
    boost: ["mailx", "email cleaner", "gmail"],
    response: () => {
      const p = KB.projects[2]!
      return `**${p.name}** — ${p.desc}\n\n🛠 Stack: ${p.tech}\n🔗 ${p.link}`
    },
  },

  // Sketchify
  {
    keywords: ["sketchify", "sketch", "drawing", "draw", "doodle", "image generation", "image gen", "ar", "art", "creative"],
    boost: ["sketchify", "sketch to art"],
    response: () => {
      const p = KB.projects[3]!
      return `**${p.name}** — ${p.desc}\n\n🛠 Stack: ${p.tech}\n🔗 ${p.link}`
    },
  },

  // Skills / tech stack
  {
    keywords: ["skill", "skills", "tech", "stack", "technology", "technologies", "language", "languages", "framework", "tools", "know", "use", "react", "node", "python", "javascript", "typescript", "ml", "ai"],
    boost: ["skills", "tech stack", "what can you use", "what do you know"],
    response: () => {
      const lines = Object.entries(KB.techStack)
        .map(([cat, items]) => `**${cat}:** ${items.join(", ")}`)
        .join("\n")
      return `Deep's tech stack:\n\n${lines}`
    },
  },

  // Experience / internships
  {
    keywords: ["experience", "intern", "internship", "worked", "working", "job", "company", "companies", "professional", "career", "past", "history"],
    boost: ["experience", "internship", "worked at", "work experience"],
    response: () => {
      const list = KB.experience
        .map((e) => `• **${e.role}** @ ${e.company} (${e.period})\n  ${e.desc.split(".")[0]}.`)
        .join("\n\n")
      return `Work experience:\n\n${list}`
    },
  },

  // Certifications
  {
    keywords: ["cert", "certify", "certificate", "certification", "aws", "tensorflow", "coursera", "deeplearning", "meta", "stanford", "helsinki"],
    boost: ["certifications", "certified"],
    response: () => {
      const list = KB.certifications.map((c) => `• ${c}`).join("\n")
      return `Certifications Deep has earned:\n\n${list}`
    },
  },

  // Contact / reach / email / social
  {
    keywords: ["contact", "reach", "email", "mail", "dm", "message", "connect", "twitter", "x", "linkedin", "github", "social", "find", "link", "links", "where can i"],
    boost: ["contact", "reach out", "email", "how to contact", "get in touch"],
    response: () =>
      `Best ways to reach Deep:\n\n• ✉️ **Email:** ${KB.email}\n• 🐦 **X (Twitter):** ${KB.x} → ${KB.xUrl}\n• 💼 **LinkedIn:** ${KB.linkedin}\n• 🐙 **GitHub:** ${KB.github}`,
  },

  // GitHub specifically
  {
    keywords: ["github", "repo", "repository", "code", "open source", "source code"],
    boost: ["github", "repo"],
    response: () =>
      `All code lives here → 🐙 **${KB.github}**\n\nProjects: OmniBrief, Finvoke, MailX, Sketchify and more.`,
  },

  // Hobbies / interests
  {
    keywords: ["hobby", "hobbies", "interest", "free time", "besides", "outside", "fun", "relax", "anime", "manga", "gaming", "game", "music", "reading", "book", "life", "personal"],
    boost: ["hobbies", "interests", "free time", "outside of coding"],
    response: () =>
      `Outside of coding, Deep is into:\n\n• 📖 Currently reading: **${KB.currentlyReading}**\n• 🎮 Currently playing: **${KB.currentlyPlaying}**\n• 🎵 Listening to music\n• 🎌 Watching anime\n• 📚 Reading novels`,
  },

  // One Piece / anime
  {
    keywords: ["one piece", "luffy", "anime", "manga", "naruto", "eiichiro", "otaku"],
    boost: ["one piece", "anime"],
    response: () =>
      `Big One Piece fan! Currently reading it. Best manga ever made, don't @ him. 🏴‍☠️`,
  },

  // Gaming / Elden Ring
  {
    keywords: ["elden ring", "game", "gaming", "gamer", "souls", "fromsoft", "pc", "play", "playing"],
    boost: ["elden ring", "gaming"],
    response: () =>
      `Currently grinding **Elden Ring** on PC. Pain and suffering in the best way. 🗡️`,
  },

  // Hire / opportunity
  {
    keywords: ["hire", "hiring", "job", "opportunity", "open to", "available", "freelance", "collab", "collaboration", "work with", "recruit"],
    boost: ["hire", "hiring", "freelance", "collab"],
    response: () =>
      `Deep is open to interesting opportunities, collabs, and freelance work!\n\n• ✉️ ${KB.email}\n• 🐦 ${KB.x} on X`,
  },

  // Age
  {
    keywords: ["age", "old", "born", "birth", "year old", "how old"],
    boost: ["how old", "age"],
    response: () =>
      `Deep is a B.Tech student graduating in 2028 — early 20s. 😄`,
  },

  // Thanks / compliment
  {
    keywords: ["thank", "thanks", "thx", "ty", "appreciate", "nice", "cool", "awesome", "great", "good", "helpful", "love", "amazing"],
    boost: ["thank", "thanks"],
    response: () =>
      `Anytime! 😄 Anything else you want to know about Deep?`,
  },

  // Bye
  {
    keywords: ["bye", "goodbye", "cya", "see you", "later", "peace", "gotta go", "ttyl", "farewell"],
    boost: ["bye", "goodbye"],
    response: () =>
      `Later! 👾 Feel free to drop Deep a message at ${KB.email} or ${KB.x} on X.`,
  },
]

// ─── Fallbacks ────────────────────────────────────────────────────────────────

const FALLBACKS = [
  `Hmm, not sure about that. Try asking about his **projects**, **skills**, **experience**, or how to **contact** him!`,
  `That's outside my pixel-brain! You can ask about Deep's work, tech stack, internships, certs, or hobbies.`,
  `I don't have that info. But Deep is reachable at **${KB.email}** or **${KB.x}** on X if you need more!`,
]

// ─── Main engine ─────────────────────────────────────────────────────────────

export function getReply(input: string): string {
  const norm = normalize(input)
  if (!norm) return `Say something! Ask me about Deep's projects, skills, experience...`

  let bestRule: Rule | null = null
  let bestScore = 0

  for (const rule of RULES) {
    const s = score(norm, rule)
    if (s > bestScore) {
      bestScore = s
      bestRule = rule
    }
  }

  // Require at least 1 keyword hit
  if (bestScore >= 1 && bestRule) {
    return bestRule.response()
  }

  // Fallback
  const idx = (norm.length + norm.charCodeAt(0)) % FALLBACKS.length
  return FALLBACKS[idx]!
}

export const GREETING = `Hey there! 👾 I'm a pixel-art digital twin of **Deep**.\n\nAsk me anything — his projects, skills, experience, or how to reach him!`
