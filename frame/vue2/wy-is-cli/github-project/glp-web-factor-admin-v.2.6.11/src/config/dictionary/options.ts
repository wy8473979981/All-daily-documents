import { provinces } from '../region'
import other from './otherOption'
// 本地字典以_开头，区分于服务端字典
const options: Record<string, Record<string | number, string>> = {
  _province: provinces,
  _yesOrNo: {
    0: '否',
    1: '是'
  },
  _orderAuditNode: {
    operationManagement: '运营经办',
    operationReview: '运营复核',
    financialVoucherPreparation: '财务制单'
  },
  _orderLoanFileType: {
    7: '中登文件'
  },
  _preauditFlowNodes: { // 订单预审节点
    BDReview: 'BD审核',
    operationReview: '运营审核',
    legalAffairsOffice: '法务经办',
    legalReview: '法务复核'
  },
  _orderSteps: {
    1: '申请中',
    2: '确权中',
    3: '审核中',
    4: '待放款',
    5: '还款中',
    6: '已结清'
  },
  _order5Steps: {
    1: '申请中',
    3: '审核中',
    4: '待放款',
    5: '还款中',
    6: '已结清'
  },
  _uploadStatus: {
    0: '未上传',
    1: '已上传'
  },
  // undetermeted
  status: {
    0: '无效',
    1: '有效'
  },
  clearType: { // 清分类型
    0: '无要求',
    1: '自动清分',
    2: '暂停自动清分'
  },
  paymentWay: { // 回款方式
    0: '电汇'
  },
  paymentType: { // 回款类型
    0: '直接回款',
    1: '间接回款'
  },
  paymentStatus: { // 回款状态
    0: '待处理',
    1: '已还款',
    2: '已拨付',
    3: '部分还款'
  },
  balanceReturnStatus: { // 余额拨付记录状态
    0: '审批中',
    1: '待拨付',
    2: '已拨付'
  },
  bussnessType: { // 业务类型
    0: '全部',
    1: '订单处理',
    2: '回款处理'
  },
  noticeStyle: { // 通知方式
    0: '全部',
    1: '短信',
    2: '邮件',
    3: '管理端站内信',
    4: '客户端站内信'
  },
  noteStatus: { // 通知状态
    0: '全部',
    1: '待发送',
    2: '发送成功',
    3: '发送失败'
  },
  controlStatus: {
    0: '开启',
    1: '关闭'
  },
  noticeStep: {
    0: '随时',
    1: '半小时',
    2: '一小时',
    3: '两小时'
  },
  invoiceType: { // 发票类型
    0: '正票',
    1: '红票'
  },
  applyChannel: { // 发票申请来源
    0: '购方申请',
    1: '销方申请',
    2: '系统申请'
  },
  charCustomerType: { // 客户类型
    ENTERPRISE: '企业',
    INDIVIDUAL: '个人'
  },
  customerType: { // 第三方
    1: '企业',
    2: '个人'
  },
  customerRole: { // 客户角色
    0: '融资方',
    1: '买方',
    2: '担保方'
  },
  accountEntityBank: { // 实体账户开户行
    0: '上海浦东发展银行',
    1: '平安银行',
    2: '广发银行'
  },
  accountProprity: { // 账户性质
    0: '实户',
    1: '虚户'
  },
  quotaStatus: { // 额度状态
    1: '生效',
    2: '失效',
    3: '已终结',
    4: '待生效'
  },
  basicDataMethod: {
    0: '人工上传',
    1: '数据对接'
  },
  basicType: {
    0: '无要求',
    1: '运单',
    2: '发票'
  },
  basicValidTime: {
    0: '无',
    1: '运单完成时间'
  },
  useStatus: { // 使用状态
    0: '禁用',
    1: '启用'
  },
  relationshipStatus: {
    0: '未开通',
    1: '已开通',
    2: '已关闭'
  },
  evidenceStatus: { // 凭证状态
    0: '作废',
    1: '正常'
  },
  syncJdeStatus: { // 同步JDE状态
    0: '同步成功',
    1: '待同步',
    2: '同步失败'
  },
  projectStatus: { // 项目状态
    0: '未启用',
    1: '已启用'
  },
  businessTypeName: { // 金融产品
    0: '普运贷',
    1: '普运保',
    2: '非普系'
  },
  realnameStatus: { // 登录是否实名1是0不是
    0: '未实名',
    1: '实名'
  },
  isOrNot: { // 登录是否实名1是0否
    0: '否',
    1: '是'
  },
  proxyerType: { // 代理人类型
    0: '客户签署代理人 '
  },
  accountType: {
    0: '内部员工',
    1: '外部客户'
  },
  creatorType: {
    1: '客户维护',
    2: '后台维护'
  },
  bankDateType: {
    0: '创建时间',
    1: '审核时间'
  },
  orderStatus: {
    10: '待审批',
    20: '通过',
    30: '不通过',
    40: '驳回'
  },
  signOrNot: {
    1: '需签署',
    2: '无需签署'
  },
  // 后端字典临时储存
  auditStatus: {
    1: '通过',
    2: '驳回',
    3: '拒绝',
    4: '审批中'
  },
  ...other
}

export default options
