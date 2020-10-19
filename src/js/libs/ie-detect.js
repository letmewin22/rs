let isIE = false

const ua = window.navigator.userAgent
const oldIe = ua.indexOf('MSIE ')
const newIe = ua.indexOf('Trident/')

if ((oldIe > -1) || (newIe > -1)) {
  isIE = true
}

if ( isIE ) {
  document.body.innerHTML = 'Sorry, your browser is not supported. Please install a more modern browser, for example&nbsp;<span style="text-decoration: underline"><a href="https://www.google.ru/intl/ru/chrome/?brand=CHBD&gclid=EAIaIQobChMI1KWB8svn6AIVGqmaCh2wxgN9EAAYASAAEgIPl_D_BwE&gclsrc=aw.ds"> Google Chrome</a></span>'

  document.body.style.cssText =`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 0 30px;
    pointer-events: auto;
    opacity: 1;
  `
}
