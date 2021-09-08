<!--
 * @Descripttion:
 * @Author: zhb
 * @Date: 2021-05-19 10:06:10
 * @LastEditors: zhb
-->
<template>
  <div>
    <ysn-dialog title="拆铺">
      <div class="dialog-box">
        <div class="success-dialog3">
          <div v-for="(item,i) in num" :key="i" class="shop-list">
            <p class="shop-name">新铺{{ item }}</p>
            <p class="title">基础信息</p>
            <div class="fromlist">
              <el-form ref="ruleForm" :model="formData" :rules="rulesForm" label-position="top">
                <ysn-formItem :form="formData" :config="configData" :column="2" clearable />
              </el-form>
            </div>

            <p class="title">新签合同</p>
            <div class="top-box">
              <button class="btn1" @click="reduce"> <span>新签合同A</span>删除</button>
              <ysn-btn @click="add">添加新签合同</ysn-btn>
            </div>
            <div class="news">
              <el-form ref="ruleForm" :model="formData1" :rules="rulesForm1" label-position="top">
                <ysn-formItem :form="formData1" :config="configData1" :column="2" clearable />
              </el-form>
            </div>
          </div>
          <div class="btn-group">
            <div>
              <ysn-btn @click="dialogVisible3 = false">确认</ysn-btn>
              <ysn-btn style="margin-left:8px" type="info" @click="dialogVisible3 = false">取消</ysn-btn>
            </div>
          </div>
        </div>
      </div>
    </ysn-dialog>
  </div>
</template>

<script>
import {
  configData,
  formData,
  configData1,
  formData1,
  rulesForm,
  rulesForm1
} from './config'
import {
  countOptions,
  projectOptions
} from './data.js'
export default {
  name: 'TakeApartShopPop',
  components: {},
  props: {},
  data() {
    return {
      configData,
      num: 1,
      formData,
      formData1,
      configData1,
      rulesForm,
      rulesForm1,
      dialogVisible3: true,
      countOptions: countOptions,
      projectOptions: projectOptions
    }
  },
  methods: {
    add() {
      this.num += 1
    },
    reduce() {
      if (this.num > 1) {
        this.num -= 1
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./index"
</style>
