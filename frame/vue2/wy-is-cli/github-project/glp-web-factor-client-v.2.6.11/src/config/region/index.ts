import options from './options'

const provinces: Record<string, string> = {}

options.forEach(v => {
  provinces[v.provinceCode] = v.provinceName
})

const cascadeRegions = genCascaderData()

export { provinces, cascadeRegions }

export function getCities (provinceCode: string): Record<string, string> {
  if (!provinceCode) return {}
  const province = options.find(v => v.provinceCode === provinceCode)
  const ret: Record<string, string> = {}
  const cities = province?.cities || []
  cities.forEach(v => {
    ret[v.cityCode] = v.cityName
  })
  return ret
}

export function getCounties (cityCode: string): Record<string, string> {
  if (!cityCode) return {}
  let city: any = null
  options.some(v => {
    const cities = v.cities || []
    return cities.some(w => {
      if (w.cityCode === cityCode) {
        city = w
        return true
      }
    })
  })
  const ret: Record<string, string> = {}
  const counties = city?.counties || []
  counties.forEach((v: any) => {
    ret[v.countyCode] = v.countyName
  })
  return ret
}

function genCascaderData () {
  const ret: any[] = []
  options.forEach(v => {
    const p: any = { value: v.provinceCode, label: v.provinceName, children: [] }
    const cities = v.cities || []
    cities.forEach(w => {
      const c: any = { value: w.cityCode, label: w.cityName, children: [] }
      const towns = w.counties || []
      towns.forEach(u => {
        c.children.push({ value: u.countyCode, label: u.countyName })
      })
      p.children.push(c)
    })
    ret.push(p)
  })
  return ret
}
