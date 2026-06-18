// Digital Twin — rule-based knowledge engine (no API)
// All answers derived from portfolio data

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
  education: "B.Tech in Artificial Intelligence & Data Science at Gati Shakti Vishwavidyalaya (GSV), Vadodara — graduating 2028. Going into 3rd year.",
  bio: "Full Stack Developer & Machine Learning Enthusiast. Obsessed with building clean, fast, and intuitive applications — from responsive React interfaces to reliable backend systems.",
  about: "I care deeply about writing code that's not just functional, but maintainable, scalable, and user-focused. Every project I build is a reflection of my mindset: learn deeply, build honestly, improve continuously.",
  hobbies: "Building side projects, listening to music, watching anime (currently One Piece), gaming (currently playing Elden Ring on PC), reading books & novels.",
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

// ─── Response rules ───────────────────────────────────────────────────────────

type Rule = {
  patterns: RegExp[]
  response: () => string
}

const RULES: Rule[] = [
  // Greetings
  {
    patterns: [/^(hi|hey|hello|sup|yo|howdy|what'?s up|hiya)/i],
    response: () =>
      `Hey! 👾 I'm Deep's digital twin. I know basically everything about him — ask me anything!`,
  },

  // Who are you / what are you
  {
    patterns: [/who are you|what are you|are you (a )?bot|are you (an )?ai|are you real|are you mandeep/i],
    response: () =>
      `I'm a pixel-art digital twin of Mandeep (Deep) Nehra — a full-stack dev & ML enthusiast from Rajasthan, India. Ask me about his projects, skills, experience, or anything else!`,
  },

  // Name
  {
    patterns: [/what('?s| is) (your|his) name|who is (he|this|deep|mandeep)/i],
    response: () =>
      `I'm Mandeep Nehra — goes by "Deep". Full Stack Developer & ML Enthusiast from Rajasthan, India. 🇮🇳`,
  },

  // Location
  {
    patterns: [/where (are|do) (you|he) (live|from|based)|location|city|country|india/i],
    response: () =>
      `Based in Rajasthan, India. Currently studying at GSV Vadodara (Gujarat) too.`,
  },

  // Education
  {
    patterns: [/education|college|university|degree|btech|b\.tech|gsv|gati shakti|studying|student|graduating|year/i],
    response: () =>
      `${KB.education} Focused on ML, deep learning, data engineering & software dev. Active in coding clubs and AI/ML communities.`,
  },

  // Projects — all
  {
    patterns: [/projects?|built|made|created|portfolio|work|what have you (built|made|done)/i],
    response: () => {
      const list = KB.projects
        .map((p) => `• **${p.name}** — ${p.desc.split(".")[0]}.`)
        .join("\n")
      return `Here's what I've built:\n\n${list}\n\nAsk about any specific one for more details!`
    },
  },

  // OmniBrief
  {
    patterns: [/omnibrief|video intel|rag.*video|youtube.*ai|langchain/i],
    response: () => {
      const p = KB.projects[0]!
      return `**${p.name}** — ${p.desc}\n\nStack: ${p.tech}\n🔗 ${p.link}`
    },
  },

  // Finvoke
  {
    patterns: [/finvoke|trade|stock|trading|simulator/i],
    response: () => {
      const p = KB.projects[1]!
      return `**${p.name}** — ${p.desc}\n\nStack: ${p.tech}\n🔗 ${p.link}`
    },
  },

  // MailX
  {
    patterns: [/mailx|email cleaner|gmail|inbox|javafx|desktop app/i],
    response: () => {
      const p = KB.projects[2]!
      return `**${p.name}** — ${p.desc}\n\nStack: ${p.tech}\n🔗 ${p.link}`
    },
  },

  // Sketchify
  {
    patterns: [/sketchify|sketch|ai.*image|image.*gen|doodle|ar.*visual/i],
    response: () => {
      const p = KB.projects[3]!
      return `**${p.name}** — ${p.desc}\n\nStack: ${p.tech}\n🔗 ${p.link}`
    },
  },

  // Skills / tech stack
  {
    patterns: [/skills?|tech(nolog|nique|stack)?|stack|know|languages?|tools?|frameworks?|what can you (code|build|use)/i],
    response: () => {
      const lines = Object.entries(KB.techStack)
        .map(([cat, items]) => `**${cat}:** ${items.join(", ")}`)
        .join("\n")
      return `My tech stack:\n\n${lines}`
    },
  },

  // Experience / internships
  {
    patterns: [/experience|intern(ship)?|work(ed|ing)?|job|company|companies|professional/i],
    response: () => {
      const list = KB.experience
        .map((e) => `• **${e.role}** @ ${e.company} (${e.period})\n  ${e.desc.split(".")[0]}.`)
        .join("\n\n")
      return `Work experience:\n\n${list}`
    },
  },

  // Certifications
  {
    patterns: [/cert(ificate|ification)?s?|aws|tensorflow|coursera|deeplearning|meta.*cert|full stack open/i],
    response: () => {
      const list = KB.certifications.map((c) => `• ${c}`).join("\n")
      return `Certifications I've earned:\n\n${list}`
    },
  },

  // Social links / contact
  {
    patterns: [/contact|reach|email|mail|dm|message|twitter|x\.com|linkedin|github|social/i],
    response: () =>
      `Best ways to reach Deep:\n\n• ✉️ **Email:** ${KB.email}\n• 🐦 **X (Twitter):** ${KB.x} — ${KB.xUrl}\n• 💼 **LinkedIn:** ${KB.linkedin}\n• 🐙 **GitHub:** ${KB.github}`,
  },

  // Hobbies / interests
  {
    patterns: [/hobbies|interests?|free time|outside.*coding|besides.*coding|fun|relax|anime|manga|gaming|game|music|reading|book/i],
    response: () =>
      `Outside of coding, I'm into:\n\n• 📖 Currently reading: **${KB.currentlyReading}**\n• 🎮 Currently playing: **${KB.currentlyPlaying}**\n• 🎵 Listening to music to unwind\n• 💤 Watching anime & reading manga\n• 📚 Reading books and novels`,
  },

  // One Piece
  {
    patterns: [/one piece|luffy|eiichiro|manga/i],
    response: () =>
      `Big One Piece fan! Currently reading it. Best manga ever made, don't @ me. 🏴‍☠️`,
  },

  // Elden Ring / gaming
  {
    patterns: [/elden ring|gaming|gamer|souls.?like|fromsoft/i],
    response: () =>
      `Currently grinding **Elden Ring** on PC. Pain and suffering in the best way. 🗡️`,
  },

  // About / bio
  {
    patterns: [/about (you|him|deep|mandeep)|who is deep|tell me about|describe yourself|bio/i],
    response: () =>
      `${KB.bio}\n\n${KB.about}\n\nCurrently in 3rd year of B.Tech AI & DS at GSV Vadodara, graduating 2028.`,
  },

  // Job / hire
  {
    patterns: [/hire|hiring|job|opportunity|open to work|available|freelance|collab/i],
    response: () =>
      `Deep is open to interesting opportunities, collabs, and freelance work!\n\nBest way to reach out:\n• ✉️ ${KB.email}\n• 🐦 ${KB.x} on X`,
  },

  // Age
  {
    patterns: [/how old|age|born|birth/i],
    response: () =>
      `Deep is a B.Tech student graduating in 2028 — so doing the math, early 20s. 😄`,
  },

  // GitHub
  {
    patterns: [/github|repo|open.?source|code/i],
    response: () =>
      `All code lives here → 🐙 **${KB.github}**\n\nProjects include OmniBrief, Finvoke, MailX, Sketchify and more.`,
  },

  // Thanks
  {
    patterns: [/thank(s| you)|thx|ty|appreciate|nice|cool|awesome|great|good/i],
    response: () =>
      `Anytime! 😄 Anything else you want to know about Deep?`,
  },

  // Bye
  {
    patterns: [/bye|goodbye|cya|see you|later|peace|gotta go/i],
    response: () =>
      `Later! 👾 Feel free to drop Deep a message at ${KB.email} or ${KB.x} on X.`,
  },
]

// ─── Fallback responses ───────────────────────────────────────────────────────

const FALLBACKS = [
  `Hmm, not sure about that one. For anything specific, reach out to Deep directly:\n\n• ✉️ ${KB.email}\n• 🐦 ${KB.x} on X`,
  `That's outside my pixel-brain's knowledge! Hit up Deep directly:\n\n• ✉️ ${KB.email}\n• 🐦 ${KB.x} on X`,
  `I don't have info on that. Deep's the real expert — DM him:\n\n• 🐦 ${KB.x} on X\n• ✉️ ${KB.email}`,
]

// ─── Engine ───────────────────────────────────────────────────────────────────

export function getReply(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) return `Say something! Ask me about Deep's projects, skills, experience...`

  for (const rule of RULES) {
    for (const pattern of rule.patterns) {
      if (pattern.test(trimmed)) {
        return rule.response()
      }
    }
  }

  // Fallback — cycle deterministically
  const idx = (trimmed.length + trimmed.charCodeAt(0)) % FALLBACKS.length
  return FALLBACKS[idx]!
}

export const GREETING = `Hey there! 👾 I'm a pixel-art digital twin of **Mandeep (Deep) Nehra**.\n\nAsk me anything — his projects, skills, experience, or how to reach him!`
