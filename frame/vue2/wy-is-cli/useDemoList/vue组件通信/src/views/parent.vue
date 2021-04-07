<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-19 13:13:28
 * @LastEditTime: 2020-07-19 17:38:22
 * @LastEditors: user
 * @Description: 
 * @FilePath: \usedemolist\src\views\parent.vue
 -->
<!--
<template>
  <div class="home">
    <p>父组件</p>
    {{ parentData }}
    <div class="child-box">
      <p>子组件</p>
      <child-1 :source="parentData" @getChildData="getChildData"></child-1>
    </div>
  </div>
</template>

 <script>
// import child from "./child/child-1.vue";
// export default {
//   name: "Home",
//   data() {
//     return {
//       parentData: "llgtfoo@163.com" //父组件数据
//     };
//   },
//   methods: {
//     getChildData(data) {
//       console.log(data);
//       this.parentData += data; //将子组件传递的数据显示在父组件后面
//     }
//   },
//   components: {
//     "child-1": child
//   }
// };
// </script>
-->
<!--
<template>
  <div class="parent">
    <p>父组件</p>
    <b>data:{{ parentData }}</b>
    <button @click="send">向子组件发送数据</button>
    <p>-----------------------------------------------</p>
    <child-2></child-2>
    <p>-----------------------------------------------</p>
    <child-3></child-3>
    <p>-----------------------------------------------</p>
  </div>
</template>

<script>
import child2 from "./child/child-2";
import child3 from "./child/child-3";
import { bus } from "@/utils/bus";
export default {
  data() {
    return {
      parentData: "父组件数据-----",
      sendData: "父组件传向子组件的数据"
    };
  },
  components: {
    "child-2": child2,
    "child-3": child3
  },
  methods: {
    send() {
      bus.$emit("goSend", this.sendData);
    }
  }
};
</script>

<style></style>
-->
<!--
<template>
  <div class="parent">
    <p>父组件</p>
    <p>{{ data }}</p>
    <button @click="data = '好帅'">父组件改变值</button>
    <p>===================================</p>
    <child-5 v-model="data"></child-5>
  </div>
</template>

<script>
import child5 from "./child/child-5.vue";
export default {
  components: {
    "child-5": child5
  },
  data () {
    return {
      data: "llgtfoo@163.com"
    };
  }
};
</script>

<style></style>
-->
<!--
<template>
  <div class="parent">
    <p>{{ parentData }}</p>
    <button @click="send">调用子组件组件方法</button>
    <p>================================</p>
    <child-6 :data="parentData"></child-6>
    <p>====================================</p>
    <child-7 :data="parentData"></child-7>
  </div>
</template>

<script>
import child6 from "./child/child-6";
import child7 from "./child/child-7";
export default {
  components: {
    "child-6": child6,
    "child-7": child7
  },
  data() {
    return {
      parentData: "llgtfoo"
    };
  },
  methods: {
    change(data) {
      this.parentData += data;
    },
    send() {
      // console.log(this.$children);
      this.$children[0].childChange(this.$children[0].childData);
    }
  }
};
</script>

<style></style>-->

<template>
  <div>
    <h2>浪里行舟</h2>
    <child-com1 :foo="foo" :boo="boo" :coo="coo" :doo="doo" title="前端工匠" @export="change"></child-com1>
  </div>
</template>
<script>
const childCom1 = () => import("./child/childCom1.vue");
export default {
  components: { childCom1 },
  data () {
    return {
      foo: "Javascript",
      boo: "Html",
      coo: "CSS",
      doo: "Vue"
    };
  },
  methods: {
    change (data) {
      console.log(data)
    }
  }
};
</script>
