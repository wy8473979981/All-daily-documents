// 总部请假单(地产)

<template>
	<div class="template-wrapper">
		<div class="template-content">
      <p>
				<span class="span-title">选择	:</span>
        <span class="span-value" v-if="form.bizEntityJson.dayType == 1">短期（3天及以内）</span>
        <span class="span-value" v-if="form.bizEntityJson.dayType == 2">长期（3天以上）</span>
			</p>
      <p>
				<span class="span-title">选择	:</span>
        <span class="span-value" v-if="form.bizEntityJson.positionLevel14">副总裁（主席办）</span>
        <span class="span-value" v-if="form.bizEntityJson.positionLevel10">副总裁</span>
        <span class="span-value" v-if="form.bizEntityJson.positionLevel11">中心负责人</span>
        <span class="span-value" v-if="form.bizEntityJson.positionLevel3">部门负责人</span>
        <span class="span-value" v-if="form.bizEntityJson.positionLevel4">其他人员</span>
			</p>
      <p>
				<span class="span-title">中心/公司:</span>
        <span class="span-value">{{form.bizEntityJson.center}}</span>
			</p>
      <p>
				<span class="span-title">部门	:</span>
        <span class="span-value">{{form.bizEntityJson.dept}}</span>
			</p>
       <p>
				<span class="span-title">姓名	:</span>
        <span class="span-value">{{form.bizEntityJson.userName}}</span>
			</p>
       <p>
				<span class="span-title">职位	:</span>
        <span class="span-value">{{form.bizEntityJson.position}}</span>
			</p>
       <p>
				<span class="span-title">职级	:</span>
        <span class="span-value">{{form.bizEntityJson.positionLevel}}</span>
			</p>
       <p>
				<span class="span-title">入职日期	:</span>
        <span class="span-value">{{ form.bizEntityJson.joinDate ? form.bizEntityJson.joinDate.slice(0,10) : ''}}</span>
			</p>
       <p>
				<span class="span-title">当前可用年假	:</span>
        <span class="span-value">{{form.bizEntityJson.avaliableDay}}</span>
			</p>
       <p>
				<span class="span-title">当前可用全薪病假	:</span>
        <span class="span-value">{{form.bizEntityJson.avaLeaveHour}}</span>
			</p>
      <el-table :data="form.bizEntityJson.otherProperties" style="margin-bottom: 8px;">
				<el-table-column width="80" prop="holidayType" show-overflow-tooltip label="假期类别">
          <template slot-scope="scope">
            <span>{{ scope.row.holidayType | filterType}}</span>
          </template>
        </el-table-column>
				<el-table-column width="80" prop="unit" show-overflow-tooltip label="单位">
          <template slot-scope="scope">
            <span>{{ scope.row.unit | filterUnit}}</span>
          </template>
        </el-table-column>
				<el-table-column width="80" prop="beginDate" show-overflow-tooltip label="由" />
				<el-table-column width="100" prop="endDate" show-overflow-tooltip label="至" />
				<el-table-column width="80" prop="totalDays" show-overflow-tooltip label="合计请假时间" />
				<el-table-column width="80" prop="offiHolidays" show-overflow-tooltip label="法定假日" />
				<el-table-column width="80" prop="holidays" show-overflow-tooltip label="本休日" />
			</el-table>
       <p>
				<span class="span-title">请假期间联系地址/电话	:</span>
        <span class="span-value">{{form.bizEntityJson.contactWay}}</span>
			</p>
       <p>
				<span class="span-title">请假原因	:</span>
        <span class="span-value">{{form.bizEntityJson.holidayReason}}</span>
			</p>
       <p>
				<span class="span-title">其他说明	:</span>
        <span class="span-value">{{form.bizEntityJson.otherRemark}}</span>
			</p>
    </div>

  </div>
</template>
<script>
import download from '../components/download.vue';
const data = {};
export default {
  components: { download },
	props: ['data'],
	watch: {
		data: {
			immediate: true,
			handler: function(val) {
        this.form = val;
        console.log(this.form,777)
			}
		}
	},
  data() {
    return {
	    form: data
    }
  },
  filters: {
    filterType(val) {
      const obj = {1: "年假", 2: "婚假", 3: "产假", 4: "丧假", 6: "事假", 7: "晚育护理假", 8: "全薪病假", 9: "超额病假", 10: "产检假", 11: "授乳假"};
      if(val) {
        return obj[val]
      }
    },
    filterUnit(val) {
      const arr = ['天','小时']
      if(val) {
        return arr[val]
      }
    }
  }
}
</script>>
<style lang="scss" scoped>
@import "~@/scss/h5template.scss";
</style>