import {clamp} from '@/utils/math'
import {raf} from '@/utils/RAF'
import {state} from '@/state'

/**
* @todo
  1. Прогресс анимации, который зависит от высоты секции и её процента прокрутки
  2. В начала скрола секции нулевые значения, в конце таргет значения
* */

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

  transform($el, elValues = [0, 0], toValues = [0, 0]) {
    const vh = (toValues[1] * this.position.pos.height) / 100
    const percent = (elValues[1] / vh) * 100
    const scrolled = this.position.intersection + window.innerHeight
    const scrollPercent = clamp(percent * scrolled, 0, 100)

    $el.style.cssText = `
      transform: scale(${elValues[0] + scrollPercent / 100});
      opacity: ${elValues[0] + scrollPercent / 100}
    `
  }

  animate() {
    this.$children.forEach(($child) => {
      this.transform($child, [0, 1], [0, 70])
      // const copy = this.$children[0].parentNode.cloneNode(true)
      // document.body.appendChild(copy)
      // copy.style.cssText = `
      //     transform: matrix3d(1, 0, 0, 0,
      //       0, 1, 0, 0,
      //       0, 0, 1, 0,
      //       0, ${state.scrolled - window.innerHeight * 1.5}, 0, 1);
      //     will-change: transform;
      //   `
    })
  }
}
