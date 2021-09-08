<template>
  <div>
    <ysn-dialog
      external
      title="编辑"
      width="920px"
      :is-show-dialog.sync="visible"
      @closeDialog="handleVisibleClose"
    >
      <template #contain>
        <el-form ref="ruleForm" :model="form" label-position="top">
          <ysn-formItem :form="form" :config="configData" :column="4" />
          <!-- 业主信息 -->
          <ysn-flod title="业主信息" :show-flod="false" />
          <ysn-formItem :form="form" :config="configDataOwner" :column="4" />
        </el-form>
      </template>
      <template #btn>
        <template v-if="dialogType === 'edit'">
          <ysn-btn @click="reviewClick(1)">提交审核</ysn-btn>
          <ysn-btn class="ml-12 mr-12" @click="reviewClick(2)"
            >发起审核</ysn-btn
          >
          <ysn-btn type="info" @click="saveClick()">保存</ysn-btn>
          <ysn-btn type="delete" class="ml-12 mr-12" @click="delClick"
            >删除</ysn-btn
          >
        </template>

        <template v-else>
          <ysn-btn @click="reviewRecord">审核记录</ysn-btn>
        </template>
      </template>
    </ysn-dialog>
  </div>
</template>
<script>
import PUBFN from '@/utils/pubFn'
import { baseOfficesApi } from '@/api'
import { configData, configDataOwner } from './dialogConfig.js'
export default {
  name: 'BlDialog',
  props: {
    dialogNum: {
      type: Number,
      default: 0,
    },
    dialogType: {
      type: String,
      default: 'edit', // edit=编辑, detail=详情
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
      // confirmVisiable: false,
      // dialog 参数
      configData: configData.call(this),
      configDataOwner: configDataOwner.call(this),
      form: {},
    }
  },
  watch: {
    dialogNum() {
      let length = this.configData.length
      if (this.dialogType === 'detail') {
        this.configData[length - 1].disabled = true
        this.configData[length - 2].disabled = true
      } else {
        this.configData[length - 1].disabled = false
        this.configData[length - 2].disabled = false
      }
      this.form = this.formData
      this.visible = true
    },
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
          baseOfficesApi
            .officeUnitMaintenanceHandler({
              form: this.form,
            })
            .then((res) => {
              this.$message.success('修改成功')
              this.handleVisibleClose()
              this.$emit('handlerUpdateList') // 更新列表
            })
        }
      })
    },
    reviewClick(type) {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 新增
          baseOfficesApi
            .officeUnitModifyMaintenanceReview({
              type: type,
              id: this.form.spaceId,
            })
            .then((res) => {
              this.$message.success('审核提交成功')
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
      baseOfficesApi
        .officeUnitModifyMaintenanceDel({ id: [this.form.spaceId] })
        .then((res) => {
          this.handleVisibleClose()
          // 2秒提示语
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 2000,
          })
          this.$emit('handlerUpdateList') // 更新列表
        })
    },
    reviewRecord() {
      window.open('/#/Examine/OfficeUnitModifyExamine?id=2')
    },
  },
}
</script>
