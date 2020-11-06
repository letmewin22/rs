import splitting from 'splitting'
import gsap from 'gsap'

import ChangeView from './ChangeView'
import {state} from '@/state'

export default class FormPopUp {
  constructor() {
    this.$form = document.querySelector('.form-wrapper')
    this.$openS = '.js-fo'
    this.$closeBtn = document.querySelector('.form-wrapper__close-btn')
    this.$formItems = document.querySelectorAll('.js-form-item')
    this.$inputs = document.querySelectorAll('.form__input-container')
    this.$btn = document.querySelectorAll('.form__btn')
    this.$navbar = document.querySelector('.navbar')

    this.isOpen = false
  }

  init() {
    this.$formItems.forEach(el => {
      splitting({target: el, by: 'chars'})
    })

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.onPopState = this.onPopState.bind(this)
    this.openHandler = this.openHandler.bind(this)
    document.body.addEventListener('click', this.openHandler)
    // this.$openBtn.forEach(btn => btn.addEventListener('click', this.open))
    this.$closeBtn.addEventListener('click', this.close)

    window.addEventListener('popstate', this.onPopState, false)

  }

  onPopState() {
    if (this.isOpen) {
      document.querySelector('[data-router-view]').style.opacity = 0
      this.close(true)
    }
  }

  open() {
    this.$navbar.style.display = 'none'
    this.$form.classList.add('e-open')
    document.body.classList.add('e-fixed')
    ChangeView.out(this.openAnim.bind(this))
    this.isOpen = true
    state.popup = true
  }
  close() {
    this.$form.classList.remove('e-open')
    this.isOpen = false
    this.closeAnim()
  }

  openHandler(e) {
    const target = e.target
    const parent = target.closest(this.$openS)
    if (target.classList.contains(this.$openS) || parent) {
      this.open()
    }
  }

  openAnim() {
    const tl = gsap.timeline()
    const items = this.$form.querySelectorAll('.char')

    tl.to(this.$form, {duration: 0.01, visibility: 'visible'})
    tl.to(items, {
      duration: 1,
      y: '0%',
      rotationX: '0deg',
      ease: 'expo.out',
      stagger: 0.016
    })
    tl.to(this.$inputs, {duration: 0.5, opacity: 1}, 0.5)
    tl.to(this.$btn, {duration: 0.5, opacity: 1}, 0.5)
  }
  closeAnim() {
    const tl = gsap.timeline()
    const items = [...this.$form.querySelectorAll('.char')].reverse()
    tl.to(this.$inputs, {duration: 0.5, opacity: 0})
    tl.to(this.$btn, {duration: 0.5, opacity: 0}, 0)
    tl.to(items, {
      duration: 0.6,
      y: '110%',
      rotationX: '60deg',
      ease: 'expo.in',
      stagger: 0.016,
      onComplete: () => {
        document.body.classList.remove('e-fixed')
        state.popup = false
        setTimeout(() => this.$navbar.style.display = 'block', 500)
        ChangeView.in()
      }
    }, 0.2)
    tl.to(this.$form, {duration: 0.01, visibility: 'hidden'})
  }

  destroy() {
    this.$openBtn.forEach(btn => btn.removeEventListener('click', this.open))
    this.$closeBtn.removeEventListener('click', this.close)
  }
}
