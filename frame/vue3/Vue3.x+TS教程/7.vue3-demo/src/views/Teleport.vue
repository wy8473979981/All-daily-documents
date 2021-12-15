<template>
  <div>
    <Dialog v-if="dialogVisible">Dialog</Dialog>
    <button @click="dialogVisibleFun">Dialog</button>
  </div>
</template>

<script lang="ts">
import useCount from "../hooks/useCount";
import Dialog from "../components/Dialog.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",
  components: {
    Dialog,
  },
  setup() {
    const { count, multiple, increase, decrease } = useCount(10);
    const dialogVisible = ref(false);
    const dialogVisibleFun = () => {
      dialogVisible.value = !dialogVisible.value;
    };

    return {
      count,
      multiple,
      increase,
      decrease,
      dialogVisible,
      dialogVisibleFun,
    };
  },
});



</script>


