
Array.prototype._at = function(n) {
  n = Math.trunc(n) || 0
  if (n < 0) n += this.length
  if (n < 0 || n >= this.length) return undefined
  return this[n]
}

const arr = [0, 1, 2, 3, 4, 5, 6]

console.log(arr._at(0))
console.log(arr._at(6))
console.log(arr._at(9))
console.log(arr._at(-1))
console.log(arr._at(-9))
