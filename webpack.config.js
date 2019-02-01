const path = require('path');
const webpack = require('webpack');
const slsw = require('serverless-webpack');
const externals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: slsw.lib.entries,
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
  },
  externals: [externals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  stats: 'minimal',
  devtool: 'source-map',
  plugins: [
    new webpack.IgnorePlugin(/^.*\/aws-sdk$/),
  ],
};
