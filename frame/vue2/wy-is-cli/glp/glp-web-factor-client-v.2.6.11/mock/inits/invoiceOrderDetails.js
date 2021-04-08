import Mock from 'mockjs'
const data = Mock.mock({
  'list|20-100': [{
    orderId: '@string(number, 8)',
    amountReceivable: '@natural(1, 1000)',
    buyer: '@pick(["0", "1"])',
    seller: '@county(true)',
    actualPayee: '@pick(["139", "186", "177", "135", "182", "150"])' + '@string(number, 8)',
    date: '@pick(["中国银行", "工商银行", "广发银行"])',
    'status|1': ['0', '1']
  }]
}).list

export default data
