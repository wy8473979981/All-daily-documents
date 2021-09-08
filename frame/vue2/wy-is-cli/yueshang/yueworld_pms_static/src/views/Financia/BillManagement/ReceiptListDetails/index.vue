<!--
 * @Author: xza
 * @Date: 2021-07-30 10:58:23
 * @LastEditTime: 2021-08-23 18:27:19
 * @LastEditors: xza
 * @Description: 收据-详情
 * @FilePath: /baolong/src/views/Financia/BillManagement/ReceiptListDetails/index.vue
-->

<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="ReceiptListDetails"
      v-model="formDatas"
      :config="getConfig_"
      :has-menu="hasMenu"
      :update="update"
      :route-mess="routeMess"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn v-if="$route.query.id === 5 || $route.query.id === '5'" class="mr-12" type="reject" @click="cancellation">作废</ysn-btn>
        <ysn-btn v-if="$route.query.id === 2 || $route.query.id === '2' || $route.query.id === 6 || $route.query.id === '6'" class="mr-12" @click="recycle">回收</ysn-btn>
        <ysn-btn v-if="$route.query.id === 2 || $route.query.id === '2' || $route.query.id === 6 || $route.query.id === '6' || $route.query.id === 5 || $route.query.id === '5' " class="mr-12" type="reset" @click="print">打印</ysn-btn>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
import { pageConfig } from './config'
import { receiptListApi } from '@/api/receiptList'
export default ({
  name: 'ReceiptListDetails',
  props: {},
  data() {
    return {
      routeMess: {},
      // 左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      // 数据
      formDatas: {
        // 基本信息
        userInfo: {
          isTenant: '', // 是否租户
          operationDate: '', // 开票日期
          status: '', // 收据状态
          receiptId: '', // 收据编号
          securityCode: '', // 防伪编码
          remark: '' // 备注信息
        },
        // 收据明细
        detailedData: {
          tableData: [],
          tableConfig: [
            { t0: '序号', type: 'index', showFixed: true },
            { receiptId: '单据号', itemType: 'text', sortable: true },
            { feeName: '费项', itemType: 'text', sortable: true, fixedWidth: 220 },
            { paymentTypeName: '收款方式', itemType: 'text', sortable: true, fixedWidth: 180 },
            { amountOne: '金额(元)', itemType: 'text', type: 'money', sortable: true, fixedWidth: 200 },
            { remarkOne: '备注', itemType: 'text', sortable: true }
          ]
        },
        // 操作记录
        operationRecords: {
          tableData: [],
          tableConfig: [
            { t0: '序号', type: 'index', showFixed: true },
            { creatDate: '时间', itemType: 'text', sortable: true },
            { creator: '操作人', itemType: 'text', sortable: true },
            { creatContent: '操作内容', itemType: 'text', sortable: true }
          ]
        }
      }
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    getConfig_() {
      console.log(this.$route.query.id)
      if (this.$route.query.id === 5 || this.$route.query.id === '5') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.pageConfig = this.pageConfig.filter(i => {
          return i.title !== '操作记录'
        })
        return this.pageConfig
      } else {
        return this.pageConfig
      }
    }
  },
  created() {
    this.routeMess = this.$route.query
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.decorationEnterDetailBox(datas) // 详情数据接口
    }
  },
  methods: {
    /**
     * @description: 打印交互
     * @param {*}
     * @return {*}
     */
    print() {
      this.$message.success('收据打印成功')
      this.$router.push({ name: 'ReceiptList' })
    },
    /**
     * @description: 作废交互
     * @param {*}
     * @return {*}
     */
    cancellation() {
      this.$message.success('收据作废成功')
      this.$router.push({ name: 'ReceiptList' })
    },
    /**
     * @description: 回收交互
     * @param {*}
     * @return {*}
     */
    recycle() {
      this.$message.success('收据回收成功')
      this.$router.push({ name: 'ReceiptList' })
    },
    /**
     * @description: 详情数据接口
     * @param {*} datas
     * @return {*}
     */
    decorationEnterDetailBox(datas) {
      const that = this
      receiptListApi.receiptListDetails(datas).then(res => {
        if (res.userInfo) {
          that.formDatas.userInfo = res.userInfo
        }
        if (res.detailedData && res.detailedData.tableData !== undefined && res.detailedData.tableData.length > 0) {
          that.formDatas.detailedData.tableData = res.detailedData.tableData
          let id_ = this.$route.query.id
          if (id_ === 1 || id_ === '1' || id_ === 2 || id_ === '2' || id_ === 3 || id_ === '3' || id_ === 4 || id_ === '4') {
            that.formDatas.detailedData.tableConfig = that.formDatas.detailedData.tableConfig.filter(i => {
              return i.receiptId !== '单据号'
            })
          }
        }
        if (res.operationRecords && res.operationRecords.tableData !== undefined && res.operationRecords.tableData.length > 0) {
          that.formDatas.operationRecords.tableData = res.operationRecords.tableData
        }
        that.update++
      })
    }
  }
})
</script>

