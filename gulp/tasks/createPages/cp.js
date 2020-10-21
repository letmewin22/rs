const yargs = require('yargs')
const html = require('./html')
const css = require('./css')
const javascript = require('./javascript')

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
  const path = []

  const htmlPath = html(name, capName, cb)
  const cssPath = css(name, cb)

  path.push(htmlPath, cssPath)

  if (!yargs.argv.nojs) {
    const jsPath = javascript(name, capName, cb)
    path.push(jsPath)
  } 

  console.log(path.join(' '))


  cb()
}

module.exports = cp
