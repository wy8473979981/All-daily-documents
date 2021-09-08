<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:收款单-详情
-->
<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
    />
  </div>
</template>

<script>
import { collectionList } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'CollectionListDetails',
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      // 进场装修详情页面id
      id: null,
      // 统一数据
      formData: {
        form: {
          formConfig: [
            // 详情配置
            {
              itemType: 'text',
              prop: 'programName',
              label: '项目名称'
            },
            {
              itemType: 'text',
              prop: 'receivedId',
              label: '收款编号'
            },
            {
              itemType: 'text',
              prop: 'unknownType',
              label: '未名款项'
            }
          ],
          formData: {
          }
        },
        formtwo: {
          formtwoData: {
          }
        }
      }
    }
  },
  created() {
    console.log(this.$route.query)
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.collectionListDetails(datas) // 详情数据接口
    }
  },
  mounted() {
  },
  methods: {
    // 详情数据接口
    collectionListDetails(datas) {
      const that = this
      collectionList.collectionListDetails(datas).then(res => {
        console.log(res)
        if (res) {
          that.formData.form.formData = res.list.form
          that.formData.formtwo.formtwoData = res.list.collectionFome
        }
        that.update++
      })
    }
  }
}
</script>
