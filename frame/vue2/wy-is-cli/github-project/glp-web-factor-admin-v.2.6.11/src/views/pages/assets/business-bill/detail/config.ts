import { FieldDef, GridFieldDef, TableColumnDef } from '@/types'
import { formatter } from '@/config/form'
export const defsFinance: Array<GridFieldDef | FieldDef> = [

  { type: 'plain', model: 'effectTime', label: '基础债权生效时间' },
  { type: 'plain', model: 'expirationTime', label: '基础债权失效时间' },
  { type: 'plain', model: 'projectName', label: '项目名称' },
  { type: 'plain', model: 'orderNumber', label: '融资订单号' }
]

export const defsBase: Array<GridFieldDef | FieldDef> = [

  { type: 'plain', model: 'claimNumber', label: '单据号' },
  { type: 'plain', model: 'claimType', label: '单据类型' },
  { type: 'plain', model: 'channelType', label: '渠道系统' },
  { type: 'plain', model: 'url', label: '单据文件' },
  { type: 'plain', model: 'sellerCompanyName', label: '卖方信息' },
  { type: 'plain', model: 'tradeAmount', label: '单据金额' },
  { type: 'plain', model: 'receiveTime', label: '单据接收日期' },
  { type: 'plain', model: 'active', label: '有效状态', options: { formatter: formatter('transcode', 'active_status') } },
  { type: 'plain', model: 'status', label: '流转状态', options: { formatter: formatter('transcode', 'claim_circulation_status') } },
  { type: 'plain', model: 'voidUser', label: '作废人' },
  { type: 'plain', model: 'voidTime', label: '作废时间' },
  { type: 'plain', model: 'voidReason', label: '作废原因' }
]

export const defsExtend1040: Array<GridFieldDef | FieldDef> = [
  { type: 'plain', model: 'dataType', label: '单据类型' },
  { type: 'plain', model: 'departureId', label: '发车单ID' },
  { type: 'plain', model: 'lineId', label: '线路ID' },
  { type: 'plain', model: 'billingTime', label: '发车单开单时间' },
  { type: 'plain', model: 'departureTime', label: '发车时间' },
  { type: 'plain', model: 'amountUnit', label: '里程数' },
  { type: 'plain', model: 'amountCount', label: '配载重量（kg）' },
  { type: 'plain', model: 'amountVolume', label: '配载体积（m³）' },
  { type: 'plain', model: 'stowedQuantity', label: '配载件数' },
  { type: 'plain', model: 'unit', label: '计价单位' },
  { type: 'plain', model: 'quantity', label: '计价单位数量' },
  { type: 'plain', model: 'unitPrice', label: '单价' },
  { type: 'plain', model: 'transportFee', label: '运费金额' },
  { type: 'plain', model: 'ETCFee', label: 'ETC费用' },
  { type: 'plain', model: 'fuelFee', label: '燃油费用' },
  { type: 'plain', model: 'currentStateName', label: '发车单状态' },
  { type: 'plain', model: 'currentStateTime', label: '当前状态时间' },
  { type: 'plain', model: 'settlementStatus', label: '结算状态' },
  { type: 'plain', model: 'amountWayBillFinished', label: '已结运费金额' },
  { type: 'plain', model: 'carNumber', label: '车牌号' },
  { type: 'plain', model: 'carModel', label: '车型' },
  { type: 'plain', model: 'carLength', label: '车长' },
  { type: 'plain', model: 'driverName', label: '司机姓名' },
  { type: 'plain', model: 'driverPhone', label: '司机电话' },
  { type: 'plain', model: 'trailerPlateNumber', label: '挂车牌号' },
  { type: 'plain', model: 'carrier', label: '承运商' },
  { type: 'plain', model: 'carrierId', label: '承运商ID' },
  { type: 'plain', model: 'certificateNo', label: '承运商统一社会信用代码' }
]

