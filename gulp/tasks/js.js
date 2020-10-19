const { src, dest } = require('gulp')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const webpackConfig = require('../../webpack.config.js')
const rename = require('gulp-rename')
const gulpif = require('gulp-if')

const config = require('../config')

// webpack
function js(bs) {
  return src(config.src.js)
    // @ts-ignore
    .pipe(webpackStream(webpackConfig(config.env)), webpack)
    .pipe(gulpif(config.production, rename('app.' + config.hash + '.js')))
    // @ts-ignore
    .pipe(dest(config.build.js))
    .pipe(gulpif(!config.production, bs.stream()))
}

module.exports = js
