import type { User } from "@/features/portfolio/types/user"

import profilepic from "./images/profile.png"

export const USER: User = {
  firstName: "Mandeep",
  lastName: "Nehra",
  displayName: "Mandeep Nehra",
  username: "Mandeep-codes",
  gender: "male",
  pronouns: "he/him",
  bio: "I build clean, fast, and intuitive web applications with a strong focus on quality and user experience.",
  flipSentences: [
    "I build clean, fast & intuitive apps.",
    "Full Stack Developer",
    "Machine Learning Enthusiast",
    "404 No Bugs Found",
  ],
  address: "Rajasthan, India",
  phoneNumber: "KzkxNjM3NjkzMDQ2MQ==", // base64: +916376930461
  email: "bWFuZGVlcG5laHJhLndvcmtAZ21haWwuY29t", // base64: mandeepnehra.work@gmail.com
  website: "https://mandeep-portfolio-mu.vercel.app",
  jobTitle: "Full Stack Developer & Machine Learning Enthusiast",
  jobs: [
    {
      title: "Machine Learning Intern",
      company: "dfccil India",
      website: "",
      experienceId: "freelance",
    },
  ],
  about: `
Obsessed with building clean, fast, and intuitive applications — from responsive React interfaces to reliable backend systems.

I care deeply about writing code that's not just functional, but maintainable, scalable, and user-focused.
Every project I build is a reflection of my mindset: learn deeply, build honestly, and improve continuously.

When I'm not coding:
- Building side projects to turn ideas into working products
- Listening to music or unwinding after a solid coding session
- Watching anime or gaming to relax and recharge
- Reading books and novels
`,
  avatar: profilepic.src,
  avatarVariants: {
    lightOff: profilepic.src,
    lightOn: profilepic.src,
    darkOff: profilepic.src,
    darkOn: profilepic.src,
  },
  ogImage: profilepic.src,
  namePronunciationUrl: "",
  timeZone: "Asia/Kolkata",
  keywords: [
    "mandeep nehra",
    "mandeep",
    "nehra",
    "full stack developer",
    "ai data science",
    "rajasthan india developer",
    "react developer",
    "node.js developer",
  ],
  dateCreated: "2024-01-01",
  currentlyReading: {
    title: "One Piece",
    author: "Eiichiro Oda",
    url: "https://onepiece.com",
  },
  currentlyPlaying: {
    title: "Elden Ring",
    platform: "PC",
    url: "https://en.bandainamcoent.eu/elden-ring/elden-ring",
  },
}
