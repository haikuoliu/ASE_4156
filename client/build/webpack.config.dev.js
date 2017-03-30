var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var src = path.resolve(__dirname, '../src')

module.exports = {
  cache: true,
  debug: true,
  // devtool: '#eval-source-map',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    'app': [
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client',
      './src/index.js'
    ],
    'vendor': ['react', 'react-dom', 'immutable', 'moment',
      'react-css-modules', 'react-redux', 'redux', 'react-router',
      'react-router-redux', 'isomorphic-fetch', 'redux-thunk'
    ]
  },
  output: {
    path: path.join(__dirname, './dist/static'),
    filename: '[name].js',
    publicPath: '/static/',
    chunkFilename:'[id].[name].chunk.[chunkhash].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', 'css', 'scss'],
    alias: {
      'SRC': src
    }
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['babel'],
      exclude: /node_modules/
    },
    {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json-loader',
      include: src
    },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/font-woff',
      include: src
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/font-woff',
      include: src
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/octet-stream',
      include: src
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file',
      include: src
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=image/svg+xml',
      include: src
    },
    {
      test: /.*\.(gif|png|jpe?g)$/i,
      loader: "url-loader?mimetype=image/png",
      include: src
    },
    {
      test: /\.css$/,
      // loader: "style-loader!css-loader"
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
  devtool: "source-map",
  plugins: [
    new ExtractTextPlugin('[name].css', {
      disable: false,
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('dev')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      children: true,
      minChunks: 3,
      async: true
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    // new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
};
