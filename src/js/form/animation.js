import gsap from 'gsap'

const animation = (el) => {

  const btn = el 
  const href = document.documentElement.getAttribute('data-site-url') + '/wp-content/themes/ktl/'

  const audio = new Audio(href + 'audio/success.mp3')
  const audioEnd = new Audio(href + 'audio/success_end.mp3')
  audio.volume = 0.5
  audioEnd.volume = 0.5

  const styles = {
    top: btn.getBoundingClientRect().top,
    left: btn.getBoundingClientRect().left,
    width: btn.getBoundingClientRect().width,
    height: btn.getBoundingClientRect().height,
    backgroundColor: window.getComputedStyle(btn).backgroundColor,
  }

  const duplicate = document.createElement('div')
  const thanksText = document.createElement('span')

  thanksText.innerHTML = `<span>${btn.closest('form').getAttribute('data-success')}</span>`

  duplicate.classList.add('btn__suc')
  thanksText.classList.add('btn__thanks-text')

  document.body.classList.add('e-fixed')
  document.querySelector('.contacts-pop-up-section').classList.add('e-fixed')

  duplicate.style.cssText = `
  position: absolute;
  top: ${styles.top}px;
  left: ${styles.left}px;
  width: ${styles.width}px;
  height: ${styles.height}px;
  background-color: ${styles.backgroundColor};
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: bottom;
  `

  thanksText.style.cssText = `
    display: block;
    position: absolute;
    top: ${styles.top + 30}px;
    left: ${styles.left}px;
    width: ${styles.width}px;
    overflow: hidden;
    z-index: 10000;
    text-align: center;
    color: #27AE60;
  `
  document.body.appendChild(duplicate)
  document.body.appendChild(thanksText)

  thanksText.querySelector('span').style.transform = 'translateY(100%)'
  thanksText.querySelector('span').style.display = 'block'

  btn.style.cssText = `
  opacity: 0;
  visibility: hidden;`

  const tl = gsap.timeline({
    onComplete: () => {

      document.body.removeChild(duplicate)
      document.body.removeChild(thanksText)

      document.body.classList.remove('e-fixed')
      document.querySelector('.contacts-pop-up-section').classList.remove('e-fixed')
    }
  })
  tl.to(duplicate, { duration: 0.4, scaleY: 0.1, ease: 'circ.inOut' }, 0)
  tl.to(thanksText.querySelector('span'), { duration: 0.7, y: '0%', ease: 'circ.inOut' }, 0.2)
  tl.to(thanksText.querySelector('span'), { duration: 0.7, y: '100%', ease: 'circ.inOut'}, 3.5)
  tl.to(duplicate, { duration: 0.4, transformOrigin: 'right bottom', scaleX: 0, ease: 'circ.inOut' }, 3.9)
  tl.to(btn, { duration: 0.01, visibility: 'visible' }, 4.5)
  tl.to(btn, { duration: 1, opacity: 1 }, 4.51)

  audio.play()

  setTimeout(() => {
    audioEnd.play()
  }, 3700)
}

export default animation
