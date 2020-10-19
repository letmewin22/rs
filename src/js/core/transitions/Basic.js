import Highway from '@dogstudio/highway'
import ChangeView from '@/components/ChangeView'

// Fade
class Basic extends Highway.Transition {
  in({from, done}) {
    // Reset Scroll
    window.scrollTo(0, 0)
    ChangeView.in(done)
    // Remove Old View
    from.remove()
    // Animation
  }

  out({done}) {
    ChangeView.out(done)
  }
}

export default Basic
