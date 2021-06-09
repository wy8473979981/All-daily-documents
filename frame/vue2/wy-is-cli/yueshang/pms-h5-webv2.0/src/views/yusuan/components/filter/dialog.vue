<template>
  <div v-if="component.opened">
    <div :class="'app-filter app-filter--' + type">
      <slot></slot>
    </div>
    <div v-if="component.opened" class="app-filter-dialog overlay">
      <div class="app-filter-dialog__main">
        <img class="app-filter-dialog__main__close" src="@/assets/images/icon-close-ffffff.png" @click="close" />
        <div class="app-filter-dialog__main__body">
          <div class="items__items">
            <div v-for="(item, itemi) in component.items" :key="itemi" :class="'item-item ' + (component.selectedId === item.value.budgetSheetId ? 'selected ' : '') + (component.budgetSheetId == item.value.budgetSheetId ? 'selected ' : '')" @click="onItemClick" :data-value="JSON.stringify(item.value)">
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="app-filter-dialog__main__actions">
          <van-button type="primary" @click="ok">确定</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { projectPageMap } from "@/views/yusuan/datasource";

export default {
  data () {
    return {
      component: {
        opened: false,
        items: [],
        projectName: null,
        projectId: null,
        budgetSheetId: null,
        selected: {},
        selectedId: null,
      },
    };
  },
  components: {},
  props: {
    type: {
      type: String,
      default: "",
    },
    projectId: {
      type: String | Number,
      default: "",
    },
    budgetSheetId: {
      type: String | Number,
      default: "",
    },
    projectName: {
      type: String,
      default: "全部",
    },
    opened: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: function () {
        return [];
      },
    },
    selected: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  watch: {
    budgetSheetId: {
      handler: function (newValue) {
        this.setData({
          "component.budgetSheetId": newValue,
        });
      },
      immediate: true,
    },
    projectId: {
      handler: function (newValue) {
        this.setData({
          "component.projectId": newValue,
        });
      },
      immediate: true,
    },
    projectName: {
      handler: function (newValue) {
        this.setData({
          "component.projectName": newValue,
        });
      },
      immediate: true,
    },
    opened: {
      handler: function (newValue) {
        this.setData({
          "component.opened": newValue,
        });
      },
      immediate: true,
    },
    items: {
      handler: function (newValue) {

        if (newValue && this.component.budgetSheetId) {
          let selected = newValue.find(item => {
            return item.value.budgetSheetId == this.component.budgetSheetId
          })
          this.setData({
            "component.selected": selected.value,
          });
        }

        this.setData({
          "component.items": newValue === "" ? [] : newValue,
        });
      },
      immediate: true,
      deep: true,
    },
    selected: {
      handler: function (selected) {
        this.setData({
          selected: selected.map((item) => (typeof item === "string" ? item : JSON.stringify(item))),
        });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    close () {
      try {
        this.$util.showTabStatus('true', 'true')
        this.setData({
          "component.opened": false,
          "component.budgetSheetId": this.$route.query.budgetSheetId,
          "component.selected": null,
          "component.selectedId": null,
        });
        this.$emit("closed");
      } catch (e) {
        console.log(e)
      }
    },

    onItemClick (e) {
      const { value } = e.target.dataset;
      let result = JSON.parse(value);
      this.setData({
        "component.budgetSheetId": null,
        "component.selected": result,
        "component.selectedId": result.budgetSheetId,
      });
    },

    ok () {
      const { id, budgetSheetId } = this.component.selected;

      if (budgetSheetId) {

        const params = { id, budgetSheetId, projectName: this.component.projectName, projectId: this.component.projectId, }
        const url = projectPageMap[budgetSheetId][1];
        const findUrl = this.$route.path;

        if (findUrl != url) {//跳转路由是否是当前页
          this.$router.push({ path: url, query: params });
        }

        this.$util.showTabStatus('true', 'true')
        this.close();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
app-filter-dialog + app-filter-dialog {
  margin-left: 15px;
}

.app-filter {
  display: inline-block;
  font-size: 24px;
}
.van-button--primary {
  // font-size: 36px;
  // background-color: #3a96bd !important;
  // border: 1px solid #3a96bd;
  background: linear-gradient(270deg, #1e5385 0%, #3a96bd 100%);
  text-align: center;
  line-height: 1rem;
  font-size: 32px;
  border-radius: 0;
  color: #fff;
  border: none;
  height: 74px;
}

.app-filter.app-filter--primary {
  color: #3992ba;
}

.app-filter-dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

.app-filter-dialog.overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

.app-filter-dialog .app-filter-dialog__main {
  max-height: 80%;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 80px;
  background-color: #ffffff;
  z-index: 1;
}

.app-filter-dialog .app-filter-dialog__main .app-filter-dialog__main__close {
  position: absolute;
  top: -100px;
  left: 50%;
  width: 80px;
  height: 80px;
  background-color: #ffffff;
  border-radius: 50%;
  transform: translateX(-50%);
}

.app-filter-dialog .app-filter-dialog__main__tip {
  margin-bottom: 30px;
  font-size: 28px;
  color: #757575;
}

.app-filter-dialog .app-filter-dialog__main__body {
  flex: 1;
  // margin-bottom: 30px;
  overflow: auto;
}

.app-filter-dialog .app-filter-dialog__main__body .checkbox-item {
  margin-bottom: 30px;
}

.app-filter-dialog .app-filter-dialog__main__body .group__title {
  padding: 10px;
  font-size: 28px;
  color: #757575;
}

.app-filter-dialog .app-filter-dialog__main__body .items__items {
  display: flex;
  flex-wrap: wrap;
  // padding: 10px;
}

.app-filter-dialog .app-filter-dialog__main__body .items__items .item-item {
  width: 100%;
  text-align: center;
  font-size: 28px;
  white-space: nowrap;
  line-height: 95px;
  color: #333333;
  &:not(:last-child) {
    border-bottom: 1px solid #f5f5f5;
  }
}

.app-filter-dialog
  .app-filter-dialog__main__body
  .items__items
  .item-item.selected {
  /* background-color: #3A96BD; */
  color: #3a96bd;
  font-size: 32px;
}

.app-filter-dialog
  .app-filter-dialog__main__body
  .items__items
  .item-item.disabled {
  /* opacity: .5; */
}

.app-filter-dialog .app-filter-dialog__main__actions {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0px 60px 0px;
}

.app-filter-dialog .app-filter-dialog__main__actions button {
  flex: 1;
}

.app-filter-dialog .app-filter-dialog__main__actions button + button {
  margin-left: 20px;
}
</style>
