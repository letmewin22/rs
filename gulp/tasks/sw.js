const config = require('../config')
const {src, dest} = require('gulp')
const gulpif = require('gulp-if')

function sw() {
  return src(config.src.sw).pipe(
    gulpif(config.production, dest(config.build.sw))
  )
}

module.exports = sw
