/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ["uf-dark"]: "#111111",
        ["uf-light"]: "#eeecee",
        ["uf-accent"]: "#F35815",
      },
    },
  },
  plugins: [require("daisyui")],
};
