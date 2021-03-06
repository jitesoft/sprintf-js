const Path = require('path');

module.exports = {
  mode: 'production',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      }
    ]
  },
  entry: {
    index: [
      Path.join(__dirname, 'src', 'index.js')
    ]
  },
  output: {
    filename: 'index.js',
    library: '@jitesoft/sprintf',
    libraryTarget: 'umd',
    globalObject: 'this'
  }
};
