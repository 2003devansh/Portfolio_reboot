export const PERSONAL = {
  name: "Devansh singh",
  firstName: "Heyy,I am",
  lastName: "Devansh",
  role: "Fullstack Developer",
  tagline: "Your Friendly Neighbourhood Web Developer",
  email: "faujdardevansh@gmail.com",
  company: "Trieon Technosolution Pvt Ltd",
  university: "GLA University",
  stack: "MERN Stack",
  available: true,
  socials: {
    github: "https://github.com/2003devansh",
    linkedin: "https://www.linkedin.com/in/devansh-singh-150873261/",
    resume:
      "https://drive.google.com/file/d/1yjxPuX6Pqwcfp5YwWNn2YvX3RdIX8l9O/view?usp=drive_link",
  },
};

export const SKILLS = [
  {
    category: "Frontend",
    icon: "🕷",
    items: [
      { name: "React.js", level: "core" },
      { name: "JavaScript ES6+", level: "core" },
      { name: "Typescript", level: "core" },
      { name: "Tailwind CSS", level: "hot" },
      { name: "Ant-Design", level: "hot" },
      { name: "HTML5 / CSS3", level: "hot" },
      { name: "Redux", level: "" },
      { name: "React Router", level: "" },
      { name: "Axios", level: "" },
      { name: "GSAP", level: "" },
    ],
  },
  {
    category: "Backend",
    icon: "🕸",
    items: [
      { name: "Node.js", level: "core" },
      { name: "Express.js", level: "core" },
      { name: "REST APIs", level: "hot" },
      { name: "JWT Auth", level: "hot" },
      { name: "bcrypt", level: "" },
      { name: "Middleware", level: "" },
      { name: "MVC Pattern", level: "" },
    ],
  },
  {
    category: "Database",
    icon: "🗄",
    items: [
      { name: "MongoDB", level: "core" },
      { name: "Mongoose", level: "core" },
      { name: "Schema Design", level: "hot" },
      { name: "PostgreSQl", level: "" },
      { name: "MongoDB Atlas", level: "" },
      { name: "SQL", level: "" },
    ],
  },
  {
    category: "Tools",
    icon: "⚙",
    items: [
      { name: "Git & GitHub", level: "core" },
      { name: "Postman", level: "hot" },
      { name: "VS Code", level: "hot" },
      { name: "Claude/GPT", level: "hot" },
      { name: "Render", level: "" },
      { name: "npm", level: "" },
    ],
  },
];

export const PROFICIENCY = [
  { name: "JavaScript (ES6+)", pct: 90 },
  { name: "TypeScript", pct: 84 },
  { name: "React.js", pct: 88 },
  { name: "Node.js / Express", pct: 82 },
  { name: "Database", pct: 78 },
  { name: "REST API Design", pct: 85 },
  { name: "Git / GitHub", pct: 80 },
];

export const PROJECTS = [
  {
    id: "01",
    title: "MicroCharity – Charity Management Platform",
    tags: ["React", "Node.js", "PostgreSQL", "Prisma", "JWT"],
    featured: true,
    desc: "Full-stack charity management platform connecting donors, recipients, and volunteers. Built REST APIs with Node.js and PostgreSQL using Prisma ORM, implemented role-based workflows, and developed a React frontend for managing donations, requests, and volunteer tasks.",
    link: "#",
    github: "https://github.com/2003devansh/charity_app",
  },
  {
    id: "02",
    title: "AI Code Review Editor",
    tags: ["React", "Node.js", "AI Integration", "PrismJS", "API"],
    featured: true,
    desc: "AI-powered code editor that analyzes JavaScript code and provides structured feedback including issues, suggested fixes, and best practices. Built with a React code editor interface and backend AI integration for automated code review.",
    link: "#",
    github:
      "https://github.com/2003devansh/https---github.com-2003devansh-bugslayer",
  },
  {
    id: "03",
    title: "Online Chess Game",
    tags: ["JavaScript", "React", "Game Logic", "UI"],
    featured: false,
    desc: "Interactive chess web application where users can play chess in the browser. Implemented full chess rules, move validation, and dynamic board rendering with responsive UI.",
    link: "#",
    github: "#",
  },
  {
    id: "04",
    title: "Memories – MERN Post Sharing App",
    tags: ["React", "Node.js", "MongoDB", "JWT", "Express"],
    featured: false,
    desc: "Full-stack social platform where users can create, update, and delete posts. Implemented JWT authentication, secure password hashing, and RESTful APIs with MongoDB for persistent data storage.",
    link: "#",
    github:
      "https://github.com/2003devansh/https---github.com-2003devansh-Resume_project",
  },
  {
    id: "05",
    title: "TrieoFleet – Transport Management System",
    tags: ["React", "TypeScript", "Dashboard", "Production"],
    featured: true,
    desc: "Contributed to the development of a Transport Management System during my time as an SDE Trainee at Trieon TechnoSolutions. Worked on production UI features, dashboard improvements, reusable components, and API integrations.",
    link: "#",
    github: "#",
  },
];
export const STATS = [
  { value: 1, suffix: "+", label: "Year Experience" },
  { value: 5, suffix: "+", label: "Projects Shipped" },
  { value: "MERN", suffix: "", label: "Primary Stack" },
  { value: "GLA", suffix: "", label: "University" },
];

export const TICKER_ITEMS = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "JavaScript",
  "REST API",
  "Git",
  "Tailwind CSS",
  "JWT Auth",
  "MERN Stack",
];
