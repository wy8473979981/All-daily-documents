<template>
  <div>
    <ysn-dialog
      external
      :title="dialogType === 'add' ? '新增' : '编辑'"
      width="920px"
      :is-show-dialog.sync="visible"
      @closeDialog="handleVisibleClose"
    >
      <template #contain>
        <el-form ref="ruleForm" :model="form" label-position="top">
          <ysn-formItem :form="form" :config="configDataTop" :column="4" />
          <ysn-formItem :form="form" :config="configData" :column="4" />
          <ysn-flod title="合同甲方信息" :show-flod="false" />
          <ysn-tabs
            :list="configDataList"
            :active="tabsActive"
            dynamic
            @change="handleChange"
            @toggle="handleToggle"
          />
          <ysn-formItem
            class="mt-12"
            :form="form"
            :config="configDataList[tabsActive].formTableConfig"
            :column="4"
          />
          <ysn-flod title="银行账户信息" :show-flod="false" />
          <ysn-formTable
            ref="formTable"
            v-model="formTableData"
            prop="tableData1"
            :column="formTableConfig"
            :rules="formTableRules"
            add
          />
        </el-form>
      </template>
      <template #btn>
        <ysn-btn @click="saveClick">保存</ysn-btn>
        <ysn-confirm
          title="提示"
          width="484px"
          top="120px"
          content="确认删除该条内容？"
          @confirm="deleteSelect"
        >
          <ysn-btn
            v-if="dialogType === 'edit'"
            type="text"
            class="ml-12 mr-12"
          >删除</ysn-btn>
        </ysn-confirm>
      </template>
    </ysn-dialog>
  </div>
</template>
<script>
import PUBFN from '@/utils/pubFn'
import {
  configDataTop,
  configData,
  configDataTextarea,
  configDataFile,
  configDataList,
  formTableConfig
} from './dialogConfig.js'
export default {
  name: 'BlDialog',
  props: {
    dialogType: {
      type: String,
      default: 'add' // add=新增，edit=编辑
    },
    dialogNum: {
      type: Number,
      default: 0
    },
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 请求后的数据
      reqData: {},
      visible: false,
      confirmVisiable: false,
      // form配置参数
      configDataTop: configDataTop.call(this),
      configData: configData.call(this),
      configDataList: configDataList.call(this),
      formTableConfig,
      form: {},
      tabsActive: 0,
      formTableData: {
        tableData1: []
      },
      formTableRules: {
        name: [{ required: true, message: '' }]
      }
    }
  },
  watch: {
    dialogNum() {
      if (this.dialogType === 'edit') {
        // 附件
        if (!Array.isArray(this.formData.attachment)) {
          this.formData.attachment = []
        }
        // 项目简图
        if (!Array.isArray(this.formData.programPic)) {
          this.formData.programPic = []
        }
        this.form = this.formData
      }
      this.visible = true
    }
  },
  mounted() {
    console.log(
      this.configDataList[this.tabsActive].formTableConfig,
      this.configDataList,
      'configDataList'
    )
  },
  methods: {
    /**
     * @method:handleVisibleClose
     * @desc:dialog 关闭方法
     */
    handleVisibleClose() {
      // 初始化数据
      this.form = {}
      this.visible = false
    },

    /**
     * @method:saveClick
     * @desc:保存事件
     */
    saveClick() {
      this.$refs['ruleForm'].validate((valid) => {
        console.log(valid)
      })
      console.log(this.formData, 'from')
    },
    /**
     * @method:delectClick
     * @desc:删除事件
     */
    deleteSelect() {
      this.handleVisibleClose()
      // 2秒提示语
      this.$message({
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.$emit('handlerUpdateList') // 更新列表
    },

    /**
     * @method:handleChange
     * @desc:合同甲方信息的tabs切换
     */
    handleChange(val) {
      console.log(val)
    },

    /**
     * @method:handleToggle
     * @desc: 合同甲方信息的加减按钮
     */
    handleToggle(val) {
      if (val === 'plus') {
        // let formTableConfig = JSON.parse(JSON.stringify(formTableConfig))
        // 表示新增
        this.configDataList.push({
          label: '合同甲方二',
          name: `n${this.tabsActive}`,
          formTableConfig: [...this.formTableConfig]
        })
      }
    }
  }
}
</script>
