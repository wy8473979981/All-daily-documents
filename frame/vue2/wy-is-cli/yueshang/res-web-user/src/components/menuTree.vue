<!-- 新网批列表页左侧树形控件 -->
<template>
<el-container>
  <el-header class="header">
    <!-- 头部 -->
    <el-row type="flex" justify="space-between">
      <el-col class="header-title"><span>{{sysInfo.frontDeskDescribe}}</span> <span>{{sysInfo.frontDeskPrompt}}</span></el-col>
      <el-col class="btn" align="right">
        <i @click="refresh" class="el-icon-refresh-right"></i>
        <el-button @click="loginOldPd" v-if="sysInfo.contentTextFlg" size="mini">合同文本库</el-button>
        <el-button v-if="sysInfo.assistantFlg" @click="showAassistant = true" size="mini">助理设置</el-button> 
        <i @click="showAside = !showAside" v-if="showFull" class="full-screen"></i>
        <span class="user">{{userInfo.username}}</span>
        <!-- <el-button v-if="showLogout" @click="logout" plain type="danger" size="mini">退出登录</el-button> -->
        <el-button v-if="!$route.query.source" @click="logout" plain type="danger" size="mini">退出登录</el-button>
      </el-col>
    </el-row>
  </el-header>
<el-container style="height:calc(100% - 60px)">
<el-aside style="padding-bottom:0" v-show="showAside">
   <el-input
      v-if="sysInfo.frontDeskfilterFlg"
      clearable
      class="filter-text"
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>
  <div class="menu-tree" v-loading="loading">
    <el-tree
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
    </el-tree>
  </div>
</el-aside>
<el-main style="width:500px">
  <router-view :refreshTime="refreshTime" :mode="mode" :showL="showL" :ptype="ptype" :pid="id" :processCode="processCode" :processSysCode="processSysCode" :ptext="ptext" :templateContentId="templateContentId" :breadStr="breadStr"></router-view>
</el-main>
<assistantSet :showAassistant="showAassistant" @close="showAassistant=false"></assistantSet>
</el-container>
</el-container>
</template>

