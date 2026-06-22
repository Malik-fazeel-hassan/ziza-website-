import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-navy': {
          DEFAULT: '#0A1628',
          light: '#1A2A44',
          dark: '#060E1A',
          50: '#E8EDF5',
          100: '#C5D0E3',
          200: '#8FA2C7',
          300: '#5974AB',
          400: '#2E4A7A',
          500: '#1A2A44',
          600: '#0A1628',
          700: '#060E1A',
          800: '#030810',
          900: '#010308',
        },
        'brand-gold': {
          DEFAULT: '#C8A951',
          light: '#E8D48B',
          dark: '#A68B3D',
          50: '#FBF6E8',
          100: '#F5EAC8',
          200: '#E8D48B',
          300: '#DBBD55',
          400: '#C8A951',
          500: '#B5953E',
          600: '#A68B3D',
          700: '#8A7232',
          800: '#6E5A28',
          900: '#52431D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'plane-trail': 'planeTrail 12s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        planeTrail: {
          '0%': { transform: 'translateX(-100%) translateY(50px)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(calc(100vw + 100%)) translateY(-50px)', opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(200, 169, 81, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(200, 169, 81, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(110deg, #C8A951 0%, #E8D48B 45%, #C8A951 55%, #E8D48B 100%)',
        'navy-gradient': 'linear-gradient(135deg, #0A1628 0%, #1A2A44 50%, #0A1628 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
