import { project } from './../../workflow/options'
import { http } from '@/api/http'
import { AsyncDict, AsyncDictionaryParams, AsyncDictFn } from './type'
const tranform = (__label: string, __value: string, data: any[] = []): AsyncDict[] => {
  const map: Record<string | number, AsyncDict> = {}
  data && data.length >= 1 && data.forEach(v => {
    map[v[__value]] = Object.assign({ __label: v[__label], __value: v[__value] }, v)
  })
  return Object.values(map)
}

const getPassContractList: any = {
  url: '',
  result: []
}
const get = ({ form, q }: any, name: string, code: string): undefined | AsyncDict[] => {
  if (!form) return
  if (form[name] && (form[code] || form[code] === 0) && !q) {
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
  'account-bankname': ({ q }) => {
    console.log('form', q)
    return http().post('/backend/bank/supervisor/list', { bankAccountName: q }).then(data => tranform('acctName', 'bankAccountName', data.items))
  },
  'fae-companies': ({ form }: AsyncDictionaryParams) => {
    if (!form?.appId) return Promise.resolve([])
    return http().post('/glp-fae/company/list', { appId: form.appId }).then(data => tranform('companyName', 'companyCode', data))
  },
  'sceneName-by-appId': ({ form }: AsyncDictionaryParams) => {
    if (!form?.appId) return Promise.resolve([])
    return http().get(`/glp-fae/scene/getSceneInfo/${form.appId}`).then(data => tranform('sceneName', 'sceneCode', data))
  },
  'subject-name-by-appId': ({ form }: AsyncDictionaryParams) => {
    if (!form?.appId) return Promise.resolve([])
    return http().get(`/glp-fae/subject/getSubjectInfo/${form.appId}`).then(data => tranform('subjectName', 'id', data))
  },
  'jdeType-name-by-appId': ({ form }: AsyncDictionaryParams) => {
    if (!form?.appId) return Promise.resolve([])
    return http().get(`/glp-fae/dictionary/getJdeType/${form.appId}`).then(data => tranform('dictKey', 'dictValue', data))
  },
  'project-name': ({ q, form }: AsyncDictionaryParams) => { // 运营端 项目名称
    const ret = get({ form, q }, 'projectName', 'projectId')
    if (ret) return Promise.resolve(ret)
    return http().post('/backend/project/getProjectNameByLike', { projectName: q }).then(data => tranform('projectName', 'projectId', data))
  },
  'business-type-name': () => { // 运营端 项目金融产品模糊查询
    return http().post('/backend/project/getProjectBusinessByLike', {}).then(data => tranform('businessTypeName', 'businessType', data))
  },
  'user-bd-name': () => { // 运营端 项目BD负责人模糊查询
    return http().post('/backend/project/getCmNameByLike', {}).then(data => tranform('bdUserName', 'bdUserId', data))
  },
  'customer-name': ({ q }: AsyncDictionaryParams) => { // 运营端 客户名称模糊查询
    return http().post('/backend/customer/query/name', { name: q }).then(data => tranform('name', 'id', data))
  },
  'seller-account': ({ q, form }: AsyncDictionaryParams) => { // 运营端 卖方名称模糊查询
    const ret = get({ form }, 'sellerCompanyName', 'sellerCompanyId')
    if (ret) return Promise.resolve(ret)
    return http().post('/backend/buyerSeller/getSellerLikeByName', { customerName: q }).then(data => tranform('customerName', 'id', data))
  },
  'seller-account-project': ({ q, form }: AsyncDictionaryParams) => { // 运营端 卖方名称模糊查询
    return http().post('/backend/buyerSeller/getSellerLikeByName', { customerName: q, projectId: form?.projectId }).then(data => tranform('customerName', 'id', data))
  },
  'buyer-account-project': ({ q, form }: AsyncDictionaryParams) => { // 运营端 买方名称模糊查询
    return http().post('/backend/buyerSeller/getBuyerLikeByName', { customerName: q, projectId: form?.projectId }).then(data => tranform('customerName', 'id', data))
  },
  'buyer-account': ({ q, form }: AsyncDictionaryParams) => { // 运营端 买方名称模糊查询
    const ret = get({ form }, 'buyerCompanyName', 'buyerCompanyId')
    if (ret) return Promise.resolve(ret)
    return http().post('/backend/buyerSeller/getBuyerLikeByName', { customerName: q }).then(data => tranform('customerName', 'id', data))
  },
  'buyer-name-by-project': ({ form }: AsyncDictionaryParams) => { // 柯利买方查询
    return http().post('/backend/buyerSeller/kl/customer/list', { creditCode: form?.creditCode }).then(data => tranform('customerName', 'customerName', data.buyerCustomerList))
  },
  'seller-name-by-project': ({ form }: AsyncDictionaryParams) => { // 柯利卖方查询
    return http().post('/backend/buyerSeller/kl/customer/list', { creditCode: form?.creditCode }).then(data => tranform('customerName', 'customerName', data.sellerCustomerList))
  },
  'signer-details': ({ q, form }: AsyncDictionaryParams) => { // 签名方详情
    const ret = get({ form, q }, 'signerName', 'signerId')
    if (ret) return Promise.resolve(ret)
    if (!q) { return Promise.resolve([]) }
    return http().post('/backend/customer/query/name', { name: q }).then(data => tranform('name', 'id', data))
  },
  'signer-details1': ({ q, form }: AsyncDictionaryParams) => { // 签名方详情
    const ret = get({ form, q }, 'signerName1', 'signerId1')
    if (ret) return Promise.resolve(ret)
    if (!q) { return Promise.resolve([]) }
    return http().post('/backend/customer/query/name', { name: q }).then(data => tranform('name', 'id', data))
  },
  'signer-details2': ({ q, form }: AsyncDictionaryParams) => { // 签名方详情
    const ret = get({ form, q }, 'signerName2', 'signerId2')
    if (ret) return Promise.resolve(ret)
    if (!q) { return Promise.resolve([]) }
    return http().post('/backend/customer/query/name', { name: q }).then(data => tranform('name', 'id', data))
  },
  'signer-details3': ({ q, form }: AsyncDictionaryParams) => { // 签名方详情
    const ret = get({ form, q }, 'signerName3', 'signerId3')
    if (ret) return Promise.resolve(ret)
    if (!q) { return Promise.resolve([]) }
    return http().post('/backend/customer/query/name', { name: q }).then(data => tranform('name', 'id', data))
  },
  'getPass-contractList': ({ store, form }: AsyncDictionaryParams) => {
    const contractTypeId = form?.contractTypeId
    if (!contractTypeId) return Promise.resolve([])
    const oUrl = window.location.href
    let other = ''
    if (oUrl.includes('?')) {
      let query: any = oUrl.split('?')[1]
      if (query.includes('&')) {
        query = query.split('&')[1]
      }
      const projectId = query.split('=')[1]
      other = `projectId=${projectId}`
    }
    if (getPassContractList.url !== `${contractTypeId}&${other}`) {
      getPassContractList.url = `${contractTypeId}&${other}`
      return http().get(`/backend/contract/getPassContractListByProjectId?contractTypeId=${getPassContractList.url}`).then(data => {
        const result: any = data.map((item: any) => Object.assign({}, item, { __label: `${item.contractName}(${item.contractCode})`, __value: item.contractId }))
        getPassContractList.result = tranform('contractName', 'contractId', result)
        return getPassContractList.result
      })
    } else {
      return Promise.resolve(getPassContractList.result)
    }
  },
  'buyer-by-project': ({ form, store }: AsyncDictionaryParams) => { // 根据授信项目ID 获取 买卖方关系  (买方)
    const ret = get({ form }, 'buyerCompanyName', 'buyerCompanyId')
    if (ret) return Promise.resolve(ret)
    const projectId = form?.projectId
    if (!projectId) return Promise.resolve([])
    return http().post('/backend/buyerSeller/getProjectBuySellInfoById', { projectId }).then(data => {
      const buyerList = data?.buyerList || []
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
    return http().post('/backend/buyerSeller/getProjectBuySellInfoById', { projectId }).then(data => {
      const sellerList = data?.sellerList || []
      if (sellerList.length > 0 && form) {
        setTimeout(() => {
          form.sellerCompanyId = sellerList[0]?.buyOrSellId
        }, 10)
      }
      return tranform('buyOrSellName', 'buyOrSellId', sellerList)
    })
  }
}

export default options
