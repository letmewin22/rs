import ChangeView from '@/components/ChangeView'
import {state} from '@/state'
import {cloneNode} from '@/utils/cloneNode'
import Highway from '@dogstudio/highway'
import gsap from 'gsap'

export default class Distort extends Highway.Transition {
  in({from, to, done}) {
    from.remove()

    const $wrapper = to.querySelector('.case-header__img-wrapper')
    const $sc = document.querySelector('#scroll-container')
    const $cloned = document.querySelector('.js-cloned')

    const glScene = window.scene.figures[state.glTransitionI]
    const glUniform = glScene.material.uniforms.uDistortion

    const b = $wrapper.getBoundingClientRect()

    $wrapper.style.width = Math.round(+b.width) + 'px'
    $wrapper.style.height = Math.round(+b.height) + 'px'

    $wrapper.querySelector('.img').style.display = 'none'

    gsap.to($cloned, {
      duration: 1.5,
      width: b.width,
      top: b.top,
      left: b.left,
      height: b.height,
      pointerEvents: 'none',
      ease: 'power3.inOut',
      onComplete: () => {
        state.glTransition = false
        $sc.appendChild($cloned)
        done()
      },
    })
    gsap.to(glUniform, {duration: 2, value: 0})
  }

  out({done, trigger}) {
    cloneNode(trigger)
    state.glTransition = true
    state.glTransitionI = +trigger.dataset.index - 1
    ChangeView.out(done)
  }
}
