<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description: 费用调整单 新增编辑页
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
        <ysn-btn v-if="Number($route.query.status)!==7" type="primary" class="ml-8" @click="saveBox(1)">发起审核</ysn-btn>
        <ysn-btn v-if="Number($route.query.status)!==6" type="primary" class="ml-8" @click="saveBox(2)">提交审核</ysn-btn>
        <ysn-btn v-if="Number($route.query.status)===6" class="ml-8" type="info" @click="saveBox(3)">审核记录</ysn-btn>
        <ysn-btn class="ml-8" type="info" @click="saveBox(4)">暂存</ysn-btn>
        <ysn-btn class="ml-8" type="info" @click="enclosure">附件管理</ysn-btn>
        <ysn-confirm
          title="提示"
          width="484px"
          top="120px"
          :content="`是否确认删除?`"
          tip="此操作将永久删除,不可撤回,请谨慎操作"
          @confirm="deleteBox"
        >
          <Enclosure
            :is-show-dialog="isShowDialog"
            :disabled="false"
            :type="type"
            @closeDialog="closeDialog"
          />
          <ysn-btn v-if="$route.query.id" class="mr-12 ml-8" type="delete">删除</ysn-btn>
        </ysn-confirm>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>

<script>
// 引入接口地址
import { processingApi, collectionList } from '@/api'
import Enclosure from './blocks/enclosure.vue'
// 引入配置信息
import { pageConfig } from './config'
export default {
  name: 'AdjustmentCostAdd',
  components: {
    Enclosure
  },
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      auditStatus: '', // 状态
      // 进场装修详情页面id
      id: null,
      // 统一数据
      formData: {
        // 基本信息
        detailInfo: {
          programName: [], // 项目名称
          adjustId: '', // 调整单号
          adjustReason: '' // 调整原因
        },
        // 调整明细
        countData: {
          adjustAmount: '', // 调整金额汇总数据
          tableData: [
          ] // 表格数据
        },
        firstCountList: {
          tableData: [
            {
              dealTimes: '2021-02-03',
              handler: '张三',
              steps: '步骤',
              operationInstructions: 'XXXXX'
            }
          ]
        }
      },
      isShowDialog: false,
      type: 'detailBtn'
    }
  },
  created() {
    this.pageConfig = pageConfig(this)
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.adjustmentCostAdd(datas) // 详情数据接口
    }
  },
  mounted() {
  },
  methods: {
    // 发起审核 提交审核  暂存
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
          switch (submitType) {
            case 1:
              that.$message({ message: '发起成功', type: 'success' })
              break
            case 2:
              that.$message({ message: '提交成功', type: 'success' })
              break
            case 3:
              this.$router.push({ name: 'AdjustmentCostExamine' })
              break
            case 4:
              that.$message({ message: '保存成功', type: 'success' })
              break
          }
          if (submitType !== 3) {
            setTimeout(() => {
              that.$router.push({ name: 'AdjustmentCost' })
            }, 1000)
          }
        }
      })
    },
    // 详情数据接口
    adjustmentCostAdd(datas) {
      const that = this
      // 获取明细接口
      collectionList.adjustmentCostAdd(datas).then(res => {
        // 处理头部
        if (res.detailInfo) {
          that.formData.detailInfo = res.detailInfo
        }
        // 调整明细
        if (res.countData !== undefined) {
          that.formData.countData.tableData = res.countData.tableData
          that.formData.countData.adjustAmount = res.countData.adjustAmount
        }
        // 审核记录
        if (res.firstCountList !== undefined && res.firstCountList.length > 0) {
          that.formData.firstCountList.tableData = res.firstCountList
        }
        that.update++
      })
    },
    // 点击删除
    deleteBox() {
      const that = this
      const datas = {
        id: this.id
      }
      processingApi.processing(datas).then(res => {
        that.$message.success({ message: '删除成功' })
        setTimeout(() => {
          that.$router.push({ name: 'AdjustmentCost' })
        }, 1000)
      })
    },
    enclosure() {
      this.isShowDialog = true
    },
    closeDialog() {
      this.isShowDialog = false
    }
  }
}
</script>
