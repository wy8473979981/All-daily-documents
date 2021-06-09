<template>
  <div class="tool-bar" type="flex" justify="space-between" align="middle">
    <div>
      <ysNSearch :searchList="searchList" :params="params" @searchList="searchApp" @getList="init"></ysNSearch>
    </div>
    <el-row class="tac" :span="24">
      <el-col :span="4" :style="{height: maxHeight + 'px'}">
        <h5>应用列表</h5>
        <el-menu class="el-menu-vertical-demo" :unique-opened="true" :default-active="activeNum" :default-openeds="activeIndex" @select="appSelect" @open="appSelect">
          <div v-for="(item, i) in menuList" :key="i">
            <!-- <el-submenu :key="i" :index="i.toString()" v-if="item.businessesList">
							<template slot="title">
								<span>{{item.appName}}</span>
							</template>
							<el-menu-item-group>
								<el-menu-item v-for="(secItem, index) in item.businessesList" :key="i+'-'+index"
									:index="i+'-'+index">
									{{secItem.businessName}}
								</el-menu-item>
							</el-menu-item-group>
						</el-submenu> -->
            <el-menu-item :key="i" :index="i.toString()">
              <template slot="title">
                <span>{{item.appName}}</span>
              </template>
            </el-menu-item>
          </div>
          <!-- <el-submenu v-for="(item, i) in menuList" :key="i" :index="i.toString()" @click="appSelect(item)" v-if="item.businessesList.length > 0">
						<template slot="title">
							<span>{{item.appName}}</span>
						</template>
						<el-menu-item-group>
							<el-menu-item v-for="(secItem, index) in item.businessesList" :key="index"
								:index="index.toString()">
								{{secItem.businessName}}
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-menu-item v-else>
						<template slot="title">
							<span>{{item.appName}}</span>
						</template>
					</el-menu-item> -->
        </el-menu>
      </el-col>

      <el-col :span="18" :style="{height: maxHeight + 'px'}">
        <h5>已关联的用户列表</h5>
        <el-table :data="checkedList">
          <el-table-column prop="appName" align="center" label="应用名称"></el-table-column>
          <el-table-column prop="userId" align="center" label="用户名"></el-table-column>
          <el-table-column label="操作" align="center" width="80px">
            <template slot-scope="scope">
              <span style="color: #0F96FF;" @click="deleteUser(scope.row,scope.$index)">删除</span>
            </template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import searchList from './config/search.js'
export default {
  data () {
    return {
      expandedList: [],
      activeNum: '',
      activeIndex: ['0'],
      arr: [],
      defaultProps: {
        children: 'childrenList',
        label: 'text',
      },
      menu: [],
      maxHeight: '',
      checkAll: false,
      isIndeterminate: false,
      pageInfo: {
        rows: 10,
        page: 1,
        sum_num: 0
      },
      params: {
        "count": 1,
        "order": "",
        "page": 1,
        "rows": 1000,
        "searchParams": {
          "appId": '',
          "userName": ''
        },
        "sort": "",

      },
      appId: '',
      checkedList: [],
      checkedSureList: [],
      searchList: searchList.limitsManage,
      menuList: [{
        'name': '应用名称1',
        children: [{
          name: '1-1'
        },
        {
          name: '1-2'
        }
        ]
      },
      {
        'name': '应用名称2',
        children: [{
          name: '2-1'
        },
        {
          name: '2-2'
        }
        ]
      }
      ],
      secMenuList: [{
        'name': '开发组1',
        children: [{
          name: '1-1'
        },
        {
          name: '1-2'
        }
        ]
      },
      {
        'name': '开发组2',
        children: [{
          name: '2-1'
        },
        {
          name: '2-2'
        }
        ]
      }
      ]
    }
  },
  mounted () {
    this.maxHeight = document.documentElement.offsetHeight - 200
  },
  watch: {
    'params.searchParams.appId': function (newValue, oldValue) {
      let arr = this.menu.find(item => item.appId == newValue)
      if (arr) {
        this.menuList.splice(0, this.menuList.length)
        this.menuList.push(arr)
      }
      //this.$set([],this.menuList,this.menu.find(item => item.appId == newValue))
    },
  },
  created () {
    this.init()
  },
  methods: {
    appSelect (key, keyPath) {
      this.appId = this.menuList[key].appId
      if (this.menuList[key].businessesList) {
        this.activeIndex = [key]
        this.activeNum = ''
      } else {
        this.activeIndex = []
        this.activeNum = key
      }

      this.getUserLink()
    },
    async getUserLink () {

      let res = await this.$axios.systemManageServe.getUserLinkList({ appId: this.appId })
      if (res.code == 200) {
        this.checkedList = res.data
      }
    },
    async checkSelect (row) {
      row.isCheck = !row.isCheck
      let params = {
        appId: this.appId,
        typeIsAdd: false,
        userId: row.userId
      }
      let res = await this.$axios.systemManageServe.checkSelect(params)
      if (res.code == 200) {
        console.log('勾选成功')
      }
    },
    async searchApp (appName) {
      let res = await this.$axios.systemManageServe.searchApp({
        appName: appName
      })
      if (res.code == 200) {
        searchList.limitsManage[0].selectList = res.data
      }
    },
    async getList (type) {
      let res = await this.$axios.systemManageServe.getAppList(this.params)
      if (res.code == 200) {
        res.data.dataList.map(item => {
          if (item.businessesList.length == 0) {
            item.businessesList = ''
          }
        })
        this.menuList = res.data.dataList
        this.menu = res.data.dataList
        if (type == 'init') {
          this.appId = res.data.dataList[0].appId
        }
      }
    },
    async init () {
      await this.getList('init')
      this.getUserLink()
    },
    deleteUser (item, i) {
      this.checkedList.splice(i, 1)
      this.checkAll = false
      this.isIndeterminate = this.checkedList.length != 0
      this.checkSelect(item, i)
    },
    clear () {
      this.checkedList.map(item => {
        this.checkSelect(item)
      })
      this.checkedList.splice(0, this.checkedList.length)
      this.checkAll = false
      this.isIndeterminate = false

    },
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
  overflow-y: auto;
  height: 720px;
}

.table {
  // margin-top: 16px;
}
.el-tree {
  height: 700px;
  overflow-y: auto;
}
.tac {
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;

  h5 {
    display: flex;
    justify-content: space-between;
    line-height: 35px;
    border-bottom: solid 1px #f0f2f7;
    padding: 0 20px;
    color: #8893a3;
  }

  .el-col {
    border: 1px solid #f0f2f7;
    box-sizing: border-box;
  }

  .el-col:first-child {
    margin-right: 14px;
  }

  .el-submenu__title {
    text-align: left;
  }

  .el-menu {
    border: none;
    .is-opened {
      background-color: #f3f5f7;
    }
    .el-menu-item {
      line-height: 32px;
      height: 32px;
      text-align: left;
      color: #1c1c1c;

      &:hover {
        background-color: #f3f5f7;
      }
      &.is-active {
        background-color: #f3f5f7;
      }
    }

    .el-submenu__title {
      color: #1c1c1c;
      height: 30px;
      line-height: 30px;

      &:hover {
        background-color: #f3f5f7;
      }
      &.is-active {
        background-color: #f3f5f7;
      }
    }
  }

  .checked-list {
    padding: 20px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    li {
      line-height: 24px;
      font-size: 12px;
      color: #1c1c1c;
      padding: 0 6px;
      border: 1px solid #e0e5eb;
      margin-right: 10px;
      min-width: 100px;
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
