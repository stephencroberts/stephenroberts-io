
const path = require('path')

const WebpackUglifyJsPlugin = require('webpack-uglify-js-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const extractIndexHTML = new ExtractTextPlugin('index.html')
const extractCSS = new ExtractTextPlugin('[name].css')

module.exports = {
 
  entry: {
    app: './src/entry'
  },
 
  output: {
    filename: 'app.js',
    path: 'dist'
  },

  module: {
    loaders: [
      // Process and interpolate index.html so we can inline css and images
      { test: /\.html$/, loader: extractIndexHTML.extract('html?interpolate') },

      // ES2015 ftw!
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },

      // Separate out critical css to add to the <head>
      { test: /above-the-fold/, loader: "css-loader?minimize!autoprefixer-loader" },

      // Bundle up the rest of the css in a single file
      { test: /\.css$/, exclude: /above-the-fold/, loader: extractCSS.extract("style-loader", "css-loader?minimize!autoprefixer-loader") },

      // Inline small images
      { test: /\.png$/, loader: "url-loader?mimetype=image/png&limit=100000" }
    ]
  },
  plugins: [
    extractIndexHTML,
    extractCSS,
    new WebpackUglifyJsPlugin({
      cacheFolder: path.resolve(__dirname, 'public/cached_uglify/'),
      debug: false,
      minimize: false,
      sourceMap: true,
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      }
    })
  ]
};