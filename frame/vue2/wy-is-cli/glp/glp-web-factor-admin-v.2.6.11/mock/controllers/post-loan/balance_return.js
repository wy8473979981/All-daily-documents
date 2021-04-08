import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../../helpers/page'
import { delayResp } from '../../helpers/resp'

import Mock from 'mockjs'
const data = Mock.mock({
  'list|20-100': [{
    buyerCompany: '@ctitle(5, 25)',
    sellerCompany: '@ctitle(5, 25)',
    balanceRetrunNo: '@integer(16)',
    balanceReturnRecord: '@integer(16)',
    balanceReturnAmount: '@float(1, 9999999, 2, 3)',
    balanceReturnTime: '@datetime',
    settlementNo: '@integer(16)',
    operator: '@cname',
    'balanceReturnStatus|1': ['0', '1', '2']
  }]
}).list

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class BalanceReturn extends Controller {
  @RequestMapping({ url: '/comp/postloan/balance/balacneReturn', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, data))
  }
}
