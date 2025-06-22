/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: '#222222',
        secondary: '#626262',
        'custom-pink': '#fbe9e7'
      },
      fontFamily: {
        sans: ['Marcellus', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
        const newUtilities = {
            '.line-clamp-2': {
                display: '-webkit-box',
                '-webkit-line-clamp': '2',
                '-webkit-box-orient': 'vertical',
                overflow: 'hidden'
            }
        }
        addUtilities(newUtilities)
    }
  ],
}