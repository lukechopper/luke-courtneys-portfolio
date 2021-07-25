const path = require('path');

module.exports = {
  entry: './script/script.js',
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader'
          ]
        }
      ]
    },
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
  }