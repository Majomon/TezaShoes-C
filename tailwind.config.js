const { nextui } = require("@nextui-org/react");
const { transform } = require("next/dist/build/swc");

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
          "from": { opacity: "0" },
          "to": { opacity: "1" },
        },
        fadeOutLogin: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        appearScale: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        modalImageScaleIn: {
          "0%": { transform: "scale(0)"},
          "100%": { transform: "scale(1)"}
        },
        modalImageScaleOut: {
          "0%": { transform: "scale(1)"},
          "100%": { transform: "scale(0)"}
        },
        imageOpacityIn: {
          "0%": {opacity: "0"},
          "50%": {opacity: "50"},
          "100%": {opacity: "100"}
        },
        imageOpacityOut: {
          "0%": {opacity: "1000"},
          "50%": {opacity: "50"},
          "100%": {opacity: "0"}
        },
        sidebarUp: {
          "0%":{transform: "translateY(-100%)"},
          "100%":{transform: "translateY(0%)"},
        }
        },
      animation: {
        fadeInLogin: "fadeInLogin 1s ease-in-out ",
        fadeOutLogin: "fadeOutLogin 1s ease-in-out",
        appearScale: "appearScale 0.5s ease",
        modalImageScaleIn: "modalImageScaleIn 0.4s ease",
        imageOpacityIn: "imageOpacityIn 2s ease",
        sidebarUp: "sidebarUp 0.5s ease"
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
        colorGoldSecundary:{
          500:"#EAA724",
          250:"#F0D39B"
        },
        colorViolet:{
          100:"#D5CDFF",
          300:"#7B61FF"
        },
        colorBlue:{
          100:"#ACDEFF",
          300:"#0099FF"
        }
        
      },
      boxShadow: {
        "3xl": "5px 4px 10px 0 rgba(0, 0, 0, 0.25)",
        "shadowCardProd": "2px 2px 6px 0px rgba(0, 0, 0, 0.36)",
        "ItemShadowCard": "0px 2px 4px rgba(0, 0, 0, 0.30)",
        "ItemShadowCardHover": "0px 2px 4px rgba(0, 0, 0, 0.30)",
        "buttonSizeShadow": "0px 0px 2px 0px rgba(0, 0, 0, 0.40)",
        "cardPerfilShadow":" 3px 1px 10px 0px rgba(0, 0, 0, 0.20)",
        "inputPerfilShadow": "0px 1px 8px 0px rgba(0, 0, 0, 0.50)",
        "cardPurchaseShadow": "0px 1px 8px 0px rgba(0, 0, 0, 0.25)"
      },
      gridTemplateColumns: {
        "13Cards": "repeat(auto-fill,minmax(300px,1fr))",
        "14Variants": "repeat(auto-fill,minmax(1fr,1fr))" 
      },
      backgroundImage:{
        "backgorundInformationIcons": "url('/client/assets/image/backgroundInformationIcons.png')"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
