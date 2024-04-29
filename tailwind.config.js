const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "index.html"],
  theme: {
    colors: {
      primary: colors.stone,
      secondary: colors.blue,
      error: colors.red,
      success: colors.green,
      transparent: colors.transparent,
    },
    extend: {
      fontFamily: {
        sans: ["Varela", "sans-serif"],
      },
    },
  },
  plugins: [],
};
