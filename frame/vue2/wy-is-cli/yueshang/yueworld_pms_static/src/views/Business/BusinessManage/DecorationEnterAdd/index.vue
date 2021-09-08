<!--
 * @Author: xiaoxie
 * @LastEditors: xiaoxie
 * @Description:进场装修新增页面
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      examine-page="DecorationEnterExamine"
      @comChange="comChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-12" @click="saveBox(1)">发起审核</ysn-btn>
        <ysn-btn type="info" class="mr-12" @click="saveBox(0)">暂存</ysn-btn>
        <ysn-confirm
          v-if="formData.id!==0"
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
import { investmentApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'DecorationEnterAdd',
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      editStatus: false,
      // 统一数据
      formData: {
        id: 0, // 详情id
        baseInfo: {
          // 详情数据
          contNo: '', // 合同编号
          programName: '', // 项目名称
          tenantName: '', // 商家名称
          leaseArea: '', // 租赁区域
          brandName: '', // 品牌名称
          spaceLeasableArea: '', // 计租面积（㎡）
          contBeginDate: '', // 合同开始日期
          contEndDate: '', // 合同结束日期
          decorationEnterDate: '', // 装修进场日期
          decorateEndDate: '', // 装修结束日期
          acceptanceDate: '', // 验收日期
          expectOpenDate: '', // 预计开业日期
          description: '' // 备注说明
        },
        // 费用信息
        feeInformationData: {
          tableData: [] // 表格数据
        },
        // 进场装修相关资料
        attachmentList: {
          tableData: [
            { fileName: '装修管理协议', attachment: [], disabled: true },
            { fileName: '消防安全责任书', attachment: [], disabled: true },
            { fileName: '租赁场所交付确认书', attachment: [], disabled: true },
            { fileName: '装修公司营业执照及资质', attachment: [], disabled: true },
            { fileName: '装修效果图文件', attachment: [], disabled: true },
            { fileName: '装修图纸审核意见书', attachment: [], disabled: true },
            { fileName: '消防审核意见书', attachment: [], disabled: true },
            { fileName: '施工效果图文件', attachment: [], disabled: true }
          ] // 表格数据
        }
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.formData.id = this.$route.query.id
      this.decorationEnterDetailBox(datas) // 详情数据接口
      this.editStatus = true
    }
  },
  methods: {
    // 暂存
    saveBox(submitType) {
      const that = this
      this.$nextTick(async() => {
        // 校验是否符合规则
        const res = await this.$refs.pageDetail.valiFormDate()
        if (res) {
          if (that.editStatus) {
            that.formData.submitType = 2
          } else {
            that.formData.submitType = submitType
          }
          that.saveDecorationEnterBox(that.formData)
        }
      })
    },
    // 保存的请求
    saveDecorationEnterBox(datas) {
      const that = this
      investmentApi.saveDecorationEnter(datas).then(res => {
        if (res) {
          that.$message({ message: '提交成功', type: 'success' })
          that.formData.baseInfo = {}
          setTimeout(() => {
            that.$router.go(-1)
          }, 1000)
        }
      })
    },
    // 详情数据接口
    decorationEnterDetailBox(datas) {
      const that = this
      investmentApi.decorationEnterDetail(datas).then(res => {
        if (res.baseInfo) {
          that.formData.baseInfo = res.baseInfo
        }
        if (res.feeInformationData && res.feeInformationData.tableData !== undefined && res.feeInformationData.tableData.length > 0) {
          that.formData.feeInformationData.tableData = res.feeInformationData.tableData
        }
        if (res.attachmentList && res.attachmentList.tableData !== undefined && res.attachmentList.tableData.length > 0) {
          that.formData.attachmentList.tableData = res.attachmentList.tableData
        }
        that.update++
      })
    },
    // 子组件事件
    comChange(val) {
      this.formData.baseInfo = { ...this.formData.baseInfo, ...val }
      val.feeInformationData.map(item => {
        const newItem = { ...item }
        item.disabled = true
        return newItem
      })
      this.formData.feeInformationData.tableData = val.feeInformationData
      this.update++
    },
    // 删除
    deleteBox() {
      const that = this
      const datas = {
        id: this.formData.id
      }
      investmentApi.decorationEnterDelete(datas).then(res => {
        that.$message({ message: '删除成功', type: 'success' })
        setTimeout(() => {
          that.$router.go(-1)
        }, 1000)
      })
    }
  }
}
</script>
