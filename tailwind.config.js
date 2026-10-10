/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0B1020', slateCard: '#121A2F', slateRaised: '#1A2442',
        violet: '#7C5CFF', cyan: '#22D3EE', amber: '#F59E0B',
        emerald: '#10B981', rose: '#F43F5E', muted: '#8A94B3'
      },
      fontFamily: { sans: ['Inter', 'sans-serif'], display: ['Space Grotesk', 'sans-serif'] },
      borderRadius: { '2xl': '20px', '3xl': '24px' }
    }
  },
  plugins: []
};
