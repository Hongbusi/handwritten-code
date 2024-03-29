/**
 * 防抖：顾名思义，防止抖动，通过控制事件触发频率达到优化函数执行效率的效果。用于将用户的操作行为触发转换为程序行为触发，防止用户操作的结果抖动。一段时间内，事件在我们规定的间隔 n 秒内多次执行，回调只会执行一次。
 * 特点：1. 持续触发不执行。2. 不触发的一段时间之后再执行。
 */

function debounce(fn, delay = 500) {
  let timer = null
  return function() {
    // eslint-disable-next-line prefer-rest-params
    const args = [...arguments]
    const self = this

    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    timer = setTimeout(() => {
      fn.apply(self, args)
    }, delay)
  }
}

window.onresize = debounce(() => {
  console.log('window resize debounce')
}, 800)
