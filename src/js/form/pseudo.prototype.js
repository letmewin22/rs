export default function pseudoPrototype() {
  HTMLElement.prototype.pseudoStyle = function(element, prop, value) {
    const _this = this
    const _sheetId = 'pseudoStyles'
    const _head = document.head || document.getElementsByTagName('head')[0]
    const _sheet = document.getElementById(_sheetId) || document.createElement('style')
    _sheet.id = _sheetId
    const className = 'pseudoStyle'

    _this.className += ' '+className

    _sheet.innerHTML += '\n.'+className+':'+element+'{'+prop+':'+value+'}'
    _head.appendChild(_sheet)
    return this
  }
}

