/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', 'sans-serif'],
        ui: ['var(--font-inter)', 'sans-serif']
      },
      letterSpacing: {
        tighter: '-0.045em',
        ultra: '-0.075em'
      },
      boxShadow: {
        glass: '0 20px 80px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)',
        soft: '0 12px 48px rgba(255,255,255,0.06)'
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: []
};
