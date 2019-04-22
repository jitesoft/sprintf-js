const getEnv = () => {
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
};

console.log(getEnv());

const Path = require('path');

module.exports = {
  mode: getEnv(),
  optimization: {
    minimize: getEnv() === 'production'
  },
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
    'index': [
      Path.join(__dirname, 'src', 'index.js')
    ]
  },
  output: {
    filename: 'index.js',
    library: 'sprintf',
    libraryTarget: 'umd',
    globalObject: 'this'
  }
};
