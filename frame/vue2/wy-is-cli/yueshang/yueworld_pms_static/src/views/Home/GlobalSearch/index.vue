<template>
  <div class="app-page-main">
    <div class="global-header">
      <div class="left-icon" @click="$router.go(-1)">
        <i class="el-icon-arrow-left" />
      </div>

      <el-input
        v-model="searchText"
        style="width: 468px"
        class="searchinput"
        prefix-icon="el-icon-search"
      />
      <div class="search-button" @click="searchKey">搜索</div>
      <ysn-selectDialog
        :form="form"
        prop="searchSelect"
        :list="globalSearchList"
      >
        <div class="set-select ml-8 right-down-icon pl-8">
          <!-- 默认文字 -->
          <span v-if="form.searchSelect.length === 0" class="ml-8">请选择</span>
          <!-- 选中至少一个的效果 -->
          <el-tag v-if="form.searchSelect.length>0" size="small" closable color="#1C4C7F" class="tag px-8" disable-transitions @close="tagClose">
            <span class="text-truncate tag-text">
              {{ form.searchSelect[0]| getOptionsLabel("globalSearchList") }}
            </span>
          </el-tag>

          <!-- 选中2个以上 -->
          <!-- 选中至少一个的效果 -->
          <el-tag v-if="form.searchSelect.length>1" size="small" color="#1C4C7F" class="tag px-8" disable-transitions>
            +{{ form.searchSelect.length-1 }}
          </el-tag>
        </div>
      </ysn-selectDialog>
    </div>
    <div class="global-table">
      <div class="table-header">
        <p :class="activeFlag == 0 ? 'active' : ''" @click="activeFlag = 0">
          铺位(10)
        </p>
        <p :class="activeFlag == 1 ? 'active' : ''" @click="activeFlag = 1">
          品牌名(1)
        </p>
        <p :class="activeFlag == 2 ? 'active' : ''" @click="activeFlag = 2">
          审批(5)
        </p>
        <p :class="activeFlag == 3 ? 'active' : ''" @click="activeFlag = 3">
          招商进度(3)
        </p>
        <p :class="activeFlag == 4 ? 'active' : ''" @click="activeFlag = 4">
          项目(2)
        </p>
      </div>
      <div v-if="activeFlag === 2" class="apply">
        <div class="apply-item">
          <div class="apply-left">
            <span class="status applying">审批中</span>
            <!-- <span class="status decny">驳回</span>
						<span class="status compelete">已完成</span> -->
            <div class="apply-content">
              <p class="item">招商部-胡岚【商业集团未刷卡原因确认单】<span class="applyer">朱仓庆Jonathan Zhu审批中</span></p>
              <p class="apply-num">审批单号：9069278</p>
              <p class="commit-person">提交人：苏皖区域 胡岚</p>
            </div>
          </div>
          <div class="apply-right">
            <p class="time">2021-05-04</p>
            <p class="left-time">剩余：23小时51分钟</p>
          </div>
        </div>
      </div>
      <ysn-table v-else :data="tableDataNew" :column="tableColumnsConfig" select-key="id" :checkbox="false" />
      <!-- <Table :table-data="tableData" :table-columns-config="tableColumnsConfig" /> -->
    </div>
    <Pagination />
  </div>
