import Resize from '../utils/Resize'

export const circle = () => {
  const container = document.querySelector('.js-c-container')
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  let s
  let x
  let y
  let radius

  container.appendChild(canvas)

  const resize = new Resize(() => {
    s = {
      width: container.getBoundingClientRect().width,
      height: container.getBoundingClientRect().height,
    }

    canvas.setAttribute('width', s.width)
    canvas.setAttribute('height', s.height)

    x = s.width / 2
    y = s.height / 2
    radius = x
    ctx.clearRect(0, 0, s.width, s.height)

  })

  resize.init()


  const endPercent = 101
  let curPerc = 0

  const circ = Math.PI * 2
  const quart = Math.PI / 2

  ctx.lineWidth = 1
  ctx.strokeStyle = '#ffffff'

  function animate(current) {
    current /= 100
    ctx.clearRect(0, 0, s.width, s.height)
    ctx.beginPath()
    ctx.arc(x, y, radius, -quart, circ * current - quart, false)
    ctx.stroke()
    curPerc++
    if (curPerc < endPercent) {
      requestAnimationFrame(function() {
        animate(curPerc)
      })
    }
  }

  animate()
}
