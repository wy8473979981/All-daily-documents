<template>
  <div class="x-search">
    <section class="x-search__form" :class="{'spread': isSpread}">
      <ys-n-form inline v-on="$listeners" v-bind="$attrs" v-model="formData" :config="config" />
    </section>
    <section class="x-search__btn">
      <el-button type="primary" size="mini" @click="handleClick">查询</el-button>
      <el-button v-show="showExport" type="primary" size="mini" @click="handleExport">导出</el-button>
      <el-button type="text" size="mini" @click="handleSpread" v-if="formItemLength > 4">
        {{ isSpread ? "收起" : "更多"}}
        <i :class="[isSpread ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i>
      </el-button>
      <el-button class="reset-btn" type="text" size="mini" @click="handleReset">重置</el-button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'YsNSearch',

  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    config: Array,

    value: Object,

    update: Number,

    requestConfig: Object, // 接口请求配置

    showExport: Boolean, // 展示导出
  },

  data () {
    return {

      loading: true,
      loadingLock: true, // 加载时页面loading画面固定

      formData: {},

      isSpread: true, // 是否展开

      defaultFormData: {}, // 默认的form数据
    }
  },

  computed: {
    //   currentConfig() {
    //     function searchConfig() {
    //       return {
    //         key: 'searchcustom',
    //         label: '',
    //         type: 'custom',
    //         // eslint-disable-next-line
    //         render:(h, data, fn) => {
    //           return <el-button type="primary" size="mini" onClick={() => fn('search', this.formData)}>查询</el-button>
    //         }
    //       }
    //     }
    //     return this.config.concat(searchConfig.call(this))
    //   }

    formItemLength () {
      return this.config.reduce((pre, cur) => {
        return cur.type === 'dateRange' ? (pre + 2) : (pre + 1)
      }, 0)
    },
  },

  created() {
    this.formData = {...this.value};
    this.defaultFormData = {...this.value}
  },

  methods: {
    handleClick () {
      this.$emit('search', { ...this.formData })
    },

    handleSpread () {
      this.isSpread = !this.isSpread
    },

    handleReset () {
      this.formData = { ...this.defaultFormData };
      this.$emit('reset', { ...this.formData })
    },

    handleExport() {
      this.$emit('export', { ...this.formData })
    },
  },

  watch: {
    formData: {
      handler: function (val) {
        this.$emit('input', { ...val })
      },
      deep: true
    },
    update: {
      deep: true,
      handler: function () {
        console.log('formData search update', JSON.stringify(this.value))
        this.formData = this.value;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.x-search {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  :global(.el-form-item) {
    margin-bottom: 0;
  }

  &__form {
    display: flex;
    flex-wrap: wrap;
    max-width: 780px;
    height: 40px;
    overflow: hidden;
  }

  &__form.spread {
    height: auto;
    overflow: inherit;
  }

  &__btn {
    height: 40px;
    display: flex;
    align-items: center;
  }
  ::v-deep .reset-btn.el-button--text {
    color: #898989;
  }
}
</style>