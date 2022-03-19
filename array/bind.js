
Function.prototype._bind = function(thisArg, ...argArray) {
  // 1. 获取到真实需要调用的函数
  const fn = this

  // 2. 绑定 this
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window

  function proxyFn(...args) {
    // 3. 将函数放到 thisArg 中进行调用
    thisArg.fn = fn
    // 特殊: 将两个传入的参数进行合并
    const finalArgs = [...argArray, ...args]
    const result = thisArg.fn(...finalArgs)
    delete thisArg.fn
    return result
  }

  // 4. 返回结果
  return proxyFn
}

function foo() {
  console.log('foo', this)
}

function sum(num1, num2, num3) {
  console.log(num1, num2, num3)
}

const newFoo = foo._bind('foo')
newFoo()

const newSum = sum._bind('sum', 10, 20)
newSum(30)
