<template>
    <el-pagination
        v-if="totalCount>pageSize"
        class="pagination-page-section"
        @current-change="pageChange"
        background
        align="right"
        :page-size="pageSize"
        prev-text="<"
        next-text=">"
        :pager-count="pageCount"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper,slot"
        :total="totalCount"
        :hide-on-single-page="true"
        >
        <el-button class="to-page-btn" slot>确定</el-button>
    </el-pagination>
</template>

<script>
    export default {
        name:'pagination',
        props:['pageInfo'],
        data (){
            return {
            }
        },
        computed :{
            pageSize:{
                get:function(){
                    return this.pageInfo.size || 10;
                },
                set:function(){
                    
                }
            },
            currentPage (){
                return this.pageInfo.page-0 || 1
            },
            pageCount (){
                return this.pageInfo.pageCount || 5;
            },
            totalCount (){
                return this.pageInfo.total || 0;
            }
        },
        mounted (){
        },
        methods:{
            pageChange (currentPage){
                this.$emit('getPageChange',{
                    currentPage
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pagination-page-section{
        margin-top: 30px;
    }
</style>
