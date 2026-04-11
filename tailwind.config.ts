import type { Config } from "tailwindcss";

// NOTE: This project uses Tailwind v4 which uses CSS-first configuration.
// The canonical theme config lives in src/styles/globals.css @theme block.
// This file is kept for reference and tooling compatibility.
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4A843",
          dark: "#B8912E",
        },
        cream: "#FAF8F3",
        ivory: "#F5F0E8",
        charcoal: "#2C2C2C",
        "trust-green": "#1A6B4A",
        muted: "#888888",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "h1-mobile": ["1.75rem", { lineHeight: "1.25" }],
        "h1-desktop": ["2.625rem", { lineHeight: "1.25" }],
        "h2-mobile": ["1.375rem", { lineHeight: "1.3" }],
        "h2-desktop": ["2rem", { lineHeight: "1.3" }],
        "h3-mobile": ["1.125rem", { lineHeight: "1.4" }],
        "h3-desktop": ["1.5rem", { lineHeight: "1.4" }],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06)",
        cta: "0 4px 12px rgba(212,168,67,0.3)",
        quiz: "0 8px 32px rgba(0,0,0,0.06)",
        sticky: "0 -4px 20px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        card: "12px",
        button: "10px",
        pill: "20px",
      },
      maxWidth: {
        page: "1200px",
        quiz: "480px",
      },
    },
  },
  plugins: [],
};
export default config;
