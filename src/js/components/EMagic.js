import {clamp} from '@/utils/math'
import {raf} from '@/utils/RAF'

export class EMagic {
  constructor($el) {
    this.$el = $el
    this.$children = this.$el.querySelectorAll('[data-e-magic]')

    this.init()
  }

  bounds() {
    ['animate'].forEach((fn) => {
      this[fn] = this[fn].bind(this)
    })
  }

  init() {
    this.bounds()
    raf.on(this.animate)
  }

  get position() {
    const pos = this.$el.getBoundingClientRect()
    const intersection = pos.height - pos.bottom
    return {intersection, pos}
  }

  getScrolledPercent(elValues, toValues) {
    const vh = (toValues[1] * this.position.pos.height) / 100
    const percent = (elValues[1] / vh) * 100
    const scrolled = this.position.intersection + window.innerHeight
    return clamp(percent * scrolled, 0, 100)
  }

  transform($el, elValues = [0, 0], toValues = [0, 0]) {
    const coef = $el.dataset.eMagic
    const scrollPercent = this.getScrolledPercent(elValues, toValues)

    const scale = elValues[0] + scrollPercent / 100
    const distance = -(elValues[0] + scrollPercent) * coef * 2

    const t = `matrix3d(
        ${scale}, 0, 0, 0,
        0, ${scale}, 0, 0,
        0, 0, 1, 0,
        0, ${distance}, 0, 1
      )`

    $el.style.cssText = `
      transform: ${t};
      opacity: ${elValues[0] + scrollPercent / 100};
      will-change: transform;
    `
  }

  animate() {
    this.$children.forEach(($child) => {
      this.transform($child, [0, 1], [0, 70])
    })
  }
}
