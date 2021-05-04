const path = require('path');

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
  },
  devtool: "source-map",
};