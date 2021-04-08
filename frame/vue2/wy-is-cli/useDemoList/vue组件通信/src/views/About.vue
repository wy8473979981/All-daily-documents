

<template>
  <div class="details">
    <h1>vue sync修饰符示例</h1>
    <myComponent :show.sync='valueChild' style="padding: 30px 20px 30px 5px;border:1px solid #ddd;margin-bottom: 10px;"></myComponent>
    <button @click="changeValue">toggle</button>
  </div>
</template>
<script>
import myComponent from "./about-child/child1";
export default {
  components: {
    myComponent
  },
  data () {
    return {
      valueChild: true,
    }
  },
  methods: {
    changeValue () {
      this.valueChild = !this.valueChild
    }
  }
}
</script>