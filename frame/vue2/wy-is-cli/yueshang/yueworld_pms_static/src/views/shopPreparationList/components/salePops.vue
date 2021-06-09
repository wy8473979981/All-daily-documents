<!--
 * @Descripttion:
 * @Author: zhb
 * @Date: 2021-05-20 11:25:24
 * @LastEditors: zhb
-->

<template>
  <div>
    <div class="dialog-box">

      <!-- <Table :tableData="topTableData" :tableColumnsConfig="topTableColumnsConfig" />
        <Table :tableData="topTableData1" :tableColumnsConfig="topTableColumnsConfig1" /> -->

      <div class="success-dialog3">
        <el-dialog title="编辑铺位预算" :visible.sync="dialogVisible3">
          <div class="shop-list">
            <p class="title">基础信息</p>
            <Table :table-data="topTableData1" :table-columns-config="topTableColumnsConfig1" />
            <p class="title" style="margin-top:30px">已有合同信息</p>
            <Table :table-data="topTableData" :table-columns-config="topTableColumnsConfig" />
            <p class="title" style="margin-top:30px">已有合同信息</p>
            <div class="wrapper">
              <div class="left">
                <span>是否调铺</span>
                <el-radio v-model="radio" label="1">是</el-radio>
                <el-radio v-model="radio" label="2">否</el-radio>
              </div>
              <div class="right">
                <span>调铺生效日期</span>
                <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
              </div>
            </div>

            <p class="title" style="margin-top:30px">新签合同</p>
            <div class="top-box">
              <span>新签合同A</span>
              <button class="btn">删除</button>
              <el-button type="primary">添加新签合同</el-button>
            </div>
            <div class="">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="合同类型" :rules="form.rules">
                  <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai" />
                    <el-option label="区域二" value="beijing" />
                  </el-select>
                </el-form-item>
                <el-form-item label="合同起止日期" :rules="form.rules" suffix-icon="el-icon-date">
                  <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
                <el-form-item label="品牌" :rules="form.rules">
                  <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="区域一" value="shanghai" />
                    <el-option label="区域二" value="beijing" />
                  </el-select>
                </el-form-item>
                <el-form-item label="物管费支付周期" :rules="form.rules">
                  <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="区域一" value="shanghai" />
                    <el-option label="区域二" value="beijing" />
                  </el-select>
                </el-form-item>
                <el-form-item label="固定支付周期" :rules="form.rules">
                  <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="区域一" value="shanghai" />
                    <el-option label="区域二" value="beijing" />
                  </el-select>
                </el-form-item>
                <el-form-item label="物管费支付周期" :rules="form.rules">
                  <el-input v-model="form.name" placeholder="请输入" />
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="btn-group">
            <el-button type="primary" @click="dialogVisible3 = true">确 定</el-button>
            <el-button type="info" plain @click="dialogVisible3 = false">取消</el-button>
            <!-- <el-button type="primary" @click="dialogVisible1 = true">确 定</el-button> -->
          </div>
        </el-dialog>
      </div>

    </div>
  </div>
</template>

