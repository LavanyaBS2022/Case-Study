/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        red: {
          400: '#f87171', 
        },
        teal: {
          500: '#14b8a6',
          600: '#0d9488',
        },
        orange: {
          200: '#fed7aa',
          400: '#fb923c',
          500: '#f97316',
        },
        dentalGreen: '#CCE5E4',
      },
      animation: {
        'bounce': 'bounce 2s infinite',
        'pulse': 'pulse 2s infinite',
        'bounce-gentle': 'bounce-gentle 3s infinite',
      },
    },
  },
  plugins: [],
}

