<template>
  <div class="project-select">
    <div class="project-select-label" @click="showPrejectList" v-if="projectListBol">
      <div class="project-select-name ellipsis">{{ component.label }}</div>
      <img src="../../assets/images/icon-selector-arrow.png">
      <!-- <van-image width="10" height="5" :src="component.arrowDown" /> -->
      <div class="project-leader" @click.stop="showLeaderManage" v-if="component.projectId">
        <van-image width="0.7rem" height="0.7rem" :src="component.leaderImgUrl" />
        <div class="leader-manager">项目总</div>
      </div>
    </div>
    <div class="project-select-label" v-else>
      <div class="project-select-name ellipsis">{{ component.label }}</div>
      <div class="project-leader" @click.stop="showLeaderManage" v-if="component.projectId">
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
              {{ item.workDuty }} ({{item.startDate + "-" + item.endDate }})
            </div>
            <div class="leader-title">入职：{{ leaderDetail.attendWorkDate }}</div>
            <div class="leader-title">
              联系电话：
              <!-- <a class="leader-phone" @click="calling(leaderDetail.mobilePhone)">{{ leaderDetail.mobilePhone }}</a> -->
              <a :href="'tel:'+leaderDetail.mobilePhone" class='leader-phone'>{{ leaderDetail.mobilePhone }}</a>
            </div>
          </div>
          <!-- <div class="leader-close" @tap="component.showLeaderDetail = false">X</div> -->
          <img class="app-filter-dialog__main__close" @click="component.showLeaderDetail = false" src="../../assets/images/icon-close-ffffff.png" />
        </div>
      </div>
    </van-overlay>
    <div class="project-list" v-if="showProjectList">
      <projectList @projeSelected="projeSelected"></projectList>
    </div>
  </div>
</template>
<script>
import arrowDown from "../../assets/images/icon-selector-arrow.png";
import leader from "../../assets/images/leader.png";
import projectList from "./project-list";
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      projectListBol: true,
      component: {
        label: "全部",
        projectId: "",
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
    disabledAll: {
      type: Boolean,
      default: false,
    },
    // dilogShow: {
    //   type: Boolean,
    //   default: true
    // }
  },
  watch: {
    selected: {
      handler: function (newValue) {
        this.component.label = newValue.label || "全部";
        this.component.projectId = newValue.projectId;

        if (this.getPprojectInfo) {
          let projectInfo = this.getPprojectInfo
          let { projectList } = projectInfo
          if (projectList.length == 1) {
            this.projectListBol = false
            // console.log(this.projectListBol, 'projectListBol')
          } else {
            this.projectListBol = true
            // console.log(this.projectListBol, 'projectListBol')
          }
        }

      },
      immediate: true,
      deep: true,
    },
    $route (to, from) {
      console.log(to, from);
    },

  },
  computed: {
    ...mapGetters(['getPprojectInfo', 'getHasAuth']),
  },
  mounted () {

  },
  methods: {
    showLeaderManage () {
      if (this.component.projectId) {
        this.getProjectInfo()
      }
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
      let productType = this.$route.path.indexOf('zhaoshang') == -1 ? true : false//招商进度项目列表不通过登录获取
      if (!this.getHasAuth && productType) {
        return
      }
      this.showProjectList = true;
    },
    projeSelected (item) {
      if (this.disabledAll) {
        this.showProjectList = false;
        this.component.label = item.shortName;
        this.component.projectId = item.projectId;
        this.$emit("projeSelected", item);
      } else {
        if (item.shortName == "全部") {
          this.$Toast('不能选择全部');
        } else {
          this.showProjectList = false;
          this.component.label = item.shortName;
          this.component.projectId = item.projectId;
          this.$emit("projeSelected", item);
        }
      }
    },
    async getProjectInfo () {
      let res = await this.$axios.externalLinkServe.projectInfo({ bisProjectId: this.component.projectId }, true)
      this.leaderDetail = res.data
      this.component.showLeaderDetail = true;
    },
  },
  components: {
    projectList,
  },

};
</script>
<style lang="scss" scoped>
.project-select-label {
  display: flex;
  align-items: center;
  line-height: 1;
  .project-select-name {
    max-width: 3rem;
    // padding-right: 3px;
    font-size: 32px;
  }
  img {
    margin-left: 5px;
    width: 16px;
    height: 8px;
  }
  .project-leader {
    margin-left: 20px;
    display: flex;
    align-items: center;
    .leader-manager {
      margin-left: 10px;
    }
  }
}
/* 项目总 */
.leader-modal-inner {
  position: absolute;
  width: 100%;
  opacity: 0.9;
  top: 21%;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 2;
}
.leader-modal-inner-content {
  background: #ffffff;
  padding: 40px;
  width: 75%;
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.18);
}
.leader-name {
  font-size: 0.53rem;
  font-weight: 600;
  padding: 10px 0;
  color: rgb(70, 67, 67);
  margin: 10px 0;
  overflow: visible;
}
.leader-title {
  font-size: 28px;
  width: 90%;
  color: #333;
  width: 100%;
  line-height: 1.2;
  margin: 10px 0;
}
.leader-phone {
  color: #3a96bd;
  text-decoration: none;
}
.app-filter-dialog__main__close {
  width: 80px;
  height: 80px;
  background-color: #ffffff;
  border-radius: 50%;
  margin-top: 35px;
}
.van-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000000;
}
.project-list {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 200;
}
</style>
