/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#fff8e1",
          100: "#ffe6a0",
          200: "#ffd65e",
          300: "#ffca39",
          400: "#f4b335",
          500: "#f4b335",
          600: "#e0a329",
          700: "#c58e1f",
          800: "#b27a17",
          900: "#9f6611",
        },
        secondary: {
          50: "#e0f2f4",
          100: "#b3e0e6",
          200: "#80c3c6",
          300: "#4db1b0",
          400: "#2a8283",
          500: "#013c4c",
          600: "#012f3a",
          700: "#01252e",
          800: "#011b24",
          900: "#010f1a",
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
