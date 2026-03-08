export const PERSONAL = {
  name: "YOUR NAME",
  firstName: "YOUR",
  lastName: "NAME",
  role: "Fullstack Developer",
  tagline: "Your Friendly Neighbourhood Web Developer",
  email: "hello@yourname.dev",
  company: "Trieon Technosolution Pvt Ltd",
  university: "GLA University",
  stack: "MERN Stack",
  available: true,
  socials: {
    github: "https://github.com/yourname",
    linkedin: "https://linkedin.com/in/yourname",
    twitter: "https://twitter.com/yourname",
  },
};

export const SKILLS = [
  {
    category: "Frontend",
    icon: "🕷",
    items: [
      { name: "React.js", level: "core" },
      { name: "JavaScript ES6+", level: "core" },
      { name: "Tailwind CSS", level: "hot" },
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
      { name: "Aggregation", level: "" },
      { name: "MongoDB Atlas", level: "" },
      { name: "Indexing", level: "" },
    ],
  },
  {
    category: "Tools",
    icon: "⚙",
    items: [
      { name: "Git & GitHub", level: "core" },
      { name: "Postman", level: "hot" },
      { name: "VS Code", level: "hot" },
      { name: "Figma", level: "" },
      { name: "Vercel", level: "" },
      { name: "Render", level: "" },
      { name: "npm", level: "" },
    ],
  },
];

export const PROFICIENCY = [
  { name: "JavaScript (ES6+)", pct: 90 },
  { name: "React.js", pct: 88 },
  { name: "Node.js / Express", pct: 82 },
  { name: "MongoDB / Mongoose", pct: 78 },
  { name: "REST API Design", pct: 85 },
  { name: "Git / GitHub", pct: 80 },
];

export const PROJECTS = [
  {
    id: "01",
    title: "E-Commerce Platform",
    tags: ["MERN", "Internship", "Stripe", "JWT", "Redux"],
    featured: true,
    desc: "Full-featured e-commerce platform built during internship at Trieon Technosolution. Product catalog, cart, JWT authentication, Stripe payments & admin dashboard for inventory.",
    link: "#",
    github: "#",
  },
  {
    id: "02",
    title: "Real-Time Chat App",
    tags: ["Socket.io", "React", "Node.js", "MongoDB"],
    featured: false,
    desc: "Live messaging with rooms, typing indicators, online status and persistent message history in MongoDB.",
    link: "#",
    github: "#",
  },
  {
    id: "03",
    title: "Task Manager",
    tags: ["React", "Express", "MongoDB", "Drag & Drop"],
    featured: false,
    desc: "Kanban-style project board with drag-and-drop, user assignments, due dates and team collaboration.",
    link: "#",
    github: "#",
  },
  {
    id: "04",
    title: "Blog CMS Platform",
    tags: ["MERN", "Rich Text", "REST API"],
    featured: false,
    desc: "Full-stack blogging with rich-text editor, tag system, comments and role-based author access control.",
    link: "#",
    github: "#",
  },
  {
    id: "05",
    title: "Auth Boilerplate",
    tags: ["Node.js", "JWT", "bcrypt", "MongoDB"],
    featured: false,
    desc: "Production-ready authentication with JWT, refresh tokens, email verification and role-based access.",
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
