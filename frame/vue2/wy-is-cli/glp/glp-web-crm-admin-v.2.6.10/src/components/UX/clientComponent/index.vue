<template>
  <el-dialog title="查询客户" :visible.sync="visible" @close="$emit('update:show', false)" width="800px" v-if="show">
    <el-form :inline="true" :model="serachParm" class="demo-form-inline" label-width="80px" @submit.native.prevent>
      <el-row>
        <el-col :span="10">
          <el-form-item label="客户名称">
            <el-input v-model.trim="serachParm.customerName" clearable placeholder="请输入客户名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <tableTemplate v-loading="isGetList" :thead-data="theadData" :table-data="tableData" @listenSingleEvent="setSingleSelection" :selection="false" :checkbox="true"></tableTemplate>
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
  name: "clientComponent",
  data: function () {
    return {
      visible: this.show,
      SelectionOptions,
      serachParm: {
        //查询参数
        customerName: null
      },
      selectTableRow: null,
      theadData: [
        { checked: true, key: "customerName", val: "客户名称" },
        { checked: true, key: "activityName", val: "所属市场活动" },
        { checked: true, key: "channelName", val: "市场活动渠道" }
      ],
      getListUrl: "/glp-crm/activity/queryCustomer" //列表数据地址
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
        return this.visible;
      },
      set() { }
    }
  },
  created() {
    this.serachParm = {
      customerName: this.name
    };
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