<template>
  <!-- 宝龙地产/商业/物业公司/04-行政人事/行政管理-物业公司法律事务审批 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>阶段</span>
          <div class="d-red" :class="{novalue:!form.bizEntityJson.affairsType}">
            <el-radio-group v-model="form.bizEntityJson.affairsType">
              <el-radio :label="'1'">仲裁</el-radio>
              <el-radio :label="'2'">讼诉(一审)</el-radio>
              <el-radio :label="'3'">讼诉(二审)</el-radio>
              <el-radio :label="'4'">讼诉(再审)</el-radio>
              <el-radio :label="'5'">调解</el-radio>
              <el-radio :label="'6'">执行</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>主办公司</span>
          <el-input :class="{novalue:!form.bizEntityJson.projectName}" v-model="form.bizEntityJson.projectName" @focus="showSearchOrg = true" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>案件名称</span>
          <el-input :class="{novalue:!form.bizEntityJson.caseName}" v-model="form.bizEntityJson.caseName"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>案件归类</span>
          <div class="d-red" :class="{novalue:!form.bizEntityJson.caseClassify}">
            <el-radio-group v-model="form.bizEntityJson.caseClassify" >
              <el-radio :label="'1'">商业</el-radio>
              <el-radio :label="'2'">地产</el-radio>
              <el-radio :label="'3'">置地</el-radio>
              <el-radio :label="'4'">物业</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>物业所属单位</span>
          <div class="d-red" :class="{novalue:!form.bizEntityJson.affairsProcess}">
            <el-radio-group v-model="form.bizEntityJson.affairsProcess">
              <el-radio :label="'5'">城市公司</el-radio>
              <el-radio :label="'6'">物业项目</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>案件类型</span>
          <div class="d-red" :class="{novalue:!form.bizEntityJson.caseMode}">
            <el-radio-group v-model="form.bizEntityJson.caseMode">
              <el-radio :label="'1'">逾期交房纠纷</el-radio>
              <el-radio :label="'2'"> 逾期付款纠纷</el-radio>
              <el-radio :label="'3'"> 施工合同纠纷</el-radio>
              <el-radio :label="'4'"> 采购合同纠纷</el-radio>
              <el-radio :label="'5'">房屋质量问题</el-radio>
              <el-radio :label="'6'">租赁纠纷</el-radio>
              <el-radio :label="'7'"> 劳动纠纷</el-radio>
              <el-radio :label="'8'"> 办证问题</el-radio>
              <el-radio :label="'9'"> 人身伤害</el-radio>
              <el-radio :label="'10'">侵权</el-radio>
              <el-radio :label="'11'">群体纠纷</el-radio>
              <el-radio :label="'12'">其他</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col v-if="form.bizEntityJson.caseMode == 6" :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>是否涉及总部联发品牌</span>
          <div class="d-red" :class="{novalue: form.bizEntityJson.brandFlg == undefined}">
            <el-radio-group v-model="form.bizEntityJson.brandFlg">
              <el-radio :label="true">涉及总部联发品牌</el-radio>
              <el-radio :label="false">不涉及总部联发品牌</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col v-if="form.bizEntityJson.brandFlg == true && form.bizEntityJson.caseMode == 6" :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>品牌名称</span>
          <el-select
              :class="{novalue:!form.bizEntityJson.shopName}"
              :disabled="form.bizEntityJson.disabled"
              v-model="form.bizEntityJson.shopName"
              filterable
              remote
              reserve-keyword
              :remote-method="quickSearchSWTJNew"
              @change="changeBrand"
              placeholder=""
          >
            <el-option
                v-for="item in options"
                :key="item.bisShopId"
                :label="item.bisShopName"
                :value="item">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>委托类型</span>
          <div class="d-red" :class="{novalue:!form.bizEntityJson.commissionType}">
            <el-radio-group v-model="form.bizEntityJson.commissionType">
              <el-radio :label="'5'">律师</el-radio>
              <el-radio :label="'10'">内部自办</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>起诉时间</span>
          <el-date-picker
              :class="{novalue:!form.bizEntityJson.prosecutionDate}"
              :readonly="form.bizEntityJson.disabled"
              width="400"
              v-model="form.bizEntityJson.prosecutionDate"
              type="date"
              value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>代理律师事务所及代理律师</span>
          <el-input :class="{novalue:!form.bizEntityJson.attorney}" v-model="form.bizEntityJson.attorney"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>律师费(元)</span>
          <el-input :class="{novalue:form.bizEntityJson.lawyerFee === undefined || form.bizEntityJson.lawyerFee === ''}" v-model="form.bizEntityJson.lawyerFee" type="number"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>诉讼费(元)</span>
          <el-input :class="{novalue:form.bizEntityJson.litigationCosts === undefined || form.bizEntityJson.litigationCosts === ''}" v-model="form.bizEntityJson.litigationCosts" type="number"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>原告</span>
          <el-input :class="{novalue:!form.bizEntityJson.plaintiff}" v-model="form.bizEntityJson.plaintiff" type="textarea" :rows="5"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>被告</span>
          <el-input :class="{novalue:!form.bizEntityJson.defendant}" v-model="form.bizEntityJson.defendant" type="textarea" :rows="5"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="8">
        <div class="d-min">
          <span>开庭时间</span>
          <el-date-picker
              :readonly="form.bizEntityJson.disabled"
              width="400"
              v-model="form.bizEntityJson.courtDate"
              type="date"
              value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <span>举证期限</span>
          <el-input v-model="form.bizEntityJson.proofLimit"></el-input>
        </div>
      </el-col>
      <el-col :span="8" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>诉讼标的额(元)</span>
          <el-input :class="{novalue:!form.bizEntityJson.litigationAmount === undefined || form.bizEntityJson.litigationAmount === ''}" v-model="form.bizEntityJson.litigationAmount" type="number"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>案情简述</span>
          <el-input :class="{novalue:!form.bizEntityJson.caseDescription}" v-model="form.bizEntityJson.caseDescription" type="textarea" :rows="5"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>诉讼目标</span>
          <el-input :yykReadonly="true" :class="{'novalue-dostep':!form.bizEntityJson.litigationTarget && form.mapEdit.litigationTarget && form.bizEntityJson.affairsType != 5 && form.bizEntityJson.affairsType != 6}" v-model="form.bizEntityJson.litigationTarget" :disabled="!form.mapEdit.litigationTarget || form.bizEntityJson.affairsType == 5 || form.bizEntityJson.affairsType == 6"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>诉讼目标依据说明</span>
          <el-input :yykReadonly="true" :class="{'novalue-dostep':!form.bizEntityJson.litigationExplain && form.mapEdit.litigationExplain && form.bizEntityJson.affairsType != 5 && form.bizEntityJson.affairsType != 6}" v-model="form.bizEntityJson.litigationExplain" :disabled="!form.mapEdit.litigationExplain  || form.bizEntityJson.affairsType == 5 || form.bizEntityJson.affairsType == 6"></el-input>
        </div>
      </el-col>
    </el-row>

    <el-row class="padding-row">
      <el-col :span="24" class="title-col right-col">
        <h2>评审材料</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="{required: !form.bizEntityJson.disabled && (form.bizEntityJson.affairsType == 1 || form.bizEntityJson.affairsType == 2)}">
          <span>1.起诉状</span>
          <div class="d-red" :class="{novalue: !form.bizEntityJson.complaintFileIds && (form.bizEntityJson.affairsType == 1 || form.bizEntityJson.affairsType == 2)}">
            <el-upload
                name="fileName"
                :headers="{'Authorization': userInfo.token}"
                :accept="$action"
                :action="uploadUrl"
                :data="{userName: form.userInfo.username,bizFileName: 'complaintFileIds',bizId:form.bizId}"
                :before-remove="beforeRemove"
                :on-remove="(file, fileList) => {handleRemove(file, fileList, 'complaintFileIds')}"
                :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'complaintFileIds')"
                :on-error="handleErrorGlobal"
                :on-preview="downLoadFileGlobal"
                :file-list="form.allEntityFileIds.complaintFileIds"
                style="display: flex">
              <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
            </el-upload>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>2.反诉状</span>
          <el-upload
              name="fileName"
              :headers="{'Authorization': userInfo.token}"
              :accept="$action"
              :action="uploadUrl"
              :data="{userName: form.userInfo.username,bizFileName: 'counterclaimFileIds',bizId:form.bizId}"
              :before-remove="beforeRemove"
              :on-remove="(file, fileList) => {handleRemove(file, fileList, 'counterclaimFileIds')}"
              :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'counterclaimFileIds')"
              :on-error="handleErrorGlobal"
              :on-preview="downLoadFileGlobal"
              :file-list="form.allEntityFileIds.counterclaimFileIds"
              style="display: flex">
            <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="{required: !form.bizEntityJson.disabled && (form.bizEntityJson.affairsType == 3 || form.bizEntityJson.affairsType == 4)}">
          <span>3.上诉状</span>
          <div class="d-red" :class="{novalue: !form.bizEntityJson.petitionFileIds && (form.bizEntityJson.affairsType == 3 || form.bizEntityJson.affairsType == 4)}">
            <el-upload
                name="fileName"
                :headers="{'Authorization': userInfo.token}"
                :accept="$action"
                :action="uploadUrl"
                :data="{userName: form.userInfo.username,bizFileName: 'petitionFileIds',bizId:form.bizId}"
                :before-remove="beforeRemove"
                :on-remove="(file, fileList) => {handleRemove(file, fileList, 'petitionFileIds')}"
                :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'petitionFileIds')"
                :on-error="handleErrorGlobal"
                :on-preview="downLoadFileGlobal"
                :file-list="form.allEntityFileIds.petitionFileIds"
                style="display: flex">
              <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
            </el-upload>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="{required: !form.bizEntityJson.disabled && (form.bizEntityJson.affairsType == 1 || form.bizEntityJson.affairsType == 2 || form.bizEntityJson.affairsType == 3 || form.bizEntityJson.affairsType == 4)}">
          <span>4.法律意见书</span>
          <div class="d-red" :class="{novalue: !form.bizEntityJson.legalOpinionFileIds && (form.bizEntityJson.affairsType == 1 || form.bizEntityJson.affairsType == 2 || form.bizEntityJson.affairsType == 3 || form.bizEntityJson.affairsType == 4)}">
            <el-upload
                name="fileName"
                :headers="{'Authorization': userInfo.token}"
                :accept="$action"
                :action="uploadUrl"
                :data="{userName: form.userInfo.username,bizFileName: 'legalOpinionFileIds',bizId:form.bizId}"
                :before-remove="beforeRemove"
                :on-remove="(file, fileList) => {handleRemove(file, fileList, 'legalOpinionFileIds')}"
                :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'legalOpinionFileIds')"
                :on-error="handleErrorGlobal"
                :on-preview="downLoadFileGlobal"
                :file-list="form.allEntityFileIds.legalOpinionFileIds"
                style="display: flex">
              <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
            </el-upload>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="{required: !form.bizEntityJson.disabled && (form.bizEntityJson.affairsType == 1 || form.bizEntityJson.affairsType == 2 || form.bizEntityJson.affairsType == 3 || form.bizEntityJson.affairsType == 4)}">
          <span>5.证据材料</span>
          <div class="d-red" :class="{novalue: !form.bizEntityJson.evidenceFileIds && (form.bizEntityJson.affairsType == 1 || form.bizEntityJson.affairsType == 2 || form.bizEntityJson.affairsType == 3 || form.bizEntityJson.affairsType == 4)}">
            <el-upload
                name="fileName"
                :headers="{'Authorization': userInfo.token}"
                :accept="$action"
                :action="uploadUrl"
                :data="{userName: form.userInfo.username,bizFileName: 'evidenceFileIds',bizId:form.bizId}"
                :before-remove="beforeRemove"
                :on-remove="(file, fileList) => {handleRemove(file, fileList, 'evidenceFileIds')}"
                :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'evidenceFileIds')"
                :on-error="handleErrorGlobal"
                :on-preview="downLoadFileGlobal"
                :file-list="form.allEntityFileIds.evidenceFileIds"
                style="display: flex">
              <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
            </el-upload>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min"  :class="{required: !form.bizEntityJson.disabled && form.bizEntityJson.affairsType == 5}">
          <span>6.调解书</span>
          <div class="d-red" :class="{novalue: !form.bizEntityJson.mediationFileIds && form.bizEntityJson.affairsType == 5}">
            <el-upload
                name="fileName"
                :headers="{'Authorization': userInfo.token}"
                :accept="$action"
                :action="uploadUrl"
                :data="{userName: form.userInfo.username,bizFileName: 'mediationFileIds',bizId:form.bizId}"
                :before-remove="beforeRemove"
                :on-remove="(file, fileList) => {handleRemove(file, fileList, 'mediationFileIds')}"
                :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'mediationFileIds')"
                :on-error="handleErrorGlobal"
                :on-preview="downLoadFileGlobal"
                :file-list="form.allEntityFileIds.mediationFileIds"
                style="display: flex">
              <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
            </el-upload>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>7.其他</span>
          <el-upload
              name="fileName"
              :headers="{'Authorization': userInfo.token}"
              :accept="$action"
              :action="uploadUrl"
              :data="{userName: form.userInfo.username,bizFileName: 'affairsOtherFileIds',bizId:form.bizId}"
              :before-remove="beforeRemove"
              :on-remove="(file, fileList) => {handleRemove(file, fileList, 'affairsOtherFileIds')}"
              :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'affairsOtherFileIds')"
              :on-error="handleErrorGlobal"
              :on-preview="downLoadFileGlobal"
              :file-list="form.allEntityFileIds.affairsOtherFileIds"
              style="display: flex">
            <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
          </el-upload>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>8.诉讼目标的依据材料</span>
          <el-upload
              name="fileName"
              :headers="{'Authorization': userInfo.token}"
              :accept="$action"
              :action="uploadUrl"
              :data="{userName: form.userInfo.username,bizFileName: 'litigationIds',bizId:form.bizId}"
              :before-remove="beforeRemove"
              :on-remove="(file, fileList) => {handleRemove(file, fileList, 'litigationIds')}"
              :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'litigationIds')"
              :on-error="handleErrorGlobal"
              :on-preview="downLoadFileGlobal"
              :file-list="form.allEntityFileIds.litigationIds"
              style="display: flex">
            <el-button v-if="form.mapEdit.litigationIds" size="mini" type="success" plain>添加</el-button>
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
      options: [],
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
    affairsProcessChange(val){
      if(val==4){
        this.$set(this.form.bizEntityJson, 'currency2', '人民')
      }
    },
    quickSearchSWTJNew(query) {
      if (query !== '') {
        this.$approval.selectBisContName(query).then(res => {
          if(res.code === 1 && res.data){
            this.options = res.data;
          } else {
            this.options = [];
          }
        });
      } else {
        this.options = [];
      }
    },
    changeBrand(val) {
      this.form.bizEntityJson.shopName = val.bisShopName;
      this.form.bizEntityJson.bisShopId = val.bisShopId;
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.projectName = val.text
        this.form.bizEntityJson.projectCd = val.id
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
      let nowfile;
      if(file.response) {
        nowfile = file.response.data.fileId.replace(',','');
      } else {
        nowfile = file.id;
      }
      let fileId = this.form.bizEntityJson[param];
      this.form.bizEntityJson[param] = fileId.replace(nowfile,'');
      this.$file.deleteFile(nowfile).then(res => {
        if(res.code === 1) {
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
    },
  }
}
</script>
