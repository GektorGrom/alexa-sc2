const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // entry: set by the plugin
  // output: set by the plugin
  target: 'node',
  externals: [
    /aws-sdk/, // Available on AWS Lambda
    // /alexa-sdk/, // Available on AWS Lambda
  ],
  plugins: [
    new Dotenv(),
    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 7,
      },
      extractComments: false,
    }),
  ],
  // resolve: {
  //   alias: {
  //     Libs: path.resolve(__dirname, 'libs'),
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
