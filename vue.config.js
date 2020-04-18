//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
'use strict';
const path = require('path');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  filenameHashing: false,
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        vue$: 'vue/dist/vue.esm.js'
      }
    },

    plugins: [
      new webpack.ProvidePlugin({})
    ]
  },
  css: {
    loaderOptions: {
      stylus: {
        extract: true
      }
    }
  },
  devServer: {
    hot: true,
    host: 'localhost',
    port: 4400,
    https: true,
    open: true,
    proxy: {
      '/v0': {
        target: 'https://hacker-news.firebaseio.com',
        changeOrigin: true
      },
      '/api/v1': {
        target: 'https://hn.algolia.com',
        changeOrigin: true
      }
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Hacker News'
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  }
};
