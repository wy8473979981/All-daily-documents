<template>
    <div class="common-table-container">
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data () {
        return {
        }
    },
    props: {}
}
</script>
<style lang="scss" scoped>

</style>