/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        dark: {
          100: '#1e1e2e',
          200: '#181825',
          300: '#11111b',
          400: '#0a0a0f'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
