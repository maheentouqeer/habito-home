/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aqua: {
          50: '#e6fafa',
          100: '#ccf5f5',
          200: '#99ebeb',
          300: '#66e0e0',
          400: '#32e0e0',
          500: '#0fd4d4',
          600: '#0fb8b8',
          700: '#0f9ea6',
          800: '#0d7a80',
          900: '#0a5c60',
        },
        teal: {
          50: '#e6f7f7',
          100: '#ccefef',
          200: '#99dfdf',
          300: '#66cfcf',
          400: '#33bfbf',
          500: '#00afaf',
          600: '#008c8c',
          700: '#006969',
          800: '#004646',
          900: '#002323',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(15, 212, 212, 0.3)',
        'glow-lg': '0 0 40px rgba(15, 212, 212, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(15, 212, 212, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(15, 212, 212, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'aqua-gradient': 'linear-gradient(135deg, #32e0e0 0%, #0f9ea6 100%)',
        'aqua-gradient-soft': 'linear-gradient(135deg, #e6fafa 0%, #ccf5f5 100%)',
        'teal-gradient': 'linear-gradient(135deg, #00afaf 0%, #006969 100%)',
      },
    },
  },
  plugins: [],
}
