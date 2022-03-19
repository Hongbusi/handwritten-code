function currying(fn) {
  function curried(...args) {
    // 当已经传入的参数, 大于等于需要的参数时, 就执行函数
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    else {
      // 没有达到个数时, 需要返回一个新的函数, 继续来接受参数
      return function(...args2) {
        // 接受到参数后, 需要递归调用 curried 来检查函数的参数个数时否达到
        return curried.apply(this, [...args, ...args2])
      }
    }
  }

  return curried
}

function add(num1, num2, num3) {
  return num1 + num2 + num3
}

const curryAdd = currying(add)

console.log(curryAdd(10)(20)(30))
console.log(curryAdd(10, 20)(30))
console.log(curryAdd(10, 20, 30))
