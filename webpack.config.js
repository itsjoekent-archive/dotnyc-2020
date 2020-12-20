const path = require('path');
const { merge } = require('webpack-merge');

const sharedConfig = {
  module: {
    rules: [
      {
        test: /\.md$/i,
        use: 'raw-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: 'file-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

module.exports = [
  merge({
    entry: path.join(process.cwd(), 'src', 'index.js'),
    output: {
      filename: '[name].js',
      path: path.join(process.cwd(), 'www/dist'),
      publicPath: '/dist/',
    },
  }, sharedConfig),
  merge({
    entry: path.join(process.cwd(), 'src', 'ssr.js'),
    target: 'node',
    output: {
      filename: 'ssr-compiled.js',
      path: path.join(process.cwd(), 'www/dist'),
      publicPath: '/dist/',
      libraryTarget: 'commonjs2',
    },
  }, sharedConfig),
];
