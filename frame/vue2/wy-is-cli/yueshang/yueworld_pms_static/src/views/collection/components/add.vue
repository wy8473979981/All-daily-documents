<template>
  <div class="branddetails">
    <div class="top">
      <button class="submit">保存</button>

      <button class="submit cancel">暂存</button>
    </div>
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane label="商家信息" name="first">
        <p class="icon" @click="away">
          收起<i class="el-icon-caret-bottom" />
        </p>
        <el-form v-if="awayShow" class="colum">
          <div class="df">
            <div class="form">
              <el-form-item label="客户名称" required>
                <el-select v-model="format" placeholder="请输入客户名称">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="合同编号" required>
                <el-input
                  v-model="province"
                  placeholder="请输入合同编号"
                />
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="铺位号" required>
                <el-input v-model="code" placeholder="请输入铺位号" />
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="项目名称" required>
                <el-input
                  v-model="alias"
                  placeholder="请输入项目名称"
                />
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="收款单号" required class="deleft">
                <el-input
                  v-model="jtname"
                  placeholder="请输入收款单号"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="品牌名称" required>
                <el-select v-model="nature" placeholder="请选择品牌名称">
                  <el-option label="PMS" value="1" />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane label="收款信息" name="first" class="t">
        <p class="icon" @click="aways">
          收起<i class="el-icon-caret-bottom" />
        </p>
        <el-form v-if="awayShows" class="colum">
          <div class="df">
            <div class="form">
              <el-form-item label="实收金额" required>
                <el-input
                  v-model="value1"
                  placeholder="请输入实收金额"
                />
              </el-form-item>
              <el-form-item label="未名收款" required class="deleft">
                <el-select v-model="value2" placeholder="请选择未名收款">
                  <el-option label="是" value="1" />
                  <el-option label="否" value="2" />
                </el-select>
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="收款方式">
                <el-input
                  v-model="value3"
                  placeholder="--自动带出--"
                />
              </el-form-item>
              <el-form-item label="核算主体">
                <el-input
                  v-model="value4"
                  placeholder="--自动带出--"
                />
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="银行流水">
                <el-input
                  v-model="value5"
                  placeholder="--自动带出--"
                />
              </el-form-item>
              <el-form-item label="收款人">
                <el-input
                  v-model="value6"
                  placeholder="请输入收款人"
                />
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="收款单位">
                <el-select v-model="value7" placeholder="请选择收款单位">
                  <el-option label="AMP" value="1" />
                  <el-option label="PMS" value="2" />
                </el-select>
              </el-form-item>
              <el-form-item label="收款日期">
                <el-date-picker
                  v-model="value8"
                  style="width: 206px"
                  type="date"
                  placeholder="选择日期"
                  suffix-icon="el-icon-date"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="收款银行">
                <el-input
                  v-model="value9"
                  placeholder="--自动带出--"
                />
              </el-form-item>
            </div>
          </div>
          <div class="logo">
            <div class="logo1">
              <el-form-item label="备注/摘要" required class="deleft">
                <el-input
                  v-model="value10"
                  type="textarea"
                  resize="none"
                  style="width:1070px"
                  placeholder="请填写"
                />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'BudgetaApproval',
  components: {},
  data() {
    return {
      awayShow: true, // 商家信息收起
      awayShows: true, // 商家信息收起
      activeName: 'first',
      options: [
        { id: 1, name: '张三' },
        { id: 2, name: '韩阳' },
        { id: 3, name: '李虎' }
      ],
      format: '', // 业态
      tableData: [
        {
          date: '1',
          name: '黄树材',
          province: '下沙',
          city: '黄树材',
          address: '15372964000'
        },
        {
          date: '2',
          name: '许岳兵',
          province: '周山新城',
          city: '许岳兵',
          address: '13585847899'
        },
        {
          date: '3',
          name: '周震斌',
          province: '下沙',
          city: '周震斌',
          address: '15371964000'
        }
      ],
      tableDatas: [
        {
          date: '1',
          name: '项目A',
          names: '2019202102',
          type: '租赁合同',
          off: '是',
          data: '2021-02-03',
          num: '/'
        },
        {
          date: '2',
          name: '项目B',
          names: '2015602102',
          type: '租赁合同',
          off: '是',
          data: '2021-02-03',
          num: '/'
        }
      ],
      show: false,
      // 基本信息竖着来
      province: '', // 合同编号
      code: '', // 铺位号
      alias: '', // 项目名称
      jtname: '', // 收款单号
      nature: '', // 品牌名称

      // 联系人信息
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      value8: '',
      value9: '',
      value10: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    away() {
      this.awayShow = !this.awayShow
    },
    aways() {
      this.awayShows = !this.awayShows
    }
  }
}
</script>
<style lang="scss" scoped>
.branddetails {
  padding: 0 24px;
}
.app-main {
  overflow: scroll !important;
}
* {
  font-family: MicrosoftYaHei;
}
.colum {
  // display: flex;
}
.df {
  display: flex;
  .form {
    width: 206px;
    margin-right: 15px;
  }
}
.logo {
  display: flex;
  .logo1 {
    width: 427px;
    margin-right: 19px;
    ::v-deep.el-textarea__inner {
      height: 96px;
      background: #fdfcfa;
      border-radius: 20px;
      border: none;
      padding: 17px 15px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
    }
  }
  .logo2 {
    width: 427px;
    // display: flex;
    // justify-content: space-evenly;

    .box {
      margin-top: 20px;
      height: 96px;
      background: #fdfcfa;
      border-radius: 20px;
      padding: 10px 12px;
      ul {
        display: flex;

        li {
          display: flex;
          align-items: center;
          // margin-right: 19px;
          margin-bottom: 4px;
          img {
            width: 36px;
            height: 36px;
            background: #ffffff;
            border-radius: 8px;
            margin-right: 4px;
          }
          p {
            font-size: 12px;
            font-family: MicrosoftYaHei;
            color: #848382;
            margin-right: 6px;
          }
          i {
            font-size: 8.84px;
            color: #1c4c7f;
          }
        }
      }
    }
  }
  .btn {
    height: 32px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    position: relative;
    button {
      width: 80px;
      height: 32px;
      text-align: center;
      background: #1c4c7f;
      border-radius: 16px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #ffffff;
      border: none;
      margin: 0 15px;
    }
    i {
      font-size: 32px;
      color: #1c4c7f;
    }
    .popover {
      position: absolute !important;
      top: -33px;
      left: -99px;
      height: 29px;
      display: flex;
      align-items: center;
      width: 235px;
      background: #1c4c7f;
      opacity: 0.9;
      font-size: 12px;
      font-family: MicrosoftYaHei;
      border-radius: 20px;
      color: #fff;
      padding: 5px 8px;
      // position: relative;

      i {
        position: absolute;
        bottom: -12px;
        right: 10px;
        font-size: 20px;
      }
    }
  }
}
//input样式操作
::v-deep.el-form-item--medium .el-form-item__label {
  line-height: 12px;
  margin-bottom: 8px;
  padding-left: 10px;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  color: #050101;
  font-weight: 400;
}
::v-deep.el-form-item {
  margin-bottom: 16px;
}
::v-deep.el-select .el-input__inner {
  background-color: #fdfcfa;
  border-radius: 16px;
  border: none;
  width: 206px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #050101;
  line-height: 14px;
}
::v-deep.el-input--medium .el-input__inner {
  background-color: #fdfcfa;
  border-radius: 16px;
  border: none;
}
.deleft {
  ::v-deep.el-form-item__label {
    padding-left: 1px;
  }

}
.app-main {
  padding: 0 !important;
}
.top {
  padding: 0;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
  .submit {
    width: 86px;
    padding: 9px 16px;
    background: #1c4c7f;
    border-radius: 16px;
    border: none;
    margin-left: 8px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #ffffff;
    line-height: 14px;
  }
  .cancel {
    background: #e5e2de;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #848382;
    line-height: 14px;
  }
}

