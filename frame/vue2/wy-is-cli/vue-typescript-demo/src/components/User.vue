<template>
  <div>
    <div v-for="(item, index) in userList" :key="index">
      <p>姓名：{{ item.name }}</p>
      <p>性别：{{ SEX[item.sex] }}</p>
      <p>年龄：{{ item.age }}</p>
      <p>年龄：{{ item }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

enum Sex {
  "男" = 0,
  "女" = 1
}

@Component({
  name: "User"
})
export default class About extends Vue {
  @Prop(Array) userList!: object;

  SEX: any = Sex;
}
</script>
