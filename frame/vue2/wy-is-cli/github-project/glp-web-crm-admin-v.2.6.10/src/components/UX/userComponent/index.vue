<template>
  <el-dialog
    title="查询成员"
    :visible.sync="visible"
    @close="$emit('update:show', false)"
    width="800px"
    v-if="show"
  >
    <el-form :inline="true" :model="serachParm" class="demo-form-inline" label-width="80px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="成员名称">
            <el-input v-model.trim="serachParm.userName" clearable placeholder="成员名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="onSearchSubmit">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- <div class="height"> -->
      <tableTemplate
        v-loading="isGetList"
        :thead-data="theadData"
        :table-data="tableData"
        @listenSingleEvent="setSingleSelection"
        :selection="false"
        :checkbox="true"
        :maxHeight="'500px'"
      ></tableTemplate>
    <!-- </div> -->
    <!-- 分页插件 -->
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="ok">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script type="text/javascript">
import listMixin from "@/js/mixins/listMixin";
import DataApi from '@/api/common'
import { SelectionOptions } from "@/js/common/consts";
export default {
  mixins: [listMixin],
  components: {},
  name: "clientComponent",
  data: function() {
    return {
      visible: this.show,
      SelectionOptions,
      serachParm: {
        //查询参数
        userName: null
      },
      selectTableRow: {},
      theadData: [
        { checked: true, key: "userName", val: "成员名称",  },
        { checked: true, key: "department", val: "部门" },
        { checked: true, key: "userNo", val: "userNo" }
      ],
      getListUrl: "/fbs-app/user/getPersonList" //列表数据地址
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
      set() {}
    }
  },
  created() {
    this.serachParm = {
      userName: this.name
    };
    this.getList();
  },
  methods: {
    onSearchSubmit() {
      this.getList();
    },
    setSingleSelection(data) {
      this.selectTableRow = data;
    },
    ok() {
      this.visible = false;
      this.$emit("listenEvent", this.selectTableRow);
    },
    getList() {                                     //获取列表数据
      if (this.isGetList == true) { return }
      this.isGetList = true;
      let params = {
          ...this.serachParm,
          page: this.pageInfo.page,
          size: this.pageInfo.size
      }
      DataApi.post(this.getListUrl, params).then(
          res => {
              if (res.code == 200) {
                  let ndata = res.data || {};
                  this.tableData = ndata;
                  this.pageInfo.total = ndata.totalNum || 0;

              } else {
                  this.$message({
                      type: 'warning',
                      message: res.message ? res.message : '系统异常请联系管理员！'
                  })
              }
              this.isGetList = false;
          },
          err => {
              this.isGetList = false;
          }
      )
    },

  }
};
</script>

<style lang="scss" scoped>
  .height{
    height: 600px;
    overflow-y: auto;
  }
</style>
