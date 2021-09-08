<template>
  <div>
    <!-- title组件 -->
    <ysn-title title="基础数据">
      <div class="font-z-14" @click="pokuer = !pokuer">{{ pokuer?"收起":"展开" }}<i
        class="font-color"
        :class="!pokuer?'el-icon-arrow-down':'el-icon-arrow-up'"
      /></div>
    </ysn-title>
    <!-- 表单组件 -->
    <el-collapse-transition>
      <div v-if="pokuer">
        <!-- <el-form ref="ruleForm" :model="formData" label-position="top" size="small"  >
           <ysn-formItem
           :form="formData"
           :config="configData"
           :column="6"
           clearable
         >
           </ysn-formItem>
          </el-form> -->
        <ysn-displayInfo
          class="mt-8"
          :data="detailedData.formDataDisplayInfo"
          :config="detailedData.displayInfoData"
          :column="6"
        />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>

export default {
  name: 'FormText',
  props: {
    detailedData: { type: Object }// 配置和数据
  },
  data() {
    return {
      pokuer: true
    }
  },

  methods: {

  }
}
</script>

<style scoped lang="scss">
   .font-z-14{
       font-size:12px;
       color:#050101;
       .font-color{
           color:#050101;
           margin-left:8px;
       }
   }
</style>

