import gsap from 'gsap'
import splitting from 'splitting'

import ChangeView from './ChangeView'

export default class Nav {
  constructor() {
    this.$nav = document.querySelector('.js-nav')
    this.$navBtn = document.querySelector('.js-nav-btn')
    this.$navItems = this.$nav.querySelectorAll('.js-nav-item')
    this.$navImg = this.$nav.querySelector('.nav__right img')
    this.$navS = this.$nav.querySelector('.nav__separator')
    this.$navN = this.$nav.querySelectorAll('.nav__num')

    this.isOpen = false
    this.init()
  }

  init() {
    this.$navItems.forEach((el) => {
      splitting({target: el.querySelector('a'), by: 'chars'})
    })

    this.toggle = this.toggle.bind(this)
    this.$navBtn.addEventListener('click', this.toggle)

    this.$navItems.forEach((item) => {
      item.addEventListener('click', this.toggle)
    })
  }
  toggle() {
    this.isOpen ? this.close() : this.open()
  }
  open() {
    document.querySelector('.js-nav-open').style.display = 'none'
    document.querySelector('.js-nav-close').style.display = 'block'

    this.$nav.classList.add('e-open')
    document.body.classList.add('e-fixed')
    ChangeView.out(this.openAnim.bind(this))
    this.isOpen = true
  }
  close() {
    document.querySelector('.js-nav-open').style.display = 'block'
    document.querySelector('.js-nav-close').style.display = 'none'

    this.$nav.classList.remove('e-open')
    this.isOpen = false
    this.closeAnim()
  }

  openAnim() {
    const tl = gsap.timeline()
    const items = this.$nav.querySelectorAll('.char')

    tl.to(this.$nav, {duration: 0.01, visibility: 'visible'})
    tl.to(items, {
      duration: 1,
      y: '0%',
      rotationX: '0deg',
      ease: 'expo.out',
      stagger: 0.016
    })
    tl.to(this.$navS, {duration: 0.5, opacity: 1}, 0.5)
    tl.to(this.$navN, {duration: 0.5, opacity: 0.6}, 0.5)
    // tl.to(this.$navImg, {
    //   duration: 2,
    //   y: 0,
    //   rotation: '0deg',
    //   opacity: 1,
    //   ease: 'expo.out'
    // }, 0.5)
  }
  closeAnim() {
    const tl = gsap.timeline()
    const items = [...this.$nav.querySelectorAll('.char')].reverse()
    tl.to(this.$navS, {duration: 0.5, opacity: 0})
    tl.to(this.$navN, {duration: 0.5, opacity: 0}, 0)
    tl.to(items, {
      duration: 0.6,
      y: '110%',
      rotationX: '60deg',
      ease: 'expo.in',
      stagger: 0.016,
      onComplete: () => {
        document.body.classList.remove('e-fixed')
        ChangeView.in()
      }
    }, 0.2)
    tl.to(this.$nav, {duration: 0.01, visibility: 'hidden'})
  }

  destroy() {
    this.$navBtn.removeEventListener('click', this.toggle)
    this.$navItems.forEach((item) => {
      item.removeEventListener('click', this.toggle)
    })
  }
}
