//多经统筹合同（框架协议）审批

<template>
	<div :class="['sp-temp',{'disabled': form.bizEntityJson.disabled}]">
    <table class="border-table nobg"> 
      <tr>
        <th class="title" colspan="4">统筹合作单位信息</th>
      </tr>
      <tr>
        <td colspan="4">
          <el-checkbox v-model="form.bizEntityJson.coordinationZb">总部统筹</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.coordinationQy">区域统筹</el-checkbox>
        </td>
      </tr>
      <tr>
        <td class="title">中心</td>
        <td style="width:40%"><el-input placeholder="请选择" @click.native="showSearchOrg = true" v-model="form.bizEntityJson.centerOrg" size="mini"></el-input></td>
				<td class="title">商户名称</td>
				<td><el-input v-model="form.bizEntityJson.shopName" size="mini" placeholder="请输入"></el-input></td>
      </tr>
      <tr>
				<td class="title" rowspan="2">类型</td>
				<td>
					<el-checkbox v-model="form.bizEntityJson.residentialFlg">住宅</el-checkbox>
					<el-checkbox v-model="form.bizEntityJson.businessFlg">商业</el-checkbox>
					<el-checkbox v-model="form.bizEntityJson.planningLinkageFlg">商业（企划联动）</el-checkbox>
				</td>
				<td class="title"></td>
				<td></td>
      </tr>
			<tr>
				<td>
					<el-checkbox v-model="form.bizEntityJson.newMerchantsFlg">新进商户</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.reNewMerchantsFlg">续约商户</el-checkbox>
				</td>
				<td class="title"></td>
				<td></td>
			</tr>
			<tr>
				<td class="title">覆盖项目：</td>
				<td><el-input v-model="form.bizEntityJson.projectName" size="mini"></el-input></td>
				<td class="title">点位类型：</td>
				<td>
					 <el-select :disabled="form.bizEntityJson.disabled" style="width:100%"  v-model="form.bizEntityJson.pointType" placeholder="请选择" size="mini">
            <el-option
              v-for="item in optionsdw"
              :key="item.dictCd"
              :label="item.dictName"
              :value="item.dictCd"
            ></el-option>
            </el-select>
				</td>
			</tr>
    </table>

		<table style="margin-top:20px" class="border-table nobg"> 
      <tr>
        <th class="title" colspan="3">商务基本信息</th>
      </tr>
      <tr>
        <td></td>
				<td style="width:40%">申请条件</td>
				<td>备注</td>
      </tr>
      <tr>
        <td class="title">1、经营业态</td>
        <td>
					 <el-select :disabled="form.bizEntityJson.disabled" style="width:100%"  v-model="form.bizEntityJson.businessStatus" placeholder="请选择" size="mini">
            <el-option
              v-for="item in optionsyt"
              :key="item.dictCd"
              :label="item.dictName"
              :value="item.dictCd"
            ></el-option>
            </el-select>
				</td>
        <td><el-input v-model="form.bizEntityJson.businessStatusRemark" size="mini" placeholder="请输入"></el-input></td>
      </tr>
      <tr>
				<td class="title" rowspan="2">2、计租面积</td>
				<td><el-input v-model="form.bizEntityJson.renTableArea" size="mini" placeholder="请输入"></el-input></td>
				<td rowspan="2"><el-input v-model="form.bizEntityJson.renTableAreaRemark" size="mini" placeholder="请输入"></el-input></td>
      </tr>
			<tr>
				<td style="color:#606266;padding-left:27px">长(m)<input v-model="form.bizEntityJson.renTableLong" style="border: 1px solid #ccc;width: 10%;height: 23px;"/>宽(m)<input v-model="form.bizEntityJson.renTableWidth" style="border: 1px solid #ccc;width: 10%;height: 23px;"/>高(m)<input v-model="form.bizEntityJson.renTableHeight" style="border: 1px solid #ccc;width: 10%;height: 23px;"/></td>
			</tr>
			 <tr>
				<td class="title">3、合约期限</td>
				<td><el-input v-model="form.bizEntityJson.contractPeriod" size="mini" placeholder="请输入"></el-input></td>
				<td><el-input v-model="form.bizEntityJson.contractPeriodRemark" size="mini" placeholder="请输入"></el-input></td>
      </tr>
			<tr>
				<td class="title">4、交付时间</td>
				<td><el-date-picker style="width:100%" v-model="form.bizEntityJson.dueDate" type="date" placeholder="请选择日期">
    </el-date-picker></td>
				<td><el-input v-model="form.bizEntityJson.dueDateRemark" size="mini" placeholder="请输入"></el-input></td>
      </tr>
			<tr>
				<td class="title">5、合同开始时间</td>
				<td><el-date-picker style="width:100%" v-model="form.bizEntityJson.contractBeginDate" type="date" placeholder="请选择日期">
    </el-date-picker></td>
				<td><el-input v-model="form.bizEntityJson.contractBeginDateRemark" size="mini" placeholder="请输入"></el-input></td>
      </tr>
			<tr>
				<td class="title">6、合同结束时间</td>
				<td><el-date-picker style="width:100%" v-model="form.bizEntityJson.contractEndDate" type="date" placeholder="请选择日期">
    </el-date-picker></td>
				<td><el-input v-model="form.bizEntityJson.contractEndDateRemark" size="mini" placeholder="请输入"></el-input></td>
      </tr>
    </table>

		<table style="margin-top:20px" class="border-table nobg"> 
      <tr>
        <th class="title" colspan="3">租金及能源费</th>
      </tr>
      <tr>
        <td></td>
				<td style="width:40%">申请条件</td>
				<td>备注</td>
      </tr>
      <tr>
        <td class="title">1、支付方式</td>
        <td>
					<el-select :disabled="form.bizEntityJson.disabled" style="width:100%" v-model="form.bizEntityJson.payType" placeholder="请选择" size="mini">
            <el-option
              v-for="item in optionszf"
              :key="item.dictCd"
              :label="item.dictName"
              :value="item.dictCd"
            ></el-option>
            </el-select>
				</td>
        <td><el-input v-model="form.bizEntityJson.payTypeRemark" size="mini" placeholder="请输入"></el-input></td>
      </tr>
      <tr>
				<td class="title">2、申请租金（元/年）</td>
				<td><el-input v-model="form.bizEntityJson.applyAmount" size="mini" placeholder="请输入"></el-input></td>
				<td><el-input v-model="form.bizEntityJson.applyAmountRemark" size="mini" placeholder="请输入"></el-input></td>
      </tr>
			 <tr>
				<td class="title">3、租赁期总收益（元）</td>
				<td><el-input v-model="form.bizEntityJson.inComeAmount" size="mini" placeholder="请输入"></el-input></td>
				<td><el-input v-model="form.bizEntityJson.inComeAmountRemark" size="mini" placeholder="请输入"></el-input></td>
      </tr>
			 <tr>
				<td class="title">4、免租期</td>
				<td><el-input v-model="form.bizEntityJson.rentFreePeriod" size="mini" placeholder="请输入"></el-input></td>
				<td><el-input v-model="form.bizEntityJson.rentFreePeriodRemark" size="mini" placeholder="请输入"></el-input></td>
      </tr>
			<tr>
				<td class="title">5、保证金总额（元）</td>
				<td><el-input v-model="form.bizEntityJson.bondAmount" size="mini" placeholder="请输入"></el-input></td>
				<td><el-input v-model="form.bizEntityJson.bondAmountRemark" size="mini" placeholder="请输入"></el-input></td>
      </tr>
			<tr>
				<td class="title">6、装修期</td>
				<td><el-input v-model="form.bizEntityJson.decorationPeriod" size="mini" placeholder="请输入"></el-input></td>
				<td><el-input v-model="form.bizEntityJson.paydAmount" size="mini" placeholder="请输入"></el-input></td>
      </tr>
			<tr>
				<td class="title">7、其它条件</td>
				<td><el-input v-model="form.bizEntityJson.otherCondition" size="mini" placeholder="请输入"></el-input></td>
				<td></td>
      </tr>
			<tr>
				<td class="title">形象图片</td>
				<td colspan="2">
					 <el-upload
            name="fileName"
            :headers="{'Authorization': userInfo.token}"
            :accept="$action"
            :action="uploadUrl"
            :before-remove="beforeRemove"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'imageFiles')}"
            :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'imageFiles')"
            :on-error="handleErrorGlobal"
            :on-preview="downLoadFile"
            :file-list="form.allEntityFileIds.imageFiles"
            style="display: inline-block;">
            <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
          </el-upload>
				</td>
      </tr>
			<tr>
				<td class="title">位置图片</td>
				<td colspan="2">
					<el-upload
            name="fileName"
            :accept="$action"
            :headers="{'Authorization': userInfo.token}"
            :action="uploadUrl"
            :before-remove="beforeRemove"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'positionFiles')}"
            :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'positionFiles')"
            :on-error="handleErrorGlobal"
            :on-preview="downLoadFile"
            :file-list="form.allEntityFileIds.positionFiles"
            style="display: inline-block;">
            <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
          </el-upload>
				</td>
      </tr>
			<tr>
				<td class="title">乙方身份证复印件或营业执照复印件</td>
				<td colspan="2">
					<el-upload
            name="fileName"
            :accept="$action"
            :headers="{'Authorization': userInfo.token}"
            :action="uploadUrl"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'licenseFiles')}"
            :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'licenseFiles')"
            :on-error="handleErrorGlobal"
            :on-preview="downLoadFile"
            :file-list="form.allEntityFileIds.licenseFiles"
            style="display: inline-block;">
            <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
          </el-upload>
				</td>
      </tr>
			<tr>
				<td class="title">框架协议清单附件</td>
				<td colspan="2">
					<el-upload
            name="fileName"
            :accept="$action"
            :headers="{'Authorization': userInfo.token}"
            :action="uploadUrl"
            :before-remove="beforeRemove"
            :on-remove="(file, fileList) => {handleRemove(file, fileList, 'checklistFiles')}"
            :on-success="(response, file, fileList,param) => handleSuccess(response, file, fileList,'checklistFiles')"
            :on-error="handleErrorGlobal"
            :on-preview="downLoadFile"
            :file-list="form.allEntityFileIds.checklistFiles"
            style="display: inline-block;">
            <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
          </el-upload>
				</td>
      </tr>
    </table>
     <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
