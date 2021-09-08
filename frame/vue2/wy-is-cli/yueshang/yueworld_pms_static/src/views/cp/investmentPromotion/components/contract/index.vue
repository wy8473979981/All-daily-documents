<template>
  <div class="app-page-main">
    <div class="drop-down">
      <el-form
        ref="ruleForm"
        :model="formData"
        label-position="top"
      >
        <ysn-formItem
          :form="formData"
          :config="configData"
          :column="4"
          clearable
        />
      </el-form>
    </div>
    <div class="tabss">
      <ysn-flod id="基础信息" title="基础信息" :show-flod="false">
        <div class="shopinformations">
          <div v-for="(item,i) in list" :key="i" class="shopinformation">
            <p>{{ item.t1 }}</p>
            <p>{{ item.t2 }}</p>
          </div>
        </div>
      </ysn-flod>
    </div>
    <ysn-title :title="title">
      <el-radio v-model="radio" label="1" disabled>已完成</el-radio>
      <el-radio v-model="radio" label="2" disabled>进行中</el-radio>
      <el-radio v-model="radio" label="3" disabled>未进行</el-radio>
    </ysn-title>
    <ysn-progress :list="progress_list" :active="progress_active">
      <div slot-scope="scope">
        <div v-if="scope.rows.no">洽谈编号</div>
        <div style="margin-bottom:10px">{{ scope.rows.no }}</div>
        <div v-if="scope.rows.no1">洽谈日期</div>
        <div style="margin-bottom:10px">{{ scope.rows.no1 }}</div>
        <div v-if="scope.rows.no2">洽谈方式</div>
        <div style="margin-bottom:10px">{{ scope.rows.no2 }}</div>
        <div v-if="scope.rows.no3">联系人</div>
        <div style="margin-bottom:10px">{{ scope.rows.no3 }}</div>
        <div v-if="scope.rows.no4">联系电话</div>
        <div style="margin-bottom:10px">{{ scope.rows.no4 }}</div>
        <div v-if="scope.rows.no5">沟通内容</div>
        <div style="margin-bottom:-10px">{{ scope.rows.no5 }}</div>
        <div v-if="scope.rows.t1">意向编号</div>
        <div style="margin-bottom:10px">{{ scope.rows.t1 }}</div>
        <div v-if="scope.rows.t2">意向签约日期</div>
        <div style="margin-bottom:10px">{{ scope.rows.t1 }}</div>
        <div v-if="scope.rows.v1">合同编号</div>
        <div style="margin-bottom:10px">{{ scope.rows.v1 }}</div>
        <div v-if="scope.rows.v2">合同开始日期</div>
        <div style="margin-bottom:10px">{{ scope.rows.v2 }}</div>
        <div v-if="scope.rows.v3">合同结束日期</div>
        <div style="margin-bottom:10px">{{ scope.rows.v3 }}</div>
        <div v-if="scope.rows.v4">合同进场日期</div>
        <div style="margin-bottom:10px">{{ scope.rows.v4 }}</div>
      </div>
    </ysn-progress>
  </div>
</template>
<script>
import { formData, selectList, configData, list, progress_list } from './data.js'
export default {
  name: 'SpeedOfProgress',
  components: {},
  data() {
    return {
      formData,
      selectList,
      configData,
      list,
      progress_list,
      radio: '1',
      progress_active: 2 // 当前进度激活下标
    }
  },
  watch: {},
  created() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleClicks(tab, event) {
      console.log(tab, event)
    },
    next() {
      if (this.active++ > 2) this.active = 1
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index'
</style>
