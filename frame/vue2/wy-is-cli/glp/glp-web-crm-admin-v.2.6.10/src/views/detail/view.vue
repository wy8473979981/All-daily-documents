<template>
  <div class="content" v-loading="isLoading">
    <div class="section">
      <el-form class="form-section" :model="ruleForm" ref="ruleForm" inline size="small">

        <Card :title="'仓库信息'">

          <el-row class="row-item" :gutter="20">
            <el-col :span="8">
              <label class="required-ele">仓库名称</label>：
              <span v-text="ruleForm.name || defaultValue"></span>
            </el-col>
            <el-col :span="8">
              <label class="required-ele">仓库产权人</label>：
              <span v-text="ruleForm.owner || defaultValue"></span>
            </el-col>
            <el-col :span="8">
              <label class="required-ele">产权人类型</label>：
              <span v-text="SelectionOptions.OwnerType[ruleForm.ownerType] || defaultValue"></span>
            </el-col>

          </el-row>
          <el-row class="row-item" :gutter="20">
            <el-col :span="8" v-if="ruleForm.ownerType==20">
              <label>产权人身份证</label>：
              <span v-text="ruleForm.ownerCert || defaultValue"></span>
            </el-col>
            <el-col :span="8" v-if="ruleForm.ownerType==10">
              <label>产权人统一社会信用代码</label>：
              <span v-text="ruleForm.ownerOrgNo || defaultValue"></span>
            </el-col>
            <el-col :span="8">
              <label class="required-ele">仓库编号</label>：
              <span v-text="ruleForm.code || defaultValue"></span>
            </el-col>
            <el-col :span="8">
              <label class="required-ele">仓库类型</label>：
              <span v-text="SelectionOptions.WarehouseType[ruleForm.type] || defaultValue"></span>
            </el-col>
          </el-row>
          <el-row class="row-item" :gutter="20">

            <el-col :span="8" v-if="ruleForm.type==10">
              <label class="required-ele">仓库类型说明</label>：
              <span v-text="ruleForm.typeDesc"></span>
            </el-col>
            <el-col :span="8">
              <label class="required-ele">温控类型</label>：
              <template v-if="ruleForm.tempType && ruleForm.tempType.length>0">
                <span v-for="(item,index) in ruleForm.tempType" :key="index" v-text="((index==0?'':'、')+SelectionOptions.TemperatureControlType[item]) || ''"></span>
              </template>
              <span v-else v-text="defaultValue"></span>
            </el-col>
            <el-col :span="8">
              <label class="required-ele">是否保税</label>：
              <span v-text="SelectionOptions.BooleanType[ruleForm.bondedFlag] || defaultValue"></span>
            </el-col>
          </el-row>

          <el-row class="row-item" :gutter="20">

            <el-col :span="8">
              <label class="required-ele">历史存货品类</label>：
              <span v-text="ruleForm.historicalInventoryCategory || defaultValue"></span>
            </el-col>
            <el-col :span="8">
              <label class="required-ele">仓库地址</label>：
              <!-- <span v-text="ruleForm.provinceName || defaultValue"></span> -->
              <span>{{(ruleForm.provinceName || defaultValue)+' '+(ruleForm.cityName || defaultValue)+' '+(ruleForm.districtName || defaultValue)+' '+(ruleForm.address || defaultValue)}}</span>
            </el-col>

          </el-row>

          <!-- <el-row class="row-item" :gutter="20">
		                <el-col :span="8">
		                	<label class="required-ele">城市</label>：
			            	<span v-text="ruleForm.cityName || defaultValue"></span>
		                </el-col>
		                <el-col :span="8">
		                	<label class="required-ele">区县</label>：
			            	<span v-text="ruleForm.districtName || defaultValue"></span>
		                </el-col>
		                <el-col :span="8">
		                	<label class="required-ele">详细地址</label>：
			            	<span v-text="ruleForm.address || defaultValue"></span>
		                </el-col>
		            </el-row> -->

        </Card>
        <Card :title="'仓库联系人信息'">
          <el-row class="row-item" :gutter="20">
            <el-col :span="8">
              <label>联系人姓名</label>：
              <span v-text="ruleForm.contacts || defaultValue"></span>
            </el-col>
            <el-col :span="8">
              <label>联系人职位</label>：
              <span v-text="ruleForm.position || defaultValue"></span>
            </el-col>
            <el-col :span="8">
              <label>联系人电话</label>：
              <span v-text="ruleForm.telephone || defaultValue"></span>
            </el-col>
          </el-row>
          <el-row class="row-item" :gutter="20">
            <el-col :span="8">
              <label>联系人邮箱</label>：
              <span v-text="ruleForm.mail || defaultValue"></span>
            </el-col>
          </el-row>
        </Card>

        <Card :title="'仓库资料'" :tips-txt="'上传信息将影响你的评分结果'">

          <el-row class="row-item" :gutter="20">
            <el-col :span="8">
              <el-form-item required label="仓库房产证" class="block-form-item">
                <template v-if="ruleForm.houseCerts && ruleForm.houseCerts.length>0">
                  <el-button size="small" type="primary" @click="downloadFunc('houseCerts')">下载</el-button>
                  <el-button size="small" @click="showFiles('houseCerts')">预览</el-button>
                </template>
                <template v-else>
                  <span>未上传</span>
                </template>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="仓库环评报告" class="block-form-item">
                <template v-if="ruleForm.eiaReports && ruleForm.eiaReports.length>0">
                  <el-button size="small" type="primary" @click="downloadFunc('eiaReports')">下载</el-button>
                  <el-button size="small" @click="showFiles('eiaReports')">预览</el-button>
                </template>
                <template v-else>
                  <span>未上传</span>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="仓库消防验收报告" class="block-form-item">
                <template v-if="ruleForm.fireAcceptReports && ruleForm.fireAcceptReports.length>0">
                  <el-button size="small" type="primary" @click="downloadFunc('fireAcceptReports')">下载</el-button>
                  <el-button size="small" @click="showFiles('fireAcceptReports')">预览</el-button>
                </template>
                <template v-else>
                  <span>未上传</span>
                </template>
              </el-form-item>
            </el-col>
          </el-row>
        </Card>
        <Btns :btnsProps="returnBackBtns" />
      </el-form>
    </div>
    <!-- 展示框 -->
    <UploadListTpl :dialog-visible="dialogVisible" :list-data="showFileData" :is-view="true" :to-delete="toDelete" :on-close-list="onClose"></UploadListTpl>
  </div>
