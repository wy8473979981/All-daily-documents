// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '审核状态',
      key: 'checkStatusSales',
      list: [
        { label: '未审核', value: 0, dataKey: 'unreview' },
        { label: '已审核', value: 1, dataKey: 'reviewed' },
        { label: '已复核', value: 2, dataKey: 'checked' },
        { label: '已驳回', value: 3, dataKey: 'rejected' },
        { label: '调整中', value: 4, dataKey: 'adjusting' },
        { label: '已调整', value: 5, dataKey: 'adjusted' }
      ]
    }
  ]
}

export const tableDescConfig = function(data) {
  return [
    { text: '确认销售额合计(元)', value: data.savedSalesVolumeTotal },
    { text: '提成销售额合计(元)', value: data.confirmSalesVolumeTotal }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { id: '序号', type: 'index' },
    { date: '日期', isShow: true, width: 100, showFixed: true, fixed: true },
    { volumeOne: 'EXCEL导入销售额(元)', width: 188, isShow: true, isShowSlots: true, type: 'money' },
    { quantityOne: 'EXCEL导入笔数', width: 125, isShow: true },
    { volumeTwo: '商家上报销售额(元)', width: 170, isShow: true, isShowSlots: true, type: 'money' },
    { quantityTwo: '商家上报笔数', width: 120, isShow: true },
    { volumeThree: '第三方上报销售额', width: 150, isShow: true, type: 'money' },
    { quantityThree: '第三方上报笔数', width: 120, isShow: true },
    { confirmSalesVolume: '确认销售额(元)', width: 170, isShow: true, isShowSlots: true, type: 'money' },
    { checkStatusSalesValue: '审核状态', width: 80, isShow: true },
    { lastModificationTime: '最后修改时间', isShow: true, width: 130 }
  ]
}

export const formData = function(data, origin) {
  if (!origin) {
    var res = {
      statPeriod: [],
      commissionRental: 0,
      netSalesVolumeOld: '',
      resonForChange: '',
      netSalesVolumeStatus: 0,
      closeIconShow: false,
      netSalesVolume: '',
      attachment: [],
      netSalesVolumeChangeForm: {
        netSalesVolume: {
          tableList: []
        },
        netSalesVolumeHistory: {
          tableList: []
        }
      },
      itemChangeForm: {
        tableList: []
      },
      itemChangeHistoryForm: {
        tableList: []
      },
      categoryItemChangeForm: {
        tableList: []
      },
      categoryItemChangeHistoryForm: {
        tableList: []
      },
      checkConfirmForm: {
        tableList: []
      },
      checkVolumeOne: {
        tableList: []
      },
      checkVolumeTwo: {
        tableList: []
      },
      checkingConfirmForm: {
        tableList: [],
        resonForChange: ''
      },
      list: [],
      isClassDeduction: 0
    }
  } else {
    res = origin
  }
  if (data) {
    if (data.statPeriod) {
      res.statPeriod = data.statPeriod
    }
    if (data.netSalesVolume) {
      res.netSalesVolume = data.netSalesVolume
    }
    if (data.netSalesVolumeHistory) {
      res.netSalesVolumeHistory = data.netSalesVolumeHistory
    }
    if (data.contInfo) {
      res.contInfo = data.contInfo
    }
    if (data.list) {
      res.list = data.list
    }
    if (data.isClassDeduction) {
      res.isClassDeduction = data.isClassDeduction
    }
    if (data.attachment) {
      res.attachment = data.attachment
    }
  }
  if (res.netSalesVolume) {
    res.netSalesVolumeStatus = 1
  }
  return res
}

