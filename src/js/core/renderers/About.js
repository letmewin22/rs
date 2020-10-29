import Highway from '@dogstudio/highway'
import strip from '@/components/strip'
import Scene from '@/Gl/Torus/Scene'
import {onLoaded} from '@/utils/onLoaded'
import {Parallax} from '../../components/Parallax'

export default class About extends Highway.Renderer {

  onEnterCompleted() {
    strip('strip--white', 'strip__wrapper', 20)
    strip('strip--blue', 'strip__wrapper', 24, 'right')

    onLoaded(() => {
      window.scene = new Scene('#gl-torus')
      this.parallax = new Parallax()
    })
  }
  onLeaveCompleted() {
    window.scene.destroy()
    window.scene = undefined
    this.parallax.destroy()
  }
}
