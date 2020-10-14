<template>
<div>
<el-checkbox v-for="(v, k) in options" :key="k" :label="k">{{v}}</el-checkbox>
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

  options: Record<string | number, string> = {}

  get result () {
    if (!this.async) return Promise.resolve(getDictionary(this.name))
    return loadAsyncDictionary(this.name, { form: this.form }, this.reload).then(data => {
      const ret: any = {}
      data.forEach(v => {
        ret[v.__value] = v.__label
      })
      return ret
    })
  }

  @Watch('result', { immediate: true }) resultChange () {
    this.result.then(data => {
      this.options = data || {}
    })
  }
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";
</style>
