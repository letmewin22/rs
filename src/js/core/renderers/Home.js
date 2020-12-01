import Highway from '@dogstudio/highway'
import strip from '@/components/strip'
import {onLoaded} from '@/utils/onLoaded'
import {Parallax} from '@/components/Parallax'
import ChangeView from '@/components/ChangeView'

class Home extends Highway.Renderer {
  onEnterCompleted() {
    if (screen.width > 960) {
      document.querySelector('.h1-withcols__img').innerHTML += `
        <img width="600" height="600" 
        class="inline-img__img inline-img__img--2" 
        data-pli src="./img/home/header2.gif" alt="cat-gif"/>`
    }

    strip('strip--white', 'strip__wrapper', 20)
    strip('strip--blue', 'strip__wrapper', 24, 'right')

    onLoaded(() => {
      import(
        /* webpackChunkName: "gl-images" */
        '@/Gl/Images/Scene.js'
      ).then(module => {
        const Scene = module.default
        const imgs = document.querySelectorAll('.js-webgl-image')
        setTimeout(() => {
          window.scene = new Scene('#gl', imgs)
          setTimeout(() => ChangeView.in(), 100)
        }, 210)
      })

      this.parallax = new Parallax()
    })
  }
  onLeaveCompleted() {
    if (!document.querySelector('.js-cloned')) {
      window.scene && window.scene.destroy()
      window.scene = undefined
    }

    this.parallax.destroy()
  }
}
// Don`t forget to export your renderer
export default Home
