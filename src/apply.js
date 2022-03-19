Function.prototype._apply = function(thisArg, argArray) {
  // 1. 获取要执行的函数
  const fn = this

  // 2. 处理绑定的 thisArg
  thisArg = thisArg ? Object(thisArg) : window

  // 3. 执行函数
  thisArg.fn = fn
  argArray = argArray || []
  const result = thisArg.fn(...argArray)
  delete thisArg.fn

  // 4. 返回结果
  return result
}

function foo() {
  console.log('foo', this)
}

function sum(num1, num2) {
  console.log('sum', this)
  return num1 + num2
}

foo._apply(null)
foo._apply({})
console.log(sum._apply({}, [10, 20]))
