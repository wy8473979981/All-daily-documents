<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:换单-新增
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
      <template v-if="id!=7" #btn>
        <ysn-btn v-if="id!=5" class="mr-8" @click="handlerClick(1)">发起审核</ysn-btn>
        <ysn-btn v-if="id!=4" class="mr-8" @click="handlerClick(2)">提交审核</ysn-btn>
        <ysn-btn v-if="id==4" class="mr-8" @click="navToExamine">审核记录</ysn-btn>
        <ysn-btn type="info" @click="handlerClick(3)">保存</ysn-btn>
        <ysn-confirm
          v-if="id!==0"
          title="提示"
          width="484px"
          top="120px"
          :content="`是否确认删除?`"
          tip="此操作将永久删除,不可撤回,请谨慎操作"
          @confirm="deleteBox"
        >
          <ysn-btn class="mr-12" type="delete" style="padding-left:10px">删除</ysn-btn>
        </ysn-confirm>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>
<script>
import { processingApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'ConversionAdd',
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      editStatus: false, // 编辑页面
      // 详情id
      id: 0,
      // 统一数据
      formData: {
        // 转换信息
        programAndBusinessInfo: {
          programName: '', // 项目名称
          rollTenantName: '', // 转出商家
          rollBrandName: '', // 转出品牌名
          intoTenantName: '', // 转入商家
          intoBrandName: '', // 转入品牌名
          ConversionDate: '', // 转换日期
          description: '' // 备注
        },
        // 转换明细
        countData: {
          tableData: [] // 表格数据
        },
        // 冲抵核销明细
        attachmentList: {
          tableData: [] // 表格数据
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
      this.conversionDetails(datas) // 详情数据接口
    }
  },
  methods: {
    // 获取详细数据
    conversionDetails(datas) {
      const that = this
      processingApi.conversionDetails(datas).then(res => {
        if (res.list) {
          that.formData.programAndBusinessInfo = res.list[0]
        }
        if (res.listSecond !== undefined) {
          that.formData.countData.tableData = res.listSecond
        }
        if (res.lisThird !== undefined && res.lisThird.length > 0) {
          that.formData.attachmentList.tableData = res.lisThird
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
      processingApi.conversion(datas).then(res => {
        that.$message({ message: '删除成功', type: 'success' })
        setTimeout(() => {
          that.$router.push({ name: 'Conversionlist' })
        }, 1000)
      })
    },
    // 提交事件
    async handlerClick(index) {
      const res = await this.$refs.pageDetail.valiFormDate()
      if (!this.moneyCompare()) {
        return
      }
      if (res) {
        switch (index) {
          case 1:
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
          this.$router.push({ name: 'Conversionlist' })
        }, 1000)
      }
    },
    // 审核记录跳转
    navToExamine() {
      this.$router.push({ name: 'ConversionDetailExamine', query: { id: this.$route.query.id }})
    },
    // 提交时检验
    moneyCompare() {
      // 未添加转换明细/冲抵核销明细时不可审核/保存
      const tableDesc = this.$refs.pageDetail.$refs.attachmentList[0].tableDescConfig
      const table = this.$refs.pageDetail.$refs.countData[0].tableDescConfig
      if (this.$refs.pageDetail.$refs.countData[0].countData.tableData.length === 0) {
        this.$message.error('请添加转换明细')
        return
      }
      if (this.$refs.pageDetail.$refs.attachmentList[0].currentFormData.tableData.length === 0) {
        this.$message.error('请添加冲抵核销明细')
        return
      } else if (Number(table[2].value) !== Number(tableDesc[1].value)) { // 暂收款冲抵金额虚等于转换明细中冲抵金额汇总
        this.$message.error('暂收款的冲抵金额合计要等于转换明细的冲抵金额合计')
        return
      }
      return true
    }
  }
}
</script>
<style scoped>
</style>
