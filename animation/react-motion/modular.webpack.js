const HtmlWebpackPlugin = require('html-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      FaviconsWebpackPlugin = require('favicons-webpack-plugin'),
      path = require('path'),
      webpack = require('webpack'),
      siteConfig = require('./site.config.js')();



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
      new webpack.NamedModulesPlugin(),
      new FaviconsWebpackPlugin({
        // Your source logo
        logo: siteConfig.iconApps,
        // The prefix for all image files (might be a folder or a name)
        prefix: 'icons-[hash]/',
        // Emit all stats of the generated icons
        emitStats: false,
        // The name of the json containing all favicon information
        statsFilename: 'iconstats-[hash].json',
        // Generate a cache file with control hashes and
        // don't rebuild the favicons until those hashes change
        persistentCache: true,
        // Inject the html into the html-webpack-plugin
        inject: true,
        // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
        background: '#fff',
        // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
        title: 'Webpack App',

        // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false
        }
      })
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
