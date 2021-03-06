export function changeTime (params: any) {
  if (params.time) {
    const { time, ...other } = params
    other.beginTime = time[0]
    other.endTime = time[1]
    return other
  }
  return params
}
