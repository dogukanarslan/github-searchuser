/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Quicksand'],
    },
    extend: {
      colors: {
        primary: colors.gray[700],
        'primary-light': colors.gray[600],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
