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

    this.$btnCircle = this.$btn.querySelector('.btn__circle')
    this.$btnText = this.$btn.querySelector('.btn__text')

    this.mouseHandler = this.mouseHandler.bind(this)
    this.mouseleaveHandler = this.mouseleaveHandler.bind(this)

    this.area.addEventListener('mousemove', this.mouseHandler)
    this.area.addEventListener('mouseleave', this.mouseleaveHandler)
  }

  computedProps(e, sizes) {
    const s = e.clientX - sizes.left
    const o = e.clientY - sizes.top

    const x = ((s - sizes.width / 2) / sizes.width)
    const y = ((o - sizes.height / 2) / sizes.height)

    return {
      x,
      y,
    }
  }

  mouseHandler(e) {

    const btnSizes = this.$btn.getBoundingClientRect()
    const textSizes = this.$btnText.getBoundingClientRect()

    const s1 = this.computedProps(e, btnSizes)
    const s2 = this.computedProps(e, textSizes)

    const tl = gsap.timeline()

    tl.to(this.$btnCircle, {
      duration: 1,
      y: s1.y * 60,
      x: s1.x * 60,
      ease: 'power2.out',
    })

    tl.to(
      this.$btnText,
      {duration: 1, y: s2.y * 10, x: s2.x * 100, ease: 'power2.out'},
      0,
    )
  }

  mouseleaveHandler() {
    const tl = gsap.timeline()

    tl.to(this.$btnCircle, {duration: 1, y: 0, x: 0, ease: 'power2.out'})
    tl.to(this.$btnText, {duration: 1, y: 0, x: 0, ease: 'power2.out'}, 0)
  }

  destroy() {
    this.area.removeEventListener('mousemove', this.mouseHandler)
    this.area.removeEventListener('mouseleave', this.mouseleaveHandler)
  }
}
