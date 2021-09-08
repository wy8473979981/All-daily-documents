<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 手风琴详情页配置
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorGroupDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      @tabsToggle="tabsToggle"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn @click="handlerClick">保存</ysn-btn>
      </template>

      <!-- 底部插槽 -->
      <template #bottom>
        <div class="text-center" style="width:100%;background:#ddd">底部插槽-用于底部按钮 高度32px</div>
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
    </ysn-pageAccorGroupDetail>

  </div>
</template>
<script>
import TestFrom from './blocks/form1.vue'
// 请求api
import { pageConfig } from './config'
export default {
  name: 'PageAccordionGroupDetailDemo',
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
        },
        // 测试分组数据
        groupData: [
          {
            baseInfo: { BuildingName: '' }
          },
          {
            baseInfo: { BuildingName: '' }
          }
        ]
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
      const res = await this.$refs.pageDetail.valiFormDate()
      console.log(res)
      // this.$nextTick(async() => {
      //   const res = await this.$refs.pageDetail.valiFormDate()
      //   console.log(res)
      // })
      // const refsList = [
      //   this.$refs.pageDetail.$refs.baseInfo.$refs.rulesForm,
      //   this.$refs.pageDetail.$refs.baseInfo2.$refs.rulesForm
      // ]
      // this.$refs.pageDetail.valFormDate(refsList)
    },
    // detailChange(val) {
    //   this.formData = val
    // },
    tabsToggle(type, index, dataKey) {
      console.log(type, index, dataKey)
      if (type === 'plus') {
        // 此处可以通过dataKey去判断哪个分组,然后分开操作
        this.formData.groupData.push({
          baseInfo: { BuildingName: '' }
        })
      } else {
        this.formData.groupData.splice(index, 1)
      }
      this.update++
    }
  }
}
</script>
