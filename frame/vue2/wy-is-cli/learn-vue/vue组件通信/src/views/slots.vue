<template>
  <test :data="data">
    <span slot-scope="scope">{{ scope.name }} | vm.scopedSlots的使用</span>
  </test>
</template>

<script>
import Test from "./slots/slots.vue";
export default {
  components: {
    Test
  },

  data() {
    return {
      data: [{ name: 111 }, { name: 222 }, { name: 333 }]
    };
  }
};
</script>
