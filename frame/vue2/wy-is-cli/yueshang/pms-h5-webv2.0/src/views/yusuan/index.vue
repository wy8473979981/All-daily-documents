<template>
  <!-- 入口 -->
  <div class="yusuan-index">
  </div>
</template>

<script>
import { projectPageMap } from "./datasource";
export default {
  data () {
    return {
      projectId: null,
      projectName: null,
      routerParams: this.$route.query,
      user: this.$store.state.user
    };
  },
  watch: {
    user() {
      this.getProjectList()
    }
  },
  created () {
  },
  mounted () {
    setTimeout(() => {
      this.getProjectList()
    },500)
  },
  methods: {
    async loadMenu () {
      try {
        // this.$Notify({ type: 'warning', message: 'loadMenu' })
        await this.$axios.yusuanServe.getBudgetInstanceSheet({ projectId: this.projectId }, false).then((res) => {
          if (res && res.code == 0) {
            // this.$Notify({ type: 'warning', message: 'loadMenu' + res.code })
            let url = ''
            if (res.data && res.data.length > 0) {
              const { id, budgetSheetId } = res.data[0]
              url = projectPageMap[budgetSheetId][1];
              const mParam = {
                id,
                projectName: this.projectName || '',
                projectId: this.projectId || '',
                budgetSheetId: budgetSheetId || ''
              }
              this.$router.replace({ path: url, query: mParam })
            }
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getProjectList () {
      try {
        // this.$Notify({ type: 'warning', message: 'getProjectList' })
        let uiid = this.routerParams.uiid
        let token = this.routerParams.token
        if(this.$store.state.user) {
          uiid = this.$store.state.user.uiid
          token = this.$store.state.user.token
        }
        if(!this.getCookie('uiid')){
          return
        }
        if(!uiid || uiid=== 'null' || uiid=== 'undefined' || !token || token === 'null' || token === 'undefined') {
          return
        }
        let params = { uiid: uiid, token: token }
        await this.$axios.externalLinkServe.getProjectList(params, false).then(res => {
          if (res.code == 0) {
            // this.$Notify({ type: 'warning', message: 'getProjectList' + res.code })
            let { projectList, grade } = res.data.projectInfo;
            if (grade == 2) {
              // grade=0，有全部，grade=2 没有全部
              if (projectList && projectList.length > 0) {
                let firstItem = projectList[0];
                // grade=2 默认使用第一个 项目
                this.setData({
                  projectId: firstItem.bisProjectId,
                  projectName: firstItem.shortName
                });
              }
            } else {
              this.setData({
                projectId: "",
                projectName: ""
              });
            }

            let userName = ''
            let mobilePhone = ''
            if (res.data && res.data.userInfo && res.data.userInfo.acct) {
              userName = res.data.userInfo.acct.userName
              mobilePhone = res.data.mobilePhone ? res.data.mobilePhone.substr(7) : ''
            }
            let watermarkText = userName + mobilePhone

            this.$store.commit('setHasAuth', true)//是否有 项目列表操作权限
            this.$store.commit('setWatermarkText', watermarkText)
            this.$store.commit('setProjectInfo', res.data.projectInfo)
            this.loadMenu();
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
  }
};
</script>
<style>
</style>
