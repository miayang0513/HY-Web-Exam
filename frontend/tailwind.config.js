/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      zIndex: {
        'nav-bar': 50,
        'progress-bar': 40,
        'cover-carousel': 30,
        marquee: 10,
        'video-player': 0,
      },
    },
  },
  plugins: [],
}