<script>
import moduleTree from '@/apis/apis/tree';
import approval from '@/apis/apis/approval';
import login from '@/apis/apis/login';
import assistantSet from './assistantSet';
import { mapState, mapMutations } from 'vuex';
export default {
  components: {assistantSet},
  props: {
    setStatus: { // 可编辑
      type: Boolean,
      default: false
    }
  },
  inject: ["reload"], //注入reload方法
  data() {
    return {
      breadStr: '', // 面包屑内容
      processCode: '', //节点code
      processSysCode: '',
      showAassistant: false,
      showAside: true,
      showL: false,
      showFull: true,
      id: '',
      mode: 'A',
      ptext: '',
      ptype: '',
      templateContentId: '',
      idArr: [],
      setData: {},
      treeList: [],
      form: {},
      loading: true,
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      refreshTime: 1,
      showLogout: true
    };
  },
  created() {
    // pd跳转后隐藏左侧菜单
    // if (this.$route.query.source == 'pd' || this.$route.query.id) {
    //   this.showAside = false
    // }
    if (this.$route.query.id || this.$route.query.type) {
      this.showAside = false
      this.showLogout = false
    }
    if (this.$route.query.source == 'pd') {
      this.showFull = false
    }
    console.log(this.$route.name)
    if (this.$route.name != 'detail') {
      this.getList()
    }
  },
  computed: {
    ...mapState(['userInfo','sysInfo'])
  },
  methods: {
    ...mapMutations(['saveMenuTreeItem']),
    async logout() {
      await login.logout().then(res => {
        if(res.code == 1){
          localStorage.removeItem('ys_contract_token');
          localStorage.removeItem('spqt_param');
          localStorage.removeItem('spqt_list_param');
          this.$timeoutRouter.push({name: 'login'})
          window.location.reload(true)
        } else {
          this.$message.error(res.$message || '系统错误，请稍后重试');
        }
      }).catch(err => {
        this.$message.error('系统错误，请稍后重试');
      });
    },
    async loginOldPd() {
      const param = {
        loginUiid : this.userInfo.userid
      }
      await approval.loginOldPd(param).then(res => {
        if(res.code == 1 && res.data){
          let url = res.data.data.ssoPdUserUrlList[0].url;
          window.open(url, '_blank')
        }
      }).catch(err => {
        this.$message.error('系统错误，请稍后重试');
      });
    },
    async getList(refresh) {
      const param = {
        enterpriseId: this.userInfo.enterpriseId,
        userId : this.userInfo.userid
      }
      await moduleTree.getModuleTreeList(param).then(res => {
        if(res.code == 1 && res.data){
          console.log(res.data)
          this.$set(this,'treeList', res.data);
          const data = res.data;
           data[0].children.forEach(e => {
            if(e.children.length) {
              this.idArr.push(e.id)
            }
          })
          this.loading = false;
        }
      }).catch(err => {
        this.$message.error('系统错误，请稍后重试');
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.text.indexOf(value) !== -1;
    },
    selMenuTree(n,node,tree) {
      this.breadStr = '';
      this.getTreeNode(node);
      this.mode = '';
      // 递归方式查子节点的所有父节点
      // this.familyTree(this.treeList, n.text)
      // 如果是流程并且没有pcid，判定未上线
      if(n.type == 'process' && !n.attributes.templateContentPcId) {
        this.showL = false;
      } else {
        this.showL = true;
        console.log(this.id,n.id)
        // 重复点击通过refreshTime参数通知刷新
        if(this.id == n.id) {
          console.log(this.refreshTime)
          this.refreshTime += 1;
        }
        this.id = n.id;
        this.ptype = n.type == 'process' ? 'P' : 'M';
        this.processCode = n.type == 'process' ? n.processCode : '';
        this.processSysCode = n.type == 'process' ? n.processSysCode : n.moduleSysCode;
        this.ptext = n.text;
        this.templateContentId = n.attributes.templateContentPcId;
        this.saveMenuTreeItem(n)
        localStorage.setItem('spqt_param',JSON.stringify({id: n.id,ptext: n.text,templateContentId: n.attributes.templateContentPcId}))
      }
      if(this.$route.name != 'list') {
        this.$router.push('list');
      }
    },
    familyTree (arr1, text) {
      var temp = []
      var forFn = (arr, text) => {
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i]
          if (item.text === text) {
            temp.push(item.moduleName)
            forFn(arr1, item.moduleName)
            break
          } else {
            if (item.children) {
              forFn(item.children, text)
            }
          }
        }
      }
      forFn(arr1, text)
      console.log(temp)
      return temp
    },
    setDefaultNode() {
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.data[0].id); 
      });
    },
    refresh() {
      this.reload();
    },
    //获取当前树节点和其父级节点
    getTreeNode(node){
      if (node) {
        if (node.label !== undefined) {
          this.breadStr = this.breadStr ? node.label + '/' + this.breadStr : node.label;
          this.getTreeNode(node.parent); //递归
        }
      }
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
.header {
  height: 47px !important;
  line-height: 47px !important;
  border-bottom: 1px solid #ccc;
  .header-title {
    font-size: 20px;
    span {
      font-size: 14px;
      color: #F5A623;
      margin-left: 10px;
    }
  }
  .full-screen{
    display: inline-block;
    background: url('../assets/images/full_screen.png') no-repeat center top;
    background-size: auto 100%;
    background-origin: content-box;
    width: 16px;
    height: 16px;
    margin-left: 10px;
    vertical-align: middle;
    cursor: pointer;
  }
  .btn {
    i {
      font-size: 20px;
      vertical-align: middle;
    }
    i:nth-child(1) {
      margin-right: 10px;
      cursor: pointer;
    }
    i.fd {
      margin-left: 10px;
      margin-right: 10px;
      transform: rotate(45deg);
    }
    .user {
      margin: 0 10px;
    }
  }
}
.dialog-close-icon{
  right: 562px;
}
::v-deep .menu-tree{
  // height: 100%;
  height:calc(100% - 40px);
  overflow-x: auto;
  overflow-y: auto;
  .el-tree {
    display: inline-block;
    min-width: 100%;
    .el-tree-node__label {
      font-size: 12px !important;
    }
  }
}

::v-deep .filter-text {
    position: relative;
    top: 0px;
    margin-bottom: 10px;
    .el-input__inner{
      height: 30px;
      line-height: 30px;
      border-radius: 2px;
    }
    .el-input__icon{
      line-height: 30px;
    }
  }

.el-main{
  padding: 20px 0;
}

.el-aside{
  padding: 20px;
  border-right: 1px solid #ccc;
  height: 100%;
}

</style>


