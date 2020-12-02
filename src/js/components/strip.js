import gsap from 'gsap'

const strip = (el, elLines, duration, dir = 'left') => {
  const element = document.querySelectorAll('.' + el)

  const x = dir === 'left' ? '-50%' : '50%'

  element.forEach(elem => {
    elem.classList.add('repeat-activated')
    const tl = gsap.timeline({repeat: -1})
    tl.to(elem.querySelector('.' + elLines), {
      duration,
      x,
      ease: 'none',
    })
    tl.to(elem.querySelector('.' + elLines), {
      duration: 0,
      x: '0%',
      ease: 'none',
    })
  })
}

export default strip
