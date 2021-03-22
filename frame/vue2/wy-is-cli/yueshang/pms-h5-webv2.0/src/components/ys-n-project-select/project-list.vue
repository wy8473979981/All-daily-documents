<template>
  <div class="select-project-list">
    <div class="header">项目选择(在营)</div>
    <div class="content">
      <div v-for="item in projectList" :key="item.key" :id="item.key">
        <h2 :name="item.key" class="list-item-key" v-if="item.key!='#'">{{ item.key }}</h2>
        <div class="list-item-name" v-for="child in item.children" :key="child.projectId" @click="projeSelected(child)"> {{ child.shortName }}</div>
      </div>

    </div>
    <div class="index-anchor">
      <span :class="'index-anchor-item' + (activeIndex==item.key?' index-anchor-item-active':'') " v-for="item in projectList" :key="item.key" @click="toTegional(item.key)">{{ item.key }}</span>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      activeIndex: null,
      projectList: [],
      indexList: [],
    };
  },
  computed: {
    ...mapGetters(['getPprojectInfo']),
  },
  mounted() {

    if (this.getPprojectInfo) {
      this.getProjectListFormat(this.getPprojectInfo)
    } else {
      if (!this.getCookie('token') && !this.getCookie('uiid')) {
        this.getToken()
      } else {
        this.getProjectList();
      }
    }
  },
  methods: {
    ...mapMutations([
      'setProjectInfo',
    ]),
    async getToken() {
      let params = {
        "uiid": "wangjt2",
        "pwd": "0aac4e6a54c170b06e2bd3848d2b735e",
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
    async getProjectList() {
      try {
        let uiid = this.getCookie('uiid')
        let token = this.getCookie('token')
        let params = { uiid: uiid, token: token }

        let res = await this.$axios.externalLinkServe.getProjectList(params, false)

        if (res.code == 0) {

          let { projectList, grade } = res.data.projectInfo;

          this.setProjectInfo(res.data.projectInfo)

          this.getProjectListFormat(res.data.projectInfo);

        }

      } catch (e) {
        console.log(e)
      }
    },
    getProjectListFormat(projectInfo) {
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
              ],
            },
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
    projeSelected(item) {
      item.projectId = item.bisProjectId
      this.$emit("projeSelected", item);
    },
    toTegional(id) {
      this.activeIndex = id;
      document.querySelector('#' + id).scrollIntoView(true);
    },
  },
};
</script>
<style lang="scss" scoped>
.select-project-list {
  width: 100%;
  height: 100%;
  padding-top: 88px;
  overflow: hidden;
  background-color: #fff;
  color: #333;
  .header {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    z-index: 10;
  }
  .content {
    height: 100%;
    position: relative;
    // padding-top: 88px;
    overflow: scroll;
    background-color: #eee;
    .list-item-key {
      width: 100%;
      height: 92px;
      line-height: 92px;
      font-size: 32px;
      font-weight: bold;
      padding: 0 20px;
      border-bottom: 2px solid #e5e5e5;
      background-color: #eee;
    }
    .list-item-name {
      width: 100%;
      height: 92px;
      line-height: 92px;
      font-size: 32px;
      padding: 0 20px;
      border-bottom: 2px solid #e5e5e5;
      background-color: #fff;
    }
  }
  .index-anchor {
    height: 100%;
    position: fixed;
    right: 0px;
    top: 88px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    text-align: center;
    z-index: 10;
    padding: 120px 20px 20px;
    background-color: #eee;
    .index-anchor-item {
      margin-bottom: 15px;
    }
    .index-anchor-item-active {
      color: #3992ba;
    }
  }
}
</style>
