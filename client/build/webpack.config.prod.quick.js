var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var src = path.resolve(__dirname, '../src')

module.exports = {
  devtool: 'source-map',
  entry: {
    'app': './src/index.js',
    'vendor': ['react', 'react-dom', 'immutable', 'moment',
      'react-css-modules', 'react-redux', 'redux', 'react-router',
      'react-router-redux', 'isomorphic-fetch', 'redux-thunk'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/static/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[name].chunk.[chunkhash].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', 'css', 'scss'],
    alias: {
      'SRC': src
    }
  },
  module: {
    "loaders": [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader',
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=image/svg+xml',
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        loader: "url-loader?mimetype=image/png"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        // loader: 'style!css?sourceMap!autoprefixer-loader',
      },
      {
        test: /\.less$/,
        // loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        loader: "style!css!less"
      },
      {
        test: /\.hcss$/,
        // loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
    ],
    noParse: [/html2canvas.js$/, /proj4.js$/]
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('common.js'),
    new ExtractTextPlugin('[name].[chunkhash].css', {
      disable: false,
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.tmpl'),
        inject: true,
        hash: false,
        // 相对于`config.output.path`的路径
        filename: '../index.html',
        minify: false,
        favicon: false,
    }),
    // new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      children: true,
      minChunks: 2,
      async: true
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'main',
    //   chunks: ['main', 'UserProfile', 'PushPromotion']
    // }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.[chunkhash].js'),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //   }
    // })

  ]
};
