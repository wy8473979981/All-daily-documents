<template>
    <div class="base-container">
        <div class="general-info">
            <div class="title clearfix">
                <span class="pb pl-16 border-b1">原铺位</span>
                <span class="right-icon fr" @click="handleToggle">
                    收起
                    <svg-icon icon-class="down-dark" class="down-dark" />
                </span>
            </div>
            
        </div>
        <el-collapse-transition>
            <div class="common-detail" v-show="isShow">
                <div class="top-bar">
                    <div class="left pr-40 pl-16">
                        <span :class="['mr-40','cursor-pointer',activeIndex==1?'active':'']" @click="changeActive(1)">001</span>
                        <span :class="['cursor-pointer',activeIndex==2?'active':'']" @click="changeActive(2)">002</span>
                    </div>
                </div>
                <div class="bar-content" v-if="activeIndex == 1">
                    <div class="d-flex info-box pt-4 pl-16">
                        <div class="item" v-for="(item,index) in infoList1" :key="index">
                            <div class="text-14 mtb-8">{{item.name}}</div>
                            <div class="text-24">{{item.num}}</div>
                        </div>
                    </div>
                    <div class="d-flex info-box pt-4 pl-16">
                        <div :style="{'margin-right': item.right}" v-for="(item,index) in infoList2" :key="index">
                            <div class="text-14 mtb-8">{{item.name}}</div>
                            <div class="text-24">{{item.num}}</div>
                        </div>
                    </div>
                </div>
                <div class="bar-content" v-else>
                    <div class="d-flex info-box pt-4 pl-16">
                        <div class="item" v-for="(item,index) in infoList1" :key="index">
                            <div class="text-14 mtb-8">{{item.name}}</div>
                            <div class="text-24">{{item.num}}</div>
                        </div>
                    </div>
                    <div class="d-flex info-box pt-4 pl-16">
                        <div :style="{'margin-right': item.right}" v-for="(item,index) in infoList2" :key="index">
                            <div class="text-14 mtb-8">{{item.name}}</div>
                            <div class="text-24">{{item.num}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </el-collapse-transition>
    </div>
</template>
<script>
export default {
    data () {
        return {
            activeIndex: 1,
            infoList1: [
                { name: '铺位号', num: '001' },
                { name: '楼栋', num: 'T1' },
                { name: '楼层', num: 'F01' },
                { name: '规划业态', num: '2021-04-28' },
                { name: '商铺类型', num: '商铺' },
                { name: '得房率(%)', num: '90.86' },
                { name: '产权性质', num: '自持' },
            ],
            infoList2: [
                { name: '商铺属性', num: '商铺属性', right: '59px' },
                { name: '计租方式', num: '建筑面积', right: '40px' },
                { name: '计租面积(m²)', num: '自持', right: '48px' },
                { name: '建筑面积(m²)', num: '100.00', right: '118px' },
                { name: '套内面积(m²)', num: '90.00', right: '68px' },
                { name: '其他面积(m²)', num: '100.00' },
            ],
            isShow: true,
        }
    },
    methods: {
        handleToggle () {
            this.isShow = !this.isShow
        },
        changeActive(v) {
            this.activeIndex = v
            this.infoList1[0].num = '00' + v
        }
    }
}
</script>
<style lang="scss" scoped>
.general-info {
    margin-top: 20px;
    align-items: stretch;
    .title {
        font-size: 16px;
        font-weight: bold;
        color: #050101;
        line-height: 24px;
        border-bottom: 1px solid #D1CEC9;
    }
    .border-b1 {
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
    
}
.top-bar {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    .left{
        border-radius: 24px;
        font-size: 14px;
        color: #050101;
        line-height: 30px;
        display: flex;
        background-color: white;
    }
    .active{
        font-size: 16px;
        font-weight: bold;
        color: #1C4C7F;
        border-bottom: 2px solid #1C4C7F;
    }
}
.common-detail {
    .info-box {
        .text-24 {
            font-size: 20px;
            color: #050101;
            line-height: 36px;
        }
        .item{
            margin-right: 95px;
        }
        .item1{
            margin-right: 30px;
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