<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同变更-新增-合同甲方信息
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData" :config="configData" :column="4" clearable />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'
import { contractChangeApi } from '@/api'

export default {
  name: 'PartyAsContract',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'partyAsContract',
    event: 'change'
  },
  props: {
    partyAsContract: {
      type: Object,
      default: () => {
      }
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rulesForm: {
        firstPartyName: [{ required: true, message: '甲方名称不能为空' }]
      }
    }
  },
  computed: {
    configData() {
      return [
        {
          itemType: 'select',
          prop: 'firstPartyName',
          required: true,
          label: '甲方名称',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('globalSearchList'),
          listName: 'label',
          listValue: 'value',
          multiple: false,
          change: this.partyADetail,
          disabled: !this.data.essentialData.contNo
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'firstpartyUnifiedSocialCreditCode',
          label: '统一社会代码/身份证',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'firstpartyTel',
          label: '联系电话',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'firstpartyEmail',
          label: '邮箱',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'firstpartyAddress',
          label: '甲方地址',
          disabled: true
        }
      ]
    }
  },
  methods: {
    partyADetail(row) {
      const that = this
      const datas = {
        firstPartyName: row.firstPartyName
      }
      contractChangeApi.contractChangeFirstPartyDetail(datas).then(res => {
        if (res) {
          that.currentFormData.firstpartyUnifiedSocialCreditCode = res.firstpartyUnifiedSocialCreditCode
          that.currentFormData.firstpartyTel = res.firstpartyTel
          that.currentFormData.firstpartyEmail = res.firstpartyEmail
          that.currentFormData.firstpartyAddress = res.firstpartyAddress
        }
      })
    }
  }

}
</script>
