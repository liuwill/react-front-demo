var path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Create multiple instances
// const ExtractCSS = new ExtractTextPlugin('styles.css')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const autoprefixer = require('autoprefixer')
const precss = require('precss')

const globalEnv = require('./config')

// 错误输出
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  // context: path.resolve(__dirname, 'example'),
  entry: {
    app: './src/index.jsx',
  },
  output: {
    filename: 'dist/[name].js',
    chunkFilename: 'dist/[id].[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: false,
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('tests')]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)},
      '_GLOBAL_CONFIG': JSON.stringify(globalEnv)
    }),
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     postcss() {
    //       return [precss, autoprefixer]
    //     },
    //   },
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
    }),
    new FriendlyErrorsPlugin(),
  ],
  devServer: {
    port: 3004,
    host: '0.0.0.0',
    historyApiFallback: true,
    noInfo: false,
    https: false,
    disableHostCheck: true,
    proxy: {
      changeOrigin: true,
    },
    // stats: 'minimal'
  },
}
