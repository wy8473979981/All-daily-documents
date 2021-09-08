<template>
  <div>
    <ysn-dialog
      external
      :title="dialogType==='edit'?'编辑':'新增'"
      width="920px"
      :is-show-dialog.sync="visible"
      @closeDialog="handleVisibleClose"
    >
      <template #contain>
        <el-form ref="ruleForm" :model="form" label-position="top">
          <ysn-formItem :form="form" :config="configData" :column="4" />
        </el-form>
      </template>
      <template #btn>
        <ysn-btn class="mr-12" @click="saveClick">保存</ysn-btn>
        <ysn-btn type="info" class="mr-12" @click="handleVisibleClose">取消</ysn-btn>
        <ysn-confirm
          title="提示"
          width="484px"
          top="120px"
          :content="`确认删除此条数据?`"
          tip="此操作将永久删除,不可撤回,请谨慎操作"
          @confirm="delClick"
        >
          <ysn-btn
            v-if="dialogType==='edit'"
            class="ml-8"
            type="delete"
          >删除</ysn-btn>
        </ysn-confirm>
      </template>
    </ysn-dialog>
  </div>
</template>
<script>
import PUBFN from '@/utils/pubFn'
import { baseProjectApi } from '@/api'
import { configData } from './dialogConfig.js'
export default {
  name: 'BlDialog',
  props: {
    dialogNum: {
      type: Number,
      default: 0
    },
    formData: {
      type: Object,
      default: () => {}
    },
    // 弹窗类型
    dialogType: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      // 请求后的数据
      reqData: {},
      visible: false,
      // confirmVisiable: false,
      // dialog 参数
      configData: configData.call(this),
      form: {
        programName: '',
        buildingName: '',
        floorName: '',
        diverseName: '',
        diverseId: '',
        diverseType: '',
        leasableArea: '',
        diverseIsOpenAir: '',
        diverseStatus: 1,
        effectiveDate: '',
        remark: ''
      }
    }
  },
  watch: {
    dialogNum() {
      this.form = {
        ...this.form,
        ...this.formData
      }

      this.visible = true
    }
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
      this.$emit('handleClose')
    },
    /**
     * @method:saveClick
     * @desc:保存事件
     */
    saveClick() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 新增
          baseProjectApi
            .configCodeEdit({
              form: this.form
            })
            .then((res) => {
              this.$message.success(this.dialogType === 'add' ? '新增成功' : '修改成功')
              this.handleVisibleClose()
              this.$emit('handlerUpdateList') // 更新列表
            })
        }
      })
    },
    /**
     * @method:delectClick
     * @desc:删除事件
     */
    delClick() {
      baseProjectApi
        .configCodeDel({ codeObject: this.form.codeObject })
        .then((res) => {
          this.handleVisibleClose()
          // 2秒提示语
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.$emit('handlerUpdateList') // 更新列表
        })
    }
  }
}
</script>
