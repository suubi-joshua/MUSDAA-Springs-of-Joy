/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.js",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'brand-green': '#005F3A',
        'brand-green-dark': '#003D24',
        'brand-green-light': '#007F52',
      },
    },
  },
  plugins: [],
}
