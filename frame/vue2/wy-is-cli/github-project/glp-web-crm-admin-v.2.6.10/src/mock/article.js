import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'



for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'id|+1': 10000,
    'applyTime': '@date',
    'planRepayTime': '@date',
    "isRiskVehicle|0-1": 0,
    "pickGoodsType|0-1": 0,
    "sellCreditFlage|0-1": 0,
    "submitStatus|0-1": 0,
    'applyAmount|1-2000': 100,
    "orderStatus|0-5": 1,
    'businessNo': /\d{10}/,
    'purchaseNo': /\d{10}/,
    'versionNo': /\d{10}/,
    'warehouseName': "@cword(4)仓库",
    "currencyName": "@cword(3)",
    "remark": "备注：@cword(4)",

  }))
}

export default {
  getList: config => {
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getPv: () => ({
    pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),
  getArticle: (config) => {
    const { id } = param2Obj(config.url)
    for (const article of List) {
      if (article.id === +id) {
        return article
      }
    }
  },
  createArticle: () => ({
    data: 'success'
  }),
  updateArticle: () => ({
    data: 'success'
  })
}
