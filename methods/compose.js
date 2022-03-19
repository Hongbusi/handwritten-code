function double(num) {
  return num * 2
}

function square(num) {
  return num ** 2
}

// const count = 10
// const result = square(double(count))
// console.log(result)

// 最简单的组合函数
// function composeFn(m, n) {
//   return function(count) {
//     return n(m(10))
//   }
// }

// const newFn = composeFn(double, square)
// console.log(newFn(count))

// 通用的组合函数
function hycCompose(...fns) {
  const length = fns.length
  for (let i = 0; i < length; i++) {
    if (typeof fns[i] !== 'function') {
      throw new TypeError('Expected arguments are functions')
    }
  }

  function compose(...args) {
    let index = 0
    let result = length ? fns[index].apply(this, args) : args
    while (++index < length) {
      result = fns[index].call(this, result)
    }
    return result
  }

  return compose
}

const newFn = hycCompose(double, square)

console.log(newFn(10))
