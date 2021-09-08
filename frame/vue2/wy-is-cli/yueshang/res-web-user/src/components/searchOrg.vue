<!-- 审批单选择中心组件 -->
<template>
<div v-if="show">
<el-dialog class="serach-user-dialog" title="请选择机构" :visible.sync="show" :append-to-body="true" :width="'450px'" v-dialogDrag>
    <div class="list-page">
      <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
        <el-col :span="24" style="display: flex; align-items: center;">
          <div>
            <el-input class="search-input" clearable size="mini" v-model="filterText" placeholder="输入关键字进行过滤"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 申请提前解除合约显示部门tree -->
      <p v-if="sqTree" class="tree-title">商业集团</p>

      <p v-if="sqjtTree" class="tree-title">商业集团</p>
      <div class="content">
        <!-- 机构树 -->
        <div>
           <el-tree
            id="serach-org-tree"
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
            :filter-node-method="filterNode"
            :default-expanded-keys="idArr"
            @node-click="clickNode"
            ref="orgTree"/>
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
    },
    sqjtTree:{
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
        this.getOrgTree();
      }
    },
    filterText(val) {
      this.$refs.orgTree.filter(val);
    }
  },
  methods: {
    hanleDom() {
      this.$nextTick(()=> {
        const tree = document.querySelector('#serach-org-tree');
        const dom = tree.querySelector('.is-current');
        if(!dom) return;
        var realTop = dom.offsetTop;
        var parent = dom.offsetParent;
        while (parent !== tree) {
          realTop += parent.offsetTop;
          parent = parent.offsetParent;
        }
        tree.scrollTop = realTop - 50;
      })
    },
    async getOrgTree() {
      // const enterpriseId = this.userInfo.enterpriseId;
      await reference.getOrgTree().then(res => {
        if(res.code == 1 && res.data){
          this.$set(this,'treeList', res.data);
          // 申请提前解除合约显示部门tree
          if (this.sqTree) {
            this.$set(this,'treeList', res.data[1].children[1].children);
          }
          if(this.sqjtTree) {
            this.$set(this,'treeList', res.data[1].children[2].children);
          }
          // const data = res.data;
          // data[0].children.forEach(e => {
          //   if(e.children.length) {
          //     e.children.forEach(v => {
          //       this.idArr.push(v.id)
          //     })
          //   }
          // })
          // 默认只展开宝龙地产第一级
          this.idArr.push(res.data[1].id)
          // 获取机构回传id展开机构树
          this.idArr.push(this.checkedVal);
          // 定位选中机构
          this.hanleDom();
        }
      }).catch(err => console.log(err));
    },
    // 根据关键字过滤机构树
    filterNode(value, data, node) {
      if (!value) return true
      // return data.text.indexOf(value) !== -1
      return this.chooseNode(value.toLowerCase(), data, node)
    },
    // 过滤父节点 / 子节点 (如果输入的参数是父节点且能匹配，则返回该节点以及其下的所有子节点；如果参数是子节点，则返回该节点的父节点。
    chooseNode(value, data, node) {
      if (data.text.indexOf(value) !== -1) {
        return true
      }
      const level = node.level
      // 如果传入的节点本身就是一级节点就不用校验了
      if (level === 1) {
        return false
      }
      // 先取当前节点的父节点
      let parentData = node.parent
      // 遍历当前节点的父节点
      let index = 0
      while (index < level - 1) {
        // 如果匹配到直接返回
        if (parentData.data.text.indexOf(value) !== -1) {
          return true
        }
        // 否则的话再往上一层做匹配
        parentData = parentData.parent
        index ++
      }
      // 没匹配到返回false
      return false
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
