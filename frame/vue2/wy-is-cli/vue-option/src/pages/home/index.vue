<template>
    <div class="index">
        <commonHeaderPc></commonHeaderPc>
        <div class="iframe-content clearfix" id="index" v-cloak>
            <div class="index-img swiper-container">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide><img src="@/assets/images/index/index-img-1.jpg" alt=""></swiper-slide>
                    <swiper-slide><img src="@/assets/images/index/index-img-2.jpg" alt=""></swiper-slide>
                    <swiper-slide><img src="@/assets/images/index/index-img-3.jpg" alt=""></swiper-slide>
                </swiper>
            </div>

            <div class="info-box">
                <!-- 关于多睦 -->
                <div class="index-as-for clearfix">
                    <div class="as-for-duomu pull-left">
                        <div class="as-for-duomu-content">
                            <p class="text-center duomu-title">关于多睦</p>
                            <p style="margin-bottom:4px;">多睦健康（DOMO HEALTH）在日耕耘十多年，是一家专业的、</p>
                            <p style="margin-bottom:4px;">专注于严谨的海外（日本）高端医疗的服务机构，为客户提供一</p>
                            <p style="margin-bottom:25px;">站式、全方位的健康管理服务。</p>
                            <p style="margin-bottom:4px;">我们致力于把日本尖端的医疗技术和安全安心的医疗服务提供给</p>
                            <p style="margin-bottom:4px;">广大的中国贵宾。</p>
                            <p style="margin-bottom:25px;">专注于为客户提供高端海外医疗服务</p>
                            <p style="margin-bottom:25px;">强大的创业、管理及医学顾问团队及专业的翻译团队</p>
                            <p style="margin-bottom:50px;">我们只与日本排名前列的医疗机构合作</p>
                            <div class="btn-box-red" @click="childGoTo('modules/duomu/health.html?mao=0')">
                                <span class="more-red">查看更多</span>
                            </div>
                        </div>
                    </div>
                    <div class="as-for-serve pull-left">
                        <img src="@/assets/images/index/serve-bg.jpg" alt="">
                        <div class="as-for-serve-content">
                            <p class="serve-title">重点服务项目</p>
                            <p style="font-size: 28px;margin-bottom: 25px;">日本高端医疗一站式服务</p>
                            <p style="font-size: 20px;margin-bottom:0px;">名医问诊/手术预约、</p>
                            <p style="font-size: 20px;margin-bottom:0px;">日本早癌筛查/高端精密体检、</p>
                            <p style="font-size: 20px;margin-bottom:0px;">干细胞再生医疗、冻卵/试管婴儿、</p>
                            <p style="font-size: 20px;margin-bottom:0px;">免疫细胞治疗、</p>
                            <p style="margin-bottom: 25px;font-size: 20px;">血液净化抗衰老/螯合疗法</p>
                            <div class="btn-box-fff" @click="childGoTo('modules/duomu/service.html?mao=0')">
                                <span class="more-fff">查看更多</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 权威合作机构 -->
                <div class="cooperation clearfix">
                    <div class="cooperation-title">权威合作机构</div>
                    <div class="cooperation-content clearfix">
                        <div class="cooperation-content-info pull-left">
                            <div class="cooperation-content-info-img">
                                <img alt="" src="@/assets/images/index/cooperation-1.jpg">
                            </div>
                            <div class="cooperation-content-info-title">国立癌症研究中心医院</div>
                            <div class="cooperation-content-info-introduce">
                                国立癌症研究中心中央病院，自从1962年开设 以来就作为癌症专门医院提供世界上最好的医 疗，同时作为日本癌症治疗的领军医院，将最 新的癌症治疗普及全国。 疾病领域：癌症
                            </div>
                            <div class="cooperation-content-info-more" @click="childGoTo('modules/duomu/famousHospital.html?mao=1')">
                                查看更多
                            </div>
                        </div>
                        <div class="cooperation-content-info pull-left">
                            <div class="cooperation-content-info-img">
                                <img alt="" src="@/assets/images/index/cooperation-2.jpg">
                            </div>
                            <div class="cooperation-content-info-title">群马大学重粒子线医学中心</div>
                            <div class="cooperation-content-info-introduce">
                                群马大学为了实现放射线生物学以及基于临床 研究的重粒子线治疗法的高度化，进行必要的 治疗技术的开发，全面推进重粒子线相关研究， 于平成17年6月1日设立了群马大学重粒子线医 学研究中心。群马大学至今一直在日本的放射 线肿瘤学・核医学领域起着引导性的作用。
                            </div>
                            <div class="cooperation-content-info-more" @click="childGoTo('modules/duomu/famousHospital.html?mao=1')">
                                查看更多
                            </div>
                        </div>
                        <div class="cooperation-content-info pull-left">
                            <div class="cooperation-content-info-img">
                                <img alt="" src="@/assets/images/index/cooperation-3.jpg">
                            </div>
                            <div class="cooperation-content-info-title">东京医科大学附属医院</div>
                            <div class="cooperation-content-info-introduce">
                                为学校法人东京医科大学运营的大学医院。成 立于1916年，已创立百年。目前共拥有1015张 病床，拥有医生及护士等2599名。东京医科大 学病院中央检查部，于2015年3月12日取得了 国际规格ISO15189：2012「临床检查室－品 质和能力特定要求事项」的认定。（认定号码 RML00900）。东京医科大学附属医院在泌尿 科、脑神经外科等都具备非常出色的研究能力 及丰富的临床经验。
                            </div>
                            <div class="cooperation-content-info-more" @click="childGoTo('modules/duomu/famousHospital.html?mao=1')">
                                查看更多
                            </div>

                        </div>
                    </div>
                </div>
                <!-- 团队 -->
                <div class="team clearfix">
                    <div class="serve-team pull-left">
                        <div class="serve-team-title">服务团队</div>
                        <div class="serve-team-info">
                            公司的创始人及高管均有十年以上的日本驻在背 景，名校毕业，对日本医疗机构状况及制度有深 刻的理解与认识。同时，我们的医学顾问团队均 来自北京/上海三甲医院，多数人员拥有日本及美 国名校医学专业背景。
                        </div>
                        <hr/>
                        <div class="serve-team-img">
                            <img src="@/assets/images/index/serve-team.png" alt="">
                        </div>
                        <hr/>
                    </div>
                    <div class="specialist-team pull-left">
                        <div class="specialist-team-title">专家团队</div>
                        <div class="specialist-team-info">
                            <ul>
                                <li class="clearfix">
                                    <div class="name pull-left">藤井隆广</div>
                                    <div class="subject pull-left">
                                        <p>隶属医院及科室：国立癌症中心</p>
                                        <p>擅长领域： 癌症早期检查&nbsp;&nbsp;内视镜检查</p>
                                    </div>
                                </li>
                                <li class="clearfix">
                                    <div class="name pull-left">紫芝良昌</div>
                                    <div class="subject pull-left">
                                        <p>紫芝良昌</p>
                                        <p>擅长领域： 高血压&nbsp;&nbsp; 内分泌内科</p>
                                    </div>
                                </li>
                                <li class="clearfix">
                                    <div class="name pull-left">高橋慶一</div>
                                    <div class="subject pull-left">
                                        <p>隶属医院及科室: 癌症・感染症中心都立驹込病</p>
                                        <p>擅长领域：大肠癌</p>
                                    </div>
                                </li>
                                <li class="clearfix">
                                    <div class="name pull-left">鈴木健司</div>
                                    <div class="subject pull-left">
                                        <p>隶属医院及科室: 顺天堂大学医学部附属顺天堂</p>
                                        <p>擅长领域： 肺癌 纵膈肿伤 &nbsp;&nbsp;气胸&nbsp;&nbsp; 炎症性肺疾病</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="btn-box-red" @click="childGoTo('modules/duomu/doctor.html?mao=9')">
                            <span class="more-red">查看更多</span>
                        </div>
                    </div>
                </div>

                <!-- 资讯 -->
                <div class="news">
                    <div class="news-title">资讯</div>
                    <div class="news-list clearfix">
                        <ul class="clearfix">

                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <commonFooterPc></commonFooterPc>
    </div>
