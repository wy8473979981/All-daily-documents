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
          <ysn-formItem :form="form" :config="configData" :column="4" />
        </el-form>
      </template>
      <template #btn>
        <ysn-btn @click="saveClick">{{
          dialogType === 'edit' ? '提交修改' : '保存'
        }}</ysn-btn>
        <!-- <ysn-confirm
          title="提示"
          width="484px"
          top="120px"
          content="确认删除该条内容？"
          @confirm="deleteSelect"
        > -->
        <ysn-btn
          v-if="dialogType === 'edit'"
          type="delete"
          class="ml-12 mr-12"
          @click="deleteSelect"
          >删除</ysn-btn
        >
        <!-- </ysn-confirm> -->
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
      if (this.dialogType === 'edit') {
        this.form = this.formData
      } else {
        this.getBuildCode()
      }
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
            .buildMaintenanceHandler({
              type: this.dialogType === 'add' ? 1 : 2,
              form: this.form,
            })
            .then((res) => {
              if (res.status === 'error') {
                this.$message.error('楼栋名称已存在，请修改')
              } else {
                this.$message.success(
                  this.dialogType === 'add' ? '新增成功' : '修改成功'
                )
                this.handleVisibleClose()
                this.$emit('handlerUpdateList') // 更新列表
              }
            })
        }
      })
    },
    /**
     * @desc:获取楼栋编码
     */

    getBuildCode() {
      baseProjectApi.buildMaintenanceBuildCode().then((res) => {
        this.form.buildingId = res.code
      })
    },
    /**
     * @method:delectClick
     * @desc:删除事件
     */
    deleteSelect() {
      baseProjectApi
        .buildMaintenanceDel({ buildingId: this.form.buildingId })
        .then((res) => {
          if (res.status === 'error') {
            this.$message.error('当前楼栋存在关联楼层，不可删除')
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
