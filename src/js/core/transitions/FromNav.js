import Highway from '@dogstudio/highway'
import ChangeView from '@/components/ChangeView'
import gsap from 'gsap'

// Fade
class FromNav extends Highway.Transition {
  in({to, from, done}) {
    // Reset Scroll
    window.scrollTo(0, 0)
    // Remove Old View
    from.remove()

    gsap.set(to, {opacity: 0})
    setTimeout(() => {
      gsap.fromTo(to, {opacity: 0}, {opacity: 1, duration: 0.1})
      ChangeView.in(done)
    }, 1200)
    // Animation
  }
  out({done}) {
    done()
  }
}

export default FromNav
