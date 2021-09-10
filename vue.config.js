'use strict'

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  pluginOptions: {
    electronBuilder: {
      // outputDir: 'electron-builder-output-dir',
      preload: 'src/preload.js',
    }
  },
  // filenameHashing: true,
  devServer: {
    host: 'localhost',
    port: 3001,
    // open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  css: {
    extract: true,
    loaderOptions: {
      sass: {
        implementation: require('node-sass'), // This line must in sass option
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      },
    },
    devtool: 'source-map'
  },
}
