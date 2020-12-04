import gsap from 'gsap'
import {createNewElement} from '@/utils/createNewElement'

export default class Button {
  constructor($el) {
    this.$btn = $el

    window.innerWidth > 1024 ? this.init() : this.destroy()
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
    this.$stickyItems.forEach(el => {
      const bounds = el.getBoundingClientRect()
      const [x, y] = el.dataset.power.split(', ')
      const s = this.computedProps(e, bounds)

      gsap.to(el, {
        delay: 0,
        duration: 1,
        y: s.y * +y,
        x: s.x * +x,
        ease: 'power2.out',
      })
    })
  }

  mouseleaveHandler() {
    this.$stickyItems.forEach(el => {
      gsap.to(el, {delay: 0, duration: 1, y: 0, x: 0, ease: 'power2.out'})
    })
  }

  destroy() {
    this.area && this.area.removeEventListener('mousemove', this.mouseHandler)
    this.area &&
      this.area.removeEventListener('mouseleave', this.mouseleaveHandler)
  }
}
