<template>
  <!-- 事业部假期取消单 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <table class="border-table nobg">
      <tr>
        <td class="title">
        </td>
        <td :class="{novalue: !form.bizEntityJson.company1 && !form.bizEntityJson.company2 && !form.bizEntityJson.company3 && !form.bizEntityJson.company4 && !form.bizEntityJson.company7 && !form.bizEntityJson.company6,required: !form.bizEntityJson.disabled}">
          <d-radio-group 
              v-model="form.bizEntityJson" 
              :nameList="[{label:'事业一部',name:'company1'},
                          {label:'事业二部',name:'company2'},
                          {label:'置地',name:'company3'},
                          {label:'浙江事业部',name:'company4'},
                          {label:'安徽事业部',name:'company7'},
                          {label:'广东事业部',name:'company6'},
                        ]"
          />
        </td>
      </tr>
      <tr>
        <td :rowspan="2" class="title" style="width:160px;position:relative"><span style="position:absolute;top:50%;height:36px;width:100px;margin-top:-18px;">选择</span></td>
        <td :class="{novalue: !form.bizEntityJson.dayType,required: !form.bizEntityJson.disabled}">
          <el-radio-group v-model="form.bizEntityJson.dayType">
            <el-radio class="line-radio" :label="'1'">短期（3天及以内）</el-radio>
            <el-radio class="line-radio" :label="'2'">长期（3天以上）</el-radio>  
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td :class="{novalue: !form.bizEntityJson.newPositionLevel1 && !form.bizEntityJson.newPositionLevel2 && !form.bizEntityJson.newPositionLevel12 && !form.bizEntityJson.newPositionLevel13 && !form.bizEntityJson.newPositionLevel9,required: !form.bizEntityJson.disabled}">
          <d-radio-group 
            v-model="form.bizEntityJson"
            :nameList="[{label:'事业部总经理',name:'positionLevel1'},
                        {label:'事业部副总经理',name:'positionLevel2'},
                        {label:'事业部部门负责人(双线)',name:'positionLevel12'},
                        {label:'事业部部门负责人(非双线)',name:'positionLevel13'},
                        {label:'其他人员',name:'positionLevel9'}
                      ]"
          />
        </td>
      </tr>
    </table>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min">
          <span>中心/公司</span>
          <el-input :class="{'novalue': !form.bizEntityJson.center, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.center" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>部门</span>
          <el-input :class="{'novalue': !form.bizEntityJson.dept, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.dept" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>姓名</span>
          <el-input :class="{'novalue': !form.bizEntityJson.userName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.userName" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>职位</span>
          <el-input :class="{'novalue': !form.bizEntityJson.position, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.position" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>职级</span>
          <el-input :class="{'novalue': !form.bizEntityJson.positionLevel, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.positionLevel" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>关联请假单查询号</span>
          <el-select
            popper-class="select-header"
            :class="{'novalue': !form.bizEntityJson.displayNo, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.displayNo"
            filterable
            remote
            clearable
            @change="displayNoChange"
            :remote-method="remoteMethod"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
              v-for="item in displayNoOptions"
              :key="item.approveNo"
              :label="item.approveNo"
              :value="item.approveNo">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">备注</span>
          <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.remark" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerCd" @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      showSearchOrg: false,
      showSearchUser: false,
      loading: false,
      userInfo: {},
      displayNoOptions: []
    }
  },
  props: ['data'],
	watch: {
		data: {
			immediate: true,
			handler: function(val) {
				console.log(val)
				this.form = val;
			}
		}
	},
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'applyUserType', [])
      this.$set(this.form.bizEntityJson, 'frequency', [])
      this.$set(this.form.bizEntityJson, 'center', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerCd', this.userInfo.centerOrgCd)
      this.$set(this.form.bizEntityJson, 'dept', this.userInfo.orgName)
      this.$set(this.form.bizEntityJson, 'userName', this.userInfo.username)
      this.$set(this.form.bizEntityJson, 'userCd', this.userInfo.userid)
      this.$set(this.form.bizEntityJson, 'position', this.userInfo.positionName)
      this.$set(this.form.bizEntityJson, 'positionLevel', this.userInfo.permissionLevelName)
    }
  },
  mounted() {
  },
  methods: {
    remoteMethod(query) {
      if (query) {
        this.loading = true
        this.$approval.findHrHolidayEs(query).then(res => {
          if(res.code == 1) {
            this.loading = false
            if (res.data.content.length > 0) {
              this.displayNoOptions = res.data.content
              this.displayNoOptions.unshift({approveNo: '请假单号'})
            } else {
              this.displayNoOptions = []
            }
          }
        })
      } else {
        this.displayNoOptions = []
      }
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.center = val.text
        this.form.bizEntityJson.centerCd = val.id
      }
      this.showSearchOrg = false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
