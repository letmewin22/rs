/*eslint-disable*/

const serialize = function(form) {

  const serialized = []

  for (let i = 0; i < form.elements.length; i++) {

    const field = form.elements[i]

    if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue

    if (field.type === 'select-multiple') {
      for (let n = 0; n < field.options.length; n++) {
        if (!field.options[n].selected) continue
        serialized.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.options[n].value))
      }
    } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
      serialized.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value))
    }
  }

  return serialized.join('&')

}


export default serialize


