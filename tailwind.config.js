/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", ],
  theme: {
    extend: {
      fontFamily: {
        'ubuntu': [ 'ubuntu', 'sans-serif' ],
        'Playwrite AR': ['Playwrite AR', 'cursive'],
      }
    },
  },
  plugins: [],
}

