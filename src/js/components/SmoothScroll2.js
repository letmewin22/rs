// import imagesLoaded from 'imagesloaded'
// import gsap from 'gsap'
// import ScrollBar from './Scrollbar'

// export default class SmoothScroll2 {
//   constructor() {

//     this.target = 0
//     this.bindMethods()

//     this.dom = {
//       el: document.querySelector('#scroll-container'),
//       content: document.querySelector('#scroller'),
//       body: document.querySelector('#app'),
//       root: document.querySelector('#root')
//     }

//     this.init()
//   }

//   bindMethods() {
//     ['run', 'resize'].forEach(
//       (fn) => (this[fn] = this[fn].bind(this)),
//     )
//   }

//   setStyles() {
//     Object.assign(this.dom.el.style, {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       height: 'var(--vh)',
//       width: '100%',
//       overflow: 'hidden',
//       zIndex: '1'
//     })
//   }

//   setHeight() {
//     this.dom.body.style.height = `${this.dom.content.offsetHeight}px`
//     // new ScrollBar(this.dom.body)
//   }

//   resize() {
//     this.setHeight()
//     this.scroll()
//   }

//   update() {
//     // eslint-disable-next-line max-len
//     this.target = this.dom.root.scrollTop
//   }

//   preload() {
//     imagesLoaded(this.dom.content, () => this.setHeight())
//   }

//   run() {
//     // this.current = this.target
//     // this.dom.content.style.transform =
//     // `translate3d(0, -${this.currentRounded}px, 0)`
//     // gsap.to(this.dom.content, {
//     //   duration: 1.2,
//     //   y: -this.target,
//     //   ease: 'power2.out'
//     // })
//     window.scene && window.scene.updatePos(-this.target)
//     this.update()
//   }

//   on() {
//     // this.setStyles()
//     this.setHeight()
//     window.raf.on(this.run)
//     window.addEventListener('resize', this.resize)
//   }

//   off() {
//     window.raf.off(this.run)
//     window.removeEventListener('resize', this.resize)
//   }

//   destroy() {
//     this.dom.body.style.height = ''

//     this.data = null

//     this.off()
//   }

//   init() {
//     this.preload()
//     this.on()
//   }
// }
