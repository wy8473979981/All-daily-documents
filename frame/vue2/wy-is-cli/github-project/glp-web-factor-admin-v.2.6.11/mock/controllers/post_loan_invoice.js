import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'

import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    invoiceNo: '@integer(16)',
    settlementNo: '@integer(16)',
    invoiceAmount: '@float(1, 99999, 2, 3)',
    invoiceTime: '@datetime',
    invoiceTitle: '@ctitle(5, 25)',
    'invoiceType|1': ['0', '1'],
    reverseInvoiceNo: '@integer(16)',
    originInvoiceNo: '@integer(16)',
    applyTime: '@datetime',
    'applyChannel|1': ['0', '1', '2']
  }]
}).list

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class PostLoanInvoice extends Controller {
  @RequestMapping({ url: '/comp/postloan/invoice', method: 'post' })
  pagedQuery (req, res, context) {
    return new Page(req, data)
  }
}
