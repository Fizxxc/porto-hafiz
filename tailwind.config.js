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
        sans: ['var(--font-jost)', 'Jost', 'sans-serif'],
        ui: ['var(--font-overpass-mono)', 'Overpass Mono', 'monospace'],
        mono: ['var(--font-overpass-mono)', 'Overpass Mono', 'monospace']
      },
      letterSpacing: {
        tighter: '-0.045em',
        ultra: '-0.075em'
      },
      boxShadow: {
        glass: 'var(--shadow-soft)',
        soft: 'var(--shadow-card)'
      },
      backgroundImage: {
        grid: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: []
};
