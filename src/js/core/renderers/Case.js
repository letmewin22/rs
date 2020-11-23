import Highway from '@dogstudio/highway'
import strip from '@/components/strip'
import {onLoaded} from '@/utils/onLoaded'
import ChangeView from '@/components/ChangeView'
import {EMagic} from '@/components/EMagic'

export default class Case extends Highway.Renderer {
  onEnterCompleted() {
    strip('strip--1', 'strip__wrapper', 20)
    strip('strip--2', 'strip__wrapper', 24, 'right')
    onLoaded(() => ChangeView.in())

    document.querySelectorAll('.e-magic-section').forEach((el) => {
      new EMagic(el)
    })
  }
  onLeave() {}
}
