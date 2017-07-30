const HtmlWebpackPlugin = require('html-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      path = require('path'),
      webpack = require('webpack');




exports.development = function(){
  return {
    module : {
      rules : [
        {
          test : /\.scss$/,
          use : ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    devtool : 'eval-source-map',
    devServer : {
      contentBase : path.join(__dirname, 'dist'),
      hot : true,
      inline : true,
      stats : 'errors-only',
      compress : true,
      open : true,
      openPage : ''
    },
    plugins : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ]
  }
}


exports.production = function(){
  const env = {},
        entry = {}

  env['process.env.NODE_ENV'] = JSON.stringify('production')
  entry['vendor'] = 'react'

  return {
    module : {
      rules : [
        {
          test : /\.scss$/,
          use : ExtractTextPlugin.extract({
            fallback : 'style-loader',
            use : ['css-loader', 'sass-loader'],
            publicPath : 'dist'
          })
        }
      ]
    },
    devtool : 'source-map',
    entry : entry,
    plugins : [
      new HtmlWebpackPlugin({
        title : 'Belajar dengan webpack itu mudah',
        minify : {
          collapseWhitespace : true
        },
        hash : true
      }),
      new ExtractTextPlugin({
        filename : '[name].[chunkhash].css',
        disable: false,
        allChunks : true
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin(env),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['entry', 'manifest']
      })
    ]
  }
}
