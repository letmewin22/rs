import Highway from '@dogstudio/highway'

import RAF from './utils/RAF'
import cssWebP from '@/libs/testWebP'

import Button from './components/Button'
import Theme from './components/Theme'
import strip from './components/strip'
import NavbarPos from './utils/navbarPos'
import themeBtn from './utils/themeBtn'
import Nav from './components/Nav'
import {intersectionOvserver} from './utils/intersectionOvserver'
import {Home} from './core/renderers'
import FormPopUp from './components/FormPopUp'
import moveEl from './libs/moveEl'
import Resize from './utils/Resize'
import {winH} from './utils/winH'
import Loader from './components/Loader'
import FormSubmit from './form/FormSubmit'
import SmoothScroll from './components/SmoothScroll/SmoothScroll'

window.raf = new RAF()

cssWebP()
// const H =
new Highway.Core({
  renderers: {
    home: Home,
  },
  //   transitions: {
  //     name: CustomTransition,
  //     default: OtherTransition
  //   }
})

const resize = new Resize(() => {
  winH()
})
resize.init()

window.addEventListener('load', () => {
  new Loader()
  moveEl()
  new SmoothScroll('#scroll-container')
})
const btns = document.querySelectorAll('.js-sticky')

btns.forEach((btn) => {
  new Button(btn)
})

new Theme()

strip('strip--white', 'strip__wrapper', 20)
strip('strip--blue', 'strip__wrapper', 24, 'right')

const navbarPos = new NavbarPos()

navbarPos.init()

window.raf.on(themeBtn)

new Nav()

const formpoup = new FormPopUp()
formpoup.init()

const sections = [
  document.querySelector('header'),
  ...document.querySelectorAll('.section'),
  document.querySelector('footer'),
]

sections.forEach((section) => {
  intersectionOvserver(section).on()
})

new FormSubmit(document.querySelector('.form'))


