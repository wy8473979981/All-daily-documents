<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: AMP首页-中间进度条数据模块-进度条组件
-->

<template>
  <!-- //分解模式 -->
  <div class="position-relative">
    <div class="box d-flex color-bg" :style="'background:'+background">
      <!-- 等分进度条 -->
      <div v-for="(item,index) in progList" :key="'bg'+index" class="bg-box flex-1">
        <div class="position-relative">
          <!-- 每一个分割后的进度条 -->
          <div class="color-list-box position-relative last-div">
            <!-- 每个小模块的色块 -->
            <div
              v-for="(c_item,c_index) in item.numList"
              :key="'c'+c_index"
              :style="[{'background-color':item.bgColor[c_index]},{'width':getWidth(c_item,item.max)+'%'}]"
            />
            <div v-if="getWidth(getNum(item.numList),item.max)<50&&getWidth(getNum(item.numList),item.max)!=0" class="right-text">
              {{ item.text }}
            </div>
          </div>

          <!-- 左文字 -->
          <div v-if="getWidth(getNum(item.numList),item.max)>=50" class="left-text" :style="'width:'+getWidth(getNum(item.numList),item.max)+'%'">
            {{ item.text }}
          </div>
          <div v-if="getWidth(getNum(item.numList),item.max)==0" class="left-text pl-20 gray">
            暂无
          </div>
        </div>
      </div>
    </div>

    <!-- 色块滑动上去的区域 -->
    <div class="show-tips-box position-absolute-all ">
      <div class="box d-flex">
        <!-- 等分进度条 -->
        <div v-for="(item,index) in progList" :key="'bg'+index" class="bg-box flex-1">
          <div class="position-relative">
            <!-- 每一个分割后的进度条 -->
            <div class="color-list-box position-relative ">
              <!-- 每个小模块的色块 -->
              <div v-for="(c_item,c_index) in item.numList" :key="'c'+c_index" :style="[{'width':getWidth(c_item,item.max)+'%'}]">
                <popoverItem v-if="item.from" :color="item.bgColor[c_index]" :from="item.from" @switchChange="switchChange">
                  <div
                    class="cursor-pointer"
                    style="height:36px"
                  />
                </popoverItem>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import popoverItem from './popoverItem'
export default {
  name: 'ProgressItem',
  components: { popoverItem },
  props: {
    // 进度条数据
    progList: {
      type: Array,
      default: () => []
    },
    // 背景色
    background: {
      type: String,
      default: '#D9D9D9'
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    if (document.getElementById('getWidth')) {
      this.widthPx = document.getElementById('getWidth').offsetWidth
    }
  },
  methods: {
    //   求和
    getNum(arr) {
      return arr.reduce(function(prev, curr, idx, arr) {
        return prev + curr
      })
    },
    // 返回宽度百分比
    getWidth(num, max) {
      return (num / max * 100).toFixed(2)
    },
    // 传递switch
    switchChange(e) {
      this.$emit('switchChange', e)
    }
  }
}
</script>

<style lang="scss" scoped>
    .box{
        height: 36px;
        width: 100%;
    }
    .color-bg{
        border-radius: 18px;
    }
    .color-bg {
        .bg-box:first-child{
            .color-list-box:first-child{
                &>div:first-child{
                    border-top-left-radius: 18px;
                    border-bottom-left-radius: 18px;
                }
            }
        }

        // .bg-box:last-child{
        //     .color-list-box{
        //         &>div:last-child{
        //             // border-top-right-radius: 18px;
        //             // border-bottom-right-radius: 18px;
        //         }
        //     }
        // }

    }
    .color-list-box{
        font-size: 0;
        &>div{
           transition: all 1s;
            display: inline-block;
            line-height: 36px;
            height: 36px;
            vertical-align: middle;
            font-size: 24px;
        }
    }
    .left-text{
        color: #FFFFFF;
        font-size: 24px;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        line-height: 36px;
        text-align: center;
    }
    .right-text{
        color: #050101;
        font-size: 24px;
        line-height: 36px;
    }
    .show-tips-box{
        height: 36px;
    }
    .model-text{
        line-height: 36px;
        padding-left: 10px;
        font-size: 24px;
    }
    .gray{
      color: #919191;
    }
</style>
