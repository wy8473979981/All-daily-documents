<template>
<div :class="[$style.container]">
    <error-icon></error-icon>
    <div :class="[$style.title]">{{code}}</div>
    <div :class="[$style.description]">
        <span v-if="code == 404">抱歉， 你访问的页面不存在</span>
        <span v-else-if="code == 403">抱歉， 你没有权限访问此页面</span>
        <span v-else>未知错误</span>
    </div>
    <div :class="[$style.action]">
        <el-button type="primary" size="small" @click="goHome">返回主页</el-button>
    </div>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ErrorIcon from './error-icon/index.vue'

@Component({
  components: { ErrorIcon }
})
export default class Error extends Vue {
  @Prop(String) code!: string

  goHome () {
    this.$router.push('/')
  }
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";

.container {
    padding: 48px 32px;
    text-align: center;
}

.title {
    margin-top: 24px;
    color: $text-heading-color;
    font-size: 24px;
    line-height: 1.8;
    text-align: center;
}

.description {
    color: $text-secondary-color;
    font-size: 14px;
    line-height: 1.6;
    text-align: center;
}

.action {
    margin-top: 32px;
    text-align: center;
}
</style>
