/*eslint-disable*/
const fs = require('fs')
const config = require('../config')
const foldersName = require('../foldersName')
const yargs = require("yargs");

function cp(cb) {

  const options = yargs
    .usage("Page name: -n <name>")
    .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
    .argv;
   
   const greeting = `Creating, ${options.name} page...`;
   const name = options.name
   const capName = name.charAt(0).toUpperCase() + name.slice(1)
   
  const path = `${foldersName.sourceFolder}/templates/${name}.html`
  //  const path2 = `${foldersName.sourceFolder}/scss/pages/${name}.scss`
  //  const path3 = `${foldersName.sourceFolder}/js/core/renderers/${capName}.js`
  console.log(path)
  const template1 = `
  {% set title = "${name}" %}\r\n
  {% set route = "${name}" %}\r\n
  {% extends "layouts/_layout.html" %}\r\n\r\n
  {% block content %}\r\n\r\n\r\n\r\n
   <h1>${capName}</h1>
  {% endblock %}
  `

  fs.appendFile(path, template1, cb)

  cb()
}

module.exports = cp
