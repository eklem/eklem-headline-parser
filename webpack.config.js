const path = require('path')
const package = require('./package.json')
const glob = require('glob')  


  // Generating browser version of stopword

  module.exports =  {
    mode: 'production',
    entry: './headline-parser.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'headline-parser.' + package.version+ '.js',
      library: 'headline_parser'
    },
    devtool: "none", // prevent webpack from using eval() on my module
  }

  // Generating test script for the browser
  
module.exports = {
    mode: 'production',
    entry: glob.sync('./test/test.js'),
    output: {
      path: path.resolve(__dirname, './test/sandbox'),
      filename: 'bundle.js'
    },
    node: {
      fs: 'empty'
    }
}