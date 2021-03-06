<template>
    <div class="treatments">
        <commonHeaderPc></commonHeaderPc>
        <!-- 重疾治疗 -->
        <div class="iframe-content" id="seriousTreatment">
            <div class="cancer">
                <img src="@/assets/images/treatments/cancer.jpg" alt="">
            </div>
            <div>
                <div class="serious-bg">
                    <img src="@/assets/images/treatments/serious-bg.jpg" alt="">
                    <div class="serious-info">
                        <div class="serious-info-title">
                            癌症
                        </div>
                        <p>在医学上，癌是指起源于上皮组织的恶性肿瘤，是恶性肿瘤中最常见的一类。</p>
                        <p>相对应的，起源于间叶组织的恶性肿瘤统称为肉瘤。</p>
                        <p>有少数恶性肿瘤不按上述原则命名，如肾母细胞瘤、恶性畸胎瘤等。</p>
                        <p>一般人们所说的“癌症”习惯上泛指所有恶性肿瘤。</p>
                        <p>癌症具有细胞分化和增殖异常、生长失去控制、浸润性和转移性等生物学特征，</p>
                        <p>其发生是一个多因子、多步骤的复杂过程，分为致癌、促癌、演进三个过程，</p>
                        <p>与吸烟、感染、职业暴露、环境污染、不合理膳食、遗传因素密切相关。</p>
                    </div>
                </div>
            </div>
            <div class="cancer">
                <img src="@/assets/images/treatments/diabetes.jpg" alt="">
            </div>
            <div class="diabetes-bg">
                <img src="@/assets/images/treatments/serious-bg.jpg" alt="">
                <div class="serious-info">
                    <div class="serious-info-title">
                        糖尿病
                    </div>
                    <p>糖尿病是一组以高血糖为特征的代谢性疾病。高血糖则是由于胰岛素分泌缺陷或其生物作用受损，或两者兼有引起。</p>
                    <p>糖尿病时长期存在的高血糖，导致各种组织，特别是眼、肾、心脏、血管、神经的慢性损害、功能障碍。</p>
                    <p>1．遗传因素</p>
                    <p>1型或2型糖尿病均存在明显的遗传异质性。糖尿病存在家族发病倾向，1/4～1/2患者有糖尿病家族史。</p>
                    <p>临床上至少有60种以上的遗传综合征可伴有糖尿病。1型糖尿病有多个DNA位点参与发病，其中以HLA抗原基因中DQ位点多态性关系最为密切。</p>
                    <p>在2型糖尿病已发现多种明确的基因突变，如胰岛素基因、胰岛素受体基因、葡萄糖激酶基因、线粒体基因等。</p>
                    <p>2．环境因素</p>
                    <p>进食过多，体力活动减少导致的肥胖是2型糖尿病最主要的环境因素，使具有2型糖尿病遗传易感性的个体容易发病。</p>
                    <p>1型糖尿病患者存在免疫系统异常，在某些病毒如柯萨奇病毒，风疹病毒，腮腺病毒等感染后导致自身免疫反应，破坏胰岛素β细胞。</p>
                </div>
            </div>
        </div>
        <commonFooterPc></commonFooterPc>
    </div>
</template>

<script>
import commonHeaderPc from "@/components/common-header-pc/common-header-pc";
import commonFooterPc from "@/components/common-footer-pc/common-footer-pc";
export default {
    name: "treatments",
    data() {
        return {
            msg: "Welcome to Your Vue.js App"
        };
    },
    created: function() {
        this.$route.params;
    },
    components: {
        commonHeaderPc,
        commonFooterPc
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cancer {
    width: 100%;
    height: 630px;
}

.cancer img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
}

.serious-bg {
    width: 1052px;
    margin: 0 auto;
    position: relative;
    height: 442px;
}

.serious-bg img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
    position: absolute;
    top: -82px;
}

.serious-info {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: -82px;
    z-index: 99;
    color: #fff;
    text-align: center;
    padding-top: 70px;
    font-size: 12px;
    margin-left: -20px;
}

.serious-info-title {
    width: 78px;
    height: 60px;
    text-align: center;
    font-size: 24px;
    border-left: 3px solid #fff;
    border-bottom: 3px solid #fff;
    line-height: 55px;
    margin: 0 auto;
    margin-bottom: 30px;
    font-family: DengXian;
    white-space: nowrap;
    padding-left: 5px;
    margin-bottom: 39px;
}

.diabetes-bg {
    width: 1052px;
    margin: 0 auto;
    position: relative;
    height: 550px;
}

.diabetes-bg img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
    position: absolute;
    top: -82px;
}
</style>
