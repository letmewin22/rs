export default class Resize {

  constructor(cb) {

    this.cb = cb ?? function() {}
  }

  init() {

    this.cb()

    this.resizeHandler = this.resizeHandler.bind(this)

    window.addEventListener('resize', this.resizeHandler)
  }

  resizeHandler() {
    this.cb()
  }

  destroy() {
    window.removeEventListener('resize', this.resizeHandler)
    this.cb = function() {}
  }
}
