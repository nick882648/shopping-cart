/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#fff1ee',
          100: '#ffe2da',
          200: '#ffc5b6',
          300: '#ffa18c',
          400: '#ff7c62',
          500: '#ff5a3c',
          600: '#f0432a',
          700: '#c93420',
          800: '#a02a1a',
          900: '#7d2317',
        },
      },
    },
  },
  plugins: [],
} 