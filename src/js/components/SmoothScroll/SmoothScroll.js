import VirtualScroll from 'virtual-scroll'

import {setState, state} from '@/state'
import {clamp, lerp} from '@/utils/math'
import ScrollBar from './Scrollbar'
import {run} from './run'
import {resize} from '@/utils/Resize'
import mutationObserver from '@/utils/mutationObserver'
import {raf} from '@/utils/RAF'
import {isFixed} from '@/utils/isFixed'

export default class SmoothScroll {
  constructor($el) {
    this.$el = document.querySelector($el)
    this.targetY = 0
    this.currentY = 0
    this.ease = 0.08

    this.opts = {
      touchMultiplier: 2.4,
      firefoxMultiplier: 30,
      preventTouch: true,
      // passive: false,
      el: document.querySelector('#scroll-container')
    }

    this.init()
  }

  bind() {
    ['scroll', 'resize'].forEach(fn => {
      this[fn] = this[fn].bind(this)
    })
  }

  virtualScroll() {

    const vs = new VirtualScroll(this.opts)
    vs.on((e) => {
      if (!isFixed()) {
        if (state.target === undefined) {
          this.targetY += e.deltaY
          setState(state, state.target = e.deltaY)
        } else {
          setState(state, state.target += e.deltaY)
          state.target = clamp(state.target, 0, this.max)
          this.targetY = state.target
        }
      }
    })
  }

  init() {
    this.virtualScroll()
    this.bind()
    resize.on(this.resize)
    mutationObserver(this.$el, this.resize)

    new ScrollBar()
    raf.on(this.scroll)
  }

  scroll() {
    if (this.currentY.toFixed(0) !== this.targetY.toFixed(0)) {
      setState(state, state.scrolling = true)

    } else {
      setState(state, state.scrolling = false)

    }
    if (state.scrolling) {
      this.targetY = state.target
      this.currentY = lerp(this.currentY, this.targetY, this.ease)
      this.currentY = Math.round(this.currentY*100)/100
      run(this.$el, this.currentY)
      setState(state, state.scrolling = true)
    }

  }

  resize() {
    this.height = this.$el.getBoundingClientRect().height
    this.max = (this.height - window.innerHeight) * -1
  }

  reset() {
    setState(state, state.target = 0)
    this.targetY = 0
    this.currentY = 0
    run(this.$el, 0)
  }

  destroy() {}
}

