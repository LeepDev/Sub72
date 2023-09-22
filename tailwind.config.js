/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/*.{html,jsx,js}",
    "./src/*.{jsx,js}",
    "./src/**/*.{jsx,js}",
    "./src/**/**/*.{jsx,js}",
    "./src/**/**/**/*.{jsx,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'),],
}