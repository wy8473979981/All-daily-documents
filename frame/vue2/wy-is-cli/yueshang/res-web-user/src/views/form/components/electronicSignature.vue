<template>
  <div class="signature public-box">
    <el-form ref="sendContractsSyncQo" :model="sendContractsSyncQo">
      <el-row class="red-box-fix file-list">
        <dl-col :span="24" place="title top right">
          <h2>签约方式</h2>
        </dl-col>
        <dl-col :span="4" place="height-auto" style="width: 168px;">
          <p class="explain-p-one-title">签约方式</p>
        </dl-col>
        <dl-col :span="4" place="height-auto" :style="{width: '168px',borderWidth: sendContractsSyncQo.signatureType !=1 ? '0 1px 1px 1px':''}">
          <el-form-item :required="!uneditable" :prop="uneditable ? '' : 'signatureType'">
            <el-select class="required" :disabled="uneditable" v-model="sendContractsSyncQo.signatureType" placeholder="请选择">
              <el-option label="电子签约" :value="1"></el-option>
              <el-option label="纸质签约" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </dl-col>
        <dl-col :span="4" place="height-auto" style="width: 168px;" v-if="sendContractsSyncQo.signatureType == 1">
          <p class="explain-p-one-title">签约方式按顺序签署</p>
        </dl-col>
        <dl-col :span="4" place="height-auto" style="width: 168px" v-if="sendContractsSyncQo.signatureType == 1">
          <el-form-item :required="!uneditable" :prop="uneditable ? '' : 'isBySignOrder'">
            <el-select class="required" v-model="sendContractsSyncQo.isBySignOrder" :disabled="uneditable" placeholder="请选择">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </dl-col>
        <dl-col :span="4" place="height-auto" style="width: 168px;" v-if="sendContractsSyncQo.signatureType == 1">
          <p class="explain-p-one-title">当前发件方</p>
        </dl-col>
        <dl-col :span="4" place="height-auto" style="flex:auto;border-width: 0 1px 1px 1px;" v-if="sendContractsSyncQo.signatureType == 1">
          <el-form-item>
            <el-select class="required" disabled v-model="sendContractsSyncQo.currentSender" placeholder="请选择" filterable @change="getSender">
              <el-option v-for="(item,index) in getGroupMemberList" :label="item.enterpriseName" :value="item.enterpriseName" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </dl-col>
      </el-row>
      <template v-if="sendContractsSyncQo.signatureType == 1">
        <div v-for="(item,i) in sendContractsSyncQo.contractsList" :key="i">
          <el-row class="red-box-fix file-list">
            <dl-col :span="24" place="title top right" style="border-top: none !important;">
              <h2>
								用章文件及合同签约方
							<span v-if="i==0 && !uneditable" style="color:#468CEB;display: inline-block;cursor:pointer;" @click="addcontractsList"><i class="el-icon-circle-plus" style="margin-left: 18px;"></i></span>
							<span v-if="i> 0 && !uneditable" @click="deleteContractDom(i)" class="delete-contract" ><i class="el-icon-remove-outline"></i></span>
							</h2>

            </dl-col>
            <dl-col :span="4" place="height-auto" style="width: 168px;">
              <p class="explain-p-one-title">文件标题</p>
              <p class="explain-p-one-title title">用章文件
                <el-tooltip class="item" effect="dark" content="文件仅支持pdf, doc, docx格式" placement="top-start">
                  <i class="el-icon-question" style="color: #F5A623;"></i>
                </el-tooltip>
              </p>
            </dl-col>
            <template v-for="(obj,j) in item.documents">
              <dl-col :span="4" place="height-auto" style="flex:1 1 246px;max-width: 246px;" :key="j">
                <el-form-item :required="!uneditable">
                  <el-input class="required" placeholder="请选择" v-model="obj.name" :disabled="uneditable" style="border-bottom: solid 1px #ddd;box-sizing:content-box"/>
                </el-form-item>
                <div class="img-attchment">
                  <div class="attchment" v-if="obj.imgList && obj.imgList.length>0" @click="getSwiper(obj.imgList)">
                    <img :src="obj.imgList[0].imagePreviewUrl" style="width: 100%;" />
                    <i v-if="!uneditable" class="delete-file el-icon-remove-outline" @click.stop="deleteImg(item.documents,j)"></i>
                  </div>
                </div>
              </dl-col>
            </template>
            <dl-col :span="4" place="height-auto" style="flex:auto;border-width: 0 1px 1px 1px;">
              <div class="upload-file" v-if="!uneditable">
                <el-upload class="upload-box" action="#" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" accept=".pdf,.doc,.docx" @click.native="documentIndex = i" :http-request="handleChange">
                  <i class="el-icon-circle-plus-outline"></i>
                  <p>上传文件</p>
                </el-upload>
              </div>
            </dl-col>
          </el-row>
          <el-row class="red-box-fix file-list">
            <dl-col :span="4" place="height-auto" class="contract-title" style="width: 168px;">
              <div class="explain-p-one-title">
                <p>
                  <span>合同签约方</span>
                  <!-- <el-dropdown>
                  <span class="el-dropdown-link add-icon">
                    添加合同签约方<i class="el-icon-arrow-down el-icon--right" color="#468ceb"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(role, roleIndex) in roles" :key="roleIndex" @click.native="addContract(item.roles,role)" style="padding: 0 20px;">{{role.label}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown> -->
                </p>
              </div>
            </dl-col>
            <dl-col :span="20" place="height-auto" style="flex: auto;    border-width: 0 0 0px 0px;">
              <el-row class="red-box-fix file-list" v-if="!uneditable">
                <dl-col :span="24" place="height-auto">
                  <template v-for="(role,roleIndex) in roles">
                    <span :key="roleIndex" v-if="role.label === '宝龙签约企业'" class="add-item" @click="addContract(item.roles,role)">
                      <i class="el-icon-plus"></i>添加宝龙签约企业
                      <el-tooltip class="item" effect="dark" content="如果签约方为宝龙企业，务必通过此处添加" placement="top-start">
                        <i class="el-icon-question" style="color: #F5A623;"></i>
                      </el-tooltip>
                    </span>
                    <span :key="roleIndex" v-else class="add-item" @click="addContract(item.roles,role)"><i class="el-icon-plus"></i>添加签约{{role.label}}</span>
                  </template>
                </dl-col>
              </el-row>
              <el-row class="red-box-fix file-list">
                <dl-col :span="2" place="height-auto">
                  <p  class="explain-p-one-title">签约顺序</p>
                </dl-col>
                <dl-col :span="3" place="height-auto">
                  <p class="explain-p-one-title">
                    主体类型
                    <el-tooltip class="item" effect="dark" content="如果签约方为宝龙企业，务必选择宝龙签约企业" placement="top-start">
                      <i class="el-icon-question" style="color: #F5A623;"></i>
                    </el-tooltip>
                  </p>
                </dl-col>
                <dl-col :span="7" place="height-auto">
                  <p class="explain-p-one-title">
                    签约主体名称
                  </p>
                </dl-col>
                <dl-col :span="3" place="height-auto">
                  <p class="explain-p-one-title">
                    印章类型
                  </p>
                </dl-col>
                <dl-col :span="4" place="height-auto">
                  <p class="explain-p-one-title">
                    接收手机/邮箱
                  </p>
                </dl-col>
                <dl-col :span="3" place="height-auto">
                  <p class="explain-p-one-title">
                    签约角色
                  </p>
                </dl-col>
                <dl-col :span="2" place="height-auto" style="border-width:0 1px 1px">
                  <p class="explain-p-one-title">
                    操作
                  </p>
                </dl-col>
              </el-row>
              <!-- 渲染列表 -->
              <el-row v-for="(con,k) in item.roles" :key="k" class="file-list">
                <dl-col :span="2" place="height-auto">
                  <el-form-item  :required="!uneditable && con.userTypeName != '宝龙签约企业' && sendContractsSyncQo.isBySignOrder" :prop="con.userTypeName == '宝龙签约企业' ? '':`contractsList[${i}].roles[${k}].signOrderly`">
                    <el-input  :class="con.userTypeName != '宝龙签约企业' && sendContractsSyncQo.isBySignOrder ? 'required':''" :disabled="con.userTypeName == '宝龙签约企业' || uneditable" :placeholder="con.userTypeName != '宝龙签约企业'? '请输入':''" v-model="con.signOrderly" :label="con.label" @change="signOrderChange(item.roles,con)"/>
                  </el-form-item>
                </dl-col>
                <dl-col :span="3" place="height-auto">
                  <el-form-item :required="!uneditable" :prop="`contractsList[${i}].roles[${k}].userTypeName`">
                    <el-input class="required" :disabled="true" placeholder="请输入" v-model="con.userTypeName" />
                  </el-form-item>
                  <!-- <el-select class=":required="!uneditable"" placeholder="企业" :disabled="uneditable" v-model="con.userType">
                  <el-option label="企业" value="ENTERPRISE"></el-option>
                  <el-option label="个人" value="PERSON"></el-option>
                </el-select> -->
                </dl-col>
                <dl-col :span="7" place="height-auto">
                  <div v-if="con.userTypeName === '个人'" style="display: flex;width: 100%;">
                    <el-form-item :required="!uneditable" :prop="`contractsList[${i}].roles[${k}].userInfo.userName`">
                      <el-input class="required" placeholder="请输入姓名" style="flex: 0 0 117px;border-right: solid 1px #ddd;border-bottom: none;" :disabled="uneditable" v-model="con.userInfo.userName" />
                    </el-form-item>
                    <el-form-item style="flex:auto;" :required="!uneditable" :prop="`contractsList[${i}].roles[${k}].realNameAuthentication.idNumber`">
                      <el-input class="required" placeholder="请输入身份证号，用于签约身份核对"  :disabled="uneditable" v-model="con.realNameAuthentication.idNumber" />
                    </el-form-item>
                  </div>
                  <el-form-item :required="!uneditable" v-else-if="con.userTypeName === '企业'" :prop="`contractsList[${i}].roles[${k}].userInfo.enterpriseName`">
                    <el-input placeholder="请输入企业名称" :disabled="uneditable" v-model="con.userInfo.enterpriseName"></el-input>
                  </el-form-item>
                  <el-form-item :required="!uneditable" v-else :prop="`contractsList[${i}].roles[${k}].userInfo.enterpriseName`">
                    <el-select class="required" filterable placeholder="请选择企业名称" :disabled="uneditable" v-model="con.userInfo.enterpriseName" @change="querySeals(con)">
                      <el-option v-for="(member, index) in getGroupMemberList" :label="member.enterpriseName" :value="member.enterpriseName" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </dl-col>
                <dl-col :span="3" place="height-auto">
                  <!-- <el-form-item :required="!uneditable" :prop="`contractsList[${i}].roles[${k}].sealName`">
                    <el-select class=":required="!uneditable"" placeholder="请选择" v-if="con.userTypeName == '宝龙签约企业'" :disabled="uneditable" v-model="con.sealName">
                      <el-option v-for="item in querySealsList" :label="item.sealName" :value="item.sealName" :key="item.sealName"></el-option>
                    </el-select>
                  </el-form-item> -->
                  <template v-if="con.userTypeName == '宝龙签约企业'">
                    <el-form-item :required="!uneditable" :prop="`contractsList[${i}].roles[${k}].sealName`">
                      <el-select class="required" placeholder="请选择" :disabled="uneditable" v-model="con.sealName">
                        <el-option v-for="item in con.querySealsList" :label="item.sealName" :value="item.sealName" :key="item.sealName"></el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </dl-col>
                <dl-col :span="4" place="height-auto">
                  <el-form-item  v-if="con.roleName == '乙方'" :prop="`contractsList[${i}].roles[${k}].userInfo.userAccount`" :rules="[{required: true, message:'请输入', trigger: 'blur'},{validator: checkTel,message: '请輸入正确的格式', trigger: 'blur'}]">
                    <el-input class="required"  :disabled="uneditable || (con.userTypeName == '宝龙签约企业' && con.userInfo.userAccount != '')" v-model="con.userInfo.userAccount" placeholder="请输入手机号" />
                  </el-form-item>
									<el-form-item  v-else :prop="`contractsList[${i}].roles[${k}].userInfo.userAccount`" :rules="[{required: true, message:'请输入', trigger: 'blur'},{validator: checkAccount,message: '请輸入正确的格式', trigger: 'blur'}]">
									  <el-input class="required"  :disabled="uneditable || (con.userTypeName == '宝龙签约企业' && con.userInfo.userAccount  != '')" v-model="con.userInfo.userAccount" placeholder="请输入手机号或邮箱" />
									</el-form-item>
                </dl-col>
                <dl-col :span="3" place="height-auto">
                  <el-form-item :required="!uneditable" :prop="`contractsList[${i}].roles[${k}].roleName`">
                    <el-select class="required" placeholder="请选择" :disabled="uneditable" v-model="con.roleName">
                      <el-option label="甲方" value="甲方"></el-option>
                      <el-option label="乙方" value="乙方"></el-option>
                      <el-option label="丙方" value="丙方"></el-option>
											<el-option label="丁方" value="丁方"></el-option>
                    </el-select>
                  </el-form-item>
                </dl-col>
                <dl-col :span="2" place="height-auto" style="border-width: 0 1px 1px 1px;">
                  <p class="delete-operate" v-if="!uneditable"><i class="el-icon-remove-outline" @click="deleteContract(item.roles,k)"></i></p>
                </dl-col>
              </el-row>
            </dl-col>
          </el-row>
        </div>
      </template>
    <!--  <el-row class="red-box-fix file-list" v-if="!uneditable && sendContractsSyncQo.signatureType == 1">
        <dl-col :span="24" place="title top right" style="border-top: none !important;">
          
        </dl-col>
      </el-row> -->
      <el-row class="red-box-fix file-list" v-if="sendContractsSyncQo.signatureType == 1">
        <dl-col :span="24" place="title top right" style="border-top: none !important;">
          <h2>指定签署位置</h2>
        </dl-col>
        <dl-col :span="4" place="height-auto" style="width: 168px;">
          <p class="explain-p-one-title">指定签署位置</p>
        </dl-col>
        <dl-col :span="20" place="height-auto" style="flex: auto;border-width: 0 1px 1px 1px;">
          
          <p v-if="data && data.bizEntityJson && data.bizEntityJson.sendContractsSyncQoNew && data.bizEntityJson.sendContractsSyncQoNew.sendContractsSyncQo && data.bizEntityJson.sendContractsSyncQoNew.attachmentList || !contractChange" style="line-height: 36px;color: #60BC75;padding-left: 20px;" class="signatureStatus">
						<span @click="getDrawer">
            <i class="el-icon-success" color="#60BC75" style="margin-right: 10px;"></i>签署位置已指定</span>
          </p>
					<p v-else-if="data && data.bizEntityJson && data.bizEntityJson.sendContractsSyncQoNew && !data.bizEntityJson.sendContractsSyncQoNew.attachmentList && data.bizEntityJson.sendContractsSyncQoNew" style="line-height: 36px;color: #FF3D3B;padding-left: 20px;" class="signatureStatus">
						<span @click="getDrawer">
					  <i class="el-icon-error" color="#FF3D3B" style="margin-right: 10px;"></i>签署位置未指定</span>
					</p>
					<p style="color: #468CEB;line-height: 36px;padding-left: 20px;" v-else class="signatureStatus">
					  <span @click="getDrawer"><i class="el-icon-location-information"></i>指定签署位置</span>
					</p>
				<!-- 	<p style="color: #468CEB;line-height: 36px;padding-left: 20px;">
					  <span @click="getDrawer"><i class="el-icon-location-information"></i>指定签署位置</span>
					</p> -->
        </dl-col>
      </el-row>
      <el-drawer title="我是标题" :visible.sync="drawer" v-if="drawer" :with-header="false" :size="'100%'">
        <DragContract :params="attachmentList" :status="status" @close="dragContractClose" @save="dragContractSave" />
      </el-drawer>
     <!-- <swiperList :list="list" :dialogVisible.sync="dialogVisible"></swiperList> -->
    </el-form>
		<viewer class="imgPreview" @inited="inited" ref="viewer" :images="list">
		  <div class="fj-showImg" v-for="(item, index) in list" :key="index">
		   <img :src="item" :alt="item">
		  </div>
		</viewer>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import swiperList from './swiper.vue'
