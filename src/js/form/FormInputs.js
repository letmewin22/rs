export default class FormInputs {

  constructor(form) {
  
    this.form = form
    this.input = this.form.querySelectorAll('.form__input')
    this.phone = this.form.querySelector('[type=tel]')
    this.email = this.form.querySelector('[type=email]')
    
    this.validateText = this.form.querySelector('.form__validate-text')
    
    this.formButton = this.form.querySelector('.btn')
    this.label = this.form.querySelector('.required')

    this.koef = +this.validateText.getAttribute('data-value')

    this.focus()
    this.blur()
    this.reset()

    this.phone.oninput = () => this.onInput()

    this.form.classList.add('activated')

  }

  onInput() {
    this.phone.value = this.phone.value
      .replace(/[A-z]|[А-я]|[*!@#$%^&{}[\]~""/|=]/g, '')
      .replace( /  +/g, ' ' )
    if (this.phone.value.length < this.koef) {
      this.validation()
    } else {
      this.validateText.style.opacity = '0'
      this.label.classList.remove('red')
      this.formButton.classList.remove('red')
    }
  }

  focus() {

    function focus(e) {
      const t = e.target 

      t.classList.add('focus')
      document.body.classList.add('form-focused')
    }

    for (const input of this.input) {
      input.addEventListener('focus', focus)
    }
  }

  blur() {

    function blur(e) {
      const t = e.target 
      if (t.value === '') {
        t.classList.remove('focus')
        document.body.classList.remove('form-focused')
      }
    }

    for (const input of this.input) {
      input.addEventListener('blur', blur)
    }
  }

  reset() {
    document.body.addEventListener('click', () => {
      this.validateText.style.opacity = '0'
      this.label.classList = 'form__label-content'
      this.label.classList.remove('red')
      this.formButton.classList.remove('red')
    })

    this.phone.oninput = () => {
      this.validateText.style.opacity = '0'
      this.label.classList.remove('red')
      this.formButton.classList.remove('red')
    }

    this.formButton.addEventListener('mouseleave', () => {
      this.formButton.classList.remove('red')
    })
  }

}
