const {heroui} = require('@heroui/theme');
const { nextui } = require('@nextui-org/theme');
// import {nextui} from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [

      "night",
    ],
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(button|form|input|input-otp|ripple|spinner).js"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [nextui(),require('daisyui'),heroui()],
  
};
