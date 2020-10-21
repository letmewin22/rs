const fs = require('fs')
const foldersName = require('../../foldersName')


function html(name, capName, cb) {

  const path = `${foldersName.sourceFolder}/templates/${name}.html`

  const template = `{% set title = "${name}" %}
{% set route = "${name}" %}
{% extends "layouts/_layout.html" %}\r\n\r\n
{% block content %}\r\n
  <h1>${capName}</h1>\r\n
{% endblock %}`

  fs.appendFile(path, template, cb)

  return path
}

module.exports = html
