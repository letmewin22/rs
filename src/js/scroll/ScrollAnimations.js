import ScrollInView from './ScrollInView.js'
import gsap from 'gsap'

class ScrollAnimations extends ScrollInView {
  constructor() {
    super()

    NodeList.prototype.animation = function(options) {
      this.length > 0 && gsap.to(this, options)
    }

    this.sections = document.querySelectorAll('.section')

    new ScrollInView(this.sections, this.sectionAnimation, 0.35)
  }

  sectionAnimation(elem) {
    elem.querySelectorAll('.a-i')
      .animation({
        duration: 0.7,
        y: '0',
        opacity: '1',
        ease: 'power2.out',
        stagger: 0.2
      })

    elem.querySelectorAll('.a-h')
      .animation({
        duration: 0.7,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
      })
    elem.querySelectorAll('.a-l')
      .animation({
        duration: 0.7,
        width: '100%',
        ease: 'power2.out',
      })

  }
}

export default ScrollAnimations