</template>

<script>
import commonHeaderPc from "@/components/common-header-pc/common-header-pc";
import commonFooterPc from "@/components/common-footer-pc/common-footer-pc";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
    name: "index",
    data() {
        return {
            swiperOption: {
                //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
                // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                notNextTick: true,
                // swiper configs 所有的配置同swiper官方api配置
                autoplay: 3000,
                loop: true,
                direction: "horizontal",
                grabCursor: true,
                setWrapperSize: true,
                autoHeight: true,
                mousewheelControl: true,
                observeParents: true,
            }
        };
    },
    methods: {},
    mounted: function() {
        this.axios.get('https://cnodejs.org/api/v1/topics?page=1&tag=good&limit=1&mdrender=false').then(response => {
                return response.data.data[0].author.loginname;//name
             }).catch(console.log);
    },
    components: {
        commonHeaderPc,
        commonFooterPc,
        swiper,
        swiperSlide
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
    background-color: #eeeded !important;
}

.iframe-content .index-img {
    width: 100%;
    height: 638px;
}

.iframe-content .index-img img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
}

.info-box {
    width: 1052px;
    height: auto;
    margin: 0 auto;
}

.index-as-for {
    width: 100%;
    position: relative;
}

.as-for-duomu {
    width: 588px;
    height: 587px;
    margin-top: -52px;
    padding: 0 123px 0 111px;
    position: absolute;
    z-index: 999;
    background-color: #fff;
    color: #1e1b1a;
}

.as-for-duomu-content {
    width: 100%;
    font-size: 12px;
    margin: 0 auto;
}
.as-for-duomu-content p {
    margin-bottom: 0px;
}
.as-for-duomu-content .duomu-title {
    margin-bottom: 49px;
    margin-top: 127px;
    font-size: 22px;
    color: #c93916;
}

