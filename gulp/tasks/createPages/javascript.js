const fs = require('fs')
const foldersName = require('../../foldersName')

function javascript(name, capName, cb) {
  const path = `${foldersName.sourceFolder}/js/core/renderers/${capName}.js`

  const jsPages = `${foldersName.sourceFolder}/js/core/renderers/index.js`
  const jsContent = fs.readFileSync(jsPages, 'utf8')

  const appjs = `${foldersName.sourceFolder}/js/app.js`
  const appjsContent = fs.readFileSync(appjs, 'utf8')

  const regex = /renderers: {(\s.{1,}){1,}},/gm
  const regex2 = /(import {Home).{1,}/gm
  const regex3 = /\s.{1,}},/gm

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

  const matched = appjsContent.match(regex)[0]
  .replace(regex3, `,
    ${name}: ${capName}
  },`)

  const replaceMatch = appjsContent.replace(regex, matched)

  const appJSOutput = replaceMatch.replace(regex2, toReplaceString)

  fs.writeFile(
    jsPages,
    `${jsContent} \nexport {default as ${capName}} from './${capName}'`,
    cb,
  )
  fs.writeFile(appjs, appJSOutput, cb)

  const template = `import Highway from '@dogstudio/highway'

export default class ${capName} extends Highway.Renderer {
  
  onEnterCompleted() {
    console.log('Hello from ${capName}')
  }
  onLeave() {}
}`

  fs.appendFile(path, template, cb)
  return path
}

module.exports = javascript
