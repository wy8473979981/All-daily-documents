<!--
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-21 13:50:19
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-18 14:30:45
-->
<template>
  <div class="dashboard-container">
    <div>{{ state }}</div>
    <div>{{ stateAsRefs }}</div>
    <button @click="change1">change1</button>
    <button @click="change2">change2</button>
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, onBeforeMount, ref, toRefs, reactive } from 'vue'
import AdminDashboard from './admin/Index.vue'
import EditorDashboard from './editor/Index.vue'
export default defineComponent({
  components: {
    AdminDashboard,
    EditorDashboard
  },
  setup() {
    const store = useStore()
    const currentRole = ref('admin-dashboard')
    const roles = computed(() => {
      return store.state.user.roles
    })
    onBeforeMount(() => {
      if (!roles.value.includes('admin')) {
        currentRole.value = 'editor-dashboard'
      }
    })

    const state = reactive({
      foo: 1,
      bar: 2
    })

    const stateAsRefs = toRefs(state)

    function change1(){
      state.foo++
    }

    function change2(){
      stateAsRefs.foo.value++
    }

    console.log(state.foo) // 3
    console.log(stateAsRefs.foo.value) // 2

    return {
      currentRole,
      state,
      stateAsRefs,
      change1,
      change2
    }
  }
})
</script>
