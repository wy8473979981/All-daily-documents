<template>
  <li class="tree-item-li">
    <div class="tree-item-label" @click="activeItem(children)">
      <van-icon v-if="isEnd" :class="!isSelect ? 'rotate-i-90' : 'rotate-i-180'" name="arrow-up" />
      <span v-if="isEnd">{{children.text}}</span>
      <van-checkbox
        v-else
        v-model="isSelect"
        @change="isSelectChange(children, $event)"
        shape="square"
      >{{children.text}}</van-checkbox>
      <!-- <span @click="addUser(children)">{{children.text}}</span> -->
    </div>
    <transition name="van-fade">
      <ul v-if="isEnd && isSelect" class="tree-item-ul">
        <tree-item
          v-for="(item, index) in children.children"
          :key="index"
          :children="item"
        />
      </ul>
    </transition>
  </li>
</template>

<script>
export default {
  name: 'treeItem',
  props: ['children'],
  data () {
    return {
      isSelect: false
    }
  },
  computed: {
    isEnd () {
      return this.children.children && this.children.children.length
    }
  },
  methods: {
    activeItem (item) {
      this.isSelect = !this.isSelect
    },
    isSelectChange (item, $event) {
      if (this.$route.name == '申请延期') {
        // 单选
        this.$store.state.selectUserList = [{
          userName: item.text,
          userCd: item.attributes.loginName
        }]
      } else {
        // 多选
        if ($event) {
          this.$store.state.selectUserList.push({userName: item.text, userCd: item.attributes.loginName})
        } else {
          for (let key in this.$store.state.selectUserList) {
            if (item.attributes.loginName == this.$store.state.selectUserList[key].userCd) {
              this.$store.state.selectUserList.splice(key, 1)
            }
          }
        }
      }
    },
    addUser (item) {
      this.$store.state.selectUserList.push({userName: item.text, userCd: item.attributes.loginName})
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";
$color-header: #257EE2;
$color: #26a2ff;

.tree-item-label {
  font-size: 14px;
  color: #333333;
  border-bottom: 1px solid #ECF0F2;
  height: 36px;
  line-height: 36px;
  span {
    padding-left: 5px;
  }
}
.tree-item-ul {
  transition: all 0.3s;
}
</style>
<style>
.tree-item-li .van-icon-arrow-up {
  transition: all 0.3s;
}
.tree-item-li .rotate-i-90 {
  transform: rotate(90deg);
}
.tree-item-li .rotate-i-180 {
  transform: rotate(180deg);
}
.tree-item-li .van-checkbox {
  height: 36px;
}
.tree-item-li .van-checkbox__icon .van-icon {
  width: 18px;
  height: 18px;
  line-height: 18px;
  display: none;
}
</style>
