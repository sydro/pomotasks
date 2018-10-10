export function uuid() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  )
}

export function returnDuration(seconds) {
  let minuts = Math.floor(seconds / 60)
  let secs = seconds % 60
  let hour = Math.floor(minuts / 60)
  return (hour !== 0 ? hour + 'h' : '') + ' ' + (minuts !== 0 ? minuts + 'm' : '') + ' ' + secs + 's'
}

export function formatDate(timestamp) {
  const jsDate = new Date(timestamp)
  const formattedDate =
    '' +
    jsDate.getDate() +
    '/' +
    (jsDate.getMonth() + 1) +
    '/' +
    jsDate.getFullYear() +
    ' - ' +
    jsDate.getHours() +
    ':' +
    jsDate.getMinutes() +
    ':' +
    jsDate.getSeconds()
  return formattedDate
}

export function calculateTotal(items) {
  let total = 0
  items.map(el => {
    total = total + el.duration
  })
  return '' + returnDuration(total)
}
