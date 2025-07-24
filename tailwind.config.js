/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "max-xs": { max: "480px" },
      },
      rotate: {
        "x-90": "rotateX(90deg)", // Custom rotateX
      },
    },
  },
  plugins: [],
};
