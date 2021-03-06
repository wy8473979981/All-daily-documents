<template>
<div>
<h3>分支详情 : {{id}}</h3>
<router-link to="commit">提交记录</router-link>
<router-link to="rollback">回滚记录</router-link>
<router-view></router-view>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class Layout extends Vue {
    @Prop(String) id!: string
}
</script>
