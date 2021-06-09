<template>
  <div v-webTitle :data-title="`商家信息`">
    <div class="header-top">
      <ys-n-nav-bar :title="`商家信息`" />
    </div>
    <ys-n-section title="商家信息">
      <div v-for="(item, index) in merchantInfomation" :key="index" class="merchant-infomation-item">
        <div class="merchant-infomation-item-line"></div>
        <div class="merchant-infomation-item-content">
          <div class="merchant-infomation-item-content-title">{{item.title}}</div>
          <div class="merchant-infomation-item-content-content">{{item.content}}</div>
        </div>
      </div>
    </ys-n-section>

    <ys-n-section title="经销商" :hasTable="true">
      <ys-n-table :fixednum="2" :identity="`merchant`" :columns="page.merchantTable.columns" :values="page.merchantTable.rows"></ys-n-table>
    </ys-n-section>

    <ys-n-section title="合作项目" :hasTable="true">
      <ys-n-table :fixednum="2" :identity="`teamWork`" :columns="page.teamWorkTable.columns" :values="page.teamWorkTable.rows"></ys-n-table>
    </ys-n-section>

    <ys-n-section title="文件" :hasTable="true">
      <div slot="head-actions">
        <div class="list-mode">

          <van-checkbox v-model="checkbox.value" @click.stop="checkboxChange" shape="square" checked-color="#3A96BD" icon-size="16px">{{ checkbox.name }}</van-checkbox>

        </div>
      </div>
      <ys-n-table :fixednum="2" :identity="`file`" :columns="page.fileTable.columns" :values="page.fileTable.rows"></ys-n-table>
    </ys-n-section>

  </div>
</template>

