<template>
  <div class="app-page-main">
    <div class="drop-down">
      <el-form
        ref="ruleForm"
        :model="formData"
        :rules="rulesForm"
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
    <!-- 进度信息标题 -->
    <ysn-title :title="title">
      <el-radio v-model="radio" label="1" disabled>已完成</el-radio>
      <el-radio v-model="radio" label="2" disabled>进行中</el-radio>
      <el-radio v-model="radio" label="3" disabled>未进行</el-radio>
    </ysn-title>
    <!-- 进度信息组件 -->
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
        <div style="margin-bottom:10px">{{ scope.rows.no5 }}</div>
      </div>
    </ysn-progress>
  </div>
</template>
<script>

import { formData, selectList, configData, progress_list, list } from './data'
export default {
  name: 'SpeedOfProgress',
  components: {},
  data() {
    return {
      formData,
      selectList,
      configData,
      list,
      activeName: 'first',
      radio: '1',
      title: '进度信息',
      progress_active: 0, // 当前进度激活下标
      progress_list
    }
  },
  watch: {},
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
@import "./index";
</style>
