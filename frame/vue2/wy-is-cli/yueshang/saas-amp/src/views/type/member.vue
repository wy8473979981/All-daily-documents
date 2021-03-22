<template>
  <div>
    <el-dialog
      :visible.sync="fast"
      width="900px"
      class="member-dialog"
      :before-close="cancel"
      :close-on-click-modal="false">
      <div class="drawer-detail">
        <div class="member-box">
          <div class="member-select">
            <h3 class="min-title">选择成员</h3>
            <div class="d-min">
              <el-input v-model="filterText" @keyup.enter.native="onKeyupEnter" @blur="filterTextBlur" placeholder="输入姓名点击回车进行过滤"></el-input>
              <el-button style="margin-left: 30px;" @click="submit" size="mini" type="success">确认添加</el-button>
              <div class="member-tree">
                <el-tree
                  v-if="showtree"
                  v-loading="isLoading"
                  element-loading-text="加载中"
                  element-loading-spinner="el-icon-loading"
                  ref="tree"
                  node-key="id"
                  :data="memberData"
                  :props="defaultProps"
                  show-checkbox
                  :filter-node-method="filterNode"
                  @check="handleCheckChange">
                </el-tree>
              </div>
            </div>
          </div>
          <div class="member-list">
            <h3 class="min-title">成员列表</h3>
            <!-- <el-button @click="memberDel" size="mini" type="success">新增</el-button> -->
            <el-button class="member-del" @click="memberDel" size="mini" type="info" plain>批量删除</el-button>
            <div class="d-min">
              <el-table height="400" ref="table" :data="tableDataUser" size="mini" border header-row-class-name="table-header" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" fixed />
                <el-table-column label="序号" width="50">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column min-width="120" label="成员" show-overflow-tooltip prop="user_name" />
                <el-table-column min-width="120" label="部门" show-overflow-tooltip prop="department" />
              </el-table> 
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TypeApi from '@/apis/apis/typeApi'
export default {
  name: 'Member',
  props: ['open', 'id'],
  data() {
    return {
      showtree: true,
      isLoading: false,
      filterText: null,
      memberData: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      info: {
        users: [], //角色名称
      },
      tableDataUser: []
    }
  },
  created() {
    this.getMemberList()
  },
  computed: {
    fast: {
      get() {
        return this.open
      },
      set(val) {
        this.$emit('close', {fast: false})
      }
    }
  },
  watch: {
    id(nv, v) {
      if(nv) {
        // this.getMemberList()
        this.getList()
      }else{
        this.info = {
          users: [], //角色名称
        }
      }
    },
    filterText(val) {
      // setTimeout(() => {
      //   this.$refs.tree.filter(val)
      // }, 1000)
      
    }
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    // 成员树
    async getMemberList() {
      this.isLoading = true
      await TypeApi.userDropDown().then(res => {
        if(res.code === 200 && res.result){
          this.memberData.push(res.result[0])
          this.memberData.push(res.result[1])
        }
      })
      this.isLoading = false
    },
    // 添加成员列表
    async getList() {
      await TypeApi.userList({project_id: this.id}).then(res => {
        if(res.code === 200 && res.result){
          this.tableDataUser = res.result
        }
      })
    },
    onKeyupEnter() {
      this.isLoading = true
      setTimeout(() => {
        this.$refs.tree.filter(this.filterText)
        this.isLoading = false
      }, 2000)
    },
    filterTextBlur() {
      if(!this.filterText) {
        this.isLoading = true
        setTimeout(() => {
          this.$refs.tree.filter(this.filterText)
          this.isLoading = false
        }, 2000)
      }
    },
    filterNode(value, data) {
      // console.log(value, data)
      if (!value) return true
      return data.text.indexOf(value) !== -1
    },
    // 选中菜单树返回值
    handleCheckChange (data, dataList) {
      let memList = []
      for (let key in dataList.checkedNodes) {
        if (dataList.checkedNodes[key].children.length == 0) {
          memList.push({
            user_id: dataList.checkedNodes[key].userCd,
            user_name: dataList.checkedNodes[key].text,
            department: dataList.checkedNodes[key].label
          })
        }
      }
      this.info.users = memList
    },
    resetData() {
      this.info = {
        users: [], //角色名称
      }
    },
    submit() {
      if(!this.info.users[0]) return this.$message.error('请选择成员')
      TypeApi.userAdd({project_id: this.id, ...this.info}).then(res => {
        if(res.code === 200){
          this.getList()
          this.resetData()
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys([])
            this.$refs.tree.getCheckedNodes([])
          })
          this.showtree = false
          setTimeout(()=>{
            this.showtree = true
          })
        }
      })
    },
    cancel() {
      // this.resetData()
      this.showtree = false
      setTimeout(()=>{
        this.showtree = true
      })
      this.fast = false
    },
    // 选中序号
    handleSelectionChange(val) {
      this.idArr = val.map(item => Number(item.relationId))
    },
    // 批量删除
    memberDel() {
      this.$confirm(`确认要删除吗？`).then(() => {
        TypeApi.userDel({relationId: this.idArr}).then(res => {
          if(res.code === 200){
            this.getList()
          }
        })
      })
    },
  }
}
</script>

<style scoped lang="scss">
@import '~@styles/common.scss';
.member-box {
  display: flex;
  .member-select {
    width: 100%;
    padding: 10px;
    .member-tree {
      max-height: 364px;
      overflow: auto;
    }
  }
  .member-list {
    width: 100%;
    padding: 10px;
    position: relative;
    .member-del {
      position: absolute;
      top: 3px;
      right: 10px;
    }
  }
  .min-title {
    margin-bottom: 20px;
  }
}
</style>
<style>
.member-dialog .el-dialog {
  margin-top: 4vh!important;
  /* height: calc(100vh - 8vh);
  margin-bottom: 4vh!important; */
}
.member-box .member-select .el-input {
  width: 258px;
}
.member-box .member-select .el-input__inner {
  width: 258px;
  height: 36px;
  border-color: transparent;
  background-color: #F2F4F6;
  border-radius: 2px;
}
.member-box .member-select .member-tree .el-tree-node__label {
  padding-left: 10px;
}
</style>
