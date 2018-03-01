const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtracPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

config = {
  target: "web",
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jepg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
}

if (isDev) {
  config.module.rules.push(
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }
  )
  config.module.rules.push(
    {
      test: /\.styl$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          }
        },
        'stylus-loader'
      ]
    })
  config.devtool = '#cheap-module-eval-source-map'//这个配置 用来让浏览器可以调试源码
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true//将错误显示在网页上
    },
    hot: true //配置后 页面只是重新渲染改动过的地方
    // historyFallback: {},
    // open: true //webpack启动自动打开浏览器
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),//配合hot 
    new webpack.NoEmitOnErrorsPlugin()//配合hot 使用
  )
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.css$/,
      use: ExtracPlugin.extract({
        fallback: 'style-loader',
        use: [        
          'css-loader'
        ]
      })
    },
  )
  config.module.rules.push(
    {
      test: /\.styl$/,
      use: ExtracPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'stylus-loader'
        ]
      })
    },
  )
  config.plugins.push(
    new ExtracPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}

module.exports = config