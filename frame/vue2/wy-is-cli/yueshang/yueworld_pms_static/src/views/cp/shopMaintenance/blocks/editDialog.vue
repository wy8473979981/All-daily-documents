<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-28 15:55:59
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-06-29 15:01:23
-->
<template>
  <div>
    <ysn-dialog
      title="编辑"
      width="920px"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @closeDialog="closeDialog"
    >
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
                <!-- {{ $event.target }} -->
                <!-- <div>{{ formData.shopsDara.vacancyRatio }}</div>
                <div>{{ formData.shopsDara.openingRatio }}</div> -->
                <div style="width:206px;background:#FDFCFA;border-radius: 16px;" class="pl-12">
                  <el-checkbox v-model="formData.shopsDara.vacancyRatio">出租率</el-checkbox>
                  <el-checkbox v-model="formData.shopsDara.openingRatio">开业率</el-checkbox>
                </div>
              </template>
            </ysn-formItem>
          </el-form>
          <ysn-title title="业态信息" />
          <el-form ref="rule" :model="formData.formatData" label-position="top" size="small" :rules="rule">
            <ysn-formItem
              :form="formData.formatData"
              :config="configFormatData"
              :column="4"
              clearable
            />
          </el-form>
          <ysn-title title="业主信息" />
          <el-form ref="rule" :model="formData.ownerData" label-position="top" size="small">
            <ysn-formItem
              :form="formData.ownerData"
              :config="configownerData"
              :column="4"
              clearable
            />
          </el-form>
          <ysn-title title="状态日志" />
          <ysn-table
            :data="tableData"
            :column="tableConfig"
            select-key="id"
            :checkbox="false"
          />
          <ysn-title title="一铺一价信息" />
          <ysn-table
            :data="tableData"
            :column="tableShopConfig"
            select-key="id"
            :checkbox="false"
          />
        </div>
      </template>
      <!-- 按钮 -->
      <template #btn>
        <div class="flex-ju-end mt-40">
          <ysn-btn type="primary" class="mr-16" @click="validate">提交修改</ysn-btn>
          <ysn-btn type="delete" @click="remove">删除</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddDialog',
  props: {
    outClose: { type: Boolean },
    isShowDialog: { type: Boolean },
    formData: { type: Object, default: () => {} }
  },
  data() {
    return {
      rules: {
        programName: [{ required: true, message: '' }],
        buildingName: [{ required: true, message: '' }],
        floorName: [{ required: true, message: '' }],
        spaceName: [{ required: true, message: '' }],
        spaceType: [{ required: true, message: '' }],
        spaceEquityNature: [{ required: true, message: '' }],
        spaceLocation: [{ required: true, message: '' }],
        areaType: [{ required: true, message: '' }],
        spaceGrossArea: [{ required: true, message: '' }],
        spaceNetArea: [{ required: true, message: '' }],
        statistics: [{ required: true, message: '' }],
        leasableArea: [{ required: true, message: '' }],
        remark: [{ required: true, message: '' }]
      },
      rule: {
        spaceFormatNamePlan: [{ required: true, message: '' }]
      },
      tableData: [],
      // formData: {
      //   shopsDara: {},
      //   formatData: {},
      //   ownerData: {}
      // },
      configshopsData: [ // 商铺信息
        { itemType: 'select', prop: 'programName', label: '所属项目', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [] },
        { itemType: 'select', prop: 'buildingName', label: '所属楼栋', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [] },
        { itemType: 'select', prop: 'floorName', label: '所属楼层', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [] },
        { itemType: 'input', placeholder: '请输入', prop: 'spaceId', label: '商铺编码', disabled: true },
        { itemType: 'input', placeholder: '请输入', prop: 'spaceName', label: '铺位号' },
        { itemType: 'select', prop: 'spaceType', label: '商业类型', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [] },
        { itemType: 'select', prop: 'spaceEquityNature', label: '产权性质', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [] },
        { itemType: 'select', prop: 'spaceLocation', label: '商铺属性', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [] },
        { itemType: 'select', prop: 'areaType', label: '计租方式', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [] },
        { itemType: 'input', placeholder: '请输入', prop: 'leasableArea', label: '计租面积(m²)', disabled: true },
        { itemType: 'input', placeholder: '请输入', prop: 'spaceGrossArea', label: '建筑面积(m²)', disabled: true },
        { itemType: 'input', placeholder: '请输入', prop: 'spaceNetArea', label: '套内面积(m²)', disabled: true },
        { itemType: 'input', placeholder: '请输入', prop: 'spaceStatus', label: '商铺状态', disabled: true },
        { itemType: 'datePicker', placeholder: '请输入', type: 'date', prop: 'effectiveDate', label: '生效起止日期', valueFormat: 'yyyy-MM-dd' },
        { itemType: 'input', placeholder: '请输入', prop: 'statistics', label: '计入统计', disabled: true, span: 2, width: '200px', hasSlot: true },
        { itemType: 'input', type: 'textarea', prop: 'remark', label: '备注', placeholder: '请输入', width: '428px', span: 2 }
      ],
      configFormatData: [ // 业态信息
        { itemType: 'select', prop: 'spaceFormatNamePlan', label: '规划业务', placeholder: '请选择', list: this.$PUBFN.getOptionsList('enterpriseType'), listName: 'label', listValue: [] },
        { itemType: 'input', placeholder: '请输入', prop: 'brandFormatName', label: '签约业务', disabled: true }
      ],
      configownerData: [ // 业主信息
        { itemType: 'input', placeholder: '请输入', prop: 'ownerName', label: '业主名称' },
        { itemType: 'input', placeholder: '请输入', prop: 'ownerContactsName', label: '业主联系人' },
        { itemType: 'input', placeholder: '请输入', prop: 'ownerContactsTel', label: '业主电话' }
      ],
      tableConfig: [// TODO 字段需要产品提供
        { programName: '原状态' },
        { standardId: '变更后状态' },
        { checkStatus: '状态变更原因' },
        { createUser: '版本号' },
        { applyDate: '审批号' },
        { programName: '审批号' },
        { standardId: '发起人' },
        { checkStatus: '状态变化时间' }
      ],
      tableShopConfig: [ // TODO 字段不明确
        { programName: '标准年度' },
        { standardId: '租赁保证金标准(元)' },
        { checkStatus: '装修保证金标准(元)' },
        { createUser: '免租期(天)' },
        { applyDate: '租金(费项1名称)' },
        { programName: '物管费(费项2名称)' },
        { standardId: '营运费(费项3名称)' }
      ]
    }
  },

  mounted() {

  },
  methods: {
    validate() {
      this.verification(this.$refs).then(res => {
        this.$emit('closeDialog')
      })
    },
    remove() {
      this.$emit('closeDialog')
    },
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
