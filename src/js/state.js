const state = {}

const setState = (oldState, newState) => {
  return {...oldState, ...newState}
}

export {state, setState}
