<!--
 * @Author: xza
 * @Date: 2021-07-20 21:24:18
 * @LastEditTime: 2021-08-12 11:21:01
 * @LastEditors: xza
 * @Description: 保证金转换单详情
 * @FilePath: /baolong/src/views/Financia/MarginModules/MarginConversionDetails/index.vue
-->

<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
    >
      <template #btn>
        <ysn-btn v-if="$route.query.OA === true || $route.query.OA=== 'true'" @click="toOA">审核记录</ysn-btn>
        <template v-if="$route.query.id === 5 || $route.query.id === '5'">
          <ExamineDialog type="agree" @over="examineOver">
            <ysn-btn class="mx-12">同意</ysn-btn>
          </ExamineDialog>

          <ExamineDialog type="reject" @over="examineOver">
            <ysn-btn class="mr-12" type="delete">驳回</ysn-btn>
          </ExamineDialog>
        </template>
      </template>
    </ysn-pageAccorDetail>

  </div>
</template>
<script>
import ExamineDialog from './blocks/ExamineDialog.vue'
import { marginConversionApi } from '@/api/marginConversion'
import { pageConfig } from './config'
export default {
  name: 'MarginConversionDetails',
  components: { ExamineDialog },
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      // 进场装修详情页面id
      id: null,
      // 数据
      formData: {
        baseInfo: {
        // 详情数据
          programName: '', // 项目
          ConversionDate: '', // 转换日期
          outTenantName: '', // 转出商家
          conversionNo: '', // 转换单号
          inTenantName: '', // 转入商家
          inContNo: '', // 转入合同
          description: '' // 备注
        },
        // 转换明细
        convertDetail: {
          configTop: [
            { text: '可转入金额汇总(元)', value: 0 },
            { text: '转入金额汇总(元)', value: 0 },
            { text: '冲抵金额汇总(元)', value: 0 }
          ],
          tableData: [

          ], // 表格数据
          tableConfig: [ // 表单配置
            { outContNo: '转出意向/合同编号' },
            { outFeeName: '费项' },
            { accountName: '收款单位' },
            { turnableAmount: '可转入金额(元)', type: 'money' },
            { turnAmount: '转入金额(元)', type: 'money' },
            { applicationAmount: '冲抵金额(元)', type: 'money' }
          ]
        },
        // 冲抵明细
        pushMDetail: {
          configTop: [
            { text: '未核销金额汇总(元)', value: 0 },
            { text: '保证金冲抵金额汇总(元)', value: 0 }
          ],
          tableData: [

          ], // 表格数据
          tableConfig: [ // 表单配置
            { feeName: '收款费项' },
            { receivableNo: '应收编号' },
            { receivableDate: '应收日期' },
            { accrualDate: '权责月' },
            { receivableAmount: '应收金额(元)', type: 'money', width: '120px' },
            { verificationAmount: '已核销金额(元)', width: 200, type: 'money' },
            { subAmount: '减免金额(元)', type: 'money', width: 140 },
            { realReceivableAmount: '未核销金额(元)', width: 140, type: 'money' },
            { offsetAmount: '保证金冲抵金额(元)', width: '180px', type: 'money' },
            { note: '备注' }
          ]
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
      this.decorationEnterDetailBox(datas) // 详情数据接口
    }
    // OA不显示 审核历史
    if (this.$route.query.OA === true || this.$route.query.OA === 'true') {
      this.pageConfig = this.pageConfig.filter(i => {
        return i.dataKey !== 'historyShow'
      })
    }
  },
  methods: {
    /**
     * @description: 详情数据接口
     * @param {*} datas
     * @return {*}
     */
    decorationEnterDetailBox(datas) {
      const that = this
      marginConversionApi.marginConversionDetails(datas).then(res => {
        if (res.baseInfo) {
          that.formData.baseInfo = res.baseInfo
        }
        if (res.convertDetail && res.convertDetail.tableData !== undefined && res.convertDetail.tableData.length > 0) {
          that.formData.convertDetail.tableData = res.convertDetail.tableData
          // 转换
          let sum = 0
          let sum1 = 0
          let sum2 = 0
          this.formData.convertDetail.tableData.map(i => {
            sum += i.turnableAmount
            sum1 += i.turnAmount
            sum2 += i.applicationAmount
          })
          this.formData.convertDetail.configTop = [
            { text: '可转入金额汇总(元)', value: sum },
            { text: '转入金额汇总(元)', value: sum1 },
            { text: '冲抵金额汇总(元)', value: sum2 }
          ]
        }
        if (res.pushMDetail && res.pushMDetail.tableData !== undefined && res.pushMDetail.tableData.length > 0) {
          that.formData.pushMDetail.tableData = res.pushMDetail.tableData
          // 冲抵
          let sum_ = 0
          let sum1_ = 0
          this.formData.pushMDetail.tableData.map(i => {
            sum_ += i.realReceivableAmount
            sum1_ += i.offsetAmount
          })
          this.formData.pushMDetail.configTop = [
            { text: '未核销金额汇总(元)', value: sum_ },
            { text: '保证金冲抵金额汇总(元)', value: sum1_ }
          ]
        }
        if (res.historyShow && res.historyShow.tableData !== undefined && res.historyShow.tableData.length > 0) {
          that.formData.historyShow.tableData = res.historyShow.tableData
        }
        that.update++
      })
    },
    /**
     * @description: 同意/驳回
     * @param {*}
     * @return {*}
     */
    examineOver() {
      this.$router.push({ name: 'MarginConversion' })
    },
    /**
     * @description: 跳转OA
     * @param {*}
     * @return {*}
     */
    toOA() {
      this.$router.push({ name: 'MarginConversionExamine', query: { id: this.$route.query.id }})
    }

  }
}
</script>
