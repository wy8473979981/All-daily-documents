<template>
   <div>
        <glp-card title="模板详情" style="margin-bottom:20px;">
              <detail-form :def="defs" :api="'/assets/business-bills/' + id" label-width="120px">
              </detail-form>
        </glp-card>
        <query-table :columns="columns1" title="历史版本" class="mt-4">

        </query-table>
        <query-table :columns="columns2" title="操作记录" class="mt-4">

        </query-table>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { defs, columns1, columns2 } from './config'
@Component
export default class FormworkDetail extends Vue {
 defs = defs
 columns1=columns1
 columns2=columns2
}
</script>

<style lang="scss" module>

</style>
