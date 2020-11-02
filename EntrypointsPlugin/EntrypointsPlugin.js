const addScriptsToHtml = require('./addScriptsToHtml')

class EntrypointsPlugin {
  constructor(options) {
    this.options = Object.assign(
      {
        filename: 'entrypoints.json',
        replacer: null,
        space: null,
        filter: null,
        dir: null
      },
      options,
    )
  }
  apply(compiler) {
    compiler.hooks.emit.tap('entrypoints', (compilation) => {
      const data = {}
      const filter = this.options.filter
      for (const [key, value] of compilation.entrypoints.entries()) {
        const chunks = value.chunks.map((data) => {
          const chunk = {
            id: data.id || '',
            name: data.name,
            files: data.files,
          }
          return filter == null || filter(chunk) ? chunk : null
        })
        const files = [].concat(
          ...chunks
            .filter((c) => c != null)
            .map((c) => c.files.map((f) => f)),
        )
        const js = files.filter((f) => /.js/.test(f) && !/.js.map/.test(f))
        const css = files.filter((f) => /.css/.test(f) && !/.css.map/.test(f))
        const entrypoint = {}
        if (js.length) entrypoint['js'] = js
        if (css.length) entrypoint['css'] = css
        data[key] = entrypoint
      }
      // const json = JSON.stringify(
      //   data,
      //   this.options.replacer,
      //   this.options.space,
      // )

      addScriptsToHtml(data, this.options.dir)
    })
  }
}

module.exports = EntrypointsPlugin
