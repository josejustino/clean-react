const path = require('path')
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        enforce: "pre",
        use: [
          {
            loader: 'source-map-loader'
          }
        ],
      },
    ]
  },
  ignoreWarnings: [/Failed to parse source map/],
  devtool: 'eval-source-map',
  devServer: {
    port: 3000,
    static: {
      directory: './public'
    },
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true
    }
  },
  plugins: [
    new DefinePlugin({
      "process.env.API_URL": JSON.stringify('http://localhost:5050/api')
    }),
    new HtmlWebpackPlugin({
      template: './template.dev.html'
    })
  ]
})
