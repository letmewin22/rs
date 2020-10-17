import gsap from 'gsap'
import splitting from 'splitting'
import noop from '@/utils/noop'


export default class ChangeView {

  static prepare(cb) {
    cb = typeof cb !== undefined ? cb : noop

    const lines = document.querySelectorAll('.js-in-view .js-l')

    lines.length && lines.forEach((el) => {
      !el.classList.contains('splitting') &&
      splitting({target: el, by: 'chars'})
    })
  }


  static in(cb) {

    this.prepare(cb)

    const chars = document.querySelectorAll('.js-in-view .char')
    const i = document.querySelectorAll('.js-in-view .js-i')

    const tl = gsap.timeline({onComplete: cb})

    const set = {
      y: '110%',
      rotationX: 60
    }

    if (screen.width <=960) {
      set.opacity = '0'
    }

    chars.length && tl.set(chars, set)

    i.length && tl.set(i, {
      opacity: 0,
      y: 40,
    })

    chars.length && tl.to(chars, {
      duration: 1,
      y: '0%',
      rotationX: 0,
      ease: 'expo.out',
      stagger: 0.016,
    })

    window.scene && window.scene.show()

    if (screen.width <= 960) {
      chars.length && tl.to(chars, {
        duration: 1,
        opacity: 1,
        ease: 'expo.out',
        stagger: 0.016,
      }, 0)
    }

    i.length && tl.to(i,
      {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'expo.out',
        stagger: 0.12,
      }, 0.2)

  }
  static out(cb) {

    this.prepare(cb)

    const chars = [...document.querySelectorAll('.js-in-view .char')].reverse()
    const i = document.querySelectorAll('.js-in-view .js-i')

    const tl = gsap.timeline({onComplete: cb})

    const set = {
      y: '0%',
      rotationX: 0
    }

    if (screen.width <=960) {
      set.opacity = '1'
    }

    chars.length && tl.set(chars, set)
    window.scene && window.scene.hide()

    i.length && tl.set(i, {
      opacity: 1,
      y: 0,
    })

    chars.length && tl.to(chars, {
      duration: 0.6,
      y: '110%',
      rotationX: 60,
      ease: 'expo.in',
      stagger: 0.016,
    })

    if (screen.width <= 960) {
      chars.length && tl.to(chars, {
        duration: 0.6,
        opacity: 0,
        stagger: 0.016,
      }, 0)
    }

    i.length && tl.to(i,
      {
        duration: 1,
        opacity: 0,
        y: 40,
        ease: 'expo.in',
        stagger: 0.05,
      }, 0)
  }
}
