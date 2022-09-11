const fontSize = Object.fromEntries(
  [...Array(100)].map((_, index) => {
    const px = index + 10
    return [`${px}ptr`, `${px / 16}rem`]
  })
)

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize,
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
        'basic': '#3ABFF8',
        'basic-dark': '#079FE3',
        'sub': '#36D399',
        'sub-dark': '#25A775',
        'background': '#F8F8F8',
        'bgray': '#F0F1F3'
      },
      zIndex: {
        '100': '100',
        '200': '200',
      },
      keyframes: {
        appear: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        disappear: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        popup: {
          "0%": {
            transform: "translateY(40px) scale(0.8)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0) scale(1.0)",
            opacity: 1,
          },
          "80%": {
            opacity: 1
          }
        }
      },
      animation: {
        popup: "popup 0.6s cubic-bezier(0.22, 1, 0.36, 1) 1 forwards",
      },
    }
  },
  plugins: [require("daisyui")]
};