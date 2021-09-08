<!--
 * @Author: xza
 * @Date: 2021-07-29 16:13:16
 * @LastEditTime: 2021-08-23 18:26:54
 * @LastEditors: xza
 * @Description: 收据-新增/编辑
 * @FilePath: /baolong/src/views/Financia/BillManagement/ReceiptListAdd/index.vue
-->

<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="getConfig"
      :has-menu="hasMenu"
      :update="update"
      :route-mess="routeMess"
      @comChange="comChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn v-if="$route.query.id === 1 || $route.query.id === '1' || !$route.query.id" class="mr-12" @click="toSave">保存</ysn-btn>
        <ysn-btn v-if="$route.query.id" class="mr-12" type="reject" @click="cancellation">作废</ysn-btn>
        <ysn-btn v-if="$route.query.id" class="mr-12" type="reset" @click="print">打印</ysn-btn>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
import { pageConfig } from './config'
import { receiptListApi } from '@/api/receiptList'
export default ({
  data() {
    return {
      routeMess: {},
      // 左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      flag: false, // 是否添加行
      // 数据
      formData: {
        // 基本信息
        userInfo: {
          isTenant: '', // 是否租户
          operationDate: '', // 开票日期
          status: '', // 收据状态
          receiptId: '', // 收据编号
          securityCode: '', // 防伪编码
          remark: '', // 备注信息
          contNo: '', // 合同编号
          programName: '', // 项目名称
          tenantName: '', // 商家/企业名称
          accountName: '', // 收款单位
          payConpanyName: '', // 缴款单位
          operationUser: '' // 经办人员
        },
        // 收据明细
        detailedData: {
          tableData: []
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
    getConfig() {
      if (this.$route.query.id) {
        return this.pageConfig
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.pageConfig = this.pageConfig.filter(i => {
          return i.title !== '操作记录'
        })
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
      this.editStatus = true
    } else {
      // 获取当前时间
      this.getNowTime()
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
     * @description: 获取当前时间
     * @param {*}
     * @return {*}
     */
    getNowTime() {
      var date = new Date()
      var year = date.getFullYear()
      var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.formData.userInfo.operationDate = year + '-' + month + '-' + day
    },
    comChange(val) {
      console.log(val)
      if (val.type === '1') {
        this.formData.userInfo = val.data
      } else if (val.type === '2') {
        console.log(val.data)
        this.formData.detailedData.tableData[Number(val.data.id - 1)] = val.data
      } else if (val.type === '3') {
        this.flag = true
      }
    },
    // 详情数据接口
    decorationEnterDetailBox(datas) {
      const that = this
      receiptListApi.receiptListDetails(datas).then(res => {
        if (res.userInfo) {
          that.formData.userInfo = res.userInfo
        }
        if (res.detailedData && res.detailedData.tableData !== undefined && res.detailedData.tableData.length > 0) {
          that.formData.detailedData.tableData = res.detailedData.tableData
        }
        if (res.operationRecords && res.operationRecords.tableData !== undefined && res.operationRecords.tableData.length > 0) {
          that.formData.operationRecords.tableData = res.operationRecords.tableData
        }
        that.update++
      })
    },
    // 保存
    toSave() {
      console.log(this.formData.detailedData.tableData)
      const that = this
      this.$nextTick(async() => {
        // 校验是否符合规则
        const res = await this.$refs.pageDetail.valiFormDate()
        if (res) {
          that.saveMarginProcessingBox(that.formData)
        }
      })
      // Object.assign(obj, this.formData.userInfo)
      // obj.list.push(this.formData.userInfo)
      // console.log(obj)
      // if (obj.isTenant === '' || obj.operationDate === '') {
      //   this.$message.error('请输入是否租户或选择开票日期！')
      //   return
      // }
      // if (this.flag) { // 判断是否添加了行 从而判断判断是否必填项
      //   if (obj.list[0].feeName === '' || obj.list[0].paymentTypeName === '') {
      //     this.$message.error('请选择费项与收款方式！')
      //     return
      //   }
      // }
      // receiptListApi.feeSave(obj).then(res => {
      //   if (res.code === 200) {
      //     this.$message({
      //       message: '保存成功',
      //       type: 'success'
      //     })
      //     // this.$router.push({ name: 'ReceiptList' })
      //   }
      // })
    },
    // 保存的请求
    saveMarginProcessingBox(datas) {
      const that = this
      receiptListApi.feeSave(datas).then(res => {
        if (res) {
          that.$message({ message: '提交成功', type: 'success' })
          setTimeout(() => {
            that.$router.go(-1)
          }, 1000)
        }
      })
    }
  }
})
</script>

