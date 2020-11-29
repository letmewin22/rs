import gsap from 'gsap'
import ChangeView from '@/components/ChangeView'
import {state} from '@/state'
import {cloneNode} from '@/utils/cloneNode'
import {resize} from '@/utils/Resize'
import Highway from '@dogstudio/highway'

export default class Distort extends Highway.Transition {
  in({from, to, done}) {
    from.remove()

    const $wrapper = to.querySelector('.case-header__img-wrapper')
    const $cloned = document.querySelector('.js-cloned')

    const glScene = window.scene.figures[state.glTransitionI]
    const glUDistortion = glScene.material.uniforms.uDistortion
    const glUTransition = glScene.material.uniforms.uTransition

    let b

    resize.on(() => {
      b = $wrapper.getBoundingClientRect()
    })

    $wrapper.querySelector('.img').classList.remove('js-webgl-image')
    $wrapper.querySelector('.img').style.visibility = 'hidden'

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
        const imgs = document.querySelectorAll('.js-webgl-image')

        window.scene.$imgs = imgs
        window.scene.updateImages()
        $wrapper.parentNode.appendChild($cloned)
        resize.on(() => {
          $cloned.style.top = b.top + 'px'
          $cloned.style.left = b.left + 'px'
          $cloned.style.width = b.width + 'px'
          $cloned.style.height = b.height + 'px'
        })
        glScene.removeHover()
        $cloned.classList.remove('js-cloned')
        $cloned.style.pointerEvents = 'auto'
        done()
      },
    })
    gsap.to(glUDistortion, {duration: 2, value: 0})
    gsap.to(glUTransition, {duration: 1, value: 1, ease: 'power3.in'})
    gsap.to(glUTransition, {
      duration: 1,
      value: 0,
      delay: 1,
      ease: 'power3.out',
    })
  }

  out({done, trigger}) {
    if (trigger.dataset.index) {
      cloneNode(trigger)
      state.glTransitionI = +trigger.dataset.index - 1
    } else {
      const node = trigger.parentNode.querySelector('[data-index]')
      state.glTransitionI = +node.dataset.index
      cloneNode(node)
    }
    state.glTransition = true
    ChangeView.out(done)
  }
}
