<template>
  <div>
    <ysn-dialog
      :title="!detailAndEdit?'详情':'编辑'"
      :width="'920px'"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      @closeDialog="closeDialog"
    >
      <!-- 弹窗内容 -->
      <template #contain>
        <ysn-title title="2020年" class="mb-8" />
        <!-- 详情组件  详情可见-->
        <ysn-displayInfo
          v-if="!detailAndEdit"
          class="mt-8"
          :data="dialogdDetails.year"
          :config="Detail.displayInfoConfig"
          :column="4"
        />
        <!-- 表单组件 编辑显示 -->
        <el-form v-if="detailAndEdit" ref="ruleForm" :model="edit.formData" label-position="top" size="small">
          <ysn-formItem
            :form="dialogdDetails.year"
            :config="edit.configData"
            :column="4"
            clearable
          />
        </el-form>
        <ysn-title title="周期性费项标准明细" class="mb-8" />
        <!-- 表格 详情显示-->
        <ysn-table
          v-if="!detailAndEdit"
          :checkbox="false"
          :data="dialogdDetails.detailed"
          :column="Detail.tableConfig"
          select-key="id"
        />
        <!-- 表格 编辑显示-->
        <ysn-table
          v-if="detailAndEdit"
          :data="dialogdDetails.detailed"
          :show-operation="true"
          :checkbox="false"
          :column="edit.tableConfig"
          select-key="id"
          :show-slots="['feeName','standardFee','standardFeeTimeUnit','standardFeeIncreasing']"
        >
          <!-- 操作插槽 -->
          <template #default="scope">
            <div class="text-center">
              <i
                :class="scope.$index===0?'el-icon-circle-plus':'el-icon-remove '"
                @click="addTable(scope.row,scope.$index)"
              />
            </div>
          </template>
          <!-- 表格插槽 -->
          <template #feeName="scope">
            <el-select v-model="scope.row.feeName" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>

          <template #standardFee="scope">
            <el-select v-model="scope.row.standardFee" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>

          <template #standardFeeTimeUnit="scope">
            <el-select v-model="scope.row.standardFeeTimeUnit" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>

          <template #standardFeeIncreasing="scope">
            <el-select v-model="scope.row.standardFeeIncreasing" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>

          <template #StandardFeeIncreasing="scope">
            <el-select v-model="scope.row.StandardFeeIncreasing" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>

        </ysn-table>
        <ysn-title title="变更日志" class="mb-8 mt-16" />
        <!-- 表格 -->
        <ysn-table
          :checkbox="false"
          :data="dialogdDetails.changeTable"
          :column="Detail.changeTableDatatableConfig"
          select-key="id"
        >
          >
        </ysn-table>
      </template>
      <!-- 弹窗按钮 -->
      <template #btn>
        <div class="text-right mt-40">
          <ysn-btn v-if="!detailAndEdit" @click="modify">编辑</ysn-btn>
          <ysn-btn v-if="!detailAndEdit" type="info" class="color-red ml-8">审核记录</ysn-btn>
          <ysn-btn v-if="detailAndEdit" @click="examine">发起审核</ysn-btn>
        </div>
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogTable',
  props: {
    isShowDialog: { type: Boolean },
    dialogdDetails: { type: Object,
      default: () => {} },
    tableRow: { type: Object, default: () => {} }
  },
  data() {
    return {
      options: [{ value: '选项1', label: '黄金糕' }],
      detailAndEdit: false, // 控制编辑和详情的显示
      Detail: { // 详情显示
        tableData: [], // 表格数据
        tableConfig: [ // 表格配置
          { feeName: '费项名称' },
          { standardFee: '费项标准(元/m²)' },
          { standardFeeTimeUnit: '费项时间单位' },
          { standardFeeIncreasing: '递增率(%)' }
        ],
        changeTableData: [], // 变更表格数据
        changeTableDatatableConfig: [ // 变更表格配置
          { x: '变更日期' }, // TODO 字段未找到
          { standardDeposit: '租赁保证金标准(元)' },
          { standardDecorationDeposit: '装修保证金标准(元)' },
          { standardRentFreePeriod: '免租期(天)' },
          { detail: '详情', width: '296px' }
        ],
        //  displayInfoData:{
        //    ProgramName:"xxx"
        //  },
        displayInfoConfig: [ // 详情配置
          { prop: 'programName', label: '项目名称' },
          { prop: 'buildingName', label: '所属楼栋' },
          { prop: 'floorName', label: '所属楼层' },
          { prop: 'officeName', label: '单元号' },
          { prop: 'standardDeposit', label: '租赁保证金标准(元)' },
          { prop: 'standardDecorationDeposit', label: '装修保证金标准(元)' },
          { prop: 'standardRentFreePeriod', label: '免租期' }
        ]
      },
      edit: { // 编辑显示
        tableData: [{ FeeName: '' }], // 表格数据
        tableConfig: [ // 表格配置
          { feeName: '费项名称', isShowSlots: true },
          { standardFee: '费项标准(元/m²)', isShowSlots: true },
          { standardFeeTimeUnit: '费项时间单位', isShowSlots: true },
          { standardFeeIncreasing: '递增率(%)', isShowSlots: true }
        ],
        formData: {
          //  ProgramName:'',
          //  BuildingName:'',
          //  FloorName:'',
          //  OfficeName:'',
          //  StandardDeposit:'',
          //  StandardDecorationDeposit:'',
          //  StandardRentFreePeriod:''
        },
        configData: [ // 表单配置
          { itemType: 'input', prop: 'programName', label: '项目名称', placeholder: '请选择', disabled: true },
          { prop: 'buildingName', itemType: 'input', placeholder: '请选择', label: '所属楼栋', disabled: true },
          { itemType: 'input', placeholder: '请选择', prop: 'floorName', label: '所属楼层', disabled: true },
          { itemType: 'input', placeholder: '请选择', prop: 'officeName', label: '单元号', disabled: true },
          { itemType: 'input', placeholder: '请选择', prop: 'standardDeposit', label: '租赁保证金标准(元)' },
          { itemType: 'input', placeholder: '请选择', prop: 'standardDecorationDeposit', label: '装修保证金标准(元)' },
          { itemType: 'input', placeholder: '请选择', prop: 'standardRentFreePeriod', label: '免租期' }
        ]
      }

    }
  },
  mounted() {

  },
  methods: {
    // 关闭按钮
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 编辑
    modify() {
      this.detailAndEdit = !this.detailAndEdit
    },
    // 发起审核
    examine() {
      this.$emit('closeDialog', true)
    },
    // 添加表格
    addTable(row, index) {
      console.log(index)
      this.$emit('addTable', row, index)
    }

  }
}
</script>

<style lang="scss" scoped>
    .el-icon-circle-plus{
       color:#485F47;
     }
     .el-icon-remove{
       color:#6F120C;
     }
</style>
