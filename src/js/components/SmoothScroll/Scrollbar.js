import gsap from 'gsap'
import mutationObserver from '@/utils/mutationObserver'
import {setState, state} from '@/state'
import {run} from './run'
import {clamp} from '@/utils/math'
import {resize} from '@/utils/Resize'
import {raf} from '../../utils/RAF'

export default class ScrollBar {
  constructor(el) {

    this.el = el || document.getElementById('scroll-container')

    this.scrollbar = document.createElement('div')
    el ?
      this.scrollbar.classList.add('scrollbar', 'block-scrollbar') :
      this.scrollbar.classList.add('scrollbar')

    this.scrollbar.innerHTML = '<span class="scrollbar__thumb"></span>'

    this.inactiveDelay = 2
    this.timer = 0
    this.height = this.el.getBoundingClientRect().height
    this.max = (this.height - window.innerHeight) * -1

    this.active = () => {
      this.timer = 0
    }

    this.init()
  }

  init() {

    !this.el.parentNode.querySelector('.scrollbar') &&
      this.el.parentNode.appendChild(this.scrollbar)

    this.scrollbar.classList.remove('hidden')

    this.thumb = this.scrollbar.querySelector('.scrollbar__thumb')
    this.setHeight()

    resize.on(this.setHeight.bind(this))
    mutationObserver(this.el, this.setHeight.bind(this))

    this.detectInactivity()
    this.events()
  }

  setHeight() {
    const wh = window.innerHeight
    this.height = wh * (wh / this.el.scrollHeight)
    if (this.el.scrollHeight === wh) this.height = 0

    this.thumb.style.height = this.height + 'px'
  }

  scroll() {
    if (state.scrolling) {
      const ch = document.documentElement.clientHeight

      this.thumb.classList.add('scrolling')
      const scrollPos = state.scrolled
      const percent =(100 * scrollPos) / (this.el.scrollHeight - ch)

      this.thumb.style.top = percent + '%'
      this.thumb.style.transform = `translateY(-${percent}%)`

      this.active()
    }
  }

  events() {
    const progressUpdate = (e) => {
      const h = this.scrollbar.offsetHeight
      let target
      let o

      setState(state, state.scrolling = true)

      if ('ontouchstart' in document.documentElement ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)) {
        const b = e.target.getBoundingClientRect()
        o = e.targetTouches[0].pageY - b.top
        target = clamp(-this.el.scrollHeight * (o / h), 0, this.max)

        gsap.to(state, {
          duration: 0.01,
          target,
          ease: 'none',
          onUpdate: () => {
            run(this.el, target)
            state.target = +state.target
          }
        })
      } else {
        o = e.clientY
        target = clamp(-this.el.scrollHeight * (o / h), 0, this.max)

        gsap.to(state, {
          duration: 0.3,
          target,
          ease: 'none',
          onUpdate: () => {
            run(this.el, target)
          }
        })
      }
    }

    const mousedown = () => {
      this.el.parentNode.addEventListener('mousemove', progressUpdate)
    }

    const touchstart = () => {
      this.el.parentNode.addEventListener('touchmove', progressUpdate)
      this.thumb.classList.add('active')
    }

    this.scrollbar.addEventListener('mousedown', mousedown)

    this.scrollbar.addEventListener('touchstart', touchstart, {
      passive: false
    })

    const mouseUp = () => {
      this.el.parentNode.removeEventListener('mousemove', progressUpdate)
    }

    const touchend = () => {
      this.thumb.classList.remove('active')
      this.el.parentNode.removeEventListener('touchmove', progressUpdate, {
        passive: false,
      })
    }

    this.el.parentNode.addEventListener('mouseup', mouseUp)
    document.body.addEventListener('mouseleave', mouseUp)


    this.el.parentNode.addEventListener('touchend', touchend, {passive: false})

    screen.width > 960 &&
    this.scrollbar.addEventListener('click', progressUpdate)

    raf.on(this.scroll.bind(this))
  }

  controlsEvent() {
    if (this.timer >= this.inactiveDelay) {
      this.thumb.classList.remove('scrolling')
      return
    } else {
      this.thumb.classList.add('scrolling')
    }
  }

  detectInactivity() {
    this.timerTicker = setInterval(() => {
      this.timer++
    }, 1000)
    this.interval = setInterval(this.controlsEvent.bind(this), 120)

    this.scrollbar.addEventListener('mouseenter', this.active)
  }

  destroy() {
    document.querySelectorAll('.scrollbar').length > 0 &&
        document.querySelectorAll('.scrollbar').forEach((el) => {
          el.classList.add('hidden')
          el.parentNode.removeChild(el)
        })
    raf.off(this.scroll.bind(this))
  }
}
