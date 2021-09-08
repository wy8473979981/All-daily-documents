<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同台账-详情
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      persmission="StandingBookDetail"
      @change="detailChange"
    >
      <template #topLeft>
        <!-- 显示文字 -->
        <span class="mr-8">合同编号：{{ contNo }}，</span>
        <span class="mr-8">状态：{{ contractStates }}，</span>
        <span class="mr-8">创建时间：{{ createdDate }}</span>
      </template>
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn v-if="contractStates==='待审核'" @click="handlerClick">提交审核</ysn-btn>
      </template>
    </ysn-pageAccorDetail>
    <ysn-dialog
      :is-show-dialog="showDialog"
      :is-cancel="false"
      title="提示"
      :show-footer="true"
      @ok="ok"
    >
      <template #contain>
        <div style="text-align: center;height: 200px;line-height: 200px;font-weight: 500">双签信息不能为空，请前往填写</div>
      </template>
    </ysn-dialog>
  </div>
</template>
<script>
import { standingBookApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'StandingBookDetail',
  props: {},
  data() {
    return {
      contNo: '',
      contractStates: '',
      showDialog: false,
      createdDate: '',
      update: 0, // 更新视图用
      hasMenu: true, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      editStatus: false,
      // 详情id
      id: 0,
      // 统一数据
      formData: {
        businessAffairs: {},
        supplemental: {
          tableList: []
        },
        rentFreePeriod: {
          tableList: []
        },
        firstPeriodic: {
          formData: {},
          tableList: []
        },
        secondPeriodic: {
          formData: {},
          tableList: []
        },
        bond: {
          tableList: []
        },
        oneTimeFee: {
          tableList: []
        },
        doubleSignInfo: {
          hasSend: false,
          tableList: [
            {
              doubleSignDate: '',
              attachment: []
            }
          ]
        },
        expenseDetail: {
          tabsList: [
            {
              label: '全部'
            }
          ]
        }
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.contNo = this.$route.query.contNo
      this.contractStates = this.$route.query.contractStates
      this.createdDate = this.$route.query.createdDate
      const datas = {
        id: this.$route.query.id
      }

      this.standingBookDetail(datas) // 详情数据接口
    }
  },
  methods: {
    // 获取详细数据
    standingBookDetail(datas) {
      const that = this
      standingBookApi.standingBookDetail(datas).then(res => {
        if (res.receivableAmountTotal) {
          that.formData.receivableAmountTotal = res.receivableAmountTotal
        }
        if (res.businessAffairs) {
          that.formData.businessAffairs = res.businessAffairs
        }
        if (res.supplemental) {
          that.formData.supplemental.tableList = res.supplemental
        }
        if (res.rentFreePeriod) {
          that.formData.rentFreePeriod.tableList = res.rentFreePeriod
        }
        if (res.periodic) {
          let count = 0
          res.periodic.forEach((item) => {
            const name = item.feeName
            this.$set(this.formData, name, item)
            let component = ''
            switch (item.formData.algorithmId) {
              case '固定':
                component = require('./blocks/fixedFeeName.vue').default
                break
              case '提成':
                component = require('./blocks/commissionFeeName.vue').default
                break
              case '俩者取高':
                component = require('./blocks/getHeightFeeName.vue').default
                break
              case '俩者取合':
                component = require('./blocks/getSumFeeName.vue').default
                break
            }
            that.pageConfig.splice(3 + count, 0, {
              title: name,
              dataKey: name,
              component: component // 内容组件引用
            })
            that.formData.expenseDetail.tabsList.push({
              label: name
            })
            count++
          })
        }
        if (res.bond) {
          that.formData.bond.tableList = res.bond
          that.formData.expenseDetail.tabsList.push({
            label: '保证金'
          })
        }
        if (res.oneTimeFee) {
          that.formData.oneTimeFee.tableList = res.oneTimeFee
          that.formData.expenseDetail.tabsList.push({
            label: '一次性费用'
          })
        }
        if (res.doubleSignInfo) {
          that.formData.doubleSignInfo = res.doubleSignInfo
        }

        that.formData.expenseDetail.tabsList.push({
          label: '能耗'
        })
        that.pageConfig.push({
          title: '费用明细',
          dataKey: 'expenseDetail',
          component: require('./blocks/expenseDetail.vue').default // 内容组件引用
        })
        that.update++
      })
    },
    async handlerClick() {
      // 更新视图 后续操作需要nextTick
      this.update++

      this.$nextTick(async() => {
        // 校验是否符合规则
        const res = await this.$refs.pageDetail.valiFormDate()
        if (this.formData.doubleSignInfo.tableList[0].attachment.length <= 0) {
          this.$message.warning('请上传附件')
          return
        }
        if (res) {
          this.send()
        } else {
          if (!this.formData.doubleSignInfo.tableList[0].doubleSignDate) {
            this.showDialog = true
          }
        }
      })
    },
    // 提交审批
    send() {
      if (!this.formData.doubleSignInfo.hasSend) {
        const datas = {
          id: this.$route.query.id,
          doubleSignDate: this.formData.doubleSignInfo.tableList[0].doubleSignDate
        }
        standingBookApi.standingBookDoubleSignPush(datas).then(res => {
          if (res) {
            if (res.success) {
              for (let i = 0; i < this.formData.doubleSignInfo.tableList[0].attachment.length; i++) {
                this.$set(this.formData.doubleSignInfo.tableList[0].attachment[i], 'canOperate', false)
              }
              this.formData.doubleSignInfo.hasSend = true
              this.$message.success('双签推送成功')
              this.standingBookApproval()
            }
          }
        })
      } else {
        this.standingBookApproval()
      }
    },
    standingBookApproval() {
      const datas = {
        id: this.$route.query.id
      }
      standingBookApi.standingBookApproval(datas).then(res => {
        if (res) {
          if (res.success) {
            this.$message.success('提交成功')
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          }
        }
      })
    },
    // 数据变化事件
    detailChange(val) {
      this.formData = val
    },
    ok() {
      this.showDialog = false
    }
  }
}
</script>
