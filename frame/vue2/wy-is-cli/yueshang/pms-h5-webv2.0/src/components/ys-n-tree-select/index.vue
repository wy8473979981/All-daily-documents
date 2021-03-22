<template>
  <div class="tree-select">
    <div class="project-selector" @click="statusFilter">
      业态筛选
      <img class="icon-selector-arrow" src="../../assets/images/icon-selector-arrow.png" />
    </div>
    <div class="search-solt" slot="right">
      <div class="search-layout">
        <img class="search-btn" src="../../assets/images/icon-find-search.png" @click="searchConfirm" />
        <van-field v-model="merchantName" placeholder="商家名称筛选" @input="bindKeyInput" @focus="searchFocus" @blur="searchBlur" @keyup.enter.native="searchConfirm" />
      </div>
    </div>

    <div class="filter-modal" v-if="showModal">
      <div class="selected">
        <div class="label">已选</div>
        <div class="selected-list">
          <div v-for="(item, index) in selectedList" :key="index" class="selected-item" @click="remove(item)" :data-id="item.bisShopSortId">
            <div class="item-name">{{item.sortName}}</div>
            <div class="item-clear">X</div>
          </div>
        </div>
      </div>

      <div class="filter-box">
        <div class="filter-box-left">
          <div v-for="(item, index) in merchantList" :key="index" :class="'filter-label-item ' + (currentItem.bisShopSortId===item.bisShopSortId?'active':'')" @click="merchantClick(item)" :data-bisShopSortId="item.bisShopSortId">
            {{item.sortName}}
          </div>
        </div>

        <div class="filter-box-right">
          <div v-for="(item, index) in currentItem.child" :key="index" class="filter-child-box">
            <div class="checkbox" @click="parentChange(item)" :data-id="item.bisShopSortId">

              <van-checkbox v-model="item.checked" shape="square" checked-color="#3A96BD">{{item.sortName}}</van-checkbox>
            </div>
            <div class="checkbox-group">
              <div v-for="(child, index2) in item.child" :key="index2" class="weui-cell weui-check__label" @click="checkboxChange(child)" :data-id="child.bisShopSortId">
                <div class="weui-cell__hd">
                  <van-checkbox v-model="child.checked" shape="square" checked-color="#3A96BD">{{child.sortName}}</van-checkbox>
                </div>
              </div>
            </div>
          </div>
          <div class="empty" v-if="currentItem.child && currentItem.child.length===0">暂无数据</div>
        </div>
      </div>
      <div class="button-box">
        <div class="cancel btn" @click="cancel">取消</div>
        <div class="reset btn" @click="reset">重置</div>
        <div class="confirm btn" @click="confirm">完成</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {
    // showModal: {
    //   type: Boolean,
    //   default: false,
    // }
  },
  computed: {
    ...mapGetters(['getMmerchantList']),
  },
  data() {
    return {
      showModal: false,
      selector: false,
      selectedList: [],
      selectedListDefault: [],
      merchantList: [],
      currentItem: {},
      merchantName: '',
    }
  },
  watch: {},
  mounted() {
    this.merchantList = this.getMmerchantList;
    this.currentItem = this.merchantList[0];
  },
  methods: {
    ...mapMutations([
      'setMerchantList',
    ]),
    remove(item) {
      let id = item.bisShopSortId;
      let selectedList = this.selectedList;
      let { parent, child } = this.findRoot(id);
      child.checked = false;
      selectedList = selectedList.filter(v => v.bisShopSortId !== id);
      parent.checked = parent.child.every(item => item.checked);
      this.setData({
        currentItem: this.currentItem,
        selectedList: selectedList
      });
    },
    merchantClick(item) {
      let id = item.bisShopSortId;
      let result = this.merchantList.find(v => v.bisShopSortId === id);
      this.setData({
        currentItem: result
      });
    },
    parentChange(item) {
      // 点击父类
      let id = item.bisShopSortId;
      let selectedList = this.selectedList;
      let result = this.currentItem.child.find(item => item.bisShopSortId === id);
      result.checked = !result.checked;
      result.child.forEach(v => {
        v.checked = result.checked;

        if (v.checked) {
          if (!selectedList.find(r => r.bisShopSortId === v.bisShopSortId)) {
            selectedList.push(v);
          }
        } else {
          selectedList = selectedList.filter(item => item.bisShopSortId !== v.bisShopSortId);
        }
      });
      this.setData({
        currentItem: this.currentItem,
        selectedList: selectedList
      });
    },
    checkboxChange(item) {
      let id = item.bisShopSortId;
      let selectedList = this.selectedList;
      let { parent, child } = this.findParent(id);
      child.checked = !child.checked;

      if (child.checked) {
        selectedList.push(child);
      } else {
        selectedList = selectedList.filter(item => item.bisShopSortId !== child.bisShopSortId);
      }

      parent.checked = parent.child.every(item => item.checked);
      this.setData({
        currentItem: this.currentItem,
        selectedList: selectedList
      });
    },
    findParent(id) {
      let currentItem = this.currentItem;
      let parent = null;
      let child = null;
      currentItem.child.forEach(item => {
        if (item.child) {
          item.child.forEach(v => {
            if (v.bisShopSortId === id) {
              parent = item;
              child = v;
            }
          });
        }
      });
      return { parent, child };
    },
    findRoot(id) {
      let child = null;
      let parent = null;
      this.merchantList.forEach(item => {
        item.child.forEach(v => {
          if (v && v.child) {
            v.child.forEach(m => {
              if (m.bisShopSortId === id) {
                child = m;
                parent = v;
              }
            });
          }
        });
      });
      return { child, parent };
    },
    defaultChecked() {
      let merchantList = this.merchantList;
      let currentItem = this.currentItem;
      let selectedListDefault = this.selectedListDefault;
      merchantList.forEach(item => {
        item.child.forEach(v => {
          if (v && v.child) {
            v.child.forEach(m => {
              if (selectedListDefault.find(c => c.bisShopSortId === m.bisShopSortId)) {
                m.checked = true;
              }
            });
          }
          v.checked = v.child.every(i => i.checked);
        });
      });
      this.setData({
        selectedList: Object.assign([], selectedListDefault),
        currentItem: currentItem
      });
    },
    searchConfirm: function (e) {
      this.$emit("onMerchantName", this.merchantName);
    },
    bindKeyInput(e) {
      // this.setData({
      //   merchantName: e.detail.value
      // })
    },
    searchFocus: function (e) {
      this.setData({
        selector: true
      });
    },
    searchBlur: function (e) {
      this.setData({
        selector: false
      });
    },
    statusFilter() {
      this.defaultChecked();
      this.setData({
        showModal: !this.showModal
      });
    },
    cancel() {
      this.reset();
      this.setData({
        showModal: false
      });
    },
    reset() {
      this.merchantList.forEach(item => {
        item.child.forEach(v => {
          if (v && v.child) {
            v.checked = false;
            v.child.forEach(m => {
              m.checked = false;
            });
          }
        });
      });
      this.setData({
        merchantList: this.merchantList,
        currentItem: this.merchantList[0],
        selectedList: []
      });
    },
    confirm() {
      let bisShopSortId = [];
      this.selectedList.forEach(item => {
        bisShopSortId.push(item.bisShopSortId);
      });
      let treeSelect = {
        bisShopSortId: bisShopSortId,
        selectedList: this.selectedList
      }
      this.$emit("onSelect", treeSelect);
      this.setData({
        showModal: false,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.tree-select {
  width: 100%;
  display: flex;
}
.search-solt {
  flex: 1;
}
.project-selector {
  margin-right: 20px;
  display: flex;
  align-items: center;
}
.icon-selector-arrow {
  width: 24px;
  height: 12px;
  margin-left: 10px;
}
.search-layout {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  align-items: center;
  overflow: hidden;
}
.search-btn {
  width: 26px;
  height: 26px;
  margin-left: 26px;
  justify-content: center;
}
.search-input-placeholder {
  color: #ffffff;
  font-size: 28px;
}
.search-input {
  color: #ffffff;
  font-size: 28px;
  margin-left: 10px;
}
.filter-modal {
  height: calc(100% - 140px);
  width: 100%;
  background-color: #fff;
  position: fixed;
  top: 140px;
  left: 0;
  z-index: 200;
  color: #000;
}

.selected {
  display: flex;
  align-items: center;
  padding: 32px 30px;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
}
.label {
  // margin-right: 20px;
  font-size: 24px;
  padding: 10px 15px;
}
.selected-list {
  display: flex;
  flex: 1;
  overflow: auto;
}
.selected-item {
  font-size: 24px;
  padding: 10px 15px;
  background-color: rgba(55, 143, 183, 0.1);
  color: #3b96be;
  display: flex;
  margin-left: 25px;
  flex-shrink: 0;
  align-items: center;
}
.item-clear {
  margin-left: 10px;
  height: 0.3rem;
}

.filter-box {
  height: 800px;
  width: 100%;
  display: flex;
}
.filter-box-left {
  width: 260px;
  height: 100%;
  overflow: auto;
  background-color: #f5f5f5;
}
.filter-label-item {
  width: 100%;
  height: 96px;
  line-height: 96px;
  padding-left: 20px;
  border-left: 12px solid transparent;
}
.filter-label-item.active {
  background-color: #fff;
  border-left-color: #3b96be;
  color: #3b96be;
}
.filter-box-right {
  flex: 1;
  background-color: #fff;
  overflow: auto;
}
.filter-child-box {
  padding: 30px;
  border-bottom: 1px solid #f5f5f5;
}
.checkbox-group {
  margin-top: 10px;
}
.weui-cell {
  padding: 10px 0;
}
.comparison {
  width: 80px;
  height: 80px;
  position: fixed;
  line-height: 80px;
  right: 60px;
  bottom: 260px;
  border-radius: 50%;
  background: #89c5fd;
  color: #fff;
  text-align: center;
  z-index: 101;
}

.button-box {
  padding: 30px;
  display: flex;
  justify-content: flex-end;
}
.btn {
  font-size: 28px;
  background-color: #d8d8d8;
  color: #333;
  width: 160px;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  text-align: center;
}
.btn:active {
  opacity: 0.5;
}
.confirm {
  background: linear-gradient(350deg, #37acdd 0%, #1e5385 100%);
  color: #fff;
}
::v-deep .van-checkbox__icon--checked .van-icon {
  background-color: #3b96be;
  border-color: #3b96be;
}
::v-deep .van-cell {
  padding: 0 16px;
  background: transparent;
  .van-field__control {
    color: #fff;
  }
}
</style>
