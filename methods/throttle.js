/**
 * 节流：顾名思义，控制流量，通过控制事件触发频率达到优化函数执行效率的效果。用于用户在与页面交互时控制事件发生的频率，一般场景是单位的时间或其它间隔内定时执行操作。一段时间内，事件在每次到达我们规定的间隔 n 秒时触发一次。
 * 特点：1. 持续触发并不会执行多次。2. 到一定时间 / 其他间隔（如滑动的高度）再去执行。
 */

function throttle(fn, interval = 500) {
  let timer = null
  let firstTime = true
  return function() {
    // eslint-disable-next-line prefer-rest-params
    const args = [...arguments]
    const self = this
    if (firstTime) {
      fn.apply(self, args)
      firstTime = false
      return false
    }

    if (timer) {
      return false
    }

    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      fn.apply(self, args)
    }, interval)
  }
}

window.onresize = throttle(() => {
  console.log('window resize throttle')
}, 800)
