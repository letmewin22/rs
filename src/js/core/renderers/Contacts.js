import Highway from '@dogstudio/highway'
import ChangeView from '@/components/ChangeView'
import {onLoaded} from '@/utils/onLoaded'

class Contacts extends Highway.Renderer {
  onEnterCompleted() {
    onLoaded(() => ChangeView.in())
  }
}
// Don`t forget to export your renderer
export default Contacts
