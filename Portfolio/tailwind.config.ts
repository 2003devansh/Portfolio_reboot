import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        spider: {
          red: "#e8003d",
          red2: "#ff1a52",
          blue: "#003bbf",
          blue2: "#1a56ff",
          web: "#c8d8ff",
          dark: "#060608",
          panel: "#0d0d14",
          border: "#1a1a2e",
          border2: "#242440",
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
        body: ['"DM Sans"', "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
