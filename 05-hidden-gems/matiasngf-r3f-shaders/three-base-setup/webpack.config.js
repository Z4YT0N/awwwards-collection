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
      // {
      //   test: /\.(jpe?g|png|gif|svg|tga|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg|json)$/i,
      //   use: 'file-loader',
      //   exclude: path.resolve(__dirname, './node_modules/')
      // },
      {
        test: /\.(glf|gltf|jpe?g|png|gif|svg|tga|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg|json)$/,
        use:
        [
          {
            loader: 'file-loader',
            options:
            {
                outputPath: 'assets/models/'
            }
        }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({'title': 'three simple project'})
  ],
  devServer: {
    static: {
        directory: path.join(__dirname, '/public'),
    },
    hot: true,
  },
}