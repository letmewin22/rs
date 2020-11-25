import Highway from '@dogstudio/highway'
import gsap from 'gsap'

class FromNav extends Highway.Transition {
  in({to, from, done}) {
    window.scrollTo(0, 0)

    from.remove()

    gsap.set(to, {opacity: 0})
    setTimeout(() => {
      gsap.fromTo(to, {opacity: 0}, {opacity: 1, duration: 0.1})
      done()
    }, 1200)
  }
  out({done}) {
    done()
  }
}

export default FromNav
