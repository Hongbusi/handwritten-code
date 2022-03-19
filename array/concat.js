Array.prototype._concat = function() {
  const newArr = []
  for (let i = 0; i < this.length; i++) {
    newArr.push(this[i])
  }

  for (let i = 0; i < arguments.length; i++) {
    const argument = arguments[i]
    if (argument instanceof Array) {
      for (let j = 0; j < argument.length; j++) {
        newArr.push(argument[j])
      }
    }
    else {
      newArr.push(argument)
    }
  }

  return newArr
}

const arr1 = [0, 1, 2, 3]
const arr2 = [3, 4, 5, 6]
const arr3 = ['a', 'b', 'c']

console.log(arr1._concat(arr2))
console.log(arr1._concat(arr2, arr3))
