<template>
    <footer class="pc-dom clearfix g-main-footer">
        <div class="footer-top clearfix">
            <div class="footer-top-left pull-left">
                <div class="contact pull-left">
                    <p style="margin-bottom:25px;">联系我们</p>
                    <p style="margin-bottom:0;">上海市淮海中路333号瑞安广场1702室</p>
                    <p style="margin-bottom:25px;">神奈川横浜市西区楠町27－9横浜ウエストビルF3</p>
                    <p style="margin-bottom:25px;">7x24小时咨询热线: 400-852-0285</p>
                    <p>商务合作专线: 400-920-5860</p>
                </div>
                <div class="friendly-link pull-left">
                    <p style="margin-bottom:25px;">友情链接</p>
                    <p style="margin-bottom:65px;">日本厚生劳动省</p>
                    <p style="margin-bottom:0px;">分公司名称</p>
                    <p style="margin-bottom:0px;">分公司地址</p>
                    <p style="margin-bottom:0px;">400-920-5860</p>
                    <p style="margin-bottom:0px;">分公司联系人姓名</p>
                </div>
            </div>
            <div class="footer-img pull-left">
                <img src="@/assets/images/index/footer.jpg" alt="">
            </div>
        </div>
        <div class="footer-bottom">
            Copyright©2016-2017 By Domo 上海多睦健康管理有限公司 沪ICP备16050933号-1
        </div>
    </footer>
</template>

<script>
export default {
    name: "commonFooterPc",
    props: {},
    data() {
        return {};
    },
    mounted: function() {},
    components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.g-main-footer {
    width: 1200px;
    height: 540px;
    font-size: 12px;
    background-color: #fff;
}
.footer-top-left {
    width: calc(100% - 470px);
    padding-left: 146px;
    padding-top: 130px;
}
.footer-top-left > div {
    width: 50%;
}
.friendly-link {
    padding-left: 120px;
}
.footer-img {
    width: 470px;
    height: 460px;
}
.footer-top .footer-img img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
}
.footer-bottom {
    padding-left: 125px;
}
</style>