import approval from '@/apis/apis/approval';
import fileapi from '@/apis/apis/file'
import { mapState,mapMutations} from 'vuex';
import Template from './template.vue';
import detailJson from '../detail.json'
let loadingService
var checkAccount = (rule, value, callback) => {
	let emialRule = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
	let telRule = /^(0\d{2,3}-\d{7,8})|(1[3584]\d{9})$/
	let emialFlog = emialRule.test(value) 
	let telFlog = telRule.test(value)
	if (!value) {
		return callback(new Error('不能为空'));
	}
	if (emialFlog || telFlog) {
		callback();
	} else {
		callback(new Error('请输入正确的手机号或邮箱'));
	}
}
var checkTel = (rule, value, callback) => {
	let telRule = /^(0\d{2,3}-\d{7,8})|(1[3584]\d{9})$/
	let telFlog = telRule.test(value)
	if (!value) {
		return callback(new Error('不能为空'));
	}
	if (telFlog) {
		callback();
	} else {
		callback(new Error('请输入正确的手机号或邮箱'));
	}
}
export default {
  name: 'electronicSignature',
  components: { swiperList, Template },
  data () {
    Template
    return {
			detailJson:detailJson,
			status:false,
			checkAccount:checkAccount,
			checkTel:checkTel,
      allQueryId: null,
      roles: [
        {
          type: 'PERSON',
          label: '个人'
        },
        {
          type: 'ENTERPRISE',
          label: '企业'
        },
        {
          type: 'ENTERPRISE',
          label: '宝龙签约企业'
        },
      ],
      dialogVisible: false,
      list: null,
      drawer: false,
      sendContractsSyncQo: {
        signatureType: null,
        sender: {},
        contractsList: [
          {
            templateId: '2851429124323409925',
            contractSendId: 0,
            roles: [
              {
                userInfo: {},
                realNameAuthentication: {},
                userType: 'ENTERPRISE',
                userTypeName: '宝龙签约企业',
                signOrderly: '',
                receiverType: 'SIGNER',
                ridingSealY: "0.5",
              }
            ],
            documents: []
          }
        ]
      },
      signatureType: '',
      getGroupMemberList: [],
      querySealsList: [],
      documentIndex: null,
      uneditable: false,
      docLength: 0,
      loading: false,
      attachmentList: this.$params,
      fileUploadSuccess: [

      ],
			contractChange:true,
			childContractList:null,
			content:'',
			showUrl:''
    }
  },
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  watch: {
		'sendContractsSyncQo.isBySignOrder':function(newValue) {
			if(!newValue) {
				this.sendContractsSyncQo.contractsList.map(item => {
					item.roles.map(obj =>{
						if(obj.userTypeName == '宝龙签约企业'){
							obj.signOrderly = 2
						}else {
							obj.signOrderly = 1
						}
						
					})
				})
			}else {
				  this.sendContractsSyncQo.contractsList.map(item => {
						let list = item.roles.filter(k=>k.userTypeName != '宝龙签约企业')
						let maxOrder = Math.max.apply(Math, list.map(function (o) { return o.signOrderly }))
						if(maxOrder && list.length > 0) {
							item.roles.map((obj,i) =>{
								if(obj.userTypeName == '宝龙签约企业') {
									obj.signOrderly = maxOrder + i + 1
								}
							})
						}
					})
			}
		},
    data: function (newValue) {
      if (newValue.pmApprove) {
				if(newValue.pmApprove.status == '草稿') {
					this.status = false
					this.uneditable = false
				}else{
					this.status = true
					this.uneditable = true
				}
        this.getAccountInfo()
        /* this.sendContractsSyncQo.isBySignOrder = newValue.bizEntityJson.sendContractsSyncQo.isBySignOrder
        this.sendContractsSyncQo.currentSender = newValue.bizEntityJson.sendContractsSyncQo.currentSender
        this.sendContractsSyncQo.contractsList = newValue.bizEntityJson.sendContractsSyncQo.contractsList
        this.sendContractsSyncQo.contractsSyncVo = newValue.bizEntityJson.sendContractsSyncQo.contractsSyncVo */
				if(newValue.bizEntityJson.sendContractsSyncQoNew){
					this.attachmentList = newValue.bizEntityJson.sendContractsSyncQoNew.attachmentList
					
					this.sendContractsSyncQo = newValue.bizEntityJson.sendContractsSyncQoNew.sendContractsSyncQo
					this.sendContractsSyncQo.signatureType = parseInt(this.sendContractsSyncQo.signatureType)
				}
				
        /* this.getContractDetail(newValue.bizEntityJson.sendContractsSyncQo.contractsSyncVo)
          .then(() => {
            this.sendContractsSyncQo.contractsList.map((item, contractIndex) => {
              item.documents.map((obj, objIndex) => {
                obj.imgList.map((img, imgIndex) => {
                  this.viewUrl(img.imagePreviewUrl, contractIndex, objIndex, imgIndex, 'imagePreviewUrl'),
                    this.viewUrl(img.attachmentDetailItemImgUrl, contractIndex, objIndex, imgIndex, 'attachmentDetailItemImgUrl')
                })
              })
            })
          })
        if (newValue.pmApprove.status === '草稿' || newValue.pmApprove.status === '驳回') {
          this.uneditable = false
        } */
      }

    },
    loading: function (newValue) {
      if (newValue) {
        loadingService = Loading.service({
          lock: true,
          text: '加载中…',
          background: 'rgba(0, 0, 0, 0.2)'
        })
      } else {
        loadingService.close()
      }
    }
  },
  created () {
    this.getGroupMember()
    //this.getAccountInfo()
		this.$set(this.sendContractsSyncQo.contractsList[0].roles[0].userInfo,'userAccount',this.userInfo.email || this.userInfo.telephone)
		//this.attachmentList = this.detailJson.sendContractsSyncQoNew.attachmentList
	
  },
  computed: {
    ...mapState(['userInfo','fileList'])
  },
  methods: {
		...mapMutations(['saveAttachment']),
		signOrderChange(roles,con) {
			/* if(this.sendContractsSyncQo.isBySignOrder && roles.filter(item => item.signOrderly == con.signOrderly).length > 1) {
				con.signOrderly = ''
				this.$message.error('顺序不能重复!')
			} */
			if(this.sendContractsSyncQo.isBySignOrder) {
				let list = roles.filter(item=>item.userTypeName != '宝龙签约企业')
				let maxOrder = Math.max.apply(Math, list.map(function (o) { return o.signOrderly }))
				if(maxOrder) {
					roles.map((obj,i) =>{
						if(obj.userTypeName == '宝龙签约企业') {
							obj.signOrderly = maxOrder + i + 1
						}
					})
				}
			}
		},
    async getAccountInfo () {
      let res = await approval.accountInfo()
      if (res.code == 1) {
        this.$common.setCookie('accessToken', res.data.accessToken, 1)
        this.$common.setCookie('refreshToken', res.data.refreshToken, 1)
      }
    },
    async getContractDetail (contractsSyncVo) {
      let params = {
        detailParams: contractsSyncVo
      }
      let res = await approval.queryContractDetail(params)
      if (res.code == 1) {

        let contractList = res.data
				let maxLength = Math.max.apply(Math, this.sendContractsSyncQo.contractsList.map(function (o) { return parseInt(o.contractSendId) }))
        contractList.map((item, i) => {
          let imgList = []
					let status = this.data.pmApprove.status
          item.documents.map((obj, j) => {
            obj.page.map(k => {
              imgList.push({
                imagePreviewUrl: status == '草稿' ? k.imagePreviewUrl.replace('needMergeLabel=true','needMergeLabel=false') : k.imagePreviewUrl,
                attachmentDetailItemImgUrl:status == '草稿' ? k.highQualityPreviewUrl.replace('needMergeLabel=true','needMergeLabel=false') : k.highQualityPreviewUrl,//this.getUrl('img'+i+j,'https://api.bestsign.info' + k.highQualityPreviewUrl),//k.highQualityPreviewUrl,
                originalFilename: obj.fileName
              })
            })
            obj.imgList = imgList
          })
					
					for(let k =0;k<=maxLength;k++) {
						let flogIndex = this.sendContractsSyncQo.contractsList[k].documents.findIndex(obj => obj.originalFilename.split('.')[0] == item.documents[0].fileName)
						if(flogIndex || flogIndex === 0) {
							/* this.sendContractsSyncQo.contractsList[i].documents[flogIndex] = item.documents[0] */   item.documents[0].originalFilename = item.documents[0].fileName
							this.sendContractsSyncQo.contractsList[k].documents[flogIndex] = item.documents[0]
							this.$set(this.sendContractsSyncQo.contractsList[k].documents,flogIndex,item.documents[0])
							
						}
					}
					console.log(this.sendContractsSyncQo.contractsList)
        })
        console.log(this.sendContractsSyncQo.contractsList)
      }
    },
    async viewUrl (url, contractIndex, objIndex, imgIndex, type) {
      let res = await approval.viewUrl({ url })
      if (res.code == 1) {
        url = res.data
        if (type === 'attachmentDetailItemImgUrl') {
          this.$set(this.sendContractsSyncQo.contractsList[contractIndex].documents[objIndex].imgList[imgIndex], 'attachmentDetailItemImgUrl', url)
        } else {
          this.$set(this.sendContractsSyncQo.contractsList[contractIndex].documents[objIndex].imgList[imgIndex], 'imagePreviewUrl', url)
        }
      }
    },
    async getDrawer () {
      /* let flag = this.fileUploadSuccess && this.fileUploadSuccess.some((item, index) => {
        return item.number != item.totalPage
      })
      if (flag) {
        this.$message({
          message: '请等待上传完成!',
          type: 'warning'
        });
        return false
      } */
			/* if(this.data.pmApprove && this.data.pmApprove.status != '草稿') {
				return false
			} */
			if(this.$root.$params) {
				this.$set(this.data.bizEntityJson,'sendContractsSyncQoNew',{
					attachmentList:this.$root.$params
				})
			}
			await this.createAttachmentData()
			if (this.sendContractsSyncQo.contractsList[0].documents.length > 0 && this.sendContractsSyncQo.contractsList[0].roles.length > 0) {
				this.saveContract()
			} else {
				this.$message({
					message: '请上传合同或新增合约方!',
					type: 'warning'
				});
			}
      
    },
    dragContractClose () {
      this.drawer = false;
    },
    dragContractSave (data) {
			console.log(data)
		 /* this.childContractList = JSON.parse(JSON.stringify(data))*/
      this.contractChange = false 
      this.drawer = false;
      console.log('save', data)
		 this.attachmentList = data
		 this.$forceUpdate()
      /* data.map((item) => {
        let newAttachments = [];
        item.attachmentDetailList.map((attachmentItem, attachmentIndex) => {
          let attachmentObj = { ...attachmentItem, appendingSignLabels: attachmentItem.dragList, content: item.content }
          newAttachments.push(attachmentObj);
        });
				item.attachments = newAttachments
        attachmentList.push({ ...item, currentPage: 1, attachmentDetailList: newAttachments });
      })
      this.attachmentList = JSON.parse(JSON.stringify(attachmentList)); */
			//this.saveAttachment(this.attachmentList)
      //this.sendContractsSync()
    },
    createAttachmentData () {
      let attachmentList = null
			this.attachmentList = []
      attachmentList = JSON.parse(JSON.stringify(this.sendContractsSyncQo.contractsList))
      
     
      attachmentList.map((item, index) => {
        let { documents, roles } = item;
				
        let newRoles = [];
        roles.map((roleItem, roleIndex) => {
          let qyfName = '';
          if (roleItem.userType.endsWith('ENTERPRISE')) {
            qyfName = roleItem.userInfo.enterpriseName;
          } else {
            qyfName = roleItem.userInfo.userName;
          }
					/* if(this.data.bizEntityJson && this.data.bizEntityJson.sendContractsSyncQoNew && this.data.bizEntityJson.sendContractsSyncQoNew.attachmentList){
						let index = this.data.bizEntityJson.sendContractsSyncQoNew.attachmentList[index].dragList.findIndex(item => item.currentQyName == roleItem.userInfo.enterpriseName)
						if(index || index === 0){
							
						}else {
							this.data.bizEntityJson.sendContractsSyncQoNew.attachmentList[index].dragList.splice(index,1)
						}
					} */
          newRoles.push({ ...roleItem, qyfName: qyfName, stampChecked: false, qfzChecked: false })
        })
				let _this = this
        documents.map((docItem, docIndex) => {
					let attachmentItemDetail = [];
					docItem.imgList.map((imgItem, imgIndex) => {
						// order:表示附件详情的页数，从1开始计算,在操作数据时需要 -1 ，
						let obj = { order: imgIndex + 1, attachmentDetailItemImgUrl: imgItem.attachmentDetailItemImgUrl, appendingSignLabels: [], fileName: docItem.originalFilename, };
						attachmentItemDetail.push(obj)
					})
					let attachmentItem = {
						roles: JSON.parse(JSON.stringify(newRoles)),
						name: docItem.originalFilename,
						attachmentDetailList: attachmentItemDetail,
						curAbbImgBase64code: docItem.imgList[0].curAbbImgBase64code,
						currentPage: docItem.curPage,
						totalPage: docItem.totalPage,
						success: false,
						...docItem,
						contractIndex: index
					}
					console.log(this.data.bizEntityJson)
					if(this.data.bizEntityJson && this.data.bizEntityJson.sendContractsSyncQoNew && this.data.bizEntityJson.sendContractsSyncQoNew.attachmentList && this.data.bizEntityJson.sendContractsSyncQoNew.attachmentList.find(item => item.name == attachmentItem.name)){       
						let oldAtt = this.data.bizEntityJson.sendContractsSyncQoNew.attachmentList.find(item => item.name == attachmentItem.name)
						
						oldAtt.roles.map((role,roleIndex) => {
							let qfzIndex = newRoles.findIndex(newRole => newRole.userInfo.enterpriseName == role.userInfo.enterpriseName)
							if(role.qfzChecked && (qfzIndex || qfzIndex === 0)) {
								newRoles[qfzIndex] = role
							}
						})
						oldAtt.roles = newRoles
						
            oldAtt.attachmentDetailList.map(attachmentDetail => {
							attachmentDetail.dragList.map((item,dragIndex) => {
								if(!(newRoles.findIndex(obj => obj.userInfo.enterpriseName == item.currentQyName) != -1 || newRoles.findIndex(obj => obj.userInfo.userName == item.currentQyName) != -1)) {
									attachmentDetail.dragList.splice(dragIndex,1)
								}
							})
						})
						let roleBlList = newRoles.filter(item => item.userTypeName == "宝龙签约企业")           
						let roleOtherList = newRoles.filter(item => item.userTypeName != "宝龙签约企业")           
						roleOtherList.sort((a,b) => {return parseInt(a.signOrderly) - parseInt(b.signOrderly)})
						oldAtt.roles = [...roleOtherList,...roleBlList]
						this.attachmentList.push(oldAtt)
					}else {
						let roleBlList = newRoles.filter(item => item.userTypeName == "宝龙签约企业")
						let roleOtherList = newRoles.filter(item => item.userTypeName != "宝龙签约企业")    
						roleOtherList.sort((a,b) => {return parseInt(a.signOrderly) - parseInt(b.signOrderly)}) 
						attachmentItem.roles = [...roleOtherList,...roleBlList]
						this.attachmentList.push(attachmentItem)
					}
        })
				
      })
    },
		inited(viewer) {
			this.$viewer = viewer
		},
    //获取大图
    getSwiper (list) {
      let imgs = []
      list.map(item => {
        imgs.push(item.attachmentDetailItemImgUrl)
      })
      this.list = imgs
			this.$nextTick(()=> {
				this.$viewer.show()
			})
    },
    //获取印章和接收方
    querySeals (con) {
      let userinfo = this.getGroupMemberList.filter(item => item.enterpriseName === con.userInfo.enterpriseName)
      con.userInfo.userName = userinfo[0].name
      //con.userInfo.userAccount = userinfo[0].account
      this.getYzList(con)
      //this.employeesInfo(con)
    },
    //获取接收人
    async employeesInfo (con) {
      console.log(this.getGroupMemberList)
      let person = this.getGroupMemberList.filter(item => con.userInfo.enterpriseName === item.enterpriseName)
      let params = {
        account: person[0].account,
        bizName: person[0].enterpriseBizName,
        enterpriseName: person[0].enterpriseName
      }
      let res = await approval.employeesInfo(params)
      if (res.code === 1) {
       // con.userInfo.userAccount = res.data
      }
    },
    //获取印章列表
    async getYzList (con) {
      let bizName = this.getGroupMemberList.filter(item => item.enterpriseName === con.userInfo.enterpriseName)[0].enterpriseBizName
      let enterpriseName = this.getGroupMemberList.filter(item => item.enterpriseName === con.userInfo.enterpriseName)[0].enterpriseName
      let params = {
        operator: {
          //account:this.userInfo.userid,
          bizName: bizName,
          enterpriseName: enterpriseName
        }
      }
      let res = await approval.querySeals(params)
      if (res.code == 1 && res.data) {
       // con.querySealsList = res.data
				this.$set(con,'querySealsList',res.data)
      }
    },
    //获取当前发件方列表
    async getGroupMember () {
      let res = await approval.groupMember()
      if (res.code == 1 && res.data) {
        this.getGroupMemberList = res.data
				this.sendContractsSyncQo.currentSender =  res.data[res.data.length-1].enterpriseName
      }
    },
    //当前发件方选择，获取所属业务线和经办方
    getSender (val) {
      this.sendContractsSyncQo.sender.account = this.getGroupMemberList.filter(item => item.enterpriseName === val)[0].name
      this.sendContractsSyncQo.sender.bizName = this.getGroupMemberList.filter(item => item.enterpriseName === val)[0].enterpriseBizName
    },
    //添加合同签约方
    addContract (roles, role) {
			this.contractChange = true
			let maxOrder = Math.max.apply(Math, roles.map(function (o) { return o.signOrderly }))
      if (role.label == '宝龙签约企业') {
        roles.unshift({ userInfo: {userAccount:this.userInfo.email || this.userInfo.telephone}, realNameAuthentication: {}, userTypeName: '企业', userType: role.type, userTypeName: role.label, signOrderly: this.sendContractsSyncQo.isBySignOrder ? maxOrder + 1:2, receiverType: 'SIGNER'})
      } else if(role.label == '个人') {
				roles.push({ userInfo: {}, realNameAuthentication: {}, userTypeName: role.label, userType: role.type, signOrderly:this.sendContractsSyncQo.isBySignOrder ? '':1, receiverType: 'SIGNER'})
			}else{
        roles.push({ userInfo: {}, realNameAuthentication: {}, userTypeName: role.label, userType: role.type, signOrderly: this.sendContractsSyncQo.isBySignOrder ?'':1, receiverType: 'SIGNER'})
      }
    },
    //添加用章文件及合同签约方
    addcontractsList () {
			this.contractChange = true
      this.sendContractsSyncQo.contractsList.push(
        {
          templateId: '2851429124323409925',
          contractSendId: this.sendContractsSyncQo.contractsList.length,
          roles: [
            {
              userInfo: {
								userAccount:this.userInfo.email || this.userInfo.telephone
							},
              realNameAuthentication: {},
              userTypeName: '企业',
              userType: 'ENTERPRISE',
              userTypeName: '宝龙签约企业',
              signOrderly: '',
              receiverType: 'SIGNER',
              ridingSealY: "0.5",
            }
          ],
          documents: []
        }
      )
    },
    deleteContractDom (i) {
			this.contractChange = true
      this.sendContractsSyncQo.contractsList.splice(i, 1)
    },
    deleteContract (roles, index) {
			this.contractChange = true
      roles.splice(index, 1)
    },
    //文件上传前大小限制
    beforeAvatarUpload (file) {
      console.log(this.documentIndex)
      //const isJPG = file.type === 'pdf || doc || docx';
      const isLt2M = file.size / 1024 / 1024 < 50;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 50M!');
      }
      return isLt2M;
    },
    handleAvatarSuccess (res, file) {
      console.log(res)

      //this.sendContractsSyncQo.contractList[this.documentIndex].documents.push({})
    },
    //删除附件
    deleteImg (document, index) {
			this.contractChange = true
      document.splice(index, 1)
    },
    //文件上传
    async handleChange (file) {
      let fd = new FormData();
      fd.append('file', file.file);//传文件
			this.contractChange = true
      this.loading = true
      let res = await fileapi.uploadFile(fd)
      console.log(res)
      if (res.code === '1') {
        /* let data = JSON.parse(res.data.replace('/\\g', ''))
        this.upload(data.data.fileId.replace(',', '')) */
        this.upload(res.data.fileId.replace(',', ''))
      }


    },
    async upload (fileId) {
      /* const params = new URLSearchParams()
       params.append('fileIds', fileId) */
      //let res = await fileapi.loadFiles(params, fileId)
      let params = {
        fileIds: fileId
      }
      let res = await fileapi.loadFiles(params)
      console.log(res)
      if (res.code === '1') {
        res.data.fileShowVoList.map(item => {
          if (item.contentType === 'application/pdf') {
						this.showUrl = item.showUrl
            this.getBase64(item).then(() => {

              this.base64Img(item, 0, 'init')
            })
          } else {
            this.getBase64(item).then(() => {
              //this.base64Img(item,1,'init')
              this.word2pdf(item, 0).then(() => {

                this.base64Img(item, 0, 'init')
              })
            })
          }

        })
      }
    },
    //getBase64Image
    /* getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
      var dataURL = canvas.toDataURL("image/"+ext);
      return dataURL;
    }, */
    async getBase64 (item) {
      let params = [{
        originalFilename: item.originalFilename,
        url: item.showUrl
      }]
      let res = await approval.loadBase64Codes(params)
      this.base64code = res.data[0].Base64code
			if(item.content) {
				item.content =  res.data[0].Base64code
			}
    },
    //word转pdf
    async word2pdf (item, page) {
      let params = {
        base64Code: this.base64code,
        curPage: page,
        title: item.originalFilename.split('.')[0],
        suffix: item.originalFilename.split('.')[1],
      }
      let res = await approval.word2pdf(params)
      if (res.code === '1') {
        this.base64code = res.data.base64ResultSet.base64RsultDetails[0].base64Str
				if(item.content) {
					item.content = res.data.base64ResultSet.base64RsultDetails[0].base64Str
				}
      }
    },
    //base64转缩略图
    async base64Img (item, page, init) {
      let res = null
      if (init) {
        let params = {
          allQuery: 1,
          base64COde: {
            base64Code: this.base64code,
            curPage: page,
            title: item.originalFilename.split('.')[0],
            suffix: 'pdf'
          },
        }
        res = await approval.chapterFilesAbbs(params)
        if (res.code && res.code == 1 && res.data && res.data.attachmentList) {
          let { totalPage, allQueryId } = res.data && res.data.attachmentList;

          this.totalPage = totalPage;
          this.allQueryId = allQueryId;

          let fileUploadStatus = { allQueryId: allQueryId, totalPage: totalPage, number: 1 };
          this.fileUploadSuccess.push(fileUploadStatus);

          this.sendContractsSyncQo.contractsList[this.documentIndex].documents.push({ originalFilename: item.originalFilename, content: this.showUrl, fileName: item.originalFilename,name:item.originalFilename.split('.')[0]  })
          this.docLength = this.sendContractsSyncQo.contractsList[this.documentIndex].documents.length
          this.$nextTick(() => {
            this.$set(this.sendContractsSyncQo.contractsList[this.documentIndex].documents[this.docLength - 1], 'imgList', [])
            this.$set(this.sendContractsSyncQo.contractsList[this.documentIndex].documents[this.docLength - 1], 'appendingSignLabels', [])
          })
          this.$nextTick(() => {
          let curAbbImgBase64code = res.data.attachmentList.curAbbImgBase64Url;
          let attachmentDetailItemImgUrl = res.data.attachmentList.attachmentDetailList[0].hdUrl
          
            this.sendContractsSyncQo.contractsList[this.documentIndex].documents[this.docLength - 1].imgList.push({ curAbbImgBase64code: curAbbImgBase64code, imagePreviewUrl: curAbbImgBase64code, attachmentDetailItemImgUrl: attachmentDetailItemImgUrl })
					/* 	this.sendContractsSyncQo.contractsList[this.documentIndex].documents[this.docLength - 1].imgList.push({ curAbbImgBase64code: 'https://t7.baidu.com/it/u=2621658848,3952322712&fm=193&f=GIF', imagePreviewUrl: 'https://t7.baidu.com/it/u=2621658848,3952322712&fm=193&f=GIF', attachmentDetailItemImgUrl: 'https://t7.baidu.com/it/u=2621658848,3952322712&fm=193&f=GIF'}) */
          }) 
        }
				if(this.totalPage > 1) {
					this.commonComputed(item, page, init, res)
				}else {
					this.loading = false;
				}
      } /* else {
				let params = {
					allQueryId: this.allQueryId,
					pageNum: page
				}
				console.log(params, '111')
				res = await approval.abbsAndHdsPage(params)
				if (res.code && res.code == 1 && res.data && res.data.attachmentList) {

					this.fileUploadSuccess.map((item, index) => {
						if (item.allQueryId == params.allQueryId) {
							item.number = item.number + 1;
						}
					})
					console.log(this.fileUploadSuccess, '0000')
					this.commonComputed(item, page, init, res)
				}
      } */
    },
		async abbsAndHdsPageState(item,page,type) {
			let params = {
				allQueryId: this.allQueryId,
				pageNum: page
			}
			console.log(params, '111')
			let res = await approval.abbsAndHdsPageState(params)
			if(res.code && res.code == 1 && res.data && res.data.state == 2 && res.data.process == 100) {
				/* if(type == 'pdf') {
					for(let i=1;i<this.totalPage;i++){
            this.hcBaseImge(item,i)
					}
				}else {
						this.word2pdf(item, 0).then(() => {
							for(let i=1;i<this.totalPage;i++){
								this.hcBaseImge(item, i)
								}
						})
				} */
				for(let i=1;i<this.totalPage;i++){
				  this.hcBaseImge(item,i)
				}
			}else {
				this.abbsAndHdsPageState(item,page,type)
			}
		},
		hcBaseImge(item,page) {
			let params = {
				allQueryId: this.allQueryId,
				pageNum: page
			}
			approval.abbsAndHdsPage(params).then((res) => {
				if (res.code && res.code == 1 && res.data && res.data.attachmentList) {
				
					this.fileUploadSuccess.map((item, index) => {
						if (item.allQueryId == params.allQueryId) {
							item.number = item.number + 1;
						}
					})
					console.log(this.fileUploadSuccess, '0000')
					this.$nextTick(() => {
						let curAbbImgBase64code = res.data.attachmentList.curAbbImgBase64Url;
						let attachmentDetailItemImgUrl = res.data.attachmentList.attachmentDetailList[0].hdUrl
						let currentParams = {
							curAbbImgBase64code:curAbbImgBase64code,
							imagePreviewUrl:curAbbImgBase64code,
							attachmentDetailItemImgUrl:attachmentDetailItemImgUrl
						}
            this.$set(this.sendContractsSyncQo.contractsList[this.documentIndex].documents[this.docLength - 1].imgList,page,currentParams)
					})
					if(page == this.totalPage-1) {
						this.loading = false
					}
				}
				
			})
		},
    commonComputed (item) {
			let pdfNameList = item.originalFilename.split('.')
			if (pdfNameList[pdfNameList.length - 1] === 'pdf') {
				this.abbsAndHdsPageState(item, 1,'pdf')
			} else {
				for(let i=1;i<this.totalPage;i++) {
					this.abbsAndHdsPageState(item, 1)
				}
			}
    },
    saveContract () {
     this.$refs.sendContractsSyncQo.validate((valid) => {
        if (valid) {
          this.drawer = true
        } else {
          console.log('error submit!!');
          return false;
        }
     })
    },
		getContent(attachmentList) {
			this.loading = true
			attachmentList.map((item) => {
				item.showUrl = item.content
				if (item.name.split('.')[1] === 'pdf') {
					this.getBase64(item)
				} else {
				this.getBase64(item).then(() => {
				//this.base64Img(item,1,'init')
					this.word2pdf(item, 0)
				})
				}
			})
			
		},
		async save() {
			await this.getContent(this.attachmentList)
			setTimeout(() => {
				this.sendContractsSync()
			},3000)
		},
    async sendContractsSync () {
      let attachmentList =  []
			//console.log(this.detailJson.sendContractsSyncQoNew.attachmentList)
			//this.attachmentList = this.detailJson.sendContractsSyncQoNew.attachmentList
			this.attachmentList.map((item) => {
				let newAttachments = [];
				item.attachmentDetailList.map((attachmentItem, attachmentIndex) => {
					let attachmentObj = { ...attachmentItem, appendingSignLabels: attachmentItem.dragList, content: item.content }
					newAttachments.push(attachmentObj);
				});
				item.attachments = newAttachments
				attachmentList.push({ ...item, currentPage: 1, attachmentDetailList: newAttachments });
			})
      console.log(this.getGroupMemberList, this.sendContractsSyncQo.currentSender)
      let currentSender = this.getGroupMemberList.filter(item => item.enterpriseName == this.sendContractsSyncQo.currentSender)[0]
      /* this.attachmentList.reduce((obj, item) => {  
        let find = obj.find(i => i.contractIndex === item.contractIndex)  
        let _d = {  
        ...item 
        }
    	
        if(find){
          attachmentList.push({
            document:find,
            roles:find[0].roles,
            isBySignOrder:this.sendContractsSyncQo.isBySignOrder,
            currentSender:{
              enterpriseName:currentSender.enterpriseName,
              account:currentSender.account,
              bizName:currentSender.enterpriseBizName
            },
          })
        }else {
          attachmentList.push({
            document:[_d],
            isBySignOrder:this.sendContractsSyncQo.isBySignOrder,
            currentSender:{
              enterpriseName:currentSender.enterpriseName,
              account:currentSender.account,
              bizName:currentSender.enterpriseBizName
            },
            roles:_d.roles
          })
        }
        return attachmentList
      }) */
      //let maxLength = Math.max.apply(Math, this.attachmentList.map(function (o) { return o.contractIndex }))
		  let maxLength = attachmentList.length
			let attachmentListParams = []
      for (var i = 0; i < maxLength; i++) {
        attachmentListParams.push({
          templateId: '2851429124323409925',
          contractName: "合同统一名称",
          documents: [attachmentList[i]],
          roles: attachmentList[i].roles,
          signOrderly: true,
          sender: {
            enterpriseName: currentSender.enterpriseName,
            account: currentSender.account,
            bizName: currentSender.enterpriseBizName
          }
        })
      }
      attachmentListParams.map(item => {
				let qfzList = []
        item.documents.map(obj => {
          delete obj.roles
          delete obj.imgList
          delete obj.attachmentDetailList
          delete obj.name
          delete obj.curAbbImgBase64code
          delete obj.currentPage
          delete obj.totalPage
          delete obj.success
          delete obj.originalFilename
          delete obj.contractIndex
					delete obj.showUrl
					delete obj.name
          obj.attachments.map(k => {
            delete k.dragList
            delete k.attachmentDetailItemImgUrl
            if(k.appendingSignLabels && k.appendingSignLabels.length > 0){
							k.appendingSignLabels.map((j, i) => {
								delete j.currentQyfIndex
								delete j.currentQyfName
								delete j.h
								delete j.id
								delete j.parentH
								delete j.parentW
								delete j.w
								delete j.userType
								switch (j.type) {
									case 'qfz':
										qfzList.push(j.y)
										break
									case 'qm':
										j.type = 'SIGNATURE'
										break
									case 'gz':
										j.type = 'SEAL'
										break
									case 'rq':
										j.type = 'DATE'
										break
								}
								if (j.type != 'qfz') {
									obj.appendingSignLabels.push(j)
									//k.appendingSignLabels.splice(i,1)
								}
							})
							k.appendingSignLabels = k.appendingSignLabels.filter(item => item.ridingSealY == undefined)
						}
          })
          delete  obj.attachments
				})
        item.roles.map((obj,roleIndex) => {
					if(obj.userType != "PERSON") {
						delete obj.realNameAuthentication
					}
					delete obj.querySealsList
					if(obj.qfzChecked) {
						//obj.roleId = ''
						obj.ridingSealY = [...new Set(qfzList)][roleIndex] || 0.5
					}else {
						delete obj.ridingSealY
					}
          delete obj.userTypeName
          delete obj.singOrderly
          delete obj.sealName
          delete obj.qyfName
          delete obj.stampChecked
          delete obj.qfzChecked
          delete obj.signOrderly
        })
      })
      let params = {
        contractsList: attachmentListParams
      }
      console.log(params)
      let res = await approval.sendContractsSync(params)
			this.loading = false
      if (res.data.code === '1' || res.data.code === '0') {
        console.log(res.data)
				window.close()
        //this.$set(this.sendContractsSyncQo, 'contractsSyncVo', res.data.data.contractsSyncVo)
				
       // this.$emit('getContract', this.sendContractsSyncQo)
      } else {
				let msg = []
				res.data.data.contractsSyncVo.map((item,i)=>{
					msg.push('合同'+ (i+1) + ':'+ item.message)
				})
        this.$message.error(msg.join(','));
      }
    }
  }
}
</script>

