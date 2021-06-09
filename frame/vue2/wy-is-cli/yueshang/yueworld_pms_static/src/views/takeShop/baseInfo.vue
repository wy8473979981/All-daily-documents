<template>
    <div class="base-container">
        <div class="general-info">
            <div class="title clearfix">
                <span class="pb pl-16 border-b1">基础数据</span>
                <span class="right-icon fr" @click="handleToggle">
                    收起
                    <svg-icon icon-class="down-dark" class="down-dark" />
                </span>
            </div>
            <el-collapse-transition>
                <div class="d-flex info-box pt-4 pl-16" v-show="isShow">
                    <div class="item" v-for="(item,index) in infoList" :key="index">
                        <div class="text-14 mtb-8">{{item.name}}</div>
                        <div class="text-24">{{item.num}}</div>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            infoList: [
                { name: '项目名称', num: '上海青浦宝龙广场' },
                { name: '审批号', num: '20210428000012' },
                { name: '发起人', num: '李庆龙' },
                { name: '发起时间', num: '2021-04-28' },
                { name: '备注', num: '/' }
            ],
            isShow: true,
        }
    },
    methods: {
        handleToggle () {
            this.isShow = !this.isShow
        }
    }
}
</script>
<style lang="scss" scoped>
.general-info{
    margin-top: 20px;
    align-items: stretch;
    .title{
        font-size: 16px;
        font-weight: bold;
        color: #050101;
        line-height: 24px;
        border-bottom: 1px solid #D1CEC9;
    }
    .border-b1{
        position: relative;
        display: inline-block;
        width: 140px;
    }
    .border-b1::after {
        height: 1px;
        width: 100%;
        transform: scaleY(0.5);
        left: 0;
        content: '';
        position: absolute;
        background-color: #050101;
        bottom: -1px;
    }
    .right-icon {
        font-size: 12px;
        cursor: pointer;
        &:hover {
            color: #1C4C7F;
        }
        .down-dark {
            vertical-align: middle;
            font-size: 20px;
        }
    }
    .info-box {
        .text-24 {
            font-size: 24px;
            color: #050101;
            line-height: 36px;
        }
        .item{
            margin-right: 46px;
        }
        .font-10{
            font-size: 10px;
        }
        .font-14{
            font-size: 14px;
        }
        .mtb-8 {
            margin-top: 8px;
            margin-bottom: 8px;
        }
    }
}
</style>