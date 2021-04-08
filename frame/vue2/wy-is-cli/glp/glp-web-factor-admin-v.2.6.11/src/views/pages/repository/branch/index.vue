<template>
<div>
<h3>分支列表</h3>
<input type="text" v-model.trim="v1" placeholder="branch1">
<input type="text" v-model.trim="v2" placeholder="branch2">
<br/><br/>
<router-link to="/repository/branch/add">新增</router-link>
<router-link :to="'/repository/branch/edit/' + v1">编辑</router-link>
<router-link :to="'/repository/branch/detail/' + v1">详情</router-link>
<router-link :to="'/repository/branch/merge/' + v1 + '/' + v2">合并</router-link>
</div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
@Component
export default class Layout extends Vue {
    v1 = ''

    v2 = ''
}
</script>
