const yargs = require('yargs')
const fs = require('fs')
const foldersName = require('../foldersName')

function cp(cb) {
  const options = yargs.usage('Page name: -n <name>').option('n', {
    alias: 'name',
    describe: 'Page name',
    type: 'string',
    demandOption: true,
  }).argv

  console.log(`Creating, ${options.name} page...`)

  const name = options.name
  // @ts-ignore
  const capName = name.charAt(0).toUpperCase() + name.slice(1)

  const path = `${foldersName.sourceFolder}/templates/${name}.html`
  const path2 = `${foldersName.sourceFolder}/scss/pages/${name}.scss`
  const path3 = `${foldersName.sourceFolder}/js/core/renderers/${capName}.js`

  const scssPages = `${foldersName.sourceFolder}/scss/pages/all.scss`
  const scssContent = fs.readFileSync(scssPages, 'utf8')
  const jsPages = `${foldersName.sourceFolder}/js/core/renderers/index.js`
  const jsContent = fs.readFileSync(jsPages, 'utf8')
  const appjs = `${foldersName.sourceFolder}/js/app.js`

  const appjsContent = fs.readFileSync(appjs, 'utf8')

  const regex = /renderers:\s{+/gm
  const regex2 = /(import {Home).{1,}/gm

  let m
  let toReplaceString

  while ((m = regex2.exec(appjsContent)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex2.lastIndex) {
      regex2.lastIndex++
    }

    // The result can be accessed through the `m`-variable.
    toReplaceString = m[0].replace(/}/gm, `, ${capName}}`)
  }

  const appJSOutput = appjsContent.replace(
    regex,
    `renderers: {
    ${name}: ${capName},`,
  ).replace(regex2, toReplaceString)

  fs.writeFile(scssPages, `${scssContent}\r\n@import '${name}';`, cb)
  fs.writeFile(
    jsPages,
    `${jsContent} export {default as ${capName}} from './${capName}'`,
    cb,
  )
  fs.writeFile(appjs, appJSOutput, cb)


  const template1 = `{% set title = "${name}" %}
{% set route = "${name}" %}
{% extends "layouts/_layout.html" %}\r\n\r\n
{% block content %}\r\n
<h1>${capName}</h1>\r\n
{% endblock %}`

  const template3 = `import Highway from '@dogstudio/highway'

export default class ${capName} extends Highway.Renderer {

  onEnterCompleted() {
    console.log(Hello from ${capName})
  }
  onLeave() {
  }
}`

  fs.appendFile(path, template1, cb)
  fs.appendFile(path2, '', cb)
  fs.appendFile(path3, template3, cb)

  console.log(path, path2, path3)

  cb()
}

module.exports = cp
