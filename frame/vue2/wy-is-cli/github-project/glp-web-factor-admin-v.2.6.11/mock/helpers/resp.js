export function delayResp (data, delay = 750) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, delay)
  })
}