.tabs {
  ::v-deep.el-input__prefix {
    right: -170px;
  }
  ::v-deep.el-input--prefix .el-input__inner{
    padding-left: 19px;
  }
  padding-bottom: 24px;
  ::v-deep.el-tabs__item {
    font-size: 16px;
    font-family: MicrosoftYaHei;
    color: #050101;
    line-height: 24px;
    height: 24px;
    margin-bottom: 3px;
    padding-left: 9px !important;
    width: 122px;
  }
  ::v-deep.el-tabs__active-bar {
    left: -9px;
    height: 1px;
  }
  ::v-deep.el-tabs__header {
    margin: 0 0 10px;
  }
  ::v-deep.el-tabs__header .el-tabs__nav-wrap::after {
    height: 1px;
  }
  ::v-deep.el-tabs__nav-scroll {
    // overflow: unset;
  }

  ::v-deep.el-tabs__content {
    overflow: unset;
  }
}

//联系人
.icon {
  position: absolute;
  right: 0;
  top: -30px;
  color: #050101;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.icon:hover {
  color: #1c4c7f;
}
.tablelist {
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
  ::v-deep.el-table td,
  .el-table th {
    padding: 0;
  }
  ::v-deep.el-table__row td .cell {
    height: 36px !important;
    line-height: 36px;
  }
  .solt-icon {
    i {
      margin-left: 8px;
    }
  }
}

//提示
</style>
