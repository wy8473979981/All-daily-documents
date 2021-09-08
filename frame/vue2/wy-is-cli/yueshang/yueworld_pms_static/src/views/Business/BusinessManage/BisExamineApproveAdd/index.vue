<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:开业审批新增页面
-->

<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      examine-page="BisExamineApproveExamine"
      @comChange="comChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-8" @click="save('send-check')">发起审核</ysn-btn>
        <ysn-btn class="mr-8" type="info" @click="save('save')">暂存</ysn-btn>
        <ysn-confirm
          v-if="id!==0"
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
import { approveApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'BisExamineApproveAdd',
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      id: 0,
      // 判断是编辑页面还是新增页面
      editOrAddStatus: false,
      formData: {
        detailInfo: { // 详情数据
          contNo: '', // 合同编号
          programName: '', // 项目名称
          tenantName: '', // 商家名称
          spaceName: '', // 铺位号
          brandName: '', // 品牌名称
          spaceLeasableArea: '', // 计租面积（㎡）
          contBeginDate: '', // 合同开始日期
          contEndDate: '', // 合同结束日期
          openDate: '', // 确认开业日期
          description: '' // 备注说明
        },
        feeInformationData: {
          // 表格数据
          tableData: []
        },
        firstCountList: {
          tableData: [] // 表格数据
        },
        formTableData: {
          tableData: [
            { attachment: [], fileName: '经营证照、资质证明', disabled: true },
            { attachment: [], fileName: '装修验收文件', disabled: true },
            { attachment: [], fileName: '开业装修文件', disabled: true },
            { attachment: [], fileName: '开业照片', disabled: true }
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
      this.id = this.$route.query.id
      this.editOrAddStatus = true// 编辑页面状态
      this.bisExamineApproveDetail(datas) // 详情数据接口
    }
  },
  activated() {
  },
  methods: {
    // 删除内容
    deleteBox() {
      const that = this
      const datas = {
        id: this.id
      }
      approveApi.approveDeleteList(datas).then(res => {
        that.$message({ message: '删除成功', type: 'success' })
        setTimeout(() => {
          that.$router.push({ name: 'BisExamineApprove' })
        }, 1000)
      })
    },
    // 暂存
    save(type) {
      const that = this
      that.$nextTick(async() => {
        const res = await that.$refs.pageDetail.valiFormDate()
        if (res) {
          if (that.editOrAddStatus) { // 编辑页面操作
            that.formData.id = that.id
          }
          if (type === 'save') {
            that.formData.submitType = 0
          } else if (type === 'send-check') {
            that.formData.submitType = 1
          }
          that.bisExamineApprove(that.formData)
        }
      })
    },
    // 暂存接口
    bisExamineApprove(data) {
      const that = this
      approveApi.bisApproveAdd(data).then(res => {
        if (res) {
          that.$router.push({ name: 'BisExamineApprove' })// 跳转到开业审批列表页
          that.$message.success('提交成功')
        }
      })
    },
    // 发生改变的表单数据
    formDataChange(formData) {
      const that = this
      that.formData = formData
    },
    // 详情数据接口
    bisExamineApproveDetail(datas) {
      const that = this
      approveApi.bisExamineApproveDetail(datas).then(res => {
        if (res.detailInfo) {
          that.formData.detailInfo = res.detailInfo
        }
        if (res.countList !== undefined && res.countList.length > 0) {
          that.formData.feeInformationData.tableData = res.countList
        }
        if (res.firstCountList !== undefined && res.firstCountList.length > 0) {
          that.formData.firstCountList.tableData = res.firstCountList
        }
        if (res.materialList !== undefined && res.materialList.length > 0) {
          that.formData.formTableData.tableData = [...that.formData.formTableData.tableData, ...res.materialList]
        }
        that.update++
      })
    },
    comChange(val) {
      const that = this
      val.feeInformationData = { tableData: val.feeInformationData }
      that.formData = JSON.parse(JSON.stringify(val))
      that.formData.detailInfo = { ...val }
      that.update++
    }
  }
}
</script>
