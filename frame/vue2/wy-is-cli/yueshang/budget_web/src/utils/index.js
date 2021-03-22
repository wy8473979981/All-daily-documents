import store from '../store/index'
const stringToEntity = (str) => {
  str = str.replace(/&lt;/g, '<')
  str = str.replace(/&gt;/g, '>')
  return str
}

const getDataType = (data) => {
  return Object.prototype.toString.call(data)
}

const getItemLength = data => {
  const obj = {}
  data.forEach(item => {
    if (!obj[item]) {
      obj[item] = 1
    } else {
      obj[item]++
    }
  })
  return obj
}

/**
  返回前N项和
  输入 [1,2,3,4,5]
  返回 [1,3,6,10,15]
 */

const getForePartSum = data => {
  const arr = []
  for (let i = 0; i < data.length; i++) {
    const arrSub = data.slice(0, i + 1)
    const sum = arrSub.reduce((a, c) => a + c, 0)
    arr.push(sum)
  }
  return arr
}
// const filterDuplicate = () => {

// }

// 数字处理：每三位添加,
const toThousands = (number) => {
  // let num = (number || 0).toString(), result = '';
  // while (num.length > 3) {
  //   result = ',' + num.slice(-3) + result;
  //   num = num.slice(0, num.length - 3);
  // }
  // if (num) { result = num + result; }
  // return result;
  // if(number.indexOf(',') >= 0) {
  //   number = number.split(',').join('')
  // }
  if (!isNaN(Number(number))) {
    return (Number(number).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  }
}
// 数字处理：每三位添加(去除小数点)
const toThousandsClean = (number) => {
  if (!isNaN(Number(number))) {
    return (parseInt(Number(number)) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  }
}
// 去除px单位获取数字
const removePx = (str) => {
  return str ? new Number(str.replace(/px/g, '')) : 0
}
// 获取元素margin与padding高度和
const mpHeight = (el, pd) => {
  // el 为class 查询
  const obj = el
  var pageStyle = null
  if (window.getComputedStyle) {
    pageStyle = getComputedStyle(obj, null)
  } else {
    pageStyle = obj.currentStyle// 兼容IE的写法
  }
  // offsetHeight = height + padding + border
  if (pd) {
    // 如有必要获取padding值
    return removePx(pageStyle.marginTop) + removePx(pageStyle.marginBottom) + removePx(pageStyle.paddingTop) + removePx(pageStyle.paddingBottom)
  }
  return removePx(pageStyle.marginTop) + removePx(pageStyle.marginBottom)
}
// 动态获取table高度
const getTableHeight = () => {
  let part = 0
  try {
    // 获取顶部Header高度 默认44
    var header = document.getElementsByClassName('el-header')[0]
    // console.log("获取顶部Header高度 默认44：header=",header.offsetHeight )
    // 获取筛选条件控件高度 默认 87/49；获取padding与margin 默认padding-bottom=10
    var tool = document.getElementsByClassName('tool-bar')
    // console.log("获取筛选条件控件高度 默认 87/49：tool=",tool[1].offsetHeight )
    // console.log("获取筛选条件控件 padding与margin 默认padding-bottom=10：tool=",mpHeight(tool[1]))
    // 获取容器page的padding与margin：默认padding=20
    var page = document.getElementsByClassName('list-page')
    // console.log("获取容器page的padding与margin：默认padding=20 margin=0: page=" + mpHeight(page[0]))
    // 获取分页控件高度默认 32；获取分页控件padding与margin 默认margin-top=10
    var paginator = document.getElementsByClassName('paginator-wrapper')
    // console.log("获取分页控件高度默认 32:paginator===" + paginator[0].offsetHeight)
    // console.log("获取分页控件padding与margin 默认margin-top=10 :paginator===" + mpHeight(paginator[0]))
    if (header) {
      part += header.offsetHeight
    }
    if (tool && tool[0] && !tool[1]) {
      part += tool[0].offsetHeight + mpHeight(tool[0], true)
    }
    if (tool && tool[1]) {
      part += tool[1].offsetHeight + mpHeight(tool[1], false)
    }
    if (page[0] && paginator[0]) {
      part += mpHeight(page[0], 1) + paginator[0].offsetHeight + mpHeight(paginator[0])
    } else if (page[0]) {
      part += mpHeight(page[0], 1)
    }
    // 获取page-title 导入数据、下载模板高度；获取padding与margin  如果有
    var title = document.getElementsByClassName('page-title')
    if (title.length > 0) {
      part += title[0].offsetHeight + mpHeight(title[0])
    }
    // 获取status-buttons 状态与操作按钮高度；获取padding与margin  如果有
    var buttons = document.getElementsByClassName('status-buttons')
    if (buttons.length > 0) {
      part += buttons[0].offsetHeight + mpHeight(buttons[0])
    }
    // 判断el-main是否出现x轴滚动条，并获取滚动条高度
    const main = document.getElementsByClassName('el-main')[0]
    if (main.scrollWidth > (main.innerWidth || main.clientWidth)) {
      part += main.offsetHeight - main.clientHeight
    }
    // 获取 面包屑 状态与操作按钮高度；获取padding与margin  如果有
    const breadcrumb = document.getElementsByClassName('app-breadcrumb')[0]
    if (breadcrumb) {
      part += breadcrumb.offsetHeight + mpHeight(breadcrumb)
    }
    if (store.state.isShowContent) {
      part -= 10 // 补偿10px
    }
    // 筛选条件
    const filterBox = document.getElementsByClassName('filter-box')[0]
    if (filterBox) {
      part += filterBox.offsetHeight + mpHeight(filterBox)
    }
    // console.log('动态非表格高度为：' + part)
  } catch (e) {
    console.log(e)
    return 250
  }
  return document.documentElement.clientHeight - part
}
const getDynamicTableHeight = (event) => {
  window.onresize = () => {
    return event.$store.commit('saveTableHeight', getTableHeight())
  }
  return event.$store.commit('saveTableHeight', getTableHeight())
}
const rTime = (date) => {
  if (!date) {
    return '-' // 建议返回'', 调用者获取返回结果再次判断，除非项目统一使用'-'
  }
  // 2020-01-01T00:00:00.000000Z 日期格式转换
  const myDate = new Date(date).toJSON()
  return new Date(new Date(myDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}
const deepClone = (obj) => { // 深度克隆对象
  if (obj) {
    const newObj = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          newObj[key] = (obj && typeof obj[key] === 'object') ? deepClone(obj[key]) : null
        }
      }
    }
    return newObj
  }
  return obj
}

/**
 *
 * @param {*} obj 当前行的数据
 * @param {*} key 当前列的字段key
 * @param {*} noValue 当前列是否是占位列，默认true('-')不是占位列，false('/')是占位列
 * @param {*} hasInput 当前列编辑状态下是否有编辑框，默认true('')有编辑框，false('-')没有编辑框
 * @param {*} budgetType 预算编制 合计的取值key
 * @param {*} unit 当前列金额显示的币种
 * @param {*} precise 当前列小数位
 *
 * 1.有输入框但是未输入显示 空；
 * 2.在编辑状态下没有输入框，数据是由系统返回或者计算出来的 ，无数据显示 - （例如合计行）；
 * 3.不存在显示数据的列（此列只是占位作用，应该只存在于合计行）只显示 /
 */
const returnValue = (obj, key, noValue = true, hasInput = true, budgetType = 'bizType', precise, unit) => {
  try {
    let yetai = '';//业态
    if (obj[budgetType]) {
      yetai = obj[budgetType]
    } else if (obj.subjectList) {
      yetai = obj.subjectList.subjectName
    }
    let value = obj[key];
    if (unit === void 0) { unit = ''; }
    if (precise === void 0) { precise = 2; }
    if (isNaN(value) || [null, undefined, ''].includes(value)) {
      if (yetai == '合计') {
        return noValue ? (value || '-') : (value || '/');
      } else {
        return hasInput ? (value || '') : (value || '-');
      }
    }
    var text = Number(value).toFixed(precise);
    var bit = text.indexOf('.') < 0 ? '' : text.substr(text.indexOf('.'));
    var f = text.replace(/\..*$/, '').split('').reverse().join('').replace(/(\d{3})\B/g, function (_, c) { return _ + ','; }).split('').reverse().join('') + bit;
    return f + unit;
  } catch (e) {
    console.log(e)
  }
}
const viewChartGather = {
  1: ["工资福利费", '/management/budgetView/disburse/wageWelfareFee'],
  2: ["培训费", '/management/budgetView/disburse/trainingFee'],
  3: ["招聘费", '/management/budgetView/disburse/recruitmentFee'],
  4: ["行政费用", '/management/budgetView/disburse/administrativeExpenseBudget'],
  5: ["差旅费", '/management/budgetView/disburse/travelFee'],
  6: ["业务招待费", '/management/budgetView/disburse/businessEntertainFee'],
  7: ["非生产性资产采购", '/management/budgetView/disburse/invalidPurchase'],
  8: ["企划费明细", '/management/budgetView/disburse/planningCostBudget'],
  9: ["清洁卫生费", '/management/budgetView/disburse/cleanHygieneBudget'],
  10: ["安全保卫费", '/management/budgetView/disburse/securityBudget'],
  11: ["绿化养护费", '/management/budgetView/disburse/greeningCostBudget'],
  12: ["工程维保费", '/management/budgetView/disburse/engineeringCostBudget'],
  13: ["能耗明细", '/management/budgetView/disburse/commonEnergyDetail'],
  29: ["租费收入-商业", '/management/budgetView/income/lease'],
  42: ["折旧费", '/management/budgetView/disburse/depreciationFee'],
  43: ["财务费用", '/management/budgetView/disburse/financeFee'],
  44: ["整租租赁成本", '/management/budgetView/disburse/rentalCost'],
  45: ["其他成本费用", '/management/budgetView/disburse/otherCostFee'],
  46: ["工程改造费", '/management/budgetView/disburse/projectReform'],
  47: ["返租支出", '/management/budgetView/disburse/leasebackPay'],
  48: ["委托管理收入-租金管理费收入", '/management/budgetView/income/rentManagementFee'],
  49: ["停车场收入", '/management/budgetView/income/parkingRevenue'],
  50: ["其他业务类型收入", '/management/budgetView/income/otherRevenue'],
  51: ["能耗汇总", '/management/budgetView/disburse/commonEnergySummary'],
  52: ["多经收入-商业", '/management/budgetView/income/wsn'],
  53: ["住宅 / 写字楼", '/management/budgetView/income/houseMassage'],
  54: ["委托管理收入-其他收入", '/management/budgetView/income/otherCommissionRevenue'],
  55: ["其他收入", '/management/budgetView/income/otherIncome'],
  57: ["联营收支明细", '/management/budgetView/income/consortiumIncome'],
  58: ["清洁卫生费明细", '/management/budgetView/disburse/cleanHygieneBudgetDetail'],
  59: ["安全保卫费明细", '/management/budgetView/disburse/securityBudgetDetail'],
  60: ["绿化养护费明细", '/management/budgetView/disburse/greeningCostBudgetDetail'],
  61: ["工程维保费明细", '/management/budgetView/disburse/engineeringCostBudgetDetail'],
  62: ["其他支出", '/management/budgetView/disburse/otherDisburse'],
  63: ["租费明细_住宅", '/management/budgetView/income/rentHouseMassage'],
  64: ["租费明细_写字楼", '/management/budgetView/income/rentXzl'],
  65: ["多经收入-住宅", '/management/budgetView/income/wsnHouseMassage'],
  66: ["多经收入-写字楼", '/management/budgetView/income/wsnXzl'],
  67: ["租费明细清欠", '/management/budgetView/income/rentClearMessage'],
  68: ["资金计划", '/management/budgetView/summary/fundPlan'],
  69: ["面积信息", '/management/budgetView/summary/areaInfo'],
  70: ["主要指标", '/management/budgetView/summary/mainTarget'],
  71: ["租费概况", '/management/budgetView/summary/rentpoints'],
  72: ["人事费用", '/management/budgetView/summary/staffCost'],
  73: ["行政费用概况", '/management/budgetView/summary/administrativeExpenseSurvey'],
  74: ["企划费", '/management/budgetView/summary/projectCost'],
  75: ["能耗费概况", '/management/budgetView/summary/energySurvey'],
  76: ["地产支付物业款项统计", '/management/budgetView/summary/propertyPaymentStatistics'],
  77: ["物业新增交房统计", '/management/budgetView/summary/propertyDeliveryStatistics'],
  78: ["项目信息", '/management/budgetView/summary/projectInfo'],
  79: ["人员信息", '/management/budgetView/summary/personInfo'],
  80: ["人数概况", '/management/budgetView/summary/personSurvey'],
  82: ["多经概况", '/management/budgetView/summary/wsngk'],
  83: ["物业多经概况", '/management/budgetView/summary/overviewPropertyManagement'],
}
const chartGather = {
  1: ["工资福利费", '/management/plait/disburse/wageWelfareFee'],
  2: ["培训费", '/management/plait/disburse/trainingFee'],
  3: ["招聘费", '/management/plait/disburse/recruitmentFee'],
  4: ["行政费用", '/management/plait/disburse/administrativeExpenseBudget'],
  5: ["差旅费", '/management/plait/disburse/travelFee'],
  6: ["业务招待费", '/management/plait/disburse/businessEntertainFee'],
  7: ["非生产性资产采购", '/management/plait/disburse/invalidPurchase'],
  8: ["企划费明细", '/management/plait/disburse/planningCostBudget'],
  9: ["清洁卫生费", '/management/plait/disburse/cleanHygieneBudget'],
  10: ["安全保卫费", '/management/plait/disburse/securityBudget'],
  11: ["绿化养护费", '/management/plait/disburse/greeningCostBudget'],
  12: ["工程维保费", '/management/plait/disburse/engineeringCostBudget'],
  13: ["能耗明细", '/management/plait/disburse/commonEnergyDetail'],
  29: ["租费收入-商业", '/management/plait/income/lease'],
  42: ["折旧费", '/management/plait/disburse/depreciationFee'],
  43: ["财务费用", '/management/plait/disburse/financeFee'],
  44: ["整租租赁成本", '/management/plait/disburse/rentalCost'],
  45: ["其他成本费用", '/management/plait/disburse/otherCostFee'],
  46: ["工程改造费", '/management/plait/disburse/projectReform'],
  47: ["返租支出", '/management/plait/disburse/leasebackPay'],
  48: ["委托管理收入-租金管理费收入", '/management/plait/income/rentManagementFee'],
  49: ["停车场收入", '/management/plait/income/parkingRevenue'],
  50: ["其他业务类型收入", '/management/plait/income/otherRevenue'],
  51: ["能耗汇总", '/management/plait/disburse/commonEnergySummary'],
  52: ["多经收入-商业", '/management/plait/income/wsn'],
  53: ["住宅 / 写字楼", '/management/plait/income/houseMassage'],
  54: ["委托管理收入-其他收入", '/management/plait/income/otherCommissionRevenue'],
  55: ["其他收入", '/management/plait/income/otherIncome'],
  57: ["联营收支明细", '/management/plait/income/consortiumIncome'],
  58: ["清洁卫生费明细", '/management/plait/disburse/cleanHygieneBudgetDetail'],
  59: ["安全保卫费明细", '/management/plait/disburse/securityBudgetDetail'],
  60: ["绿化养护费明细", '/management/plait/disburse/greeningCostBudgetDetail'],
  61: ["工程维保费明细", '/management/plait/disburse/engineeringCostBudgetDetail'],
  62: ["其他支出", '/management/plait/disburse/otherDisburse'],
  63: ["租费明细_住宅", '/management/plait/income/rentHouseMassage'],
  64: ["租费明细_写字楼", '/management/plait/income/rentXzl'],
  65: ["多经收入-住宅", '/management/plait/income/wsnHouseMassage'],
  66: ["多经收入-写字楼", '/management/plait/income/wsnXzl'],
  67: ["租费明细清欠", '/management/plait/income/rentClearMessage'],
  68: ["资金计划", '/management/plait/summary/fundPlan'],
  69: ["面积信息", '/management/plait/summary/areaInfo'],
  70: ["主要指标", '/management/plait/summary/mainTarget'],
  71: ["租费概况", '/management/plait/summary/rentpoints'],
  72: ["人事费用", '/management/plait/summary/staffCost'],
  73: ["行政费用概况", '/management/plait/summary/administrativeExpenseSurvey'],
  74: ["企划费", '/management/plait/summary/projectCost'],
  75: ["能耗费概况", '/management/plait/summary/energySurvey'],
  76: ["地产支付物业款项统计", '/management/plait/summary/propertyPaymentStatistics'],
  77: ["物业新增交房统计", '/management/plait/summary/propertyDeliveryStatistics'],
  78: ["项目信息", '/management/plait/summary/projectInfo'],
  79: ["人员信息", '/management/plait/summary/personInfo'],
  80: ["人数概况", '/management/plait/summary/personSurvey'],
  82: ["多经概况", '/management/plait/summary/wsngk'],
  83: ["物业多经概况", '/management/plait/summary/overviewPropertyManagement'],
}
const getNowFormatDate = () => {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
const subjectSerial = [
  '1.1.1.1',//业主物业租金收入（本年）
  '1.1.1.2',//业主物业租金收入（清欠)
  '1.1.2',//业主多经收入
  '1.1.3',//业主停车场收入
  '1.1.4',//业主其他收入
  '1.2.1',//业主前期委管支出
  '1.2.2',//业主租金管理费支出
  '1.2.3',//业主运营推广费支出
  '1.2.4',//业主信息系统维护费支出
  '1.2.5',//业主工程改造支出
  // '1.2.6',//业主税金及附加
  // '1.2.6.1',//业主流转税金及附加
  // '1.2.6.2',//业主房产税
  '2.1.1.1.1',//	商业咨询顾问收入
  '2.1.1.1.2',//	商业招商佣金收入
  '2.1.1.1.3',//	商业品牌使用费收入
  '2.1.1.1.4',//	商业招商推广费收入
  '2.1.1.1.5',//	商业开办费收入
  '2.1.1.2.1.1',//		商业管理费收入（本年）
  '2.1.1.2.1.2',//	商业管理费收入（清欠）
  '2.1.1.2.2',//	商业停车场收入
  '2.1.1.2.3',//	商业多种经营收入
  '2.1.1.2.4.1',//		商业租金管理费收入
  '2.1.1.2.4.2',//		商业运营推广费收入
  '2.1.1.2.4.3',//	商业信息系统维护费收入
  '2.1.1.2.5',//	商业其他业务类型收入
  '2.1.1.2.6.1',//		联营销售收入
  '2.1.1.2.6.2',//		联营销售成本
  '2.1.1.3.1.1',//		整租租金收入（本年）
  '2.1.1.3.1.2',//	整租租金收入（清欠）
  '2.1.1.3.2.1',//	返租租金收入（本年）
  '2.1.1.3.2.2',//		返租租金收入（清欠）
  '2.1.2.1.1',//	物业开办费收入
  '2.1.2.1.2',//		物业案场服务收入
  '2.1.2.1.3',//		物业前介服务收入
  '2.1.2.1.4',//		物业其他前期收入
  '2.1.2.2.1.1',//		物业服务费收入（本年）
  '2.1.2.2.1.2',//		物业服务费收入（清欠）
  '2.1.2.2.2.1',//		物业停车场收入
  '2.1.2.2.2.2',//		物业多种经营收入
  '2.1.2.2.2.3',//		物业其他收入
  '2.2.1.1.1',//人工福利费
  '2.2.1.1.2',//	其他人事费用
  '2.2.1.1.3',//	行政类费用
  '2.2.1.1.4',//	差旅费
  '2.2.1.1.5',//	业务招待费
  '2.2.1.1.6',//企划费
  '2.2.1.1.7',//	清洁卫生费
  '2.2.1.1.8',//	安全保卫费
  '2.2.1.1.9',//	绿化养护费
  '2.2.1.1.10',//	工程维保费
  '2.2.1.1.11.1',//	自用能耗成本
  '2.2.1.1.11.2',//	转售能耗成本
  '2.2.1.1.11.3',//	转售能耗收入
  '2.2.1.1.12',//	折旧费
  '2.2.1.1.13',//	财务费用
  '2.2.1.1.14',//	多经租赁成本
  '2.2.1.1.15',//	停车场租赁成本
  '2.2.1.1.16',//	其他成本费用
  '2.2.1.2.1.1',//整租租金支出
  '2.2.1.2.2.1',//	返租租金支出
  '2.2.2.1.1',//	人工福利费
  '2.2.2.1.2',//	其他人事费用
  '2.2.2.1.3',//	行政类费用
  '2.2.2.1.4',//	差旅费
  '2.2.2.1.5',//	业务招待费
  '2.2.2.1.6',//	企划费
  '2.2.2.1.7',//	清洁卫生费
  '2.2.2.1.8',//	安全保卫费
  '2.2.2.1.9',//绿化养护费
  '2.2.2.1.10',//	工程维保费
  '2.2.2.1.11.1',//	自用能耗成本
  '2.2.2.1.11.2',//	转售能耗成本
  '2.2.2.1.11.3',//	转售能耗收入
  '2.2.2.1.12',//	折旧费
  '2.2.2.1.13',//	财务费用
  '2.2.2.1.14',//	多经租赁成本
  '2.2.2.1.15',//	停车场租赁成本
  '2.2.2.1.16',//	其他成本费用
  '2.2.2.1.17',//	流转税金及附加
  '2.4',//		营业外收入
  '2.5',//		营业外支出
  '2.7',//		所得税
]

export {
  deepClone,
  rTime,
  returnValue,
  getForePartSum,
  stringToEntity,
  getDataType,
  getItemLength,
  toThousands,
  toThousandsClean,
  mpHeight,
  getDynamicTableHeight,
  chartGather,
  viewChartGather,
  getNowFormatDate,
  subjectSerial
}
