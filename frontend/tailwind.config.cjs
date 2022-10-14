const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{astro,html,tsx}'],
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        transparent: '#00000000',
        primary: {
          100: '#9aa4b9',
          200: '#5d6d8e',
          500: '#354972',
          600: '#25334f',
          700: '#1e293f',
        },
        secondary: {
          100: '#fdebe8',
          200: '#fbcdc5',
          500: '#f9b9ae',
          600: '#f79b8b',
          700: '#de8c7d',
        },
        success: {
          100: '#f0faf2',
          200: '#d1f1d9',
          500: '#a3e2b3',
          600: '#85d999',
          700: '#66cf80',
        },
        danger: {
          100: '#f9ccdf',
          200: '#f399c0',
          500: '#ec66a0',
          600: '#e63381',
          700: '#e00061',
        },
        neutral: {
          0: '#ffffff',
          100: '#f6f6f9',
        },
      },
      fontSize: {
        '2xs': '0.8125rem',
        xs: '0.9375rem',
        sm: '1.0625rem',
        base: '1.25rem',
        lg: '1.5rem',
        xl: '2.0625rem',
        '2xl': '2.5rem',
        '3xl': '3.125rem',
        '4xl': '3.75rem',
      },
      fontFamily: {
        poppins: 'Poppins',
      },
    },
  },
};