// 公路运单表格
export const columns1040: TableColumnDef[] = [
  { prop: 'ETCFee', label: 'ETC费用', minWidth: '150px' },
  { prop: 'amountUnit', label: '里程数', minWidth: '150px' },
  { prop: 'arrivalTime', label: '到达时间', minWidth: '150px' },
  { prop: 'billFinishTime', label: '单据完成时间', minWidth: '150px' },
  { prop: 'carLength', label: '车长', minWidth: '150px' },
  { prop: 'carModel', label: '车型', minWidth: '150px' },
  { prop: 'carNumber', label: '车牌号', minWidth: '150px' },
  { prop: 'driverName', label: '司机姓名', minWidth: '150px' },
  { prop: 'driverPhone', label: '司机电话', minWidth: '150px' },
  { prop: 'fuelFee', label: '燃油费用', minWidth: '150px' },
  { prop: 'startTime', label: '发车时间', minWidth: '150px' },
  { prop: 'trailerPlateNumber', label: '挂车号牌', minWidth: '150px' },
  { prop: 'opt', label: '详情', minWidth: '150px', fixed: 'right' }
]

// 公路发货单表格
export const defsExtend1010: Array<GridFieldDef | FieldDef> = [
  { type: 'plain', model: 'dataType', label: '单据类型' },
  { type: 'plain', model: 'wayBillId', label: '运单ID' },
  { type: 'plain', model: 'departureId', label: '发车单ID' },
  { type: 'plain', model: 'shipperId', label: '货主ID' },
  { type: 'plain', model: 'shipperName', label: '货主名称' },
  { type: 'plain', model: 'lineId', label: '线路ID' },
  { type: 'plain', model: 'billingTime', label: '开单时间' },
  { type: 'plain', model: 'receiver', label: '收货人' },
  { type: 'plain', model: 'goodsType', label: '货物类型' },
  { type: 'plain', model: 'amountCount', label: '货物重量（kg）' },
  { type: 'plain', model: 'amountVolume', label: '货物体积（m³）' },
  { type: 'plain', model: 'stowedQuantity', label: '货物件数' },
  { type: 'plain', model: 'unit', label: '计价单位' },
  { type: 'plain', model: 'quantity', label: '计价单位数量' },
  { type: 'plain', model: 'unitPrice', label: '单价' },
  { type: 'plain', model: 'otherFee', label: '其他费用' },
  { type: 'plain', model: 'transportFee', label: '运费金额' },
  { type: 'plain', model: 'currentStateName', label: '运单状态' },
  { type: 'plain', model: 'currentStateTime', label: '当前状态时间' },
  { type: 'plain', model: 'settlementStatus', label: '结算状态' },
  { type: 'plain', model: 'amountWayBillFinished', label: '已结运费金额' },
  { type: 'plain', model: 'carrier', label: '承运商' },
  { type: 'plain', model: 'certificateNo', label: '承运商统一社会信用代码' }
]

// 公路发货单表格
export const columns1010: TableColumnDef[] = [
  { prop: 'shipperId', label: '运单ID', minWidth: '150px' },
  { prop: 'shipperName', label: '货主名称', minWidth: '150px' },
  { prop: 'receiver', label: '收货人', minWidth: '150px' },
  { prop: 'sender', label: '发货人', minWidth: '150px' },
  { prop: 'goodsType', label: '货物类型', minWidth: '150px' },
  { prop: 'opt', label: '详情', minWidth: '150px', fixed: 'right' }
]

// 公路发车单轨迹列表
export const extendColumns: TableColumnDef[] = [
  { prop: 'type', label: '类型', minWidth: '150px' },
  { prop: 'province', label: '省', minWidth: '150px' },
  { prop: 'city', label: '市', minWidth: '150px' },
  { prop: 'area', label: '区', minWidth: '150px' },
  { prop: 'detailedAddress', label: '详细地址', minWidth: '150px' },
  { prop: 'administrativeCode', label: '行政代码', minWidth: '150px' },
  { prop: 'latitude', label: '经度', minWidth: '150px' },
  { prop: 'longitude', label: '纬度', minWidth: '150px', fixed: 'right' }
]