<style scoped lang="scss" >
@import "~@/assets/styles/common.scss";
@import "../publicSheet/publicSheet.scss";
.add-item {
  line-height: 36px;
  color: #468ceb;
  padding: 0 47px 0 20px;
  cursor: pointer;
}
::v-deep .is-required.is-error {
  border: solid 1px #f56c6c;
  box-sizing: border-box;
  .el-form-item__content {
    line-height: 36px;
  }
  .el-form-item__error {
    display: none;
  }
}
::v-deep .el-form-item__content {
  line-height: 36px;
}
::v-deep .file-list .d-red {
  display: unset !important;
}
::v-deep .contract-title .d-min {
  height: 100%;
  .explain-p-one-title {
    height: 100%;
    display: flex;
    align-items: center;
    span {
      display: block;
      line-height: 20px;
    }
    .add-icon {
      color: #468ceb;
      font-size: 14px;
    }
  }
}
.signature {
  .el-form-item {
    .el-form-item__content {
      line-height: 36px;
    }
  }
  table {
    word-wrap: break-word;
    table-layout: unset;
    td {
      .el-select,
      .el-input {
        box-sizing: border-box;
      }
    }
  }
  .title {
    width: 168px;
  }
  .file-list {
    display: flex;
    flex-wrap: wrap;
    .el-icon-remove-outline {
      color: #fff;
      background: #ff3d3b;
      border-radius: 50%;
    }
    .delete-contract {
      color: #ff3d3b;
      font-size: 14px;
      padding-left: 20px;
    }
    .delete-operate {
      line-height: 36px;
      box-sizing: border-box;
      padding-left: 13px;
    }
    .el-input:not(:last-child),
    .el-select:not(:last-child),
    .delete-operate:not(:last-child) {
      border-bottom: 1px solid #dddddd;
    }
    .title {
      border-top: 1px solid #dddddd;
      line-height: 117px !important;
    }
    .img-attchment {
      height: 108px;
      .attchment {
        width: 67px;
        height: 88px;
        margin: 10px 0 10px 12px;
        background-color: #000000;
        position: relative;
        .delete-file {
          color: #fff;
          background-color: #ff3d3b;
          position: absolute;
          right: -7px;
          top: -7px;
          display: block;
          width: 14px;
          height: 14px;
          line-height: 14px;
          text-align: center;
          border-radius: 50%;
        }
      }
    }
    .upload-file {
      height: 154px;
      padding-top: 33px;
      .upload-box {
        margin: 10px 0 10px 12px;
        width: 67px;
        height: 87px;
        border: 1px solid #dcdfe2;
        text-align: center;
        padding-top: 20px;
        .el-icon-circle-plus-outline {
          color: #757f98;
          font-size: 20px;
          margin-bottom: 13px;
        }
        p {
          color: #757f98;
          font-size: 10px;
          line-height: 12px;
        }
      }
    }
  }
}
</style>
