const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

const config = {
  entry: './index.ts',
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: {
          fallback: 'file-loader',
          limit: Infinity,
        },
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      files: './packages/**/*',
    }),
  ],
};

module.exports = config;
