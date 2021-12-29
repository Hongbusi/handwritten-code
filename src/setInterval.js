const obj = {
  timer: null,

  setInterval: function(callback, interval) {
    const now = Date.now;
    let startTime = now();
    let endTime = startTime;
    const loop = () => {
      this.timer = requestAnimationFrame(loop);
      endTime = now();
      if (endTime - startTime >= interval) {
        startTime = endTime = now();
        callback && callback();
      }
      return this.timer;
    }
    loop();
  },

  clearInterval: function() {
    cancelAnimationFrame(this.timer);
  }
}

let count = 0;
obj.setInterval(() => {
  console.log('setInterval...');
  count++;
  if (count >= 5) {
    obj.clearInterval();
  }
}, 1000);
