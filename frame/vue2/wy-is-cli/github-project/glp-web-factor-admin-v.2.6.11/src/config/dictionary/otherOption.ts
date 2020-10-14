const options = {
  contractSignStatus: { // 合同台账-合同签署状态signStatus
    0: '未签署',
    30: '用户签署中',
    40: '签署完成',
    60: '撤销',
    70: '超时',
    80: '失败',
    81: '拒绝',
    90: '完成'
  },
  contractTypeId: { // 合同台账-合同类型
    1: '授信合同',
    2: '担保函',
    3: '保理合同',
    4: '代偿证明',
    5: '应收账款登记协议',
    6: '应收账款转让通知函',
    7: '通知函回执',
    8: '应收账款担保函',
    9: '应收账款保理合同',
    10: '自定义合同',
    11: '票据质押合同',
    12: '保理产品提用申请单'
  },
  signMethod: { // 合同台账-签署方式
    1: '网上签署',
    2: '线下签署',
    3: '邮件签署',
    4: '无需签署'
  },
  targetType: { // 合同台账-关联对象
    1: '授信额度',
    2: '买卖方关系',
    3: '应收账款',
    4: '融资订单',
    5: '合同'
  },
  contractAuditStatus: { // 合同审核状态
    1: '待审核',
    2: '审核中',
    3: '被驳回',
    4: '已通过'
  },
  contractAuditType: {
    1: '通过',
    2: '驳回'
  },
  emailNotifyStatus: {
    1: '未发送',
    2: '已发送',
    3: '发送成功',
    4: '发送失败'
  },
  invoiceType: {
    1: '增值税普通发票',
    2: '增值税专用发票',
    3: '机动车统一销售发票',
    4: '增值税普通发票(电子)'
  }
}
export default options
