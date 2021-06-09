<!--
 * @Author: 子君
 * @Date: 2020-07-08 16:12:32
 * @LastEditors: 子君
 * @LastEditTime: 2020-07-17 09:44:16
 * @Description: 文件说明
 * @FilePath: \vue-base\src\views\home\index.vue
-->
<template>
  <div class="home">
    <van-field v-model="fieldValue" is-link readonly label="地区" placeholder="请选择所在地区" @click="show = true" />
    <van-popup v-model="show" round position="bottom">
      <van-cascader v-model="cascaderValue" title="请选择所在地区" @change="pp" :options="options" @close="show = false" @finish="onFinish" />
    </van-popup>
  </div>
</template>

<script>
// 使用vant 组件
import { List, NoticeBar, Cell, Notify, Cascader, Popup, Field } from 'vant'

// 使用装饰器
import { confirm } from '@/decorator'

// 使用日期工具类
import { format, DATE_FMT } from '@/utils/date'

// 接口
import { getDemoData, getDemoData1 } from '@/api/home'

export default {
  name: 'Home',
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [NoticeBar.name]: NoticeBar,
    [Cascader.name]: Cascader,
    [Popup.name]: Popup,
    [Field.name]: Field,
  },
  data() {
    return {
      currentDate: format(new Date(), DATE_FMT),
      show: false,
      fieldValue: '',
      cascaderValue: '',
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [],
    };
  },
  created() {
    // this.$_loadData()
    this.$_loadData1()
  },

  methods: {
    // 加载数据
    async $_loadData() {
      const loading = this.$loading()
      try {
        console.log(await getDemoData())
        Notify({
          message: '数据加载成功',
          type: 'success'
        })
      } catch (error) {
        console.error(error)
      } finally {
        loading.close()
      }
    },
    // 加载数据
    async $_loadData1() {
      const loading = this.$loading()
      try {
        console.log(await getDemoData1())
        Notify({
          message: '数据加载成功',
          type: 'success'
        })
        let data = await getDemoData1();
        this.options = data.data.options



      } catch (error) {
        console.error(error)
      } finally {
        loading.close()
      }
    },
    pp({ value, selectedOptions, tabIndex }) {
      console.log(selectedOptions)
      if (tabIndex == 5) {
        this.options = [
          {
            text: '111',
            value: '1111',
            children: [
              {
                text: '2222', value: '22222',
                children: [
                  {
                    text: '33333', value: '33333',
                    children: [{
                      text: '444', value: '4444',
                      children: [{
                        text: '555', value: '5555',
                        children: [{
                          text: '6666', value: '666',
                          children: [{ text: '777', value: '777' }]
                        }]
                      }]
                    }]
                  }]
              }],
          },
          {
            text: '江苏省',
            value: '320000',
            children: [
              {
                text: '南京市', value: '320100',
                children: [
                  {
                    text: '3333', value: '4444',
                    children: [{ text: '111', value: '33333' }]
                  }]
              }],
          },
        ]
      }
    },
    onFinish({ selectedOptions }) {
      this.show = true;
      this.fieldValue = selectedOptions.map((option) => option.text).join('/');
    },
  }
}
</script>
<style lang="less" scoped>
.home {
  /** 审查元素，这个样式会转换为 font-size: 4.267vw; */
  font-size: 16px;
}
</style>
