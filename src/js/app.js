import Highway from '@dogstudio/highway'
import '@/libs/smoothscroll'

import cssWebP from '@/libs/testWebP'
import Button from './components/Button'
import Theme from './components/Theme'
import strip from './components/strip'
// import ScrollBar from './components/Scrollbar'
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
import RAF from './utils/RAF'
// import SmoothScroll from './components/SmoothScroll'
// import SmoothScroll2 from './components/SmoothScroll2'
// import gsap from 'gsap'
// import SmoothScroll from './components/SmoothScroll'

window.raf = new RAF()
/**
@todo
Сделать смузскролл, как в референсе
*/

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
  // new SmoothScroll2()
})
const btns = document.querySelectorAll('.js-sticky')

btns.forEach((btn) => {
  new Button(btn)
})

new Theme()

strip('strip--white', 'strip__wrapper', 20)
strip('strip--blue', 'strip__wrapper', 24, 'right')

// new ScrollBar()

// eslint-disable-next-line max-len
// const si = document.querySelectorAll('.custom:not(html):not(#scroll-container)')

// si.forEach((el) => {
//   new ScrollBar(el)
// })

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

// const clamp = (num, a, b) => {
//   return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b))
// }

// let current = 0
// const elem = document.querySelector('#scroller')

// for (let i = 0; i < sections.length; i++) {
//   const el = sections[i]

//   if (!el.classList.contains('home-header')) {
//     el.style.transform = `translate3d(0, ${
//       el.getBoundingClientRect().height
//     }px, 0)`
//   }

//   el.addEventListener(
//     'wheel',
//     (e) => {
//       e.preventDefault()

//       const min = 0
//       const max = el.offsetHeight
//       const res =
//         el.getBoundingClientRect().y +
//         el.getBoundingClientRect().height -
//         el.getBoundingClientRect().height
//       const res2 =
//       sections[i + 1].getBoundingClientRect().y +
//       sections[i + 1].getBoundingClientRect().height -
//       sections[i + 1].getBoundingClientRect().height
//       current = e.deltaY + 40
//       const result = res - current
//       const result2 = res2 - current
//       // result = clamp(result, -max, min)
//       // result2 = clamp(result2, -max, min)

//       gsap.to(el, {
//         duration: 0.8,
//         y: result,
//         onUpdate: () => {
//           el.style.willChange = 'transform'
//           // window.scene && window.scene.updatePos(-current)
//         },
//       })

//       gsap.to(sections[i + 1], {
//         duration: 0.8,
//         y: result2,
//         onUpdate: () => {
//           el.style.willChange = 'transform'
//           // window.scene && window.scene.updatePos(-current)
//         },
//       })
//     },
//     {passive: false},
//   )

//   // el.style.transform = `translate3d(0, -${current}px, 0)`
//   // gsap.to(el, {
//   //   duration: 0.8,
//   //   y: -current,
//   //   ease: 'sine.out',
//   //   onUpdate: () => {
//   //     el.style.willChange = 'transform'
//   //     window.scene && window.scene.updatePos(-current)
//   //   }})
// }
