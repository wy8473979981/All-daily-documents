<template>
  <div class="x-list">
    <template v-for="(item, idx) in currentConfig">
      <section
        :class="['x-list--container', {'has-pre--line': item.hasPreLine}]"
        :style="{
          width: item.width,
          'margin-right': item.margin,
        }"
        :key="idx">
        <div
          :class="['x-list--item', {'has-link': item.isLink}]"
          @click="item.click && item.click(item.key, list[item.key])"
        >
          <div class="x-list--item-title">{{ item.label }}</div>
          <div
            :class="getItemsColor(item, 'key', item.autoChangeColor, size)"
          >
            {{ list[item.key] | formatter(item.type) }}
            <span>{{ item.separator }}</span>
            <span
              v-if="item.tipKey"
              :class="getItemsColor(item, 'tipKey', item.autoChangeTipsColor)"
              >{{ list[item.tipKey] | formatter(item.tipType) }}</span
            >
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
import { formatNumber } from "utils/utils";
export default {
  name: "YsNList",

  props: {
    list: {
      type: Object,
    },

    config: Array,

    size: {
      type: String,
      default: "medium", // medium / small / mini  字体大小 20 16 12 px
    },

    width: {
      // 百分比
      type: [String, Number],
    },

    margin: {
      // 右边距
      type: Number,
      default: 20
    },

    layout: {
      type: Boolean,
      default: false,
    },
  },

  filters: {
    formatter(val, type) {
      if (type === "custom") return val === undefined ? "-" : val;
      return formatNumber(val, type);
    },
  },

  computed: {
    currentConfig() {
      /* 可以自定义span span是百分比 */
      return this.config.map((item) => {
        let width = item.width || this.width
        const margin = item.margin ? item.margin : (width ? 0 : this.margin)
        width = width ? `${width}%` : 'fit-content'
        return Object.assign({}, item, { width, margin: `${margin}px` })
      });
    },
  },

  methods: {
    getItemsColor(data, key, autoChangeColor, size) {
      return {
        'x-list--item-data': key === 'key',
        'x-list--item-tips': key === 'tipKey',
        'one-ellipsis': true,
        'is-error': (autoChangeColor && this.list[data[key]] < 100) || (key === 'key' ? data.status === 'error' : data.tipStatus === 'error'),
        'is-success': (autoChangeColor && this.list[data[key]] >= 100) || (key === 'key' ? data.status === 'success' : data.tipStatus === 'success'),
        [size]: !!size,
        'is-link': data.isLink,
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.x-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: -18px;

  &--container {
    width: fit-content;
    box-sizing: border-box;
    margin-top: 18px;
    // margin-right: 16px;

    &.has-pre--line {
      position: relative;
      margin-left: 18px;
      &:before {
        content: '';
        width: 1px;
        height: 32px;
        background: $subMenuLineColor;
        position: absolute;
        top: 50%;
        left: -13px;
        margin-top: -16px;
      }
    }
  }

  &--item {
    display: flex;
    flex-direction: column;
    width: fit-content;

    &.has-link {
      cursor: pointer;
    }

    &.has-link:hover {
      background-color: #D5E4F3;
      border-radius: 6px;
    }

    &:last-child {
      margin-right: 0 !important;
    }

    &-title {
      color: $tipsColor;
      line-height: 24px;
      font-size: 14px;
    }

    &-data {
      color: $font-word-color;
      line-height: 20px;
      margin-top: 5px;

      &.is-error {
        color: #6f120c;
      }

      &.is-success {
        color: #485f47;
      }

      &.is-link {
        color: $subMenuHover;
      }
    }

    &-tips {
      font-size: 14px;

      &.is-error {
        color: #6f120c;
      }

      &.is-success {
        color: #485f47;
      }
    }

    &-link {
      line-height: 20px;
      margin-top: 7px;
    }
    ::v-deep.el-link {
      justify-content: flex-start;
    }

    .medium {
      font-size: 20px;
    }

    .small {
      font-size: 16px;
    }

    .mini {
      font-size: 12px;
    }
  }
}
</style>
