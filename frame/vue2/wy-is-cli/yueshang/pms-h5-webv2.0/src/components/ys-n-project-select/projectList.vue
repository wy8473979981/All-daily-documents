<template>
  <div class="project-list">
    <van-index-bar :index-list="indexList" highlight-color="#3a96bd" :sticky="false" :z-index="9999999999">
      <div v-for="item in projectList" :key="item.key">
        <van-index-anchor :index="item.key">{{ item.key }}</van-index-anchor>
        <van-cell :title="child.shortName" v-for="child in item.children" :key="child.bisProjectId" @click="projeSelected(child)"> </van-cell>
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import {
  mapMutations,
  mapGetters
} from "vuex";
export default {
  data () {
    return {
      projectList: [],
      indexList: [],
    };
  },
  props: {
    moduleName: {
      // 区分招商分析（zhaoshang）和其他模块
      type: String,
      default: 'all',
    }
  },
  computed: {
    ...mapGetters([]),
  },
  mounted () {

    let projectInfo = this.$store.state.projectInfo;
    let zsProjectInfo = this.$store.state.zsProjectInfo;

    // console.log(projectInfo, 'projectInfo')
    // console.log(zsProjectInfo, 'zsProjectInfo')
    // console.log(this.moduleName, 'this.moduleName')

    if (this.moduleName == 'all' && projectInfo) {

      this.getProjectListFormat(projectInfo)

    } else if (this.moduleName == 'yysj' && projectInfo) {

      this.getProjectListFormat(projectInfo)

    } else if (this.moduleName == 'zhaoshang' && zsProjectInfo) {

      this.getProjectListFormat(zsProjectInfo)

    } else {

      if (!this.getCookie('token') && !this.getCookie('uiid') && this.moduleName != 'zhaoshang') {
        // 本地没有存储 登录信息  并且 除了 招商分析 
        this.getToken()

      } else {

        this.getProjectList();

      }

    }

  },
  methods: {
    ...mapMutations([
      'setProjectInfo',
      'setWatermarkText',
    ]),
    async getToken () {
      if (this.$isWxwork) {
        return
      }
      let params = {
        "uiid": "wangjt2",
        "sing": "aa488217894e38730728946b34a7d3a6",
        "device": "",
        "product": "pdm",
        "command": "eMail"
      }
      let res = await this.$axios.externalLinkServe.getToken({ data: params }, true)
      this.setCookie("uiid", res.userId)
      this.setCookie("token", res.token)
      this.getProjectList()
    },
    async getProjectList () {
      try {
        if (this.moduleName == 'all' || this.moduleName == 'yysj') {
          let uiid = this.getCookie('uiid')
          let token = this.getCookie('token')
          let params = null
          if (this.moduleName == 'yysj') {
            params = { uiid: uiid, token: token, source: this.moduleName }
          } else {
            params = { uiid: uiid, token: token }
          }
          let res = await this.$axios.externalLinkServe.getProjectList(params, false)
          if (res.code == 0) {
            let userName = ''
            let mobilePhone = ''
            if (res.data && res.data.userInfo && res.data.userInfo.acct) {
              userName = res.data.userInfo.acct.userName
              mobilePhone = res.data.mobilePhone ? res.data.mobilePhone.substr(7) : ''
            }
            let watermarkText = userName + mobilePhone
            this.setWatermarkText(watermarkText)
            this.setProjectInfo(res.data.projectInfo)
            this.getProjectListFormat(res.data.projectInfo)
          }
        } else {
          // 招商分析
          let params = { operStatus: 1 }
          let res = await this.$axios.zhaoshangServe.getMakeBusnessProjectList(params, false)
          this.$store.commit("setZsProjectInfo", { projectList: res.data, grade: 0 })
        }
      } catch (e) {
        console.log(e)
      }
    },
    getProjectListFormat (projectInfo) {
      try {
        let result = [];
        let { projectList, grade } = projectInfo
        if (grade == 0) {
          result = [
            {
              key: "#",
              children: [
                {
                  shortName: "全部",
                },
              ]
            }
          ];
        }
        projectList.forEach((item) => {
          let key = item.projectShortName.slice(0, 1);
          let temp = result.find((v) => v.key === key);
          if (temp) {
            temp.children.push(item);
          } else {
            result.push({
              key: key,
              children: [item],
            });
          }
        });
        this.indexList = result.map((item) => item.key);
        this.projectList = result;
      } catch (e) {
        console.log(e)
      }
    },
    projeSelected (item) {
      item.projectId = item.bisProjectId
      this.$emit("projeSelected", item);
    },
  },
};
</script>
<style lang="scss" scoped>
.project-list {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #fff;
  color: #333;
  margin-bottom: 90px;
}
/deep/.van-index-bar__index {
  font-size: 28px;
  line-height: 40px;
}
/deep/.van-index-bar {
  padding-bottom: 90px;
}
/deep/.van-index-anchor {
  width: 100%;
  height: 92px;
  line-height: 92px;
  font-size: 32px;
  font-weight: bold;
  padding: 0 20px;
  border-bottom: 2px solid #e5e5e5;
  background: #eee;
}
</style>
