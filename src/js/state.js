const state = {
  isLoaded: false
}

const setState = (oldState, newState) => {
  return {...oldState, ...newState}
}

export {state, setState}
