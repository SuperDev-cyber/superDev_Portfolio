import type { Config } from "tailwindcss";
const { heroui } = require("@heroui/theme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        overlay: 'var(--overlay)',
        gray: "var(--gray)",
        card: "var(--card)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },
    },
    fontFamily: {
      mont: 'var(--font-montserrat)',
      roboto: 'var(--font-roboto)',
    },
    height: {
      input: '35px',
      screen: '100vh'
    },
    minHeight: {
      screen: '100vh'
    }
  },
  darkMode: "class",
  plugins: [heroui()],
};
export default config;
