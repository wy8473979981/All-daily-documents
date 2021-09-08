<!-- 设备型号组件 -->
<template>
  <div>
    <el-dialog class="serach-user-dialog" title="设备型号选择" :visible.sync="show" :append-to-body="true" width='680px' v-dialogDrag>
        <div class="list-page">
          <div class="content">
            <!-- 二级设备 -->
            <div class="user-list">
              <el-table
                :data="list1"
                height="340"
                stripe
                @row-click="rowClick1"
                style="width: 100%">
                <el-table-column
                  style="cursor: pointer;"
                  prop="userName"
                  label="二级设备"
                  width="193.3"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.assmModelName}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!-- 三级设备 -->
            <div class="user-list">
              <el-table
                :data="list2"
                height="340"
                stripe
                @row-click="rowClick2"
                style="width: 100%">
                <el-table-column
                  style="cursor: pointer;"
                  prop="userName"
                  label="三级设备"
                  width="193.3"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.assmModelName}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!-- 四级设备 -->
            <div class="user-list">
              <el-table
                :data="list3"
                height="340"
                stripe
                @row-click="rowClick3"
                style="width: 100%">
                <el-table-column
                  style="cursor: pointer;"
                  prop="userName"
                  label="四级设备"
                  width="193.3"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.assmModelName}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>

          </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import reference from '@/apis/apis/reference';
import { mapState } from 'vuex';
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },
    checkedVal: {
      type: Number,
      default: null
    },
    pushShare: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array
    }
  },
  data() {
    return {
      timeOut: null,
      treeList: [],
      idArr: [],
      list1: [],
      list2: [],
      list3: [],
      query: {
        name: ''
      },
      // 已选择三级列表
      checkedList1: [],
      // 已选择四级列表
      checkedList2: [],
      checkedList3: [],
    };
  },
  computed: {
    ...mapState(['userInfo']),
    show: {
      get () {
        return this.open
      },
      set (val) {
        this.$emit('close')
      }
    }
  },
  watch: {
    show(val) {
      if(val) {
        this.selectAssmModel();
      }
    }
  },
  created() {
    // this.getOrgTree();
    // this.findMyDeptUserList();
    // console.log(this.checkedList)
  },
  methods: {
     async selectAssmModel() {
      // const enterpriseId = this.userInfo.enterpriseId;
      await reference.selectAssmModel(this.checkedVal).then(res => {
       if(res.code == 1 && res.data){
          this.list1 = res.data;
          this.list2 = [];
          this.list3 = [];
        }
      }).catch(err => console.log(err));
    },
    async selectAssmModelByParentId(parentId,flag) {
      await reference.selectAssmModelByParentId(parentId).then(res => {
       if(res.code == 1 && res.data){
           if (flag == 1) {
               this.list2 = res.data;
           } else if (flag == 2) {
               this.list3 = res.data;
           }
        }
      }).catch(err => console.log(err));
    },
    reset() {
      this.query.name = ''
    },
    rowClick1(row) {
        this.selectAssmModelByParentId(row.assmModelId,1);
        const arr = {assmModelId:row.assmModelId,assmModelName:row.assmModelName,assmModelStandardId:row.assmModelStandardId,assmName:row.assmName,assmodelCode:row.assmodelCode,hasNum:row.hasNum,projectName:row.projectName,stanNum:row.stanNum};
        this.checkedList1 = arr;
    },
    rowClick2(row) {
        this.selectAssmModelByParentId(row.assmModelId,2);
        const arr = {assmModelId:row.assmModelId,assmModelName:row.assmModelName,assmModelStandardId:row.assmModelStandardId,assmName:row.assmName,assmodelCode:row.assmodelCode,hasNum:row.hasNum,projectName:row.projectName,stanNum:row.stanNum};
        this.checkedList2 = arr;
    },
    rowClick3(row) {
        const arr = {assmModelId:row.assmModelId,assmModelName:row.assmModelName,assmModelStandardId:row.assmModelStandardId,assmName:row.assmName,assmodelCode:row.assmodelCode,hasNum:row.hasNum,projectName:row.projectName,stanNum:row.stanNum};
        this.checkedList3 = arr;
        const result = {
           0:this.checkedList1,1:this.checkedList2,2:this.checkedList3
        }
        this.$emit('close', result)
    }
  }
};
</script>
<style type="text/css" lang="scss" scoped>
@import "~@/assets/styles/common.scss";
.ys-tab-col-color {
  color: #df1717 !important;
}
.ys-text-blue {
  color: #1890ff;
}
.search-input{
  flex: 1;
  min-width: 120px;
  max-width: 200px;
}
.content {
  display: flex;
}
.org-tree {
  height: 340px;
  width: 300px;
  overflow-y: auto;
}
.user-list {
  margin-left: 20px;
  height: 340px;
  overflow-y: auto;
  .select-name {
    width: 195px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: top;
  }
}
</style>
<style lang="scss">
  .serach-user-dialog {
    .el-dialog__body {
      padding: 0 20px 20px;
      .tool-bar {
        padding-top: 0;
      }
      .el-tree-node__expand-icon {
        font-size: 14px;
      }
      .el-table__body-wrapper {
        overflow-y: auto;
      }
      .el-table td {
        cursor: pointer;
      }
      .select-list .el-table .cell {
        line-height: 28px;
      }
    }
  }
</style>
