<template>
  <div class="signature public-box">
    <el-row class="red-box-fix file-list">
      <dl-col :span="24" place="title top right">
        <h2>签约方式</h2>
      </dl-col>
      <dl-col :span="4" place="height-auto" style="width: 168px;">
        <p class="explain-p-one-title">签约方式</p>
      </dl-col>
      <dl-col :span="4" place="height-auto" :style="{width: '168px',borderWidth: signatureType !=1 ? '0 1px 1px 1px':''}">
        <el-select class="required" v-model="signatureType" placeholder="请选择" :disabled="uneditable">
          <el-option label="电子签约" :value="1"></el-option>
          <el-option label="纸质签约" :value="2"></el-option>
        </el-select>
      </dl-col>
      <dl-col :span="4" place="height-auto" style="width: 168px;" v-if="signatureType == 1">
        <p class="explain-p-one-title">签约方式按顺序签署</p>
      </dl-col>
      <dl-col :span="4" place="height-auto" style="flex:auto" v-if="signatureType == 1">
        <el-select class="required" v-model="sendContractsSyncQo.signOrderly" :disabled="uneditable" placeholder="请选择">
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </dl-col>
      <dl-col :span="4" place="height-auto" style="width: 168px;" v-if="signatureType == 1">
        <p class="explain-p-one-title">当前发件方</p>
      </dl-col>
      <dl-col :span="4" place="height-auto" style="flex:auto;border-width: 0 1px 1px 1px;" v-if="signatureType == 1">
        <el-select class="required" :disabled="uneditable" v-model="sendContractsSyncQo.sender.enterpriseName" placeholder="请选择" filterable @change="getSender">
          <el-option v-for="(item,index) in getGroupMemberList" :label="item.enterpriseName" :value="item.enterpriseName" :key="index"></el-option>
        </el-select>
      </dl-col>
    </el-row>
    <template v-if="signatureType == 1">
      <div v-for="(item,i) in sendContractsSyncQo.contracstList" :key="i">
        <el-row class="red-box-fix file-list">
          <dl-col :span="24" place="title top right" style="border-top: none !important;">
            <h2>用章文件及合同签约方</h2>
            <span class="delete-contract" v-if="!uneditable">删除</span>
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
              <el-input class="required" placeholder="请选择" v-model="obj.originalFilename" :disabled="uneditable" />
              <div class="img-attchment">
                <div class="attchment" v-if="obj.imgList && obj.imgList.length>0" @click="getSwiper(obj.imgList)">
                  <img :src="'data:image/png;base64,'+obj.imgList[0]" style="width: 100%;" />
                  <i class="delete-file el-icon-remove-outline" @click="deleteImg(item.documents,j)"></i>
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
                <el-dropdown>
                  <span class="el-dropdown-link add-icon">
                    添加合同签约方<i class="el-icon-arrow-down el-icon--right" color="#468ceb"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(role, roleIndex) in roles" :key="roleIndex" @click.native="addContract(item.roles,role)" style="padding: 0 20px;">{{role.label}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <!-- <span class="el-dropdown-link add-icon" @click="" v-if="!uneditable">添加合同签约方<i class="el-icon-circle-plus" style="margin-left: 18px;"></i></span> -->
              </p>
            </div>
          </dl-col>
          <dl-col :span="20" place="height-auto" style="flex: auto;    border-width: 0 0 0px 0px;">
            <el-row class="red-box-fix file-list">
              <dl-col :span="2" place="height-auto">
                <p class="explain-p-one-title">签约顺序</p>
              </dl-col>
              <dl-col :span="3" place="height-auto">
                <p class="explain-p-one-title">
                  主体类型
                  <el-tooltip class="item" effect="dark" content="如果签约方为宝龙企业，务必选择宝龙签约企业" placement="top-start">
                    <i class="el-icon-question" style="color: #F5A623;"></i>
                  </el-tooltip>
                </p>
              </dl-col>
              <dl-col :span="8" place="height-auto">
                <p class="explain-p-one-title">
                  签约主体名称
                </p>
              </dl-col>
              <dl-col :span="3" place="height-auto">
                <p class="explain-p-one-title">
                  印章类型
                </p>
              </dl-col>
              <dl-col :span="3" place="height-auto">
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
                <el-input class="required" :disabled="uneditable || con.userType != 'PERSON'" :placeholder="con.userType != 'PERSON'? '':'请输入'" v-model="con.signOrderly" />
              </dl-col>
              <dl-col :span="3" place="height-auto">
                <el-input class="required" :disabled="true" placeholder="请输入" v-model="con.userTypeName" />
                <!-- <el-select class="required" placeholder="企业" :disabled="uneditable" v-model="con.userType">
                  <el-option label="企业" value="ENTERPRISE"></el-option>
                  <el-option label="个人" value="PERSON"></el-option>
                </el-select> -->
              </dl-col>
              <dl-col :span="8" place="height-auto">
                <div v-if="con.userType === 'PERSON'" style="display: flex;width: 100%;">
                  <el-input class="required" placeholder="请输入姓名" style="flex: 0 0 117px;border-right: solid 1px #ddd;border-bottom: none;" :disabled="uneditable" v-model="con.userInfo.userName" />
                  <el-input class="required" placeholder="请输入身份证号，用于签约身份核对" style="flex:auto;" :disabled="uneditable" v-model="con.realNameAuthentication.idNumber" />
                </div>
                <el-select v-else class="required" filterable placeholder="请输入企业名称" :disabled="uneditable" v-model="con.userInfo.enterpriseName" @change="querySeals(con)">
                  <el-option v-for="member in getGroupMemberList" :label="member.enterpriseName" :value="member.enterpriseName"></el-option>
                </el-select>
              </dl-col>
              <dl-col :span="3" place="height-auto">
                <el-select class="required" placeholder="请选择" v-if="con.userType !== 'PERSON'" :disabled="uneditable" v-model="con.sealName">
                  <el-option v-for="item in querySealsList" :label="item.sealName" :value="item.sealName" :key="item.sealName"></el-option>
                </el-select>
              </dl-col>
              <dl-col :span="3" place="height-auto">
                <el-input class="required" :disabled="uneditable" v-model="con.userInfo.userAccount" placeholder="请输入手机号或邮箱" />
              </dl-col>
              <dl-col :span="3" place="height-auto">
                <el-select class="required" placeholder="请选择" :disabled="uneditable" v-model="con.roleName">
                  <el-option label="甲方" value="甲方"></el-option>
                  <el-option label="乙方" value="乙方"></el-option>
                  <el-option label="丙方" value="丙方"></el-option>
                </el-select>
              </dl-col>
              <dl-col :span="2" place="height-auto" style="border-width: 0 1px 1px 1px;">
                <p class="delete-operate" v-if="!uneditable"><i class="el-icon-remove-outline" @click="deleteContract(item.roles,k)"></i></p>
              </dl-col>
            </el-row>
          </dl-col>
        </el-row>
      </div>
    </template>
    <el-row class="red-box-fix file-list" v-if="!uneditable && signatureType == 1">
      <dl-col :span="24" place="title top right" style="border-top: none !important;">
        <h2 style="color:#468CEB;" @click="addcontracstList">添加用章文件及合同签约方<i class="el-icon-circle-plus" style="margin-left: 18px;"></i></h2>
      </dl-col>
    </el-row>
    <el-row class="red-box-fix file-list" v-if="signatureType == 1">
      <dl-col :span="24" place="title top right" style="border-top: none !important;">
        <h2>指定签署位置</h2>
      </dl-col>
      <dl-col :span="4" place="height-auto" style="width: 168px;">
        <p class="explain-p-one-title">指定签署位置</p>
      </dl-col>
      <dl-col :span="20" place="height-auto" style="flex: auto;border-width: 0 1px 1px 1px;">
        <p style="color: #468CEB;line-height: 36px;padding-left: 20px;">
          <span @click="drawer = true"><i class="el-icon-location-information"></i>
            指定签署位置</span>
        </p>
      </dl-col>
    </el-row>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" :size="'100%'">
      <DragContract :params="attachmentList" @close="dragContractClose" @save="dragContractClose" />
    </el-drawer>
    <swiperList :list="list" :dialogVisible.sync="dialogVisible"></swiperList>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import swiperList from './swiper.vue'
