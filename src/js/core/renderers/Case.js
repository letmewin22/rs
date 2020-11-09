import Highway from '@dogstudio/highway'
import strip from '@/components/strip'

export default class Case extends Highway.Renderer {

  onEnterCompleted() {
    strip('strip--1', 'strip__wrapper', 20)
    strip('strip--2', 'strip__wrapper', 24, 'right')
  }
  onLeave() {}
}
