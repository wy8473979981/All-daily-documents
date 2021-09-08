<template>
  <div>
    <ysn-dialog
      external
      :title="dialogType === 'add' ? '新增' : '编辑'"
      width="476px"
      :is-show-dialog.sync="visible"
      @closeDialog="handleVisibleClose"
    >
      <template #contain>
        <el-form ref="ruleForm" :model="form" label-position="top">
          <ysn-formItem :form="form" :config="configData" :column="2" />
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
            type="delete"
            class="ml-12 mr-12"
            >删除</ysn-btn
          >
        </ysn-confirm>
      </template>
    </ysn-dialog>
  </div>
</template>
<script>
import { baseProjectApi } from '@/api'
import PUBFN from '@/utils/pubFn'
export default {
  name: 'BlDialog',
  props: {
    dialogType: {
      type: String,
      default: 'add', // add=新增，edit=编辑
    },
    dialogNum: {
      type: Number,
      default: 0,
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      // 请求后的数据
      reqData: {},
      visible: false,
      confirmVisiable: false,
      // dialog 参数
      configData: [
        // 表单配置
        {
          itemType: 'input',
          prop: 'regionId',
          label: '区域编码',
          placeholder: '区域编码',
          width: '206px',
          disabled: true,
        },
        {
          itemType: 'input',
          prop: 'thirdNo',
          label: '三方编码',
          placeholder: '请输入',
          width: '206px',
        },
        {
          itemType: 'input',
          prop: 'regionName',
          label: '名称',
          placeholder: '请输入',
          width: '206px',
          required: true,
        },
        {
          itemType: 'select',
          prop: 'regionStatusName',
          label: '状态',
          list: PUBFN.getOptionsList('auditStatussec'),
          width: '206px',
          required: true,
        },
      ],
      form: {
        regionId: null,
        thirdNo: null,
        regionName: null,
        regionStatus: null,
      },
    }
  },
  watch: {
    dialogNum() {
      if (this.dialogType === 'edit') {
        this.form = this.formData
        this.form.regionStatus = this.formData.regionStatus * 1
      } else {
        this.getAreaCode()
      }
      this.visible = true
    },
  },
  methods: {
    /**
     * @method:
     * @param {*}
     * @return {*}
     * @desc:
     */

    getVisiableState() {
      return this.dialogVisible
    },
    /**
     * @method:handleVisibleClose
     * @desc:dialog 关闭方法
     */

    handleVisibleClose() {
      // 初始化数据
      this.form = {
        regionId: null,
        thirdNo: null,
        regionName: null,
        regionStatus: null,
      }
      this.visible = false
    },
    /**
     * @method:saveClick
     * @desc:保存事件
     */
    saveClick() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.dialogType === 'edit') {
            baseProjectApi.areaMaintenanceEdit(this.form).then((res) => {
              this.$message.success('编辑成功')
              this.handleVisibleClose()
              this.$emit('handlerUpdateList') // 更新列表
            })
          } else {
            baseProjectApi.areaMaintenanceAdd(this.form).then((res) => {
              this.$message.success('新增成功')
              this.handleVisibleClose()
              this.$emit('handlerUpdateList') // 更新列表
            })
          }
        }
      })
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
        duration: 2000,
      })
      this.$emit('handlerUpdateList') // 更新列表
    },
    getAreaCode() {
      baseProjectApi.areaMaintenanceAreaCode().then((res) => {
        this.form.regionId = Math.abs(res.areaCode).toString()
      })
    },
  },
}
</script>
