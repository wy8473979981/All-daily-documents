<template>
  <div class="app-page-main">
    <div class="hearder">
      <ysn-btn style="margin-right:8px" @click="submit()">审批</ysn-btn>
      <ysn-btn>驳回</ysn-btn>
    </div>
    <div class="carousel">
      <!-- 基本信息 -->
      <ysn-flod id="基本信息" title="基本信息" :show-flod="false">
        <el-form ref="rulesForm" :model="formData1" label-position="top" size="small" :rules="rulesForm">
          <ysn-formItem :form="formData1" :config="configData1" :column="5" :pack-up="packUp" clearable text />
        </el-form>
      </ysn-flod>
      <!-- 预算汇总 -->
      <ysn-flod id="预算汇总" title="预算汇总" :show-flod="false">
        <div class="tables">
          <table>
            <tr v-for="(item,i) in tablelist" :key="i">
              <td>{{ item.v1 }}</td>
              <td>{{ item.v2 }}</td>
              <td>{{ item.v3 }}</td>
              <td>{{ item.v4 }}</td>
              <td>{{ item.v5 }}</td>
              <td>{{ item.v6 }}</td>
              <td>{{ item.v7 }}</td>
              <td>{{ item.v8 }}</td>
            </tr>
          </table>
        </div>
      </ysn-flod>
      <!-- 预算明细 -->
      <ysn-flod id="预算明细" title="预算明细" :show-flod="false">
        <ysn-table :data="tableData1" :column="tableConfig1" select-key="id" :checkbox="false">
          <template #name="scope">
            <div @click="handleClick(scope )">
              <ysn-btn type="text">详情</ysn-btn>
            </div>
          </template>
        </ysn-table>
      </ysn-flod>
      <ysn-flod id="审批信息" title="审批信息" :show-flod="false">
        <div class="int">
          <span v-for="(item,i) in inputlist" :key="i">
            <el-input :class=" i===2 ? 'back':''" :placeholder="item.v1" disabled />
            <span><i v-if="i==inputlist.length-1 ? false:true" class="el-icon-arrow-right" /></span>
          </span>
        </div>
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
      </ysn-flod>
    </div>
  </div>
</template>
<script>
import {
  tablelist,
  tableData1,
  inputlist,
  configData1,
  formData,
  formData1
} from './data'
import {
  tableConfig1,
  rulesForm,
  configData
} from './config'
export default {
  name: 'Approvaldetails',
  components: {},
  data() {
    return {
      show: false,
      packUp: false,
      tablelist,
      configData1,
      formData,
      configData,
      formData1,
      rulesForm,
      tableConfig1,
      tableData1,
      inputlist
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    submit() {
      this.$refs.ruleForm.validate((valid, failedObj) => {
        console.log(failedObj)
        console.log(valid)
        if (valid) {
          // 在这里添加提交代码
        } else {
          // 光标定位在以一个校验不通过项
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "./index"
</style>
