import Highway from '@dogstudio/highway'
import strip from '@/components/strip'

export default class About extends Highway.Renderer {

  onEnterCompleted() {
    strip('strip--white', 'strip__wrapper', 20)
    strip('strip--blue', 'strip__wrapper', 24, 'right')
  }
  onLeave() {}
}
