<template>
  <el-drawer :visible.sync="display" direction="rtl" :append-to-body="true" :withHeader="false" size="400px" :before-close="cancelDialog">
    <div class="dialog-close-icon" @click="cancelDialog" style="right: 390px;">
      <i></i>
    </div>
    <div class="drawerBudget-detail">
      <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
        <el-col :span="12" style="text-align: left;">
          <span class="drawer-title">{{title}}</span>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-button type="success" @click="sure">{{footerBtnSave}}</el-button>
          <el-button plain @click="closeByButton">{{footerBtnCancel}}</el-button>
        </el-col>
      </el-row>
      <div class="con">
        <!-- <slot/> -->
        <div class="drawerBudget-newBunk header-list">
          <el-checkbox :indeterminate="indeterminate" v-model="checkAll" @change="handleCheckAllChange" :class="checkAll ?  '':'unSelectedCheckbox'">全选</el-checkbox>
          <dl v-for="(item,index) in list" :key="index" style="margin: 10px 0;color: #333;">
            <dt>
              <el-checkbox :indeterminate="item.indeterminate" v-model="item.selected" @change="handleCheckTopAllChange(index,$event)" :class="item.selected ?  '':'unSelectedCheckbox'">{{item.value}}</el-checkbox>
            </dt>
            <dd v-for="(child, childIndex) in item.list" :key="childIndex">
              <el-checkbox v-model="child.selected" @change="handleCheckTopChange(index,childIndex,$event)" :class="child.selected ? '':'unSelectedCheckbox'">{{child.value}}</el-checkbox>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  props: {
    //打开方式
    direction: {
      type: String,
    },
    // 是否打开
    display: {
      type: Boolean
    },
    tableHeaders: {
      type: Array
    },
    // 标题
    title: {
      type: String,
      default: '标题'
    },

    // 是否显示关闭按钮
    closable: {
      type: Boolean,
      default: true
    },

    // 是否显示遮罩
    mask: {
      type: Boolean,
      default: true
    },

    // 是否点击遮罩关闭
    maskClosable: {
      type: Boolean,
      default: true
    },

    // 宽度
    width: {
      type: String,
      default: '400px'
    },

    // 是否在父级元素中打开
    inner: {
      type: Boolean,
      default: false
    },
    footerBtnSave: {
      type: String
    },
    footerBtnCancel: {
      type: String
    }
  },
  data() {
    return {
      checkAll: false,
      indeterminate: false,
      list: null,
    }
  },
  computed: {
    // list: function () {
    //   return JSON.parse(JSON.stringify(this.tableHeaders))
    // },
    maskClass: function () {
      return {
        'mask-show': (this.mask && this.display),
        'mask-hide': !(this.mask && this.display),
        'inner': this.inner
      }
    },
    mainClass: function () {
      return {
        'main-show': this.display,
        'main-hide': !this.display,
        'inner': this.inner
      }
    },
    mainStyle: function () {
      return {
        width: this.width,
        right: this.display ? '0' : `-${this.width}`,
        borderLeft: this.mask ? 'none' : '1px solid #eee'
      }
    }
  },
  mounted() {
    if (this.inner) {
      let box = this.$el.parentNode
      box.style.position = 'relative'
    }
    this.list = JSON.parse(JSON.stringify(this.tableHeaders));
  },
  methods: {
    //全选
    handleCheckAllChange(e) {
      this.checkAll = e;
      this.indeterminate = false;
      this.list.map(item => {
        item.selected = e;
        item.indeterminate = false;
        if (item.list) {
          item.list.map(obj => {
            obj.selected = e
          })
        }
      })
    },
    handleCheckTopAllChange(index, e) {
      this.list.map((item, i) => {
        if (i == index) {
          item.selected = e;
          item.indeterminate = false;
          if (!e) {
            this.indeterminate = true;
          }
          if (item.list) {
            item.list.map(obj => {
              obj.selected = e
            })
          }
        }
      })
      console.log(this.list);
    },
    handleCheckTopChange(index, childIndex, e) {
      this.list.map((item, i) => {
        if (i == index) {
          let selectedCount = item.list.filter(obj => obj.selected === true).length;
          let unSelectCont = item.list.filter(obj => obj.selected === false).length;
          if (unSelectCont == 0) {//三级全选
            item.selected = true;
            item.indeterminate = false;
          } else if (selectedCount == 0) {
            item.selected = false;
            item.indeterminate = false;
          } else {
            item.selected = true;
            item.indeterminate = true;
          }
        }
      })
      console.log(this.list);
    },
    cancelDialog() {
      this.$emit('update:display', false)
    },
    closeByMask() {
      this.maskClosable && this.$emit('update:display', false)
    },
    closeByButton() {
      this.$emit('update:display', false)
    },
    sure() {
      this.$emit('filterSave', { tableHeaders: this.list, flag: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@styles/common.scss";
.drawer {
  .drawer-head {
    display: flex;
    justify-content: flex-end;
    padding: 10px 25px 10px 0;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
    position: absolute;
    width: 100%;
    top: 0;
    right: 0;
    .close-btn {
      display: inline-block;
      cursor: pointer;
      height: 100%;
      padding-left: 20px;
    }
  }

  .drawer-body {
    font-size: 14px;
    padding: 15px;
    overflow-y: scroll;
    height: 580px;
    padding-bottom: 20px;
  }
  .con {
    dl {
      line-height: 28px;
      color: #333;
    }
  }
}
</style>
<style lang="scss" scoped>
.el-drawer {
  outline: none;
}
.drawer-title {
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 28px;
}
.el-drawer .report-label {
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: bold;
  line-height: 41px;
  color: #333;
}

.el-drawer__body {
  outline: none;
}

.dialog-close-icon {
  right: 288px;
  width: 25px;
  height: 142px;
  background-color: #fff;
  position: fixed;
  top: 50%;
  margin-top: -71px;
  // border-radius: 13px;
  cursor: pointer;
}

.dialog-close-icon i {
  display: block;
  border: 6px solid transparent;
  border-left: 6px solid #98a9bc;
  position: absolute;
  top: 50%;
  left: 3px;
  margin-top: -6px;
}

.drawerBudget-detail .fast-top-bar {
  padding: 0 20px;
  height: 44px;
  outline: none;
  align-items: center;
  background-color: #f2f4f6;
}

.drawerBudget-detail .fast-top-bar button {
  border-radius: 0;
}

.drawerBudget-detail .fast-top-bar .el-button--success {
  background: linear-gradient(298deg, #468ceb 0%, #35abff 100%);
  border: 0;
  padding: 8px 17px;
}

.drawerBudget-detail .fast-top-bar .el-button--default {
  border: 0;
  padding: 8px 17px;
}

.drawerBudget-detail .con {
  padding: 0 50px;
  height: calc(100vh - 84px);
  overflow-y: auto;
}

.drawerBudget-detail .con .drawerBudget-newBunk {
  padding-top: 20px;
}

.header-list dl {
  line-height: 28px;
}

.drawerBudget-detail .el-checkbox__input {
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  display: inline-block;
  line-height: 1;
  position: relative;
  vertical-align: middle;
}

.header-list .is-checked .el-checkbox__label {
  color: #333;
}

.header-list dd {
  margin-left: 15px;
}
.header-list {
  dl {
    line-height: 28px;
  }
  .unSelectedCheckbox {
    .el-checkbox__label {
      color: #999;
    }
  }
  .is-checked {
    .el-checkbox__label {
      color: #333;
    }
  }
}
</style>
