<template>
  <transition name="viewer-fade">
    <div class="progress-bar-containter">
      <label>
        <span>7</span>/
        <span>10</span>
      </label>
    </div>
  </transition>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
@Component
export default class ProgressBar extends Vue {}
</script>
<style lang='scss' scope>
.progress-bar-containter {
  width: 100%;
  margin: auto;
  position: relative;
  border-radius: 3px;
  height: 8px;
  background: linear-gradient(
    270deg,
    rgba(58, 192, 130, 1) 0%,
    rgba(171, 229, 130, 1) 100%,
    rgba(108, 225, 184, 1) 100%
  );
  label {
    position: absolute;
    padding: 5px 10px;
    top: -20px;
    font-size: 12px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  }
}
</style>
