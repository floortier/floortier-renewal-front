/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'pastel-red': '#D16D6D',
        'pastel-yellow': '#D6B86D',
        'pastel-green': '#6DD6A0',
        'pastel-blue': '#6D83D6',
      },
    },
  },
  plugins: [],
}
