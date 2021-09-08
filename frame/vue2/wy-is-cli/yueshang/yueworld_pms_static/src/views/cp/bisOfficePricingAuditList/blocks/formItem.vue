<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-04 14:26:01
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-06-28 13:21:37
-->
<template>
  <div>
    <div class="d-flex">
      <ysn-btn type="reset" class="">审批状态</ysn-btn>
      <ysn-btn :type="whole?'primary':'info'" @click="tabStatus(0)">全部</ysn-btn>
      <div class="ml-12 mr-12 wh-12" />
      <ysn-btn
        v-for="(item, index) in tabStatusList"
        :key="index"
        class="ml-8"
        :type="item.type?'primary':'info'"
        @click="tabStatus(item.status,index)"
      >{{ item.name }}</ysn-btn>
    </div>
    <!-- 表单搜索组件 -->
    <ysn-seniorSearch :form="formData" :config="configData" clearable @searchResult="searchResult" />
  </div>
</template>

<script>
export default {
  name: 'FormIitem',
  //   components:{FormItem,TableList},
  data() {
    return {
      addId: [], // 保存选中的id
      whole: true, // 全部
      tabStatusList: [
        { name: '草稿', status: 1, type: false },
        { name: '审核中', status: 2, type: false },
        { name: '审核通过', status: 3, type: false },
        { name: '已驳回', status: 4, type: false }
      ],
      isPrimary: 'primary',
      isInfo: 'info',
      formData: {
        BuildingName: ''
      },
      configData: [ // 表单配置
        { itemType: 'select', prop: 'programName', label: '', placeholder: '请选择全部项目', width: '200px', isFirst: true, list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: [], multiple: true }
      ]
    }
  },

  methods: {
    searchResult(data) {
      console.log('12')
      // 搜索字段
      this.$emit('searchTable', data)
    },
    // tab切换
    tabStatus(status, i) {
      let addId = []
      // 点击全部 除了全部其他取消选中
      if (status === 0) {
        addId = []
        this.whole = true
        this.tabStatusList.map(item => {
          item.type = false
        })
        this.$emit('tableStatusList', [status])
        return
      }
      if (status !== 0) {
        this.whole = false
        this.tabStatusList[i].type = !this.tabStatusList[i].type
        this.tabStatusList.forEach(item => {
          if (item.type) {
            addId.push(item.status)
          }
        })
        if (addId.length === 0) {
          addId.push(0)
          this.whole = !this.whole
        }
        this.$emit('tableStatusList', addId)
        return
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .d-flex{
        display:flex;
        margin-bottom: 24px;
        .wh-12{
            margin-top:8px;
            width:1px;
            height: 12px;
            background:#E5E2DE;
        }
    }
</style>
