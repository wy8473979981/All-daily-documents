import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'
import { uid } from '../helpers/lang'
import { mock } from 'mockjs'

// eslint-disable-next-line
export default class finance_orders extends Controller {
  // @RequestMapping({ url: '/clientend/order/queryOrderList', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  // @RequestMapping({ url: '/clientend/order/queryOrderDetail', method: 'post' })
  get (req, res, context) {
    const orderNumber = req.body.orderNumber
    const data = {
      approvalAmount: mock('@float(1, 1000000)'),
      repaymentType: mock('@string("123",1)'),
      rate: mock('@float(0, 1)'),
      breakRate: mock('@float(0, 1)'),
      createTime: mock('@date(T)'),
      latestRepaymentDate: mock('@date(T)'),
      sellerCompanyName: mock('@cname'),
      buyerCompanyName: mock('@cname'),
      interestMethod: mock('@string("12",1)'),
      interestTime: mock('@date(T)'),
      dueTime: mock('@integer(0, 100)'),
      discountRate: mock('@float(0, 1)'),
      debtReceivableRes: mock({
        'list|2-8': [{
          amount: mock('@float(1, 100000)'),
          'auditStatus|1': ['1', '2', '3'],
          buyerCompanyName: '@cname',
          'contractStatus|1': ['1', '2', '3'],
          debtReceivableName: '@cname',
          debtReceivableNumber: '@string(number, 8)',
          id: '@id',
          projectName: '@cname',
          sellerCompanyName: '@cname',
          submitTimeBegin: '@date(T)',
          transferEndTime: '@date(T)'
        }]
      }).list,
      receiptAccountName: mock('@cname'),
      receiptBankFiliale: mock('@city'),
      receiptBankNumber: mock('@string(number, 16)'),
      baseClaims: mock({
        'list|2-8': [{
          buyerCompanyName: '@cname',
          sellerCompanyName: '@cname',
          'debtType|1': ['1', '2'],
          tradeAmount: mock('@float(1, 100000)'),
          effectiveTime: '@cname',
          expirationTime: '@string(number, 8)',
          batchNo: '@id'
        }]
      }).list,

      orderNumber,
      approvalComments: mock('@csentence(2, 16)'),
      approvalTime: mock('@date(T)')
    }
    return delayResp(data)
  }

  @RequestMapping({ url: '/clientend/order/queryInvoiceList', method: 'post' })
  getInvoices (req, res, context) {
    const orderNumber = req.body.orderNumber
    const data = mock({
      'list|20-30': [{
        invoiceNo: '@string(number, 8)',
        sellerCompName: '@cname',
        buyerCompName: '@cname',
        invoicingTime: '@date(T)',
        invoiceMoney: mock('@float(1, 100000)'),
        invoiceTaxRate: mock('@float(0, 1)'),
        'isValid|1': ['0', '1']
      }]
    }).list
    return delayResp(data)
  }

  // @RequestMapping({ url: '/clientend/order/queryBaseInfo/:projectId', method: 'get' })
  getProject (req, res, context) {
    const data = {
      availableAmount: 100000, // 可用信额度
      actualInterestRate: 0.12, // 融资利率
      discountRate: 0.8, // 折扣率
      totalOrderCount: 50000, // 余额
      capitalFlow: '1', // 资金流向 1：无要求2：翻单支付 3：定向支付
      transferMethod: '2', // 基础债权获取方式 1：人工上传，2：数据对接
      businessType: 'GLP_TRANSPORT', // GLP_TRANSPORT 普运贷, GLP_CHAIN_FACTORING 普链保,
      latestDueDateType: '1', // 最晚还款日 1：基础债权生效时间+风控审批最长期限 2：自定义 3：票据最晚还款日 4：经计算后自然月最后一天
      creditDuration: 30, // 当前企业对应卖方额度的单笔最长用信期限
      debtType: '1' // 基础债权类型 1：商票，2：运单类，3：无要求
    }
    return delayResp(data)
  }
}
