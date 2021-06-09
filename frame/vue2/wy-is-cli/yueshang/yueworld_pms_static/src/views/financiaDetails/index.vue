<template>
  <div class="app-page-main">
    <div class="hearder">
      <el-button class="btn">反核销</el-button>
      <el-button class="btn1">返回</el-button>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商家信息" name="first">
        <div style="display: flex">
          <div class="forma">
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="商家名称" prop="name">
                <el-input
                  v-model="value"
                  placeholder="请输入内容"
                  :disabled="true"
                />
              </el-form-item>
              <el-form-item label="核销日期" prop="name">
                <el-input
                  v-model="value"
                  placeholder="请输入内容"
                  :disabled="true"
                />
              </el-form-item>
            </el-form>
          </div>
          <div class="forma">
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="项目名称" prop="name">
                <el-input
                  v-model="value"
                  placeholder="请输入内容"
                  :disabled="true"
                />
              </el-form-item>
            </el-form>
          </div>
          <div class="forma">
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="核销单号" prop="name">
                <el-input
                  v-model="value"
                  placeholder="请输入内容"
                  :disabled="true"
                />
              </el-form-item>
            </el-form>
          </div>
          <div class="forma">
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="核销人员" prop="name">
                <el-input
                  v-model="value"
                  placeholder="请输入内容"
                  :disabled="true"
                />
              </el-form-item>
            </el-form>
          </div>
          <div class="forma">
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="核销类型" prop="name">
                <el-input
                  v-model="value"
                  placeholder="请输入内容"
                  :disabled="true"
                />
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-tabs
      v-model="activeName"
      style="margin-top: 41px"
      @tab-click="handleClick"
    >
      <el-tab-pane label="冲抵" name="first" />

      <div class="tablelist">
        <el-table :data="tableData" style="width: 100%; font-size: 10px"   :header-cell-style="rowClass4">
          <el-table-column prop="date" label="" width="278">
            <el-table-column prop="name" label="冲抵费项" />
            <el-table-column prop="address" label="合同编号" />
          </el-table-column>
          <el-table-column prop="address" label="" width="278">
            <el-table-column prop="address" label="收款单位" />
          </el-table-column>
          <el-table-column prop="address" label="管理费单价" align="center">
            <el-table-column prop="address" label="开始日期" />
            <el-table-column prop="address" label="结束日期" />
          </el-table-column>
          <el-table-column prop="address" label="管理费单价" align="center">
            <el-table-column prop="address" label="开始日期" />
            <el-table-column prop="address" label="结束日期" />
          </el-table-column>
        </el-table>
      </div>
    </el-tabs>
    <el-tabs
      v-model="activeName"
      style="margin-top: 41px"
      @tab-click="handleClick"
    
    >
      <el-tab-pane label="应收冲减" name="first" />
      <div class="tablelist">
        <el-table :data="tableData1" style="width: 100%; font-size: 10px"   :header-cell-style="rowClass2">
          <el-table-column prop="date2" label="费用项" />
          <el-table-column prop="name" label="权责月" />
          <el-table-column prop="address" label="财务月" />
          <el-table-column prop="address1" label="合同编号" />
          <el-table-column prop="address2" label="应收编号" />
          <el-table-column prop="address3" label="税率" />
          <el-table-column prop="address4" label="应收金额" />
          <el-table-column prop="address5" label="应收编号" />
        </el-table>
      </div>
    </el-tabs>
    <el-tabs
      v-model="activeName"
      style="margin-top: 41px"
      @tab-click="handleClick"
    >
      <el-tab-pane label="核销明细" name="first" />
      <div class="tablelist">
        <el-table :data="tableData2" style="width: 100%; font-size: 10px"  :header-cell-style="rowClass">
          <el-table-column prop="data1" label="序号" />
          <el-table-column prop="name" label="费项" />
          <el-table-column prop="address" label="合同应收日期" />
          <el-table-column prop="address1" label="应收日期" />
          <el-table-column prop="address2" label="权责月" />
          <el-table-column prop="address3" label="应收" />
          <el-table-column prop="address4" label="减免" />
          <el-table-column prop="address5" label="收款冲抵" />
          <el-table-column prop="address6" label="收款核销" />
          <el-table-column prop="address7" label="应收冲减" />
        </el-table>
      </div>
    </el-tabs>
    <el-tabs
      v-model="activeName"
      style="margin-top: 41px"
      @tab-click="handleClick"
       
    >
      <el-tab-pane label="审核历史" name="first" />
      <div class="tablelist1">
        <el-table :data="tableData3" style="width: 100%; font-size: 10px" :header-cell-style="rowClass1">
          <el-table-column prop="name" label="处理时间" />
          <el-table-column prop="address" label="处理者" />
          <el-table-column prop="" label="步骤" />
          <el-table-column prop="address1" label="操作说明" />
        </el-table>
      </div>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'FinanciaDetails',
  components: {},
  data() {
    return {
      activeName: 'first',
      radio: '1',
      form: {
        input1: ''
      },
      value: '—自动带入—',
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      },
      tableData: [
        {
          name: 'L1',
          province: 'MAll',
          city: '5900.00',
          address: '5900.00',
          zip: '餐饮',
          zip1: '自持',
          zip2: '经营中'
        },
        {
          name: 'L1',
          province: 'MAll',
          city: '5900.00',
          address: '5900.00',
          zip: '餐饮',
          zip1: '自持',
          zip2: '经营中'
        },
        {
          name: 'L1',
          province: 'MAll',
          city: '5900.00',
          address: '5900.00',
          zip: '餐饮',
          zip1: '自持',
          zip2: '经营中'
        },
        {
          name: 'L1',
          province: 'MAll',
          city: '5900.00',
          address: '5900.00',
          zip: '餐饮',
          zip1: '自持',
          zip2: '经营中'
        },
        {
          name: '合计',
          province: 'MAll',
          city: '5900.00',
          address: '5900.00',
          zip: '餐饮',
          zip1: '自持',
          zip2: '经营中'
        }
      ],
      tableData1: [
        {
          data: 1,
          data2: 1,
          name: '2021-01',
          address: '2021-01',
          address1: 'cimi2021-SD21454',
          address2: 'AR-5411225400',
          address3: '0.00',
          address4: '-2,000.00',
          address5: '2000.00'
        },
        {
          address1: '合计',
          address4: '-2,000.00',
          address5: '2000.00'
        }
      ],
      tableData2: [
        {
          data: 1,
          data1: '1',
          name: '浮动提成租金',
          address: '2021-01-20',
          address1: '2021-01-20',
          address2: '2021-01',
          address3: '2000.00',
          address4: '0.00',
          address5: '0.00',
          address6: '2,000.00',
          address7: '0.00',
          address8: '1,000.00'
        },
        {
          address1: '合计'
        }
      ],
      tableData3: [
        {
          name: '2021-05-20 15:40:45',
          address: '张大伟',
          address1: '提交审核'
        },
        {
          name: '2021-05-20 15:40:45',
          address: '张大伟',
          address1: '提交审核'
        },
        {
          name: '2021-05-20 15:40:45',
          address: '张大伟',
          address1: '提交审核'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
        rowClass({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex);
      if (columnIndex === 9) {
        return "border-bottom-right-radius: 20px;border-top-right-radius: 20px;";
      }
    },
    rowClass1({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex);
      if (columnIndex === 3) {
        return "border-bottom-right-radius: 20px;border-top-right-radius: 20px;";
      }
    },
    rowClass2({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex);
      if (columnIndex === 7) {
        return "border-bottom-right-radius: 20px;border-top-right-radius: 20px;";
      }
    },
    rowClass4({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex);
      if (rowIndex===0 &&columnIndex === 3) {
        return "border-top-right-radius: 20px;";
      }
      if (rowIndex===1 &&columnIndex=== row.length-1) {
        return "border-bottom-right-radius: 20px;";
      }

    },
    rowClass2({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex);
      if (columnIndex === 7) {
        return "border-bottom-right-radius: 20px;border-top-right-radius: 20px;";
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
<style lang="scss" scoped>
.app-page-main {
  .tablelist1 {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #050101;
    line-height: 14px;
    ::v-deep .el-table td {
      background: #f6f5ee;
    }
    ::v-deep.el-table th {
      background: #e5e2de !important;
      padding: 0;
    }
    ::v-deep.el-table th:first-child {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }
    ::v-deep.cell {
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #050101;
      p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #1c4c7f;
      }
      img {
        vertical-align: middle;
      }
    }
    ::v-deep.el-table td,
    .el-table th {
      padding: 0;
    }
    ::v-deep.el-table tr {
      background: #f6f5ee;
    }
    ::v-deep.has-gutter {
      background: #f6f5ee;
    }
    ::v-deep.el-table--enable-row-hover
      .el-table__body
      tr:hover
      > td:first-child {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      background: #e5e2de;
    }
    ::v-deep.el-table--enable-row-hover
      .el-table__body
      tr:hover
      > td:nth-last-child(1) {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      background: #e5e2de;
      //  color: #48A0C3  !important ;
    }
    ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: #e5e2de;
    }
    ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td > .cell {
      color: #48a0c3;
    }
    ::v-deep.el-table--enable-row-hover
      .el-table__body
      tr:hover
      > td
      > .cell
      > p {
      color: #48a0c3;
    }
    ::v-deep.el-table--enable-row-transition .el-table__body td {
      transition: background-color -1s ease;
    }
    ::v-deep .el-table__header-wrapper {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }
    ::v-deep.el-table,
    .el-table__expanded-cell {
      background: #f6f5ee;
    }
    ::v-deep .el-table th {
      padding: 0 4px;
    }
    ::v-deep.el-table__row td .cell {
      height: 36px !important;
      line-height: 36px;
      padding-left: 15px;
    }
    .solt-icon {
      i {
        margin-left: 8px;
      }
    }
  }
  .tablelist {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #050101;
    line-height: 14px;
     ::v-deep.el-table--group, .el-table--border{
        border: none;
    }
    ::v-deep .el-table td {
      border-right: none;
    }
    ::v-deep .el-table td {
      background: #f6f5ee;
    }
    ::v-deep.el-table th {
      background: #e5e2de !important;
      padding: 0;
    }
    // ::v-deep.el-table th:nth-child(4) {
    //   border-top-right-radius: 20px;
    // }
    ::v-deep.cell {
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #050101;
      p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #1c4c7f;
      }
      img {
        vertical-align: middle;
      }
    }
    ::v-deep.el-table td,
    .el-table th {
      padding: 0;
    }
    ::v-deep.el-table tr {
      background: #f6f5ee;
    }
    ::v-deep.has-gutter {
      background: #f6f5ee;
    }
    ::v-deep.el-table--enable-row-hover
      .el-table__body
      tr:hover
      > td:first-child {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      background: #e5e2de;
    }
    ::v-deep.el-table--enable-row-hover
      .el-table__body
      tr:hover
      > td:nth-last-child(1) {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      background: #e5e2de;
      //  color: #48A0C3  !important ;
    }
    ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: #e5e2de;
    }
    ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td > .cell {
      color: #48a0c3;
    }
    ::v-deep.el-table--enable-row-hover
      .el-table__body
      tr:hover
      > td
      > .cell
      > p {
      color: #48a0c3;
    }
    ::v-deep.el-table--enable-row-transition .el-table__body td {
      transition: background-color -1s ease;
    }
    ::v-deep .el-table__header-wrapper {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }
    ::v-deep.el-table,
    .el-table__expanded-cell {
      background: #f6f5ee;
    }
    ::v-deep .el-table th {
      padding: 0 4px;
    }
    ::v-deep.el-table__row td .cell {
      height: 36px !important;
      line-height: 36px;
      padding-left: 15px;
    }
    .solt-icon {
      i {
        margin-left: 8px;
      }
    }
  }
  .hearder {
    display: flex;
    height: 32px;
    justify-content: flex-end;

    .btn {
      height: 32px;
      color: #ffffff;
      background: #1c4c7f !important;
      border-radius: 16px !important;
    }
    .btn1 {
      height: 32px;
      background: #e5e2de !important;
      border-radius: 16px !important;
    }
  }
  ::v-deep.el-dialog__wrapper {
    top: -40px;
  }
  ::v-deep.el-dialog {
    height: 1387px;
    margin: 0 auto;
    background: #f6f5ee;
  }
  ::v-deep.el-dialog__body {
    padding: 0 20px;
  }
  ::v-deep.el-dialog__title {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #050101;
  }
  ::v-deep.el-divider--horizontal {
    margin: 0;
    margin-bottom: 10px;
  }
  ::v-deep.el-tabs__item.is-active {
    color: #050101;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    margin-left: 8px;
  }
  ::v-deep.el-tabs__active-bar {
    width: 122px !important;
    background: #050101;
    margin-left: -8px;
  }
  .firsts {
    display: flex;
    justify-content: space-between;
    ::v-deep.el-input__inner {
      height: 32px;
      width: 200px !important;
      background: #fdfcfa;
      border-radius: 16px;
      margin-right: 100px;
    }
    ::v-deep.el-input__icon {
      margin-right: -94px;
    }
    .icn {
      padding-left: 200px;
      font-size: 20px;
      display: flex;
      align-items: center;
      span {
        font-size: 12px;
        width: 216px;
        margin-left: 9px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #848382;
      }
    }
  }
  .contract {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .contracts {
      span {
        margin-right: 30px;
        cursor: pointer;
      }
    }
    ::v-deep.el-button {
      height: 32px;
      background: #1c4c7f;
      border-radius: 16px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 0;
    }
  }
  .forma {
    width: 206px;
    margin-right: 20px;
    ::v-deep.el-form-item__content {
      margin-left: 10px !important;
    }
    ::v-deep.el-input__inner {
      height: 32px;
      width: 206px;
      background: #e5e2de;
      border-radius: 20px;
      margin-left: -10px;
    }
    ::v-deep.el-icon-arrow-up:before {
      content: "\e78f";
    }
  }
  ::v-deep.el-form-item__label {
    width: 200px !important;
    text-align: left;
  }
  ::v-deep.el-form-item {
    margin-bottom: 0;
  }
}
</style>
