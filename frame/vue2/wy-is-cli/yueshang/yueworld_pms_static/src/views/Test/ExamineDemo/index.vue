<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 审核页demo,页面必须添加id参数
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      examine="test"
      @change="detailChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn @click="handlerClick">保存</ysn-btn>
      </template>

      <!-- flod插槽 -->
      <template #baseInfo>
        基本信息flod插槽
      </template>
      <template #slotName>
        我是内容插槽 以下为组件
        {{ formData.baseInfo.dataList }}
        <TestFrom v-model="formData.baseInfo" />
        插槽内容结束
      </template>
    </ysn-pageAccorDetail>

  </div>
</template>
<script>
import TestFrom from './blocks/form1.vue'
// 请求api
import { pageConfig } from './config'
export default {
  name: 'PageAccordionDetailDemo',
  components: { TestFrom },
  props: {},
  data() {
    return {
      hasMenu: true, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      // 统一数据
      formData: {
        baseInfo: {
          BuildingName: '',
          FloorName: '',
          OfficeId: '',
          FloorName2: '',
          appointDate: '',
          decorationEnterDate: '',
          dataList: [{ a: '123' }]
        },
        baseInfo1: {
          BuildingName: '',
          FloorName: '',
          OfficeId: ''
        }
      },
      update: 0
    }
  },

  mounted() {
  },
  methods: {
    async handlerClick() {
      // this.hasMenu = !this.hasMenu
      console.log(this.formData)

      this.formData = {
        baseInfo: {
          BuildingName: '123',
          FloorName: '123',
          OfficeId: '123'
        },
        baseInfo1: {
          BuildingName: '',
          FloorName: '',
          OfficeId: ''
        }
      }
      // 更新视图 后续操作需要nextTick
      this.update++

      this.$nextTick(async() => {
        const res = await this.$refs.pageDetail.valiFormDate()
        console.log(res)
      })
      // const refsList = [
      //   this.$refs.pageDetail.$refs.baseInfo.$refs.rulesForm,
      //   this.$refs.pageDetail.$refs.baseInfo2.$refs.rulesForm
      // ]
      // this.$refs.pageDetail.valFormDate(refsList)
    },
    detailChange(val) {
      this.formData = val
    }
  }
}
</script>
