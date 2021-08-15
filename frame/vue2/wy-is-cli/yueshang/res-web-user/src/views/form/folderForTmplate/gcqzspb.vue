// 工程签证审批表 宝龙地产/地产/新成本/建设管理/现场变更/现场变更-有合约规划  
//  暂停开发

<template>
  <!-- 工程签证审批表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>集团</span>
          <el-radio-group v-model="form.bizEntityJson.aaa">
            <el-radio :label="'1'">地产</el-radio>
            <el-radio :label="'2'">酒店</el-radio>
            <el-radio :label="'3'">长租公寓</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>是否涉及法务</span>
          <el-radio-group v-model="form.bizEntityJson.aaa">
            <el-radio :label="'1'">涉及法务</el-radio>
            <el-radio :label="'2'">不涉及法务</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>业务条线</span>
           <el-select
            :disabled="form.bizEntityJson.disabled"
            v-model="form.bizEntityJson.aaa"
            placeholder=""
            >
            <el-option
              v-for="item in options"
              :key="item.key"
              :label="item.key"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
     
    <div>
      <el-row class="padding-row">
        <el-col :span="24" class="title-col topRight-col">
          <h2>合同信息</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>区域</span>
            <el-select
              :disabled="form.bizEntityJson.disabled"
              v-model="form.bizEntityJson.aaa"
              placeholder=""
              >
              <el-option
                v-for="item in options"
                :key="item.key"
                :label="item.key"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>是否乙方提单</span>
            <el-radio-group v-model="form.bizEntityJson.aaa">
              <el-radio :label="'1'">是</el-radio>
              <el-radio :label="'2'">否</el-radio>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>乙方变更单号</span>
            <el-input v-model="form.bizEntityJson.aaa" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>项目名称</span>
            <el-input v-model="form.bizEntityJson.aaa" readonly />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>期数</span>
            <el-input v-model="form.bizEntityJson.aaa"  readonly />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>合同编号</span>
            <el-select
              :disabled="form.bizEntityJson.disabled"
              v-model="form.bizEntityJson.aaa"
              filterable
              remote
              reserve-keyword
              :remote-method="quickSearchProject"
              @change="changeProject"
              placeholder=""
              >
              <el-option
                v-for="item in options"
                :key="item.caseId"
                :label="item.caseCode + ' ' + item.caseName"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>合同名称</span>
            <el-input v-model="form.bizEntityJson.aaa" readonly />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>乙方</span>
            <el-input v-model="form.bizEntityJson.aaa"  readonly />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>已确认合同总价(不含税)(元)：</span>
            <el-input v-model="form.bizEntityJson.aaa" readonly />
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>其中合同原价(不含税)(元)：</span>
            <el-input v-model="form.bizEntityJson.aaa" readonly />
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>其中补充协议(不含税)(元)：</span>
            <el-input v-model="form.bizEntityJson.aaa" readonly />
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>其中累计已核定变更费用(不含税)(元)：</span>
            <el-input v-model="form.bizEntityJson.aaa" readonly />
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>含预估累计变更费用 (不含税) (元)：</span>
            <el-input v-model="form.bizEntityJson.aaa" readonly />
          </div>
        </el-col>
      </el-row>
    </div>

     <div>
      <el-row class="padding-row">
        <el-col :span="24" class="title-col topRight-col">
          <h2>变更信息</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>区域</span>
            <el-select
              :disabled="form.bizEntityJson.disabled"
              v-model="form.bizEntityJson.aaa"
              placeholder=""
              >
              <el-option
                v-for="item in options"
                :key="item.key"
                :label="item.key"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>是否乙方提单</span>
            <el-radio-group v-model="form.bizEntityJson.aaa">
              <el-radio :label="'1'">是</el-radio>
              <el-radio :label="'2'">否</el-radio>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>乙方变更单号</span>
            <el-input v-model="form.bizEntityJson.aaa" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>项目名称</span>
            <el-input v-model="form.bizEntityJson.aaa" readonly />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>期数</span>
            <el-input v-model="form.bizEntityJson.aaa"  readonly />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>合同编号</span>
            <el-select
              :disabled="form.bizEntityJson.disabled"
              v-model="form.bizEntityJson.aaa"
              filterable
              remote
              reserve-keyword
              :remote-method="quickSearchProject"
              @change="changeProject"
              placeholder=""
              >
              <el-option
                v-for="item in options"
                :key="item.caseId"
                :label="item.caseCode + ' ' + item.caseName"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>合同名称</span>
            <el-input v-model="form.bizEntityJson.aaa" readonly />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>乙方</span>
            <el-input v-model="form.bizEntityJson.aaa"  readonly />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>已确认合同总价(不含税)(元)：</span>
            <el-input v-model="form.bizEntityJson.aaa" readonly />
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>其中合同原价(不含税)(元)：</span>
            <el-input v-model="form.bizEntityJson.aaa" readonly />
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>其中补充协议(不含税)(元)：</span>
            <el-input v-model="form.bizEntityJson.aaa" readonly />
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>其中累计已核定变更费用(不含税)(元)：</span>
            <el-input v-model="form.bizEntityJson.aaa" readonly />
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
            <span>含预估累计变更费用 (不含税) (元)：</span>
            <el-input v-model="form.bizEntityJson.aaa" readonly />
          </div>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>案例编号</span>
          <el-select
            :disabled="form.bizEntityJson.disabled"
            v-model="form.bizEntityJson.caseNo"
            filterable
            remote
            reserve-keyword
            :remote-method="quickSearchProject"
            @change="changeProject"
            placeholder=""
            >
            <el-option
              v-for="item in options"
              :key="item.caseId"
              :label="item.caseCode + ' ' + item.caseName"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>主办公司</span>
         <el-input v-model="form.bizEntityJson.projectName" @focus="showSearchOrg = true" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>案件名称</span>
         <el-input v-model="form.bizEntityJson.caseName"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>案件归类</span>
          <el-radio-group v-model="form.bizEntityJson.caseClassify">
            <el-radio :label="'1'">商业</el-radio>
            <el-radio :label="'2'">地产</el-radio>
            <el-radio :label="'3'">置地</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>案件类型</span>
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
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>委托类型</span>
          <el-radio-group v-model="form.bizEntityJson.commissionType">
            <el-radio :label="'5'">律师</el-radio>
            <el-radio :label="'10'">内部自办</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>起诉时间</span>
          <el-date-picker
            :readonly="form.bizEntityJson.disabled"
            width="400"
            v-model="form.bizEntityJson.prosecutionDate"
            type="date"
           >
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>代理律师事务所及代理律师</span>
          <el-input v-model="form.bizEntityJson.attorney"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>律师费(元)</span>
          <el-input v-model="form.bizEntityJson.lawyerFee" type="number"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>诉讼费(元)</span>
          <el-input v-model="form.bizEntityJson.litigationCosts" type="number"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>原告</span>
          <el-input v-model="form.bizEntityJson.plaintiff" type="textarea" :rows="5"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>被告</span>
          <el-input v-model="form.bizEntityJson.defendant" type="textarea" :rows="5"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min">
          <span>开庭时间</span>
          <el-date-picker
            :readonly="form.bizEntityJson.disabled"
            width="400"
            v-model="form.bizEntityJson.courtDate"
            type="date"
           >
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>举证期限</span>
          <el-input v-model="form.bizEntityJson.proofLimit"></el-input>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>诉讼标的额(元)</span>
          <el-input v-model="form.bizEntityJson.litigationAmount" type="number"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>案情简述</span>
          <el-input v-model="form.bizEntityJson.caseDescription" type="textarea" :rows="5"></el-input>
        </div>
      </el-col>
    </el-row>

    <el-row class="padding-row">
      <el-col :span="24" class="title-col right-col">
        <h2>评审材料</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="d-min">
          <span>1.起诉状</span>
          	<el-upload
            name="fileName"
            :action="uploadUrl"
            :data="{userName: form.userInfo.username,bizFileName: 'complaintFileIds',bizId:form.bizId}"
            :before-remove="beforeRemove"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'complaintFileIds')}"
            :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'complaintFileIds')"
            :on-preview="downLoadFile"
            :file-list="form.bizEntityJson.complaintFileIdsList"
            style="display: flex">
            <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="d-min">
          <span>2.反诉状</span>
          <el-upload
            name="fileName"
            :action="uploadUrl"
            :data="{userName: form.userInfo.username,bizFileName: 'counterclaimFileIds',bizId:form.bizId}"
            :before-remove="beforeRemove"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'counterclaimFileIds')}"
            :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'counterclaimFileIds')"
            :on-preview="downLoadFile"
            :file-list="form.bizEntityJson.counterclaimFileIdsList"
            style="display: flex">
            <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="d-min">
          <span>3.上诉状</span>
          <el-upload
            name="fileName"
            :action="uploadUrl"
            :data="{userName: form.userInfo.username,bizFileName: 'petitionFileIds',bizId:form.bizId}"
            :before-remove="beforeRemove"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'petitionFileIds')}"
            :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'petitionFileIds')"
            :on-preview="downLoadFile"
            :file-list="form.bizEntityJson.petitionFileIdsList"
            style="display: flex">
            <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="d-min">
          <span>4.法律意见书</span>
          <el-upload
            name="fileName"
            :action="uploadUrl"
            :data="{userName: form.userInfo.username,bizFileName: 'legalOpinionFileIds',bizId:form.bizId}"
            :before-remove="beforeRemove"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'legalOpinionFileIds')}"
            :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'legalOpinionFileIds')"
            :on-preview="downLoadFile"
            :file-list="form.bizEntityJson.legalOpinionFileIdsList"
            style="display: flex">
            <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="d-min">
          <span>5.证据材料</span>
          <el-upload
            name="fileName"
            :action="uploadUrl"
            :data="{userName: form.userInfo.username,bizFileName: 'evidenceFileIds',bizId:form.bizId}"
            :before-remove="beforeRemove"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'evidenceFileIds')}"
            :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'evidenceFileIds')"
            :on-preview="downLoadFile"
            :file-list="form.bizEntityJson.evidenceFileIdsList"
            style="display: flex">
            <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="d-min">
          <span>6.调解书</span>
          <el-upload
            name="fileName"
            :action="uploadUrl"
            :data="{userName: form.userInfo.username,bizFileName: 'mediationFileIds',bizId:form.bizId}"
            :before-remove="beforeRemove"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'mediationFileIds')}"
            :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'mediationFileIds')"
            :on-preview="downLoadFile"
            :file-list="form.bizEntityJson.mediationFileIdsList"
            style="display: flex">
            <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="d-min">
          <span>7.其他</span>
          <el-upload
            name="fileName"
            :action="uploadUrl"
            :data="{userName: form.userInfo.username,bizFileName: 'affairsOtherFileIds',bizId:form.bizId}"
            :before-remove="beforeRemove"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'affairsOtherFileIds')}"
            :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'affairsOtherFileIds')"
            :on-preview="downLoadFile"
            :file-list="form.bizEntityJson.affairsOtherFileIdsList"
            style="display: flex">
            <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
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
      options: []
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
  created() {},
  methods: {
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.projectName = val.text
        this.form.bizEntityJson.projectCd = val.id
      }
      this.showSearchOrg = false
    },
    // 模糊搜索案例编号并带出相关信息
    quickSearchProject(query) {
      if (query !== '') {
        this.$approval.fcaseInfoQuerySeach(query).then(res => {
          if(res.code == 1 && res.data){
            this.options = res.data;
          } else {
            this.options = [];
          }
        });
      } else {
        this.options = [];
      }
    },
    changeProject(val) {
      this.form.bizEntityJson = {...this.form.bizEntityJson,...val}
    },
    handleSuccess(response, file, fileList,param) {
      console.log(response, file, fileList,param)
      const fileId = response.data.fileId;
      if(!this.form.bizEntityJson[param]) {
        this.form.bizEntityJson[param] = '';
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
    },
    // 必填校验
    validate() {
      if(!this.form.bizEntityJson.affairsType) return this.$message.error('请选择阶段'), false
      if(!this.form.bizEntityJson.affairsProcess) return this.$message.error('请选择流程'), false
      if(!this.form.bizEntityJson.caseNo) return this.$message.error('请选择案例编号'), false
      if(!this.form.bizEntityJson.projectName) return this.$message.error('请输入主办公司'), false
      if(!this.form.bizEntityJson.caseName) return this.$message.error('请输入案件名称'), false
      if(!this.form.bizEntityJson.caseClassify) return this.$message.error('请选择案件归类'), false
      if(!this.form.bizEntityJson.caseMode) return this.$message.error('请选择案件类型'), false
      if(!this.form.bizEntityJson.commissionType) return this.$message.error('请选择委托类型'), false
      if(!this.form.bizEntityJson.prosecutionDate) return this.$message.error('请选择起诉时间'), false
      if(!this.form.bizEntityJson.attorney) return this.$message.error('请输入代理律师事务所及代理律师'), false
      if(!this.form.bizEntityJson.lawyerFee) return this.$message.error('请选择律师费'), false
      if(!this.form.bizEntityJson.litigationCosts) return this.$message.error('请输入诉讼费'), false
      if(!this.form.bizEntityJson.plaintiff) return this.$message.error('请输入原告'), false
      if(!this.form.bizEntityJson.defendant) return this.$message.error('请输入被告'), false
      if(!this.form.bizEntityJson.litigationAmount) return this.$message.error('请输入诉讼标的额'), false
      if(!this.form.bizEntityJson.caseDescription) return this.$message.error('请输入案情简述'), false
    },
  }
}
</script>
