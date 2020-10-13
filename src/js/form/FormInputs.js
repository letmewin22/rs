export default class FormInputs {

  constructor(form) {

    this.form = form
    this.input = this.form.querySelectorAll('.form__input')
    this.email = this.form.querySelector('[type=email]')
    this.phone = this.form.querySelector('[type=tel]')
    this.btn = this.form.querySelector('.btn')
    this.focus()
    this.blur()
    this.reset()
    this.regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    this.email.oninput = () => this.onInput()
    this.phone.oninput = () => this.onPhoneInput()

    this.form.classList.add('activated')

  }

  onPhoneInput() {
    this.phone.value = this.phone.value
      .replace(/[A-z]|[А-я]|[*!@#$%^&{}[\]~""/|=]/g, '')
      .replace( /  +/g, ' ' )
  }

  onInput() {
    if (!this.regExp.test(this.email.value)) {
      this.validation()
    } else {
      this.form.classList.remove('error')
    }
  }

  focus() {

    function focus(e) {
      const t = e.target

      t.parentNode.classList.add('focus')
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
        t.parentNode.classList.remove('focus')
        document.body.classList.remove('form-focused')
      }
    }

    for (const input of this.input) {
      input.addEventListener('blur', blur)
    }
  }

  reset() {
    document.body.addEventListener('click', () => {
      this.form.classList.remove('error')
    })

    this.phone.oninput = () => {
      this.form.classList.remove('error')
    }
  }

}
