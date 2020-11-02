const fs = require('fs')

function addScriptsToHtml(entrypoints, dir) {

  const outputJs = entrypoints.app.js.map((el) => {
    return `\n    <script src="./js/${el}"></script>`
  })

  const rg = /<!-- BEGIN scripts -->((\s.{1,}.).\s.*){1,}<!-- END scripts -->/gm

  const output = `<!-- BEGIN scripts -->${outputJs.join(' ')}
    <!-- END scripts -->`

  return fs.readdir(dir, function(_, items) {
    if (items) {
      items.forEach((item) => {
        if (item.replace(item.slice(0, -5), '') === '.html') {
          const HTMLpath = `${dir}/${item}`
          const html = fs.readFileSync(HTMLpath, 'utf8')
          if (!html.match(/script src="\.\/js\//gm)) {
            fs.writeFile(HTMLpath, html.replace(rg, output), () => {})
          }
        }
      })
    }
  })
}

module.exports = addScriptsToHtml
