import Highway from '@dogstudio/highway'
import '@/libs/smoothscroll'

import cssWebP from '@/libs/testWebP'
import splitting from 'splitting'
import gsap from 'gsap'
import Button from './components/Button'
import Theme from './components/Theme'
import strip from './components/strip'
import ScrollBar from './components/Scrollbar'
import NavbarPos from './utils/navbarPos'
import themeBtn from './utils/themeBtn'
// import {Home} from './renderers'

cssWebP()
// const H = new Highway.Core({
//   renderers: {
//     home
//   },
//   transitions: {
//     name: CustomTransition,
//     default: OtherTransition
//   }
// })
// window.addEventListener('load', () => {
//   const h1Lines = document.querySelectorAll('.h1-withcols__line')

//   h1Lines.forEach((el) => {
//     splitting({target: el, by: 'chars'})
//   })

//   const tl = gsap.timeline()

//   tl.to(document.querySelectorAll('.char'), {
//     duration: 1,
//     y: 0,
//     rotationX: 0,
//     ease: 'expo.out',
//     stagger: 0.016,
//   })
// })
const btns = document.querySelectorAll('.js-sticky')

btns.forEach(btn => {
  new Button(btn)
})


// document.querySelectorAll('.h2-withcols__line').forEach(el => {
//   splitting({target: el, by: 'chars'})
// })

new Theme()

strip('strip--white', 'strip__wrapper', 20)
strip('strip--blue', 'strip__wrapper', 24, 'right')

new ScrollBar()

const si = document.querySelectorAll('.custom:not(html):not(#scroll-container)')

si.forEach(el => {
  new ScrollBar(el)
})

const navbarPos = new NavbarPos()

navbarPos.init()

themeBtn()


