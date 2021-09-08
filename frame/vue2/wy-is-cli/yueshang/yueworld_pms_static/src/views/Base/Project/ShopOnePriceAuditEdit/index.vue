<!--
 * @Author: qiuyw
 * @LastEditors: qiuyw
 * @Description: 一铺一价编辑
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      :examine-page="examinePage"
      @change="detailChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn class="mr-12" @click="handlerAudit">发起审核</ysn-btn>
        <ysn-btn type="info" class="mr-12" @click="handlerSave">{{ formData.checkStatus===1?'暂存':'保存' }}</ysn-btn>
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
// 请求api
import { baseProjectApi } from '@/api'
import { pageConfig } from './config'

export default {
  name: 'ShopOnePriceAuditDetail',
  components: {},
  props: {},
  data() {
    return {
      // 审核记录页面
      examinePage: 'ShopOnePriceAuditExamine',
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      // 详情id
      id: null,
      // 统一数据
      formData: {
        // 业态平均价格
        averagePriceFormat: {},
        // 一铺一价信息
        averagePriceFloor: {},
        // 一铺一价信息
        infoList: {
          tableData: []
        }
      },
      update: 0
    }
  },

  mounted() {
    this.getData()
  },
  methods: {
    /**
     * 获取详情页数据
     * @returns {Promise<void>}
     */
    async getData() {
      const { id } = this.$route.query
      this.id = id
      try {
        const { data } = await baseProjectApi.shopOnePriceAuditDetail({ id })
        // 格式化一铺一价信息方便组件编辑
        if (data.infoList && data.infoList.tableData) {
          data.infoList.tableData.forEach((item, index) => {
            item.feeShow01standardFee = item.feeShow01.standardFee
            item.feeShow01standardFeeTimeUnit = item.feeShow01.standardFeeTimeUnit
            item.feeShow01standardFeeIncreasing = item.feeShow01.standardFeeIncreasing

            item.feeShow02standardFee = item.feeShow02.standardFee
            item.feeShow02standardFeeTimeUnit = item.feeShow02.standardFeeTimeUnit
            item.feeShow02standardFeeIncreasing = item.feeShow02.standardFeeIncreasing

            item.feeShow03standardFee = item.feeShow03.standardFee
            item.feeShow03standardFeeTimeUnit = item.feeShow03.standardFeeTimeUnit
            item.feeShow03standardFeeIncreasing = item.feeShow03.standardFeeIncreasing

            item.feeShow04standardFee = item.feeShow04.standardFee
            item.feeShow04standardFeeTimeUnit = item.feeShow04.standardFeeTimeUnit
            item.feeShow04standardFeeIncreasing = item.feeShow04.standardFeeIncreasing
          })
        }

        this.formData = data
        this.update++
      } catch (e) {
        console.log(e)
      }
    },
    /**
     * 发起审核
     * @returns {Promise<void>}
     */
    async handlerAudit() {
      try {
        await baseProjectApi.shopOnePriceAuditAudit({
          id: this.id
        })
        setTimeout(() => {
          this.$router.go(-1)
        }, 1000)
      } catch (e) {
        console.log(e)
      }
    },
    async handlerSave() {
      const { id } = this
      try {
        const res = await this.$refs.pageDetail.valiFormDate()
        if (res) {
          await baseProjectApi.shopOnePriceAuditSave({
            id
          })
          this.$message({ message: '保存成功', type: 'success' })
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 删除
    deleteBox() {
      const that = this
      const datas = {
        id: this.id
      }
      baseProjectApi.shopOnePriceAuditDelete(datas).then(res => {
        that.$message({ message: '删除成功', type: 'success' })
        setTimeout(() => {
          that.$router.go(-1)
        }, 1000)
      })
    },
    detailChange(val) {
      this.formData = val
    }
  }
}
</script>
