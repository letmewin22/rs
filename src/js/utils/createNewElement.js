export const createNewElement = (tag, classes) => {
  const elem = document.createElement(tag)
  elem.classList.add(classes)

  return elem
}
