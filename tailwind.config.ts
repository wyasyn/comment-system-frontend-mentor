import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-rubik)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        danger: "var(--danger)",
        secondary: "var(--secondary)",
        border: "var(--border)",
        "muted-danger": "var(--muted-danger)",
        "muted-foreground": "var(--muted-foreground)",
        "btn-foreground": "var(--btn-foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
