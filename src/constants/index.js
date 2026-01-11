// index.js
export const servicesData = [
  {
    title: "FullStack Development",
    description:
      "Your business deserves a fast, secure, and future-proof digital foundation. I develop custom web apps with clean architecture, optimized databases, and seamless integrations—ensuring reliability at every layer.",
    items: [
      {
        title: "Backend Engineering",
        description: "(REST/GraphQL APIs, Microservices, Auth Systems)",
      },
      {
        title: "Frontend Excellence",
        description: "(React, Vue, TypeScript, Interactive UI/UX)",
      },
      {
        title: "Database Design",
        description: "(SQL/NoSQL Optimization, Scalable Structures)",
      },
    ],
  },
  {
    title: "DevOps & Cloud Solutions",
    description:
      "Deploying software shouldn't be a gamble. I automate infrastructure, enforce security, and leverage cloud platforms (AWS/Azure) to keep your app running smoothly—24/7, at any scale.",
    items: [
      {
        title: "CI/CD Pipelines",
        description: "(GitHub Actions, Docker, Kubernetes)",
      },
      {
        title: "Server Management ",
        description: "(Linux, Nginx, Load Balancing)",
      },
      {
        title: "Performance Tuning",
        description: "(Caching, Compression, Lighthouse 90+ Scores)",
      },
    ],
  },
  {
    title: "Security & Optimization",
    description:
      "Slow or hacked apps destroy trust. I harden security (XSS/SQLI protection, OAuth) and optimize bottlenecks so your app stays fast, safe, and scalable as you grow.",
    items: [
      {
        title: "Code Audits",
        description: "(Refactoring, Tech Debt Cleanup)",
      },
      {
        title: "Pen Testing",
        description: "(Vulnerability Assessments)",
      },
      {
        title: "SEO Tech Stack",
        description: "(SSR, Metadata, Structured Data)",
      },
    ],
  },
  {
    title: "Web & Mobile Apps",
    description:
      "A clunky interface can sink even the best ideas. I craft responsive, pixel perfect web and mobile apps (React Native/Flutter) that users love—bridging design and functionality seamlessly.",
    items: [
      {
        title: "Cross-Platform Apps",
        description: "(Single codebase for iOS/Android/Web)",
      },
      {
        title: "PWAs",
        description: "(Offline mode, Push Notifications)",
      },
      {
        title: "E-Commerce",
        description: "(Checkout flows, Payment Gateways, Inventory APIs)",
      },
    ],
  },
];
export const projects = [
  {
    id: 1,
    name: "Finvoke - Trade Simulator",
    description:
      "Finvoke is a full-stack simulation platform where users can register, log in, manage virtual funds, buy stocks, and track orders and positions through a React-based dashboard interface.",
    href: "",
    image: "/assets/projects/finvoke.png",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Express.js" },
      { id: 3, name: "Node.js" },
      { id: 4, name: "MongoDB" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 2,
    name: "MailX - A Email Cleaner Desktop App",
    description:
      "A powerful desktop application for analyzing, organizing, and cleaning up your Gmail inbox. Built with Java and JavaFX, this application runs completely locally on your computer while securely connecting to Gmail via OAuth 2.0.",
    href: "",
    image: "/assets/projects/MailX.png",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "Java" },
      { id: 2, name: "JavaFX" },
      { id: 3, name: "OAuth 2.0" },
      { id: 4, name: "Gmail API" },
      { id: 5, name: "JSoup" },
      { id: 6, name: "Maven" },
      { id: 7, name: "H2" },


    ],
  },
  {
    id: 3,
    name: "DwellNest - A Property Renting Platform",
    description:
      "DwellNest is a full-stack backend project for listing rental properties. Users can upload property details along with images, and the app handles location mapping automatically using third-party APIs.",
    href: "",
    image: "/assets/projects/DwellNest.jpeg",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "Node.js" },
      { id: 2, name: "Express.js" },
      { id: 3, name: "Cloudinary" },
      { id: 4, name: "MongoDB" },
      { id: 5, name: "Multer" },
      { id: 6, name: "OpenCage + Thunderforest APIs" },
      
    ],
  },
  {
    id: 4,
    name: "CircuitDebugger - Debugger For Electronic Circuits",
    description:
      "eSim AI Debugging Tool is a Python-based GUI app that helps debug electronic circuits using netlist analysis, ML-powered error classification, and an AI chatbot with a modern dark-themed interface.",
    href: "",
    image: "/assets/projects/CircuitDebugger.jpeg",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "Python" },
      { id: 2, name: "Ollama" },
      { id: 3, name: "Scikit-learn" },
      
    ],
  },
];
export const socials = [
  { name: "Instagram", href: "https://www.instagram.com/mandeep_nehra" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mandeep-nehra-289224371/" },
  { name: "GitHub", href: "https://github.com/Mandeep-codes" },
];
