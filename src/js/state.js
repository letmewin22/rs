const state = {
  isLoaded: false,
  scollbar: false,
  target: 0,
  popup: true
}

const setState = (oldState, newState) => {
  return {...oldState, ...newState}
}

export {state, setState}
