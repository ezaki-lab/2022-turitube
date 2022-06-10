const path = require('path');
const Dotenv = require('dotenv-webpack');

const enviroment = process.env.NODE_ENV || 'development';

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
        use: [{loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/react'] }}]
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
        options: {},
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  target: 'web',
  
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, `.env.${enviroment}`),
    }),
]

};