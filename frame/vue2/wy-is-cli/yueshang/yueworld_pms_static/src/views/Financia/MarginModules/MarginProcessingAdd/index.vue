/*
 * @Author: xiaoxie
 * @Date: 2021-07-19 14:18:27
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-27 15:39:53
 *保证金处理单新增
 */
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      :examine-page="examinePageUrl"
      :examine="examinePage"
      :examine-btn="false"
      @comChange="comChange"
      @change="changeBox"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn v-if="oaStatus || checkStatus==1 || checkStatus==null" class="mr-12" @click="saveBox(1)">发起审核</ysn-btn>
        <ysn-btn v-if="!oaStatus || checkStatus==1" class="mr-12" @click="saveBox(1)">提交审核</ysn-btn>
        <ysn-btn type="info" class="mr-12" @click="saveBox(0)">暂存</ysn-btn>
        <ysn-confirm
          v-if="checkStatus==1 || checkStatus==4"
          title="提示"
          width="484px"
          top="120px"
          :content="`是否确认删除?`"
          tip="此操作将永久删除,不可撤回,请谨慎操作"
          @confirm="deleteBox"
        >
          <ysn-btn class="mr-12" type="delete">删除</ysn-btn>
        </ysn-confirm>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
import { pageConfig } from './config'
import { marginProcessingApi } from '@/api'
export default {
  name: 'MarginProcessingAdd',
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      editStatus: false,
      // 详情id
      id: 0,
      checkStatus: null, // 页面状态
      oaStatus: false,
      // 数据
      formData: {
        baseInfo: {
          // 详情数据
          contNo: '', // 合同编号
          programName: '', // 项目
          marginNo: '--系统自动生成--', // 处理单号
          brandName: '', // 品牌
          tenantName: '', // 商家
          leaseArea: '', // 租赁区域
          actionDate: '' // 处理日期
        },
        // 费用信息
        detailedData: {
          tableData: [] // 表格数据
        }
      },
      // 审核记录页面地址
      examinePageUrl: '',
      examinePage: ''
    }
  },
  created() {
    if (this.$route.query.id) {
      if (this.$route.query.checkStatus === 4 && this.$route.query.id === 7) {
        // 草稿
        this.examinePageUrl = 'MarginProcessingExamine'
      }
      this.checkStatus = this.$route.query.checkStatus
      this.oaStatus = this.$route.query.oaStatus
      if (!this.oaStatus && this.checkStatus !== 1) {
        this.examinePage = 'MarginProcessingExamine'
      }
      const datas = { id: this.$route.query.id }
      this.id = this.$route.query.id
      this.marginProcessingDetailBox(datas) // 详情数据接口
      this.editStatus = true
    } else {
      // 获取当前时间
      this.getNowTime()
    }
  },
  methods: {
    // 获取当前时间
    getNowTime() {
      var date = new Date()
      var year = date.getFullYear()
      var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.formData.baseInfo.actionDate = year + '-' + month + '-' + day
    },
    // 详情数据接口
    marginProcessingDetailBox(datas) {
      const that = this
      marginProcessingApi.marginProcessingDetail(datas).then(res => {
        if (res.baseInfo) {
          that.formData.baseInfo = res.baseInfo
        }
        if (res.detailedData && res.detailedData.tableData !== undefined && res.detailedData.tableData.length > 0) {
          that.formData.detailedData.tableData = res.detailedData.tableData
        }
        that.update++
      })
    },
    // 暂存
    saveBox(submitType) {
      const that = this
      this.$nextTick(async() => {
        // 校验是否符合规则
        const res = await this.$refs.pageDetail.valiFormDate()
        if (res) {
          that.saveMarginProcessingBox(that.formData)
        }
      })
    },
    // 保存的请求
    saveMarginProcessingBox(datas) {
      const that = this
      marginProcessingApi.saveMarginProcessing(datas).then(res => {
        if (res) {
          that.$message({ message: '提交成功', type: 'success' })
          setTimeout(() => { that.$router.go(-1) }, 1000)
        }
      })
    },
    // 子组件事件
    comChange(val) {
      const that = this
      switch (val.type) {
        case 'contractNoChange':
          this.formData.baseInfo = { ...this.formData.baseInfo, ...val.data }
          break
        case 'expenditureChange':
          if (val.data !== undefined && val.data.length > 0) {
            val.data.map(item => {
              const obj = {
                feeName: item.feeName,
                accountName: item.bankName,
                handleType: '',
                balance: item.balance,
                mayApllyAmount: item.mayApllyAmount,
                amount: '',
                reason: ''
              }
              that.formData.detailedData.tableData.push(obj)
            })
          }
          break
      }
      this.update++
    },
    changeBox(val) {
      const that = this
      if (val.detailedData.tableData !== undefined && val.detailedData.tableData.length > 0) {
        that.formData.detailedData.tableData = []
        val.detailedData.tableData.map(item => {
          that.formData.detailedData.tableData.push(item)
        })
      }
    },
    // 删除
    deleteBox() {
      const that = this
      const datas = { id: this.id }
      marginProcessingApi.deleteMarginProcessing(datas).then(res => {
        that.$message({ message: '删除成功', type: 'success' })
        setTimeout(() => { that.$router.go(-1) }, 1000)
      })
    }
  }
}
</script>
