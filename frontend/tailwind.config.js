/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // apne project structure ke hisaab se
  ],
  theme: {
    extend: {
      boxShadow: {
        'text-glow': '0 0 10px rgba(59, 130, 246, 0.8)',   // Blue glow shadow
        'text-soft': '2px 2px 5px rgba(0, 0, 0, 0.4)',     // Soft black shadow
      },
    },
  },
  plugins: [],
}
