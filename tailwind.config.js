/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E50914',
          light: '#F6323D',
          dark: '#B70710',
        },
        secondary: {
          DEFAULT: '#0071EB',
          light: '#4696F0',
          dark: '#0054AE',
        },
        accent: {
          DEFAULT: '#F5B50F',
          light: '#F7C64F',
          dark: '#D49C0C',
        },
        success: {
          DEFAULT: '#2ECC71',
          light: '#5DD592',
          dark: '#25A35A',
        },
        warning: {
          DEFAULT: '#FF9F43',
          light: '#FFBC7A',
          dark: '#F27C0C',
        },
        destructive: {
          DEFAULT: '#E03131',
          light: '#E65F5F',
          dark: '#B32020',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
    },
  },
  plugins: [],
};