import approval from '@/apis/apis/approval';
import { mapState } from 'vuex';
let loadingService
export default {
  name: 'electronicSignature',
  components: { swiperList },
  data () {
    return {
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
          type: 'BAOLONG_ENTERPRISE',
          label: '宝龙签约企业'
        },
      ],
      dialogVisible: false,
      list: null,
      drawer: false,
      sendContractsSyncQo: {
        sender: {},
        contracstList: [
          {
            templateId: '2851429124323409925',
            contractSendId: 0,
            roles: [],
            documents: []
          }
        ]
      },
      signatureType: '',
      getGroupMemberList: [],
      querySealsList: [],
      documentIndex: null,
      uneditable: true,
      docLength: 0,
      loading: false,
      attachmentList: []
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
    data: function (newValue) {
      if (newValue.pmApprove) {
        if (newValue.pmApprove.status === '草稿' || newValue.pmApprove.status === '驳回') {
          this.uneditable = false
        }
      } else {
        this.uneditable = false
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
    this.createAttachmentData()
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    dragContractClose () {
      this.drawer = false;
    },
    dragContractClose (data) {
      this.drawer = false;
      console.log('save', data)
    },
    createAttachmentData () {
      let attachmentList = JSON.parse(localStorage.getItem('params'));
      attachmentList.map((item, index) => {
        let { documents, roles } = item;
        let newRoles = [];
        roles.map((roleItem, roleIndex) => {
          newRoles.push({ ...roleItem, stampChecked: false, qfzChecked: false })
        })
        documents.map((docItem, docIndex) => {
          let attachmentItemDetail = [];
          docItem.imgList.map((imgItem, imgIndex) => {
            // order:表示附件详情的页数，从1开始计算,在操作数据时需要 -1 ，
            let obj = { order: imgIndex + 1, attachmentDetailItemImgUrl: imgItem, dragList: [] };
            attachmentItemDetail.push(obj)
          })
          let attachmentItem = {
            roles: JSON.parse(JSON.stringify(newRoles)),
            name: docItem.title,
            attachmentDetailList: attachmentItemDetail,
            currentPage: docItem.curPage,
            totalPage: docItem.totalPage,
            success: false,
            ...docItem
          }
          this.attachmentList.push(attachmentItem)
        })
      })
    },
    //获取大图
    getSwiper (list) {
      this.list = list
      this.dialogVisible = true
    },
    //获取印章列表
    async querySeals (con) {
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
        this.querySealsList = res.data
      }
    },
    //获取当前发件方列表
    async getGroupMember () {
      let res = await approval.groupMember()
      if (res.code == 1 && res.data) {
        this.getGroupMemberList = res.data
      }
    },
    //当前发件方选择，获取所属业务线和经办方
    getSender (val) {
      this.sendContractsSyncQo.sender.account = this.getGroupMemberList.filter(item => item.enterpriseName === val)[0].name
      this.sendContractsSyncQo.sender.bizName = this.getGroupMemberList.filter(item => item.enterpriseName === val)[0].enterpriseBizName
    },
    //添加合同签约方
    addContract (roles, role) {
      if (role.label == '宝龙签约企业') {
        roles.unshift({ userInfo: {}, realNameAuthentication: {}, userTypeName: '企业', userType: role.type })
      } else {
        roles.push({ userInfo: {}, realNameAuthentication: {}, userTypeName: role.label, userType: role.type })
      }
    },
    //添加用章文件及合同签约方
    addcontracstList () {
      this.sendContractsSyncQo.contracstList.push(
        {
          templateId: '2851429124323409925',
          contractSendId: this.sendContractsSyncQo.contracstList.length,
          roles: [],
          documents: []
        }
      )
    },
    deleteContract (roles, index) {
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
      document.splice(index, 1)
    },
    //文件上传
    async handleChange (file) {
      let fd = new FormData();
      fd.append('file', file.file);//传文件
      this.loading = true
      let res = await approval.uploadFil(fd)
      console.log(res)
      if (res.code === '1') {
        let data = JSON.parse(res.data.replace('/\\g', ''))
        this.upload(data.data.fileId.replace(',', ''))
      }


    },
    async upload (fileId) {
      const params = new URLSearchParams()
      params.append('fileIds', fileId)
      let res = await approval.loadFiles(params, fileId)
      console.log(res)
      if (res.code === '1') {
        res.data.fileShowVoList.map(item => {
          if (item.originalFilename.split('.')[1] === 'pdf') {
            this.getBase64(item).then(() => {
              this.base64Img(item, 1, 'init')
            })
          } else {
            this.getBase64(item).then(() => {
              //this.base64Img(item,1,'init')
              this.word2pdf(item, 1).then(() => {
                this.base64Img(item, 1, 'init')
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
      this.base64code = res.data.data[0].base64code
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
      }
    },
    //base64转缩略图
    async base64Img (item, page, init) {
      let params = {
        details: [
          {
            base64Code: this.base64code,
            curPage: page,
            title: item.originalFilename.split('.')[0],
            suffix: item.originalFilename.split('.')[1],
          },
        ]
      }
      let res = await approval.chapterFilesAbbs(params)
      this.totalPage = res.data.details[0].totalPage
      if (init) {
        console.log(this.sendContractsSyncQo.contracstList, 'this.sendContractsSyncQo.contractsList')
        this.sendContractsSyncQo.contracstList[this.documentIndex].documents.push({ ...res.data.details[0], originalFilename: item.originalFilename })
        this.docLength = this.sendContractsSyncQo.contracstList[this.documentIndex].documents.length
        this.$nextTick(() => {
          this.$set(this.sendContractsSyncQo.contracstList[this.documentIndex].documents[this.docLength - 1], 'imgList', [])
          this.$set(this.sendContractsSyncQo.contracstList[this.documentIndex].documents[this.docLength - 1], 'appendingSignLabels', [
            {
              "x": 0.4,
              "y": 0.4,
              "roleName": "ENTERPRISE",
              "type": "SEAL",
              "pageNumber": 1
            }
          ])
        })
      }
      if (page < this.totalPage) {
        if (item.originalFilename.split('.')[1] === 'pdf') {
          this.base64Img(item, page + 1)
        } else {
          this.word2pdf(item, page + 1).then(() => {
            this.base64Img(item, page + 1)
          })
        }
      } else {
        this.loading = false
      }
      console.log(this.sendContractsSyncQo.contracstList, 'this.sendContractsSyncQo.contractList')
      this.$nextTick(() => {
        this.sendContractsSyncQo.contracstList[this.documentIndex].documents[this.docLength - 1].imgList.push(res.data.details[0].curAbbImgBase64code)
      })
    },
    async sendContractsSync () {
      let res = await approval.sendContractsSync(this.sendContractsSyncQo)
      if (res.code === '1') {
        console.log(res.data)
      } else {
        this.$message.error(res.message);
      }
    }
  }
}
</script>

<style scoped lang="scss" scoped>
@import "~@/assets/styles/common.scss";
@import "../publicSheet/publicSheet.scss";
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
