import imagesLoaded from 'imagesloaded'
import {Events} from '../events'
import ScrollBar from './Scrollbar'

export default class SmoothScroll {
  constructor() {
    this.bindMethods()

    this.dom = {
      el: document.querySelector('#scroll-container'),
      content: document.querySelector('#scroller'),
    }

    this.init()
  }

  bindMethods() {
    ['scroll', 'run', 'resize'].forEach(
      (fn) => (this[fn] = this[fn].bind(this)),
    )
  }

  setStyles() {
    Object.assign(this.dom.el.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      height: 'var(--vh)',
      width: '100%',
      overflow: 'hidden',
      zIndex: '1'
    })
  }

  setHeight() {
    document.body.style.height = `${this.dom.content.offsetHeight}px`
    new ScrollBar(document.body)
  }

  resize() {
    this.setHeight()
    this.scroll()
  }

  preload() {
    imagesLoaded(this.dom.content, () => this.setHeight())
  }

  scroll() {
    this.data.current = window.scrollY
  }

  run({current, target}) {
    // const diff = target - current
    // const acc = diff / window.innerWidth
    // const velo = +acc

    this.dom.content.style.transform = `translate3d(0, -${current}px, 0)`
    window.scene && window.scene.updatePos(-current)
  }

  on() {
    this.setStyles()
    this.setHeight()
    Events.on('tick', this.run)
    Events.on('resize', this.resize)
  }

  off() {
    Events.off('tick', this.run)
    Events.off('resize', this.resize)
  }

  destroy() {
    document.body.style.height = ''

    this.data = null

    this.off()
    this.cancelAnimationFrame()
  }

  init() {
    this.preload()
    this.on()
  }
}
