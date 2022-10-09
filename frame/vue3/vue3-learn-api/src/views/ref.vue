<template>
  <div class="home">
    <div>
      <h2>欢迎光北海九号主题餐厅</h2>
      <div>请选择一位美女为你服务{{ selectGirl }}</div>
    </div>
    <div>
      <button v-for="(item, index) in girls" v-bind:key="index" @click="selectGirlFun(index)">
        {{ index }}:{{ item }}
      </button>
    </div>
  </div>
  <div class="tabs-content">
    <a-radio-group v-model:value="mode" :style="{ marginBottom: '8px' }">
      <a-radio-button value="top">Horizontal</a-radio-button>
      <a-radio-button value="left">Vertical</a-radio-button>
    </a-radio-group>
    <a-tabs v-model:activeKey="activeKey" :tab-position="mode" :style="{ height: '200px' }" @tabScroll="callback">
      <a-tab-pane v-for="i in 30" :key="i" :tab="`Tab-${i}`">Content of tab {{ i }}</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import type { TabsProps } from 'ant-design-vue'

  export default defineComponent({
    setup() {
      // const mode = ref<TabsProps['tabPosition']>('top')
      const mode = ref('top')
      const activeKey = ref(1)
      const callback: TabsProps['onTabScroll'] = (val) => {
        console.log(val)
      }
      return {
        mode,
        callback,
        activeKey
      }
    }
  })
  // import { defineComponent, ref } from 'vue'

  // export default defineComponent({
  //   name: 'Home',
  //   components: {},
  //   setup() {
  //     const girls = ref(['小红', '小李', '小张'])
  //     const selectGirl = ref('')
  //     const selectGirlFun = (index: number) => {
  //       selectGirl.value = girls.value[index]
  //     }
  //     //因为在模板中这些变量和方法都需要调用，所以需要return出去。
  //     return {
  //       girls,
  //       selectGirl,
  //       selectGirlFun
  //     }
  //   }
  // })
</script>
<style lang="scss">
  .tabs-content {
    width: 500px;
    margin: 0 auto;
  }
</style>
