const colors = require("tailwindcss/colors");
const { fontFamily, screens } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      gray: colors.neutral,
      cyan: colors.cyan,
      green: colors.green,
      transparent: colors.transparent,
      fucshia: colors.fuchsia,
      white: colors.white,
      black: colors.black,
      red: colors.red,
      yellow: colors.yellow,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.purple,
    },
    screens: {
      xs: "480px",
      ...screens,
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
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
};
