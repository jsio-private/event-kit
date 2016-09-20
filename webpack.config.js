'use strict';
const path = require('path');


const config = {
  entry: {
    'event-kit': path.join(__dirname, 'src', 'main')
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: '[name].js'
  },
  module: {
    preLoaders: [
      // {
      //   test: /\.js?$/,
      //   loader: 'eslint-loader',
      //   exclude: /(node_modules|lib)/
      // }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2015'],
          plugins: ['transform-flow-strip-types']
        }
      }
    ]
  }
};


module.exports = [config];
