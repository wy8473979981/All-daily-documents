// 设计任务书审批表 宝龙地产/地产/08-设计管理

<template>
  <!-- 设计任务书审批表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="12" class="topRight-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>项目名称</span>
         <el-input :class="{novalue: !form.bizEntityJson.centerOrgName}" v-model="form.bizEntityJson.centerOrgName" @focus="showSearchOrg = true" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="topRight-col">
        <div class="d-min">
          <span>业务条线</span>
          <el-select
            :disabled="form.bizEntityJson.disabled"
            v-model="form.bizEntityJson.businessLines"
            clearable
            >
            <el-option
              v-for="item in options"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>审批权限</span>
          <el-checkbox v-model="form.bizEntityJson.commercePermissionFlg">与商业有关</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.hotelPermissionFlg">与酒店有关</el-checkbox>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>文件类型</span>
          <el-checkbox v-model="form.bizEntityJson.fileType" @change="changeFileType" true-label="1" false-label="">建筑概念-方案</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.fileType" @change="changeFileType" true-label="2" false-label="">建筑施工图</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.fileType" @change="changeFileType" true-label="3" false-label="">景观、装饰、泛光方案及施工图</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.fileType" @change="changeFileType" true-label="4" false-label="">基坑支护</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.fileType" @change="changeFileType" true-label="5" false-label="">专项</el-checkbox>
        </div>
      </el-col>
      <el-col :span="24" class="right-col" v-show="form.bizEntityJson.fileType == 1">
        <div class="d-min">
          <span></span>
           <d-radio-group 
            v-model="form.bizEntityJson" 
            :nameList="[{label:'建筑概念方案',name:'fileType1Child1'},
                        {label:'建筑方案',name:'fileType1Child2'},
                        {label:'建筑方案至施工图',name:'fileType1Child3'},
                        {label:'建筑扩初及施工图',name:'fileType1Child4'},
                        {label:'建筑立面方案及深化',name:'fileType1Child5'},
                        {label:'其他',name:'fileType1Child6'}]"
            />
        </div>
      </el-col>
      <el-col :span="24" class="right-col" v-show="form.bizEntityJson.fileType == 2">
        <div class="d-min">
          <span> </span>
          <d-radio-group 
            v-model="form.bizEntityJson" 
            :nameList="[{label:'建筑扩初及施工图',name:'fileType2Child1'},
                        {label:'其他',name:'fileType2Child2'}]"
            />
        </div>
      </el-col>
      <el-col :span="24" class="right-col" v-show="form.bizEntityJson.fileType == 3">
        <div class="d-min">
          <span> </span>
          <el-checkbox v-model="form.bizEntityJson.fileType3Child1">景观方案至施工图</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.fileType3Child2">装修装饰工程</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.fileType3Child3">泛光照明</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.fileType3Child4">其他</el-checkbox>
        </div>
      </el-col>
      <el-col :span="24" class="right-col" v-show="form.bizEntityJson.fileType == 5">
        <div class="d-min">
          <span> </span>
          <d-radio-group 
            v-model="form.bizEntityJson" 
            :nameList="[{label:'人防',name:'fileType5Child1'},
                        {label:'绿建',name:'fileType5Child2'},
                        {label:'装配式(PC)',name:'fileType5Child3'},
                        {label:'弱电(智能化)',name:'fileType5Child4'},
                        {label:'钢结构',name:'fileType5Child5'},
                        {label:'地质勘查',name:'fileType5Child6'},
                        {label:'门窗及幕墙',name:'fileType5Child7'},
                        {label:'其他',name:'fileType5Child8'}]"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>设计任务提要（设计任务书附后 ）1、如有分期需注明2、项目概况3、主要设计内容</span>
          <el-input :class="{novalue: !form.bizEntityJson.designTaskSummary}" v-model="form.bizEntityJson.designTaskSummary" type="textarea" :rows="5"></el-input>
        </div>
      </el-col>
    </el-row>

  <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>设计任务书及附件</span>
          <el-upload
            :class="{novalue: !form.bizEntityJson.designTaskFileIds}"
            name="fileName"
            :headers="{'Authorization': userInfo.token}"
            :accept="$action"
            :action="uploadUrl"
            :data="{userName: form.userInfo.username,bizFileName: 'designTaskFileIds',bizId:form.bizId}"
            :before-remove="beforeRemove"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'designTaskFileIds')}"
            :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'designTaskFileIds')"
            :on-preview="downLoadFileGlobal"
            :file-list="form.allEntityFileIds.designTaskFileIds"
            style="display: flex">
            <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>上传附件</el-button>
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>签批版各阶段定位报告</span>
          <el-upload
            :class="{novalue: !form.bizEntityJson.reportFileIds}"
            name="fileName"
            :headers="{'Authorization': userInfo.token}"
            :accept="$action"
            :action="uploadUrl"
            :data="{userName: form.userInfo.username,bizFileName: 'reportFileIds',bizId:form.bizId}"
            :before-remove="beforeRemove"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'reportFileIds')}"
            :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'reportFileIds')"
            :on-error="handleErrorGlobal"
            :on-preview="downLoadFileGlobal"
            :file-list="form.allEntityFileIds.reportFileIds"
            style="display: flex">
            <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>上传附件</el-button>
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>各类设计基础条件</span>
          <el-upload
            :class="{novalue: !form.bizEntityJson.basicConditionFileIds}"
            name="fileName"
            :headers="{'Authorization': userInfo.token}"
            :accept="$action"
            :action="uploadUrl"
            :data="{userName: form.userInfo.username,bizFileName: 'basicConditionFileIds',bizId:form.bizId}"
            :before-remove="beforeRemove"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'basicConditionFileIds')}"
            :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'basicConditionFileIds')"
            :on-error="handleErrorGlobal"
            :on-preview="downLoadFileGlobal"
            :file-list="form.allEntityFileIds.basicConditionFileIds"
            style="display: flex">
            <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>上传附件</el-button>
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>其他</span>
          <el-upload
            name="fileName"
            :headers="{'Authorization': userInfo.token}"
            :accept="$action"
            :action="uploadUrl"
            :data="{userName: form.userInfo.username,bizFileName: 'additionalFileIds',bizId:form.bizId}"
            :before-remove="beforeRemove"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'additionalFileIds')}"
            :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'additionalFileIds')"
            :on-error="handleErrorGlobal"
            :on-preview="downLoadFileGlobal"
            :file-list="form.allEntityFileIds.additionalFileIds"
            style="display: flex">
            <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>上传附件</el-button>
          </el-upload>
        </div>
      </el-col>
    </el-row>

     <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
