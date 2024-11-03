/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Add file types as needed
  ],
  theme: {
    extend: {
      colors: {
        emsBlue: "#3F51B5",
        emsPurple: "#7D2CE0",
      },
    },
  },
  plugins: [],
};
