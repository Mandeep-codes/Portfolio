import {
  BriefcaseBusinessIcon,
  CodeXmlIcon,
  GraduationCapIcon,
  ServerIcon,
  ShieldIcon,
  SmartphoneIcon,
} from "lucide-react"

import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "freelance",
    companyName: "Zenjaura Publishing House",
    companyIcon: <BriefcaseBusinessIcon strokeWidth={1.8} />,
    positions: [
      {
        id: "fullstack",
        title: "Full Stack Developer",
        employmentPeriod: {
          start: "May 2025",
          end: "July 2025",
        },
        employmentType: "Internship",
        icon: <CodeXmlIcon />,
        description:
          "Engineered full-stack features for an e-commerce platform serving 1,000+ monthly active users, developing scalable backend services with Node.js and MongoDB while building responsive user-facing interfaces. Additionally, implemented Redis caching and Nginx reverse proxying to improve application performance and request handling",
        skills: [
          "React",
          "Node.js",
          "Express.js",
          "MongoDB",
          "PostgreSQL",
          "Tailwind CSS",
          "Docker",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "freelance",
    companyName: "Research Intern",
    companyIcon: <BriefcaseBusinessIcon strokeWidth={1.8} />,
    positions: [
      {
        id: "fullstack",
        title: "Research Intern",
        employmentPeriod: {
          start: "Jan 2026",
          end: "April 2026",
        },
        employmentType: "Internship",
        icon: <CodeXmlIcon />,
        description:
          "Researched and developed a post-quantum authenticated key agreement protocol for secure Vehicle-to-Infrastructure (V2I) communication in VANETs, incorporating lattice-based cryptographic techniques and efficient reconciliation mechanisms. Additionally, performed formal security verification using AVISPA and conducted NS-3 simulations to evaluate security, latency, and communication efficiency. Co-authored the research study and contributed to protocol design, implementation, and performance analysis.",
        skills: ["NS-3", "SUMO", "Python", "AVISPA", "Ubuntu"],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "Internship",
    companyName: "DRM",
    companyIcon: <BriefcaseBusinessIcon strokeWidth={1.8} />,
    positions: [
      {
        id: "Machine Learning Intern",
        title: "Machine Learning Intern",
        employmentPeriod: {
          start: "May 2025",
          end: "June 2025",
        },
        employmentType: "Internship",
        icon: <CodeXmlIcon />,
        description:
          "Developed and maintained digital solutions for the Divisional Railway Manager (DRM) Office, supporting administrative and operational workflows across multiple railway departments. Additionally, collaborated with stakeholders to streamline data management and reporting processes, improving efficiency in day-to-day operations.",
        skills: [
          "Python",
          "Machine Learning",
          "Data Science",
          "SQL",
          "Statistics",
          "NumPy",
          "Pandas",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "education",
    companyName: "Education",
    companyIcon: <GraduationCapIcon strokeWidth={1.8} />,
    positions: [
      {
        id: "btech",
        title: "B.Tech — Artificial Intelligence & Data Science",
        employmentPeriod: {
          start: "08.2024",
          end: "05.2028",
        },
        icon: <GraduationCapIcon />,
        description:
          "Going to be in 3rd year of btech at Gati Shakti Vishwavidhaya.\n- Focused on machine learning, deep learning, data engineering, and software development\n- Active in coding clubs and AI/ML communities\n- Building real-world projects alongside coursework",
        skills: [
          "Python",
          "Machine Learning",
          "Deep Learning",
          "Data Science",
          "DSA",
          "SQL",
          "Statistics",
        ],
      },
    ],
  },
]
