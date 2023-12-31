/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./public/*.{html,jsx,js}",
    "./src/*.{jsx,js}",
    "./src/**/*.{jsx,js}",
    "./src/**/**/*.{jsx,js}",
    "./src/**/**/**/*.{jsx,js}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Ruda', 'san-serif'],
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),
  ],
}