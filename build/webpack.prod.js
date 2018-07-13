var path = require('path')
const webpack = require('webpack')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const currentTime = (new Date()).toLocaleString()

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
  mode: 'production',
  devtool: '#source-map',
  entry: {
    app: './src/index.jsx',
  },
  output: {
    filename: 'assets/[name].[chunkhash].js',
    chunkFilename: 'assets/[name].[chunkhash].js',
    path: path.resolve(__dirname, '..', 'dist'),
    // publicPath: '/',
  },
  optimization: {
    // runtimeChunk: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
        uglifyOptions: {
          compress: {
            warnings: false
          },
        }
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: path.resolve(__dirname, '../node_modules'),
          name: 'vendor',
          enforce: true,
        },
      },
    },
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
              modules: false
            }
          }
        ],
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
    new webpack.BannerPlugin({
      banner: `Build: liuwill<liuwill@live.com>@${currentTime} [file]`
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)},
      '_GLOBAL_CONFIG': JSON.stringify(globalEnv)
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new FriendlyErrorsPlugin(),
  ],
}