.as-for-serve {
    background: #ccc;
    background-size: contain;
    width: 464px;
    height: 635px;
    margin-top: 21px;
    position: absolute;
    right: 5px;
    z-index: 1000;
}

.as-for-serve img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
}

.as-for-serve .as-for-serve-content {
    width: 100%;
    height: 100%;
    text-align: center;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
}

.as-for-serve-content .serve-title {
    margin-bottom: 50px;
    margin-top: 134px;
    font-size: 24px;
}

.btn-box-red {
    border: 1px solid #c93916;
    width: 203px;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    text-align: center;
    margin: 0 auto;
    cursor: pointer;
}

.more-red {
    color: #c93916;
}

.btn-box-fff {
    border: 1px solid #fff;
    width: 203px;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    text-align: center;
    margin: 0 auto;
    cursor: pointer;
}

.more-fff {
    color: #fff;
}

.cooperation {
    width: 100%;
    margin-top: 658px;
    background-color: #fff;
}

.cooperation .cooperation-title {
    padding: 80px;
    color: #c93916;
    font-size: 20px;
    text-align: center;
}

.cooperation .cooperation-content {
    width: 100%;
    min-height: 300px;
    height: auto;
    background: #fff;
    padding: 0 120px 50px;
}

.cooperation .cooperation-content .cooperation-content-info {
    width: 30%;
}

.cooperation .cooperation-content .cooperation-content-info:nth-child(2) {
    margin: 0 40px;
}

.cooperation-content-info .cooperation-content-info-img {
    width: 100%;
    height: 325px;
}

.cooperation .cooperation-content .cooperation-content-info img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
}

.cooperation-content-info .cooperation-content-info-title {
    font-size: 16px;
    margin: 25px 0;
}

.cooperation-content-info .cooperation-content-info-introduce {
    line-height: 24px;
    font-size: 12px;
    margin-bottom: 20px;
}

.cooperation-content-info .cooperation-content-info-more {
    width: 100px;
    color: #c93916;
    padding: 5px 0;
    cursor: pointer;
    border-bottom: 2px solid #c93916;
}

.team {
    width: 100%;
    min-height: 10px;
    height: auto;
    margin: 67px 0 75px;
}

.team .serve-team {
    width: 351px;
    color: #fff;
    padding: 90px 0 110px;
    margin-top: 62px;
    position: absolute;
    background: #ca492a;
}

.team .serve-team hr {
    width: 75%;
    margin: 40px auto;
}

.team .serve-team .serve-team-title {
    width: 75%;
    margin: 0 auto 25px;
    font-size: 20px;
    font-weight: 100;
    text-align: center;
}

.team .serve-team .serve-team-info {
    width: 75%;
    font-weight: bold;
    line-height: 21px;
    margin: 0 auto;
    font-size: 12px;
}

.team .serve-team .serve-team-img {
    width: 75%;
    height: 175px;
    margin: 0 auto;
}

.team .serve-team .serve-team-img img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
}

.team .specialist-team {
    width: 728px;
    padding: 95px 80px 80px;
    margin-left: 323px;
    background: #fff;
}

.team .specialist-team .specialist-team-title {
    font-size: 24px;
    text-align: center;
    font-weight: 100;
    margin-bottom: 80px;
    color: #c93916;
}

.team .specialist-team .specialist-team-info {
    margin-bottom: 30px;
}
.team .specialist-team .specialist-team-info p {
    margin-bottom: 5px;
}
.team .specialist-team ul {
    padding-left: 0px;
}

.team .specialist-team ul > li {
    height: 130px;
    font-size: 14px;
    list-style: none;
    border-top: 1px solid #ccc;
}

.team .specialist-team ul > li .name {
    width: 30%;
    text-align: center;
    line-height: 130px;
    font-weight: bold;
}

.team .specialist-team ul > li .subject {
    width: 70%;
    height: 100%;
    padding-top: 40px;
    font-weight: bold;
}

.news {
    width: 100%;
    height: auto;
    background: #fff;
}

.news .news-title {
    padding: 80px 0 50px;
    text-align: center;
    font-size: 18px;
    background: url(../../assets/images/index/news-title-bg.png) no-repeat;
    background-size: 115px;
    background-position-x: 20px;
}

.news .news-list {
    min-height: 200px;
    height: auto;
    background: #fff;
    width: 95%;
    margin: 0 auto;
    padding: 50px 0 80px;
    border-top: 1px solid #ccc;
}

.news-list ul {
    padding: 0 20px;
    font-size: 12px;
}

.news-list ul li {
    width: 33%;
    height: 250px;
    list-style: none;
    padding: 0 20px;
    float: left;
}

.news-list ul li:nth-child(2) {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
}

.news-list ul li p {
    margin: 0;
}

.news-list ul li p.time {
    margin-bottom: 20px;
}

.news-list ul li p.name {
    font-weight: bold;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.news-list ul li p.info {
    font-weight: bold;
    width: 100%;
}
.news-list ul li p.mg-b {
    margin-bottom: 20px;
}
.news-list ul li .news-box {
    margin-bottom: 20px;
    cursor: pointer;
}
</style>
