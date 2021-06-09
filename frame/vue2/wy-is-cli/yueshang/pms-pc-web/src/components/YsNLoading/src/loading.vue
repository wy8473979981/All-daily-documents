<template>
  <transition name="el-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="el-loading-mask"
      :style="{ backgroundColor: background || '' }"
      :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class="el-loading-spinner">
        <!-- <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"/>
        </svg> -->
        <div v-if="!spinner" class="ys-loading">
          <div class="ys-loading-contanier">
            <div class="line-content" v-for="i in total" :key="i" :class="'ys-loading-content__' + i">
              <span class="line-before" :style="{background: color}" :class="['ys-loading__' + i, 'ys-loading-before__' + i]"></span>
              <span class="line-after" :style="{background: color}" :class="['ys-loading__' + (i + total), 'ys-loading-after__' + i]"></span>
            </div>
          </div>
          <div class="circlebg" ></div>
        </div>
        <i v-else :class="spinner"></i>
        <p v-if="text" class="el-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        text: null,
        spinner: null,
        background: null,
        fullscreen: true,
        visible: true,
        customClass: '',

        total: 16,
        color: '#000'
      };
    },

    methods: {
      handleAfterLeave() {
        this.$emit('after-leave');
      },
      setText(text) {
        this.text = text;
      }
    },
  };
</script>

<style lang="scss" scoped>
$ysLoad: ys-loading;
$total: 16;
$times: 20;
$height: 6;

.ys-loading {
  width: 92px;
  height: 92px;
  margin: 0 auto;
  background: #fff;
  position: relative;

  &-contanier {
    height: 100%;
    width: 100%;
  }
}


.line-content {
  position: absolute;
  left: 44px;
  top: 0;
  width: 3px;
  height: 92px;
  /* display: flex;
  align-items: center; */
}
.line-before, .line-after {
  display: block;
  height: 50%;
  background: #000;
  border-radius: 10px;
  margin: 0;
  opacity: 0.1;
}

.circlebg {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 64px;
  height: 64px;
  margin: -32px 0 0 -32px;
  background: #fff;
  border-radius: 40px;
}

/** 加载动画 **/
@-webkit-keyframes load {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
// 一共32个 16对
@for $index from 0 to 33 {
  .#{$ysLoad}__#{$index} {
    animation: load #{1 / $times * $total * 2}s linear #{($index - 1)/$times}s infinite;
    -webkit-animation: load #{1 / $times * $total * 2}s linear #{($index - 1)/$times}s infinite;
    -moz-animation: load #{1 / $times * $total * 2}s linear #{($index - 1)/$times}s infinite;
    -o-animation: load #{1 / $times * $total * 2}s linear #{($index - 1)/$times}s infinite;
  }
}
@for $index from 0 to 17 {
  .#{$ysLoad}-content__#{$index} {
    transform: rotate(#{180 / $total * ($index - 1)}deg);
    -webkit-transform: rotate(#{180 / $total * ($index - 1)}deg);
    -moz-transform: rotate(#{180 / $total * ($index - 1)}deg);
    -o-transform: rotate(#{180 / $total * ($index - 1)}deg);
  }
}
@for $index from 0 to 17 {
  .#{$ysLoad}-before__#{$index} {
    height: #{$height - $height / $total / 2 * ($index - 1) + 42}px;
    margin-top: -#{$height - $height / $total / 2 * ($index - 1)}px;
  }
}

@for $index from 0 to 17 {
  .#{$ysLoad}-after__#{$index} {
    height: #{$height - ($height / $total / 2 * ($total / 2 + ($index - 1))) + 42}px;
    margin-top: #{$height - ($height / $total / 2 * ($total / 2 + ($index - 1)))}px;
  }
}
</style>
