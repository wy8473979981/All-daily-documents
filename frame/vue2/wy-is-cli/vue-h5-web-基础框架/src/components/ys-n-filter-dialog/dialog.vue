<template>
  <div>
    <div :class="'app-filter app-filter--' + type" @click="open">
      <span>{{ title }}</span>
      <img v-if="title" class="app-filter-icon" src="../../assets/images/icon-filter.png" />
      <slot></slot>
    </div>
    <div v-if="component.opened" class="app-filter-dialog overlay">
      <div class="app-filter-dialog__main">
        <img class="app-filter-dialog__main__close" src="../../assets/images/icon-close-ffffff.png" @click="close" />
        <div class="app-filter-dialog__main__tip" v-if="tip">
          {{ tip }}
        </div>
        <div class="app-filter-dialog__main__body">

          <template v-if="component.checkboxes.length">
            <div v-for="(item, itemi) in component.checkboxes" :key="itemi" class="checkbox-item">
              <label class="checkbox" @click="onCheckboxClick(item)" :data-value="item.value">
                <span :class="component.selected[item.value] ? 'active':''"></span>{{ item.label }}
                <!-- <van-checkbox v-model="component.selected[item.value]" :disabled="!component.selected[item.value] && component.disabled"  :data-value="item.value" shape="square" checked-color="#3A96BD">{{ item.label }}</van-checkbox> -->
              </label>
            </div>
          </template>
          <template v-else>
            <div v-for="(group, groupi) in component.groups" :key="groupi" class="group">
              <!-- <div class="group__title"> {{ group.label }}</div> -->
              <div class="group__items">
                <div v-for="(item, itemi) in group.items" :key="itemi" :class="
		  										'group-item ' +
		  										(component.selected[item.value] ? 'selected' : '') +
		  										' ' +
		  										(!component.selected[item.value] && (group.disabled || component.disabled) ? 'disabled' : '')
		  									" @click="onGroupItemClick" :data-value="JSON.stringify(item.value)" :data-group="JSON.stringify(group)">
                  {{ item.label }}
                </div>
              </div>
            </div>
          </template>
        </div>
        <template>
          <div class="app-filter-dialog__main__actions">
            <!-- <van-button type="info" size="small" @click="ok">确定</van-button> -->
            <div class="btn-box">
              <div class="confirm-btn" @click.prevent.stop="ok">确定</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      component: {
        opened: false,
        disabled: false,
        checkboxes: [],
        selected: {}
      }
    };
  },

  components: {},
  props: {
    overlay: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: "normal", // 'info', 'normal'
    },
    title: {
      type: String,
    },
    tip: {
      type: String,
    },
    checkboxes: {
      type: Array,
      default: function () {
        return [];
      },
    },
    groups: {
      type: Array,
      default: function () {
        return [];
      },
    },
    maxnum: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    checkboxes: {
      handler: function (items) {
        if (this.$route.query.ids) {
          let idList = this.$route.query.ids.split(',')
          items.map(item => {
            if (idList.includes(item.id)) {
              this.component.selected[JSON.stringify(item)] = true
            }
          })
        }
        // console.log(this.component.selected, 'this.component.selected')
        this.setData({
          "component.checkboxes": items.map((item) => {
            return {
              label: item.label,
              value: JSON.stringify(item.value || item),
            };
          }),
        });
      },
      immediate: true,
      deep: true,
    },
    groups: {
      handler: function (groups) {
        if (groups && groups.length > 0) {
          const selected = {};
          // console.log(this.component.checkboxes.length, this.$route.query.chargeType, 'sddsds')
          const newGroups = groups.map((group, groupi) => {
            return {
              maxnum: 1,
              id: `group-${groupi}`,
              ...group,
              items: group.items.map((item) => {
                const value = item.value || item;
                if (this.$route.query.chargeType == item.code || item.selected === true) {
                  item.selected == true
                  selected[value] = `group-${groupi}`;
                }

                return {
                  label: item.label,
                  value,
                };
              }),
              $index: groupi,
            };
          });
          this.setData({
            "component.groups": newGroups,
            "component.selected": selected,
          });
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted: function () {

  },
  methods: {
    open () {
      this.setData({
        "component.opened": true,
      });
      this.$emit("open");
    },

    close () {
      this.setData({
        "component.opened": false,
      });
      this.$emit("close");
    },

    onGroupItemClick (e) {
      const selected = this.component.selected;
      const group = JSON.parse(e.target.dataset.group);
      const value = JSON.parse(e.target.dataset.value);
      const setdata = {
        [`component.groups[${group.$index}].disabled`]: false,
      };

      if (selected[value]) {
        delete selected[value];
      } else {
        if (this.maxnum === 1) {
          this.setData({
            "component.selected": [value],
          });
          return;
        }

        if (group.maxnum === 1) {
          Object.keys(selected).forEach((key) => {
            if (selected[key] === group.id) {
              delete selected[key];
            }
          });
        }

        if (!this.component.disabled && this.component.groups[group.$index] && !this.component.groups[group.$index].disabled) {
          selected[value] = group.id;
        }

        if (group.maxnum > 1 && Object.keys(selected).filter((key) => selected[key] === group.id).length >= group.maxnum) {
          setdata[`component.groups[${group.$index}].disabled`] = true;
        }
      }
      this.component.selected[group.$index]
      setdata["component.disabled"] = this.maxnum && Object.keys(selected).length >= this.maxnum;
      setdata["component.selected"] = selected;
      this.setData(setdata);
      this.$forceUpdate();
    },

    onCheckboxClick (item) {
      const selected = this.component.selected;
      const value = item.value;

      if (selected[value]) {
        delete selected[value];
      } else {
        if (this.maxnum === 1) {
          Object.keys(selected).forEach((key) => {
            delete selected[key];
          });
        }

        if (!this.component.disabled) {
          selected[value] = true;
        }
      }

      this.setData({
        "component.disabled": this.maxnum > 1 && Object.keys(selected).length >= this.maxnum,
        "component.selected": selected,
      });
      this.$forceUpdate()
    },

    ok () {
      this.close();
      this.$emit("selected", {
        detail: Object.keys(this.component.selected).map((item) => {
          try {
            return JSON.parse(item);
          } catch {
            return item;
          }
        }),
      });
    },

  },
};
</script>
<style type="text/css" lang="scss" scoped>
app-filter-dialog + app-filter-dialog {
  margin-left: 15px;
}

.van-button--small {
  width: 100%;
}

.app-filter {
  margin: 0 0 0 20px;
  display: flex;
  align-items: center;
}

.app-filter .app-filter-icon {
  margin-left: 10px;
  width: 0.4rem;
  height: 0.3733rem;
}

.app-filter.app-filter--info {
  color: #3992ba;
}

.app-filter-dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 102;
  color: #333;
}

.app-filter-dialog.overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

.app-filter-dialog .app-filter-dialog__main {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  width: 100%;
  max-height: 80%;
  // padding: 30px 30px;
  padding: 0 80px;
  box-sizing: border-box;
  background-color: #ffffff;
  z-index: 1;
  overflow: visible;
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
  // margin-bottom: 30px;
  height: 68px;
  line-height: 68px;
  font-size: 28px;
  color: #757575;
}

.app-filter-dialog .app-filter-dialog__main__body {
  flex: 1;
  // padding-bottom: 100px;
  padding-bottom: 174px;
  overflow: auto;
}

.app-filter-dialog .app-filter-dialog__main__body .checkbox-item {
  margin-bottom: 30px;
}
.app-filter-dialog .app-filter-dialog__main__body .checkbox-item span {
  background-color: #fff;
  border: solid 1px #ccc;
  width: 32px;
  height: 32px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 20px;
  line-height: 40px !important;
  text-align: center;
}
.app-filter-dialog .app-filter-dialog__main__body .checkbox-item span.active {
  background-color: #3992ba !important;
  font: normal normal normal 28px/1 vant-icon;
  color: #fff;
  position: relative;
}
.app-filter-dialog
  .app-filter-dialog__main__body
  .checkbox-item
  span.active::before {
  content: "\F0C8";
}
.app-filter-dialog .app-filter-dialog__main__body .group__title {
  padding: 10px;
  font-size: 28px;
  color: #757575;
}

.app-filter-dialog .app-filter-dialog__main__body .group__items {
  display: flex;
  flex-wrap: wrap;
  // padding: 10px;
}

.app-filter-dialog .app-filter-dialog__main__body .group__items .group-item {
  // white-space: nowrap;
  // padding: 10px 20px;
  // margin-right: 20px;
  // margin-bottom: 20px;
  // background-color: #e3e3e3;
  // color: #333333;

  width: 100%;
  font-size: 28px;
  white-space: nowrap;
  color: #333333;
  text-align: center;
  padding: 0;
  line-height: 95px;
  font-weight: 500;
  &:not(:last-child) {
    border-bottom: 1px solid #f5f5f5;
  }
}

.app-filter-dialog
  .app-filter-dialog__main__body
  .group__items
  .group-item.selected {
  // background-color: #3a96bd;
  // color: #ffffff;
  color: #3a96bd;
  font-size: 32px;
}

.app-filter-dialog
  .app-filter-dialog__main__body
  .group__items
  .group-item.disabled {
  opacity: 0.5;
}

.app-filter-dialog .app-filter-dialog__main__actions {
  flex-shrink: 0;
  display: flex;
}

.app-filter-dialog .app-filter-dialog__main__actions van-button {
  flex: 1;
}

.app-filter-dialog .app-filter-dialog__main__actions van-button + van-button {
  margin-left: 20px;
}
.btn-box {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  background-color: #fff;
  padding: 40px 80px 60px 80px;
  // padding-bottom: 42px;
  // padding: 15px 0 42px;
}
.confirm-btn {
  background: linear-gradient(270deg, #1e5385 0%, #3a96bd 100%);
  // margin: 0 36px;
  text-align: center;
  line-height: 75px;
  font-size: 32px;
  border-radius: 0;
  color: #fff;
}
</style>
