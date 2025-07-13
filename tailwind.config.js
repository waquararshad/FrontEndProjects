/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3D5A80',
        accent: '#EA8346',
        'primary-light': '#98C1D9',
        'primary-dark': '#293241',
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #3D5A80 0%, #98C1D9 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, #3D5A80 0%, #98C1D9 100%)',
      },
    },
  },
  plugins: [],
};