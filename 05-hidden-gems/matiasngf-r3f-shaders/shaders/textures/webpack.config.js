const path = require('path');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const buildPath = './dist/';

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    path: path.join(__dirname, buildPath),
    filename: '[name].[hash].js'
  },
  mode: 'development',
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: path.resolve(__dirname, './node_modules/')
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource'
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({'title': 'shaders-textures'})
  ],
  devServer: {
    static: {
        directory: path.join(__dirname, '/public'),
    },
    hot: true,
  },
}