/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#FDFDFD ",
        "secondary-color": "#9BC1CD",
        "base-color": "#E6F3F7",
        "highlight-color": "#FF991C",
        "highlight-light-color": "#FFF5ED",
        "text-color": "#000000",
        "text-light-color": "#667085",
      },
    },
  },
  plugins: [],
};
