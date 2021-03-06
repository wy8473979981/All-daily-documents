import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'
import { mock } from 'mockjs'

// eslint-disable-next-line
export default class finance_approves extends Controller {
  // @RequestMapping({ url: '/backend/order/queryOrderList', method: 'post' })
  pagedQuery (req, res, context) {
    return delayResp(new Page(req, this.collection.find()))
  }

  // @RequestMapping({ url: '/backend/order/queryOrderDetail/:orderNumber', method: 'get' })
  get (req, res, context) {
    const orderNumber = req.params.orderNumber
    const data = {
      orderNumber,
      orderApplication: {
        debtReceivableRes: mock({
          'list|2-8': [{
            amount: mock('@float(1, 100000)'),
            debtReceivableName: '@cname',
            debtReceivableNumber: '@string(number, 8)',
            submitTimeBegin: '@date(T)',
            transferEndTime: '@date(T)'
          }]
        }).list,
        loanFiles: mock({
          'list|2-8': [{
            desc: '@csentence(8,64)',
            fileName: '@cword(4, 16)',
            filePath: 'https://www.baidu.com',
            uploadTime: '@date(T)',
            uploader: '@cname'
          }]
        }).list,
        invoiceInfos: mock({
          'list|2-8': [{
            invoiceNo: '@string(number,8)',
            invoicingTime: '@date(T)',
            buyerCompName: '@cname',
            sellerCompName: '@cname',
            invoiceTaxExclusiveMoney: '@float(1,100000)',
            invoiceTaxMoney: '@float(1,100000)',
            invoiceMoney: '@float(1,100000)',
            'isModify|1': ['0', '1'],
            'verifyStatus|1': ['0', '1']
          }]
        }).list,

        bankAccountName: mock('@cname'),
        bankAccountNumber: mock('@string(number,16)'),
        bankBranchName: mock('@county'),

        rate: mock('@float(0,1)'),
        interestType: mock('@string("12",1)'),
        latestRepaymentDate: mock('@date(T)'),
        debtMoney: mock('@float(1, 100000)'),
        amount: mock('@float(1, 100000)'),
        expectedFactoringFinancingFee: mock('@float(1, 100000)'),
        expectedLoanMoney: mock('@float(1, 100000)')
      },
      claimInfo: {
        buyerCompanyName: mock('@cname'),
        sellerCompanyName: mock('@cname'),
        baseClaims: mock({
          'list|2-8': [{
            buyerCompanyName: '@cname',
            sellerCompanyName: '@cname',
            'claimType|1': ['1', '2'],
            tradeAmount: '@float(1,100000)',
            effectiveTime: '@date(T)',
            expirationTime: '@date(T)',
            invalidReason: '@csentence(8,64)'
          }]
        }).list,
        billInfos: mock({
          'list|2-8': [{
            paperNumber: '@string(number,8)',
            paperFrom: '@cname',
            paperUsed: '@cname',
            paperAmount: '@float(1,100000)',
            paperFromDate: '@date(T)',
            paperExpiredDate: '@date(T)',
            'status|1': ['1', '2']
          }]
        }).list
      }
    }
    // approvalAmount: mock('@float(1, 1000000)'),
    // repaymentType: mock('@string("123",1)'),
    // rate: mock('@float(0, 1)'),
    // breakRate: mock('@float(0, 1)'),
    // createTime: mock('@date(T)'),
    // latestRepaymentDate: mock('@date(T)'),
    // sellerCompanyName: mock('@cname'),
    // buyerCompanyName: mock('@cname'),
    // interestMethod: mock('@string("12",1)'),
    // interestTime: mock('@date(T)'),
    // dueTime: mock('@integer(0, 100)'),
    // discountRate: mock('@float(0, 1)'),
    // debtReceivableRes: mock({
    //   'list|2-8': [{
    //     amount: mock('@float(1, 100000)'),
    //     'auditStatus|1': ['1', '2', '3'],
    //     buyerCompanyName: '@cname',
    //     'contractStatus|1': ['1', '2', '3'],
    //     debtReceivableName: '@cname',
    //     debtReceivableNumber: '@string(number, 8)',
    //     id: '@id',
    //     projectName: '@cname',
    //     sellerCompanyName: '@cname',
    //     submitTimeBegin: '@date(T)',
    //     transferEndTime: '@date(T)'
    //   }]
    // }).list,
    // receiptAccountName: mock('@cname'),
    // receiptBankFiliale: mock('@city'),
    // receiptBankNumber: mock('@string(number, 16)'),
    // baseClaims: mock({
    //   'list|2-8': [{
    //     buyerCompanyName: '@cname',
    //     sellerCompanyName: '@cname',
    //     'debtType|1': ['1', '2'],
    //     tradeAmount: mock('@float(1, 100000)'),
    //     effectiveTime: '@cname',
    //     expirationTime: '@string(number, 8)',
    //     batchNo: '@id'
    //   }]
    // }).list,

    // orderNumber,
    // approvalComments: mock('@csentence(2, 16)'),
    // approvalTime: mock('@date(T)')
    return delayResp(data)
  }
}
