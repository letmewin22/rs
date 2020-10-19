export default class Hooks {
  constructor(H) {
    this.H = H
    this.noop = function() {}
  }

  useLoad(cb) {
    window.addEventListener('load', () => {
      cb ? cb() : this.noop()
    })
  }

  useNavigateIn(cb) {
    this.H.on('NAVIGATE_IN', () => {
      cb ? cb() : this.noop()
    })
  }

  useNavigateEnd(cb) {
    this.H.on('NAVIGATE_END', () => {
      cb ? cb() : this.noop()
    })
  }

  useNavigateOut(cb) {
    this.H.on('NAVIGATE_OUT', () => {
      cb ? cb() : this.noop()
    })
  }

  useBoth(cb) {
    this.useLoad(cb)
    this.useNavigateEnd(cb)
  }

  useBothStart(cb) {
    this.useLoad(cb)
    this.useNavigateIn(cb)
  }
}
