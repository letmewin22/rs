export const intersectionOvserver = (el, cb) => {

  cb = cb ?? function() {}
  const b = el.getBoundingClientRect()

  if (b.top < window.innerHeight && -b.top <= b.height) {
    if (!el.classList.contains('js-in-view')) {
      el.classList.add('js-in-view')
      cb()
    }
  } else {
    el.classList.contains('js-in-view') && el.classList.remove('js-in-view')
  }
  const raf = requestAnimationFrame(intersectionOvserver.bind(null, el, cb))

  return () => cancelAnimationFrame(raf)
}
