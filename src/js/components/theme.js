import {createNewElement} from '../utils/createNewElement'
import gsap from 'gsap'


export const theme = () => {
  const themeBtn = document.querySelector('.theme-btn')

  const theme = {
    current: 'white',
  }

  // const lsTheme = JSON.parse(localStorage.getItem('theme')) || theme

  // theme = Object.assign(theme, lsTheme)

  // localStorage.setItem('theme', JSON.stringify(theme))

  const setTheme = () => {

    document.body.classList = `e-${theme.current}`

    theme.current === 'white' ?
      (theme.current = 'black') :
      (theme.current = 'white')
  }

  const themeChanger = () => {
    const overlay = createNewElement('div', 'theme-overlay')

    overlay.classList.add(`theme-overlay--${theme.current}`)
    setTheme()
    console.log(theme)

    document.body.appendChild(overlay)

    gsap.to(overlay, {
      duration: 2,
      scale: 200,
      ease: 'power3.out',
      onComplete: () => {
        document.body.removeChild(overlay)
        // localStorage.setItem('theme', JSON.stringify(theme))
      },
    })
  }
  setTheme()
  themeBtn.addEventListener('click', themeChanger)
}
