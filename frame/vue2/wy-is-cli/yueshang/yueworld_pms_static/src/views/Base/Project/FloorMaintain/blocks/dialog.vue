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
        </el-form>
      </template>
      <template #btn>
        <ysn-btn @click="saveClick">提交修改</ysn-btn>
        <ysn-btn type="delete" class="ml-12 mr-12" @click="deleteSelect"
          >删除</ysn-btn
        >
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
      // confirmVisiable: false,
      // dialog 参数
      configData: configData.call(this),
      form: {
        buildingPic: [],
        buildingId: null, // 楼栋编码
      },
    }
  },
  watch: {
    dialogNum() {
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
      this.form = {
        buildingPic: [],
        buildingId: null,
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
          // 新增
          baseProjectApi
            .floorMaintenanceEdit({
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
    /**
     * @method:delectClick
     * @desc:删除事件
     */
    deleteSelect() {
      baseProjectApi
        .floorMaintenanceDel({ floorId: this.form.floorId })
        .then((res) => {
          if (res.status === 'error') {
            this.$message.error('当前楼层存在关联商铺，不可删除')
          } else {
            this.handleVisibleClose()
            // 2秒提示语
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 2000,
            })
            this.$emit('handlerUpdateList') // 更新列表
          }
        })
    },
  },
}
</script>
