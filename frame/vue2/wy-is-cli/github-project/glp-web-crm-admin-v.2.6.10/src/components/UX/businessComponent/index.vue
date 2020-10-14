<template>
  <div>
    <el-dialog title="查询工商信息" :visible.sync="visible" @close="$emit('update:show', false)" width="800px" v-if="show">
      <el-form :inline="true" :model="serachParm" ref="searchForm" :rules="rules" class="demo-form-inline" label-width="80px" @submit.native.prevent>
        <el-row>
          <el-col :span="10">
            <el-form-item label="企业名称" prop="identification">
              <el-input v-model.trim="serachParm.identification" placeholder="请输入企业名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="onSearchSubmit">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <tableTemplate :thead-data="theadData" :table-data="tableData" @listenEvent="setSingleSelection" :selection="false" :checkbox="false"></tableTemplate>
      <!-- 分页插件 -->
      <!-- <paginationTemplate :pageInfo="pageInfo" @getPageChange="getPageChange"></paginationTemplate> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="工商信息详情" :visible.sync="infoVisible" width="800px">
      <div class="base-info-section">
        <el-row class="row-item base-info-section" :gutter="20">
          <el-col :span="12">
            <label>企业名称:</label>
            <span>{{enterpriseDetail.name}}</span>
          </el-col>
          <el-col :span="12">
            <label>社会信用代码:</label>
            <span>{{enterpriseDetail.uniscid}}</span>
          </el-col>
          <el-col :span="12">
            <label>企业类型:</label>
            <span>{{enterpriseDetail.entType}}</span>
          </el-col>
          <el-col :span="12">
            <label>组织机构代码:</label>
            <span>{{enterpriseDetail.licid}}</span>
          </el-col>
          <el-col :span="12">
            <label>法定代表人:</label>
            <span>{{enterpriseDetail.legalPerson}}</span>
          </el-col>
          <el-col :span="12">
            <label>登记机关:</label>
            <span>{{enterpriseDetail.regOrg}}</span>
          </el-col>
          <el-col :span="12">
            <label>企业状态:</label>
            <span>{{enterpriseDetail.entstatus}}</span>
          </el-col>
          <el-col :span="12">
            <label>注册资本:</label>
            <span>{{enterpriseDetail.regCapital}}</span>
          </el-col>
          <el-col :span="12">
            <label>地址:</label>
            <span>{{enterpriseDetail.address}}</span>
          </el-col>
          <el-col :span="12">
            <label>认缴资本:</label>
            <span>{{enterpriseDetail.actualPay}}</span>
          </el-col>
          <el-col :span="12">
            <label>成立日期:</label>
            <span>{{enterpriseDetail.esDate}}</span>
          </el-col>
          <el-col :span="12">
            <label>经营期限:</label>
            <span>{{enterpriseDetail.operationDate}}</span>
          </el-col>
          <el-col :span="24">
            <label>一般经营范围:</label>
            <span>{{enterpriseDetail.operationScope}}</span>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ok">回填信息</el-button>
        <el-button @click="closeDetail">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import { SelectionOptions } from "@/js/common/consts";
import DataApi from "@/api/common";
export default {
  mixins: [listMixin],
  components: {},
  name: "businessComponent",
  data: function () {
    return {
      visible: this.show,
      infoVisible: false,
      SelectionOptions,
      serachParm: {
        identification: null
      },
      rules: {
        //校验规则
        identification: [
          {
            required: true,
            message: "请至少输入2位",
            trigger: ["blur", "change"]
          },
          { min: 2, max: 50, message: "请至少输入2位", trigger: "blur" }
        ]
      },
      selectTableRow: null,
      enterpriseDetail: {
        actualPay: null, //认缴资本
        address: null, //地址
        entType: null, //企业类型
        entstatus: null, //企业状态
        esDate: null, //成立日期
        legalPerson: null, //法人
        licid: null, //组织机构代码
        name: null, //企业名称
        operationDate: null, //经营期限
        operationScope: null, //一般经营范围
        regCapital: null, //注册资本
        regOrg: null, // 登记机关
        uniscid: null //统一社会信用代码(证件号)
      },
      theadData: [
        { checked: true, key: "name", val: "企业名称" },
        {
          checked: true,
          key: "isBtns",
          val: "操作",
          checkRight: false,
          btnItems: this.setBtnItems(),
          width: "200px"
        }
      ],
      getListUrl: "/glp-crm/customer/graph/ent/list" //列表数据地址
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ""
    }
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  computed: {
    isShow: {
      get() {
        console.log(this.visible, "this.visible");
        return this.visible;
      },
      set() { }
    }
  },
  created() {
    this.serachParm = {
      identification: this.name
    };
  },
  mounted() {
    if (this.name) {
      this.$nextTick(function () {
        this.onSearchSubmit();
      });
    }
  },
  methods: {
    getList() {
      //获取列表数据
      if (this.isGetList == true) {
        return;
      }
      this.isGetList = true;
      let params = {
        ...this.serachParm,
        page: this.pageInfo.page,
        size: this.pageInfo.size
      };
      DataApi.post(this.getListUrl, params).then(
        res => {
          if (res.code == 200) {
            let ndata = res.data || {};
            this.tableData = ndata || [];
            this.pageInfo.total = ndata.totalNum || 0;
          } else {
            this.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
          this.isGetList = false;
        },
        err => {
          this.isGetList = false;
        }
      );
    },
    closeDetail() {
      this.infoVisible = false;
    },
    setBtnItems() {
      let items = [];
      items.push({
        name: "查看",
        type: "text",
        func: this.detailFunc
      });
      return items;
    },
    detailFunc(item) {
      let detailUrl = `/glp-crm/customer/graph/ent/info/${item.id}`;
      DataApi.get(detailUrl).then(
        res => {
          if (res.code == 200) {
            let ndata = res.data || {};
            this.enterpriseDetail = ndata;
            this.infoVisible = true;
          } else {
            this.$message({
              type: "warning",
              message: res.message ? res.message : "系统异常请联系管理员！"
            });
          }
          this.isGetList = false;
        },
        err => {
          this.isGetList = false;
        }
      );
    },
    onSearchSubmit() {
      this.$refs["searchForm"].validate(valid => {
        if (valid) {
          this.pageInfo.page = 1;
          this.pageInfo.total = 0;
          this.getList();
        }
      });
    },
    setSingleSelection(data) {
      this.selectTableRow = data;
    },
    ok() {
      this.infoVisible = false;
      this.visible = false;
      this.$emit("listenEvent", this.enterpriseDetail);
    }
  }
};
</script>

<style lang="scss" scoped>
.base-info-section {
  label {
    font-weight: normal;
    color: #333;
  }
}
.row-item {
  font-size: 14px;
  margin-bottom: 20px;
  p {
    line-height: 24px;
    padding: 0 10px;
  }
  .el-col {
    display: flex;
    justify-content: left;
    .vm {
      vertical-align: middle;
      margin: 2px 5px 0 0;
    }
  }
  .align-center-item {
    align-items: center;
  }
  label {
    flex-shrink: 0;
    line-height: 1.5em;
  }
  span {
    color: #888;
    word-break: break-all;
    line-height: 1.5em;
  }
}
.row-item:last-child {
  margin-bottom: 0px;
}
.green {
  color: #078e34;
}
.tc {
  text-align: center;
}
.base-info-section .row-item label {
  color: #3a3131;
  font-weight: normal;
  margin: 0 5px 25px 0;
  display: inline-block;
}
.base-info-section .row-item span {
  color: #888888;
}
</style>