<script>
import Table from '../../budgetModule/components/table'
import {
  countOptions,
  projectOptions
} from './data.js'
export default {
  name: 'Pop1',
  components: {
    Table
  },
  props: {},
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        rules: [{
          required: true,
          message: ''
        }]
      },
      dialogVisible1: true,
      dialogVisible3: true,
      countOptions: countOptions,
      projectOptions: projectOptions,
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
        v1: 'cuhjsk4627',
        v2: '餐饮',
        v3: '5800',
        v4: '5900.00',
        v5: '2021-01-01',
        v6: '2021-12-31'
      }],
      topTableData1: [{
        v1: 'M-L1-021',
        v2: 'L1',
        v3: 'MAll',
        v4: '5900.00',
        v5: '5900.00',
        v6: '餐饮',
        v7: '自持',
        v8: '经营中'

      }],

      topTableColumnsConfig: [{
        prop: 'v1',
        label: '合同号',
        width: '',
        isSort: false,
        type: 'selection'
      },
      {
        prop: 'v2',
        label: '品牌',
        width: '',
        isSort: false
      },
      {
        prop: 'v3',
        label: '租金单价',
        width: '',
        isSort: false
      },
      {
        prop: 'v4',
        label: '管理费单价',
        width: '',
        isSort: false,
        type: ''
      },
      {
        prop: 'v5',
        label: '开始日期',
        width: '',
        isSort: false
      },
      {
        prop: 'v6',
        label: '结束日期',
        width: '',
        isSort: false
      }
      ],
      topTableColumnsConfig1: [{
        prop: 'v1',
        label: '铺号',
        width: '',
        isSort: false,
        type: 'selection'
      },
      {
        prop: 'v2',
        label: '楼层',
        width: '',
        isSort: false
      },
      {
        prop: 'v3',
        label: '物业类型',
        width: '',
        isSort: false
      },

      {
        prop: 'v4',
        label: '标准租金',
        width: '',
        isSort: false,
        type: ''
      },
      {
        prop: 'v5',
        label: '标准管理费',
        width: '',
        isSort: false
      },
      {
        prop: 'v6',
        label: '业态',
        width: '',
        isSort: false
      },
      {
        prop: 'v7',
        label: '资产属性',
        width: '',
        isSort: false
      },
      {
        prop: 'v8',
        label: '期初状态',
        width: '',
        isSort: false
      }
      ]
    }
  },
  methods: {
    handleClose() {}
  }
}

</script>

<style scoped lang="scss">
  ::v-deep.success-dialog {
    .el-dialog {
      height: 300px !important;
    }

    .el-icon-success {
      margin-top: 30px;
      font-size: 80px;
      color: #485f47;
    }

    .el-dialog__body {
      text-align: center;
      border-top: none !important;
    }
  }

  ::v-deep.success-dialog3 {
    .el-dialog {
      min-height: 300px !important;
      width: 860px;
      padding-bottom: 80px;
    }

    .el-form-item__content {
      margin-left: 0 !important;
    }

    .el-input--medium .el-input__inner,
    .el-range-editor.el-input__inner {
      width: 246px !important;
      height: 32px;
      background: #FDFCFA;
      border-radius: 16px;
      border: none;
    }

    .el-form {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }

    .el-form-item {
      margin-right: 120px;
      margin-bottom: 0;
    }

    .el-form-item--medium .el-form-item__label {
      padding: 0;
      float: none;
      padding: 0;
      float: none;
      color: #050101;
      font-size: 12px;
      font-weight: normal;
    }

    .el-icon-success {
      margin-top: 30px;
      font-size: 80px;
      color: #485f47;
    }

    .shop-name {
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #050101;
      margin-bottom: 30px;
    }

    .title {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #050101;
      margin-bottom: 22px;
      border-bottom: #D1CEC9 solid 1px;
      padding-bottom: 10px;
      position: relative;

      &::after {
        content: "";
        width: 122px;
        height: 1px;
        background: #050101;
        position: absolute;
        top: 0;
        top: 28px;
        left: 0;
      }
    }

    .wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 97%;

      .left {
        >span {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #050101;
          margin-right: 10px;
        }
      }

      .right {
        >span {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #050101;
          margin-right: 10px;
        }
      }
    }

    .top-box {
      .el-button--medium {
        float: right;
        width: 116px !important;
      }

      >span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #050101;
      }

      .btn {
        border: none;
        background: none;
        margin-left: 30px;
        color: #1C4C7F;
      }
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
      width: 860px;
      // min-height: 638px;
      background: #f6f5ee;
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
      border-top: 1px solid #e5e2de;
    }

    .el-button {
      width: 86px;
      border-radius: 16px;
      border: none;
    }

    .el-button--info.is-plain {
      background: #e5e2de;
      color: #848382;
    }

    .el-select {
      .el-input__inner {
        width: 200px;
        height: 32px;
        background: #fdfcfa;
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

    .select-group1 {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .select-item {
        display: flex;
        align-items: center;

        >p {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #050101;
          margin-right: 10px;
          width: 100px;

          i {
            font-weight: bold;
          }
        }
      }
    }

    .btn-group {
      float: right;
      margin-top: 30px;

      .btn {
        font-size: 14px;
        border: none;
        background: none;
        margin-left: 16px;
        color: #848382;
      }
    }
  }

</style>
