<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:核销配置-新增
-->

<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      @change="comChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn @click="save">保存</ysn-btn>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>

<script>
import { collectionList } from '@/api'
import { pagesConfig } from './config'
export default {
  name: 'CollectionConfigAdd',
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      id: 0,
      // 表数据
      formData: {
        // 基本信息数据
        form: {
          programName: '', // 适用项目
          ruleName: '', // 方案名称
          verificationTypes: '', // 核销类型
          ruleType: '' // 方案状态
        },
        // 手工核销数据
        manualCancellation: {
          defaultOutRules: '', // 默认带出规则
          ceilingNumber: ''// 上限条数
        },
        // 核销费项顺序
        takeOutOrder: {
          tableData: []
        },
        // 自动核销数据
        automaticWriteOff: {
          verificationOrder: '', // 核销顺序
          isPriorityOwe: '', // 是否优先欠费
          defaultTemporarilyFeeName: '', // 默认进暂收费项
          isTiming: ''// 是否定时
        },
        // 定时数据
        timing: {
          day: '', // 按日
          month: '' // 按月
        },
        verificationOrder: {
          // 表格数据
          tableData: [
            {
              id: '',
              feeId: '',
              feeName: '',
              feeType: '',
              planner: ''
            }
          ]
        }
      }
    }
  },
  computed: {
    // 动态展示组件
    pageConfig() {
      const { form, automaticWriteOff } = this.formData
      // 自动核销默认展示
      if (form.verificationTypes === 2 && !automaticWriteOff.isTiming) {
        return this.pagesConfig.automatic
      }
      //  是否定时为无时展示
      if (form.verificationTypes === 2 && automaticWriteOff.isTiming === 1) {
        return this.pagesConfig.automatic1
      }
      // 是否定时为按日展示
      if (form.verificationTypes === 2 && automaticWriteOff.isTiming === 2) {
        return this.pagesConfig.automatic2
      }
      //  是否定时为按月展示
      if (form.verificationTypes === 2 && automaticWriteOff.isTiming === 3) {
        return this.pagesConfig.automatic3
      }
      // 点击手动核销时
      if (form.verificationTypes === 1) {
        return this.pagesConfig.manual
      }
      // 新增页-默认只展示 基本信息组件
      return this.pagesConfig.basic
    }
  },
  created() {
    this.pagesConfig = pagesConfig(this)
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.collectionConfigAdd(datas) // 详情数据接口
    }
  },
  methods: {
    // 数据接口
    collectionConfigAdd(datas) {
      const that = this
      collectionList.collectionConfigAdd(datas).then(res => {
        if (res) {
          that.formData.form = res.form
          that.formData.manualCancellation = res.manualCancellation
          that.formData.takeOutOrder.tableData = res.list
          that.formData.automaticWriteOff = res.automaticWriteOff
          if (Number(datas.id) === 2) {
            that.formData.timing.month = res.timing.month
          }
        }
        that.update++
      })
    },
    // 点击保存
    async save() {
      // 更新视图 后续操作需要nextTick
      this.update++
      this.$nextTick(async() => {
        // 校验是否符合规则
        const res = await this.$refs.pageDetail.valiFormDate()
        if (res) {
          this.saveDecorationEnterBox(this.formData)
        }
      })
    },
    // 保存的请求
    saveDecorationEnterBox() {
      const that = this
      that.$message.success({ message: '保存成功' })
      setTimeout(() => {
        that.$router.push({ name: 'CollectionConfig' })
      }, 1000)
    },
    comChange(form) {
      this.formData = { ...form }
    }
  }
}
</script>
