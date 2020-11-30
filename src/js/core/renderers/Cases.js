import Highway from '@dogstudio/highway'
import {onLoaded} from '@/utils/onLoaded'
import ChangeView from '@/components/ChangeView'
import {CasesStrip} from '@/components/CasesStrip'

export default class Cases extends Highway.Renderer {
  onEnterCompleted() {
    onLoaded(() => ChangeView.in())

    new CasesStrip()
  }
  onLeave() {}
}
