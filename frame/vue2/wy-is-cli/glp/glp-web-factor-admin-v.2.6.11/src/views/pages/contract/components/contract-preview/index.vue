<template>
      <el-dialog title="" :visible.sync="contractVisible" width="500px">
            <div style="max-height:600px;overflow-y:auto">
                <img :src="`${contractPic}`"/>
            </div>
      </el-dialog>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class ContractPreview extends Vue {
   contractVisible=false
   @Prop() contractPic!: any
}
</script>

<style lang="scss" module>
</style>
