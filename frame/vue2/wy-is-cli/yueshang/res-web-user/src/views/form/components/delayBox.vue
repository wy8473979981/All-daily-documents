<template>
	<div v-if="userInfo.userid == delayList.approveUserId" class="delayBox-wrapper">
		<div class="delayBox" v-show="!showHistory">
			<el-row class="min-title">
				延期申请
			</el-row>
			<el-row class="delayBox-content">
        <p>申请时间：{{ delayList.applyDate }}</p>
        <p>申请延期：{{ delayList.delayTime }}小时</p>
        <p>发起人：{{ delayList.approveUserName }} -> [{{ delayList.applyUserName }}] {{ delayList.statusCdName }}
          <el-button @click="agree" type="primary" size="mini">同意延期</el-button>
          <el-button @click="refuse" type="danger" plain size="mini">拒绝延期</el-button>
        </p>
        <p>申请事由：{{ delayList.applyRemark }}</p>
			</el-row>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import Approval from '@/apis/apis/approval';
export default {
  props: ['delayList','showHistory'],
  data() {
    return {
      nowStep: -1,
      delayStatusList: [],
      statusName: ''
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  mounted() {
    // this.getDelayDict()
  },
  methods: {
    // 申请延期状态数据字典
    getDelayDict () {
      Approval.getDelayDict(this.userInfo.enterpriseId).then(res => {
        if(res.code == 1){
          this.delayStatusList = res.data.delayStatus
          this.delayStatusList.forEach((item, index) => {
            if (this.delayList.statusCd == item.dictCd) {
              this.statusName = item.dictName
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    agree () {
      this.$emit('submit', 'D')
    },
    refuse () {
      this.$emit('submit', 'R')
    }
  }
}
</script>
<style lang="scss" scoped>
	.delayBox-wrapper {
		border-top: 1px solid #ECF0F2;
		.delayBox {
			border-bottom: 1px solid #ECF0F2;
			padding-bottom: 10px;
		}
		.title {
			padding: 15px 0;
			font-size: 14px;
			color: #676767;
		}
		.delayBox-content {
			p {
				margin-right: 10px;
				line-height: 24px;
				color: #333;
			}
		}
	}
</style>
