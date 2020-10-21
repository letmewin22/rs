import Highway from '@dogstudio/highway'

export default class About extends Highway.Renderer {

  onEnterCompleted() {
    console.log('Hello from About')
  }
  onLeave() {}
}
