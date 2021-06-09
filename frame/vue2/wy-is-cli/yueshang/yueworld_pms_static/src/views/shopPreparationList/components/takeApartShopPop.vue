<!--
 * @Descripttion:
 * @Author: zhb
 * @Date: 2021-05-19 10:06:10
 * @LastEditors: zhb
-->
<template>
  <div>
    <div class="dialog-box">
      <el-dialog
        title="拆铺详情"
        :visible.sync="dialogVisible"
        class="budget-adjust-pop"
      >
        <Table
          :table-data="topTableData"
          :table-columns-config="topTableColumnsConfig"
        />
        <Table
          :table-data="topTableData1"
          :table-columns-config="topTableColumnsConfig1"
        />
        <div class="btn-group">
          <el-button
            type="info"
            plain
            @click="dialogVisible = false"
          >关闭</el-button>
          <el-button
            type="info"
            plain
            @click="dialogVisible = false"
          >取消拆铺</el-button>
        </div>
      </el-dialog>
      <div class="success-dialog" />

      <div class="success-dialog3">
        <el-dialog title="拆铺" :visible.sync="dialogVisible3">
          <div class="shop-list">
            <p class="shop-name">新铺1</p>
            <p class="title">基础信息</p>
            <div class="select-group">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="铺号" :rules="form.rules">
                  <el-input v-model="form.v1" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="楼层" :rules="form.rules">
                  <el-select v-model="form.v2" placeholder="请选择">
                    <el-option label="L6" value="1" />
                    <el-option label="L5" value="2" />
                    <el-option label="L5" value="3" />
                    <el-option label="L3" value="4" />
                    <el-option label="L2" value="5" />
                    <el-option label="L1" value="6" />
                    <el-option label="B1" value="7" />
                    <el-option label="B2" value="8" />
                  </el-select>
                </el-form-item>
                <el-form-item label="计租面积（㎡）" :rules="form.rules">
                  <el-input v-model="form.v3" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="签批业态" :rules="form.rules">
                  <el-select v-model="form.v4" placeholder="请选择签批业态">
                    <el-option label="超市" value="1" />
                    <el-option label="百货" value="2" />
                    <el-option label="影院" value="3" />
                    <el-option label="服装" value="4" />
                    <el-option label="配套" value="5" />
                    <el-option label="餐饮" value="6" />
                    <el-option label="儿童" value="7" />
                  </el-select>
                </el-form-item>
                <el-form-item label="标准租金（元）" :rules="form.rules">
                  <el-input v-model="form.v5" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="标准管理费（元）" :rules="form.rules">
                  <el-input v-model="form.v6" placeholder="请输入" />
                </el-form-item>
              </el-form>
            </div>
            <p class="title">新签合同</p>
            <div class="top-box">
              <span>新签合同A</span>
              <button class="btn">删除</button>
              <el-button type="primary">添加新签合同</el-button>
            </div>
            <div class="">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="合同类型" :rules="form.rules">
                  <el-select v-model="form.v7" placeholder="请选择合同类型">
                    <el-option label="续签合同" value="1" />
                    <el-option label="被动新增招商" value="2" />
                    <el-option label="主动新增招商" value="3" />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="合同起止日期"
                  :rules="form.rules"
                  suffix-icon="el-icon-date"
                >
                  <el-date-picker
                    v-model="dtv1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
                <el-form-item label="品牌" :rules="form.rules">
                  <el-select v-model="form.v8" placeholder="请选择品牌">
                    <el-option label="海底捞" value="1" />
                  </el-select>
                </el-form-item>
                <el-form-item label="计租方式" :rules="form.rules">
                  <el-select v-model="form.v9" placeholder="请选择计租方式">
                    <el-option label="固定" value="1" />
                    <el-option label="扣点" value="3" />
                  </el-select>
                </el-form-item>
                <el-form-item label="固定支付周期" :rules="form.rules">
                  <el-select v-model="form.v10" placeholder="请选择">
                    <el-option label="月付" value="1" />
                    <el-option label="季付" value="2" />
                    <el-option label="半年付" value="3" />
                    <el-option label="年付" value="4" />
                  </el-select>
                </el-form-item>
                <el-form-item label="租金单价（元）" :rules="form.rules">
                  <el-input v-model="form.v11" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="扣点支付周期" :rules="form.rules">
                  <el-select v-model="form.v12" placeholder="请选择">
                    <el-option label="月付" value="1" />
                    <el-option label="季付" value="2" />
                    <el-option label="半年付" value="3" />
                    <el-option label="年付" value="4" />
                  </el-select>
                </el-form-item>
                <el-form-item label="销售额方式" :rules="form.rules">
                  <el-select v-model="form.v13" placeholder="请选择">
                    <el-option label="含税" value="1" />
                    <el-option label="不含税" value="2" />
                  </el-select>
                </el-form-item>
                <el-form-item label="预估销售额（元）" :rules="form.rules">
                  <el-input v-model="form.v14" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="扣点" :rules="form.rules">
                  <el-select v-model="form.v15" placeholder="请选择活动区域">
                    <el-option label="12%" value="1" />
                  </el-select>
                </el-form-item>
                <el-form-item label="物管费支付周期" :rules="form.rules">
                  <el-select v-model="form.v16" placeholder="请选择">
                    <el-option label="月付" value="1" />
                    <el-option label="季付" value="2" />
                    <el-option label="半年付" value="3" />
                    <el-option label="年付" value="4" />
                  </el-select>
                </el-form-item>
                <el-form-item label="物管费单价（元）" :rules="form.rules">
                  <el-input v-model="form.v17" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="免租期" :rules="form.rules">
                  <el-date-picker
                    v-model="dtv2"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="btn-group">
            <el-button
              type="primary"
              @click="dialogVisible3 = true"
            >确 定</el-button>
            <el-button
              type="info"
              plain
              @click="dialogVisible3 = false"
            >取消</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="success-dialog4">
        <el-dialog :visible.sync="dialogVisible4" title="拆铺">
          <div class="select-group1">
            <div class="select-item">
              <p>拆铺生效日期</p>
              <el-date-picker v-model="dfv1" type="date" placeholder="选择日期" />
            </div>
            <div class="select-item">
              <p>拆分数量</p>
              <el-select v-model="selectValue2" placeholder="请选择">
                <el-option
                  v-for="item in countOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <p class="notice">
            <i class="el-icon-warning-outline" />
            合铺后生效日当天会将所有被合铺位的合同进行解约，调铺进行中止，空铺产生空置，请确认后再操作
          </p>
          <Table
            :table-data="topTableData"
            :table-columns-config="topTableColumnsConfig"
          />
          <div class="btn-group">
            <el-button
              type="primary"
              @click="dialogVisible3 = true"
            >下一步</el-button>

            <el-button
              type="info"
              plain
              @click="dialogVisible4 = false"
            >取消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Table from '../../budgetModule/components/table'
