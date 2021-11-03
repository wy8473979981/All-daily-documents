<template>
  <div class="app-dilog" id="app-dilog">
    <div class="search-criteria-label" @click.stop="showDilog = true;getProjectInfo()">
      <img src="../../assets/images/leader.png" class="person" />
      <span class="search-title">项目总</span>
    </div>
    <van-popup v-model="showDilog" get-container="#app-dilog">
      <div class="leader-modal-inner-content" v-if="leaderDetail">
        <p class="leader-name" v-if="leaderDetail.userName">{{ leaderDetail.userName }}</p>
        <p v-for="(item, index) in leaderDetail.resultList" :key="index" class="leader-title">
          {{ item.workDuty }} ({{ item.type === 1 ? item.startDate : item.startDate + "-" + item.endDate }})
        </p>
        <p class="leader-title" v-if="leaderDetail.attendWorkDate">入职：{{ leaderDetail.attendWorkDate }}</p>
        <p class="leader-title" v-if="leaderDetail.mobilePhone">
          联系电话：
          <a class="leader-phone" @click="calling(leaderDetail.mobilePhone)">{{ leaderDetail.mobilePhone }}</a>
        </p>
      </div>
      <div class="leader-modal-inner-content" v-if="leaderDetail" slot="other"></div>
      <img src="../../assets/images/icon-close-ffffff.png" @click="closePop" class="close" />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDilog: false,
      leaderDetail: null
    };
  },
  props: {
    projectId: {
      type: String,
      default: "",
    },
  },
  methods: {
    async getProjectInfo() {
      console.log(this.projectId)
      let res = await this.$axios.externalLinkServe.projectInfo({ bisProjectId: this.projectId })
      this.leaderDetail = res.data
    },
    closePop() {
      this.showDilog = false
    }
  },
  mounted() { },
}
</script>

<style lang="scss" scoped>
.app-dilog {
  .van-popup {
    z-index: 2002;
    top: 40%;
    overflow: visible;
    .leader-modal-inner-content {
      width: 600px;
      padding: 48px;
      .leader-name {
        font-size: 40px;
        font-weight: 600;
        padding: 5px 0;
        color: rgb(70, 67, 67);
        margin: 10px 0;
      }
      .leader-title {
        font-size: 28px;
        color: #333;
        margin: 10px 0;
      }
    }
  }
  padding-left: 20px;
  .person {
    width: 52px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
  }
  span {
    vertical-align: middle;
  }
  .close {
    position: absolute;
    top: -100px;
    left: 50%;
    width: 80px;
    height: 80px;
    background-color: #ffffff;
    border-radius: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .leader-phone {
    color: #3a96bd;
    text-decoration: none;
  }
}
</style>
