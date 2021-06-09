<template>
  <div class="app-page-main">
    <div class="hearder">
      <el-button class="btn">反核销</el-button>
      <el-button class="btn1">返回</el-button>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <div style="display: flex">
          <div class="forma">
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="项目名称" prop="name">
                <el-input v-model="value" placeholder="请输入内容" />
              </el-form-item>
              <el-form-item label="版本号" prop="name">
                <el-input v-model="value1" placeholder="请输入内容" />
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
              <el-form-item label="部门" prop="name">
                <el-input v-model="value2" placeholder="请输入内容" />
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
              <el-form-item label="预算年度" prop="name">
                <el-input v-model="value" placeholder="请输入内容" />
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
              <el-form-item label="编制人" prop="name">
                <el-input v-model="value" placeholder="请输入内容" />
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
              <el-form-item label="编制日期" prop="name">
                <el-input v-model="value" placeholder="请输入内容" />
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
      <el-tab-pane label="预算汇总" name="first">
        <div class="tables">
          <table>
            <tr>
              <td>2022收入预算总额</td>
              <td>0</td>
              <td>2021收入预算总额</td>
              <td>0</td>
              <td>差异额</td>
              <td>0</td>
              <td>差异额</td>
              <td>0</td>
            </tr>
          </table>
        </div>
        <div class="tablet">
          <table>
            <tr>
              <td>2022收入预算总额</td>
              <td>0</td>
              <td>2021收入预算总额</td>
              <td>0</td>
              <td>差异额</td>
              <td>0</td>
              <td>差异额</td>
              <td>0</td>
            </tr>
          </table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-tabs
      v-model="activeName"
      style="margin-top: 41px"
      @tab-click="handleClick"
    >
      <el-tab-pane label="预算明细" name="first">
        <div class="tablelist">
          <el-table :data="tableData" style="width: 100%; font-size: 10px" :header-cell-style="rowClass">
            <el-table-column prop="name" label="预算名称" width="120" />
            <el-table-column prop="address1" label="类型" width="120" />
            <el-table-column prop="address2" label="2022年预算总额" width="120" />
            <el-table-column
              prop="address"
              label="2021年预算总额"
              align="center"
            >
              <el-table-column
                prop="address3"
                label="1-6月实际发生"
                width="120"
              />
              <el-table-column prop="address4" label="7-12月预估" width="120" />
            </el-table-column>
            <el-table-column prop="address5" label="差异额" />
            <el-table-column prop="address6" label="差异率" />
            <el-table-column prop="address7" label="2022年预算明细" />
            <el-table-column prop="" label="2022年预算明细">
              <p>详情</p>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-tabs
      v-model="activeName"
      style="margin-top: 41px"
      @tab-click="handleClick"
    >
      <el-tab-pane label="审批信息" name="first">
        <div class="int">
          <el-input
            v-model="input"
            placeholder="请输入内容"
            disabled
          />
          <span><i class="el-icon-arrow-right" /></span>

          <el-input
            v-model="input1"
            placeholder="请输入内容"
            disabled
          />
          <span><i class="el-icon-arrow-right" /></span>

          <el-input
            v-model="input2"
            placeholder="请输入内容"
            disabled
          />
          <span><i class="el-icon-arrow-right" /></span>
          <el-input
            v-model="input3"
            placeholder="请输入内容"
            disabled
          />
        </div>
        <div>
          <div style="width: 416px; border-radius: 20px; margin-top: 24px">
            <p style="margin-bottom: 8px">审批意见</p>
            <el-input
              v-model="textarea"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            />
          </div>
        </div>
        <div>
          <div style="width: 416px; border-radius: 20px; margin-top: 24px">
            <p style="margin-bottom: 8px">审批附件</p>
            <div class="box1">
              <div class="box">
                <p v-for="(item,i) in 2" :key="i">
                  <i class="el-icon-tickets" style="margin-right:5px" /><span style="margin-right:33px;color: #1C4C7F;">animal.jpeg</span><i class="el-icon-check" />
                </p>
              </div>
              <el-button>上传</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'Approvaldetails',
  components: {},
  data() {
    return {
      activeName: 'first',
      input: '1 . 发起(张三)',
      input1: '2 . 项目运营(张三)',
      input2: '3 . 项目财务(李文强)',
      input3: '4 . 完成',
      radio: '1',
      textarea: '',
      form: {
        input1: ''
      },
      value: '上海七宝',
      value1: '99898',
      value2: '商务部',
      value3: '2021',
      value4: '张三',
      value5: '2012-12-10',
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
          name: '能耗明细',
          address1: '费用',
          address2: '9,145,535.77',
          address3: '9,145,535.77',
          address4: '9,145,535.77',
          address5: '145,535.77',
          address6: '10%',
          address7: '1.10%'
        },
        {
          name: '能耗明细',
          address1: '费用',
          address2: '9,145,535.77',
          address3: '9,145,535.77',
          address4: '9,145,535.77',
          address5: '145,535.77',
          address6: '10%',
          address7: '1.10%'
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
      if (columnIndex === 7) {
        return "border-top-right-radius: 20px;border-bottom-right-radius: 20px;";
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
  .box1 {
    display: flex;
    margin-left: -120px;
    justify-content: center;
    .box {
      width: 206px;
      height: 96px;
      background: #fdfcfa;
      border-radius: 20px;
      text-align: center;
     p {
        margin-top: 24px;
        margin-bottom: 18px;
      }
    }
    ::v-deep.el-button {
      width: 80px;
      height: 32px;
      color: #ffffff;
      background: #1c4c7f;
      line-height: 10px;
      border-radius: 16px;
      margin-left: 9px;
    }
  }

  ::v-deep.el-textarea__inner {
    height: 96px;
    background: #fdfcfa;
    border-radius: 20px;
    border: none;
  }
  .int {
    padding-right: 146px;
    display: flex;
    align-items: center;
    ::v-deep.el-input__inner {
      width: 206px;
      height: 32px;
      background: #fdfcfa;
      border-radius: 16px;
      border: none;
    }
    ::v-deep.el-input.is-disabled .el-input__inner {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #050101;
      line-height: 14px;
    }
    span {
      margin-right: 13px;
    }
  }
  .tablelist {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #050101;
    line-height: 14px;
    ::v-deep.el-table--group,
    .el-table--border {
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
  .tables {
    tr {
      td {
        width: 149px;
        height: 36px;
        background: #e5e2de;
        line-height: 36px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
      }
      td:nth-child(odd) {
        padding-left: 16px;
        border-top-left-radius: 16px;
        border-bottom: 1px solid #fdf7ee !important  ;
      }
      td:nth-child(even) {
        text-align: center;
        border-bottom: 1px solid #fdf7ee !important  ;
        background: #f6f5ee;
      }
    }
  }
  .tablet {
    tr {
      td {
        width: 149px;
        height: 36px;
        background: #e5e2de;
        line-height: 36px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #050101;
      }
      td:nth-child(odd) {
        border-bottom-left-radius: 16px;
        padding-left: 16px;
        border-bottom: 1px solid #fdf7ee !important  ;
      }
      td:nth-child(even) {
        text-align: center;
        border-bottom: 1px solid #fdf7ee !important  ;
        background: #f6f5ee;
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
    border: none !important;
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
