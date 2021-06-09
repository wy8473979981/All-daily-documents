<!--
 * @Descripttion:
 * @Author: zhb
 * @Date: 2021-05-19 10:06:10
 * @LastEditors: zhb
-->
<template>
  <div>

    <div class="dialog-box">
      <el-dialog title="预算调整" :visible.sync="dialogVisible" class="budget-adjust-pop">
        <div class="select-group">
          <div class="select-item">
            <p>请选择项目</p>
            <el-select v-model="selectValue1" placeholder="请选择项目">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="select-item">
            <p>请选择类型</p>
            <el-select v-model="selectValue2" placeholder="请选择类型">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="select-item">
            <p>请选择部门</p>
            <el-select v-model="selectValue3" placeholder="请选择部门">
              <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="select-item">
            <p>请选择年</p>
            <el-select v-model="selectValue4" placeholder="请选择年度">
              <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </div>
        <Table :table-data="topTableData" :table-columns-config="topTableColumnsConfig" />
        <div class="btn-group">
          <el-button type="info" plain @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = true">确 定</el-button>
        </div>
      </el-dialog>
      <div class="success-dialog">
        <el-dialog :visible.sync="dialogVisible1">
          <div class="icon">
            <i class="el-icon-success" />
          </div>
          <div class="success-dialog-desc">
            <p>开启成功</p>
            <p>XX部门可以进行2022年度预算调整</p>
          </div>
        </el-dialog>
      </div>

    </div>

  </div>
</template>

<script>
import Table from '../../budgetModule/components/table'
export default {
  name: 'PopBudgetAdjustment',
  components: {
    Table
  },
  props: {

  },
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      selectValue1: '',
      options1: [],
      selectValue2: '',
      options2: [{
        label: '收入',
        value: '2'
      },
      {
        label: '费用',
        value: '3'
      }
      ],
      selectValue3: '',
      options3: [],
      selectValue4: '',
      options4: [{
        label: '2022',
        value: '1'
      }],
      topTableData: [{
        v1: '',
        v2: '工程部',
        v3: '能耗费'

      }, {
        v1: '',
        v2: '工程部',
        v3: '工程维保费'

      }, {
        v1: '',
        v2: '工程部',
        v3: '能耗费'

      }, {
        v1: '',
        v2: '工程部',
        v3: '工程维保费'

      }, {
        v1: '',
        v2: '工程部',
        v3: '能耗费'

      }, {
        v1: '',
        v2: '工程部',
        v3: '工程维保费'

      }],
      topTableColumnsConfig: [{
        prop: 'v2',
        label: '部门',
        width: '100',
        isSort: false,
        type: 'selection'
      }, {
        prop: 'v3',
        label: '预算表名',
        width: '',
        isSort: false,
        type: ''
      }]
    }
  },
  methods: {
    handleClose() {

    }
  }
}

</script>

<style scoped lang='scss'>
  ::v-deep.success-dialog {
    .el-dialog {
      height: 300px !important;
    }

    .el-icon-success {
      margin-top: 30px;
      font-size: 80px;
      color: #485F47;
    }

    .el-dialog__body {
      text-align: center;
      border-top: none !important;
    }
  }

  .success-dialog-desc {
    >p:nth-child(1) {
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #050101;
      line-height: 18px;
      margin: 20px auto 16px;
    }

    >p:nth-child(2) {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #848382;
      line-height: 14px;
    }
  }

  ::v-deep.dialog-box {
    .el-dialog {
      width: 496px;
      height: 557px;
      background: #F6F5EE;
      border-radius: 20px;
    }

    .el-dialog__header {
      padding: 20px;
      padding-bottom: 5px;
    }

    .el-dialog__title {
      font-size: 18px;
      font-family: MicrosoftYaHei;
      color: #050101;
    }

    .el-dialog__body {
      margin: 0 24px;
      padding: 16px 0 0 0;
      font-size: 14px;
      word-break: break-all;
      border-top: 1px solid #E5E2DE;
    }

    .el-button {
      width: 86px;
      border-radius: 16px;
      border: none;
    }

    .el-button--info.is-plain {
      background: #E5E2DE;
      color: #848382;
    }

    .el-select {
      margin-bottom: 16px;
      margin-right: 16px;

      .el-input__inner {
        width: 200px;
        height: 32px;
        background: #FDFCFA;
        border-radius: 16px;
        border: none;
        color: #050101 !important;

        &::placeholder {
          font-size: $font-base-size;
          font-family: MicrosoftYaHei;
          color: #848382;
        }
      }

      .el-input--medium .el-input__icon {
        line-height: 30px;
      }

      .el-icon-arrow-up:before {
        content: "\e78f";
      }
    }

    .select-group {
      display: flex;
      flex-wrap: wrap;

      .select-item {
        >p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #848382;
          margin-bottom: 8px;

        }
      }
    }

    .btn-group {
      float: right;
      margin-top: 30px;
    }

  }

</style>
