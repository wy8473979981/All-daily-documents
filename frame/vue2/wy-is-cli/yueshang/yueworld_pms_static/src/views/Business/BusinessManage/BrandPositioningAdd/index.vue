<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:品牌落位新增页面
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      add
      examine-page="BrandPositioningExamine"
      @comChange="comChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-12" @click="saveBox(1)">发起审核</ysn-btn>
        <ysn-btn type="info" class="mr-12" @click="saveBox(0)">暂存</ysn-btn>
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
import { investmentApi, approveApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'BrandPositioningAdd',
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
      // 统一数据
      formData: {
        baseInfo: {
          // 详情数据
          brandPlacementNo: '', // 编号
          programName: '', // 项目名称
          description: '', // 备注说明
          attachmentList: [] // 表格数据
        },
        // 费用信息
        feeInformationData: {
          tableData: [
            { spaceName: [], brandName: '', planner: '1001001' }

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
      this.id = this.$route.query.id
      this.decorationEnterDetailBox(datas) // 详情数据接口
      this.editStatus = true
    }
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
          that.$router.push({ name: 'BrandPositioningList' })
        }, 1000)
      })
    },
    // 选择项目change事件
    async comChange(val) {
      const that = this
      await approveApi.getProgramList({ programName: val.programName }).then(res => {
        that.formData = {
          baseInfo: {
            // 详情数据
            programName: val.programName, // 项目名称
            description: '', // 备注说明
            attachmentList: [] // 表格数据
          },
          // 费用信息
          feeInformationData: {
            tableData: [
              { spaceName: [], brandName: '', planner: '1001001' }
            ] // 表格数据
          }
        }
      })
      that.update++
    },
    // 暂存
    saveBox(submitType) {
      const that = this
      this.$nextTick(async() => {
        // 校验是否符合规则
        const res = await this.$refs.pageDetail.valiFormDate()
        if (res) {
          if (that.editStatus) {
            that.formData.submitType = 1
            that.formData.id = that.id
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
          that.$router.push({ name: 'BrandPositioningList' })// 跳转到开业审批列表页
          that.$message({ message: '提交成功', type: 'success' })
          that.formData.baseInfo.programName = ''
        }
      })
    },
    // 详情数据接口
    decorationEnterDetailBox(datas) {
      const that = this
      investmentApi.brandPositioningDetail(datas).then(res => {
        if (res.baseInfo) {
          that.formData.baseInfo = res.baseInfo
        }
        if (res.tableData !== undefined && res.tableData.length > 0) {
          that.formData.feeInformationData.tableData = res.tableData
        }
        that.update++
      })
    }
  }
}
</script>
