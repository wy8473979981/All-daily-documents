import { http } from '@/api/http'

export function resp (data: Blob | string, name: string) {
  const url = typeof data === 'string' ? data : window.URL.createObjectURL(new Blob([data]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', name)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export function viewOfficeOnline(url: string) {
  const link = document.createElement('a')
  link.style.display = 'none'
  if (url.includes('.pdf') || url.includes('.PDF')) {
    link.href = url
  } else {
    link.href = `https://view.officeapps.live.com/op/view.aspx?src=${url}`
  }
  link.target = '_blank'
  link.setAttribute('download', name)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function download (api: string, name?: string, params: Record<string, any> = {}, method: 'post' | 'get' = 'get') {
  // if (api.startsWith('http')) {
  //   resp(api, name || '未命名文件')
  //   return
  // }
  const p = method === 'post' ? http().post(api, params, { responseType: 'blob' }) : http().get(api, { responseType: 'blob', params })
  p.then(response => {
    const contentDisposition = response?.headers['content-disposition']
    const responseName = decodeURI(query('filename', contentDisposition) || query('fileName', contentDisposition))
    if (!name) name = responseName || 'unknown'
    resp(response.data, name)
  })

  function query (key: string, path: string) {
    const keyword = `${key}=`
    const ret = (path || '').split(';')
    const target = ret.find(v => {
      return v.trim().startsWith(keyword)
    })
    if (target) return target.trim().replace(keyword, '')
    return ''
  }
}
