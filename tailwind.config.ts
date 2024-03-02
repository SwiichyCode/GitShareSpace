import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      backgroundColor: {
        default: "#0D1117",
        overlay: "#161B22",
        inset: "#010409",
        subtle: "#6E7781",
        subtleHover: "#292F36",
        success: "#238636",
        skeleton: "#0D1117",
        successHover: "#2EA043",
        buttonHover: "#171B20",
      },
      textColor: {
        default: "#E6EDF3",
        subtle: "#6E7781",
        link: "#2F81E8",
        icon: "#848D97",
      },
      boxShadow: {
        overlay: "0 0 0 1px #30363d, 0 16px 32px rgba(1,4,9,0.85)",
      },
      borderColor: {
        default: "#21262D",
        card: "#30363D",
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
