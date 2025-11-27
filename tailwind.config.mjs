/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0f766e',
          secondary: '#0369a1'
        }
      },
      // Custom animations, shadows, and fonts to enhance the modern look and feel.
      animation: {
        // Fades elements in with a gentle upward motion.
        'fade-in': 'fadeIn 0.4s ease forwards',
        // Slight pop for new chat bubbles.
        'bubble-pop': 'bubblePop 0.25s ease-out forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        bubblePop: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0,0,0,0.2), 0 2px 4px -2px rgba(0,0,0,0.1)'
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};