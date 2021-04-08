<template>
<div>
<h3>合并分支</h3>
<p>分支：<code>{{b1}}</code> 合并到 <code>{{b2}}</code></p>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class Layout extends Vue {
    @Prop(String) b1!: string

    @Prop(String) b2!: string
}
</script>
