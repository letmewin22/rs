import Highway from '@dogstudio/highway'
import ChangeView from '@/components/ChangeView'
import gsap from 'gsap'

// Fade
class Basic extends Highway.Transition {
  in({to, from, done}) {
    // Reset Scroll
    window.scrollTo(0, 0)
    // Remove Old View
    from.remove()
    gsap.fromTo(to, {opacity: 0}, {opacity: 1, duration: 0.1, onComplete: done})

    // Animation
  }

  out({done}) {
    ChangeView.out(done)
    // done()
  }
}

export default Basic
