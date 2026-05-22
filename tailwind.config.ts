import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mojo: {
          yellow: "#FACC15", // tailwind yellow-400
          dark: "#1A1A1B",
          black: "#030303",
          border: "#343536",
          gray: "#818384",
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
