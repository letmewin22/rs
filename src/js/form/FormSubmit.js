import FormInputs from './FormInputs.js'
import serialize from './formSend.js'
import {animation} from './animation.js'

export default class FormSubmit extends FormInputs {
  constructor(form) {
    super(form)

    this.form.onsubmit = e => this.submit(e)
  }

  validation() {
    this.form.classList.add('error')
    this.email.focus()
  }

  requestLoad() {
    this.form.reset()
    // window.dataLayer.push({event: 'form_sent'})
    document.body.classList.remove('form-focused')
    for (const input of this.input) {
      input.parentNode.classList.remove('focus')
    }
    animation(this.form)
  }

  async requestSend() {
    const URL = 'https://rstets.emotion-agency.com/'
    const mURL = URL + 'mail.php'

    try {
      const res = await fetch(mURL, {
        method: 'POST',
        body: serialize(this.form),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })

      if (res.status >= 200 && res.status < 400) {
        this.requestLoad()
        return
      } else {
        alert(this.form.getAttribute('data-error'))
      }
    } catch (e) {
      console.log(e)
    }
  }

  submit(e) {
    e.preventDefault()
    if (!this.regExp.test(this.email.value)) {
      this.validation()
    } else {
      this.requestSend()
    }
    return false
  }
}
