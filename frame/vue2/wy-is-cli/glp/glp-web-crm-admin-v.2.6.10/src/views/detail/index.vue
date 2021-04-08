<template>
	<div class="content">
		<el-card class="section">
      <!-- <el-steps :active="2" align-center>
        <el-step title="客户经理提交" icon="el-icon-success" v-html="" description="2019-08-15"></el-step>
        <el-step title="资管审批：审批中" icon="el-icon-more" description="2019-08-15"></el-step>
        <el-step title="运营审核：已拒绝" icon="el-icon-error" description="2019-08-15"></el-step>
        <el-step title="人工审核：已驳回" icon="el-icon-warning" description="2019-08-15"></el-step>
      </el-steps> -->
    <el-steps :active="nowActive"  align-center finish-status="success">
        <el-step v-for="(item,index) in stepData"
            :key="index"
            :icon="item.icon"
            >
            <template slot="title">
                <div>
                  <div class="step-description"><span class="step-title">{{item.title}}</span></div>
                </div>
            </template>
            <template slot="description">
                <div>
                    <div class="step-description">操作人：<span class="step-fgreen">{{item.operator}}</span></div>
                    <div class="step-description">提交时间：<span>{{item.time}}</span></div>
                </div>
            </template>
        </el-step>
    </el-steps>
    </el-card>
    <card title="审批详情">
      <el-form
        size="small"
        label-width="120px"
        class="demo-detail">
        <el-row>
          <el-col :span="6">
            <el-form-item label="贷款单号">
              <el-link type="primary" :underline="false">DK201908160022</el-link>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="借款方">
              <el-link type="primary" :underline="false">境内轮胎007</el-link>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供应商">
              <el-link type="primary" :underline="false">宝丰</el-link>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品名称">
              <el-link type="primary" :underline="false">跨境浮动质押-测试</el-link>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="融资申请单号">
              <el-link type="primary" :underline="false">FDZY201908160011</el-link>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="仓库">香港仓</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="额度编号">ED000669</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="提交时间">2019-08-16 10:38:16</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </card>
    
    <card title="贷款列表信息">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        stripe
        fit
        highlight-current-row
        :header-row-class-name="headerclass"
        style="width: 100%;"
      >
        <el-table-column prop="versionNo" fixed label="贷款单号" align="center"></el-table-column>
        <el-table-column prop="businessNo" fixed label="赎货申请单号" align="center"></el-table-column>
        <el-table-column prop="versionNo" fixed label="赎货申请版本号" align="center"></el-table-column>
        <el-table-column prop="versionNo" fixed label="仓库" align="center"></el-table-column>

        <el-table-column prop="pickGoodsType" label="提货方式" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.pickGoodsType == 1?'暂不提货':'立即提货'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="isRiskVehicle" label="是否控车" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.isRiskVehicle == 1?'否':'是'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="submitStatus" label="单据状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.submitStatus == 1?'已提交':'未提交'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderStatus" label="流程状态" align="center">
          <!-- TODO: 流程状态未提供枚举 -->
          <template slot-scope="scope">
            <!-- 0 待审批  1 待还款 2 审批拒绝 3 还款拒绝 4已出库 5信用人工审批拒绝 -->
            <StatusText :txt="scope.row.orderStatus === 0?'待审批':scope.row.orderStatus == 1?'待还款':scope.row.orderStatus == 2?'审批拒绝':scope.row.orderStatus == 3?'还款拒绝':scope.row.orderStatus == 4?'已出库':scope.row.orderStatus == 5?'信用人工审批拒绝':'-'" :status-name="scope.row.orderStatus === 0?'default':scope.row.orderStatus === 1?'default':scope.row.orderStatus === 2?'refuse':scope.row.orderStatus === 3?'refuse':scope.row.orderStatus === 4?'pass':scope.row.orderStatus === 5?'refuse':'default'"></StatusText>

          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template>
            <span class="icon iconfont icon-button delete-button" @click="deleteFn">&#xe61e;</span>
          </template>
        </el-table-column>
      </el-table>
    </card>
    <card title="审批附件上传">
      <div class="sp-upload">
        <upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>
    </card>
    <Btns  :btnsProps="btnsProps"/>
	</div>
