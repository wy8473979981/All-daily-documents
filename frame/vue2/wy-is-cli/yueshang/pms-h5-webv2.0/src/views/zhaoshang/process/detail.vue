<template>
  <div class="home" v-webTitle :data-title="`招商进度-项目`">
    <div class="header-top">
      <ys-n-nav-bar :title="`招商进度-项目`" />
      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left">
            <ys-n-project-select :moduleName="'zhaoshang'" :selected="selected" @projeSelected="projeSelected" :dilogShow="false" :disabledAll="true"></ys-n-project-select>
          </div>
        </div>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ys-n-section :title="chartsTitle" :collapseable="collapseable" :hasTable="true">
        <div slot="head-actions" class="head-actions">
          <div class="list-mode">
            <span :class="'list-mode-item ' + (table.mode == '2' ? 'active' : '')" @click="onListModeChanged" data-value="2">建筑面积</span>
						<span class="line"> | </span>
            <span :class="'list-mode-item ' + (table.mode == '3' ? 'active' : '')" @click="onListModeChanged" data-value="3">计租面积</span>
						<span class="line"> | </span>
            <span :class="'list-mode-item ' + (table.mode == '1' ? 'active' : '')" @click="onListModeChanged" data-value="1">品牌数量</span>
          </div>
        </div>
        <ys-n-table :fixednum="2"  :values="table.dataList" :columns="table.columns" :mode="table.mode" @row-column-click="onRowColumnClick"></ys-n-table>
      </ys-n-section>
    </van-pull-refresh>
  </div>
</template>

<script>

const columnList = [{
  label: "序号",
  width: "1.3rem",
  align: "left",
  fixed:true
},{
  label:'',
  key: "businessName",
  width: "2rem",
  align: "left",
  fixed:true
},
{
  label: '1月',
  key: 'janValue',
  width: '1.8rem',
  align: 'right'
}, {
  label: '2月',
  key: 'febValue',
  width: '1.8rem',
  align: 'right'
}, {
  label: '3月',
  key: 'marValue',
  width: '1.8rem',
  align: 'right'
}, {
  label: '4月',
  key: 'aprValue',
  width: '1.8rem',
  align: 'right'
}, {
  label: '5月',
  key: 'mayValue',
  width: '1.8rem',
  align: 'right'
}, {
  label: '6月',
  key: 'junValue',
  width: '1.8rem',
  align: 'right'
}, {
  label: '7月',
  key: 'julValue',
  width: '1.8rem',
  align: 'right'
}, {
  label: '8月',
  key: 'augValue',
  width: '1.8rem',
  align: 'right'
}, {
  label: '9月',
  key: 'sepValue',
  width: '1.8rem',
  align: 'right'
}, {
  label: '10月',
  key: 'octValue',
  width: '1.8rem',
  align: 'right'
}, {
  label: '11月',
  key: 'novValue',
  width: '1.8rem',
  align: 'right'
}, {
  label: '12月',
  key: 'decValue',
  width: '1.8rem',
  align: 'right'
},
{
  label: '累计',
  key: 'decValue',
  width: '1.8rem',
  align: 'right'
}
]
export default {
  name: "detial",
  data () {
    return {
      isLoading: false,
      collapseable: false,
      chartsTitle: "筹备招商进度",
      selected: {
        projectId: this.$route.query.projectId,
        label: this.$route.query.projectName,
      },
      currentTab: "1", //tab选中项
      params: {
        /* chargeType: "0",
        projectId: null,
        projectName: null,
        yearMonth:'',
        menuType: 1 */
        projectId: this.$route.query.projectId,
        projectName: this.$route.query.projectName,
        offset: 1,
        limit: 200,
        conditionType: 1,
        menuType: 1,
        realCompletedYm: this.$route.query.yearAndMonth ? this.$route.query.yearAndMonth : this.$util.getDefaultDate("month")
      },
      tabList: [{
        name: '累计招商',
        code: 1
      },
      {
        name: '当月招商',
        code: 2
      }
      ],
      table: {
        mode: '1',
        totalRow: null,
        dataList: [],
        columns: columnList
      },
    }
  },
  created () {
    this.getDataList()
	columnList.map(item => {
		if(item.key === 'businessName') {
			item.label = this.$route.query.projectName
		}
	})
  },
  methods: {
    onRefresh () {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false
      }, 0)
      this.getDataList()
    },
    projeSelected (item) {
      console.log(item);
      this.setData({
        ["params.projectId"]: (item && item.projectId) || "",
        ["params.projectName"]: (item && item.shortName) || "",
      });
      this.getDataList()
    },
    dateSelected (date) {
      console.log(date);
      this.setData({
        ["params.yearMonth"]: date,
      });
      this.getDataList()
      // },
    },
    tabClickFunc (data) {
      this.currentTab = data
    },
    searchType (item) { },
    onListModeChanged (e) {
      const mode = e.target.dataset.value;
      console.log(mode)
      this.table.mode = mode
      this.params.conditionType = parseInt(mode)
      this.getDataList()

    },
    onRowColumnClick (e) {

    },
    async getDataList () {
      delete this.params.token
      let res = await this.$axios.zhaoshangServe.getTableDetailData(this.params)
      this.isLoading = false
      this.setData({
        "table.dataList": res.data.list.slice(0, -1),
        "table.totalRow": res.data.list.slice(-1)[0],
      });
    },
  },
}
</script>

<style>
</style>
