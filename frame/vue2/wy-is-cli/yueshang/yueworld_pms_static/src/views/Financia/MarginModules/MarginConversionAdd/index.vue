<!--
 * @Author: xza
 * @Date: 2021-07-23 17:28:30
 * @LastEditTime: 2021-09-06 13:10:39
 * @LastEditors: Please set LastEditors
 * @Description: 保证金转换单新增
 * @FilePath: /baolong/src/views/Financia/MarginModules/MarginConversionAdd/index.vue
-->

<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      :examine-page="adress"
      @comChange="comChange"
      @changeDate="changeDate"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn v-if="$route.query.id === 4 || $route.query.id === '4' || !$route.query.id || $route.query.id === 2 || $route.query.id === '2'" class="mr-12" @click="saveBox(1)">发起审核</ysn-btn>
        <ysn-btn v-if="$route.query.id === 7 || $route.query.id === '7' || !$route.query.id || $route.query.id === 2 || $route.query.id === '2'" class="mr-12" @click="saveBox(1)">提交审核</ysn-btn>
        <ysn-btn type="info" class="mr-12" @click="saveBox(0)">暂存</ysn-btn>
        <ysn-confirm
          v-if="$route.query.id"
          title="提示"
          width="484px"
          top="120px"
          :content="`是否确认删除?`"
          tip="此操作将永久删除,不可撤回,请谨慎操作"
          @confirm="delete_"
        >
          <ysn-btn class="mr-12" type="delete">删除</ysn-btn>
        </ysn-confirm>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
