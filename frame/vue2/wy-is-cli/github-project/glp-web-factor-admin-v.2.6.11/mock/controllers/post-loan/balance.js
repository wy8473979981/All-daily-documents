import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../../helpers/page'
import { delayResp } from '../../helpers/resp'

import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    companyName: '@ctitle(5, 25)',
    bankname: '@ctitle(5, 15)',
    bankNo: '@integer(16)',
    balance: '@float(1, 99999, 2, 3)',
    projectName: '@ctitle(5, 25)',
    'clearType|1': ['0', '1', '2'],
    updateTime: '@datetime'

  }]
}).list

const financedata = Mock.mock({
  'list|20-100': [{
    finacneNo: '@integer(16)',
    loanTime: '@datetime',
    repayTime: '@datetime',
    loanAmount: '@float(1, 9999999, 2, 3)',
    toReapyTotalAmount: '@float(1, 9999999, 2, 3)',
    toRepayCapital: '@float(1, 9999999, 2, 3)',
    toRepayPenalty: '@float(1, 9999999, 2, 3)',
    toRepayInterest: '@float(1, 9999999, 2, 3)',
    expectRepayCapital: '@float(1, 9999999, 2, 3)',
    expectRepayInterest: '@float(1, 9999999, 2, 3)',
    expectRepayPenalty: '@float(1, 9999999, 2, 3)'
  }]
}).list

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class Balance extends Controller {
  @RequestMapping({ url: '/comp/postloan/balance/get', method: 'get' })
  query (req, res, context) {
    return delayResp(data)
  }

  @RequestMapping({ url: '/comp/postloan/balance', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, data))
  }

  @RequestMapping({ url: '/comp/postloan/finance', method: 'post' })
  pageFinanceQuery (req, res, context) {
    return delayResp(new Page(req, financedata))
  }
}