</template>
<script>
import { globalSearchList } from '@/utils/optionsList'
import Pagination from '@/components/Pagination'
export default {
  name: 'GlobalSearch',
  components: { Pagination },
  props: {},
  data() {
    return {
      activeFlag: 0,
      // 搜索form
      form: {
        searchValue: '', // 搜索内容
        searchSelect: [] // 搜索select
      },
      // 搜索字典表
      globalSearchList,
      select: '',
      tableColumnsConfig: null,
      tableColumnsConfig0: [
        /* {
          prop: 'name',
          label: '项目',
          width: '',
          isSort: true
        },
        {
          prop: 'address',
          label: '铺位号',
          width: '',
          isSort: true
        },
        {
          prop: 'fzr',
          label: '铺位负责人',
          isSort: true
        },
        {
          prop: 'mianji',
          label: '铺位面积',
          width: '160px',
          isSort: true
        } */
        { t0: '序号', type: 'index', width: 65, sortable: true, showFixed: true },
        { name: '项目', isShow: true, sortable: true },
        { address: '铺位号', isShow: true, sortable: true },
        { fzr: '铺位负责人', isShow: true, sortable: true },
        { mianji: '铺位面积', isShow: true, sortable: true }
      ],
      tableColumnsConfig1: [
        { t0: '序号', type: 'index', width: 65, sortable: true, showFixed: true },
        { name: '品牌名(中)', isShow: true, sortable: true },
        { address: '品牌名(英)', isShow: true, sortable: true },
        { mianji: '业态', isShow: true, sortable: true }
      ],
      tableColumnsConfig3: [
        { t0: '序号', type: 'index', width: 65, sortable: true, showFixed: true },
        { name: '项目', isShow: true, sortable: true },
        { address: '铺位号', isShow: true, sortable: true },
        { fzr: '品牌名', isShow: true, sortable: true },
        { mianji: '业态', isShow: true, sortable: true },
        { fzr: '主谈人', isShow: true, sortable: true }
      ],
      tableColumnsConfig4: [
        { t0: '序号', type: 'index', width: 65, sortable: true, showFixed: true },
        { name: '项目', isShow: true, sortable: true },
        { address: '区域', isShow: true, sortable: true },
        { mianji: '计租面积', isShow: true, sortable: true },
        { date: '开业日期', isShow: true, sortable: true }
      ],
      tableDataNew: [],
      tableData: [
        {
          sequence: '1',
          name: '青山湖',
          address: 'F1-001',
          fzr: '张德',
          mianji: 81.25
        },
        {
          sequence: '2',
          name: '青山湖',
          address: 'F1-0011',
          fzr: '周德',
          mianji: 90.2
        },
        {
          sequence: '3',
          name: '青山湖',
          address: 'F1-001',
          fzr: '张德',
          mianji: 62.25
        },
        {
          sequence: '4',
          name: '青山湖',
          address: 'F1-001',
          fzr: '张德',
          mianji: 56.78
        },
        {
          sequence: '5',
          name: '青山湖',
          address: 'F1-001',
          fzr: '张得南',
          mianji: 81.56
        },
        {
          sequence: '6',
          name: '青山湖',
          address: 'F1-001',
          fzr: '王默',
          mianji: 43.78
        },
        {
          sequence: '7',
          name: '青山湖',
          address: 'F1-001',
          fzr: '王默',
          mianji: 78.92
        },
        {
          sequence: '8',
          name: '青山湖',
          address: 'F1-001',
          fzr: '张德',
          mianji: 56.56
        },
        {
          sequence: '9',
          name: '青山湖',
          address: 'F1-001',
          fzr: '周德',
          mianji: 34.32
        },
        {
          sequence: '10',
          name: '青山湖',
          address: 'F1-001',
          fzr: '张德',
          mianji: 51.75
        }
      ],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '20条/页',

      searchText: '',
      chooseArray: [],

      list: {}
    }
  },
  computed: {},
  watch: {
    activeFlag: function(newValue) {
      switch (newValue) {
        case 0 :
          this.tableColumnsConfig = this.tableColumnsConfig0
          break
        case 1 :
          this.tableColumnsConfig = this.tableColumnsConfig1
          break
        case 2 :
          this.tableColumnsConfig = this.tableColumnsConfig2
          break
        case 3 :
          this.tableColumnsConfig = this.tableColumnsConfig3
          break
        case 4 :
          this.tableColumnsConfig = this.tableColumnsConfig4
          break
      }
    }
  },
  created() {
    console.log(this.$route.query)
    this.searchText = this.$route.query.searchValue
    this.form.searchSelect = this.$route.query.searchSelect.split(',').map(Number)
    this.tableDataNew = JSON.parse(JSON.stringify(this.tableData))
    this.tableColumnsConfig = this.tableColumnsConfig0
    this.searchKey()
  },
  methods: {
    // tag关闭
    tagClose() {
      this.form.searchSelect.shift()
    },

    searchKey() {
      // this.tableData.splice(6)
      var list = JSON.parse(JSON.stringify(this.tableData))
      list = list.filter(item => item.name.indexOf(this.searchText) !== -1 || item.address.indexOf(this.searchText) !== -1 || item.fzr.indexOf(this.searchText) !== -1)
      this.tableDataNew = list
    },

    indexMethod(index) {
      return index + 1
    },

    changeTableSort(column) {
      this.list = {}
      const rops1 = column.prop
      this.list[rops1] = column.order
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
.table-header {
	width: 425px !important;
}
.apply {
	overflow-y: auto;
	.apply-item {
		display: flex;
		justify-content: space-between;
		padding: 8px 0 16px 0;
		border-top:solid 1px #E5E2DE;
		.apply-left {
			display: flex;
			justify-content: flex-start;
			.status {
				width: 60px;
				line-height: 24px;
				border-radius: 14px;
				color: #fff;
				font-size: 12px;
				text-align: center;
				height: 28px;
			}
			.applying {
				background-color: #48A0C3;
				border: 2px solid #B3D9E8;
			}
			.decny {
				background-color: #6F120C;
				border: 2px solid #DCB1AE;
			}
			.compelete {
				background-color: #BECBD2;
				border: 2px solid #DAE7EE;
			}
			.apply-content {
				margin: 0 12px;
				.item {
					font-size: 14px;
					color: #050101;
					line-height: 14px;
					.applyer {
						color: #848382;
					}
				}
				.apply-num,.commit-person {
					font-size: 12px;
					color: #848382;
					line-height: 12px;
					margin: 4px 0;
				}
			}
		}
		.apply-right {
			text-align: right;
			.time {
				font-size: 14px;
				color: #848382;
				line-height: 14px;
			}
			.left-time {
				font-size: 12px;
				color: #6F120C;
				line-height: 12px;
				margin-top: 20px;
			}
		}
	}
}
</style>
