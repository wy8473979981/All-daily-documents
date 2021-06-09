<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: AMP-首页-主要数据展示
-->
<template>
  <div class="box-main">
    <!-- 顶部选择 -->
    <div class="flex-ju-between flex-ju-center box-form pt-16">
      <div class="pt-8">
        <el-radio-group v-model="showForm.showType" @change="dataChange">
          <el-radio label="1">
            <span :class="showForm.showType=='1'?'radioActive':'gary'">按项目单元</span>
          </el-radio>
          <el-radio label="2" class="ml-f10">
            <span :class="showForm.showType==='2'?'radioActive':'gary'">按资产单元</span>
          </el-radio>
        </el-radio-group>
      </div>

      <div class="text-left flex-1 pl-8">
        <div class="flex-ju-start">
          <!-- 地区筛选 -->
          <ysn-radioDialog :form="showForm" prop="area" :list="homeArea" class="ml-20" @ok="dataChange">
            <div class="box-form-select cursor-pointer ">
              地产区域: {{ showForm.area | getOptionsLabel('homeArea') || '全部' }}
            </div>
          </ysn-radioDialog>

          <!-- 公司筛选 -->
          <ysn-radioDialog :form="showForm" prop="company" :list="homeCompany" class="ml-20" @ok="dataChange">
            <div class="box-form-select cursor-pointer ">
              地产区域: {{ showForm.company | getOptionsLabel('homeCompany') || '全部' }}
            </div>
          </ysn-radioDialog>
        </div>
      </div>

      <!-- 模式切换 -->
      <div class="modelChange">
        <div class="cursor-pointer " @click="changeModel">{{ progressModel===1?'汇总模式':'分解模式' }}</div>
      </div>
    </div>

    <progressMain :model="progressModel" :progress-data="progressData" :prog-all-max-num="progAllMaxNum" :progress-all-data="progressAllData" @switchItemChange="switchItemChange" />
  </div>
</template>

<script>
import { homeArea, homeCompany } from '@/utils/optionsList'
import progressMain from './blocks/progressMain'
export default {
  name: 'MainData',
  components: { progressMain },
  props: {
    // 进度条数据
    progressData: {
      type: Object,
      default: () => {}
    },
    // 汇总模式最大值
    progAllMaxNum: {
      type: Number,
      default: 100
    },
    // 进度条-汇总模式数据
    progressAllData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {

      // 显示模式form
      showForm: {
        // 显示模式： 1->项目 2->资产
        showType: '1',
        // 地区
        area: '',
        // 公司
        company: ''

      },
      // 地区字典
      homeArea,
      // 公司字典
      homeCompany,
      // 进度条数据模式
      progressModel: 1 // 1->汇总模式 2:分解模式
    }
  },
  mounted() {

  },
  methods: {
    // 模式切换
    changeModel() {
      const { progressModel } = this
      if (progressModel === 1) {
        this.progressModel = 0
        return
      }
      this.progressModel = 1
    },
    // 显示模式/地区/公司切换
    dataChange(v) {
      this.$emit('getData', this.showForm)
    },
    // switch切换
    switchItemChange(form) {
      this.$emit('getData', form)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-main{
  box-sizing: border-box;
  padding-right: 52px;
}
.flex-1{
  flex: 1;
}
.box-form{

  .box-form-select{
    width: 150px;
    height: 32px;
    background: #C8C6A9;
    border-radius: 16px;
    line-height: 32px;
    font-size: 14px;
    color: #FFFFFF;
    font-weight: 400;
    padding: 0 14px;
    box-sizing: border-box;
  }
}
.modelChange{
  width: 150px;
  text-align: right;
  &>div{
    width: 88px;
    height: 32px;
    background: #C8C6A9;
    border-radius: 16px;
    font-size: 14px;
    color: #fff;
    line-height: 32px;
    display: inline-block;
    text-align: center;
  }
}
.ml-f10{
  margin-left: -10px;
}
.gary{
  color: #A7A7A7;
}
.radioActive{
  font-size: 16px;
  font-weight: bold;
}
</style>
