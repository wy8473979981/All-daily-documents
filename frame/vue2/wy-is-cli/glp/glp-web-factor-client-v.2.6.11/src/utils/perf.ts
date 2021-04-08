export function uuid () {
  let time = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    time += performance.now() // use high-precision timer if available
  }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (time + Math.random() * 16) % 16 | 0
    time = Math.floor(time / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}
