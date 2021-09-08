<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="app-page-main">
    <div class="personal-home-left">
      <div class="layout-setting-container">
        <div class="layout-setting-btn">
          <span class="setting-title">页面布局</span>
          <svg-icon icon-class="white-setting" class="ml-12 icon  cursor-pointer" @click="drawerOpen()" />
          <el-drawer ref="drawer" title="" :visible="drawer" :modal="false" :with-header="false" custom-class="drag-drawer">
            <div class="close-btn" @click="drawer=false" />
            <p class="title">页面布局</p>
            <p class="tip" @click="test2()">拖拽下方的模块至个人首页</p>
            <el-row id="items2" :key="String(Math.random()).substr(10)" :gutter="24">
              <el-col v-for="(item,index) in value.filter(el => !el.use)" :key="item.id+index" :span="item.span" :class="item.className">
                <div :class="['grid-content', 'drawer-grid-content', item.className]" :style="{height:halfHeight}">
                  <Audit v-if="item.className=='audit-container'" />
                  <Warning v-if="item.className=='warning-container'" />
                  <Annunciate v-if="item.className=='annunciate-container'" />
                  <Mail v-if="item.className=='mail-container'" />
                  <BusinessServices v-if="item.className=='serve-container'" />
                </div>
              </el-col>
            </el-row>
          </el-drawer>
        </div>
      </div>
      <div class="drag-layout-container">
        <el-row id="items1" :key="String(Math.random()).substr(10)" :gutter="24" type="flex" justify="start">
          <template v-for="(item) in value.filter(el => el.use)">
            <el-col :key="new Date().getTime()-item.id" :span="item.span" :class="item.className">
              <div :class="['grid-content', item.className]" :style="{height:halfHeight}">
                <Audit v-if="item.className=='audit-container'" />
                <Warning v-if="item.className=='warning-container'" />
                <Annunciate v-if="item.className=='annunciate-container'" />
                <Mail v-if="item.className=='mail-container'" />
                <BusinessServices v-if="item.className=='serve-container'" />
              </div>
            </el-col>
          </template>
        </el-row>
      </div>
    </div>
    <div class="personal-home-right">
      <div class="title">快捷访问</div>
      <div v-if="optionsMenuData.length>0" class="option-menu">
        <ul>
          <li v-for="(item,index) in optionsMenuData.slice(0, 10)" :key="index">
            <div class="fast-option-menu">
              <el-link :href="item.path.startsWith('https') ? item.path : ('#'+item.path) " target="_blank">{{ item.title }}</el-link>
            </div>
          </li>
        </ul>
        <div class="options-setting-text" @click="menuClick">自定义</div>
      </div>
      <div v-else class="empty">
        <span class="tip">请点击下方自定义添加快捷菜单</span>
        <div class="options-setting" @click="menuClick">自定义</div>
      </div>
      <MenuDialog v-if="visible" :visible="visible" :default-checkedkeys="defaultCheckedkeys" :options-menu-data="optionsMenuData" @cancelOptionsMenu="cancelOptionsMenu" @saveOptionsMenu="saveOptionsMenu" />
    </div>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
