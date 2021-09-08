<template>
  <div class="status-tabs">
    <div :class="['status-tabs--item', { active: active === item.key }]" v-for="(item, index) in config" :key="index">
      <span @click="handleClick(item)">{{item.label}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatusTabs',

  model: {
    event: 'select',
    prop: 'value'
  },

  props: {
    config: Array,

    value: [String, Number]
  },

  data() {
    return {
      active: ''
    }
  },

  created() {
    if (this.value === undefined) {
      this.active = this.config.length ? this.config[0].key : ''
    } else {
      this.active = this.value
    }
  },

  methods: {
    handleClick(item) {
      this.active = item.key
      this.$emit('select', item.key)
      this.$emit('click', item)
    }
  },

  watch: {
    active(val) {
      this.$emit('change', val)
    },

    value(val) {
      this.active = val
    }
  }
}
</script>

<style lang="scss" scoped>
.status-tabs {
  height: 32px;
  display: flex;
  background: $menuBg;
  width: fit-content;
  padding: 0 16px;
  justify-content: space-between;
  font-size: 14px;
  line-height: 32px;
  color: $font-word-color;
  border-radius: 16px;

  &--item {
    transition: all 0.5s;
    margin-right: 50px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: $subMenuHover;
      opacity: 0;
      transition: all 0.5s;
    }
    &.active {
      // font-size: 16px;
      color: $subMenuHover;
      position: relative;
      font-weight: bold;
      &:after {
        opacity: 1;
      }
    }
  }
}
</style>
