const state = {
  isLoaded: false,
  scollbar: false,
  target: 0,
  popup: true,
  glTransition: false,
  glTransitionI: 0,
}

const setState = (oldState, newState) => {
  return {...oldState, ...newState}
}

export {state, setState}