</template>
<script type="text/javascript">
import UploadListTpl from '@/components/Upload/UploadListTpl'
import businessFn from '@/js/common/businessLayer'
import methodsFn from '@/js/common/methods'
import { SelectionOptions } from '@/js/common/consts'
import DataApi from '@/api/business'
export default {
  data() {
    return {
      isLoading: false,						//是否正在加载数据
      defaultValue: '--',						//默认值
      SelectionOptions,
      ruleForm: {
        name: '',
        owner: '',
        ownerType: '',
        ownerCert: '',
        ownerOrgNo: '',
        code: '',
        type: '',
        typeDesc: '',
        tempType: [],
        bondedFlag: '',
        historicalInventoryCategory: '',
        provinceCode: '',
        cityCode: '',
        districtCode: '',
        address: '',

        contacts: '',
        position: '',
        telephone: '',
        mail: '',


        houseCerts: [

        ],
        eiaReports: [],
        fireAcceptReports: []

      },				//表单字段

      returnBackBtns: {
        cancel: {
          text: '返回',
          func: this.cancelFunc
        }
      },


      // provinceNames:[
      // 	{id:1,code:'01',name:'北京'}
      // ],			//省份
      // Citys:[
      // 	{id:1,code:'011',name:'北京市'}
      // ],				//城市
      // Districts:[
      // 	{id:1,code:'011-01',name:'海淀区'}
      // ],			//区县


      ListPath: '/baseManagement/warehouseList',						//列表路由地址


      dialogVisible: false,								//是否显示文件管理列表
      showFileData: [],									//当前查看的文件数据

      isDownload: false,									//是否正在下载文件

      query: {}
    }
  },
  components: {
    UploadListTpl
  },
  created() {
    this.query = this.$route.query;

    this.getDetailData();
  },
  mounted() {


  },
  methods: {
    getDetailData() {									//请求详情
      let params = {
        id: this.query.id
      };
      DataApi.getDetailWarehouse(params).then(
        res => {
          if (res.code == 200) {
            let ndata = res.data || {};
            this.ruleForm = ndata;
            businessFn.setShowFile(this.ruleForm.houseCerts)
            businessFn.setShowFile(this.ruleForm.eiaReports)
            businessFn.setShowFile(this.ruleForm.fireAcceptReports)
          } else {
            this.$message({
              type: 'warning',
              message: res.message ? res.message : '系统异常请联系管理员！'
            })
          }
          this.isLoading = false;
        },
        err => {
          this.isLoading = false;
        }
      )
    },
    downloadFunc(str) {										//下载文件
      if (this.isDownload == true) { return }
      if (this.ruleForm[str]) {
        let filseArray = [];
        this.ruleForm[str].forEach(item => {
          if (item.data.url) {
            filseArray.push({
              url: item.data.url,
              name: item.name
            })
          };
        })
        this.isDownload = true;
        if (filseArray.length == 1) {
          methodsFn.downloadFileFn(filseArray[0], this.downloadCallback);
        } else {
          methodsFn.downloadZipFn(filseArray, SelectionOptions.FilestypeCode[str].name, this.downloadCallback);
        }
      }
    },
    downloadCallback(res) {							//下载文件回调
      if (res) {
        console.log('下载返回：', res)
      } else {

      }
      this.isDownload = false;
    },

    showFiles(str) {								//查看文件列表
      this.dialogVisible = true;
      if (this.ruleForm[str]) {
        this.showFileData = this.ruleForm[str];
      }
    },

    toDelete(item) {							//删除文件

      let index = this.showFileData.findIndex(nitem => {
        return nitem.uid === item.uid;
      })
      if (index != -1) {
        this.showFileData.splice(index, 1);
      }
    },

    onClose() {
      this.dialogVisible = false;
    },

    cancelFunc() {

    }

  }
}
</script>

<style lang="scss" scoped>
.form-section {
  label {
    font-weight: normal;
    color: #333;
  }
}
.row-item {
  margin-bottom: 20px;

  .el-col {
    display: flex;
    justify-content: left;
  }
  label {
    color: #3a3131;
    font-weight: normal;
    margin: 0 5px 15px 0;
    display: inline-block;
  }
  span {
    color: #888;
    word-break: break-all;
    line-height: 1.5em;
  }
  .value-span {
    margin-right: 8px;
  }
}
.row-item:last-child {
  margin-bottom: 0px;
}
</style>