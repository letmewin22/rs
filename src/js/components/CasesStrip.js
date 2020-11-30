import VirtualScroll from 'virtual-scroll'

import {clamp, lerp} from '@/utils/math'
import {raf} from '@/utils/RAF'

export class CasesStrip {
  constructor() {
    const selector = '.cases-header__strip .cases-header__items-wrapper'
    this.strips = [...document.querySelectorAll(selector)]

    this.opts = {
      touchMultiplier: 3.8,
      firefoxMultiplier: 40,
      preventTouch: true,
      el: document.querySelector('#scroll-container'),
    }

    this.init()
  }

  coef = [0.9, 0.5, 0.8, 0.4]
  time = [...Array(4)].fill(0)
  targetY = [...Array(4)].fill(0)
  currentY = [...Array(4)].fill(0)

  init() {
    this.virtualScroll()
    this.animate = this.animate.bind(this)
    raf.on(this.animate)
  }

  virtualScroll() {
    const vs = new VirtualScroll(this.opts)

    vs.on(e => {
      this.targetY = this.targetY.map(el => (el += e.deltaY))
    })
  }

  get sizes() {
    return this.strips.map(el => el.getBoundingClientRect())
  }

  get margin() {
    return this.strips.map(el => {
      const child = el.querySelectorAll('.cases-header__items')[1]
      const marginTop = getComputedStyle(child).marginTop
      return +marginTop.replace('px', '') / 2
    })
  }

  matrix(el, distance) {
    const t = `matrix3d(1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, ${distance}, 0, 1)`

    el.style.transform = t
    el.style.willChange = 'transform'
  }

  move(el, i) {
    this.time[i]++

    const speed = 60
    const multiplier = -80

    const defaultSpeed = (this.time[i] / speed) * this.coef[i] * multiplier
    const result = (this.currentY[i] / 5) * this.coef[i] + defaultSpeed

    if (-result >= this.sizes[i].height / 2 + this.margin[i]) {
      this.time[i] = 0
      this.targetY[i] = -500
      this.currentY[i] = 0
    }

    if (result > 0) {
      const maxValue = (this.sizes[i].height / 2 + this.margin[i]) * speed
      this.time[i] = maxValue / (this.coef[i] * -multiplier)
      this.targetY[i] = 500
      this.currentY[i] = 0
    }

    this.matrix(el, result)
  }

  animate() {
    this.strips.forEach((el, i) => {
      this.move(el, i)
    })
    this.currentY = this.currentY.map((el, i) =>
      lerp(el, this.targetY[i], 0.08)
    )
  }
}
