/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}"
  ],
  darkMode: 'class', // best with Angular Material
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',   // blue-600
        secondary: '#64748b', // slate-500
        card: '#ffffff',
        surface: '#f8fafc',
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
      boxShadow: {
        card: '0 4px 20px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
