const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'; // 是否生产环境

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  mode: isProd ? 'production' : 'development',

  entry: {
    app: './src/main.ts'
  },

  output: {
    path: resolve('dist'),
    filename: '[name].[contenthash:8].js'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: [resolve('src')]
      }
    ]
  },

  // https://webpack.docschina.org/configuration/plugins/
  plugins: [
    new CleanWebpackPlugin({}),

    new HtmlWebpackPlugin({ template: './public/index.html' })
  ],

  // https://webpack.docschina.org/configuration/resolve
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  // https://webpack.docschina.org/configuration/devtool
  // devtool: isProd ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',

  // https://webpack.docschina.org/configuration/dev-server
  devServer: {
    host: 'localhost', // 主机名
    stats: 'errors-only', // 打包日志输出输出错误信息
    port: 8081,
    open: true
  }
}
