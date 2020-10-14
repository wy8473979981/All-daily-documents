import { provinces } from '../region'
import tableOption from './tableOption'
// 本地字典以_开头，区分于服务端字典
const options: Record<string, Record<string | number, string>> = {
  _province: provinces,
  _yesOrNo: {
    0: '否',
    1: '是'
  },
  _uploadStatus: {
    0: '未上传',
    1: '已上传'
  },
  _orderSteps: {
    1: '申请中',
    2: '确权中',
    3: '审核中',
    4: '待放款',
    5: '还款中',
    6: '已结清'
  },
  status: {
    0: '无效',
    1: '有效'
  },
  _active: {
    0: '无效',
    1: '有效'
  },
  mainType: { // 主体类型
    0: '企业',
    1: '个人'
  },
  legalCardType: { // 法人代表证件类型
    0: '身份证',
    1: '护照'
  },
  isCombination: { // 是否三证合一
    0: '是',
    1: '否'
  },
  bussnessType: {
    0: '运单',
    1: '油卡',
    2: '发车单',
    3: '水运单'
  },
  flowStatus: {
    1: '审核不通过',
    2: '系统审核通过',
    3: '人工审核中',
    4: '已支付',
    5: '已失效'
  },
  effectiveStatus: {
    1: '无效',
    2: '未转让',
    3: '转让锁定',
    4: '已转让',
    5: '作废'
  },
  filenameList: {
    0: '补充协议'
  },
  ...tableOption
}

export default options
