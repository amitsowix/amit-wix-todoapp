const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    liveReload: true,
    watchContentBase: true,
    contentBase: path.join(__dirname, 'src'),
    proxy: { 
      '/api': 'http://localhost:3000'
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
  ],
  devtool: "source-map",
};