<script>
import { dealerColumns, teamWorkColumns, fileColumns } from './config';
export default {
  data () {
    return {
      dealerColumns, teamWorkColumns, fileColumns,
      fileAllColumns: [],
      routerParams: this.$route.query,
      index: null,
      merchantInfomation: [
        {
          title: '中文名：',
          content: '',
          value: 'merchantsChineseName'
        }, {
          title: '英文名：',
          content: '',
          value: 'merchantsEnglishName'
        }, {
          title: '业态：',
          content: '',
          value: 'thirdlyFormats'
        }, {
          title: '店型：',
          content: '',
          value: 'storeType'
        }, {
          title: '状态：',
          content: '',
          value: 'status'
        }, {
          title: '合作项目数：',
          content: '',
          value: 'cooperativeProjectsNumber'
        }, {
          title: '合作项目：',
          content: '',
          value: 'cooperativeProjects'
        }
      ],
      selected: {},
      checkbox: {
        value: 'contract',
        name: '有效合同',
        checked: false
      },
      page: {
        merchantTable: {
          columns: [],
          rows: []
        },
        teamWorkTable: {
          columns: [],
          rows: []
        },
        fileTable: {
          columns: [],
          rows: []
        }
      },
      selected: { projectId: "", label: "商家", },
      query: {
        limit: 100,
        offset: 1,
        bisShopId: ''
      }
    };
  },

  components: {},
  props: {},

  mounted () {
    this.setData({
      'query.bisShopId': this.routerParams.bisShopId
    });
    this.loadData();
  },
  methods: {
    loadData: async function () {
      try {
        await this.$axios.merchantServe.getMerchantDetail(this.query, false).then(res => {

          if (res.code == 200) {
            const { data } = res

            let merchantArr = [];
            this.merchantInfomation.forEach((item, index) => {
              let content = data[item.value];

              if (item.value === 'thirdlyFormats') {
                content = '';

                if (data.primaryForms) {
                  content = data.primaryForms;
                }

                if (data.secondaryFormats) {
                  content = content + ' - ' + data.secondaryFormats;
                }

                if (data.thirdlyFormats) {
                  content = content + ' - ' + data.thirdlyFormats;
                }

                content = content.toString();

                if (content) {
                  if (content.length > 2) {
                    if (content.substr(0, 3) === ' - ') {
                      content = content.replace(' - ', '');
                    }
                  }
                }
              }

              if (!content) {
                content = '-';
              }

              merchantArr.push({
                title: item.title,
                content: content
              });
            });
            const dealerRows = data.dealerBigs.map(item => {
              return {
                bisShopId: item.bisShopId,
                dealersCompanyName: item.dealersCompanyName,
                dealersPhone: item.dealersPhone,
                dealersProject: item.dealersProject
              };
            });
            // console.log(dealerRows, 'dealerRows')
            const teamRows = data.projectBig.map(item => {
              return {
                bisShopId: item.bisShopId,
                bisProjectName: item.bisProjectName,
                startDate: item.startDate,
                monthsEffect: item.monthsEffect,
                totalOwe: item.totalOwe,
                currentmonthmgrmoney: item.currentmonthmgrmoney,
                lastmonthmgrmoney: item.lastmonthmgrmoney,
                lastmonthrentmoney: item.lastmonthrentmoney,
                lastmonthsales: item.lastmonthsales
              };
            });
            this.fileAllColumns = data.chantconBigs.map(item => {
              return {
                bisShopId: item.bisShopId,
                bisProjectName: item.bisProjectName,
                contNo: item.contNo,
                contStatus: item.contStatus,
                contType: item.contType,
                maturity: item.maturity,
                maturityDate: item.maturityDate,
                termination: item.termination,
                maturity: item.maturity,
                effectflg: item.effectflg,
                rentsquare: item.rentsquare
              };
            });
            let fileRows = [];
            if (this.checkbox.checked) {
              fileRows = this.fileAllColumns.filter(item => item.effectflg === 'Y');
            } else {
              fileRows = this.fileAllColumns;
            }
            const setData = {
              ['merchantInfomation']: merchantArr,
              ['page.merchantTable']: {
                columns: dealerColumns,
                rows: dealerRows
              },
              ['page.teamWorkTable']: {
                columns: teamWorkColumns,
                rows: teamRows
              },
              ['page.fileTable']: {
                columns: fileColumns,
                rows: fileRows
              }
            };
            this.setData(setData);
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    checkboxChange: function (e) {
      let checked = !this.checkbox.checked;
      let fileRows = [];

      if (checked) {
        fileRows = this.fileAllColumns.filter(item => item.effectflg === 'Y');
      } else {
        fileRows = this.fileAllColumns;
      }
      const setData = {
        ['checkbox.checked']: checked,
        ['page.fileTable']: {
          columns: [...fileColumns],
          rows: fileRows
        }
      };
      this.setData(setData);
    },
    projeSelected (item) {
      try {
        console.log(item);
        if (item.shortName !== "商家") {
          this.setData({
            ["params.projectId"]: (item && item.projectId) || "",
            ["params.projectName"]: (item && item.shortName) || "",
          });
        }
      } catch (e) {
        console.log(e)
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.merchant-infomation-item {
  display: flex;
  flex-direction: column;
}
.merchant-infomation-item-line {
  width: 100%;
  height: 1px;
  // background: #f6f6f6;
}
.merchant-infomation-item-content {
  display: flex;
  flex-direction: row;
  padding: 15px;
  align-items: center;
}
.merchant-infomation-item-content-title {
  width: 222px;
  font-size: 28px;
  color: #999999;
  white-space: nowrap;
}
.merchant-infomation-item-content-content {
  font-size: 28px;
  color: #333333;
}
.checkbox-checkwords {
  /* color: #333333;
  font-size: 28px; */
  color: #333333;
  font-size: 28px;
  font-weight: bold;
  height: 32px;
  line-height: 32px;
}
/*checkbox 选项框大小  */
checkbox .wx-checkbox-input {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-color: #3b96be;
  vertical-align: middle;
}
/*checkbox选中后样式  */
checkbox .wx-checkbox-input.wx-checkbox-input-checked {
  background: #3b96be;
}
/*checkbox选中后图标样式  */
checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
  width: 30px;
  height: 30px;
  line-height: 28px;
  text-align: center;
  font-size: 22px;
  color: #ffffff;
  background: transparent;
  transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1);
}
</style>