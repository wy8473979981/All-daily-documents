<template>
  <el-drawer
    :visible.sync="display"
    direction="rtl"
    :append-to-body="true"
    :withHeader="false"
    size="400px" :before-close="cancelDialog">
    <div class="dialog-close-icon" @click="cancelDialog" style="right: 390px;">
      <i></i>
    </div>
    <div class="drawerBudget-detail">
      <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
        <el-col style="text-align: right;">
          <el-button type="success" @click="sure">{{footerBtnSave}}</el-button>
          <el-button plain @click="closeByButton">{{footerBtnCancel}}</el-button>
        </el-col>
      </el-row>
      <div class="con">
        <!-- <slot/> -->
        <div class="drawerBudget-newBunk header-list">
          <el-checkbox :indeterminate="indeterminate" v-model="checkAll" @change="handleCheckAllChange" :class="checkAll ?  '':'unSelectedCheckbox'">全选</el-checkbox>
          <dl v-for="(item,index) in tableHeaders" :key="index" style="margin: 10px 0;color: #333;">
            <dt>
               <el-checkbox :indeterminate="item.indeterminate" v-model="item.selected" @change="handleCheckTopAllChange(item,index,$event)" :class="item.selected ?  '':'unSelectedCheckbox'">{{item.value}}</el-checkbox>
            </dt>
            <dd v-for="(child, childIndex) in item.list" :key="childIndex">
               <el-checkbox v-model="child.selected" @change="handleCheckTopChange(item,index,childIndex,$event)" :class="child.selected ? '':'unSelectedCheckbox'">{{child.value}}</el-checkbox>
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
  data () {
    return {
      checkAll:true,
      indeterminate:false,
    }
  },
  computed: {
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
  mounted () {
    if (this.inner) {
      let box = this.$el.parentNode
      box.style.position = 'relative'
    }
  },
  methods: {
    //全选
    handleCheckAllChange(e) {
      this.checkAll = e;
      this.indeterminate = false;
      this.tableHeaders.map(item =>{
        item.selected = e;
        item.indeterminate = false;
        if(item.list) {
          item.list.map(obj => {
            obj.selected = e
          })
        }
      })
    },
    handleCheckTopAllChange(item,index,e) {
      item.selected = e;
      item.indeterminate = false;
      if(!e) {
        this.indeterminate = true;
      }
      if(item.list) {
        item.list.map(obj =>{
          obj.selected = e
        })
      }
    },
    handleCheckTopChange(item,index,childIndex,e) {
      let selectedCount = item.list.filter(obj=> obj.selected === true).length;
      let unSelectCont = item.list.filter(obj=> obj.selected === false).length;
      if(unSelectCont == 0) {//三级全选
        item.selected = true;
        item.indeterminate = false;
      }else if(selectedCount == 0) {
        item.selected = false;
        item.indeterminate = false;
      }else {
        item.selected = true;
        item.indeterminate = true;
      }
    },
    cancelDialog() {
      this.$emit('update:display', false)
    },
    closeByMask () {
      this.maskClosable && this.$emit('update:display', false)
    },
    closeByButton () {
      this.$emit('update:display', false)
    },
    sure() {
      this.$emit('filterSave', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@styles/common.scss';
.drawer {
  .drawer-head {
    display: flex;
    justify-content: flex-end;
    padding:10px 25px 10px 0;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
    position: absolute;
    width: 100%;
    top:0;
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
<style lang="scss">
  @import '~@styles/common.scss';
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
