import Mock from 'mockjs'

const data = Mock.mock({
  'list|20-100': [{
    id: '@string(number, 8)',
    mainName: '上海' + '@ctitle(3,5)' + '有限公司',
    mainType: '@pick(["0", "1"])',
    contractAddr: '@county(true)',
    phone: '@pick(["139", "186", "177", "135", "182", "150"])' + '@string(number, 8)',
    cashToBank: '@pick(["中国银行", "工商银行", "广发银行"])',
    cashToAccountNo: '@pick(["6227", "6216", "6221"])' + '@string(number, 12)',
    'status|1': ['0', '1']
  }]
}).list

export default data
