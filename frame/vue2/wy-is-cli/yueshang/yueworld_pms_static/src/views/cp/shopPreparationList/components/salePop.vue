<!--
 * @Descripttion:
 * @Author: zhb
 * @Date: 2021-05-20 11:25:24
 * @LastEditors: zhb
-->

<template>
  <div>
    <ysn-dialog title="编辑铺位预算" external :is-show-dialog="visible" :is-cancel="false" :is-determine="false">
      <!-- 弹窗表格-->
      <template #contain>
        <div class="dialog-box">
          <!-- 基础信息 -->
          <ysn-flod id="基础信息" title="基础信息" :show-flod="false">
            <ysn-table
              :data="tableData"
              :column="tableConfig"
              :show-slots="['obSub','name']"
              select-key="id"
              :checkbox="true"
            />
          </ysn-flod>
          <!-- 已有合同信息 -->
          <ysn-flod id="已有合同信息" title="已有合同信息" :show-flod="false">
            <ysn-table
              :data="tableData1"
              :column="tableConfig1"
              :show-slots="['obSub','name']"
              select-key="id"
              :checkbox="true"
            />
          </ysn-flod>
          <!-- 已有合同信息 -->
          <ysn-flod id="已有合同信息" title="已有合同信息" :show-flod="false">
            <div class="wrapper">
              <div class="left">
                <span>是否调铺</span>
                <el-radio v-model="radio" label="1">是</el-radio>
                <el-radio v-model="radio" label="2">否</el-radio>
              </div>
              <div class="right">
                <span>调铺生效日期</span>
                <div class="date">
                  <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
                  <span><i class="el-icon-warning-outline" style="margin-right:5px" />调铺生效日早于已有合同的结束日期， 生效日当天会将该铺位已有合同惊醒节约</span>
                </div>

              </div>
            </div>
          </ysn-flod>
          <!--新签合同  -->
          <ysn-flod id="新签合同" title="新签合同" :show-flod="false">
            <div v-for="(item,i) in num " :key="i">
              <div class="top-box">
                <div class="btn">
                  <ysn-btn style="margin-right:30px" type="reset">新签合同A</ysn-btn>
                  <ysn-btn type="delete" @click="reduce(i)">删除</ysn-btn>
                </div>
                <ysn-btn @click.stop="add">添加新签合同</ysn-btn>
              </div>
              <div class="news">
                <el-form ref="ruleForm" :model="item.name" :rules="rulesForm1" label-position="top">
                  <ysn-formItem :form="item.name" :config="configData1" :column="2" clearable />
                </el-form>
              </div>
            </div>
          </ysn-flod>
        </div>
        <!-- 底部按钮 -->
        <div class="btn-group">
          <ysn-btn @click="dialogfalse">确认</ysn-btn>
          <ysn-btn style="margin-left:8px" type="info" @click="dialogfalse">取消</ysn-btn>
        </div>
      </template>
    </ysn-dialog>

  </div>
</template>

<script>
const formData1 = {
  t1: '',
  t2: '2021-01-01',
  t3: '海底捞',
  t4: '启用',
  t5: '月付',
  t6: '8000',
  t7: '月付',
  t8: '含税',
  t9: '8000',
  t10: '12%',
  t11: '月付',
  t12: '80',
  t13: ''
} // 新签合同表单数据
import { tableData, tableData1, tableConfig, tableConfig1 } from './data'
import {
  configData1,
  rulesForm1
} from './config'
export default {
  name: 'Pop1',
  components: {},
  props: {},
  data() {
    return {
      num: [{
        name: formData1
      }
        // 'formData2',
        // 'formData3',
        // 'formData4',
        // 'formData5'
      ],
      configData1, // 新签合同表单配置
      radio: '1',
      visible: false, // 显示弹框
      rulesForm1, // 新签合同表单验证
      value1: '', // 时间
      tableData, // 基础信息表格数据
      tableData1, // 已有合同信息表格数据
      tableConfig, // 基础信息表格配置
      tableConfig1 // 已有合同信息表格配置

    }
  },
  methods: {
    add() {
      this.num.push({ name:
      { t1: '',
        t2: '',
        t3: '',
        t4: '',
        t5: '',
        t6: '',
        t7: '',
        t8: '',
        t9: '',
        t10: '',
        t11: '',
        t12: '',
        t13: '' }
      })
      this.$forceUpdate()
      console.log(this.num, 1)
    }, // 新增合同
    reduce(val) {
      if (val !== 0) { this.num.splice(val, 1) }
    }, // 删除合同
    dialogfalse() {
      this.visible = false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./salePop"
</style>
