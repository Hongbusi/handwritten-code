function double(num) {
  return num * 2
}

function square(num) {
  return num ** 2
}

const count = 10
const result = square(double(count))
console.log(result)

// 组合函数
function composeFn(m, n) {
  return function(count) {
    return n(m(count))
  }
}

const newFn = composeFn(double, square)
console.log(newFn(count))
