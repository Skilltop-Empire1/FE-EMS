/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emsBlue: '#3F51B5',
        emsRed: '#F44336',
      },
    },
  },
  plugins: [],
};
