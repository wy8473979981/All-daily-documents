<template>
<div>
<el-option v-for="v in options" :key="v.__value" :label="v.__label" :value="v.__value"></el-option>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { getDictionary, loadAsyncDictionary } from '@/config/dictionary'

@Component({
  components: { }
})
export default class DictOptions extends Vue {
  @Prop(String) name!: string

  @Prop(Boolean) async!: boolean

  @Prop(Boolean) reload!: boolean

  @Prop() form!: Record<string, any>

  options: any[] = []

  get result () {
    if (!this.async) return Promise.resolve(transform(getDictionary(this.name)))
    return loadAsyncDictionary(this.name, { form: this.form }, this.reload).then(data => {
      return data
    })

    function transform (data: Record<string, string> = {}): any[] {
      return Object.entries(data).map(([k, v]) => ({ __label: v, __value: k }))
    }
  }

  @Watch('result', { immediate: true }) resultChange () {
    this.result.then(data => {
      this.options = data || []
    })
  }
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";
</style>
