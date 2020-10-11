export default class ScrollInView {

  constructor(elements, callback, offset) {

    this.elements = elements || []
    this.callback = callback

    this.offset = offset

    this.inView()
    const rafF = () => new ScrollInView(elements, callback, offset)
    window.requestAnimationFrame(rafF)
  }

  inView() {

    this.elements.forEach(elem => {
      
      const elemTop = elem.getBoundingClientRect().top
      if (elemTop <= window.innerHeight * this.offset && elemTop > 0) {
        if (!elem.classList.contains('activated')) {

          elem.classList.add('activated')
          this.callback(elem)
        }
      }
    })
  }
}
