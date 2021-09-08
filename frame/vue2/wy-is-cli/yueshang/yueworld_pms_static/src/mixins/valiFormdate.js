/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 详情页表单校验mixins
 */

const valFormDate = {
  methods: {
    // 接收需要校验的表单数组 并直接去config里面获取其他需要校验的数组
    valiFormDate(orderRefsList = []) {
      let valiDataList = [...orderRefsList]
      const groupDataList = []
      // 通过配置项去获取组件内需要校验的form
      if (this.config && this.config.length > 0) {
        this.config.forEach((item, index) => {
          // 分组校验处理 转换数据:{dataKey:分组名,list:校验表单}
          if (item.isGroup) {
            const groupObj = {
              dataKey: item.dataKey,
              list: []
            }
            item.group.forEach((g_item, g_index) => {
              if (g_item.valiForm && g_item.valiForm.length > 0) {
                try {
                  // 因为该页面组件内的组件都是遍历出来,所以refs是数组
                  this.formData[item.dataKey].forEach((_item, _index) => {
                    const obj = {
                      dataKey: item.dataKey,
                      valiList: [],
                      index: _index
                    }
                    g_item.valiForm.map(val => {
                      obj.valiList.push(this.$refs[g_item.dataKey + '_' + _index + '_' + g_index][0].$refs[val])
                    })
                    groupObj.list.push(obj)
                  })
                } catch (err) {
                  console.log(err)
                }
              }
            })
            groupDataList.push(groupObj)
          }
          if (item.valiForm && item.valiForm.length > 0) {
            try {
              // 因为该页面组件内的组件都是遍历出来,所以refs是数组
              item.valiForm.map(_item => {
                valiDataList.push(this.$refs[item.dataKey][0].$refs[_item])
              })
            } catch (err) {
              console.log(err)
            }
          }
        })
      }

      // 过滤undefined等值
      valiDataList = valiDataList.filter(item => item)
      // 校验必须走成功 直接返回Boolean
      return new Promise(async resolve => {
        /*
          常规表单校验
        */
        const successList = []
        // 每个单独校验
        await valiDataList.map(async item => {
          const res = await item.validate()
          if (res) {
            successList.push(res)
          }
        })
        // 返回校验结果
        const val = successList.length === valiDataList.length
        /*
          常规表单校验结束
        */

        /*
          分组表单校验
        */
        // group只保存校验未通过的
        // refsname组合:dataKey+数据下标+grop下标
        let groupVal = true
        let tabs = {}
        // 分组校验
        console.log(groupDataList)
        for (let i = 0; i < groupDataList.length; i++) {
          for (let n = 0; n < groupDataList[i].list.length; n++) {
            const groupValiList = []
            await groupDataList[i].list[n].valiList.map(async item => {
              try {
                if (item) {
                  const res = await item.validate()
                  groupValiList.push(res)
                }
              } catch (err) {
                console.log(err)
                console.log(item + 'error')
              }
            })
            if (groupValiList.length !== groupDataList[i].list[n].valiList.length && groupVal) {
              groupVal = false
              // 只记录第一次失败的tab
              console.log(groupDataList)
              tabs = {
                dataKey: groupDataList[i].dataKey,
                index: groupDataList[i].list[n].index
              }
            }
          }
        }

        // 校验失败定位到失败的tabs
        if (!groupVal) {
          this.groupStatus[tabs.dataKey].tabActive = tabs.index
          this.$forceUpdate()
        }

        // 返回校验结果
        resolve(val && groupVal)
        if (!val) {
          // 光标定位在以一个校验不通过项
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
        }
      })
    }
  },
  watch: {

  }
}

export default valFormDate
