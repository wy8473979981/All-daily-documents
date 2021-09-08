/*
 * @Description: 全局方法
 * @Author: zengcheng
 * @Date: 2021-06-23 13:32:41
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-27 17:33:25
 */
export default {
  data() {
    return {
    }
  },
  methods: {
    // 设置表格表单验证
    verification(list) {
      console.log(list)
      let successCount = 0
      const add = []
      console.log(list)
      return new Promise(function(resolve, reject) {
        Object.keys(list).forEach((key) => {
          add.push([key])
          Array.isArray(list[key]) ? list[key][0].validate((valid, failedObj) => {
            if (valid) {
              successCount++
            }
          }) : list[key].validate((valid, failedObj) => {
            if (valid) {
              successCount++
            }
          })
        })
        console.log(successCount, '----', add)
        if (successCount === add.length) {
          return resolve()
        }
        setTimeout(() => {
          var isError = document.getElementsByClassName('is-error')
          isError[0].querySelector('input').focus()
        }, 100)
      })
    },
    // 两个日期比大小 格式（0000-00-00）
    dateCompare(startdata, enddata) {
      console.log(startdata, enddata)
      var arr = startdata.split('-')
      var starttime = new Date(arr[0], arr[1], arr[2])
      var starttimes = starttime.getTime()

      var arrs = enddata.split('-')
      var lktime = new Date(arrs[0], arrs[1], arrs[2])
      var lktimes = lktime.getTime()

      if (starttimes > lktimes) {
        return false
      } else { return true }
    },
    timeSize(ol, or) {
      const x = new Date(ol)
      const j = new Date(or)
      console.log(x, j)
      if (x >= j) {
        return true
      } else {
        return false
      }
    }

  }
}
