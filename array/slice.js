Array.prototype._slice = function(start, end) {
  const array = this
  start = start || 0
  end = end || array.length
  const newArray = []
  for (let i = start; i < end; i++) {
    newArray.push(array[i])
  }
  return newArray
}

const arr = [1, 2, 3, 4]

console.log(arr._slice())
console.log(arr._slice(1, 2))
