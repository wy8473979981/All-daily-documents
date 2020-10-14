<template>
    <span :class="'color-'+statusName">{{txt}}</span>
</template>

<script>

    /*
        statusName
        delete=作废
        refuse=拒绝
        reject=驳回
        review=审核中
        cancel=取消
    
    */
	export default {
        props:['txt','statusName']
	}
</script>

<style scoped>
 
</style>
