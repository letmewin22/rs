const themeBtn = () => {
  if (
    -document.getElementById('scroller').getBoundingClientRect().y +
      window.innerHeight >=
    document.getElementById('scroller').getBoundingClientRect().height * 0.94
  ) {
    document.querySelector('.theme-btn').classList.add('disabled')
  } else {
    document.querySelector('.theme-btn').classList.remove('disabled')
  }
  window.requestAnimationFrame(themeBtn)
}

export default themeBtn
