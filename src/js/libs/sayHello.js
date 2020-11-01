if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
    let args = ['\n %c ⚒ by emotiON: %c https://emotion-agency.com %c %c \n\n', 'color: #fff; background: #a03adb; padding:5px 0;', 'color: #fff; background: #ffffff; padding:5px 0;', 'background: #fff; padding:5px 0;', 'color: #b0976d; background: #fff; padding:5px 0;']
    window.console.log.apply(console, args)
  } else if (window.console) {
    window.console.log('Made by emotiON: https://emotion-agency.com')
  }


