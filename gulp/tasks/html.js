const config = require('../config')
const nunjucksRender = require('gulp-nunjucks-render')
const prettify = require('gulp-prettify')
const frontMatter = require('gulp-front-matter')
const {src, dest} = require('gulp')
const webphtml = require('gulp-webp-html')
const gulpif = require('gulp-if')
const inject = require('gulp-inject-string')
const jsFiles = require('../../build/js/entrypoints.json')

function html(bs) {
  const outputJs = jsFiles.app.js.map(el => {
    return `\n<script src="./js/${el}"></script>`
  })
  console.log(outputJs)
  const replaceJS = 'app.' + config.hash + '.js'
  const replaceCss = 'app.' + config.hash + '.css'

  nunjucksRender.nunjucks.configure({
    watch: false,
    trimBlocks: true,
    lstripBlocks: false
  })

  return src([config.src.templates + '/**/[^_]*.html'])
    .pipe(nunjucksRender({
      path: ['src/templates/'] // String or Array
    }))
    .pipe(frontMatter({property: 'data'}))
    .pipe(nunjucksRender({
      PRODUCTION: config.production,
      path: [config.src.templates]
    }))
    .pipe(gulpif(config.production, webphtml()))
    // @ts-ignore
    .pipe(inject.after('<!-- BEGIN scripts -->', outputJs.join(' ')))
    // @ts-ignore
    .pipe(gulpif(config.production, inject.replace('app.css', replaceCss)))
    .pipe(prettify({
      indentSize: 2,
      wrapAttributes: 'auto', // 'force'
      preserveNewlines: false,
      // unformatted: [],
      endWithNewline: true
    }))
    .pipe(dest(config.build.html))
    .pipe(gulpif(!config.production, bs.stream()))
}

module.exports = html