// {
//   template,
//   data: function() {
//     return{
//       form: data,
//       showSearchOrg:false,
//       disabled: true,
//       uploadUrl,
//       fileList: [],
//       optionsyt: [
//         {dictCd: '餐饮',
//         dictName: '餐饮'},
//         {dictCd: '珠宝',
//         dictName: '珠宝'},
//         {dictCd: '儿童',
//         dictName: '儿童'},
//         {dictCd: '配套',
//         dictName: '配套'},
//         {dictCd: '服饰',
//         dictName: '服饰'},
//       ],
//         optionsdw: [
//         {dictCd: '固定点位',
//         dictName: '固定点位'},
//         {dictCd: '临时点位',
//         dictName: '临时点位'},
//         {dictCd: '宣传点位',
//         dictName: '宣传点位'},
//         {dictCd: 'ATM',
//         dictName: 'ATM'},
//         {dictCd: '其他',
//         dictName: '其他'},
//       ],
//       optionszf: [
//         {dictCd: '一次性支付',
//         dictName: '一次性支付'}
//       ]
//     }
//   },
export default {
	props: ['data'],
	watch: {
		// data: {
		// 	immediate: true,
		// 	handler: function(val) {
		// 		console.log(val)
		// 		this.form = val;
		// 	}
		// }
	},
  data() {
    return {
	    form: {
        bizEntityJson: {
          reimBursementCategory: '1'
        }
      },
      userInfo: {}
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
  },
  methods: {
     handleSuccess(response, file, fileList,param) {
      console.log(response, file, fileList,param)
      const fileId = response.data.fileId;
      if(!this.form.bizEntityJson[param]) {
        this.form.bizEntityJson[param] = '';
      }
      this.form.bizEntityJson[param] += fileId;
      console.log(this.form.bizEntityJson[param])
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
    closeSearhOrg(val) {
      this.showSearchOrg = false;
      if(val) {
        console.log(val)
        this.form.bizEntityJson.centerOrg = val.text;
      }
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
</script>>