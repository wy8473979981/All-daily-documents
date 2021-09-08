<template>
	<!-- 通讯录 -->
  <div class="app-page-get">
    <app-ysn-nav-bar title="通讯录" :left-arrow="true" @close="pageClose"></app-ysn-nav-bar>
    <van-row type="flex">
      <van-col span="24">
        <app-ysn-search :search="query.search" @changeText="changeText"></app-ysn-search>
      </van-col>
    </van-row>
    <!-- 搜索模块 -->
    <van-row>
      <van-col span="24">
        <app-ysn-contact :list="contactList" @levelChange="levelChange" @selectItem="selectItem" @saveUserList="saveUserList"></app-ysn-contact>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import iconFilter from "../../assets/images/icon-filter.png";
export default {
  name: "app-page-get",
  data() {
    return {
      pageType: 0,
      query: {
        value: '',
        type: 0
      },
      title2: '涉及职能',
      active: 0,
      iconFilter: iconFilter,
      contactList: [],
      cId: '',
      contactIndex: 0,
      contactLevel: [''],
      contactArray: [],
      selectedList: [], // 存储选取数据
      isSearch: false
    }
  },
  watch: {
    '$store.state.contactIndex'(n) {
      console.log('level='+n)
    }
  },
  beforeRouteLeave(to,from,next){
    this.selectedList = []
    this.saveSelected(this.contactArray)
    console.log("selectedList==",this.selectedList)
    this.$store.commit('setReceiverList', this.selectedList)
    this.$store.commit('setContactArray', this.contactArray)
    next()
  },
  created() {
    this.contactIndex = 0
    this.$store.commit('setContactIndex', 0)
    this.contactArray = this.$store.state.contactArray || []
    this.initData()
  },
  methods: {
    async initData(type) {
      this.isSearch = false
      const {uiid, token} = this.$store.state.user
      await this.$axios.common.getWabTreePosApp({uiid,token,id: this.cId,value: this.query.value}).then(res => {
        console.log('获取通讯录列表：', res)
        if(res && res.data) {
          if(2 !== type && this.contactArray && this.contactArray.length > 0) {
            this.getStatus(this.contactArray,this.cId,(sta) => {
              if(sta) {
                res.data.forEach(item => {
                  if(sta.id === item.id) item.selected = true
                })
              }
            })
          }
          this.contactList = res.data
          const arr = []
          res.data.forEach(item => {
            const {entityName,id,position,orgOrUser,uiid} = item
            if(2 !== type) {
              if(this.contactIndex > 0) {
                arr.push({entityName,id,position,orgOrUser,uiid,pId: this.cId,child: []})
              }else{
                if(this.contactArray.length < 2) {
                  this.contactArray.push({entityName,id,position,orgOrUser,uiid,pId: this.cId,child: []})
                }
              }
            }
          })
          if(2 === type) {
            this.dealArray(this.contactArray,this.cId)
          }
          if(arr.length > 0) {
            this.getObj(this.contactArray,this.cId,arr)
          }
        }
      }).catch(res => {
      })
    },
    async searchData() {
      this.isSearch = true
      const {uiid, token} = this.$store.state.user
      await this.$axios.common.searchUserList({uiid,token,value: this.query.value}).then(res => {
        console.log('获取通讯录查询：', res)
        if(res && res.data) {
          const selectedUser= this.$store.state.selectedBox.selectedUser || []
          res.data.map(item => {
            item.orgOrUser = '0'
            selectedUser.forEach(user => {
              if(user.createrId === item.uiid) {
                item.selected = true
              }
            })
          })
          this.contactList = res.data
          this.contactIndex ++
          this.$store.commit('setContactIndex',this.contactIndex)
        }
      })
    },
    changeText(val) {
      this.query.value = val
      if(val) {
        this.searchData()
      }else{
        this.contactIndex = 0
        this.$store.commit('setContactIndex',this.contactIndex)
        this.contactList = []
        this.initData()
      }
    },
    levelChange(item) {
      this.cId = item.id
      this.contactLevel.push(item.id)
      this.contactIndex ++
      this.$store.commit('setContactIndex', this.contactIndex)
      this.initData()
    },
    pageClose() {
      console.log('close page')
      if(this.contactIndex > 0) {
        this.contactIndex --
        const del = this.contactLevel.pop()
        this.cId = this.contactLevel[this.contactIndex]
        this.$store.commit('setContactIndex', this.contactIndex)
        this.initData(2)
      }
    },
    // 选中用户
    selectItem({id,selected}) {
      if(this.isSearch) {
        return
      }
      this.getArray(this.contactArray,id,selected)
    },
    // 选中某个用户
    getArray(data,id,bl) {
      if(data) {
        data.forEach(item => {
          if(item.id === id) {
            item.selected = bl
            return true
          }
          if(item.child && item.child.length > 0) {
            this.getArray(item.child,id,bl)
          }
        })
      }
    },
    // 对应id 添加child
    getObj(data,id,arr) {
      if(data) {
        data.forEach(item => {
          if(item.id === id) {
            if(item.child.length === 0) item.child = arr
            return true
          }
          if(item.child && item.child.length > 0) {
            this.getObj(item.child,id,arr)
          }
        })
      }
    },
    // 后退判断文件夹是否全选
    dealArray(data,id) {
      // console.log("id="+id,data)
      if(data) {
        let isAll = true
        data.forEach(item => {
          if(!item.selected) {
            isAll = false
          }else{
            this.getArray(this.contactList,item.id,true)
          }
        })
        if(isAll) {
          this.getArray(this.contactList,id,true)
          this.getArray(this.contactArray,id,true)
        }
        data.forEach(item => {
          if(item.child && item.child.length > 0) {
            this.dealArray(item.child,item.id)
          }
        })
      }
    },
    // 获取当前id的selected
    getStatus(data,id,fun) {
      if(data) {
        data.forEach(item => {
          if(item.id === id) {
            console.log("TTTTTTitem=",item)
            if(item.child) {
              item.child.forEach(ite => {
                if(ite.selected) {
                  return fun?fun(ite):true
                }else{
                  return fun?fun():false
                }
              })
            }
          }
          if(item.child && item.child.length > 0) {
            this.getStatus(item.child,id,fun)
          }
        })
      }
    },
    saveSelected(data,fun) {
      data.forEach(item => {
        if(item.orgOrUser === '0' && item.selected) {
          this.selectedList.push({createrId: item.uiid, createrName: item.entityName,receiverId: item.uiid, receiverName: item.entityName})
        }
        if(item.child && item.child.length > 0) {
          this.saveSelected(item.child,fun)
        }
      })
    },
    saveUserList() {
      this.$store.commit('setContactIndex',0)
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