import { pageConfig } from './config'
import { marginConversionApi } from '@/api/marginConversion'
export default {
  name: 'MarginConversionAdd',
  props: {},
  data() {
    return {
      adress: '',
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      editStatus: false,
      // 详情id
      id: 0,
      // 统一数据
      formData: {
        baseInfo: {
          // 详情数据
          inContNo: '', // 转入合同
          programName: '', // 项目
          ConversionDate: '', // 转换日期
          outTenantName: '', // 转出商家
          conversionNo: '', // 转换单号
          inTenantName: '', // 转入商家
          description: '' // 备注
        },
        // 转换明细
        detailedData: {
          configTop: [
            { text: '可转入金额汇总(元)', value: 0 },
            { text: '转入金额汇总(元)', value: 0 },
            { text: '冲抵金额汇总(元)', value: 0 }
          ],
          tableData: [
          ] // 表格数据
        },
        // 冲抵明细
        balanceData: {
          configTop: [
            { text: '未核销金额汇总(元)', value: 0 },
            { text: '保证金冲抵金额汇总(元)', value: 0 }
          ],
          tableData: [
          ] // 表格数据
        },
        // 审核记录
        historyShow: {
          tableData: [

          ], // 表格数据
          tableConfig: [ // 表单配置
            { feeName: '处理时间', width: '200px' },
            { receivableNo: '处理者', width: '200px' },
            { receivableDate: '步骤', width: '200px' },
            { accrualDate: '操作说明', width: '200px' }
          ]
        }
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      // 草稿状态没有 审核记录按钮
      if (this.$route.query.id === 4 || this.$route.query.id === '4') {
        this.adress = 'MarginConversionExamine'
      } else {
        this.adress = ''
      }
      if (this.$route.query.id == 4 || this.$route.query.id == 2) {
        console.log(1)
        this.pageConfig = this.pageConfig.filter(i => {
          return i.dataKey !== 'historyShow'
        })
      }
      // 详情数据接口
      this.getMarginConversionInfo(datas)
      this.editStatus = true
    } else {
      // 获取当前时间
      this.getNowTime()
    }
  },
  methods: {
    // 暂存
    saveBox(id) {
      const that = this
      this.$nextTick(async() => {
        // 校验是否符合规则
        const res = await this.$refs.pageDetail.valiFormDate()
        if (this.formData.detailedData.configTop[2].value !== this.formData.balanceData.configTop[1].value) {
          this.$message({
            message: '冲抵金额总数应等于保证金冲抵金额总数',
            type: 'error'
          })
          return
        }
        if (res) {
          that.saveMarginConversionAddBox(that.formData)
        }
      })
    },
    // 保存的请求
    saveMarginConversionAddBox(datas) {
      const that = this
      marginConversionApi.marginConversionSave(datas).then(res => {
        if (res) {
          that.$message({ message: '提交成功', type: 'success' })
          setTimeout(() => {
            that.$router.go(-1)
          }, 1000)
        }
      })
    },
    // 子组件事件
    comChange(val) {
      // 修改转换明细字段数据
      // 依据数组判断 数据来源
      if (Array.isArray(val)) {
        val.map(i => {
          if (i.accrualDate !== '202107') {
            // i.accountName = i.accountName + '/' + i.bankName + '/' + i.bankAccount
            // i.accountName = i.bankName
            this.flags = false
          } else {
            this.flags = true
          }
        })
        if (!this.flags) {
          const data_ = this.formData.detailedData.tableData.concat(val)
          this.formData.detailedData.tableData = this.notany(data_, 'outContNo')
        } else {
          const data1 = this.formData.balanceData.tableData.concat(val)
          this.formData.balanceData.tableData = this.notany(data1, 'contNo')
        }
        this.update++
      } else {
        if (!val.type) {
          this.formData.baseInfo = val
          this.update++
        }
      }
      if (val.type === 'new') {
        this.formData.detailedData.tableData.map(i => {
          if (i.outContNo === val.row.outContNo) {
            i.turnAmount = val.row.turnAmount * 1
            i.applicationAmount = val.row.applicationAmount * 1
          }
        })
        this.update++
      }
      if (val.type === 'new_') {
        this.formData.balanceData.tableData.map(i => {
          if (i.receivableNo === val.row.receivableNo) {
            i.offsetAmount = val.row.offsetAmount * 1
          }
        })
        this.update++
      }
      // 转换
      let sum = 0
      let sum1 = 0
      let sum2 = 0
      this.formData.detailedData.tableData.map(i => {
        sum += i.turnableAmount
        sum1 += i.turnAmount
        sum2 += i.applicationAmount
      })
      this.formData.detailedData.configTop = [
        { text: '可转入金额汇总(元)', value: sum },
        { text: '转入金额汇总(元)', value: sum1 },
        { text: '冲抵金额汇总(元)', value: sum2 }
      ]
      // 冲抵
      let sum_ = 0
      let sum1_ = 0
      this.formData.balanceData.tableData.map(i => {
        sum_ += i.realReceivableAmount
        sum1_ += i.offsetAmount
      })
      this.formData.balanceData.configTop = [
        { text: '未核销金额汇总(元)', value: sum_ },
        { text: '保证金冲抵金额汇总(元)', value: sum1_ }
      ]
    },
    // 去重
    notany(data, type) {
      const newArr = []
      const arrId = []
      for (var k of data) {
        if (arrId.indexOf(k[type]) === -1) {
          arrId.push(k[type])
          newArr.push(k)
        }
      }
      return newArr
    },
    // 获取当前时间
    getNowTime() {
      var date = new Date()
      var year = date.getFullYear()
      var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.formData.baseInfo.ConversionDate = year + '-' + month + '-' + day
    },
    // 删除后更新数据
    changeDate(e) {
      if (e.row.outContNo) {
        this.formData.detailedData.tableData = this.formData.detailedData.tableData.filter(i => {
          return i.outContNo !== e.row.outContNo
        })
        let sum = 0
        let sum1 = 0
        let sum2 = 0
        this.formData.detailedData.tableData.map(i => {
          sum += i.turnableAmount
          sum1 += i.turnAmount
          sum2 += i.applicationAmount
        })
        this.formData.detailedData.configTop = [
          { text: '可转入金额汇总(元)', value: sum },
          { text: '转入金额汇总(元)', value: sum1 },
          { text: '冲抵金额汇总(元)', value: sum2 }
        ]
        this.update++
        return
      }
      this.formData.balanceData.tableData = this.formData.balanceData.tableData.filter(i => {
        return i.contNo !== e.row.contNo
      })
      // 冲抵
      let sum_ = 0
      let sum1_ = 0
      this.formData.balanceData.tableData.map(i => {
        sum_ += i.realReceivableAmount
        sum1_ += i.offsetAmount
      })
      this.formData.balanceData.configTop = [
        { text: '未核销金额汇总(元)', value: sum_ },
        { text: '保证金冲抵金额汇总(元)', value: sum1_ }
      ]
    },
    // 接口获取列表数据
    getMarginConversionInfo(datas) {
      const that = this
      marginConversionApi.marginConversionDetails(datas).then(res => {
        if (res.baseInfo) {
          that.formData.baseInfo = res.baseInfo
        }
        if (res.convertDetail && res.convertDetail.tableData !== undefined && res.convertDetail.tableData.length > 0) {
          that.formData.detailedData.tableData = res.convertDetail.tableData
          console.log(that.formData.detailedData.tableData)
          // 转换
          let sum = 0
          let sum1 = 0
          let sum2 = 0
          this.formData.detailedData.tableData.map(i => {
            sum += i.turnableAmount
            sum1 += i.turnAmount
            sum2 += i.applicationAmount
          })
          this.formData.detailedData.configTop = [
            { text: '可转入金额汇总(元)', value: sum },
            { text: '转入金额汇总(元)', value: sum1 },
            { text: '冲抵金额汇总(元)', value: sum2 }
          ]
        }
        if (res.pushMDetail && res.pushMDetail.tableData !== undefined && res.pushMDetail.tableData.length > 0) {
          that.formData.balanceData.tableData = res.pushMDetail.tableData
          // 冲抵
          let sum_ = 0
          let sum1_ = 0
          this.formData.balanceData.tableData.map(i => {
            sum_ += i.realReceivableAmount
            sum1_ += i.offsetAmount
          })
          this.formData.balanceData.configTop = [
            { text: '未核销金额汇总(元)', value: sum_ },
            { text: '保证金冲抵金额汇总(元)', value: sum1_ }
          ]
        }
        // if (res.historyShow && res.historyShow.tableData !== undefined && res.historyShow.tableData.length > 0) {
        //   this.formData.historyShow.tableData = res.historyShow.tableData
        // }
        that.update++
      })
    },
    // 删除当前列表
    delete_() {
      const id = {
        id: this.$route.query.id
      }
      marginConversionApi.marginConversionDelete(id).then(async() => {
        await this.$message({
          message: '删除成功',
          type: 'success'
        })
        await this.$router.push({ name: 'MarginConversion' })
      })
    }
  }
}
</script>
<style scoped>
.app-page-main ::v-deep textarea{
  min-height: 96px !important;
}
</style>
