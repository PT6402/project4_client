/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    function ({ addUtilities }) {
      const newUtil = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(31 29 29) white",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "1rem",
          },
          "&::-webkit-scrollbar-track": {
            background: "white",
            borderRadius: "100vw",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "hsl(0, 0%, 76%)",
            borderRadius: "100vw",
          },
        },
      };
      addUtilities(newUtil, ["responsive", "hover"]);
    },
  ],
});
