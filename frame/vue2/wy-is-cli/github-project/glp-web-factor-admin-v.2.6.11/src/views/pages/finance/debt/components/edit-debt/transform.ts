import date from '@/filters/date'
import { uploadFromResp, uploadToRequest } from '@/config/form'

export function toRequest ({ base, receive, trans }: any): Record<string, any> {
  const contracts = base.contracts.map((v: any, i: number) => {
    const ret = Object.assign({}, v)
    ret.files = uploadToRequest(v.files)
    ret.main = i === 0 ? '1' : '0' // 主合同标志
    return ret
  })
  const files = uploadToRequest(base.files)
  const debtReceivable = Object.assign({}, base, receive, trans)
  const ret = Object.assign({}, base, receive, trans, { contracts, files })
  return ret
}

export function fromResp (data: any): { trans: Record<string, any>; receive: Record<string, any>; base: Record<string, any> } {
  const trans: Record<string, any> = {
    projectId: '',
    buyerCompanyId: '',
    sellerCompanyId: ''
  }
  const receive: Record<string, any> = {}
  const base: Record<string, any> = {
    debtReceivableNumber: '',
    contracts: [{}],
    transferType: ''
  }
  if (!data) return { trans, receive, base }

  Object.assign(trans, extract(data?.debtInfo || {}, 'projectId', 'projectName', 'sellerCompanyId', 'sellerCompanyName',
    'buyerCompanyId', 'buyerCompanyName'))
  Object.assign(receive, extract(data?.debtInfo || {}, 'sellerContact', 'sellerLawAddress', 'sellerNoticeMobile', 'sellerNoticeEmail',
    'buyerContact', 'buyerLawAddress', 'buyerNoticeMobile', 'buyerNoticeEmail'))
  Object.assign(base, extract(data?.debtInfo || {}, 'id', 'debtReceivableNumber', 'debtReceivableName', 'transferStartTime', 'transferEndTime',
    'amount', 'contentDescription', 'remark', 'transferType'))
  base.contracts = (data?.debtContractResponse || []).map((v: any) => {
    const item: any = extract(v?.contractInfo, 'contractName', 'contractCode', 'startTime', 'expireTime', 'id', 'fixDate')
    item.files = uploadFromResp(v.files || [])
    return item
  })
  base.files = uploadFromResp(data?.debtInfo?.files || [])

  return { trans, receive, base }

  function extract (target: Record<string, any>, ...keys: string[]) {
    const ret: any = {}
    keys.forEach(k => {
      let v = target[k]
      if (k !== 'fixDate' && (k.endsWith('Date') || k.endsWith('Time')) && v) {
        v = date(v, 'T')
      }
      if (v !== null && v !== undefined) ret[k] = v
    })
    return ret
  }
}
