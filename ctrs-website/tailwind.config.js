/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      colors: {
        'ctrs-green': '#1B5E3B',
        'ctrs-emerald': '#2E8B57',
        'ctrs-amber': '#E07B39',
        'ctrs-cream': '#FDF6EC',
        'ctrs-dark': '#2C2C2C',
        'ctrs-teal': '#1A7A6E',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        raleway: ['var(--font-raleway)', 'Raleway', 'sans-serif'],
        opensans: ['var(--font-opensans)', 'Open Sans', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
