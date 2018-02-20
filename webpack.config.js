const path = require('path');

const config = {
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js[x]$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: { presets: ['es2015', 'react']},
      }
    ]
  }
}

module.exports = config;