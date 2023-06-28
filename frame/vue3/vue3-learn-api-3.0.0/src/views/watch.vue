<template>
  <div>
    <h2>欢迎光北海九号主题餐厅</h2>
    <div>请选择一位美女为你服务</div>
  </div>
  <div>
    <button v-for="(item, index) in girls" v-bind:key="index" @click="selectGirlFun(index)">
      {{ index }} : {{ item }}
    </button>
  </div>
  <div>你选择了【{{ selectGirl }}】为你服务</div>
  <hr />
  <div><button @click="overAction">点餐完毕</button></div>
  <div>{{ overText }}</div>
</template>

<script lang="ts">
  import { reactive, toRefs, ref, watch, watchEffect } from 'vue'

  interface DataProps {
    girls: string[]
    selectGirl: string
    selectGirlFun: (index: number) => void
  }

  export default {
    name: 'App',
    setup() {
      const data: DataProps = reactive({
        girls: ['小红', '小李', '小张'],
        selectGirl: '',
        selectGirlFun: (index: number) => {
          data.selectGirl = data.girls[index]
        }
      })
      const refData = toRefs(data)
      const overText = ref('北海九号')
      const overAction = () => {
        overText.value = overText.value + '点餐完成 | '
      }
      // const stopWatchRoom = watch(
      //   [overText, () => data.selectGirl],
      //   (newValue, oldValue) => {
      //     console.log(`new--->${newValue}`);
      //     console.log(`old--->${oldValue}`);
      //     document.title = newValue[0];
      //   }
      // );

      // stop 停止监听
      // setTimeout(() => {
      //   // 停止监听
      //   stopWatchRoom();
      // }, 3000);

      watchEffect(() => {
        console.log(data, 'data')
        console.log(overText)
      })

      return { ...refData, overText, overAction }
    }
  }
</script>
