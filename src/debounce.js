function debounce(fn, delay = 500) {
  let timer = null;
  return function() {
    const args = [...arguments];
    const self = this;

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      fn.apply(self, args);
    }, delay);
  }
}

window.onresize = debounce(() => {
  console.log('window resize debounce');
}, 800);
