/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#FAFAFA",
        "secondary-color": "#F5382C",
        "base-color": "#222222",
        "highlight-color": "#2F87FC",
        "input-color": "#FCC1BE",
      },
    },
  },
  plugins: [],
};
