
<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-28 13:55:17
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-06-29 13:54:12
-->
<template>
  <div>
    <ysn-dialog title="编辑" width="920px" :out-close="outClose">
      <div class="color-0c66ff cursor-pointer" @click="changeArea">面积变更</div>
      <template #contain>
        <div>
          <el-form ref="rule" :model="formData.shopsDara" label-position="top" size="small" :rules="rules">
            <ysn-formItem
              :form="formData.shopsDara"
              :config="configshopsData"
              :column="4"
              clearable
            >
              <template #statistics>
                <div style="width:206px;background:#FDFCFA;border-radius: 16px;" class="pl-12">
                  <el-checkbox v-model="formData.shopsDara.vacancyRatio">出租率</el-checkbox>
                  <el-checkbox v-model="formData.shopsDara.openingRatio">开业率</el-checkbox>
                </div>
              </template>
            </ysn-formItem>
          </el-form>
          <ysn-title title="业态信息" />
          <el-form :model="formData.formatData" label-position="top" size="small">
            <ysn-formItem
              :form="formData.formatData"
              :config="configFormatData"
              :column="4"
              clearable
            />
          </el-form>
          <ysn-title title="业主信息" />
          <el-form :model="formData.ownerData" label-position="top" size="small">
            <ysn-formItem
              :form="formData.ownerData"
              :config="configownerData"
              :column="4"
              clearable
            />
          </el-form>
        </div>
      </template>
      <!-- 按钮 -->
      <template #btn>
        <div class="flex-ju-end mt-40">
          <ysn-btn type="primary" class="mr-8" @click="validate">提交审批</ysn-btn>
          <ysn-btn type="primary" class="mr-8" @click="validate">发起审核</ysn-btn>
          <ysn-btn type="info" class="mr-16" @click="validate">保存</ysn-btn>
          <ysn-btn type="delete" @click="validate">删除</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
import { basicApi } from '@/api'
export default {
  name: 'AddDialog',
  props: {
    outClose: { type: Boolean },
    row: { type: Object, default: () => {} }
  },
  data() {
    return {
      rules: {
        spaceGrossAreaNew: [{ required: true, message: '' }],
        spaceNetAreaNew: [{ required: true, message: '' }]

      },
      formData: {
        shopsDara: {},
        formatData: {},
        ownerData: {}
      },
      configshopsData: [ // 商铺信息
        { itemType: 'select', prop: 'programName', label: '所属项目', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [], disabled: true },
        { itemType: 'select', prop: 'buildingName', label: '所属楼栋', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [], disabled: true },
        { itemType: 'select', prop: 'floorName', label: '所属楼层', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [], disabled: true },
        { itemType: 'input', placeholder: '请输入', prop: 'spaceId', label: '商铺编码', disabled: true },
        { itemType: 'input', placeholder: '请输入', prop: 'spaceName', label: '铺位号', disabled: true },
        { itemType: 'select', prop: 'spaceType', label: '商业类型', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [], disabled: true },
        { itemType: 'select', prop: 'spaceEquityNature', label: '产权性质', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [], disabled: true },
        { itemType: 'select', prop: 'spaceLocation', label: '商铺属性', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [], disabled: true },
        { itemType: 'select', prop: 'areaType', label: '计租方式', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [], disabled: true },
        { itemType: 'input', placeholder: '请输入', prop: 'leasableArea', label: '计租面积(m²)', disabled: true },
        { itemType: 'input', placeholder: '请输入', prop: 'spaceGrossArea', label: '建筑面积(m²)', disabled: true },
        { itemType: 'input', placeholder: '请输入', prop: 'spaceNetArea', label: '套内面积(m²)', disabled: true },
        { itemType: 'input', placeholder: '请输入', prop: 'spaceStatus', label: '商铺状态(m²)', disabled: true },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'effectiveDate', label: '生效起止日期', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'input', placeholder: '请输入', prop: 'statistics', label: '计入统计', disabled: true, span: 2, width: '200px', hasSlot: true },
        { itemType: 'input', type: 'textarea', prop: 'remark', label: '备注', placeholder: '请输入', width: '428px', span: 4, disabled: true },
        { itemType: 'input', prop: 'spaceGrossAreaNew', label: '新建筑面积(m²)', placeholder: '请输入' },
        { itemType: 'input', prop: 'spaceNetAreaNew', label: '新套内面积(m²)', placeholder: '请输入' }
      ],
      configFormatData: [ // 业态信息

        { itemType: 'select', prop: 'spaceFormatNamePlan', label: '规划业务', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [], disabled: true },
        { itemType: 'input', placeholder: '请输入', prop: 'brandFormatName', label: '签约业务', disabled: true }

      ],
      configownerData: [ // 业主信息
        { itemType: 'input', placeholder: '请输入', prop: 'ownerName', label: '业主名称', disabled: true },
        { itemType: 'input', placeholder: '请输入', prop: 'ownerContactsName', label: '业主联系人', disabled: true },
        { itemType: 'input', placeholder: '请输入', prop: 'ownerContactsTel', label: '业主电话', disabled: true }
      ]
    }
  },

  mounted() {
    // basicApi.shopMaintenanceEdit().then(res => {
    //   console.log(this.tableList)
    //   this.formData = res
    // })
  },
  methods: {
    changeArea() {
      // console.log(this.row)
      basicApi.shopMaintenanceEdit().then(res => {
        console.log(this.tableList)
        this.formData = res
      })
    },
    validate() {
      this.verification(this.$refs).then(res => {
        this.$emit('close')
      })
    }
  }
}
</script>
