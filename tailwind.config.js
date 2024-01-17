/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Quicksand'],
    },
    extend: {
      colors: {
        primary: '#191919',
        secondary: '#E3651D',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
