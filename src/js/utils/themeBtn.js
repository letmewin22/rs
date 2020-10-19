import {state} from '../state'
import {isFixed} from './isFixed'
import {raf} from './RAF'

const themeBtn = () => {
  const b = document.getElementById('scroll-container').getBoundingClientRect()

  if (state.scrolled + window.innerHeight >= b.height * 0.94 && !isFixed()) {
    document.querySelector('.theme-btn').classList.add('disabled')
  } else {
    document.querySelector('.theme-btn').classList.remove('disabled')
  }
}

raf.on(themeBtn)

export default themeBtn
