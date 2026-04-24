/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#06b6d4",
        darkbg: "#020617",
        card: "rgba(255,255,255,.05)"
      },
      boxShadow: {
        glow: "0 0 20px rgba(6,182,212,.25)"
      }
    },
  },
  plugins: [],
}