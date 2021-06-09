<template>
  <div class="menu-tree" v-loading="loading">
    <el-input
      clearable
      class="filter-text"
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>
    <el-tree
      v-if="showTree"
      class="filter-tree"
      :data="treeList"
      node-key="id"
      :props="defaultProps"
      :highlight-current="true"
      :expand-on-click-node="false"
      :default-expand-all="false"
      :filter-node-method="filterNode"
      :default-expanded-keys="idArr"
      @node-click="selMenuTree"
      ref="tree">
      <span class="custom-tree-node" slot-scope="{ node, data }" @mouseover="mouseOver(data)" @mouseleave="mouseLeave(data)">
        <span>{{ node.label }}</span>
        <span v-if="setStatus" class="tree-set-btn">
          <el-dropdown v-show="data.type == 'module' && data.show" trigger="click" @visible-change="dropdownChange($event, data)" @command="handleCommand">
            <span class="el-dropdown-link" @click.stop>设置</span>
            <el-dropdown-menu class="set-dropdown" slot="dropdown">
              <el-dropdown-item v-show="data.id !== treeList[0].id" command="new">新建平级模块</el-dropdown-item>
              <el-dropdown-item command="new_down">新建下级模块</el-dropdown-item>
              <!-- <el-dropdown-item command="move_down">平级内向下移动</el-dropdown-item>
              <el-dropdown-item command="move_up">平级内向上移动</el-dropdown-item> -->
              <el-dropdown-item v-show="data.id !== treeList[0].id" command="edit">编辑模块</el-dropdown-item>
              <el-dropdown-item v-show="data.id !== treeList[0].id" command="remove">删除模块</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </span>
    </el-tree>
    <!-- 抽屉 -->
    <div>
      <el-drawer
        :visible.sync="fast"
        direction="rtl"
        :append-to-body="true"
        :withHeader="false"
        :wrapperClosable="true"
        size="576px">
        <div class="dialog-close-icon" @click="cancel">
          <i></i>
        </div>
        <div class="drawer-detail">
          <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
            <el-col>
              <h3>{{mParams.titleName}}</h3>
            </el-col>
            <el-col style="text-align: right;">
              <el-button type="success" @click="save">保存</el-button>
              <el-button plain @click="cancel">取消</el-button>
            </el-col>
          </el-row>
          <div class="con">
            <div>
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="d-min">
                    <span>序号</span>
                    <el-input v-model="form.dispOrderNo" class="required" placeholder="请输入"></el-input>
                  </div>
                </el-col>
                <!-- <el-col :span="12">
                  <div class="d-min">
                    <span>模块代码</span>
                    <el-input v-model="form.moduleSysCode" class="required" placeholder="请输入"></el-input>
                  </div>
                </el-col> -->
                <el-col :span="12">
                  <div class="d-min">
                    <span>模块名称</span>
                    <el-input v-model="form.moduleName" class="required" placeholder="请输入"></el-input>
                  </div>
                </el-col>
              </el-row>
              <!-- <el-row :gutter="20">
                
              </el-row> -->
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-checkbox v-model="form.enableFlg">有效</el-checkbox>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import moduleTree from '@/apis/apis/tree';
import { mapState } from 'vuex';
export default {
  props: {
    setStatus: { // 可编辑
      type: Boolean,
      default: false
    },
    pubVue: {
      type: Object
    }
  },
  data() {
    return {
      showTree: true,
      idArr: [],
      setData: {},
      sss: 'ssss',
      treeList: [],
      form: {},
      loading: false,
      fast: false,
      lock: false,
      filterText: '',
      mParams: {
        titleName: '',
        disp_order_no: null,
        module_sys_code: null,
        module_name: '',
        enable_flg: false,
      },
      data: [
        {
          id: 0,
          label: '表单模板',
          show: true,
          children: [
             {
        id: 1,
        label: '宝龙地产',
        show: true,
        children: [{
          id: 11,
          label: '地产',
          // show: false,
          children: [{
            id: 111,
            label: '01-计划管理',
            // show: false,
            children: [{
              id: 1111,
              label: '计划完成审批'
            }, {
              id: 1112,
              label: '计划调整审批'
            }, {
              id: 1113,
              label: '指令单完成审批'
            }, {
              id: 1114,
              label: '五年规划',
              // show: false,
              children: [{
                id: 11111,
                label: '规划1',
              }, {
                id: 11112,
                label: '规划2',
              }]
            }]
          }, {
            id: 112,
            label: '02-绩效管理'
          }, {
            id: 113,
            label: '03-管理体系建设'
          }]
        }]
      }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'text'
      }
    };
  },
  watch: {
  },
  created() {
    this.getList();
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted() {
    // this.setDefaultNode();
    this.pubVue.$on('upDate', () => {
      this.getList()
    })
  },
  methods: {
    refresh() {
      this.showTree = false;
      this.showTree = true;
    },
    async getList(refresh) {
      const param = {
        enterpriseId: this.userInfo.enterpriseId,
        // userId : this.userInfo.userid
      }
      await moduleTree.getModuleTreeList(param).then(res => {
        if(res.code == 1 && res.data){
          this.$set(this,'treeList', res.data);
          const data = res.data;
          data[0].children.forEach(e => {
            if(e.children.length) {
              this.idArr.push(e.id)
              // e.children.forEach(v => {
              //   this.idArr.push(v.id)
              // })
            }
          })
        }
      }).catch(err => {
        this.$message.error('系统错误，请稍后重试');
      });
    },
    // 查询模块详情
    async getDetail(type) {
      const moduleId = this.setData.id;
      await moduleTree.getModuleTreeById(moduleId).then(res => {
        if(res.code == 1 && res.data){
          this.form = res.data;
          this.form.enableFlg = JSON.parse(this.form.enableFlg);
          if(type == 1) {
            // 新建平级
            this.form = {
              parentId: this.form.parentId,
              type: 'module',
              moduleCat: '1',
              enableFlg: true
            }
          }
          if(type == 2) {
            // 新建平级
            this.form = {
              parentId: this.form.id,
              type: 'module',
              moduleCat: '1',
              enableFlg: true
            }
          }
        }
      })
    },
    async save() {
      let param = this.form;
      param.operation = this.mParams.titleName == '编辑模块' ? 'U' : 'S';
      param.userId = this.userInfo.userid;
      param.enterpriseId = this.userInfo.enterpriseId;
      await moduleTree.saveModuleTree(param).then(res => {
        if(res.code == 1 && res.message == 'success'){
        this.$message.success('保存成功');
        this.fast = false;
        this.getList();
        } else {
          if(res.message) {
            this.$message.error(res.message); 
          }
        }
      })
    },
    dealDel() {
      this.$confirm(`确认要删除吗？`).then(() => {
        const moduleId = this.setData.id;
        moduleTree.deleModuleTree(moduleId).then(res => {
          if(res.code == 1 && res.message == 'success'){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getList()
          }
        })
        }).catch(err => console.log(err));
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.text.indexOf(value) !== -1;
    },
    selMenuTree(n) {
      if(!this.setStatus || (n.children && this.setStatus)) {
        this.$emit('selMenu', n)
      }
    },
    mouseOver(data) {
      if(this.lock) {
        return;
      }
      this.$set(data, 'show', true);
    },
    mouseLeave(data) {
      if(!this.lock) {
        this.$set(data, 'show', false);
      }
    },
    dropdownChange(e, data) {
      // 点击设置时的当前data
      this.setData = data;
      console.log(this.setData)
      this.$set(data, 'show', e);
      this.lock = e;
    },
    handleCommand(command) {
      if(command === 'new') {
        this.fast = true;
        this.mParams.titleName = '新建平级模块';
        this.getDetail(1);
      }
      if(command === 'new_down') {
        this.fast = true;
        this.mParams.titleName = '新建下级模块';
        this.getDetail(2);
      }
      if(command === 'move_down') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 500)
      }
      if(command === 'edit') {
        this.fast = true;
        this.mParams.titleName = '编辑模块';
        this.getDetail();
      }
      if(command === 'remove') {
        this.dealDel();
      }
    },
    submit() {

    },
    cancel() {
      this.fast = false;
      this.form = {};
    },
    setDefaultNode() {
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.data[0].id); 
      });
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/common.scss';
.dialog-close-icon{
  right: 562px;
}
.menu-tree{
  width: 300px;
  overflow-x: auto;
  overflow-y: auto;
  height: 100%;
  .el-tree {
    display: inline-block;
    min-width: 100%;
  }
  ::v-deep .filter-text {
    margin-bottom: 10px;
    .el-input__inner{
      height: 32px;
      line-height: 32px;
    }
    .el-input__icon{
      line-height: 32px;
    }
  }
  .custom-tree-node{
    flex: 1;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    >span:first-child{
      font-size: 12px;
      margin-right: 20px;
    }
  }
  .tree-set-btn{
    .el-dropdown-link{
      font-size: 12px;
    }
    
  }
  
  // .el-tree-node__content{
  //   .custom-tree-node{
  //     .tree-set-btn{
  //       display: none;
  //     }
  //   }
  // }
  // .el-tree-node__content:hover{
  //   .custom-tree-node{
  //     .tree-set-btn{
  //       display: block;
  //     }
  //   }
  // }
}

.el-dropdown-menu{
  .el-dropdown-menu__item{
    line-height: 32px;
    font-size: 12px;
  }
}

.con{
  >div{
    >h3{
      margin-bottom: 20px;
    }
    >.el-row{
      margin-bottom: 20px;
    }
  }
}
</style>


