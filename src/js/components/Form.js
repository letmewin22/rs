import gsap from 'gsap'
import {createNewElement} from '../utils/createNewElement'
import splitting from 'splitting'
import FormPopUp from './FormPopUp'

export const form = () => {
  const form = document.querySelector('.form')
  const btn = document.querySelector('.form__btn')
  const tnx = document.querySelector('.form-thankyou')

  const lines = document.querySelectorAll('.js-fl')

  lines.length &&
    lines.forEach((el) => {
      !el.classList.contains('splitting') &&
        splitting({target: el, by: 'chars'})
    })

  const chars = document.querySelectorAll('.js-fl .char')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const b = btn.getBoundingClientRect()
    const tnxBg = createNewElement('div', 'tnx__bg')
    tnxBg.style.cssText = `
    width: ${b.width}px;
    height: ${b.height}px;
    top: ${b.top}px;
    left: ${b.left}px;
    position: fixed;
    z-index: 1000;
    border-radius: 50%;
    background: var(--acc);
  `
    document.body.appendChild(tnxBg)

    const formpoup = new FormPopUp()
    const tl = gsap.timeline()

    chars.length &&
      tl.set(chars, {
        y: '110%',
        rotationX: 60,
        display: 'inline-block',
      })

    tl.to(tnx, {duration: 0.01, visibility: 'visible'})
    tl.to(tnxBg, {duration: 1, scale: 16, ease: 'power3.out'})

    chars.length &&
      tl.to(
        chars,
        {
          duration: 1,
          y: '0%',
          rotationX: 0,
          ease: 'expo.out',
          stagger: 0.016,
        },
        0.2,
      )

    setTimeout(() => {
      formpoup.close()
      chars.length &&
        tl.to([...chars].reverse(), {
          duration: 1,
          y: '110%',
          rotationX: 60,
          ease: 'expo.in',
          stagger: 0.012,
        })
      tl.to(tnxBg, {duration: 1, scale: 1, opacity: 0, ease: 'power3.out',
        onComplete: () => {
          document.body.removeChild(tnxBg)
          tl.to(tnx, {duration: 0.01, visibility: 'hidden'})
        }})
    }, 5000)
  })
}
