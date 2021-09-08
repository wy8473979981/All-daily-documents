<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: tag展示的input
-->
<template>
  <el-input
    v-bind="$attrs"
    :placeholder="dataList.length===0?($attrs.inputType==='autoValue'? '--自动带入--':$attrs.placeholder || '请输入'):''"
    resize="none"
    class="tag-input"
    @blur="$attrs.blur || ''"
  >
    <div slot="prefix" class="ml-8 flex-ju-al-center" style="height:100%">
      <!-- 默认文字 -->
      <span v-if="dataList.length===0" />
      <!-- 选中至少一个的效果 -->
      <el-tag v-if="dataList.length>0" size="small" :closable="!$attrs.disabled" color="#1C4C7F" class="tag px-8 " disable-transitions @close="tagClose">
        <span class="text-truncate tag-text">
          {{ dataList[0]| getOptionsLabel($attrs.list) }}
        </span>
      </el-tag>

      <!-- 选中2个以上 -->
      <!-- 选中至少一个的效果 -->
      <el-tag v-if="dataList.length>1" size="small" color="#1C4C7F" class="tag px-8 " disable-transitions>
        +{{ dataList.length-1 }}
      </el-tag>
    </div>

    <template #suffix>
      <i class="el-select__caret el-input__icon el-icon-arrow-down" />
    </template>
  </el-input>

</template>

<script>
export default {
  name: 'YsnInputTag',
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  methods: {
    // tag关闭
    tagClose() {
      this.$emit('tagClose')
    }
  }
}
</script>
<style lang="scss" scoped>
    .tag{
      color: #fff;
      border-radius: 20px;
      vertical-align: middle;
        ::v-deep .el-tag__close{
            display: inline-block;
            vertical-align: middle;
              color: #fff;
            transform:scale(1)
        }
    }
    .tag-text{
      display: inline-block;
      vertical-align: middle;
      line-height: 24px;
    }
    .tag-input.el-input--prefix{
        ::v-deep.el-input__inner{
            padding-left: 15px;
        }
    }

</style>
