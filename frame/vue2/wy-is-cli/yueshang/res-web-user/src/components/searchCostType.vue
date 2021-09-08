<!-- 审批单选择目标成本科目组件 -->
<template>
<div v-if="show">
<el-dialog class="serach-user-dialog" title="请选择目标成本科目" :visible.sync="show" :append-to-body="true" :width="'450px'" v-dialogDrag>
    <div class="list-page">
      <div class="content">
        <!-- 目标成本科目树 -->
        <div>
           <el-tree
            id="serach-cost-tree"
            class="org-tree"
            :data="treeList"
            node-key="id"
            :props="{
              children: 'children',
              label: 'text'
            }"
            :current-node-key="checkedVal"
            :highlight-current="true"
            :expand-on-click-node="false"
            :default-expand-all="false"
            :default-expanded-keys="idArr"
            @node-click="clickNode"
            ref="costTree"/>
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
      type: String,
      default: ''
    },
    sqTree: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timeOut: null,
      treeList: [],
      idArr: [],
      filterText: '', // 机构名称过滤用
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
        this.getCostTree();
      }
    },
    filterText(val) {
      this.$refs.costTree.filter(val);
    }
  },
  methods: {
    async getCostTree() {
      await reference.getCostTree().then(res => {
        let arr = [];
        if(res.code == 1 && res.data){
          arr[0] = res.data;
          this.$set(this,'treeList', arr);
          // 默认只展开第一级
          this.idArr.push(res.data.id)
        }
      }).catch(err => console.log(err));
    },
    clickNode(val) {
      // 点击了树节点
      const id = val.id;
      console.log(val)
      this.$emit('close', val)
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
  max-width: 180px;
}
.tree-title {
  padding-top: 10px;
}
.content {
  display: flex;
  padding: 10px 0;
}
.org-tree {
  height: 340px;
  width: 400px;
  overflow-y: auto;
}
.user-list {
  margin-left: 20px;
  height: 340px;
  overflow-y: auto;
}
</style>
<style lang="scss">
  .serach-user-dialog {
    .el-dialog__body {
      padding: 0 20px 20px;
      .tool-bar {
        padding-top: 0;
      }
    }
  }
</style>
