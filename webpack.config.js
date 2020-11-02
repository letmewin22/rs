const webpack = require('webpack')
const path = require('path')
const gulpConfig = require('./gulp/config')
const EntrypointsPlugin = require('emotion-webpack-entrypoints-plugin')
// const BundleAnalyzerPlugin =
// require('webpack-bundle-analyzer').BundleAnalyzerPlugin


function createConfig(env) {
  const isProduction = env === 'production'

  const devName = '[name].js'
  const buildName = `[name].${gulpConfig.hash}.js`

  const filename = env === 'production' ? buildName : devName

  if (env === undefined) {
    env = process.env.NODE_ENV
  }

  const webpackConfig = {
    entry: {
      app: path.resolve(__dirname, 'src/js/app.js')
    }, // If you need support IE11
    output: {
      filename,
      path: path.resolve(__dirname, 'build/js/'),
      publicPath: './js/'
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src/js')
      }
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: '/node_modules/',
          loader: 'eslint-loader',
          options: {
            fix: true,
            cache: true,
            ignorePattern: __dirname + '/src/js/lib/',
            formatter: require.resolve('eslint-formatter-pretty')
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: '/node_modules/',
          options: {
            cacheDirectory: true
          }
        },
        {
          test: /\.glsl$/,
          exclude: '/node_modules/',
          loader: 'webpack-glsl-loader'
        }
      ]
    },
    mode: isProduction ? 'development' : 'production',
    devtool: !isProduction ?
      'eval-cheap-module-source-map' :
      false,
    optimization: {
      minimize: isProduction,
      splitChunks: {
        // include all types of chunks
        chunks: 'all',
        minSize: 1,
        // cacheGroups: {
        //   vendor: {
        //     test: /[\\/]node_modules[\\/](three)[\\/]/,
        //     name: 'three.vendor',
        //     chunks: 'all',
        //     minSize: 1
        //   }
        // }
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new EntrypointsPlugin({
        dir: path.resolve(__dirname, 'build/')
      })
    ]
  }

  // if (isProduction) {
  //   // webpackConfig.plugins.push(

  //   //   new BundleAnalyzerPlugin({
  //   //     analyzerMode: 'server',
  //   //     analyzerPort: 5500,
  //   //     openAnalyzer: false
  //   //   })
  //   // )
  // }

  return webpackConfig
}

module.exports = createConfig
