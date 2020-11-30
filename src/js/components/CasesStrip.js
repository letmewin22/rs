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
  targetY = 0
  currentY = 0

  init() {
    this.virtualScroll()
    this.animate = this.animate.bind(this)
    raf.on(this.animate)
  }

  virtualScroll() {
    const vs = new VirtualScroll(this.opts)

    vs.on((e) => {
      this.targetY += e.deltaY
      // this.targetY = clamp(this.targetY, -1000, 1000)
      // console.log(this.targetY)
    })
  }

  get sizes() {
    return this.strips.map((el) => el.getBoundingClientRect())
  }

  get margin() {
    return this.strips.map((el) => {
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

  move(el, i, velocity) {
    this.time[i]++

    const speed = 60
    const multiplier = velocity
    console.log(multiplier)
    // const multiplier = -80

    const result = (this.time[i] / speed) * this.coef[i] * multiplier

    if (-result >= this.sizes[i].height / 2 + this.margin[i]) {
      this.time[i] = 0
    }

    if (result > 0) {
      const maxValue = (this.sizes[i].height / 2 + this.margin[i]) * speed
      this.time[i] = maxValue / (this.coef[i] * -multiplier)
    }

    this.matrix(el, result)
  }

  animate() {
    const velocity = Math.round(this.currentY - this.targetY)
    this.strips.forEach((el, i) => {
      this.move(el, i, velocity)
    })
    this.currentY = lerp(this.currentY, this.targetY, 0.08)
  }
}
