import ScrollInView from './ScrollInView.js'
import gsap from 'gsap'

class ScrollAnimations extends ScrollInView {
  constructor() {
    super()

    NodeList.prototype.animation = function (options) {
      this.length > 0 && gsap.to(this, options)
    }

    this.sections = document.querySelectorAll('.section')

    new ScrollInView(this.sections, this.sectionAnimation, 0.5)
  }

  sectionAnimation(elem) {
    elem.querySelectorAll('.a-line')
      .animation({
        duration: 1,
        width: '100%',
        ease: 'power1.out',
        stagger: 0.2,
      })

    elem.querySelectorAll('.a-h2')
      .animation({
        duration: 1,
        delay: 0.2,
        opacity: 1,
        y: 0,
        ease: 'power1.out',
      })

    elem.querySelectorAll('.a-btn')
      .animation({ duration: 1, delay: 0.4, opacity: 1, ease: 'power1.out' })

    elem.querySelectorAll('.a-p')
      .animation({
        duration: 1,
        delay: 0.5,
        opacity: 1,
        y: 0,
        ease: 'power1.out',
        stagger: 0.2,
      })

    elem.querySelectorAll('.a-item')
      .animation({
        duration: 1,
        delay: 0.4,
        opacity: 1,
        y: 0,
        ease: 'power1.out',
        stagger: 0.2,
      })

    elem.querySelectorAll('.a-titem')
      .animation({
        duration: 1,
        delay: 0.4,
        opacity: 1,
        y: 0,
        ease: 'power1.out',
        stagger: 0.2,
      })
  }
}

export default ScrollAnimations
