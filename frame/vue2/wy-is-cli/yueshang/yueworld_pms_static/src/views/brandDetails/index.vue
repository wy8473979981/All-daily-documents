<template>
  <div class="branddetails">
    <div class="top">
      <button class="submit">提交OA审批</button>
      <button class="submit">提交修改</button>
      <button class="submit cancel">取消</button>
    </div>
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane label="基本信息" name="first">
        <el-form class="colum">
          <div class="df">
            <div class="form">
              <el-form-item label="品牌名">
                <el-input v-model="brandName" placeholder="请输入品牌名" />
              </el-form-item>
              <el-form-item label="业态">
                <el-select v-model="format" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="重点发展省份">
                <el-input v-model="province" placeholder="请输入重点发展省份" />
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="品牌编码">
                <el-input v-model="code" placeholder="请输入品牌品牌编码" />
              </el-form-item>
              <el-form-item label="连锁/单店" required class="deleft">
                <el-select v-model="chain" placeholder="请选择">
                  <el-option label="连锁" value="1" />
                </el-select>
              </el-form-item>
              <el-form-item label="主要城市分布">
                <el-input v-model="city" placeholder="请输入主要城市分布" />
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="品牌别名">
                <el-input v-model="alias" placeholder="请输入品牌别名" />
              </el-form-item>
              <el-form-item label="开店方式" required class="deleft">
                <el-select v-model="mode" placeholder="请选择">
                  <el-option label="品牌自营" value="1" />
                  <el-option label="连锁" value="2" />
                </el-select>
              </el-form-item>
              <el-form-item label="客单价(元)">
                <el-input v-model="money" placeholder="请输入客单价(元)" />
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="品牌等级">
                <el-select v-model="leave" placeholder="请选择活动区域">
                  <el-option label="A" value="1" />
                  <el-option label="B" value="2" />
                </el-select>
              </el-form-item>
              <el-form-item label="集团名称" required class="deleft">
                <el-input v-model="jtname" placeholder="请输入集团名称" />
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="phone" placeholder="请输入联系电话" />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="经营性质">
                <el-select v-model="nature" placeholder="请选择活动区域">
                  <el-option label="直营" value="1" />
                </el-select>
              </el-form-item>
              <el-form-item label="总部地址" required class="deleft">
                <el-input v-model="adress" placeholder="请输入总部地址" />
              </el-form-item>
              <el-form-item label="官网地址">
                <el-input v-model="place" placeholder="请输入官网地址" />
              </el-form-item>
            </div>
          </div>
          <div class="logo">
            <div class="logo1">
              <el-form-item label="品牌名称" required class="deleft">
                <el-input
                  v-model="ppname"
                  type="textarea"
                  resize="none"
                  placeholder="请输入品牌名称"
                />
              </el-form-item>
            </div>
            <div class="logo2">
              <el-form-item label="logo" required class="deleft">
                <div class="box">
                  <ul>
                    <li v-for="item in 3" :key="item">
                      <img
                        src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2583035764,1571388243&fm=26&gp=0.jpg"
                        alt=""
                      />
                      <p>animal.jpeg</p>
                      <i class="el-icon-check" />
                    </li>
                  </ul>
                  <ul>
                    <li v-for="item in 3" :key="item">
                      <img
                        src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2583035764,1571388243&fm=26&gp=0.jpg"
                        alt=""
                      />
                      <p>animal.jpeg</p>
                      <i class="el-icon-check" />
                    </li>
                  </ul>
                </div>
              </el-form-item>
            </div>
            <div class="btn">
              <button>上传</button>
              <i class="el-icon-question icons" @click="showoff" />
              <div v-if="show" class="popover">
                只能上传jpg/png格式，且不超过500kb
                <i class="el-icon-caret-bottom" />
              </div>
            </div>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane label="联系人信息" name="first" class="t">
        <i class="el-icon-circle-plus icon" />
        <el-form class="colum">
          <div class="df">
            <div class="form">
              <el-form-item label="姓名">
                <el-input v-model="username" placeholder="请输入姓名" />
              </el-form-item>
              <el-form-item label="联系人状态" required class="deleft">
                <el-select v-model="state" placeholder="请选择联系人状态">
                  <el-option label="有效" value="1" />
                  <el-option label="无效" value="2" />
                </el-select>
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item v-model="job" label="职位">
                <el-input placeholder="请输入职位" />
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item v-model="tel" label="固定电话">
                <el-input placeholder="请输入固定电话" />
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item v-model="mobile" label="手机">
                <el-input placeholder="请输入手机" />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="邮箱">
                <el-input v-model="meil" placeholder="请输入邮箱" />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane label="合作商家" name="first" class="t">
        <div class="tablelist">
          <el-table
            :data="tableData"
            style="width: 100%; font-size: 10px"
            @sort-change="sort_change"
            :header-cell-style="rowClass"
          >
            <el-table-column
              prop="date"
              type="index"
              :index="indexMethod"
              label="序列"
              width="60"
            >
              <template slot="header">
                <span>序列</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="公司名称" sortable>
              <template slot="header">
                <span>公司名称</span>
                <img
                  v-if="lists.name == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                />
                <img
                  v-else-if="lists.name == 'descending'"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt=""
                />
                <img
                  v-else
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt=""
                /> </template
            ></el-table-column>
            <el-table-column prop="address1" label="所属项目" sortable>
              <template slot="header">
                <span>所属项目</span>
                <img
                  v-if="lists.address1 == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                />
                <img
                  v-else-if="lists.address1 == 'descending'"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt=""
                />
                <img
                  v-else
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt=""
                />
              </template>
            </el-table-column>
            <el-table-column prop="address2" label="法人" sortable>
              <template slot="header">
                <span>法人</span>
                <img
                  v-if="lists.address2 == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt=""
                />
                <img
                  v-else-if="lists.address2 == 'descending'"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt=""
                />
                <img
                  v-else
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt=""
                />
              </template>
            </el-table-column>
            <el-table-column prop="address3" label="电话" sortable>
              <template slot="header">
                <span>电话</span>
                <img
                  v-if="lists.address3 == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt="" />
                <img
                  v-else-if="lists.address3 == 'descending'"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt="" />
                <img
                  v-else
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt="" /></template
            ></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane label="合作项目" name="first">
        <i class="el-icon-circle-plus icon" />
        <div class="tablelist">
          <el-table
            :data="tableDatas"
            style="width: 100%; height: 300px; font-size: 10px"
            :header-cell-style="rowClass1"
            @sort-change="sort_change"
          >
            <el-table-column
              type="index"
              :index="indexMethod"
              label="序列"
              width="80"
            />
            <el-table-column prop="name" label="项目名" sortable>
              <template slot="header">
                <span>项目名</span>
                <img
                  v-if="lists.name == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt="" />
                <img
                  v-else-if="lists.name == 'descending'"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt="" />
                <img
                  v-else
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt=""
              /></template>
            </el-table-column>
            <el-table-column prop="names" label="合同名" sortable>
              <template slot="header">
                <span>合同名</span>
                <img
                  v-if="lists.names == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt="" />
                <img
                  v-else-if="lists.names == 'descending'"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt="" />
                <img
                  v-else
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt=""
              /></template>
            </el-table-column>
            <el-table-column prop="type" label="合同类型" sortable>
              <template slot="header">
                <span>合同类型</span>
                <img
                  v-if="lists.type == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt="" />
                <img
                  v-else-if="lists.type == 'descending'"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt="" />
                <img
                  v-else
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt="" /></template
            ></el-table-column>
            <el-table-column prop="off" label="是否正常解约" sortable>
              <template slot="header">
                <span>是否正常解约</span>
                <img
                  v-if="lists.off == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt="" />
                <img
                  v-else-if="lists.off == 'descending'"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt="" />
                <img
                  v-else
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt="" /></template
            ></el-table-column>
            <el-table-column prop="data" label="到期日" sortable>
              <template slot="header">
                <span>到期日</span>
                <img
                  v-if="lists.data == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt="" />
                <img
                  v-else-if="lists.data == 'descending'"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt="" />
                <img
                  v-else
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt="" /></template
            ></el-table-column>
            <el-table-column prop="num" label="到期天数" sortable>
              <template slot="header">
                <span>到期天数</span>
                <img
                  v-if="lists.num == 'ascending'"
                  src="@/assets/imges/17.png"
                  width="20"
                  alt="" />
                <img
                  v-else-if="lists.num == 'descending'"
                  src="@/assets/imges/19.png"
                  width="20"
                  alt="" />
                <img
                  v-else
                  src="@/assets/imges/16pt／排序@2x.png"
                  width="20"
                  alt="" /></template
            ></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "BrandDetails",
  components: {},
  data() {
    return {
      lists: {},
      activeName: "first",
      options: [
        { id: 1, name: "零售" },
        { id: 2, name: "服装" },
        { id: 3, name: "女装" },
      ],
      format: "", // 业态
      tableData: [
        {
          date: "1",
          name: "黄树材",
          province: "下沙",
          city: "黄树材",
          address: "15372964000",
          address1: "下沙",
          address2: "黄树材",
          address3: "15372964000",
        },
        {
          date: "2",
          name: "许岳兵",
          province: "周山新城",
          city: "许岳兵",
          address: "13585847899",
          address1: "周山新城",
          address2: "许岳兵",
          address3: "13585847899",
        },
        {
          date: "3",
          name: "周震斌",
          province: "下沙",
          city: "周震斌",
          address: "15371964000",
          address1: "下沙",
          address2: "周震斌",
          address3: "15371964000",
        },
      ],
      tableDatas: [
        {
          date: "1",
          name: "项目A",
          names: "2019202102",
          type: "租赁合同",
          off: "是",
          data: "2021-02-03",
          num: "/",
        },
        {
          date: "2",
          name: "项目B",
          names: "2015602102",
          type: "租赁合同",
          off: "是",
          data: "2021-02-03",
          num: "/",
        },
      ],
      show: false,
      // 基本信息竖着来
      brandName: "", // 平排名
      province: "", // 发展省份
      code: "", // 编码
      chain: "", // 连锁
      city: "",
      alias: "",
      mode: "",
      money: "",
      leave: "",
      jtname: "",
      phone: "",
      nature: "",
      adress: "",
      place: "",
      ppname: "",
      // 联系人信息
      username: "",
      state: "",
      job: "",
      tel: "",
      mobile: "",
      meil: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    sort_change(column, prop, order) {
      this.lists = {};
      const rops1 = column.prop;
      this.lists[rops1] = column.order;
      console.log(column.order);
      console.log(column, "---", prop, order);
    },
    rowClass({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex);
      if (columnIndex === 4) {
        return "border-bottom-right-radius: 20px;border-top-right-radius: 20px;";
      }
    },
    rowClass1({ row, column, rowIndex, columnIndex }) {
      console.log(columnIndex);
      if (columnIndex === 6) {
        return "border-bottom-right-radius: 20px;border-top-right-radius: 20px;";
      }
    },
    indexMethod(index) {
      return index + 1;
    },
    sort() {
      this.tableData = this.tableData.reverse();
    },
    showoff() {
      console.log(1111);
      this.show = !this.show;
    },
  },
};
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
  ::v-deep.caret-wrapper {
    display: none;
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
  font-size: 16px;
  color: #485f47;
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
::v-deep.el-popover {
}
</style>
