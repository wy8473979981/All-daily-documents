import { get } from '@/utils/request'

export const getDemoData = (data = {}) => {
  return get('home/demo/api', data)
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve({
  //       success: true,
  //       data: {
  //         name: '汪洋'
  //       }
  //     })
  //   }, 2000)
  // })
}
