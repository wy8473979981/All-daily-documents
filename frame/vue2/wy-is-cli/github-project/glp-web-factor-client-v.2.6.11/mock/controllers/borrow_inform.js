import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'
import Mock from 'mockjs'

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class borrowInform extends Controller {
  @RequestMapping({ url: '/base/borrow/information/:id', method: 'get' })
  pagedQuery (req, res, context) {
    const item = {
      type: '运单', // 单据类型
      rate: 'G7', // 渠道信息
      wyRate: '成都返空汇物流科技有限公司', // 卖方信息
      seller: '', // 运单买方
      buyer: '', // 运单卖方
      jx: '从XXX 到 YYYY', // 起讫地
      qx: '20150320', // 完成时间
      backDate: '钢铁' // 货物种类
    }
    return delayResp(item)
  }

  @RequestMapping({ url: '/base/borrow/information2/:id', method: 'get' })
  a (req, res, context) {
    const item = {
      name: '张三',
      account: '55887411',
      bank: '浦东支行'
    }
    return delayResp(item)
  }

  @RequestMapping({ url: '/base/borrow/information3/:id', method: 'get' })
  b (req, res, context) {
    const item = {
      a: '转让2020', // 单据类型
      b: '2020-04-01', // 渠道信息
      c: '2020-04-01', // 卖方信息
      d: '2020-04-01', // 运单买方
      e: '2020-04-01', // 运单卖方
      f: '3334', // 起讫地
      g: '9999', // 完成时间
      h: '8888', // 货物种类
      i: '83333' // 货物种类
    }
    return delayResp(item)
  }

  @RequestMapping({ url: '/jichuzhaiquan/:id', method: 'post' })
  bc (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }
}
