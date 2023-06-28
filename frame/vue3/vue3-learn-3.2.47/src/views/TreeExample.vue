<!--
一个可以递归渲染自己的嵌套树组件。
你可以双击一个项目将其转变为一个文件夹。
-->
<script setup>
import { ref } from 'vue'
import TreeItem from '@/components/TreeItem.vue'

const treeData = ref({
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'world' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'world' }]
        },
        { name: 'hello' },
        { name: 'world' },
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'world' }]
        }
      ]
    }
  ]
})
</script>

<template>
  <ul>
    <TreeItem class="item1" :model="treeData"></TreeItem>
  </ul>
</template>

<style>
.item1 {
  cursor: pointer;
  line-height: 1.5;
}
.bold {
  font-weight: bold;
}
</style>