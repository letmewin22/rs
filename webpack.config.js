const webpackReal = require('webpack')
const path = require('path')
// const BundleAnalyzerPlugin =
// require('webpack-bundle-analyzer').BundleAnalyzerPlugin


function createConfig(env) {
  const isProduction = env === 'production'

  if (env === undefined) {
    env = process.env.NODE_ENV
  }

  const webpackConfig = {
    // entry: {
    //   // app: ['@babel/polyfill', './src/js/app.js']
    // }, //If you need support IE11
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'build/js')
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
            ignorePattern: __dirname + '/src/js/lib/'
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
    mode: !isProduction ? 'development' : 'production',
    devtool: !isProduction ?
      'eval-cheap-module-source-map' :
      false,
    optimization: {
      minimize: isProduction,
      // splitChunks: {
      //   // include all types of chunks
      //   chunks: 'all',
      //   minSize: 1,
      //   cacheGroups: {
      //     vendor: {
      //       test: /[\\/]node_modules[\\/](three)[\\/]/,
      //       name: 'three.vendor',
      //       chunks: 'all',
      //       minSize: 1
      //     }
      //   }
      // }
    },
    plugins: [
      new webpackReal.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new webpackReal.LoaderOptionsPlugin({
        options: {
          eslint: {
            formatter: require('eslint-formatter-pretty')
          }
        }
      })
    ]
  }

  if (isProduction) {
    webpackConfig.plugins.push(
      new webpackReal.LoaderOptionsPlugin({
        minimize: true,
      })
    )
    // webpackConfig.plugins.push(

    //   new BundleAnalyzerPlugin({
    //     analyzerMode: 'server',
    //     analyzerPort: 5500,
    //     openAnalyzer: false
    //   })
    // )
  }

  return webpackConfig
}

module.exports = createConfig
