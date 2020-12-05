import gsap from 'gsap'
import splitting from 'splitting'
import noop from '@/utils/noop'

export default class ChangeView {
  static prepare(cb) {
    cb = typeof cb !== undefined ? cb : noop

    const hidden = [...document.querySelectorAll('.js-i-hidden')]
    let lines

    if (hidden.length) {
      lines = document.querySelectorAll('.js-i-hidden .js-l')
    } else {
      lines = document.querySelectorAll('.js-in-view .js-l')
    }

    lines.length &&
      lines.forEach(el => {
        !el.classList.contains('splitting') &&
          splitting({target: el, by: 'chars'})
      })
    cb
  }

  static in(cb) {
    this.prepare(cb)
    const hidden = [...document.querySelectorAll('.js-i-hidden')]
    let chars
    let i
    let hr
    let vr
    let st

    if (hidden.length) {
      chars = document.querySelectorAll('.js-i-hidden .char')
      i = document.querySelectorAll('.js-i-hidden .js-i')
      hr = document.querySelectorAll('.js-i-hidden .js-hr')
      vr = document.querySelectorAll('.js-i-hidden .js-vr')
      st = document.querySelector('.js-i-hidden .js-st')
      hidden.forEach(el => el.classList.remove('js-i-hidden'))
    } else {
      chars = document.querySelectorAll('.js-in-view .char')
      i = document.querySelectorAll('.js-in-view .js-i')
      hr = document.querySelectorAll('.js-in-view .js-hr')
      vr = document.querySelectorAll('.js-in-view .js-vr')
      st = document.querySelector('.js-in-view .js-st')
    }
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.pointerEvents = 'auto'
        cb && cb()
      },
    })

    const set = {
      y: '110%',
      rotationX: 60,
    }

    const charsTo = {
      y: '0%',
      rotationX: 0,
    }

    if (screen.width <= 1024) {
      set.opacity = '0'
      charsTo.opacity = 1
    }

    chars.length && tl.set(chars, set)

    i.length &&
      tl.set(i, {
        opacity: 0,
        y: 40,
      })

    hr.length &&
      tl.set(hr, {
        opacity: 0,
        width: 0,
      })

    vr.length &&
      tl.set(vr, {
        opacity: 0,
        height: 0,
      })

    st &&
      tl.set(st, {
        opacity: 0,
        visibility: 'hidden',
      })

    chars.length &&
      chars[0].closest('.h2') &&
      tl.to(chars[0].closest('.h2'), {
        duration: 0.1,
        opacity: 1,
      })

    chars.length &&
      chars[0].closest('.h1') &&
      tl.to(chars[0].closest('.h1'), {
        duration: 0.1,
        opacity: 1,
      })

    st &&
      tl.to(st, {
        duration: 1,
        opacity: 1,
        visibility: 'visible',
      })

    chars.length &&
      tl.to(
        chars,
        Object.assign(
          {
            duration: 1,
            ease: 'expo.out',
            stagger: 0.016,
          },
          charsTo
        )
      )

    window.scene && window.scene.show()
    window.casesStrip && window.casesStrip.in()

    i.length &&
      tl.to(
        i,
        {
          duration: 1,
          opacity: 1,
          y: 0,
          ease: 'expo.out',
          stagger: 0.12,
        },
        0.2
      )

    hr.length &&
      tl.to(
        hr,
        {
          duration: 1,
          opacity: 1,
          width: '100%',
          ease: 'expo.out',
          stagger: 0.12,
        },
        0.2
      )

    vr.length &&
      tl.to(
        vr,
        {
          duration: 1,
          opacity: 1,
          height: '100%',
          ease: 'expo.out',
          stagger: 0.12,
        },
        0.2
      )
  }
  static out(cb) {
    this.prepare(cb)

    document.querySelectorAll('.js-in-view').forEach(el => {
      el.classList.add('js-i-hidden')
    })

    const chars = [...document.querySelectorAll('.js-in-view .char')].reverse()
    const i = document.querySelectorAll('.js-in-view .js-i')
    const hr = document.querySelectorAll('.js-in-view .js-hr')
    const vr = document.querySelectorAll('.js-in-view .js-vr')
    const st = document.querySelector('.js-in-view .js-st')

    const tl = gsap.timeline({onComplete: cb})

    const set = {
      y: '0%',
      rotationX: 0,
    }

    const charsTo = {
      y: '110%',
      rotationX: 60,
    }

    if (screen.width <= 1024) {
      set.opacity = '1'
      charsTo.opacity = 0
    }

    chars.length && tl.set(chars, set)
    window.scene && window.scene.hide()
    window.casesStrip && window.casesStrip.out()

    i.length &&
      tl.set(i, {
        opacity: 1,
        y: 0,
      })

    hr.length &&
      tl.set(hr, {
        opacity: 1,
        width: '100%',
      })

    vr.length &&
      tl.set(vr, {
        opacity: 1,
        height: '100%',
      })

    st &&
      tl.set(st, {
        opacity: 1,
        visibility: 'visible',
      })

    chars.length &&
      tl.to(
        chars,
        Object.assign(
          {
            duration: 0.6,
            ease: 'expo.in',
            stagger: 0.016,
          },
          charsTo
        )
      )

    i.length &&
      tl.to(
        i,
        {
          duration: 1,
          opacity: 0,
          y: 40,
          ease: 'expo.in',
          stagger: 0.05,
        },
        0
      )

    hr.length &&
      tl.to(
        hr,
        {
          duration: 1,
          opacity: 0,
          width: 0,
          ease: 'expo.in',
          stagger: 0.05,
        },
        0
      )

    vr.length &&
      tl.to(
        vr,
        {
          duration: 1,
          opacity: 0,
          height: 0,
          ease: 'expo.in',
          stagger: 0.05,
        },
        0
      )
    st &&
      tl.to(
        st,
        {
          duration: 1,
          opacity: 0,
          onComplete: () => {
            st.style.visibility = 'hidden'
          },
          // visibility: 'hidden',
        },
        0
      )
  }
}
