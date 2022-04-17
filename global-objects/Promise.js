// https://promisesaplus.com

const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value)
    resolve(result)
  }
  catch (err) {
    reject(err)
  }
}

class HbsPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach((fn) => {
            fn()
          })
        })
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach((fn) => {
            fn()
          })
        })
      }
    }

    try {
      executor(resolve, reject)
    }
    catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    const defaultOnRejected = (err) => { throw err }
    onRejected = onRejected || defaultOnRejected

    const defaultOnFulfilled = (value) => { return value }
    onFulfilled = onFulfilled || defaultOnFulfilled

    return new HbsPromise((resolve, reject) => {
      // 1. 如果在 then 调用的时候，状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }

      if (this.status === PROMISE_STATUS_REJECTED) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }

      // 2. 将成功回调和失败回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onFulfilledFns.push(() => {
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        this.onRejectedFns.push(() => {
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    this.then(() => {
      onFinally()
    }, () => {
      onFinally()
    })
  }

  static resolve(value) {
    return new HbsPromise(resolve => resolve(value))
  }

  static reject(reason) {
    return new HbsPromise((resolve, reject) => reject(reason))
  }

  static all(promises) {
    return new HbsPromise((resolve, reject) => {
      const values = []
      promises.forEach((promise, index) => {
        promise.then((res) => {
          values[index] = res
          if (values.length === promises.length) {
            resolve(values)
          }
        }, (err) => {
          reject(err)
        })
      })
    })
  }

  static allSettled(promises) {
    return new HbsPromise((resolve) => {
      const values = []
      promises.forEach((promise, index) => {
        promise.then((res) => {
          values[index] = {
            status: PROMISE_STATUS_FULFILLED,
            value: res
          }

          if (values.length === promises.length) {
            resolve(values)
          }
        }, (err) => {
          values[index] = {
            status: PROMISE_STATUS_REJECTED,
            reason: err
          }
          if (values.length === promises.length) {
            resolve(values)
          }
        })
      })
    })
  }
}

const p1 = new HbsPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 2000)
})

const p2 = new HbsPromise((resolve, reject) => {
  setTimeout(() => {
    reject('p2')
  }, 1000)
})

const p3 = new HbsPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3')
  }, 3000)
})

HbsPromise.allSettled([p1, p2, p3]).then((res) => {
  console.log(res)
})
