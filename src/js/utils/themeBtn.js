import {isFixed} from './isFixed'

const themeBtn = () => {
  const b = document.getElementById('scroller').getBoundingClientRect()
  if (-b.y + window.innerHeight >= b.height * 0.94 && !isFixed()) {
    document.querySelector('.theme-btn').classList.add('disabled')
  } else {
    document.querySelector('.theme-btn').classList.remove('disabled')
  }
  window.requestAnimationFrame(themeBtn)
}

export default themeBtn
