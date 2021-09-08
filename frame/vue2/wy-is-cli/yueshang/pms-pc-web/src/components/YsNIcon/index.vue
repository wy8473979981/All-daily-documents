<template>
  <div class="x-icon">
    <template v-if="config.length">
      <div
        v-for="(item, index) in config"
        :key="index"
        class="x-icon--item"
        @click="handleClick(item.icon, item.label)"
      >
        <img
          class="x-icon--item-icon"
          :src="require(`@/assets/icons/${item.icon}.png`)"
        />
        <div class="x-icon--item-text">{{ item.label }}</div>
      </div>
    </template>
    <template v-else>
      <div class="x-icon--item" @click="handleClick(icon, label)">
        <img
          class="x-icon--item-icon"
          :src="require(`@/assets/icons/${icon}.png`)"
        />
        <div v-if="label" class="x-icon--item-text">{{ label }}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "YsNIcon",

  props: {
    config: {
      type: Array,
      default: () => [],
    },

    icon: String,
    label: String,
  },

  methods: {
    handleClick(icon, label) {
      this.$emit("click", { icon, label });
    },
  },
};
</script>

<style lang="scss" scoped>
.x-icon {
  height: 20px;
  display: flex;
  align-items: center;
  color: $font-word-color;

  &--item {
    height: 100%;
    margin-right: 25px;
    display: flex;
    align-items: center;
    font-size: $font-base-size;
    cursor: pointer;

    &-icon {
      width: 16px;
      height: 16px;
    }

    &-text {
      margin-left: 4px;
    }
  }
  &--item:last-child {
    margin-right: 0;
  }

  &.hover &--item, &--item:hover {
    color: $subMenuHover;
  }
}
</style>
