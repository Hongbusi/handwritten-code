function throttle(fn, interval = 500) {
  let timer = null;
  let firstTime = true;
  return function() {
    const args = [...arguments];
    const self = this;
    if (firstTime) {
      fn.apply(self, args);
      firstTime = false;
      return false;
    }

    if (timer) {
      return false;
    }

    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      fn.apply(self, args);
    }, interval);
  }
}

window.onresize = throttle(() => {
  console.log('window resize throttle');
}, 800);
