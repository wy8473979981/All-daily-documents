<template>
  <el-dialog
    title="查询客户"
    :visible.sync="visible"
    @close="$emit('update:show', false)"
    width="800px"
    v-if="show"
  >
    <el-form
      :inline="true"
      :model="serachParm"
      class="demo-form-inline"
      label-width="80px"
      @submit.native.prevent
    >
      <el-row>
        <el-col :span="10">
          <el-form-item label="客户名称">
            <el-input v-model.trim="serachParm.name" clearable placeholder="请输入客户名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <tableTemplate
      v-loading="isGetList"
      :thead-data="theadData"
      :table-data="tableData"
      @listenSingleEvent="setSingleSelection"
      :selection="false"
      :checkbox="true"
    ></tableTemplate>
    <!-- 分页插件 -->
    <paginationTemplate :pageInfo="pageInfo" @getPageChange="getPageChange"></paginationTemplate>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="ok">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import { SelectionOptions } from "@/js/common/consts";
export default {
  mixins: [listMixin],
  components: {},
  name: "consumerComponent",
  data: function() {
    return {
      visible: this.show,
      SelectionOptions,
      serachParm: {
        //查询参数
        customerName: null,
        customerType: null //客户类型
      },
      selectTableRow: null,
      dictTable: null, //字典表
      theadData: [
        { checked: true, key: "name", val: "客户名称" },
        {
          checked: true,
          key: "activityName",
          val: "客户类型",
          isFormat: true,
          formatFn: (item, row) => {
            return row.customerType == "ENTERPRISE" ? "企业客户" : "个人客户";
          }
        },
        { checked: true, key: "certificateId", val: "证件号码" }
      ],
      getListUrl: "/glp-crm/customer/dataAccessListPage" //列表数据地址
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: null
    },
    customerType: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    requestChannel: {
      type: String,
      default: null
    },
    urlType: {
      type: Boolean,
      default: true
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
        return this.visible;
      },
      set() {}
    }
  },
  created() {
    this.serachParm = {
      name: this.name, //客户名称
      type: this.type, //客户筛选类型
      customerType: this.customerType, //客户类型
      requestChannel: this.requestChannel //客户列表的请求来源类
    };

    if (this.urlType) {
      this.getListUrl = "/glp-crm/customer/dataAccessListPage"; //列表数据地址
    } else {
      // 联系人，地址信息，法定代表及实控人，新增的弹窗
      this.getListUrl = "/glp-crm/customer/specialListPage"; //列表数据地址
    }

    this.dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
    this.getList();
  },
  methods: {
    onSearchSubmit() {
      this.toSearch();
    },
    setSingleSelection(data) {
      this.selectTableRow = data;
    },
    ok() {
      if (this.selectTableRow) {
        this.visible = false;
        this.$emit("listenEvent", this.selectTableRow);
      } else {
        this.$message({ type: "warning", message: "请选择客户" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>