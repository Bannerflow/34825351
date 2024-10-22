/** @type {import('tailwindcss').Config} */

const {
  iconsPlugin,
  getIconCollections,
} = require('@egoist/tailwindcss-icons');

module.exports = {
  darkMode: 'media', // uses media query for dark mode. required to use the system dark mode
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['mdi', 'lucide']),
    }),
  ],
};
