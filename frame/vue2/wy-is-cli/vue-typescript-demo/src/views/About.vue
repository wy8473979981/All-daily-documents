<template>
  <div class="about">
    <h1>This is an about page</h1>
    <hr />

    <p>{{ firstName }}</p>
    <p>{{ lastName }}</p>
    <p>{{ fullName }}</p>
    <button @click="modifyFull">修改fullName</button>
    <hr />
    <User :user-list="userList"></User>
</div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import User from "@comps/User.vue"

interface IUser {
  name: string;
  age: number;
  sex?: number;
}

@Component({
  components: { User }
})
export default class About extends Vue {
  // 定义data 数据
  firstName = "zhang";
  lastName = "san";
  userList: Array<IUser> = [
    {
      name: "张三",
      age: 10,
      sex: 0
    },
    {
      name: "李四",
      age: 10,
      sex: 1
    }
  ];

  // 计算属性
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  set fullName(val: string) {
    const arr = val.split(" ")
    // const [firstName, lastName] = arr
    this.firstName = arr[0]
    this.lastName = arr[1]
  }

  // 监听
  @Watch("firstName")
  onWatchFirstNameChange(newVal: string, oldVal: string) {
    console.log(newVal, oldVal)
  }

  created() {
    this.fullName = "wang wu"
  }

  modifyFull() {
    this.fullName = "li si"
  }
}
</script>
