<template>
    <div class="base-container">
        <div class="general-info">
            <div class="title clearfix">
                <span class="pb pl-16 border-b1">变更数据对比</span>
                <span class="right-icon fr" @click="handleToggle">
                    收起
                    <svg-icon icon-class="down-dark" class="down-dark" />
                </span>
            </div>
            <el-collapse-transition>
                <div class="w1121" v-show="isShow">
                    <div class="project-title">
                        <div class="mt-12 info-t text-14 flex-al-center pr-28 pl-20">
                            <div class="flex1"></div>
                            <div class="flex1 text-left text-weight-bold">铺位数量</div>
                            <div class="flex1 text-left">计租面积(m²)</div>
                            <div class="flex1 text-left">建筑面积(m²)</div>
                            <div class="flex1 text-left">套内面积(m²)</div>
                            <div class="flex1 text-left">平均租金单价</div>
                        </div>
                        <div class="text-14 flex-al-center info-item">
                            <div class="flex1 text-left text-weight-bold">原铺位</div>
                            <div class="flex1 text-left">2</div>
                            <div class="flex1 text-left">200.00</div>
                            <div class="flex1 text-left">200.00</div>
                            <div class="flex1 text-left">200.00</div>
                            <div class="flex1 text-left">200.00</div>
                        </div>
                        <div class="text-14 flex-al-center info-item">
                            <div class="flex1 text-left text-weight-bold">新铺位</div>
                            <div class="flex1 text-left">1</div>
                            <div class="flex1 text-left">/</div>
                            <div class="flex1 text-left">/</div>
                            <div class="flex1 text-left">/</div>
                            <div class="flex1 text-left">/</div>
                        </div>
                        <div class="text-14 flex-al-center info-item">
                            <div class="flex1 text-left text-weight-bold">差异</div>
                            <div class="flex1 text-left">1</div>
                            <div class="flex1 text-left">/</div>
                            <div class="flex1 text-left">/</div>
                            <div class="flex1 text-left">/</div>
                            <div class="flex1 text-left">/</div>
                        </div>
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
    
    .info-t{
        height: 36px;
        line-height: 36px;
        background: #E0DFDD;
        border-radius: 20px;
    }
    .info-item{
        padding: 10px 28px 10px 20px;
        border-bottom: 1px solid #E0DFDD;;
    }
    .flex1{
        flex: 1;
    }
    .w1121{
        width: 1121px;
    }
    .color-6F120C{
        color: #6F120C;
    }
  .project-title{
    .title {
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
      /*border-bottom:1px solid #050101;*/
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
  }
}
</style>