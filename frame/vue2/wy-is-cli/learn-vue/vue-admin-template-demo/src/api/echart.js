import request from '@/utils/request'
import axios from 'axios'

export function getSvg (params) {
  // return request({
  //   url: 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/geo/flight-seats.svg',
  //   method: 'get',
  //   params
  // })
  axios({
    method: 'get',
    url: 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/geo/flight-seats.svg',
  })
    .then(function (res) {
      debugger
      console.log(res)
    })
    .catch(function (error) {
      console.log(error)
    })
}