import Audit from './components/audit/index.vue'
import Warning from './components/warning/index.vue'
import Annunciate from './components/annunciate/index.vue'
import BusinessServices from './components/businessServices/index.vue'
import Mail from './components/mail/index.vue'
import MenuDialog from './components/menu/dialog'
export default {
  name: 'PersonalHome',
  components: {
    Audit,
    Warning,
    Annunciate,
    Mail,
    BusinessServices,
    MenuDialog
  },
  data() {
    return {
      value: [
        { id: String(Math.random()).substr(10), name: '审核', span: 24, className: 'audit-container', use: true },
        { id: String(Math.random()).substr(10), name: '预警', span: 12, className: 'warning-container', use: true },
        { id: String(Math.random()).substr(10), name: '通告', span: 12, className: 'annunciate-container', use: true },
        { id: String(Math.random()).substr(10), name: '邮件', span: 24, className: 'mail-container', use: false },
        { id: String(Math.random()).substr(10), name: '商家', span: 24, className: 'serve-container', use: false }
      ],
      drawer: false,
      visible: false,
      halfHeight: '0px',
      optionsMenuData: [
        {
          title: '数据概览',
          path: '/Home/HomeData'
        }, {
          title: '个人首页',
          path: '/Home/PersonalHome'
        }, {
          title: '项目首页',
          path: '/Home/ProjectHome'
        }, {
          title: '租赁图',
          path: 'https://pmstest.powerlong.com/pc_static/#/rp-rental-platform-main'
        }
      ],
      defaultCheckedkeys: [
        '/Home/HomeData', '/Home/PersonalHome', '/Home/ProjectHome', 'https://pmstest.powerlong.com/pc_static/#/rp-rental-platform-main'
      ]
    }
  },
  computed: {
    randomKey: function() {
      return String(Math.random()).substr(10)
    }
  },
  watch: {},
  mounted() {
    this.getHalfHeightFunc()
  },
  methods: {
    drawerOpen() {
      this.drawer = true
      this.$nextTick(() => {
        this.test()
        this.test2()
      })
    },
    getHalfHeightFunc() {
      this.halfHeight = Number(document.querySelector('.drag-layout-container').offsetHeight - 16) / 2 + 'px'
      console.log(this.height, 'height')
    },
    test() {
      var that = this
      var el1 = document.getElementById('items1')
      // 1.根据use的值分成两个数组
      const enableValueList = that.value.filter((item, index) => {
        return item.use
      })
      const disableValueList = that.value.filter((item, index) => {
        return !item.use
      })
      Sortable.create(el1, {
        group: { name: 'shared', pull: false, put: true },
        animation: 150,
        onAdd: function(evt) {
          // 其他列表元素移入到当前列表监听回调
          const { newIndex, oldIndex, item } = evt
          const className = item.className
          if (className.search('audit-container') !== -1) {
            // 从抽屉拖拽出来的是 审核分两种情况
            // 1.use=true的数据有4个;2.use=true的数据有3个
            // 找到当前移动项
            const disableItem = JSON.parse(JSON.stringify(...disableValueList.splice(oldIndex, 1)))
            let removeEnableItemList = null
            if (enableValueList.length > 3) {
              if (newIndex === 3) {
                // enableValueList 保留前两个数据
                removeEnableItemList = enableValueList.splice(2)
              } else if (newIndex === 0 || newIndex === 1 || newIndex === 2) {
                // 将enableValueList中index=newIndex；use=true的元素从newIndex开始取出2个
                removeEnableItemList = enableValueList.splice(newIndex, 2)
              }
            } else {
              if (newIndex === 3) {
                // enableValueList 保留前两个数据
                removeEnableItemList = enableValueList.splice(2, 1)
              } else {
                // 将enableValueList中index=newIndex；use=true的元素从newIndex开始取出1个
                removeEnableItemList = enableValueList.splice(newIndex, 1)
              }
            }
            enableValueList.push(Object.assign({}, { ...disableItem, span: 24, use: true }))
            removeEnableItemList.map((item, index) => {
              disableValueList.push(Object.assign({}, { ...item, span: 24, use: false }))
            })
          } else {
            if (newIndex === 3) {
              const disableItem = JSON.parse(JSON.stringify(...disableValueList.splice(oldIndex, 1)))
              const obj = Object.assign({}, { ...disableItem, span: 12, use: true })
              enableValueList.push(obj)
            } else {
              const enableItem = JSON.parse(JSON.stringify(enableValueList[newIndex]))// 1.在页面使用状态的数组中找到数据
              const disableItem = JSON.parse(JSON.stringify(disableValueList[oldIndex])) // 2.在页面不使用状态的数组中找到数据
              enableValueList[newIndex] = Object.assign({}, { ...disableItem, span: disableItem.id === 1 ? 24 : 12, use: true }) // 3.在对应位置更新数据
              disableValueList[oldIndex] = Object.assign({}, { ...enableItem, span: 24, use: false })
            }
          }
          const ary = [...enableValueList, ...disableValueList]// 合并数据
          that.value = [...JSON.parse(JSON.stringify(ary))]
          that.$nextTick(() => {
            // DOM更新后重新 绑定
            that.test()
            that.test2()
          })
        },
        onEnd: function(evt) {
          const { newIndex, oldIndex, item } = evt
          const className = item.className
          if (className.search('audit-container') !== -1) {
            const item = enableValueList.splice(evt.oldIndex, 1)
            if (evt.oldIndex === 0 && evt.newIndex !== 0) {
              enableValueList.push(...item)
            } else {
              enableValueList.unshift(...item)
            }
          } else {
            const hasCol24 = that.value.some((item, index) => {
              return item.className === 'audit-container'
            })
            // 判断当前数据中是否有 col==24的
            if (hasCol24) {
              const index = enableValueList.findIndex(item => item.className === 'audit-container')
              // 移动项的新下标 等于 审核 模块的现有下标
              if (evt.newIndex === index) {
                if (evt.newIndex === 0) {
                  // 将审核 模块放到 enableValueList 数组末尾
                  enableValueList.push(...enableValueList.splice(index, 1))
                } else if (evt.newIndex === 2) {
                  // 将审核 模块放到 enableValueList 数组头部
                  enableValueList.unshift(...enableValueList.splice(index, 1))
                }
              } else {
                // 替换移动元素数据位置
                const oldEnableItem = enableValueList[oldIndex]
                const newEnableItem = enableValueList[newIndex]
                enableValueList[newIndex] = Object.assign({}, { ...oldEnableItem })
                enableValueList[oldIndex] = Object.assign({}, { ...newEnableItem })
              }
            } else {
              // 替换移动元素数据位置
              const oldEnableItem = enableValueList[oldIndex]
              const newEnableItem = enableValueList[newIndex]
              enableValueList[newIndex] = Object.assign({}, { ...oldEnableItem })
              enableValueList[oldIndex] = Object.assign({}, { ...newEnableItem })
            }
          }
          const ary = [...enableValueList, ...disableValueList]
          that.value = [...JSON.parse(JSON.stringify(ary))]
          console.log('that.value', JSON.stringify(that.value))
          that.$nextTick(() => {
            that.test()
            that.test2()
          })
        }
      })
    },
    test2() {
      const that = this
      const el2 = document.getElementById('items2')
      Sortable.create(el2, {
        group: 'shared',
        animation: 150,
        sort: false,
        onEnd: function(evt) {
          that.$nextTick(() => {
            that.test()
            that.test2()
          })
        }
      })
    },
    handleVisibleClose() {
      this.visible = false
    },
    menuClick() {
      this.visible = true
    },
    cancelOptionsMenu() {
      this.visible = false
    },
    saveOptionsMenu(data) {
      this.visible = false
      this.optionsMenuData = data
      this.defaultCheckedkeys = []
      this.defaultCheckedkeys = this.optionsMenuData.map((item, index) => {
        return item.path
      })
      console.log(this.defaultCheckedkeys)
    }
  }
}

