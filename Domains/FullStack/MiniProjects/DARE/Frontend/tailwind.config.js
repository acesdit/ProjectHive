// tailwind.config.js
import daisyui from "./node_modules/daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "fantasy-primary": "#8A2BE2", // Purple
        "fantasy-secondary": "#00FF00", // Lime
        "fantasy-accent": "#FFD700", // Gold
        "fantasy-neutral": "#D3D3D3", // Light Gray
      },
      keyframes: {
        blink: {
          "0%": { opacity: 1 },
          "50%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        blink: "blink 1s infinite",
        marquee: "marquee 20s linear infinite",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#8A2BE2", // Use actual color value
          "primary-focus": "#00FF00", // Use actual color value
          "primary-content": "#FFD700", // Use actual color value
          secondary: "#00FF00", // Use actual color value
          "secondary-focus": "#8A2BE2", // Use actual color value
          "secondary-content": "#FFD700", // Use actual color value
          accent: "#FFD700", // Use actual color value
          "accent-focus": "#8A2BE2", // Use actual color value
          "accent-content": "#00FF00", // Use actual color value
          neutral: "#D3D3D3", // Use actual color value
          "neutral-focus": "#8A2BE2", // Use actual color value
          "neutral-content": "#FFD700", // Use actual color value

          // Define other theme properties as needed
        },
      },
    ],
  },
};
