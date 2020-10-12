export default function pseudoPrototype() {
  HTMLElement.prototype.pseudoStyle = function(element,prop,value) {
    let _this = this
    let _sheetId = 'pseudoStyles'
    let _head = document.head || document.getElementsByTagName('head')[0]
    let _sheet = document.getElementById(_sheetId) || document.createElement('style')
    _sheet.id = _sheetId
    let className = 'pseudoStyle'
  
    _this.className += ' '+className 
  
    _sheet.innerHTML += '\n.'+className+':'+element+'{'+prop+':'+value+'}'
    _head.appendChild(_sheet)
    return this
  }
}

