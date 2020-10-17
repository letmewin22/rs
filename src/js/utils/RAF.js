export default class RAF {
  constructor() {
    this.cbArray = []
    this.animation()
  }

  on(cb) {
    this.cbArray.push(cb)
  }

  off(cb) {
    this.cbArray = this.cbArray.filter(e => e.toString() !== cb.toString())
    console.log(cb)
  }

  animation() {
    this.cbArray.forEach(cb => cb())
    requestAnimationFrame(this.animation.bind(this))
  }
}
