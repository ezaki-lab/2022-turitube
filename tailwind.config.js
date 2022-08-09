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
        'bgray': '#F0F1F3'
      }
    }
  },
  plugins: [require("daisyui")]
};