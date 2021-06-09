<template>
  <div class="project-select">
    <div @click="openFunc">
      <div class="comparison">对比</div>
    </div>
    <div :class="'project-select-content ' + (scrollHeight? 'project-select-content-top' : ' ')" v-if="showModal">
      <div class="selected">
        <div class="label">已选</div>
        <div class="selected-list">
          <div v-for="(item, index) in selectedList" :key="index" class="selected-item" @click="remove(item)" :data-value="item.value">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-clear">X</div>
          </div>
        </div>
      </div>
      <div class="project-list">
        <van-checkbox-group v-model="selectResult" @change="checkboxChange">

          <van-checkbox v-for="(item, index) in projectList" :name="item.value" :key="index" shape="square" checked-color="#3A96BD" icon-size="16px" class="weui-cell weui-check__label">{{ item.name }}</van-checkbox>
        </van-checkbox-group>

      </div>
      <div class="button-box">
        <div class="cancel btn" @click="cancel">取消</div>
        <div class="reset btn" @click="reset">重置</div>
        <div class="confirm btn" @click="confirm">完成</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // routerParams: this.$route.query,
      showModal: false,
      selectResult: [],
      projectList: [],
      selectedList: [],
      params: {
        limit: 100,
        offset: 1,
      },
      scrollHeight: false,
    };
  },

  components: {},
  props: {
    query: {
      type: Object,
      default: {}
    }
  },
  mounted () {
    let query = this.query; // params.bisShopSortId = params.bisShopSortId && params.bisShopSortId.split(",");

    this.setData({
      params: query,
    });
    this.getDataList();
  },
  methods: {
    openFunc () {
      let dom = document.querySelector('#app');
      this.scrollHeight = dom.scrollTop > 0 ? true : false
      this.showModal = !this.showModal
    },
    checkboxChange (value) {
      let values = value;
      let result = this.projectList.filter((item) => {
        return values.indexOf(item.value) > -1;
      });
      this.projectList.forEach((item) => {
        if (values.indexOf(item.value) > -1) {
          item.checked = true;
        }
      });
      this.setData({
        selectedList: result,
        selectResult: values
      });
    },

    async getDataList () {
      try {
        await this.$axios.merchantServe.getMerchantList(this.params, false).then(res => {
          if (res.code == 200) {
            let result = res.data.list.map((item) => {
              return {
                value: item.bisShopId,
                name: item.merchantsChineseName,
              };
            });
            this.setData({
              projectList: result,
            });
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    remove (item) {
      let value = item.value;
      let data = this.projectList;
      let result = this.selectedList.filter((item) => {
        return item.value !== value;
      });
      let selectResult = result.map(item => {
        return item.value
      })
      data.forEach((item) => {
        if (item.value === value) {
          console.log(item, 'item')
          console.log(value, 'value')
          item.checked = false;
        }
      });
      this.setData({
        selectedList: result,
        projectList: data,
        selectResult: selectResult
      });
    },

    reset () {
      let data = this.projectList;
      data.forEach((item) => {
        item.checked = false;
      });
      this.setData({
        projectList: data,
        selectedList: [],
        selectResult: []
      });
    },

    cancel () {
      this.reset();
      this.$util.showTabStatus('true', 'true')
      this.showModal = false
    },

    confirm () {
      try {
        let list = this.selectedList.map((item) => item.value);
        let ids = list.join(",");
        if (list.length < 2) {
          this.$Toast.fail('对比项目过少');
        } else {
          this.$util.showTabStatus('true', 'true')
          this.showModal = false
          this.$util.pageGo("/merchant/sjbj", { ids: ids })
        }
      } catch (e) {
        console.log(e)
      }

    },
  },
};
</script>
<style lang="scss" scoped>
.project-select {
  width: 100%;
  height: calc(100% - 140px);
}
.selected {
  display: flex;
  align-items: center;
  padding: 32px 30px;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
}
.label {
  margin-right: 20px;
  font-size: 24px;
  padding: 10px 15px;
}
.selected-list {
  display: flex;
  flex: 1;
  overflow: auto;
}
.selected-item {
  font-size: 24px;
  padding: 10px 15px;
  background-color: rgba(55, 143, 183, 0.1);
  color: #3b96be;
  display: flex;
  margin-left: 25px;
  flex-shrink: 0;
  align-items: center;
}
.item-clear {
  margin-left: 10px;
  height: 0.3rem;
}
.project-list {
  height: calc(100% - 240px);
  background-color: #fff;
  overflow: auto;
  font-size: 0.35rem;
}
.button-box {
  padding: 30px;
  display: flex;
  justify-content: flex-end;
}
.btn {
  font-size: 28px;
  background-color: #d8d8d8;
  color: #333;
  width: 160px;
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  text-align: center;
}
.btn:active {
  opacity: 0.5;
}
.confirm {
  background: linear-gradient(350deg, #37acdd 0%, #1e5385 100%);
  color: #fff;
}

.weui-cell {
  padding: 22px 32px;
  font-size: 0.35rem;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.weui-check__label {
  -webkit-click-highlight-color: rgba(0, 0, 0, 0);
}
.project-select-content {
  height: calc(100% - 140px);
  width: 100%;
  background-color: #fff;
  position: fixed;
  top: 140px;
  left: 0;
  z-index: 200;
  color: #000;
}
.project-select-content-top {
  top: 0px;
  height: 100%;
}
.comparison {
  width: 1.066667rem;
  height: 1.066667rem;
  position: fixed;
  line-height: 1.066667rem;
  right: 0.8rem;
  bottom: 0.8rem;
  border-radius: 50%;
  background: linear-gradient(340deg, #40b9ed 0%, #0067c7 100%);
  color: #fff;
  text-align: center;
  z-index: 101;
}
</style>
