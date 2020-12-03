import {raf} from '@/utils/RAF'
import {casesState} from './casesState'

export class Circles {
  time = 0
  constructor($circle, opts = {}) {
    this.$circle = $circle

    this.opts = {
      auto: opts.auto || false,
      speed: opts.speed || 4,
    }

    this.init()
  }

  bounds() {
    const methods = ['animate']
    methods.forEach(fn => (this[fn] = this[fn].bind(this)))
  }

  init() {
    this.bounds()

    raf.on(this.animate)
  }

  transform($el, pos) {
    $el.style.transform = `rotate(${pos}deg)`
  }

  get scrollDir() {
    return casesState.velocity > 0 ? -1 : 1
  }

  animate() {
    this.time += this.scrollDir
    const pos = this.opts.auto
      ? this.time / this.opts.speed + casesState.scrollPos
      : casesState.scrollPos
    this.transform(this.$circle, pos)
  }

  destroy() {
    raf.off(this.animate)
  }
}
