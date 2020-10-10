import Highway from '@dogstudio/highway'
import '@/libs/smoothscroll'

import cssWebP from '@/libs/testWebP'
import Button from './components/Button'
import Theme from './components/Theme'
import strip from './components/strip'
import ScrollBar from './components/Scrollbar'
import NavbarPos from './utils/navbarPos'
import themeBtn from './utils/themeBtn'
import Nav from './components/Nav'
import ChangeView from './components/ChangeView'
import {intersectionOvserver} from './utils/intersectionOvserver'
import {Home} from './core/renderers'
import FormPopUp from './components/FormPopUp'
import {form} from './components/Form'
import moveEl from './libs/moveEl'

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

window.addEventListener('load', () => {
  ChangeView.in()
  moveEl()
})
const btns = document.querySelectorAll('.js-sticky')

btns.forEach((btn) => {
  new Button(btn)
})

new Theme()

strip('strip--white', 'strip__wrapper', 20)
strip('strip--blue', 'strip__wrapper', 24, 'right')

new ScrollBar()

const si = document.querySelectorAll('.custom:not(html):not(#scroll-container)')

si.forEach((el) => {
  new ScrollBar(el)
})

const navbarPos = new NavbarPos()

navbarPos.init()

themeBtn()

new Nav()

const formpoup = new FormPopUp()
formpoup.init()

const sections = [
  ...document.querySelectorAll('.section'),
  document.querySelector('header'),
  document.querySelector('footer'),
]

sections.forEach((section) => {
  intersectionOvserver(section)
})


form()
