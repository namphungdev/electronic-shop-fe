/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        screens: {
          "2xl": 1440,
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
  corePlugins: {
    preflight: false,
  },
};
