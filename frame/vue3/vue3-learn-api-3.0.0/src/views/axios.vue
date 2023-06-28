<template>
  <div>
    <h2>欢迎光北海九号主题餐厅</h2>
    <div>随机选择一位美女服务员</div>
    <div v-if="loading">Loading.....</div>
    <img v-if="loaded" :src="result.url" />
    <div>{{ result.url }}</div>
  </div>
</template>
<script lang="ts">
  import { ref } from 'vue'
  import useUrlAxios from '../hooks/useURLAxios'
  const app = {
    name: 'App',
    setup() {
      const { result, loading, loaded } = useUrlAxios(
        'https://www.fastmock.site/mock/454f99ba2d1c6fd0b1ed79a1ad0132de/api/getImage'
      )
      return { result, loading, loaded }
    }
  }
  export default app
</script>
