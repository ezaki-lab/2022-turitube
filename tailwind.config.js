module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: [
          '"Helvetica Neue"',
          'Arial',
          '"Hiragino Kaku Gothic ProN"',
          '"Hiragino Sans"',
          'Meiryo',
          'sans-serif'
        ]
      },
      colors: {
        'basic': '#40A4CE',
        'background': '#ffffff',
        'bgray': '#F0F1F3'
      },
      zIndex: {
        '100': '100',
      }
    }
  },
  plugins: [require("daisyui")]
};