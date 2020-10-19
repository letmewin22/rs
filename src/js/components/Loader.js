import imagesLoaded from 'imagesloaded'
import gsap from 'gsap'
import splitting from 'splitting'
import ChangeView from './ChangeView'

export default class Loader {
  constructor(cb) {
    this.pli = document.querySelectorAll('[data-pli]')
    this.cb = cb

    this.countImages = this.pli.length
    this.loadedLength = 0

    this.loader = document.querySelector('.loader')
    this.overlay = this.loader.querySelector('.loader__overlay')

    this.percentHTML = this.loader.querySelector('.loader__percent')
    this.progressHTML = this.loader.querySelector('.loader__progress svg path')

    this.$text = document.querySelectorAll('.js-text')
    this.$p = document.querySelector('.js-p')
    this.$ui = document.querySelectorAll('.js-ui-load')

    this.num = {val: 0}
    this.state = false
    this.init()

  }

  init() {
    this.circle = this.progressHTML.getTotalLength()
    this.step = this.circle / this.countImages

    document.body.style.cursor = 'wait'
    document.body.classList.remove('loading')
    document.body.classList.add('e-fixed')
    document.querySelector('.site-wrapper').style.cssText = `
      transition: opacity 1s ease;
    `

    if (this.pli.length > 0) {
      this.imgLoad = imagesLoaded(document.querySelectorAll('[data-pli]'), {
        background: true,
      })

      this.imgLoad.on('progress', (instance, image) => this.onProgress(image))
      this.imgLoad.on('fail', () => {
        setTimeout(() => {
          this.counter(100, this.circle*2, 1)
        }, 650)
      })
    } else {
      this.counter(100, this.circle*2, 1)
    }
  }

  afterLoad() {
    if (!this.state) {
      this.state = true
      this.$text.forEach(el => {
        el.style.overflow = 'hidden'
        splitting({target: el, by: 'chars'})
      })

      this.$chars = document.querySelectorAll('.js-text .char')
      this.$chars = [...this.$chars].reverse()

      this.animation()
    }
  }

  counter(c, o, d) {
    const count = c ?? Number(100 *(this.loadedLength / this.countImages))
    const offset = o ?? this.circle + (this.loadedLength * this.step)

    return new Promise((resolve) => {
      gsap.to(this.num, {
        duration: d ?? 0.5,
        val: count,
        ease: 'power1.out',
        onUpdate: () => {
          const finalOffset = this.circle + (offset *(this.num.val / 100) / 2)
          this.percentHTML.innerHTML = Math.round(this.num.val) + '%'
          this.progressHTML.style.strokeDashoffset = finalOffset
        },
        onComplete: () => {
          if (count !== 100) {
            resolve()
          } else {
            this.afterLoad()
          }
        }
      })
    })
  }

  onProgress(image) {

    if (image.isLoaded) {
      image.element ?
        image.element.classList.add('loaded') :
        image.img.classList.add('loaded')

      this.loadedLength =
      document.querySelectorAll('[data-pli].loaded').length

      this.counter().then(() => {
        this.counter()
      })
    }
  }

  animation() {
    const tl = gsap.timeline({
      onComplete: () => {
        this.loader.parentNode.removeChild(this.loader)
        document.body.classList.remove('e-fixed')
        document.body.style.cursor = 'auto'
        document.querySelector('.site-wrapper').style.opacity = '1'
      }
    })
    tl.delay(0.2)
    tl.to(this.percentHTML,
      {
        opacity: 0,
        y: '50%',
        duration: 0.5,
        ease: 'expo.in',
      }, 0.61)

    tl.to(this.progressHTML,
      {
        strokeDashoffset: this.circle*3,
        duration: 1.5,
        ease: 'power4.inOut'
      }, 0.31)

    tl.to(this.$chars, {
      duration: 0.6,
      y: '110%',
      rotationX: '60deg',
      ease: 'expo.in',
      stagger: 0.016
    }, 0.8)

    tl.to(this.$p, {
      duration: 1,
      opacity: 0,
      y: 40,
      ease: 'expo.in',
      onComplete: () => ChangeView.in()
    }, 0.8)
    tl.to(this.$ui, {
      duration: 1,
      opacity: 1
    }, 0.8)
  }
}
