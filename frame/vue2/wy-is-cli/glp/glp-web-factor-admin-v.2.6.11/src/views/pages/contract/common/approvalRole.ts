import { audit } from '@/config/workflow'

export const ApprovalRole: any = {
  1: '运营经办',
  2: '法务经理',
  3: '法务负责人',
  4: '运营复核',
  5: '审核通过'
}

export const passList: any = { // 通过
  1: '4',
  '1_no': '2',
  2: '3',
  '2_no': '3',
  3: '4',
  '3_no': '4',
  4: '5',
  '4_no': '5'
}
export const rejectList: any = { // 驳回
  2: '1',
  '2_no': '1',
  3: ['1', '2'],
  '3_no': ['1', '2'],
  4: '1',
  '4_no': ['1', '2', '3']
}
export const auditNodeEdit: any = {
  1: true,
  2: false,
  3: false,
  4: false,
  5: false
}