const data = {};
const uploadUrl = 'api/file/uploadFile';
export default {
  data() {
    return {
      form: data,
      uploadUrl,
      // 以下为本身需要数据
      showSearchOrg: false,
      options: [
        {key: '1',value: '三点一线'},
        {key: '2',value: '设计战略'}
      ],
      userInfo: {}
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
    },
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
  },
  methods: {
   changeFileType(val) {
    this.$set(this.form.bizEntityJson,'fileType1Child1',false)    
    this.$set(this.form.bizEntityJson,'fileType1Child2',false)    
    this.$set(this.form.bizEntityJson,'fileType1Child3',false)    
    this.$set(this.form.bizEntityJson,'fileType1Child4',false)    
    this.$set(this.form.bizEntityJson,'fileType1Child5',false)    
    this.$set(this.form.bizEntityJson,'fileType1Child6',false)    
    this.$set(this.form.bizEntityJson,'fileType2Child1',false)    
    this.$set(this.form.bizEntityJson,'fileType2Child2',false)    
    this.$set(this.form.bizEntityJson,'fileType3Child1',false)    
    this.$set(this.form.bizEntityJson,'fileType3Child2',false)    
    this.$set(this.form.bizEntityJson,'fileType3Child3',false)    
    this.$set(this.form.bizEntityJson,'fileType3Child4',false)    
    this.$set(this.form.bizEntityJson,'fileType5Child1',false)    
    this.$set(this.form.bizEntityJson,'fileType5Child2',false)    
    this.$set(this.form.bizEntityJson,'fileType5Child3',false)    
    this.$set(this.form.bizEntityJson,'fileType5Child4',false)   
    this.$set(this.form.bizEntityJson,'fileType5Child5',false)   
    this.$set(this.form.bizEntityJson,'fileType5Child6',false)   
    this.$set(this.form.bizEntityJson,'fileType5Child7',false)   
    this.$set(this.form.bizEntityJson,'fileType5Child8',false)   
   },
   closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerOrgName = val.text
        this.form.bizEntityJson.centerOrgCd = val.id
      }
      this.showSearchOrg = false
    },
    handleSuccess(response, file, fileList,param) {
      console.log(response, file, fileList,param)
      const fileId = response.data.fileId;
      if(!this.form.bizEntityJson[param]) {
        this.$set(this.form.bizEntityJson,param,'')
      }
      this.form.bizEntityJson[param] += fileId;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleRemove(file, fileList,param) {
      console.log(file)
      let nowfile;
      if(file.response) {
          nowfile = file.response.data.fileId;
        } else {
          nowfile = file.id + ',';
        }
      let fileId = this.form.bizEntityJson[param];
      this.form.bizEntityJson[param] = fileId.replace(nowfile,'');
        this.$file.deleteFile(nowfile).then(res => {
          if(res.code == 1) {
            this.$message.success('文件删除成功')
          }
      })
    },
    downLoadFile(file) {
      console.log(file)
      if(file.showUrl) {
        window.open(file.showUrl, '_blank');
        return;
      }
      const fileIds = file.response.data.fileId;
      this.$file.loadFiles({fileIds}).then(res => {
        if(res.code ==1 && res.data) {
          const showUrl = res.data.fileShowVoList[0].showUrl;
          window.open(showUrl, '_blank');
        }
      })
    }
  }
}
</script>
<style type="text/css" lang="scss">

</style>
