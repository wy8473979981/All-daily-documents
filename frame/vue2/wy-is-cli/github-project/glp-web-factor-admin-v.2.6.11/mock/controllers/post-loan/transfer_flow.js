import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../../helpers/page'
import { delayResp } from '../../helpers/resp'

import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    paymentNo: '@integer(16)',
    amount: '@float(1, 9999999, 2, 3)',
    remainAmount: '@float(1, 9999999, 2, 3)',
    'paymentWay|1': ['0'],
    'paymentType|1': ['0', '1'],
    tradeTime: '@datetime',
    paymentName: '@ctitle(5, 25)',
    paymentBankName: '@ctitle(5, 25)',
    paymentBankno: '@integer(16)',
    abstract: '@ctitle(5, 125)',
    projectName: '@ctitle(5, 25)',
    settlementNo: '@integer(16)',
    repayNo: '@integer(16)',
    'paymentStatus|1': ['0', '1', '2', '3']
  }]
}).list

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class TransferFlow extends Controller {
  @RequestMapping({ url: '/comp/postloan/balance/transferflow', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, data))
  }
}
