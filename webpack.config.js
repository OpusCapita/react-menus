const path = require('path');
const pkg = require('./package.json');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname),
    filename: pkg.module
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader', exclude: /node_modules/ }
    ]
  }
}
