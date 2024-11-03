/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        emsBlue: "#3F51B5",
        emsPurple: "#7D2CE0",
        emsRed: "#F44336",
      },
    },
  },
  plugins: [],
};
