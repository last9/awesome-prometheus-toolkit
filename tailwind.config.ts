import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  darkMode: "class",
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        ["Inter", ...defaultTheme.fontFamily.sans],
        { fontFeatureSettings: '"ss04", "ss01", "cpsp"' },
      ],
      mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        "yaml-key": "rgba(34, 134, 58, 1)",
        "yaml-value": "rgba(3, 47, 98, 1)",
        overlay: "rgba(39, 55, 71, 0.5)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "loading-dots": {
          "0%": {
            transform: "translate(0, 0)",
          },
          "50%": {
            transform: "translate(0, 6px)",
          },
          "100%": {
            transform: "translate(0, 0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "loading-dots": "loading-dots 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
