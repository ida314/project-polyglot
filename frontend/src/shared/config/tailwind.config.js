/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      colors: {
        /* tweak to match your design tokens */
        background: { DEFAULT: "#FCFCF9", dark: "#100E12" },
        offset: { DEFAULT: "#F5F5F2", dark: "#1A1A1E" },
        offsetPlus: { DEFAULT: "#F0F0ED", dark: "#202024" },
        super: "#0B71F9",
        textMain: "#111111",
        textOff: "#71717A",
        borderMain: "#E5E5E5",
      },
    },
  },
  darkMode: "class", // same scheme the component expects
  plugins: [],
}