</script>
<style lang="scss" scoped>
.app-page-main {
  margin-top: 4px;
  flex-direction: initial !important;
}
.personal-home-left {
  width: 956px;
  height: 100%;
  ::v-deep .ysn-table .el-table tr > td:first-child:after {
    position: absolute;
    left: 0;
    bottom: -1px;
    display: block;
    content: "";
    height: 100%;
    background: #fdfcfa;
    width: 10px;
  }
  .layout-setting-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
    padding-right: 16px;
    .layout-setting-btn {
      width: 114px;
      height: 32px;
      display: flex;
      align-items: center;
      padding-left: 16px;
      background: #1c4c7f;
      color: #ffffff;
      border-radius: 16px;
      .setting-title {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #ffffff;
        &:after {
          content: "";
          font-size: 0;
          padding: 16px 0px 7px;
          margin-left: 8px;
          border-left: 1px solid rgba(255, 255, 255, 0.2);
        }
      }
      .icon {
        width: 24px;
        height: 24px;
        margin-left: 2px;
      }
    }
    ::v-deep .el-drawer__wrapper {
      width: 450px !important;
      left: inherit;
      color: #000;
      .drag-drawer {
        width: 422px !important;
        .el-drawer__body {
          position: relative;
        }
        .close-btn {
          width: 20px;
          height: 32px;
          position: absolute;
          left: -5px;
          top: 50%;
          cursor: pointer;
          border-right: 4px solid #e5e2de;
        }
      }
    }
  }
  .drag-layout-container {
    width: 100%;
    height: calc(100% - 72px);
    .el-row {
      flex-wrap: wrap;
      width: 100%;
      height: 100%;
      margin-left: -8px !important;
      margin-right: -8px !important;
    }
    .el-col {
      margin-bottom: 16px;
      border-radius: 4px;
      padding-left: 8px !important;
      padding-right: 8px !important;
      &:nth-last-of-type(-n + 2) {
        margin-bottom: 0;
      }
    }
    .grid-content {
      background: #fdfcfa;
      border-radius: 20px;
    }
  }
}
.personal-home-right {
  width: 156px;
  height: calc(100% - 24px);
  background: #fdfcfa;
  border-radius: 20px;
  padding: 24px 16px;
  .title {
    width: 124px;
    height: 32px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    margin-bottom: 24px;
    background: #e5e2de;
    border-radius: 16px;
    font-size: 14px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #050101;
  }
  .option-menu {
    height: calc(100% - 56px);
    ul {
      height: calc(100% - 16px);
      li {
        width: 125px;
        height: 32px;
        background: #1c4c7f;
        border-radius: 16px;
        border: 3px solid #9abbdd;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #ffffff;
        display: flex;
        align-items: center;
        padding: 0 16px;
        margin-bottom: 8px;
        ::v-deep .el-link--inner {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #ffffff;
          height: 100%;
          width: 87px;
          display: block;
          line-height: 26px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .options-setting-text {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #1c4c7f;
      text-align: center;
      cursor: pointer;
    }
  }
  .empty {
    height: calc(100% - 56px);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .tip {
      width: 97px;
      height: 44px;
      font-size: 12px;
      font-family: MicrosoftYaHei;
      color: #848382;
      line-height: 22px;
      text-align: center;
      margin-bottom: 18px;
    }
    .options-setting {
      display: flex;
      align-items: center;
      padding: 0 16px;
      width: 86px;
      height: 32px;
      background: #e5e2de;
      border-radius: 16px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #848382;
      cursor: pointer;
    }
  }
}
::v-deep .drag-drawer {
  .el-drawer__body {
    padding: 80px 32px 10px;
    overflow: scroll;
    background: #f6f5ee;
    box-shadow: -16px 0px 32px 0px rgba(219, 214, 209, 0.46);
    border-radius: 20px 0px 0px 20px;
  }
  .title {
    font-size: 16px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #050101;
  }
  .tip {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #848382;
    margin: 16px 0 32px 0;
  }
  .el-row {
    height: calc(100% - 82px);
  }
  .drawer-grid-content {
    background: #fdfcfa;
    border-radius: 20px;
  }
  .grid-content {
    margin-bottom: 16px;
    // &:last-child{
    //   margin-bottom: 0px;
    // }
  }
}
</style>
