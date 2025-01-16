/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        dentalGreen: '#CCE5E4', // Custom button color
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

