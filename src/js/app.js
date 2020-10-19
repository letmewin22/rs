import './libs/sayHello'

import Highway from '@dogstudio/highway'
import {Home} from './core/renderers'
import {Basic, FromNav} from './core/transitions'
import Hooks from './core/Hooks'

import {raf} from './utils/RAF'
import cssWebP from '@/libs/testWebP'

import Button from './components/Button'
import Theme from './components/Theme'

import NavbarPos from './utils/navbarPos'
import themeBtn from './utils/themeBtn'
import Nav from './components/Nav'
import {intersectionOvserver} from './utils/intersectionOvserver'
import FormPopUp from './components/FormPopUp'
import moveEl from './libs/moveEl'
import {resize} from './utils/Resize'
import {winH} from './utils/winH'
import Loader from './components/Loader'
import FormSubmit from './form/FormSubmit'
import SmoothScroll from './components/SmoothScroll/SmoothScroll'
import bgWebP from './utils/bgWebP'


process.env.NODE_ENV === 'production' && cssWebP()


const H = new Highway.Core({
  renderers: {
    home: Home,
  },
  transitions: {
    default: Basic,
    contextual: {
      nav: FromNav
    }
  }
})

const hooks = new Hooks(H)

resize.on(winH)
new Theme()

const navbarPos = new NavbarPos()
navbarPos.init()
raf.on(themeBtn)

new Nav()

const formpoup = new FormPopUp()
formpoup.init()


hooks.useBothStart(() => {
  bgWebP()
  moveEl()
  const sections = [
    ...document.querySelectorAll('header'),
    ...document.querySelectorAll('.section'),
    ...document.querySelectorAll('footer'),
  ]
  sections.forEach((section) => {
    intersectionOvserver(section).on()
  })

  const btns = document.querySelectorAll('.js-sticky')

  btns.forEach((btn) => {
    new Button(btn)
  })
})

hooks.useLoad(() => {
  new Loader()
  new SmoothScroll('#scroll-container')
})


new FormSubmit(document.querySelector('.form'))


