const path = require('path')
const package = require('./package.json')
const glob = require('glob')  

module.exports =  [
  // Generating browser version of stopword
  {
    mode: 'production',
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'headline-parser.' + package.version+ '.js',
      library: 'ehp'
    },
    devtool: "none", // prevent webpack from using eval() on my module
  },

  // Generating test script for the browser
  {
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
]