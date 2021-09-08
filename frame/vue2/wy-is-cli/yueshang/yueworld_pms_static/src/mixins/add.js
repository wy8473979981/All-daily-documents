/*
 * @Author: fhj
 * @LastEditors: zengcheng
 * @Description:  详情页子组件mixins
 */
import moment from 'moment/moment'
import { random } from '@/utils'

const agreementTableRowSpan = {
  methods: {
    // // 后面删除
    minusData(index) {
      this.currentFormData.rentFreePeriod.splice(index, 1)
      this.currentFormData.rentFreePeriod = this.setTimeList(this.currentFormData.rentFreePeriod)
      this.setRowSpan()
    },
    // 自动拆分年
    // autoMergeDate(list) {
    //   const beginDate = new Date(this.listObj.businessAffairs.contBeginDate).getTime()
    //   const endDate = new Date(this.listObj.businessAffairs.contEndDate).getTime()
    //   const dayTime = (24 * 60 * 60 * 1000)
    //   const day = (endDate - beginDate) / dayTime
    //   const nx = Math.ceil(day / 365)
    //   const newList = []
    //   const disabledDate = []
    //   list.forEach((item, index) => {
    //     // 拆分年限
    //     for (let i = 0; i < nx; i++) {
    //       const newItem = { ...item }
    //       const begin = moment(beginDate + i * (365 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD')
    //       const end = moment(beginDate + (i + 1) * (365 * 24 * 60 * 60 * 1000) - (24 * 60 * 60 * 1000)).format('YYYY-MM-DD')
    //       newItem.beginningDate = begin
    //       newItem.classId = this.getId()
    //       newItem.optionsId = this.getId()
    //       newItem.classIdRowSpan = null
    //       newItem.idRowSpan = null
    //       newItem.optionsIdRowSpan = null
    //       i === (nx - 1) ? newItem.endingDate = this.listObj.businessAffairs.contEndDate : newItem.endingDate = end

    //       newItem.fixBeginningDate = newItem.beginningDate
    //       newItem.fixEndingDate = newItem.endingDate
    //       disabledDate.push(newItem.endingDate)
    //       disabledDate.push(newItem.beginningDate)
    //       newItem.timeId = this.getId() // 用于最终计算日期是否在一个分组内的 自动拆分时每一条都要有
    //       newList.push(newItem)
    //     }
    //   })
    //   this.disabledDate = disabledDate
    //   return newList
    // },
    // 把id相同的数据合并
    mergeData(list) {
      console.log('merge', list)
      const l = list.map(item => {
        const newItem = { ...item }
        // newItem.leaseArea = newItem.leaseArea
        return newItem
      })

      const newData = {}
      l.forEach((item, index) => {
        if (!newData[item.id]) {
          newData[item.id] = item
        } else {
          let list = []
          if (typeof item.leaseArea === 'object') {
            list = [...item.leaseArea]
          } else {
            list = [item.leaseArea]
          }

          let leaseArea = []
          if (typeof newData[item.id].leaseArea === 'object') {
            leaseArea = [...newData[item.id].leaseArea]
          } else {
            leaseArea = [newData[item.id].leaseArea]
          }
          newData[item.id].leaseArea = [...leaseArea, ...list]
        }
      })
      const newList = []
      for (const key in newData) {
        newList.push(newData[key])
      }
      return newList
    },
    // 手动拆分年月
    setTimeList(list) {
      const newList = [...list]
      let findId = ''// 寻找的id
      newList.forEach((item, index) => {
        const beginDate = item.fixBeginningDate
        const endDate = item.fixEndingDate

        // 数据清理
        item.freeStartDate = ''
        item.freeEndDate = ''

        // 默认赋值id
        if (findId === '') {
          findId = item.timeId
          item.freeStartDate = beginDate
          item.freeEndDate = ''
        }

        // 如果当前id不等于之前保存的id 说明是一个新的合并行
        if (findId !== item.timeId) {
          item.freeEndDate = beginDate
        }

        // 如果当前是最后一行或者如果当前id跟下一个id不匹配 清空findId 并且给当前item赋值结束时间
        if (index + 1 >= newList.length || (newList && newList[index + 1] && item.timeId !== newList[index + 1].timeId)) {
          findId = ''
          item.freeEndDate = endDate
        }
      })
      return newList
    },
    pickerOptionsBegin(row, index) {
      if (index === 0) {
        return false
      }
      var day = this.currentFormData.rentFreePeriod[index - 1].freeEndDate
      console.log(day)
      if (!day) {
        return {
          disabledDate(time) {
            return true
          }
        }
      }
      return {
        disabledDate(time) {
          return time.getTime() < new Date(day).getTime()
        }
      }
      // }
    },
    // 结束
    pickerOptionsEnd(row, index) {
      if (!row.freeStartDate) {
        return {
          disabledDate(time) {
            return true
          }
        }
      }
      return {
        disabledDate(time) {
          return time.getTime() < new Date(row.freeStartDate).getTime() + 1
        }
      }
      // }
    },
    // 隐藏单元格
    noRowSpan() {
      return {
        rowspan: 0,
        colspan: 0
      }
    },
    // 获取数字id
    getId() {
      // 多随机点 防止重复
      return random(0, 100000) + new Date().getTime() + random(0, random(0, 100000))
    },
    // 设置每个+的合并id
    getSpanArr(props) {
      // step1 先统计每个storePostion需要合并多少个rowspan
      // 遍历data 找到storePostion对应的开始rowspan 然后把其余的的rowspan都改成0
      const list = this.currentFormData.rentFreePeriod
      const rowData = {}
      // 合并行处理
      list.forEach((item, index) => {
        // 判断是否有id 没的话赋值
        if (!item[props]) {
          item[props] = this.getId()
        }

        // 先设置默认row
        if (!rowData[item[props]]) {
          rowData[item[props]] = {
            index: index,
            num: 0
          }
        }

        // 设置rowspan 默认设置不显示
        list[index][props + 'RowSpan'] = 0
        list[index][props + 'ShowAdd'] = false
        rowData[item[props]].num++
        // 再通过获取的index显示
        list[rowData[item[props]].index][props + 'RowSpan'] = rowData[item[props]].num
        list[rowData[item[props]].index][props + 'ShowAdd'] = true
      })

      // this.wholeObj.tableData = [...list]
      this.currentFormData.rentFreePeriod = [...list]
    },
    // 根据props清洗数据
    resetTimeList(props) {
      const list = JSON.parse(JSON.stringify(this.currentFormData.rentFreePeriod))
      list.forEach((el, index) => {
        if (el[props] > 0) {
          list[index].freeStartDate = ''
          list[index].freeEndDate = ''
        }
      })
      // this.wholeObj.tableData = list
      this.currentFormData.rentFreePeriod = list
    }
  }
}

export default agreementTableRowSpan

