import noop from './noop'

export const intersectionOvserver = (el, cb) => {

  cb = cb ?? noop
  const b = el.getBoundingClientRect()

  if (b.top <= window.innerHeight && -b.top <= b.height) {
    if (!el.classList.contains('js-in-view')) {
      el.classList.add('js-in-view')
      cb()
    }
  } else {
    el.classList.contains('js-in-view') && el.classList.remove('js-in-view')
  }

  return {
    on: () => window.raf.on(intersectionOvserver.bind(null, el, cb)),
    off: () => window.raf.off(intersectionOvserver.bind(null, el, cb))
  }
}
