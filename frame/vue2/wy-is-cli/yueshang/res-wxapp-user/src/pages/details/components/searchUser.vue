<template>
  <!-- 选择人员 -->
  <van-popup
    v-model="fast"
    round
    position="bottom"
    :style="{ height: '95%' }"
  >
    <van-search
      class="search-name"
      v-model="searchValue"
      @input="onInput"
      :clearable="false"
      placeholder="请输入员工名称"
    />
    <div class="select-user">
      <span v-for="(item, index) in selectUserList" :key="index" @click="del(index)">{{ item.userName }}</span>
    </div>
    <van-loading v-if="!this.$store.state.bljtOrgTreeList.text" color="#468CEB" />
    <tree-menu v-else-if="!searchValue"></tree-menu>
    <ul v-else class="search-list">
      <li :class="{'select-list': item.isSelect}" v-for="(item, index) in searchValueList" :key="index" @click="add(item)">
        <p><span class="search-name">{{ item.userName }}</span>[{{ item.loginName }}]</p>
        <p><span>部门：</span>{{ item.deptName }}</p>
        <p><span>职位：</span>{{ item.positionName }}</p>
        <!-- <van-checkbox
          v-model="item.isSelect"
          @change="isSelectChange(item, $event)"
          shape="square"
        >
          <p><span class="search-name">{{ item.userName }}</span>[{{ item.loginName }}]</p>
          <p><span>部门：</span>{{ item.deptName }}</p>
          <p><span>职位：</span>{{ item.positionName }}</p>
        </van-checkbox> -->
      </li>
    </ul>
    <div class="select-btn">
      <van-button type="info" @click="fast = false">确定</van-button>
    </div>
  </van-popup>
</template>
<script>
import { mapState } from "vuex"
import treeMenu from "@/components/treeMenu"
import approval from '@/apis/apis/approval'
export default {
  data() {
    return {
      searchValue: '',
      searchValueList: [],
      isSelect: false,
    }
  },
  props: ['open'],
  computed: {
    ...mapState(['userInfo', 'selectUserList']),
    fast: {
      get () {
        // 弹窗外删除人员，点击弹窗重新显示所选
        if (this.open && this.searchValueList.length > 0) {
          this.searchValueList.forEach(item1 => {
            item1.isSelect = false
            this.selectUserList.forEach(item2 => {
              // 已选人员回显
              if (item1.loginName == item2.userCd) {
                item1.isSelect = true
              }
            })
          })
        }
        return this.open
      },
      set (val) {
        this.$emit('close', {fast: false})
      }
    }
  },
  components: {
    treeMenu
  },
  created() {
    
  },
  mounted() {

  },
  methods: {
    // 模糊查询宝龙人员列表
    getUserDetail (val) {
      const param = {
        enterpriseId: this.userInfo.enterpriseId,
        searchValue: val
      }
      approval.getUserDetail(param).then(res => {
        if(res.code == 1){
          this.searchValueList = res.data || []
          this.searchValueList.forEach(item1 => {
            item1.isSelect = false
            this.selectUserList.forEach(item2 => {
              // 已选人员回显
              if (item1.loginName == item2.userCd) {
                item1.isSelect = true
              }
            })
          })
        } else {
          this.$toast.fail(res.message)
        }
      })
    },
    // 选中人员
    add (item) {
      item.isSelect = true
      if (this.$route.name == '申请延期') {
        // 单选
        this.$store.state.selectUserList = [{
          userName: item.userName,
          userCd: item.loginName
        }]
      } else {
        // 多选
        for (let key in this.selectUserList) {
            if (item.loginName == this.selectUserList[key].userCd) {
              item.isSelect = false
              this.selectUserList.splice(key, 1)
              return
            }
          }
        this.selectUserList.push({userName: item.userName, userCd: item.loginName})
      }
    },
    // 删除人员
    del (index) {
      this.selectUserList.splice(index, 1)
    },
    isSelectChange (item, $event) {
      if ($event) {
        this.selectUserList.push({userName: item.userName, userCd: item.loginName})
      } else {
        for (let key in this.selectUserList) {
          if (item.loginName == this.selectUserList[key].loginName) {
            this.selectUserList.splice(key, 1)
          }
        }
      }
    },
    onInput (val) {
      if (val) {
        // 模糊搜索防抖
        const vm = this
        clearTimeout(vm.timer)
        vm.timer = setTimeout(() => {
          this.getUserDetail(val)
        }, 500)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";

.van-loading {
  text-align: center;
  margin-top: 15px;
}
.select-user {
  padding: 0 10px 10px;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 10px solid #ECF0F2;
  span {
    display: block;
    background-color: #F4F5F5;
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    padding: 0 5px;
    margin: 0 5px 5px 0;
  }
}
.search-list {
  overflow-y: auto;
  height: calc(100% - 170px);
  padding: 0;
  li {
    padding: 5px 10px;
    border-bottom: 1px solid #ECF0F2;
    p {
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      span {
        color: #757575;
      }
      .search-name {
        color: #333333;
        font-size: 16px;
        padding-right: 5px;
      }
    }
  }
  .select-list {
    background-color: #F4F5F5;
    border-color: #FFFFFF;
  }
}
.select-btn {
  width: 100%;
  padding: 0 12px;
  position: fixed;
  bottom: 25px;
}
</style>
<style>
.search-name .van-field {
  padding-right: 5px;
}
.search-name .van-field__control {
  padding-left: 0;
}
.search-name .van-field__left-icon {
  margin: 0 5px;
}
.select-btn .van-button--info {
  width: 100%;
}
</style>
