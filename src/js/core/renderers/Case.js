import Highway from '@dogstudio/highway'
import strip from '@/components/strip'
import {onLoaded} from '@/utils/onLoaded'
import ChangeView from '@/components/ChangeView'
import {EMagic} from '@/components/EMagic'

/**
* @todo
1. web-gl переходы
* */

export default class Case extends Highway.Renderer {
  onEnterCompleted() {
    strip('strip--1', 'strip__wrapper', 20)
    strip('strip--2', 'strip__wrapper', 24, 'right')

    document.querySelectorAll('[data-scroll]').forEach((el) => {
      new EMagic(el)
    })

    onLoaded(() => {
      setTimeout(() => {
        if (!window.scene) {
          import(
            /* webpackChunkName: "gl-images" */
            '@/Gl/Images/Scene.js'
          ).then((module) => {
            const Scene = module.default
            const imgs = document.querySelectorAll('.js-webgl-image')
            window.scene = new Scene('#gl', imgs)
            window.scene.figures[0].removeHover()
            setTimeout(() => ChangeView.in(), 100)
          })
        } else {
          ChangeView.in()
        }
      }, 210)
    })
  }
  onLeaveCompleted() {
    if (!document.querySelector('.js-cloned')) {
      window.scene && window.scene.destroy()
      window.scene = undefined
    }
  }
}
