import { Controller, RequestMapping } from '@pat-fet/mock-server'
import Page from '../helpers/page'
import { delayResp } from '../helpers/resp'
import { mock } from 'mockjs'

// eslint-disable-next-line
export default class finance_order_preaudit extends Controller {

  // @RequestMapping({ url: '/backend/order/plb/queryPreOrderDetail/:orderNumber', method: 'get' })
  get (req, res, context) {
    const orderNumber = req.params.orderNumber
    const data = {
      orderNumber,
      amountDetailsUrl: 'http://glp-common.oss-cn-shanghai.aliyuncs.com/tmp/0518d981-b53b-4dc3-8f0a-70f40f4e441c.jpg',
      letterListUrl: 'http://glp-common.oss-cn-shanghai.aliyuncs.com/tmp/0518d981-b53b-4dc3-8f0a-70f40f4e441c.jpg',
      buyerCompanyName: mock('@cname'),
      contractCode: mock('@string(number,8)'),
      contractEndDate: mock('@date(T)'),
      contractName: mock('@string(number,8)'),
      contractSignDate: mock('@date(T)'),
      createTime: mock('@date(T)'),
      latestRepaymentDate: mock('@date(T)'),
      debtDescripton: mock('@csentence(8, 64)'),
      orderRate: mock('@float(0,1)'),
      amount: mock('@float(1,100000)'),
      pledgeAccount: mock('@integer(1,10009)'),
      pledgeAccountName: mock('@cname'),
      sellerCompanyName: mock('@cname'),
      status: 1,
      flowNode: '89889',
      auditFiles: [
        { desc: '32432432', fileName: '阿里云图片文件.jpg', filePath: 'http://glp-common.oss-cn-shanghai.aliyuncs.com/tmp/0518d981-b53b-4dc3-8f0a-70f40f4e441c.jpg', fileType: 1, uploadTime: 1595743229177, uploader: '324324' },
        { desc: 'ewqewqewq', fileName: '附件图片文件.jpg', filePath: 'http://localhost:3000/nas/download/1.jpg', fileType: 1, uploadTime: 1595743229177, uploader: '3243543524' }
      ],
      files: [
        { fileName: '阿里云图片文件.jpg', filePath: 'http://glp-common.oss-cn-shanghai.aliyuncs.com/tmp/0518d981-b53b-4dc3-8f0a-70f40f4e441c.jpg' },
        { fileName: '附件图片文件.jpg', filePath: 'http://localhost:3000/nas/download/1.jpg' },
        { fileName: '阿里云PDF文件.pdf', filePath: 'http://glp-common.oss-cn-shanghai.aliyuncs.com/tmp/142b7584-9fad-42de-b278-107873065b1e.pdf' },
        { fileName: '附件PDF文件.pdf', filePath: 'http://localhost:3000/nas/download/1.pdf' },
        { fileName: 'word文件.docx', filePath: 'http://localhost:3000/nas/download/1.docx' },
        { fileName: 'Excel文件.docx', filePath: 'http://localhost:3000/nas/download/1.xlsx' }
      ],
      invoiceInfos: mock({
        'list|2-8': [{
          invoiceNo: '@string(number,8)',
          invoiceCode: '@string(number,8)',
          invoiceCheckCode: '@string(number,6)',
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
      logs: mock({
        'list|2-8': [{
          auditNode: '@string(number,8)',
          createTime: '@date(T)',
          operatorName: '@cname',
          remark: '@csentence(4,32)'
        }]
      }).list,
      billInfos: mock({
        'list|2-8': [{
          endDate: '@date(T)',
          fileName: '附件图片文件.jpg',
          fileUrl: 'http://localhost:3000/nas/download/1.jpg',
          gracePeriod: '@integer(1,100)',
          gracePeriodRate: '@float(0,1)',
          graceUseDays: '@integer(1,100)',
          id: '@id',
          paperAmount: '@float(1,100000)',
          paperExpiredDate: '@date(T)',
          paperFrom: '@cname',
          paperFromBank: '@cname',
          paperFromDate: '@date(T)',
          paperGuarantee: '@cname',
          paperNumber: '@string(number,8)',
          paperUsed: '@cname',
          paperUsedBank: '@cname',
          rate: '@float(0,1)'
        }]
      }).list
    }
    return delayResp(data)
  }
}
