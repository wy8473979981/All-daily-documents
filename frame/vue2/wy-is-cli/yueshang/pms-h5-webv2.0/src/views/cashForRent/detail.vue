<template>
  <div class="cashForRent" v-webTitle :data-title="`押不抵租-项目`">
    <div class="header-top">
      <ys-n-nav-bar :title="`押不抵租-项目`" />
      <div class="app-header">
        <div class="app-header-container">
          <div class="app-header-left">
            <ys-n-project-select :moduleName="'yysj'" :selected="selected" @projeSelected="projeSelected" :disabledAll="false">

            </ys-n-project-select>
            <!-- <ys-n-dialog :projectId="params.projectId"></ys-n-dialog> -->
          </div>
        </div>
      </div>
    </div>
	<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
		<ul class="total">
		  <li>
			<p>累计比例</p>
			<p>{{table.totalRow.qzShopRate}}<span class="unit">%</span></p>
		  </li>
		  <li>
			<p>户数</p>
			<p>{{table.totalRow.qzCountNum  ? table.totalRow.qzCountNum : '-'}}</p>
		  </li>
		  <li>
			<p>累计差额</p>
			<p><span class="red">{{$util.numberFormat(table.totalRow.qzBlanceSubOwe)}}</span><span class="unit">万元</span></p>
		  </li>
		</ul>
		<ys-n-section title="涉及商户" :hasTable="true">
		 <!-- <div slot="head-actions">
			<div class="list-mode">
			  <span :class="'list-mode-item ' + (params.dateType == 1 ? 'active' : '')" @click="onListModeChanged(1)" data-value="day">3月内</span>｜
			  <span :class="'list-mode-item ' + (params.dateType == 2 ? 'active' : '')" @click="onListModeChanged(2)" data-value="month">3-6月</span>
			</div>
		  </div> -->
		  <ys-n-table :fixednum="2" :totalRow="table.totalRow" :values="table.dataList" :columns="table.columns" :mode="params.dateType.toString()"></ys-n-table>
		</ys-n-section>
	</van-pull-refresh>
  </div>
</template>

<script>

import Utils from '@/utils/index'
export default {
  data() {
    return {
	  isLoading:false,
      leaderDetail: {},
      params: {
        queryType: 3,
        dateType: '',
        chargeType: this.$route.query.chargeType,
        projectId: this.$route.query.projectId,
        projectName: this.$route.query.projectName
      },
      table: {
        totalRow: {},
        dataList: [],
        columns: [
          {
            label: "序号",
            width: "1.3rem",
            align: "left"
          }, {
            label: "商户",
            key: "name",
            width: "2.3rem",
            align: "left"
          }, {
            label: "押金余额(万元)",
            key: "qzBlance",
            color: "#FF120D",
            width: "2.9rem",
            sortable: true,
            align: "right",
            numberFormat: true,
            numberPrecision: 2,
            changeNum: 10000

          }, {
            label: "欠费(万元)(权责)",
            key: "qzOwe",
            color: "#FF120D",
            width: "3.2rem",
            sortable: true,
            align: "right",
            numberFormat: true,
            numberPrecision: 2,
            changeNum: 10000
          }, {
            label: "累计差额(万元)(权责)",
            key: "qzBlanceSubOwe",
            width: "3.9rem",
            sortable: true,
            align: "right",
            numberFormat: true,
            numberPrecision: 2,
            changeNum: 10000
          },
		  /* {
		    label: "欠费(万元)(合同)",
		    key: "owe",
		    color: "#FF120D",
		    width: "3.2rem",
		    sortable: true,
		    align: "right",
		    numberFormat: true,
		    numberPrecision: 2,
		    changeNum: 10000
		  }, {
		    label: "累计差额(万元)(合同)",
		    key: "blanceSubOwe",
		    width: "3.9rem",
		    sortable: true,
		    align: "right",
		    numberFormat: true,
		    numberPrecision: 2,
		    changeNum: 10000
		  } */
        ]
      },
      selected: {
        label: this.$route.query.projectName,
        projectId: this.$route.query.projectId
      },
      total: ''
    }
  },
  created() {
    this.getTableData()
    //this.getTotalData()
  },
  methods: {
	onRefresh() {
	   this.isLoading = true
	   this.getTableData()
	},
	setIsLoading () {
	  this.isLoading = false;
	},
    projeSelected(item) {
      this.setData({
        ["params.projectId"]: (item && item.projectId) || "",
        ["params.projectName"]: (item && item.shortName) || "",
        ["selected.projectId"]: (item && item.projectId) || "",
        ["selected.label"]: (item && item.shortName) || "",
      });
      this.getTableData()
    },
    async getTotalData() {
      let res = await this.$axios.cashForRentServe.getTotalData(this.params)
      this.total = res.data
      console.log(Utils)
      this.total.blanceSubOwe = this.$util.numberFormat(res.data.blanceSubOwe)
    },
    async getTableData() {
      let res = await this.$axios.cashForRentServe.getTotalDetailData(this.params)
      let dataList = []
	  if(res.data && res.data.length > 0 ) {
		  res.data.map(item => {
			if (item.name == '合计') {
			  this.table.totalRow = item
			} else {
			  dataList.push(item)
			}
		  })
		   this.$lodash.debounce(this.setIsLoading, 300)()
	  }
      this.table.dataList = dataList
    },
    onListModeChanged(type) {
      this.params.dateType = type
      this.getTableData()
    }
  },
}
</script>

<style lang="scss" scoped>
.app-header-left {
  display: flex;
}
.list-mode-item {
  font-size: 28px;

  &.active {
    color: #3992ba;
    font-size: 32px;
    font-weight: bold;
  }
}
.total {
  display: flex;
  justify-content: space-between;
  align-items: top;
  padding: 20px 30px;
  background-color: #fff;
  margin-bottom: 20px;
  li {
    p:nth-child(1) {
      font-size: 24px;
      color: #7d7e80;
    }
    p:nth-child(2) {
      color: #333;
      font-size: 36px;
    }
    .unit {
      color: #7d7e80;
      font-size: 20px;
    }
    .red {
      color: #ff120d;
    }
  }
}
</style>
