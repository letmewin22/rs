import Highway from '@dogstudio/highway'
import {onLoaded} from '@/utils/onLoaded'
import {CasesStrip} from '@/components/Cases/CasesStrip'
import ChangeView from '@/components/ChangeView'

export default class Cases extends Highway.Renderer {
  onEnterCompleted() {
    onLoaded(() => {
      import(
        /* webpackChunkName: "gl-images" */
        '@/Gl/Images/Scene.js'
      ).then(module => {
        const Scene = module.default
        const imgs = document.querySelectorAll('.js-webgl-image')
        setTimeout(() => {
          window.casesStrip = new CasesStrip()
          ChangeView.in(() => {
            setTimeout(() => {
              window.scene = new Scene('#gl', imgs)
            }, 600)
          })
        }, 210)
      })
    })
  }
  onLeaveComleted() {
    if (!document.querySelector('.js-cloned')) {
      window.scene && window.scene.destroy()
      window.scene = undefined
    }
    window.casesStrip && window.casesStrip.destroy()
    window.casesStrip = undefined
  }
}
