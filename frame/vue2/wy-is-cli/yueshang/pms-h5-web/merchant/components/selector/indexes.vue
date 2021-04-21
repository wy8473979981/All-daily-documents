<template>
<view>
<mp-indexList :list="component.list" @choose="onSelected">
  <slot></slot>
</mp-indexList>
</view>
</template>

<script>
import mpIndexList from "./@miniprogram-component-plus/index-list";

export default {
  data() {
    return {
      component: {
        list: []
      }
    };
  },

  components: {
    mpIndexList
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  watch: {
    list: {
      handler: function (newValue) {
        this.setData({
          'component.list': newValue.map(group => {
            return {
              alpha: group.label,
              ...group,
              subItems: group.items.map(item => {
                return {
                  name: item.label,
                  ...item
                };
              })
            };
          }).filter(group => group.subItems.length)
        });
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onSelected(e) {
      this.$emit('selected', {
        detail: e.detail.item
      });
    }

  }
};
</script>
