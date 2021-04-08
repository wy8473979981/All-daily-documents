<template>
  <div>
    <glp-card title="基础债权相关" class="my-4">
      <el-form
        ref="dataform"
        size="small"
        :model="form"
        label-position="top"
        :disabled="pageType==='detail' || pageType==='auth' || !accessBase"
      >
        <el-row :gutter="48">
          <el-col :span="8" v-if="form.transferMethod != -1">
            <el-form-item label="数据传输方式" prop="transferMethod">
              <el-select
                v-model="form.transferMethod"
                placeholder
                :class="[$style.colwidth]"
                disabled
              >
                <dict-options name="project_sjcsfs"></dict-options>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.debtType != -1">
            <el-form-item label="基础债权类型">
              <el-select
                v-model="form.debtType"
                placeholder
                :class="[$style.colwidth]"
                disabled
              >
                <dict-options name="project_jczqlx"></dict-options>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.takeEffectTimeType != -1">
            <el-form-item label="基础债权生效时间">
              <el-select
                v-model="form.takeEffectTimeType"
                placeholder
                :class="[$style.colwidth]"
                disabled
              >
                <dict-options name="project_jczqsxsj"></dict-options>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="48">
          <el-col :span="16" v-if="form.cancelCondition1 != -1">
            <el-form-item label="基础债权作废条件">
              <el-col :span="8"  :class="[$style.padding0]">
                <el-select
                  v-model="form.cancelCondition1"
                  placeholder
                  :class="[$style.colwidth]"
                  disabled
                >
                  <dict-options name="project_jczqzftj_start"></dict-options>
                </el-select>
              </el-col>
              <el-col
                :span="1"
                v-if="form.cancelCondition2 != -1 && form.cancelCondition1 != -1"
              >+</el-col>
              <el-col :span="8" v-if="form.cancelCondition2 != -1"  :class="[$style.padding0]">
                <el-select
                  v-model="form.cancelCondition2"
                  placeholder
                  :class="[$style.colwidth]"
                  @change="onChangeCancelCondition2"
                >
                  <dict-options name="project_jczqzftj_end"></dict-options>
                </el-select>
              </el-col>
              <el-col :span="6" v-if="Number(form.cancelCondition2) === 2">
                <el-select
                  v-model="form.cancelCondition2CustomDay"
                  placeholder
                  :class="[$style.colwidth]"
                >
                  <dict-options name="project_jczqzftj_day"></dict-options>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </glp-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Emit, Watch } from 'vue-property-decorator'

@Component
export default class DataForm extends Vue {
  @Ref() dataform!: any

  @Prop() status!: string

  @Prop() pageType!: string

  @Prop() dataForm!: any

  accessBase = false

  form: Record<string|number, any> = {
    transferMethod: '',
    debtType: '',
    takeEffectTimeType: '',
    cancelCondition1: '',
    cancelCondition2: '',
    cancelCondition2CustomDay: ''
  }

  @Emit('onDataForm') onDataForm () {
    return this.form
  }

  @Watch('dataForm') onChangeDataForm () {
    this.form.transferMethod = String(this.dataForm.transferMethod)
    this.form.debtType = String(this.dataForm.debtType)
    this.form.takeEffectTimeType = String(this.dataForm.takeEffectTimeType)
    this.form.cancelCondition1 = String(this.dataForm.cancelCondition1)
    this.form.cancelCondition2 = String(this.dataForm.cancelCondition2)
    if (this.form.cancelCondition2 === '2') {
      this.form.cancelCondition2CustomDay = String(this.dataForm.cancelCondition2CustomDay)
    }
  }

  onChangeCancelCondition2 (value: any) {
    if (Number(value) === 2) {
      this.form.cancelCondition2CustomDay = '31'
    }
  }

  mounted () {
    this.onDataForm()
    const access = this.$auth.accessSync('/project/product/edit/base') || this.$auth.accessSync('/project/product/open-edit/base')
    if (access) {
      this.accessBase = true
    }
  }
}
</script>

<style lang="scss" module>
.colwidth {
  width: 100%;
}
.padding0{
  padding: 0 !important;
}
</style>
