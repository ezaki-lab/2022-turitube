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
    screens: {
      "sm": { "min": "640px" },
      "md": { "min": "768px" },
      "lg": { "min": "1024px" },
      "xl": { "min": "1280px" },
      "2xl": { "min": "1536px" },
      "sm-max": { "max": "639px" },
      "md-max": { "max": "767px" },
      "lg-max": { "max": "1023px" },
      "xl-max": { "max": "1279px" },
      "2xl-max": { "max": "1535px" },
      "h-xs": { "raw": '(min-height: 500px)' },
      "h-xs-max": { "raw": '(max-height: 499px)' },
    },
    extend: {
      fontSize: {
        "xxs": '.7rem'
      },

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
        'basic-dark': '#056089',
        'sub': '#13DB39',
        'sub-dark': '#25A775',
        'background': '#F8F8F8',
        'bgray': '#F0F1F3',
        'tcolor': '#333333',
        'gray-dark': '#333333',
        'gray': '#999999',
        'lv1': '#2ADADE',
        'lv2': '#14F414',
        'lv3': '#E0D728',
        'lv4': '#FF8A09',
        'lv5': '#F62212',

      },
      zIndex: {
        '100': '100',
        '200': '200',
        '10000': '10000', // これ右上で出てくるモーダルの内包領域なのでこれ以上上げてはいけない 
        '99999': '99999' // これ説明モーダルなのでこれより上に上げてはいけない
      },
      minHeight: {
        '1/2': '50%'
      },

      keyframes: {
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
        },
        push: {
          "100%": {
            transform: "scale(0.85)"
          }
        },

        popin: {
          "0%": {
            transform: "scale(0.6)"
          },
          "100%": {
            transform: "scale(1)"
          }
        },
        fadein: {
          "0%": {
            transform: "scale(0.8)",
            opacity: 0,
          },
          "100%": {
            transform: "scale(1)",
            opacity: 1
          }
        }
      },


      animation: {
        popup: "popup 0.6s cubic-bezier(0.22, 1, 0.36, 1) 1 forwards",
        "button-push": "push 0.05s alternate forwards",
        popin: "popin 0.25s alternate forwards",
        fadein: "fadein 0.25s alternate forwards"

      },
    }
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/line-clamp')
  ]
};