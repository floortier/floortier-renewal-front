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
      keyframes: {
        smallBounce: {
          '0%, 100%': { transform: 'translateY(0) scale(1.1)' },
          '50%': { transform: 'translateY(-4px) scale(1.1)' },
        },
      },
      animation: {
        smallBounce: 'smallBounce 0.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
