/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        base: "1920px",
      },
      colors: {
        primary: {
          default: "#0085FF",
          strong: "#1A3EDD",
        },
        neutral: {
          dark: "#333333",
        },
        gray: {
          light: "#f5f5f5",
          medium: "#d1d5db",
        },
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    screens: {
      xl: "1280px",
      lg: "1024px",
      md: "768px",
      sm: "640px",
      xs: "425px",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
