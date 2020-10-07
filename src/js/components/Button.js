import gsap from 'gsap'
import {createNewElement} from '../utils/createNewElement'

export default class Button {
  constructor($el) {
    this.$btn = $el

    this.init()
  }

  init() {
    this.area = createNewElement('div', 'js-sticky-area')
    this.$btn.appendChild(this.area)

    this.$stickyItems = this.$btn.querySelectorAll('.js-sticky-item')

    this.mouseHandler = this.mouseHandler.bind(this)
    this.mouseleaveHandler = this.mouseleaveHandler.bind(this)

    this.area.addEventListener('mousemove', this.mouseHandler)
    this.area.addEventListener('mouseleave', this.mouseleaveHandler)
  }

  computedProps(e, sizes) {
    const s = e.clientX - sizes.left
    const o = e.clientY - sizes.top

    const x = (s - sizes.width / 2) / sizes.width
    const y = (o - sizes.height / 2) / sizes.height

    return {
      x,
      y,
    }
  }

  mouseHandler(e) {
    const tl = gsap.timeline()

    this.$stickyItems.forEach(el => {
      const bounds = el.getBoundingClientRect()
      const power = el.dataset.power.split(', ')
      const s = this.computedProps(e, bounds)

      tl.to( el,
        {
          duration: 1,
          y: s.y * +power[1],
          x: s.x * +power[0],
          ease: 'power2.out',
        }, 0)
    })
  }

  mouseleaveHandler() {
    const tl = gsap.timeline()
    this.$stickyItems.forEach(el => {
      tl.to(el, {duration: 1, y: 0, x: 0, ease: 'power2.out'}, 0)
    })
  }

  destroy() {
    this.area.removeEventListener('mousemove', this.mouseHandler)
    this.area.removeEventListener('mouseleave', this.mouseleaveHandler)
  }
}
