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
    companyName: "Freelance",
    companyIcon: <BriefcaseBusinessIcon strokeWidth={1.8} />,
    positions: [
      {
        id: "fullstack",
        title: "Full Stack Developer",
        employmentPeriod: {
          start: "2023",
        },
        employmentType: "Part-time",
        icon: <CodeXmlIcon />,
        description:
          "Building secure, high-performance full-stack applications with smooth UX for clients across industries.\n- Custom web apps with clean architecture and optimized databases\n- CI/CD pipelines with GitHub Actions and Docker\n- Payment gateway integrations and third-party API work",
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
      {
        id: "devops",
        title: "DevOps & Cloud",
        employmentPeriod: {
          start: "2024",
        },
        employmentType: "Part-time",
        icon: <ServerIcon />,
        description:
          "Infrastructure automation, cloud deployments, and performance tuning.\n- AWS/Azure deployments with 24/7 uptime\n- Nginx, load balancing, and server management\n- Lighthouse 90+ scores across projects",
        skills: [
          "AWS",
          "Docker",
          "Nginx",
          "GitHub Actions",
          "Linux",
        ],
      },
      {
        id: "security",
        title: "Security & Optimization",
        employmentPeriod: {
          start: "2024",
        },
        employmentType: "Part-time",
        icon: <ShieldIcon />,
        description:
          "Security hardening and performance optimization for client apps.\n- XSS/SQLI protection, OAuth implementation\n- Code audits and tech debt cleanup\n- SSR, metadata, and structured data for SEO",
        skills: [
          "OAuth",
          "Security Audits",
          "SSR",
          "SEO",
          "Performance Optimization",
        ],
      },
      {
        id: "mobile",
        title: "Web & Mobile Apps",
        employmentPeriod: {
          start: "2023",
        },
        employmentType: "Part-time",
        icon: <SmartphoneIcon />,
        description:
          "Cross-platform web and mobile apps bridging design and functionality.\n- React Native/Flutter cross-platform apps\n- PWAs with offline mode and push notifications\n- E-commerce with checkout flows and payment gateways",
        skills: [
          "React Native",
          "Flutter",
          "PWA",
          "Razorpay",
          "Stripe",
        ],
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
          "Currently in 2nd year at a university in Rajasthan, India.\n- Focused on machine learning, deep learning, data engineering, and software development\n- Active in coding clubs and AI/ML communities\n- Building real-world projects alongside coursework",
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
