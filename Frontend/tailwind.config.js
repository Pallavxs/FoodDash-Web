/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E52B23', // FoodDash Red (#E52B23)
          dark: '#C8102E',
          light: '#FF4D5A',
          soft: 'rgba(229, 43, 35, 0.08)',
          glow: 'rgba(229, 43, 35, 0.25)',
        },
        fooddash: {
          cream: '#FBF9F5', // warm cream background
          subtle: '#F5F2EB',
          card: '#FFFFFF',
          input: '#FFFFFF',
          charcoal: '#191614', // dark charcoal text
          body: '#504944',
          muted: '#8C827A',
          light: '#B3ABA2',
          border: '#E6E2DA', // soft warm gray border
          'border-light': '#F3EFEA',
        },
      },
      fontFamily: {
        heading: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        body: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        outer: '28px',
        inner: '18px',
        input: '14px',
      },
      boxShadow: {
        ambient: '0 20px 60px -15px rgba(50, 30, 20, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.03)',
        card: '0 24px 64px -12px rgba(40, 20, 10, 0.12), 0 4px 16px -2px rgba(40, 20, 10, 0.04)',
        button: '0 10px 24px -6px rgba(229, 43, 35, 0.42)',
        'button-hover': '0 14px 28px -6px rgba(229, 43, 35, 0.55)',
      },
    },
  },
  plugins: [],
};
