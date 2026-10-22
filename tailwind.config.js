/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0C0E0A',
          800: '#13160F',
          700: '#1B1F16',
          600: '#262B1F',
        },
        cream: {
          DEFAULT: '#F5EEDF',
          dim: '#CFC6B3',
        },
        sun: {
          DEFAULT: '#F6B91A',
          deep: '#E09B00',
        },
        leaf: {
          DEFAULT: '#1F8A4C',
          deep: '#0F4D2C',
        },
        ember: '#E4572E',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.14em',
      },
      keyframes: {
        spin_slow: {
          to: { transform: 'rotate(360deg)' },
        },
        eq: {
          '0%, 100%': { transform: 'scaleY(0.25)' },
          '50%': { transform: 'scaleY(1)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-3%, 2%)' },
          '40%': { transform: 'translate(2%, -3%)' },
          '60%': { transform: 'translate(-2%, -1%)' },
          '80%': { transform: 'translate(3%, 3%)' },
        },
      },
      animation: {
        'spin-slow': 'spin_slow 18s linear infinite',
        eq: 'eq 1.1s ease-in-out infinite',
        grain: 'grain 0.8s steps(4) infinite',
      },
    },
  },
  plugins: [],
}
