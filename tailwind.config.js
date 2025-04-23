/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Rubik', 'sans-serif'],
        arabic: ['Rubik', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0fff0',
          100: '#e0ffe0',
          500: '#40FB30',
          600: '#36e026',
          700: '#2cc61c',
        },
        dark: {
          800: '#1e1e1e',
          900: '#0f0f0f',
        },
        'dark-800': '#121212',
        'dark-900': '#0A0A0A'
      },
      animation: {
        'marquee': 'marquee 90000ms linear both infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      }
    }
  },
  plugins: [],
} 