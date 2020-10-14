<template>
  <div :class="[$style.cSteps]">
    <div :class="[$style.steps , $style.box , $style.flexAvg]">
      <div
        :class="[$style.step , $style.fColumn , $style.flexAvg,  $style.bold, $style[getClassNameActive(s)], $style[getClassNameCurrent(s)]]"
        v-bind:key="s.index"
        v-for="(s,index) in list"
      >
        <div :class="[$style.icon , $style.box , $style.flexAvg]">
          <span>{{index+1}}</span>
        </div>
        <div :class="[$style.text]">{{s.label}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
@Component
export default class Step extends Vue {
  @Prop() currentStep!: any

  list = [
    {
      index: 1,
      indexList: [1, 2],
      label: '上传票据信息'
    },
    {
      index: 3,
      indexList: [3],
      label: '填写基础合同信息'
    },
    {
      index: 5,
      indexList: [4, 5],
      label: '上传发票信息'
    },
    {
      index: 6,
      indexList: [6],
      label: '确认订单信息'
    }
  ]

  getClassNameActive(data: any) {
    return data.index < this.currentStep ? 'active' : ''
  }

  getClassNameCurrent(data: any) {
    return data.indexList.indexOf(this.currentStep) > -1 ? 'current' : ''
  }
}
</script>

<style lang="scss" module>
@import '~@/styles/vars.scss';
.cSteps {
  margin: 20px 0;
  font-size: 14px;
  text-align: center;
  $size: 32px;
  $lineWidth: 2px;
  .steps {
    color: #c5c5c5;
    padding: 12px 0 20px;
    border-bottom: 1px solid #f3f3f3;
    .step {
      width: 128px + $size;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        top: $size / 2;
        right: 0;
        width: calc(100% - #{$size} - 24px);
        height: $lineWidth;
        background-color: currentColor;
        transform: translate(50%, -50%);
      }
      &:last-child:after {
        display: none;
      }

      &.current {
        .text {
          color: inherit;
        }
        &:after {
          background: linear-gradient(90deg, currentColor, transparent);
        }
      }
    }
    .icon {
      font-size: 16px;
      width: $size;
      height: $size;
      border-radius: 50%;
      background-color: currentColor;
      span {
        color: white;
      }
    }
    .text {
      color: #c5c5c5;
      margin-top: 10px;
    }
  }
  .title {
    padding: 20px;
    font-size: 18px;
  }
  .flexAvg {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fColumn {
    flex-direction: column;
  }
  .box {
    box-sizing: border-box;
  }
  .bold {
    font-weight: bold;
  }
  .active {
    color: #3ac082;
  }
  .current {
    color: #3ac082;
  }
}
</style>
