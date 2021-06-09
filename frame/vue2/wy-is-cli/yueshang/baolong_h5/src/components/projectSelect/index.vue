<template>
  <div class="project-select">
    <div class="project-select-label" @click="showPrejectList">
      <div class="project-select-name ellipsis">{{ component.label }}</div>
      <van-image width="10" height="5" :src="component.arrowDown" />
      <div class="project-leader" @click.stop="showLeaderManage" v-if="component.bisProjectId">
        <van-image width="0.7rem" height="0.7rem" :src="component.leaderImgUrl" />
        <div class="leader-manager">项目总</div>
      </div>
    </div>
    <van-overlay :show="component.showLeaderDetail" @click="component.showLeaderDetail = false">
      <div class="project-leader-modal">
        <div class="leader-modal-inner">
          <div class="leader-modal-inner-content" v-if="leaderDetail">
            <div class="leader-name">{{ leaderDetail.userName }}</div>
            <div v-for="(item, index) in leaderDetail.resultList" :key="index" class="leader-title">
              {{ item.workDuty }} ({{ item.type === 1 ? item.startDate : item.startDate + "-" + item.endDate }})
            </div>
            <div class="leader-title">入职：{{ leaderDetail.attendWorkDate }}</div>
            <div class="leader-title">
              联系电话：
              <a class="leader-phone" @click="calling(leaderDetail.mobilePhone)">{{ leaderDetail.mobilePhone }}</a>
              <!-- <a :href="'tel:'+leaderDetail.mobilePhone" class='leader-phone'>{{ leaderDetail.mobilePhone }}</a> -->
            </div>
          </div>
          <div class="leader-close" @tap="component.showLeaderDetail = false">X</div>
        </div>
      </div>
    </van-overlay>
    <van-overlay :show="showProjectList">
      <div class="header">项目选择(在营)</div>
      <projectList @projeSelected="projeSelected"></projectList>
    </van-overlay>
  </div>
</template>
<script>
import arrowDown from "../../assets/images/icon-selector-arrow.png";
import leader from "../../assets/images/leader.png";
import projectList from "./projectList";
export default {
  data () {
    return {
      component: {
        label: "全部",
        bisProjectId: "",
        arrowDown,
        leaderImgUrl: leader,
        showLeaderDetail: false,
        selected: {},
      },
      showProjectList: false,
      leaderDetail: {
        userName: "张三三",
        mobilePhone: 13855630594,
        resultList: [
          {
            workDuty: "总经理",
            startDate: "2020-01-01",
            endDate: "2020-01-01",
          },
          {
            workDuty: "总经理111",
            startDate: "2020-01-01",
            endDate: "2020-01-01",
          },
        ],
      },
    };
  },
  props: {
    selected: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    selected: {
      handler: function (newValue) {
        this.component.label = newValue.label || "全部";
        this.component.bisProjectId = newValue.bisProjectId;
      },
      immediate: true,
      deep: true,
    },
    $route (to, from) {
      console.log(to, from);
    },
  },
  methods: {
    showLeaderManage () {
      this.component.showLeaderDetail = true;
      console.log(this.component.bisProjectId);
    },
    calling (phone) {
      console.log(phone);
      // if (window.WebViewJavascriptBridge) {
      // 	window.WebViewJavascriptBridge.callHandler("phoneAction", { param: "打电话", phone }, function(responseData) {});
      // 	return;
      // } else if (window.webkit && window.webkit.messageHandlers) {
      // 	window.webkit.messageHandlers.phoneAction.postMessage({ param: "打电话", phone });
      // 	return;
      // }
    },
    showPrejectList () {
      this.showProjectList = true;
    },
    projeSelected (item) {
      this.showProjectList = false;
      this.component.label = item.shortName;
      this.component.bisProjectId = item.bisProjectId;
      this.$emit("projeSelected", item);
    },
  },
  components: {
    projectList,
  },
  mounted () { },
};
</script>
<style lang="scss" scoped>
.project-select-label {
  display: flex;
  align-items: center;
  .project-select-name {
    max-width: 1.7rem;
    padding-right: 3px;
  }
  .project-leader {
    margin-left: 10px;
    display: flex;
    align-items: center;
    .leader-manager {
      margin-left: 5px;
    }
  }
}

/* 项目总 */
.leader-modal-inner {
  position: absolute;
  width: 100%;
  opacity: 0.9;
  top: 20%;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 2;
}
.leader-modal-inner-content {
  background: #ffffff;
  padding: 0.6rem;
  width: 6.4rem;
  box-shadow: 3rpx 3rpx 6rpx 0rpx rgba(0, 0, 0, 0.18);
}
.leader-name {
  font-size: 0.53rem;
  font-weight: 600;
  padding: 10rpx 0;
  color: rgb(70, 67, 67);
  margin-bottom: 0.33rem;
  overflow: visible;
}
.leader-title {
  font-size: 0.2rem;
  width: 90%;
  color: #333;
  width: 100%;
  line-height: 1.2;
  margin: 7px 0;
}
.leader-phone {
  color: #3a96bd;
  text-decoration: none;
}
.leader-close {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: #fff;
  line-height: 0.8rem;
  text-align: center;
  color: rgb(70, 67, 67);
  margin-top: 15px;
}
.header {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}
</style>
