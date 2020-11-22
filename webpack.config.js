require('dotenv').config()

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: __dirname + '/index.js',
  output: {
    filename: 'wesender.dist.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      ...process.env
    })
  ]
}