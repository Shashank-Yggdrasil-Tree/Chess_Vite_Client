/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // "hero-pattern": "url('/svg_background/spring.svg')",
        "hero-pattern": "url('/svg_background/spring_black.svg')",
        // "hero-pattern": "url('/svg_background/clouds.svg')",
      },
      fontFamily: {
        barlow: ["Barlow SemiBold", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
  important: true,
};
