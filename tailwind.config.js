/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Quicksand'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
