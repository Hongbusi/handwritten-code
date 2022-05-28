function fetch(url, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(url)
    }, time)
  })
}

const tasks = [
  fetch('come-future.com/api-1', 1000),
  fetch('come-future.com/api-2', 2000),
  fetch('come-future.com/api-3', 2000),
  fetch('come-future.com/api-4', 1000),
  fetch('come-future.com/api-5', 1000),
  fetch('come-future.com/api-6', 2000)
]
// 1245367

function fetchLimited(tasks = []) {
  const formatTasks = tasks.map(p => ({ isPending: false, p }))
  const currentTasks = [formatTasks.splice(0, 1)[0], formatTasks.splice(0, 1)[0]]

  function next() {
    currentTasks.forEach((task, index) => {
      if (!task.isPending) {
        task.isPending = true
        task.p.then((res) => {
          console.log(res)
          if (formatTasks.length) {
            const nextObj = formatTasks.splice(0, 1)[0]
            currentTasks[index] = nextObj
            next()
          }
        })
      }
    })
  }
  next()
}

fetchLimited(tasks)
