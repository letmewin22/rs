import {setState, state} from '@/state'

export const run = (el, pos) => {
  const t = `matrix3d(1, 0, 0, 0, 
      0, 1, 0, 0,
      0, 0, 1, 0, 
      0, ${pos}, 0, 1)`

  el.style.transform = t
  el.style.willChange = 'transform'
  setState(state, (state.scrolled = -pos))
}
