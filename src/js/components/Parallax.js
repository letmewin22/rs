import {raf} from '@/utils/RAF'
import {state} from '@/state'
import {resize} from '@/utils/Resize'

export class Parallax {

  constructor() {
    this.$els = document.querySelectorAll('[data-parallax]')
    this.$sections = document.querySelectorAll('[data-section-parallax]')
    this.$imgs = document.querySelectorAll('[data-img-parallax]')
    this.sizes = []
    this.imgSizes = []
    this.init()
  }

  init() {
    this.bounds()
    resize.on(this.resize)
    raf.on(this.animate)
  }

  bounds() {
    ['animate', 'resize'].forEach(fn => {
      this[fn] = this[fn].bind(this)
    })
  }


  move(el, distance, scale = 1) {
    const target = el
    const parent = target.closest('.js-in-view')
    if (target.classList.contains('js-in-view') || parent) {
      const t = `matrix3d(${scale}, 0, 0, 0,
        0, ${scale}, 0, 0,
        0, 0, 1, 0,
        0, ${distance}, 0, 1)`
      el.style.transform = t
      el.style.willChange = 'transform'
    }
  }

  els() {
    this.$els.length && this.$els.forEach(($el, i) => {
      const coef = +$el.dataset.parallax
      const start = -(this.sizes[i] - this.sizes[i]*(1+coef))
      const end = state.scrolled * coef
      this.move($el, start - end)
    })
  }

  imgs() {
    this.$imgs.length && this.$imgs.forEach(($el, i) => {
      const coef = +$el.dataset.imgParallax
      const start = (this.imgSizes[i] - this.imgSizes[i]*(1+coef))
      const end = state.scrolled * coef
      this.move($el, start + end, $el.dataset.scale)
    })
  }

  sections() {
    this.$sections.length && this.$sections.forEach($el => {
      const coef = +$el.dataset.sectionParallax
      const target = state.scrolled * coef
      this.move($el, target)
    })
  }

  getSize($els, array) {
    $els.length && $els.forEach($el => {
      const b = $el.getBoundingClientRect()
      const size = b.top - b.height / 2
      array.push(size)
    })
  }

  resize() {
    this.sizes = []
    this.getSize(this.$els, this.sizes)
    this.imgSizes = []
    this.getSize(this.$imgs, this.imgSizes)
    console.log(this.sizes)
  }

  animate() {
    this.els()
    this.imgs()
    this.sections()
  }

  destroy() {
    resize.off(this.resize)
    raf.off(this.animate)
  }
}
