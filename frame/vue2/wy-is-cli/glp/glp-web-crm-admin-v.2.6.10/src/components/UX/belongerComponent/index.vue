<template>
  <el-dialog title="查询用户" :visible.sync="visible" @close="$emit('update:show', false)" width="800px">
    <el-form :inline="true" :model="serachParm" class="demo-form-inline" label-width="80px" @submit.native.prevent>
      <el-row>
        <el-col :span="24">
          <el-form-item label="用户姓名">
            <el-input v-model.trim="serachParm.userName" clearable placeholder="请输入用户姓名"></el-input>
          </el-form-item>
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
      <el-button @click="show = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import DataApi from "@/api/common";
export default {
  mixins: [listMixin],
  components: {},
  name: "belongerComponent",
  data: function () {
    return {
      visible: this.show,
      pageInfo: {
        total: 0,
        size: 10,
        page: 1
      },
      serachParm: {
        serachParm: ""
      },
      selectTableRow: null,
      theadData: [{ checked: true, key: "userName", val: "用户姓名" }]
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    lockingStatus: {
      type: String,
      default: null
    },
    isUserAppId: {
      type: Boolean,
      default: true
    },
    businessCode: {
      type: String,
      default: null
    },
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
  created() { },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      //获取列表数据
      let params = {
        type: "00",
        businessCode: this.businessCode,
        appId: this.isUserAppId ? process.env.APP_ID : null,
        lockingStatus: this.lockingStatus || null,
        userName: this.serachParm.userName,
        page: this.pageInfo.page,
        size: this.pageInfo.size
      };
      DataApi.getUserList(params).then(res => {
        if (res.code == 200) {
          let ndata = res.data || {};
          this.tableData = ndata.items || [];
          this.pageInfo.total = ndata.totalNum || 0;
        } else {
          this.$message({
            type: "warning",
            message: res.message ? res.message : "系统异常请联系管理员！"
          });
        }
      });
    },
    onSearchSubmit() {
      this.pageInfo.page = 1;
      this.pageInfo.total = 0;
      this.getList();
    },
    setSingleSelection(data) {
      this.selectTableRow = data;
    },
    ok() {
      if (this.selectTableRow) {
        this.visible = false;
        this.$emit("listenEvent", this.selectTableRow);
      } else {
        this.$message({ type: "warning", message: "请选择用户" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>