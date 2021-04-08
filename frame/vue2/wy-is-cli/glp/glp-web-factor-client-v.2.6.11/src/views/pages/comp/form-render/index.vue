<template>
<div>
  <glp-card title="表单渲染器">
    <glp-form-render :def="def" ref="fm">
      <template v-slot:checkbox="props">
        <el-checkbox-group v-model="props.value" >
          <el-checkbox :label="row" v-for="row in props.options.options" :key="row"></el-checkbox>
        </el-checkbox-group>
      </template>

      <template v-slot:plain="props">
        <el-link type="primary">{{props.value}}</el-link>
      </template>
    </glp-form-render>

    <div class="text-center">
      <el-button type="primary" @click="onSubmit" size="small">提 交</el-button>
      <el-button @click="onReset" size="small">重 置</el-button>
    </div>
  </glp-card>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import def from './form-def'
@Component
export default class FormRender extends Vue {
  @Ref() fm!: any

  def = def

  onSubmit () {
    this.fm.submit().then((params: any) => {
      console.log('params : ', params)
    }).catch((e: any) => {
      // do nothing
    })
  }

  onReset () {
    this.fm.reset()
  }
}
</script>
