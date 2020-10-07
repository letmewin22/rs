import Highway from '@dogstudio/highway'
import '@/libs/smoothscroll'

import cssWebP from '@/libs/testWebP'
import splitting from 'splitting'
import gsap from 'gsap'
import Button from './components/Button'
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

// const h1Lines = document.querySelectorAll('.h1-withcols__line')


// h1Lines.forEach((el) => {
//   splitting({target: el, by: 'chars'})
// })
// window.addEventListener('load', () => {
//   const tl = gsap.timeline()

//   tl.to(document.querySelectorAll('.char'), {
//     duration: 1,
//     y: 0,
//     ease: 'expo.out',
//     stagger: 0.016,
//   })
// })

new Button(document.querySelector('.js-sticky'))

// document.querySelectorAll('.h2-withcols__line').forEach(el => {
//   splitting({target: el, by: 'chars'})
// })


