export const cloneNode = ($el) => {
  const b = $el.getBoundingClientRect()

  $el.parentNode.appendChild($el.cloneNode(true))

  document.body.appendChild($el)

  $el.style.cssText = `
    position: fixed;
    top: ${b.top}px;
    left: ${b.left}px;
    width: ${b.width}px;
    height: ${b.height}px;
    z-index: 1000;
  `
  $el.classList.add('js-cloned')
}
