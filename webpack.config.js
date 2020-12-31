const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const publicPath = process.env.NODE_ENV === 'production' ? '/2020/dist/' : '/dist/';
const assetPath = process.env.NODE_ENV === 'production' ? '/2020/' : '/';

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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(assetPath),
    }),
  ],
};

module.exports = [
  merge({
    entry: path.join(process.cwd(), 'src', 'index.js'),
    output: {
      filename: '[name].js',
      path: path.join(process.cwd(), 'www/dist'),
      publicPath,
    },
  }, sharedConfig),
  merge({
    entry: path.join(process.cwd(), 'src', 'ssr.js'),
    target: 'node',
    output: {
      filename: 'ssr-compiled.js',
      path: path.join(process.cwd(), 'www/dist'),
      publicPath,
      libraryTarget: 'commonjs2',
    },
  }, sharedConfig),
];
