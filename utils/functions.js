export const uuid =
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15)

export function returnDuration(seconds) {
  let minuts = Math.floor(seconds / 60)
  let secs = seconds % 60
  let hour = Math.floor(minuts / 60)
  return (hour !== 0 ? hour + 'h' : '') + ' ' + (minuts !== 0 ? minuts + 'm' : '') + ' ' + secs + 's'
}
