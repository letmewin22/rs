import VirtualScroll from 'virtual-scroll'
import gsap from 'gsap'
import {lerp} from '@/utils/math'
import {raf} from '@/utils/RAF'
import {state} from '@/state'

export class CasesStrip {
  $strip = document.querySelector('.cases-header__strips')
  $links = document.querySelectorAll('.cases-header__strip-item')
  $imgs = document.querySelectorAll('.cases-header__img')
  $parent = document.querySelector('.js-st')
  targetY = 0
  currentY = 0
  ease = 0.06

  opts = {
    touchMultiplier: 3.8,
    firefoxMultiplier: 40,
    preventTouch: true,
    el: document.querySelector('#scroll-container'),
  }

  constructor() {
    this.bounds()
    this.init()
  }

  virtualScroll() {
    this.vs = new VirtualScroll(this.opts)

    this.vs.on(e => {
      const dir = window.innerWidth > 960 ? e.deltaY : e.deltaX
      this.targetY += dir
    })
  }

  bounds() {
    const methods = ['onMouseEnter', 'onMouseLeave', 'animate']
    methods.forEach(fn => (this[fn] = this[fn].bind(this)))
  }

  init() {
    this.virtualScroll()

    this.$links.forEach(el => {
      el.addEventListener('mouseenter', this.onMouseEnter)
      el.addEventListener('mouseleave', this.onMouseLeave)
    })
    raf.on(this.animate)
  }

  in() {
    this.targetY -= this.sizes.width / 16
  }

  out() {
    this.targetY += this.sizes.width / 16
  }

  onMouseEnter(e) {
    const idx = +e.target.dataset.index - 1

    window.scene && window.scene.fVisibility.forEach(el => (el.value = 0))

    this.$imgs.forEach(img => (img.style.display = 'none'))
    this.$imgs[idx].style.display = 'block'

    window.scene &&
      gsap.to(window.scene.fVisibility[idx], {
        duration: 1,
        value: 1,
        ease: 'expo.out',
        stagger: 0.016,
      })

    window.scene && window.scene.figures[idx].mouseEnter()

    this.$links.forEach(el => el.classList.add('hidden'))
    e.target.classList.remove('hidden')
  }

  onMouseLeave() {
    if (!state.glTransition) {
      this.$links.forEach(el => el.classList.remove('hidden'))
      this.$imgs.forEach(img => (img.style.display = 'none'))
      window.scene && window.scene.fVisibility.forEach(el => (el.value = 0))
      window.scene && window.scene.figures.forEach(el => el.mouseLeave())
    }
  }

  get sizes() {
    return this.$strip.getBoundingClientRect()
  }

  transform($el, pos, veloctiy) {
    const t = `matrix3d(
     1, 0, 0, 0, 
     0, 1, 0, 0,
     0, 0, 1, 0, 
     ${pos}, 0, 0, 1
    ) 
    skewX(${-veloctiy / 80}deg)
    `

    $el.style.transform = t
    $el.style.willChange = 'transform'
  }

  animate() {
    this.currentY = lerp(this.currentY, this.targetY, this.ease)
    this.currentY = Math.round(this.currentY * 100) / 100

    let percent = (this.currentY / this.sizes.width) * 100
    const velocity = this.currentY - this.targetY

    if (-percent >= 50) {
      percent = 0
      this.targetY = -velocity
      this.currentY = 0
    }

    if (percent > 0) {
      percent = -50
      this.targetY = -this.sizes.width / 2 - velocity
      this.currentY = -this.sizes.width / 2
    }

    this.transform(this.$strip, this.currentY, velocity)
  }

  destroy() {
    this.$links.forEach(el => {
      el.removeEventListener('mouseenter', this.onMouseEnter)
      el.removeEventListener('mouseleave', this.onMouseLeave)
    })
    raf.off(this.animate)
    this.vs.destroy()
  }
}
