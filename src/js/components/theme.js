import {createNewElement} from '@/utils/createNewElement'
import gsap from 'gsap'

export default class Theme {

  theme = {
    current: 'white',
  }

  constructor() {
    this.$themeBtn = document.querySelector('.theme-btn')

    this.init()
  }

  init() {
    const lsTheme = JSON.parse(localStorage.getItem('theme')) || this.theme

    this.theme = {...this.theme, ...lsTheme}

    localStorage.setItem('theme', JSON.stringify(this.theme))

    this.themeChanger = this.themeChanger.bind(this)

    this.$themeBtn.addEventListener('click', this.themeChanger)

    this.setTheme()

  }

  get themeToggle() {
    return this.theme.current === 'white' ?
      this.theme.current = 'black' :
      this.theme.current = 'white'
  }

  setTheme() {

    document.body.setAttribute('data-theme', `e-${this.theme.current}`)

    localStorage.setItem('theme', JSON.stringify({...this.theme}))

    this.themeToggle
  }

  playSound() {
    const audio = new Audio('./audio/theme4.mp3')
    audio.volume = 0.5
    // audio.playbackRate = 0.8
    audio.play()
  }

  themeChanger() {

    const overlay = createNewElement('div', 'theme-overlay')
    overlay.classList.add(`theme-overlay--${this.theme.current}`)

    // this.playSound()

    this.setTheme()
    document.body.appendChild(overlay)

    gsap.to(overlay, {
      duration: 2,
      scale: 200,
      ease: 'power3.out',
      onComplete: () => {
        document.body.removeChild(overlay)
      },
    })
  }
}
