const path = require('path');
const {GenerateSW} = require('workbox-webpack-plugin');

const Dotenv = require('dotenv-webpack');

const environment = process.env.NODE_ENV || 'development';
const img_publicPath = environment == 'development' ? '/img' : '/~turitube/img'
console.log(environment);
console.log(img_publicPath)

module.exports = {

  mode: 'development',
  entry: path.resolve(__dirname, './src/', "index.tsx"),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env', '@babel/react'] },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: [{ loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/react'] }}]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'img', // 出力先
          publicPath: img_publicPath 
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    historyApiFallback: true,
    open: ['/'],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  target: 'web',

  plugins: environment=="production"
   ? [
    new Dotenv({
      path: path.resolve(__dirname, `.env.${environment}`),
    }),
    new GenerateSW({
      maximumFileSizeToCacheInBytes: 1024 * 1024 * 10,
    })
  ]
  : [
    new Dotenv({
      path: path.resolve(__dirname, `.env.${environment}`),
    }),
  ]

};