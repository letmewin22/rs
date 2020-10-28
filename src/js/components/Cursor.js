import {createNewElement} from '../utils/createNewElement'
import {lerp} from '../utils/math'
import {raf} from '../utils/RAF'

export class Cursor {
  constructor() {
    this.$cursor = createNewElement('div', 'cursor-follower')
    document.body.appendChild(this.$cursor)
    this.cursorBounds = this.$cursor.getBoundingClientRect()

    this.mouse = {
      x: 0,
      y: 0,
      destX: 0,
      destY: 0
    }

    this.init()
  }

  bind() {
    ['onMouseMove', 'animate'].forEach(fn => {
      this[fn] = this[fn].bind(this)
    })
  }

  init() {

    this.bind()
    window.addEventListener('mousemove', this.onMouseMove)
    raf.on(this.animate)
  }

  onMouseMove(e) {
    this.mouse.x = e.clientX - (this.cursorBounds.width / 2)
    this.mouse.y = e.clientY - (this.cursorBounds.width / 2)

    const target = e.target
    const parent = target.closest('.hide-cursor')
    if (target.classList.contains('.hide-cursor') || parent) {
      this.$cursor.classList.add('hide')
    } else {
      this.$cursor.classList.remove('hide')
    }
  }

  animate() {
    this.mouse.destX = lerp(this.mouse.destX, this.mouse.x, 0.08)
    this.mouse.destY = lerp(this.mouse.destY, this.mouse.y, 0.08)
    this.$cursor.style.transform = `matrix3d(1, 0, 0, 0, 
      0, 1, 0, 0,
      0, 0, 1, 0, 
      ${this.mouse.destX}, ${this.mouse.destY}, 0, 1)`
  }

  destroy() {
    window.removeEventListener('mousemove', this.onMouseMove)
    raf.off(this.animate)
  }
}
