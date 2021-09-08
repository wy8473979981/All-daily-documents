<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:转换单-新增
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
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn v-if="id!=4" class="mr-8" type="primary" @click="handlerClick(1)">发起审核</ysn-btn>
        <ysn-btn v-if="id!=6" class="mr-8" type="primary" @click="handlerClick(2)">提交审核</ysn-btn>
        <ysn-btn v-if="id==6" class="mr-8" type="primary" @click="navToExamine">审核记录</ysn-btn>
        <ysn-btn class="mr-8" type="info" @click="handlerClick(3)">保存</ysn-btn>
        <ysn-confirm
          v-if="id"
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
import { processingApi } from '@/api'
import { pagesConfig } from './config'
export default {
  name: 'ProcessingAdd',
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      editStatus: false, // 编辑页状态
      // 详情id
      id: 0,
      // 统一数据
      formData: {
        programAndBusinessInfo: {
          // 基本信息
          tenantId: '', // 商家/企业编号
          tenantName: '', // 商家/企业
          programName: '', // 项目名称
          dealNo: '', // 处理编号
          brandName: '', // 品牌名称
          dealDate: '', // 处理日期
          attachment: [] // 附件
        },
        // 处理明细
        attachmentList: {
          tableData: []
          // 表格数据
        },
        // 审核记录
        firstCountList: {
          tableData: []
        }
      }
    }
  },
  created() {
    this.pageConfig = pagesConfig(this)
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.id = this.$route.query.id
      this.processingDetails(datas) // 详情数据接口
      this.editStatus = true
    }
  },
  methods: {
    // 获取详细数据
    processingDetails(datas) {
      const that = this
      processingApi.processingDetails(datas).then(res => {
        if (res.list) {
          that.formData.programAndBusinessInfo = res.list[0]
        }
        if (res.listSecond !== undefined) {
          that.formData.attachmentList.tableData = res.listSecond
        }
        if (res.tableData !== undefined && res.tableData.length > 0) {
          that.formData.firstCountList.tableData = res.tableData
        }
        that.update++
      })
    },
    // 删除
    deleteBox() {
      const that = this
      const datas = {
        id: this.id
      }
      processingApi.processing(datas).then(res => {
        that.$message({ message: '删除成功', type: 'success' })
        setTimeout(() => {
          that.$router.push({ name: 'ProcessingList' })
        }, 1000)
      })
    },
    // 提交事件
    async handlerClick(val) {
      const res = await this.$refs.pageDetail.valiFormDate()
      if (res) {
        if (!this.moneyCompare()) {
          return
        }
        switch (val) {
          case 1 :
            this.$message({ message: '发起成功', type: 'success' })
            break
          case 2:
            this.$message({ message: '提交成功', type: 'success' })
            break
          case 3:
            this.$message({ message: '保存成功', type: 'success' })
            break
        }
        setTimeout(() => {
          this.$router.push({ name: 'ProcessingList' })
        }, 1000)
      }
    },
    // 如果可用金额大于等于处理金额 则可以提交。反之不行。提示：处理金额超过可用金额 不可减免。
    moneyCompare() {
      const list = this.$refs.pageDetail.currentFormData.attachmentList.tableData
      if (!list || list.length === 0) {
        this.$message.error('请添加处理明细')
        return
      } else {
        return true
      }
    },
    // OA审核记录跳转
    navToExamine() {
      this.$router.push({ name: 'ProcessingDetailExamine', query: { id: this.$route.query.id }})
    }

  }
}
</script>
