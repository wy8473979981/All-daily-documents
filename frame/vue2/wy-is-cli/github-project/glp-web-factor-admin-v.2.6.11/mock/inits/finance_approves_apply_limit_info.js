import Mock from 'mockjs'

const data = [
  {
    totalLimit: '10,000.00', // 客户授信额度
    occupiedLimit: '2,654.00(审批中：2,654.00，正在用信：0.00)', // 占用额度
    availLimit: '7,346.00', // 当前可用额度
    applyCreidt: '830.87', // 当前申请用信
    limitStatus: '生效', // 额度状态
    freezeLimit: '0.00', // 冻结额度
    parentLimit: '100,000.00', // 父额度
    parentOccupiedLimit: '2,654.00(审批中：2,654.00，正在用信：0.00)', // 父级占用额度
    expiredDate: '2022-04-12 00:00:00', // 额度失效时间
    parentAvailLimit: '97,346.00', // 父级当前可用额度
    parentLimitStatus: '生效', // 父级额度状态
    parentExpiredDate: '2023-04-12 00:00:00', // 父级额度失效时间
    parentFreezeLimit: '0', // 父级冻结额度
    singleLimit: '未限额', // 单笔额度限额
    monthLimit: '未限额', // 单月额度限额
    monthOccupiedLimit: '0'
  }
]

export default data
