import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        wine: "var(--wine)",
        "wine-text": "var(--wine-text)",
        charcoal: "var(--charcoal)",
        surface: "var(--surface)",
        border: "var(--border)",
        success: "var(--success)",
        warning: "var(--warning)",
        chart: {
          red: "var(--chart-red)",
          charcoal: "var(--chart-charcoal)",
          blue: "var(--chart-blue)",
          grey: "var(--chart-grey)",
          amber: "var(--chart-amber)",
          teal: "var(--chart-teal)",
        },
      },
      fontFamily: {
        sans: ["Inter Variable", "Inter", "Arial", "sans-serif"],
        heading: ["Space Grotesk Variable", "Space Grotesk", "Inter", "Arial", "sans-serif"],
      },
      borderRadius: {
        sm: "3px",
        DEFAULT: "4px",
        md: "6px",
      },
    },
  },
  plugins: [],
};

export default config;
