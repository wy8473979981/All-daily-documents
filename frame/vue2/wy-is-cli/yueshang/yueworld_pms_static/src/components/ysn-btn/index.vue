<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 按钮组件
-->
<template>
  <span>
    <el-button
      :type="btnType"
      v-bind="$attrs"
      size="medium"
      class="btn"
      :class="type"
      :style="{width:width}"
      v-on="$listeners"
    >
      <slot />
    </el-button>
  </span>

</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    width: {
      type: String,
      default: 'auto'
    }
  },
  data() {
    return {
      // 特殊类型
      btnTyleList: [
        'delete', 'reset'
      ]
    }
  },
  computed: {
    btnType() {
      if (this.btnTyleList.includes(this.type)) {
        return 'text'
      }
      return this.type
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
    .btn{
        border: none;
        padding: 0 14px;
        border-radius: 16px;
        line-height: 32px;
        min-width: 86px;
        font-size: 14px;

        // 主要按钮
        &.el-button--primary{
            &:hover{
                background: #20384A;
            }
            &:focus{
              background:#1C4C7F ;
            }
        }
         &.el-button--primary.is-disabled, &.el-button--primary.is-disabled:hover{
            background-color: #8ea6bf;
            color:#fff;
        }

        // 主要按钮-红色
        &.reject{
            background: #6F120C;
            color:#fff;
            &:hover{
                background: #6F120C
            }
        }
         &.reject.is-disabled{
            background-color: rgba(111,18,12,.5);
            color:#fff;
        }

        // 信息/次要按钮
        &.el-button--info{
            background: #E5E2DE;
            color: #848382;
            &:hover{
                background: #D1CEC9;
            }
        }
         &.el-button--info.is-disabled, &.el-button--info.is-disabled:hover{
            background: #EFEDEA;
            color: #D1CEC9;
        }

        // 删除
        &.delete{
            color: #6F120C;
            &.is-disabled{
                color: rgba(111,18,12,.5);
            }
        }

         // 重置
        &.reset{
            color: #848382;
        }
        &.el-button--text{
          min-width: auto;
          padding: 0;
        }
    }
</style>
