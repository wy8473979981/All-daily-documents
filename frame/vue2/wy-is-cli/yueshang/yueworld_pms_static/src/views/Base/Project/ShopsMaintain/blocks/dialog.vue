<template>
  <div>
    <ysn-dialog
      external
      :title="
        dialogType === 'add'
          ? '新增'
          : dialogType === 'change'
          ? '面积变更'
          : '编辑'
      "
      width="920px"
      :is-show-dialog.sync="visible"
      @closeDialog="handleVisibleClose"
    >
      <template #contain>
        <el-form ref="ruleForm" :model="form" label-position="top">
          <ysn-formItem :form="form" :config="configData" :column="4" />
          <!-- 面积变更新套内面积和新建筑面积 -->
          <ysn-formItem
            v-if="dialogType === 'change'"
            :form="form"
            :config="configDataNew"
            :column="4"
          />
          <!-- 业态信息 -->
          <ysn-flod title="业态信息" :show-flod="false" />
          <ysn-formItem :form="form" :config="configDataBusiness" :column="4" />
          <!-- 业主信息 -->
          <ysn-flod title="业主信息" :show-flod="false" />
          <ysn-formItem :form="form" :config="configDataOwner" :column="4" />
          <template v-if="dialogType === 'edit'">
            <ysn-flod title="状态日志" :show-flod="false" />
            <ysn-table
              :data="form.tableDataLogs"
              :column="tableConfig"
              :checkbox="false"
              :summary-col="2"
            />
            <ysn-flod title="一铺一价信息" :show-flod="false" />
            <ysn-table
              :data="form.tableData"
              :column="tableConfigPrice"
              :checkbox="false"
              :show-slots="['feeName1', 'feeName2']"
              :summary-col="2"
            >
              <template #feeName1="scope">
                <div v-html="scope.row.feeName1" />
              </template>
              <template #feeName2="scope">
                <div v-html="scope.row.feeName2" />
              </template>
            </ysn-table>
          </template>
        </el-form>
      </template>
      <template #btn>
        <template v-if="dialogType === 'edit'">
          <ysn-btn @click="saveClick(2)">提交修改</ysn-btn>
          <ysn-confirm
            title="提示"
            width="484px"
            top="120px"
            content="失效后，无法再被新建的招商页面所引用!"
            confirmText="确认失效"
            cancelText="暂不失效"
            @confirm="deleteSelect"
          >
            <ysn-btn type="delete" class="ml-12 mr-12">失效</ysn-btn>
          </ysn-confirm>
        </template>
        <template v-if="dialogType === 'add'">
          <ysn-btn @click="saveClick(1)">保存</ysn-btn>
        </template>
        <template v-if="dialogType === 'change'">
          <ysn-btn @click="reviewClick(1)">提交审核</ysn-btn>
          <ysn-btn class="ml-12 mr-12" @click="reviewClick(2)"
            >发起审核</ysn-btn
          >
          <ysn-btn type="info" @click="saveClick(2)">保存</ysn-btn>
        </template>
      </template>
    </ysn-dialog>
  </div>
</template>
<script>
import PUBFN from '@/utils/pubFn'
import { baseProjectApi } from '@/api'
import {
  configData,
  configDataBusiness,
  configDataNew,
  configDataOwner,
  tableData,
  tableConfig,
  tableConfigPrice,
} from './dialogConfig.js'
export default {
  name: 'BlDialog',
  props: {
    dialogType: {
      type: String,
      default: 'add', // add=新增，edit=编辑, change=变更
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
      configDataBusiness: configDataBusiness.call(this),
      configDataNew: configDataNew.call(this),
      configDataOwner: configDataOwner.call(this),
      form: {
        spaceFormatNamePlan: '一级菜单',
        leasableArea: null,
        spaceGrossArea: null,
        spaceNetArea: null,
        areaType: null,
      },
      tableConfig: tableConfig.call(this),
      tableData: tableData.call(this),
      tableConfigPrice: tableConfigPrice.call(this),
    }
  },
  watch: {
    dialogNum() {
      if (this.dialogType !== 'add') {
        this.form = this.formData
      }
      this.computedConfigData(this.dialogType)
      this.visible = true
    },
    'form.areaType'(val) {
      if (val === 1) {
        //建筑面积
        this.form.leasableArea = this.form.spaceGrossArea
      }
      if (val === 2) {
        //套内面积
        this.form.leasableArea = this.form.spaceNetArea
      }
    },
    'form.spaceGrossArea'(val) {
      if (this.form.areaType === 1) {
        console.log(this.form, '建筑面积：', val)
        this.form.leasableArea = val
      }
    },
    'form.spaceNetArea'(val) {
      console.log(this.form.areaType, '套内面积:', val)
      if (this.form.areaType === 2) {
        this.form.leasableArea = val
      }
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
    saveClick(type) {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 新增
          baseProjectApi
            .shopsMaintenanceHandler({
              type,
              form: this.form,
            })
            .then((res) => {
              this.$message.success(type === 1 ? '新增成功' : '修改成功')
              this.handleVisibleClose()
              if (this.dialogType === 'change') {
                //面积变更
                window.open('/#/Base/Project/ShopsModifyMaintain')
              }
              this.$emit('handlerUpdateList') // 更新列表
            })
        }
      })
    },
    reviewClick(type) {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 新增
          baseProjectApi
            .shopsMaintenanceReview({
              type: type,
              form: this.form,
            })
            .then((res) => {
              this.$message.success('审核提交成功')
              this.handleVisibleClose()
              if (this.dialogType === 'change') {
                //面积变更
                window.open('/#/Base/Project/ShopsModifyMaintain')
              }
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
        .shopsMaintenanceEffect({ id: this.form.spaceId })
        .then((res) => {
          this.handleVisibleClose()
          // 2秒提示语
          this.$message({
            message: '失效成功',
            type: 'success',
            duration: 2000,
          })
          this.$emit('handlerUpdateList') // 更新列表
        })
    },

    /**
     * @desc:计算新增、编辑以及面积变更配置的状态
     */
    computedConfigData(type) {
      if (type === 'add') {
        //新增
        this.setItemTypeStatus()
        this.configData[9].disabled = true // 计租面积
        this.configData[10].disabled = false // 建筑面积
        this.configData[11].disabled = false // 套内面积
        this.configData[12].disabled = true // 商铺状态
        this.configData[3].disabled = true // 商铺编码
        this.configDataBusiness[0].disabled = true // 规划业务
        this.configDataBusiness[1].disabled = false // 签约业务
        this.form.spaceFormatNamePlan = '一级菜单'
      } else if (type === 'edit') {
        //编辑
        this.setItemTypeStatus()
        this.configData[9].disabled = true // 计租面积
        this.configData[10].disabled = true // 建筑面积
        this.configData[11].disabled = true // 套内面积
        this.configData[12].disabled = true // 套内面积
        this.configData[3].disabled = true // 商铺编码
        this.configDataBusiness[0].disabled = false // 规划业务
        this.configDataBusiness[1].disabled = true // 签约业务
      } else if (type === 'change') {
        //面积变更
        this.setItemTypeStatus(true)
      }
    },
    // 批量设置状态
    setItemTypeStatus(status = false) {
      this.configData.forEach((el) => {
        el.disabled = status
      })
      this.configDataBusiness.forEach((el) => {
        el.disabled = status
      })
      this.configDataOwner.forEach((el) => {
        el.disabled = status
      })
    },
  },
}
</script>
