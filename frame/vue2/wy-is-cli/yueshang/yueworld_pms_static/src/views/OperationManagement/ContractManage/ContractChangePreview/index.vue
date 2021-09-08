<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同变更预览
-->

<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      accessory-disable
      persmission="ContractTerminationPreview"
      accessory="AgreementOfintent"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-12" @click="saveBox(1)">发起审核</ysn-btn>
        <ysn-btn class="mr-12" type="info" @click="saveBox(0)">暂存</ysn-btn>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>

<script>
import { contractChangeApi } from '@/api'
import { pageConfig } from './config'

export default {
  name: 'ContractChangePreview',
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: true, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      id: 0,
      // 判断是编辑页面还是新增页面
      editOrAddStatus: false,
      formData: {
        essentialData: {}, // 基本信息
        businessAffairs: {
          tableList: []
        }, // 商务信息
        leaseArea: {
          tableList: []
        }, // 租赁区域
        rentYears: {
          tableList: []
        }, // 租期
        rentFreePeriod: {
          beforeList: [],
          afterList: []
        }, // 免租期
        fixedRent: {
          formDiffList: [],
          beforeList: [],
          afterList: []
        }, // 固定租金
        commissionRent: {
          formDiffList: [],
          beforeList: [],
          afterList: []
        }, // 提成租金,
        oneTimeFee: {
          tableList: []
        }, // 一次性费用
        bond: {
          tableList: []
        }, // 保证金
        firstAccountPeriod: {
          tableList: []
        }, // 首账单
        contractSignedParty: {
          tableList: []
        }
      }
    }
  },
  created() {
    if (this.$route.params.formData) {
      this.formData = this.$route.params.formData
    } else {
      if (!this.$route.query.status) {
        this.$router.push({
          name: 'ContractChangeTermAdd',
          query: {
            id: this.$route.query.id
          }
        })
      } else {
        this.getData()
      }
    }
  },
  methods: {
    getData() {
      contractChangeApi.contractChangeDiffDetailById({
        id: this.$route.query.id
      }).then(res => {
        if (res) {
          this.formData = res
          this.update++
        }
      })
    },
    // 暂存
    saveBox(submitType) {
      const that = this
      this.$nextTick(async() => {
        // 校验是否符合规则
        const res = await this.$refs.pageDetail.valiFormDate()
        if (res) {
          that.formData.id = that.$route.query.id
          if (that.editStatus) {
            that.formData.submitType = 2
          } else {
            that.formData.submitType = submitType
          }
          that.contractChangeSave(that.formData)
        }
      })
    },
    // 保存的请求
    contractChangeSave(datas) {
      const that = this
      contractChangeApi.contractChangeSave(datas).then(res => {
        if (res) {
          that.$message({ message: '提交成功', type: 'success' })
          setTimeout(() => {
            that.$router.push({
              name: 'ContractChange'
            })
          }, 1000)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
