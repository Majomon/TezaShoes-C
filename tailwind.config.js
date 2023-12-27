const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      transitionDuration: {
        1000: "1000ms",
        2000: "2000ms",
        3000: "3000ms",
        6000: "6000ms",
        12000: "6000ms",
      },
      keyframes: {
        fadeInLogin: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOutLogin: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        fadeInLogin: "fadeInLogin 1s ease-in-out",
        fadeOutLogin: "fadeOutLogin 1s ease-in-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        colorGold: {
          800: "#AE9667",
        },
        colorBlack: {
          400: "#0B090A",
        },
        colorWhite: {
          100: "#ffffff",
        },
        colorGray: {
          100: "#CECECE",
        },
      },
      boxShadow: {
        "3xl": "5px 4px 10px 0 rgba(0, 0, 0, 0.25);",
      },
      gridTemplateColumns: {
        "13Cards": "repeat(auto-fill,minmax(300px,1fr))",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
