<template>
  <div class="x-node">
    <div class="x-node--title">
      <span>当前节点</span>
      <span class="x-node--title-step">进场</span>
    </div>

    <div class="x-node--content scrollbar-custom">
      <div class="x-node--content-item active">
        <span class="x-node--content-item--time">2020-04-01  12:16</span>
        <span class="x-node--content-item--step">开业</span>
        <span class="x-node--content-item--status">进行中</span>
      </div>
      <div class="x-node--content-item">
        <span class="x-node--content-item--time">2020-04-01  12:16</span>
        <span class="x-node--content-item--step">开业</span>
        <span class="x-node--content-item--status">进行中</span>
      </div>
      <div class="x-node--content-item">
        <span class="x-node--content-item--time">2020-04-01  12:16</span>
        <span class="x-node--content-item--step">开业</span>
        <span class="x-node--content-item--status">进行中</span>
      </div>
      <div class="x-node--content-item">
        <span class="x-node--content-item--time">2020-04-01  12:16</span>
        <span class="x-node--content-item--step">开业</span>
        <span class="x-node--content-item--status">进行中</span>
      </div>
      <div class="x-node--content-item">
        <span class="x-node--content-item--time">2020-04-01  12:16</span>
        <span class="x-node--content-item--step">开业</span>
        <span class="x-node--content-item--status">进行中</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XNode',

  props: {
    data: Object
  }
}
</script>

<style lang="scss" scoped>
.x-node {
  display: flex;
  max-height: 175px;
  flex-direction: column;

  &--title {
    height: 32px;
    width: 100%;
    line-height: 32px;
    padding-left: 12px;
    // background-color: $menuBg;
    border-radius: 16px;
    display: flex;
    align-items: center;
    
    &-step {
      color: $menuHover;
      font-size: 14px;
      margin-left: 12px;
      font-weight: bold;
    }
  }

  &--content {
    flex: 1;
    height: 0;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 8px 0;

    &-item {
      width: 366px;
      height: 34px;
      background: rgba(132, 131, 130, 0.1);
      border-radius: 17px;
      font-size: 14px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding-left: 12px;
      margin-bottom: 8px;

      &:before {
        content: '';
        display: block;
        background-image: url(~assets/icons/done.png);
        height: 24px;
        width: 24px;
        background-size: contain;
        background-repeat: no-repeat;
      }

      &--time {
        color: $menuDefaultColor;
        margin-right: 12px;
        margin-left: 12px;
        width: 150px;
      }

      &--step {
        width: 60px;
        color: $subMenuHover;
        margin-right: 22px;
      }
    }

    &-item.active {
      background-color: rgba(181, 212, 224, 0.17);

      &:before {
        background-image: url(~assets/icons/doing.png);
      }
    }
  }
}
</style>