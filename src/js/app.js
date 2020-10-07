import Highway from '@dogstudio/highway'
import '@/libs/smoothscroll'

import cssWebP from '@/libs/testWebP'
// import {Home} from './renderers'

cssWebP()
// const H = new Highway.Core({
//   renderers: {
//     home
//   },
//   transitions: {
//     name: CustomTransition,
//     default: OtherTransition
//   }
// })

class Test {
  static variable = 'test'

  constructor() {
    this.init()
  }

  init() {
    console.log('is innited')
  }
}

console.log(Test.variable)
