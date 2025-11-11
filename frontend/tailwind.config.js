/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        // --- EXISTING ANIMATIONS ---
        'blob-1': 'blob 6s infinite alternate',
        'blob-2': 'blob 8s infinite alternate',
        'blob-3': 'blob 10s infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 4s infinite',
        'border-glow': 'borderGlow 2s ease-in-out infinite alternate',
        
        // --- NEW CHAT BACKGROUND ANIMATIONS ---
        'subtle-shift': 'subtleShift 24s linear infinite',
        // floatMoveA, floatMoveB, and softPulse are generally applied
        // directly in the React style prop for custom durations/delays, 
        // but we define them here to make the keyframes available.
      },
      keyframes: {
        // --- EXISTING KEYFRAMES ---
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            // Note: In Tailwind keyframes, use standard CSS property names (snake-case)
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(59, 130, 246, 0.5)' },
          '50%': { borderColor: 'rgba(59, 130, 246, 1)' },
        },

        // --- NEW CHAT BACKGROUND KEYFRAMES ---
        subtleShift: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(-10px,10px,0) scale(1.02)' },
          '100%': { transform: 'translate3d(0,0,0) scale(1)' },
        },
        floatMoveA: {
          '0%': { transform: 'translateY(0) translateX(0) scale(0.98)', opacity: '0' },
          '10%': { opacity: '0.15' },
          '50%': { transform: 'translateY(-30px) translateX(10px) scale(1.05)', opacity: '0.2' },
          '90%': { opacity: '0.15' },
          '100%': { transform: 'translateY(0) translateX(0) scale(0.98)', opacity: '0' },
        },
        floatMoveB: {
          '0%': { transform: 'translateY(0) translateX(0) scale(1)', opacity: '0' },
          '10%': { opacity: '0.14' },
          '50%': { transform: 'translateY(-20px) translateX(-8px) scale(1.03)', opacity: '0.18' },
          '90%': { opacity: '0.14' },
          '100%': { transform: 'translateY(0) translateX(0) scale(1)', opacity: '0' },
        },
        softPulse: {
          '0%': { transform: 'scale(0.98)' },
          '50%': { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(0.98)' },
        },
      },
      // --- EXISTING UTILITIES ---
      maxWidth: {
        '8xl': '88rem', // A large custom width
      },
      dropShadow: {
        lg: '0 10px 8px rgba(0, 0, 0, 0.3)',
      },
      boxShadow: {
        'text-glow': '0 0 10px rgba(59, 130, 246, 0.8)',
        'text-soft': '2px 2px 5px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};