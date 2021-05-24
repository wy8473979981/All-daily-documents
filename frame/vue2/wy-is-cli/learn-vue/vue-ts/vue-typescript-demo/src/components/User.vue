<template>
  <div>
    <div v-for="(item, index) in userList" :key="index">
      <p>id : {{ item.id }}</p>
      <p>姓名：{{ item.name }}</p>
      <p>性别：{{ item.sex }}</p>
      <p>年龄：{{ item.age }}</p>
      <p>年龄：{{ item }}</p>
      <button @click="remove(item.id)">删除</button>
      <input type="text" :value="firName" @input="onChangeFirstName">
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Model } from "vue-property-decorator"

interface IUser {
  id:number;
  name: string;
  age: number;
  sex?: number;
}
@Component({
  name: "User"
})
export default class About extends Vue {
  @Prop(Array) userList!: Array<IUser>;
  @Model("changeFirstName", { type: String })
  firName!:String

  @Emit("on-remove")
  remove(id: number) {
    return id
  }

  @Emit("changeFirstName")
  onChangeFirstName(e:any) {
    return e.target.value
  }
}
</script>
