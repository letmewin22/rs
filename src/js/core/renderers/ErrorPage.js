import Highway from '@dogstudio/highway'
import ChangeView from '@/components/ChangeView'
import {onLoaded} from '@/utils/onLoaded'
import strip from '@/components/strip'

class ErrorPage extends Highway.Renderer {
  onEnterCompleted() {
    strip('strip--white', 'strip__wrapper', 20)
    strip('strip--blue', 'strip__wrapper', 24, 'right')
    onLoaded(() => ChangeView.in())
  }
}
// Don`t forget to export your renderer
export default ErrorPage
