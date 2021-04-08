<template>
<div>
<breadcrumb/>
<edit-form-group class="mt-4" v-loading="loading" @submit="onSubmit" v-if="!loading">
  <apply-steps></apply-steps>
  <base-info class="mt-6"></base-info>
  <amount-info class="mt-7"></amount-info>
  <account-info class="mt-7"></account-info>
  <creditor-info class="mt-6"></creditor-info>
  <creditor-material></creditor-material>
</edit-form-group>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import ApplySteps from './components/apply-steps/index.vue'
import BaseInfo from './components/base-info/index.vue'
import AmountInfo from './components/amount-info/index.vue'
import AccountInfo from './components/account-info/index.vue'
import CreditorInfo from './components/creditor-info/index.vue'
import CreditorMaterial from './components/creditor-material/index.vue'

@Component({
  components: { ApplySteps, BaseInfo, AmountInfo, AccountInfo, CreditorInfo, CreditorMaterial }
})
export default class FinanceApply extends Vue {
  loading = false

  onSubmit (params: any[]) {
    console.log(params)
    // TODO
  }
}
</script>
