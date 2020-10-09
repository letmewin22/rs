import gsap from 'gsap'

function noop() {}
export default class ChangeView {
  static in(cb) {
    cb = typeof cb !== undefined ? cb : noop
    const tl = gsap.timeline({onComplete: cb})

    tl.fromTo(document.querySelectorAll('h1 .char'), {y: '110%'}, {
      duration: 1,
      y: '0%',
      rotationX: 0,
      ease: 'expo.out',
      stagger: 0.016,
    })
    tl.to(document.querySelector('.h1-withcols__img'),
      {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'expo.out'
      }, 0.5)

  }
  static out(cb) {
    cb = typeof cb !== undefined ? cb : noop
    const tl = gsap.timeline({onComplete: cb})
    const chars = [...document.querySelectorAll('h1 .char')].reverse()

    tl.to(chars, {
      duration: 0.6,
      y: '110%',
      rotationX: 60,
      ease: 'expo.in',
      stagger: 0.016,
    })
    tl.to(document.querySelector('.h1-withcols__img'),
      {
        duration: 1,
        opacity: 0,
        y: 40,
        ease: 'expo.in'
      }, 0.2)
  }
}