import { countOptions, projectOptions } from './data.js'
export default {
  name: 'TakeApartShopPop',
  components: {
    Table
  },
  props: {},
  data() {
    return {
      dtv2: '',
      dtv1: '',
      form: {
        v1: '',
        v2: '',
        v3: '',
        v4: '',
        v5: '',
        v6: '',
        v7: '',
        v8: '',
        v9: '',
        v10: '',
        v11: '',
        v12: '',
        v13: '',
        v14: '',
        v15: '',
        v16: '',
        v17: '',
        type: [],
        resource: '',
        desc: '',
        rules: [
          {
            required: true,
            message: '请输入内容'
          }
        ]
      },
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible3: false,
      dialogVisible4: false,
      dfv1: '',
      countOptions: countOptions,
      projectOptions: projectOptions,
      selectValue1: '',
      options1: [],
      selectValue2: '',

      topTableData: [
        {
          v1: 'M-L1-021',
          v2: 'MALL',
          v3: 'L1',
          v4: '否',
          v5: '存在延续合同，合同...'
        },
        {
          v1: 'M-L1-021',
          v2: 'MALL',
          v3: 'L1',
          v4: '否',
          v5: '存在延续合同，合同...'
        },
        {
          v1: 'M-L1-021',
          v2: 'MALL',
          v3: 'L1',
          v4: '否',
          v5: '存在延续合同，合同...'
        }
      ],
      topTableData1: [
        {
          v1: 'M-L1-021',
          v2: 'MALL',
          v3: '100',
          v4: '100',
          v5: '100',
          v6: '1000'
        },
        {
          v1: 'M-L1-021',
          v2: 'MALL',
          v3: '100',
          v4: '100',
          v5: '100',
          v6: '1000'
        },
        {
          v1: 'M-L1-021',
          v2: 'MALL',
          v3: '100',
          v4: '100',
          v5: '100',
          v6: '1000'
        }
      ],
      topTableColumnsConfig: [
        {
          prop: 'v1',
          label: '铺号',
          width: '',
          isSort: false
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
          label: '生效日是否为空铺',
          width: '',
          isSort: false,
          type: ''
        },
        {
          prop: 'v5',
          label: '备注',
          width: '',
          isSort: false
        }
      ],
      topTableColumnsConfig1: [
        {
          prop: 'v1',
          label: '铺号',
          width: '',
          isSort: false
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
          label: '计租面积',
          width: '',
          isSort: false,
          type: ''
        },
        {
          prop: 'v5',
          label: '标准租金',
          width: '',
          isSort: false,
          type: ''
        },
        {
          prop: 'v6',
          label: '标准管理费',
          width: '100',
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
  .el-dialog__wrapper > div {
    margin-top: 5vh !important;
  }
  .el-form-item__content {
    margin-left: 0 !important;
  }

  .el-input--medium .el-input__inner,
  .el-range-editor.el-input__inner {
    width: 246px !important;
    height: 32px;
    background: #fdfcfa;
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
    margin-top: 30px;
    border-bottom: #d1cec9 solid 1px;
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

  .top-box {
    .el-button--medium {
      float: right;
      width: 116px !important;
    }

    > span {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #050101;
    }

    .btn {
      border: none;
      background: none;
      margin-left: 30px;
      color: #1c4c7f;
    }
  }
}

::v-deep.success-dialog4 {
  .el-dialog {
    height: 380px !important;
    width: 860px;
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
  .el-input--medium .el-input__inner {
    width: 200px;
    height: 32px;
    background: #fdfcfa;
    border-radius: 16px;
    border: none;
    color: #050101 !important;
  }
  .el-input--medium .el-input__icon {
    line-height: 32px;
  }
  .notice {
    width: 100%;
    height: 22px;
    background: #fff3d7;
    border-radius: 1px;
    line-height: 22px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #d63b1a;
    margin-top: 19px;
    margin-bottom: 12px;
    text-align: left;
    padding-left: 5px;

    ::v-deep.el-icon-warning-outline {
      font-weight: bold;
    }
  }
}

.success-dialog-desc {
  > p:nth-child(1) {
    font-size: 18px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #050101;
    line-height: 18px;
    margin: 20px auto 16px;
  }

  > p:nth-child(2) {
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
      > p {
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

      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #050101;
        margin-right: 10px;

        i {
          font-weight: bold;
        }
      }
    }
  }

  .btn-group {
    float: right;
    margin-top: 30px;
  }
}
</style>
