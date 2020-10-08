export default class NavbarPos {
  constructor() {
    this.mouseFunc = (e) => {
      this.mouseHandler(e)
    }
  }

  init() {
    this.scrollPos = 0
    this.scrollNav()
  }

  mouseHandler(e) {
    if (e.screenY <= document.querySelector('.navbar').scrollHeight + 100) {
      document.body.classList.remove('nav-hidden')
    } else document.body.classList.add('nav-hidden')
  }

  scrollNav() {
    if (
      document.getElementById('scroller').getBoundingClientRect().top >
      this.scrollPos
    ) {
      document.body.classList.remove('nav-hidden')
      document.removeEventListener('mousemove', this.mouseFunc)
    } else if (
      document.getElementById('scroller').getBoundingClientRect().top <
        this.scrollPos &&
      this.scrollPos <= 0
    ) {
      document.body.classList.add('nav-hidden')
      document.querySelector('.navbar').classList.remove('remove-bg')
      document.addEventListener('mousemove', this.mouseFunc)
    } else if (this.scrollPos === 0) {
      document.querySelector('.navbar').classList.add('remove-bg')
    }

    this.scrollPos = document
      .getElementById('scroller')
      .getBoundingClientRect().top

    this.raf = window.requestAnimationFrame(this.scrollNav.bind(this))
  }

  destroy() {
    this.scrollPos = 0
    cancelAnimationFrame(this.raf)
  }
}
