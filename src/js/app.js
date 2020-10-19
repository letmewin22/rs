import './libs/ie-detect'
import './libs/sayHello'

import Highway from '@dogstudio/highway'
import {Home} from './core/renderers'
import {Basic, FromNav} from './core/transitions'
import Hooks from './core/Hooks'

import moveEl from './libs/moveEl'
import cssWebP from '@/libs/testWebP'

import Button from './components/Button'
import Theme from './components/Theme'
import Nav from './components/Nav'
import FormPopUp from './components/FormPopUp'
import Loader from './components/Loader'
import SmoothScroll from './components/SmoothScroll/SmoothScroll'

import NavbarPos from './utils/navbarPos'
import themeBtn from './utils/themeBtn'
import {resize} from './utils/Resize'
import {winH} from './utils/winH'
import {intersectionOvserver} from './utils/intersectionOvserver'
import bgWebP from './utils/bgWebP'

import FormSubmit from './form/FormSubmit'

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
themeBtn()

new Nav()

const formpoup = new FormPopUp()
formpoup.init()

let smoothScroll
const links = document.querySelectorAll('nav a')

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
  smoothScroll && smoothScroll.reset()

})

hooks.useLoad(() => {
  new Loader()
  smoothScroll = new SmoothScroll('#scroll-container')
})

hooks.useBoth(() => {
  links.forEach(link => {
    link.classList.remove('is-active')
    link.href === location.href && link.classList.add('is-active')
  })
})


new FormSubmit(document.querySelector('.form'))


