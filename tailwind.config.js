/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
      },
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
