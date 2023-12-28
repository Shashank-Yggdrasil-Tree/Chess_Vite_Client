/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // "hero-pattern": "url('/svg_background/liquid-cheese.svg')",
        // "hero-pattern": "url('/svg_background/parabolic-ellipse.svg')",
        // "hero-pattern": "url('/svg_background/parabolic-rectangle.svg')",
        // "hero-pattern": "url('/svg_background/parabolic-pentagon.svg')",
        // "hero-pattern": "url('/svg_background/spring.svg')",
        "hero-pattern": "url('/svg_background/spring_black.svg')",
        // "hero-pattern": "url('/svg_background/clouds.svg')",
      },
    },
  },
  plugins: [],
  important: true,
};
