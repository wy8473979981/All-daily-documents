<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: ysn-radio
-->

<template>
  <el-radio v-bind="$attrs" v-on="$listeners">
    {{ item.name }}
  </el-radio>
</template>

<script>
export default {
  name: 'YsnRadio'
}
</script>
