Function.prototype._call = function(thisArg, ...args) {
  const fn = this
  thisArg = thisArg ? Object(thisArg) : window
  thisArg.fn = fn
  const result = thisArg.fn(...args)
  return result
}

function foo() {
  console.log('foo', this)
}

function sum(num1, num2) {
  console.log('sum', this, num1, num2)
  return num1 + num2
}
foo._call(null)
foo._call({ name: 'hbs' })
console.log(sum._call(null, 20, 40))
