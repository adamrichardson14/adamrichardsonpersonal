const colors = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      gray: colors.neutral,
      white: colors.white,
      cyan: colors.cyan,
      yellow: colors.yellow,
      green: colors.green,
      fuchsia: colors.fuchsia,
      transparent: colors.transparent,
    },
    extend: {
      colors: {
        gray: {
          910: "#171717",
          920: "#101010",
          930: "#0C0C0C",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        mono: ["var(--font-robotoMono)", ...fontFamily.mono],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
