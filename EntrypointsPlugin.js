class EntrypointsPlugin {
  constructor(options) {
    this.options = Object.assign(
      {
        filename: 'entrypoints.json',
        replacer: null,
        space: null,
        filter: null,
      },
      options,
    )
  }
  apply(compiler) {
    compiler.hooks.emit.tap('entrypoints', (compilation) => {
      const data = {}
      const filter = this.options.filter
      const publicPath = compilation.compiler.options.output.publicPath || ''
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
            .map((c) => c.files.map((f) => publicPath + f)),
        )
        const js = files.filter((f) => /.js/.test(f) && !/.js.map/.test(f))
        const css = files.filter((f) => /.css/.test(f) && !/.css.map/.test(f))
        const entrypoint = {}
        if (js.length) entrypoint['js'] = js
        if (css.length) entrypoint['css'] = css
        data[key] = entrypoint
        console.log(entrypoint)
      }
      const json = JSON.stringify(
        data,
        this.options.replacer,
        this.options.space,
      )
      compilation.assets[this.options.filename] = {
        source: () => json,
        size: () => json.length,
      }
    })
  }
}

module.exports = EntrypointsPlugin
