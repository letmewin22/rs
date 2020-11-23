import Highway from '@dogstudio/highway'
import strip from '@/components/strip'
import {onLoaded} from '@/utils/onLoaded'
import {Parallax} from '@/components/Parallax'
import ChangeView from '@/components/ChangeView'

export default class About extends Highway.Renderer {
  onEnterCompleted() {
    strip('strip--white', 'strip__wrapper', 20)
    strip('strip--blue', 'strip__wrapper', 24, 'right')

    onLoaded(() => {
      import(
        /* webpackChunkName: "gl-torus" */
        '@/Gl/Torus/Scene.js'
      ).then((module) => {
        const Scene = module.default
        window.scene = new Scene('#gl-torus')
        ChangeView.in()
      })

      this.parallax = new Parallax()
    })
  }
  onLeaveCompleted() {
    window.scene.destroy()
    window.scene = undefined
    this.parallax.destroy()
  }
}
