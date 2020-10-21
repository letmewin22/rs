const fs = require('fs')
const foldersName = require('../../foldersName')

function css(name, cb) {
  const path = `${foldersName.sourceFolder}/scss/pages/${name}.scss`

  const scssPages = `${foldersName.sourceFolder}/scss/pages/all.scss`
  const scssContent = fs.readFileSync(scssPages, 'utf8')

  fs.writeFile(scssPages, `${scssContent}\r\n@import '${name}';`, cb)
  fs.appendFile(path, '', cb)
  
  return path
}

module.exports = css
