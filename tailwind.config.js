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
        // Design System Fonts
        'xl-display': ['Hubot Sans', 'sans-serif'],
        'xl-display-ar': ['Tajawal', 'sans-serif'],
        'hero': ['Mona Sans', 'sans-serif'],
        'hero-ar': ['Noto Sans Arabic', 'sans-serif'],
        'subtitle': ['UI Mono Sans', 'monospace'],
        'subtitle-ar': ['Cairo Play', 'sans-serif'],
        'overlay': ['Clash Display', 'sans-serif'],
        'overlay-ar': ['Changa', 'sans-serif'],
        
        // Legacy font definitions
        sans: ['UI Mono Sans', 'Mona Sans', 'Rubik', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'Rubik', 'sans-serif'],
        'mona': ['Mona Sans', 'sans-serif'],
        'hubot': ['Hubot Sans', 'sans-serif'],
        'inter-tight': ['UI Mono Sans', 'monospace'],
        'playfair-display': ['Playfair Display', 'serif'],
        'clash': ['Clash Display', 'serif'],
      },
      fontSize: {
        'display': 'var(--fs-display)',
        'h1': 'var(--fs-h1)',
        'h2': 'var(--fs-h2)',
        'h3': 'var(--fs-h3)',
        'h4': 'var(--fs-h4)',
        'body-lg': 'var(--fs-body-lg)',
        'body': 'var(--fs-body)',
        'sm': 'var(--fs-sm)',
        'xs': 'var(--fs-xs)',
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