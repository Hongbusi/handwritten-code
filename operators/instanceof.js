function _instanceof(leftValue, rightValue) {
  rightValue = rightValue.prototype
  leftValue = leftValue.__proto__
  while (true) {
    if (leftValue === null) return false
    if (leftValue === rightValue) return true
    leftValue = leftValue.__proto__
  }
}

function Car(make) {
  this.make = make
}
const auto = new Car('China')
console.log(_instanceof(auto, Car)) // true
console.log(_instanceof(auto, Object)) // true
