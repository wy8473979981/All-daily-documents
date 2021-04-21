<template>
<view>
<cover-view :class="'app-filter app-filter--' + type" @tap.stop="open">
  <cover-view class="app-filter-title">{{title}}</cover-view>
  <cover-image class="app-filter-icon" src="../../assets/images/icon-arrow.png"></cover-image>
</cover-view>
<cover-view v-if="component.opened" class="app-filter-dialog overlay" @tap.stop="f">
  <cover-view class="app-filter-dialog__main">
    <cover-image class="app-filter-dialog__main__close" src="../../assets/images/icon-close-ffffff.png" @tap.stop="close"></cover-image>
    <cover-view class="app-filter-dialog__main__tip" v-if="tip">{{ tip }}</cover-view>
    <cover-view class="app-filter-dialog__main__body" @tap.stop="fff">
      <cover-view v-if="items.length">
        <cover-view v-for="(group, index) in items" :key="index" class="items" :data-index="index" @tap.stop="itemSelected">
          <cover-view :class="'items-content ' + (component.currentSelectIndex==index?'items-content--selected':'')">
            {{group.title}}
          </cover-view>
          <cover-view v-if="items.length !== index+1" class="items-line"></cover-view>
        </cover-view>
      </cover-view>
    </cover-view>
    <cover-view class="app-filter-dialog__main__actions">
      <button type="primary" @tap.stop="ok">确定</button>
    </cover-view>
  </cover-view>
</cover-view>
</view>
</template>

<script>

export default {
  data() {
    return {
      component: {
        opened: false,
        disabled: false,
        checkboxes: [],
        // items: [],
        selected: {},
        currentSelectIndex: 0
      }
    };
  },

  components: {},
  props: {
    overlay: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "normal" // 'primary', 'normal'

    },
    title: {
      type: String
    },
    tip: {
      type: String
    },
    items: {
      type: Array,
      default: []
    }
  },
  methods: {
    itemSelected(e) {
      let currentIndex = e.currentTarget.dataset.index;
      this.setData({
        "component.currentSelectIndex": currentIndex,
        "component.selected": this.items[currentIndex]
      });
    },

    open() {
      this.setData({
        "component.opened": true
      });
      this.$emit("open");
    },

    close() {
      this.setData({
        "component.opened": false
      });
      this.$emit("close");
    },

    ok() {
      this.close();
      let myEventDetail = this.component.selected;
      this.$emit("chartselected", {
        detail: myEventDetail
      });
    }

  }
};
</script>
<style>
@import "./chartdialog.css";
</style>