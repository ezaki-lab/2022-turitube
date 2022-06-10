module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Blinker', 'Noto Sans JP', 'Meiryo', 'sans-serif']
      },
      colors: {
        'basic': '#40A4CE',
        'background': '#ffffff',
      }
    }
  },
  plugins: [require("daisyui")]
};