</template>
<script>

import StatusText from "@/components/StatusText";
import Upload from "@/components/Upload/index";
import Card from "@/components/Card";
import Btns from "@/components/Btns";
	export default {
    components:{
        StatusText,Upload,Card,Btns
    },
    data() {
      return {
        nowActive:2,
        stepData:[
          {title:'客户经理提交',icon:'el-icon-circle-check',operator:'张三',time:'2019-10-12'},
          {title:'资管审批：审核中',icon:'el-icon-more',operator:'李四',time:'2019-10-12'},
          {title:'运营审核：已拒绝',icon:'el-icon-error',operator:'王五',time:'2019-10-12'},
          {title:'人工审核：已驳回',icon:'el-icon-warning',operator:'赵六',time:'2019-10-12'},
        ],
        btnsProps:{
          submit:{
            text:'提交',
            func:()=>{

            }
          },reject:{
             text:'拒绝',
            func:()=>{

            }
          },rebut:{
             text:'驳回',
            func:()=>{

            }
          }
        },
        listLoading:false,
        tableKey: 0,
        list: [],
        total: 0,
        ruleForm: {
          supplier: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "360",
          desc: "",
          amount:""
        },
        rules: {
          supplier: [
            { required: true, message: "请输入供应商", trigger: "blur" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          ],
          region: [
            { required: true, message: "请选择资金方", trigger: "change" }
          ],
          amount: [
            { required: true, message: "请输入金额", trigger: "blur" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          ],
          date1: [
            {
              type: "date",
              required: true,
              message: "请选择额度有效期",
              trigger: "change"
            }
          ],
          date2: [
            {
              type: "date",
              required: true,
              message: "请选择时间",
              trigger: "change"
            }
          ],
          type: [
            {
              type: "array",
              required: true,
              message: "请至少选择一种税费融资方式",
              trigger: "change"
            }
          ],
          resource: [
            { required: true, message: "请选择活动资源", trigger: "change" }
          ],
          desc: [{ required: true, message: "请输入备注", trigger: "blur" }]
        },
        /**上传图片部分 */
        dialogImageUrl: "",
        dialogVisible: false,
        zIndex:999,
        fileList: [
          {
            name: "food.pdf",
            url:
              "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
          },
          {
            name: "food2.xls",
            url:
              "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
          }
        ],
        url:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        srcList: [
          "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
          "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
        ],
        show:false
        };
    },
		methods :{
      headerclass() {
        return "header-class";
      },
      getList() {
        this.listLoading = false;
        // fetchList(this.listQuery).then(response => {
        //   this.total = response.data.total;
        //   response.data.items.map((item, index) => {
        //     if(index == 0 || index == 1 || index == 2 || index == 3 || index == 4 ){
        //       this.list.push(item)
        //     }
        //   })
        //   // Just to simulate the time of the request
        //   setTimeout(() => {
        //     this.listLoading = false;
        //   }, 1.5 * 1000);
        // });
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      },
      handlePictureCardPreview(file) {
        // this.dialogImageUrl = file.url;
        // this.dialogVisible = true;
        this.show = true;
      },
      handlePreview(file) {
        const $a = document.createElement("a");
        $a.setAttribute("href", file.url);
        $a.setAttribute("download", "download");
        $a.click();
      },
      submitForm() {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      },
      deleteFn() {
        this.$confirm('确认删除该条记录?', '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
		},
    created() {
      this.getList();
    },
	}
</script>

<style lang="scss" scoped>
  .section{
    margin-bottom:20px;
  }
  .demo-detail{
    padding-top: 10px;
  }
  .demo-detail .el-form-item__label{
    line-height: 34px;
  }
  .header-class {
    background-color: #888888 !important;
  }
  .el-upload--picture-card,.el-upload-list--picture-card .el-upload-list__item{
    width: 100px;
    height: 100px;
    line-height: 104px;
  }
  .el-upload-list--picture-card .el-upload-list__item .el-icon-check{
    position: absolute;
    top:0;
    left:15px;
  }
  .description-div{
     color:#000000;
  }

</style>
