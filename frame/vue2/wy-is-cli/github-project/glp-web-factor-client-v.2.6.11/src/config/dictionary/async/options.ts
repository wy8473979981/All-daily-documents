import { http } from '@/api/http'
import { AsyncDict, AsyncDictionaryParams, AsyncDictFn } from './type'

const tranform = (__label: string, __value: string, data: any[] = []): AsyncDict[] => {
  const map: Record<string | number, AsyncDict> = {}
  data.forEach(v => {
    map[v[__value]] = Object.assign({ __label: v[__label], __value: v[__value] }, v)
  })
  return Object.values(map)
}

const get = ({ form, q }: any, name: string, code: string): undefined | AsyncDict[] => {
  if (!form) return
  if (form[name] && form[code] && !q) {
    return tranform(name, code, [{ [name]: form[name], [code]: form[code] }])
  } else {
    setTimeout(() => {
      form[name] = ''
    }, 0)
  }
}

const options: Record<string, AsyncDictFn> = {
  users: ({ form }: AsyncDictionaryParams) => {
    return http().get<any[]>(`/users/query?dept=${form?.dept}`).then(data => tranform('userName', 'userCode', data))
  },
  'project-name': ({ q, form }: AsyncDictionaryParams) => { // 授信项目
    const ret = get({ form, q }, 'projectName', 'projectId')
    if (ret) return Promise.resolve(ret)
    return http().post('/clientend/project/getProjectNameByLike', { projectName: q }).then(data => tranform('projectName', 'projectId', data))
  },
  'buyer-by-project': ({ form, store }: AsyncDictionaryParams) => { // 根据授信项目ID 获取 买卖方关系  (买方)
    const ret = get({ form }, 'buyerCompanyName', 'buyerCompanyId')
    if (ret) return Promise.resolve(ret)
    const projectId = form?.projectId
    if (!projectId) return Promise.resolve([])
    return http().post('/clientend/buyerSeller/getProjectBuySellInfoById', { projectId }).then(data => {
      const buyerList = data?.buyerList || []
      // const transferType = String(data?.billTransType || '')
      // if (store) store.transferType = transferType
      if (buyerList.length === 1 && form) {
        setTimeout(() => {
          form.buyerCompanyId = buyerList[0]?.buyOrSellId
        }, 10)
      }
      return tranform('buyOrSellName', 'buyOrSellId', buyerList)
    })
  },
  'seller-by-project': ({ form, store }: AsyncDictionaryParams) => { // 根据授信项目ID 获取 买卖方关系  (卖方)
    const ret = get({ form }, 'sellerCompanyName', 'sellerCompanyId')
    if (ret) return Promise.resolve(ret)
    const projectId = form?.projectId
    if (!projectId) return Promise.resolve([])
    return http().post('/clientend/buyerSeller/getProjectBuySellInfoById', { projectId }).then(data => {
      const sellerList = data?.sellerList || []
      const transferType = String(data?.billTransType || '')
      if (store) store.transferType = transferType
      if (sellerList.length > 0 && form) {
        setTimeout(() => {
          form.sellerCompanyId = sellerList[0]?.buyOrSellId
        }, 10)
      }
      return tranform('buyOrSellName', 'buyOrSellId', sellerList)
    })
  },
  'opposite-acct-name': ({ q, form }: AsyncDictionaryParams) => { // 付款方名称
    return http().get('/clientend/repayment/getOppositeAcctName').then(data => tranform('oppositeAcctName', 'oppositeAcctName', data))
  },
  'buyer-com-id': ({ q, form }: AsyncDictionaryParams) => { // 付款方名称
    return http().post('/clientend/clearing/buyers', {}).then(data => tranform('buyerCompName', 'buyerCompId', data))
  },
  'order-bank-account': ({ form }: AsyncDictionaryParams) => { // 融资订单放款账户
    const ret = get({ form }, 'accountName', 'accountId')
    if (ret) return Promise.resolve(ret)
    return http().post('/clientend/project/getBankPaymentListByPid', null, { params: { projectId: form?.projectId } }).then(data => tranform('bankAccountName', 'id', data))
  }
}

export default options
