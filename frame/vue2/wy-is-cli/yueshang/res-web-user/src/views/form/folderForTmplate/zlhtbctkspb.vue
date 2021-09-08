// 租赁合同补充条款审批表(2015.2)  宝龙地产/商业/商业公司/05-招商管理/租赁合同签署

<template>
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <!-- <iframe src="http://demo.powerlong.com/PowerDesk/sc/sc-contract-templet-info!mergeContract.action?ifMark2=true&scContId=4028347037546340013758e41bab101e&isCurApproveUser=1&approveInfoId=8a7b857076b449d30176b698bd240042" frameborder="0"></iframe> -->
    <el-row :gutter="24">
      <d-col place="top" title="补充协议文本库编号" row="1">
        <el-select
          :class="{'novlaue': !form.bizEntityJson.contractNo}"
          :disabled="form.bizEntityJson.disabled"
          v-model="form.bizEntityJson.contractNo"
          filterable
          remote
          reserve-keyword
          :remote-method="searchContract"
          >
          <el-option
            v-for="item in options1"
            :key="item.contractNo"
            :label="item.contractNo"
            :value="item.contractNo">
            <el-row>
              <el-col>
                {{item.contractName}}({{item.contractNo}})
              </el-col>
            </el-row>
          </el-option>
        </el-select>
      </d-col>
    </el-row>
    <el-row :gutter="24">
      <d-col title="租赁合同编号">
        <el-select
          :class="{'novlaue': !form.bizEntityJson.contNo}"
          :disabled="form.bizEntityJson.disabled"
          v-model="form.bizEntityJson.contNo"
          filterable
          remote
          reserve-keyword
          :remote-method="quickSerchCont"
          @change="quickSerchContDetail"
          >
          <el-option
            v-for="(item,index) in options2"
            :key="index"
            :label="item.contNo"
            :value="item.contNo">
            <el-row>
              <el-col>
              {{item.contNo}}{{item.bisShopName}}{{item.bisStoreNos}}
              </el-col>
            </el-row>
          </el-option>
        </el-select>
      </d-col>
     <d-col place="right" title="面积">
       <el-input readonly v-model="form.bizEntityJson.rentSquare"></el-input>
      </d-col>
    </el-row>
    <el-row :gutter="24">
      <d-col title="项目名称">
       <el-input readonly v-model="form.bizEntityJson.projectName"></el-input>
      </d-col>
      <d-col title="商铺号" place="right">
       <el-input readonly v-model="form.bizEntityJson.bisStoreNos"></el-input>
      </d-col>
    </el-row>
    <!-- 在品牌和其他变更时不显示租户品牌和商家性质 -->
    <el-row :gutter="24" v-if="!form.bizEntityJson.protocolType2 || !form.bizEntityJson.protocolType2">
      <d-col title="租户品牌">
       <el-input readonly v-model="form.bizEntityJson.shopName1"></el-input>
      </d-col>
      <d-col title="商家性质" place="right">
        <d-radio-group 
          v-model="form.bizEntityJson" 
          :nameList="[{label:'主力店',name:'operTypeCd1'},
                      {label:'次主力店',name:'operTypeCd2'},
                      {label:'大商铺',name:'operTypeCd3'},
                      {label:'小商铺',name:'operTypeCd4'},
                      {label:'一般商铺',name:'operTypeCd5'},
                      {label:'中型商铺',name:'operTypeCd6'},
                      {label:'商业街',name:'operTypeCd7'},]"
        />
      </d-col>
    </el-row>
    <el-row :gutter="24">
      <d-col title="商务条件审批表">
       <el-input readonly v-model="form.bizEntityJson.swtjDisplayNo"></el-input>
      </d-col>
      <d-col title="租赁合同评审表" place="right">
       <el-input readonly v-model="form.bizEntityJson.htpsDisplayNo"></el-input>
      </d-col>
    </el-row>
    <el-row :gutter="24">
      <d-col title="在营在建">
        <d-radio-group 
          v-model="form.bizEntityJson" 
          :nameList="[{label:'在建',name:'isBuildCd1'},
                      {label:'在营',name:'isBuildCd2'}]"
        />
      </d-col>
      <d-col title="项目归属" place="right">
        <d-radio-group 
          v-model="form.bizEntityJson" 
          :nameList="[{label:'地产',name:'feizhuli'},
                      {label:'置地',name:'feifeizhuli'},
                      {label:'轻资产',name:'feifeizhulia'}]"
        />
      </d-col>
    </el-row>
    <el-row :gutter="24">
      <d-col title="变更协议类别" row="1">
        <d-radio-group 
          v-model="form.bizEntityJson" 
          :nameList="[{label:'主体变更',name:'protocolType1'},
                      {label:'品牌变更',name:'protocolType2'},
                      {label:'商务条件变更',name:'protocolType4'},
                      {label:'其他变更',name:'protocolType5'}]"
        />
      </d-col>
      <!-- 主体变更时显示 -->
      <d-col row="1" v-if="form.bizEntityJson.protocolType1">
        <d-radio-group 
          v-model="form.bizEntityJson" 
          :nameList="[{label:'设立定点营业执照',name:'subjectChangeAgreeType1'},
                      {label:'其他',name:'subjectChangeAgreeType2'}]"
        />
      </d-col>
    </el-row>
    <el-row :gutter="24">
      <d-col title="变更原因" row="1">
        <el-input type="textarea" v-model="form.bizEntityJson.changeReason"></el-input>
      </d-col>
    </el-row>
    <!-- 商务条件变更展示开始 -->
    <div v-if="form.bizEntityJson.protocolType4">
      <el-row :gutter="24">
        <d-col title="是否涉及租金减免">
          <d-radio-group 
            v-model="form.bizEntityJson" 
            :nameList="[{label:'是',name:'rentReductionY'},
                        {label:'否',name:'rentReductionN'}]"
          />
        </d-col>
        <d-col title="租金减免网批号" place="right">
          <!-- <el-input v-model="form.bizEntityJson.rentReductionNum"></el-input> -->
          <el-select
          :class="{'novlaue': !form.bizEntityJson.rentReductionNum}"
          :disabled="form.bizEntityJson.disabled"
          v-model="form.bizEntityJson.rentReductionNum"
          filterable
          remote
          reserve-keyword
          :remote-method="scContractQuickSearchPreBill"
          >
          <el-option
            v-for="(item,index) in options3"
            :key="index"
            :label="item.contNo"
            :value="item.contNo">
            <el-row>
              <el-col>
              {{item.contNo}}{{item.bisShopName}}{{item.bisStoreNos}}
              </el-col>
            </el-row>
          </el-option>
        </el-select>
        </d-col>
      </el-row>
      <el-row :gutter="24">
        <d-col title="是否涉及物管费减免">
          <d-radio-group 
            v-model="form.bizEntityJson" 
            :nameList="[{label:'是',name:'propertyReductionY'},
                        {label:'否',name:'propertyReductionN'}]"
          />
        </d-col>
        <d-col title="管理费用减免网批号" place="right">
          <!-- <el-input v-model="form.bizEntityJson.propertyReductionNum"></el-input> -->
          <el-select
          :class="{'novlaue': !form.bizEntityJson.propertyReductionNum}"
          :disabled="form.bizEntityJson.disabled"
          v-model="form.bizEntityJson.propertyReductionNum"
          filterable
          remote
          reserve-keyword
          :remote-method="scContractQuickSearchPreBill"
          >
          <el-option
            v-for="(item,index) in options3"
            :key="index"
            :label="item.contNo"
            :value="item.contNo">
            <el-row>
              <el-col>
              {{item.contNo}}{{item.bisShopName}}{{item.bisStoreNos}}
              </el-col>
            </el-row>
          </el-option>
        </el-select>
        </d-col>
      </el-row>
      <el-row :gutter="24">
        <d-col title="是否涉及固定租金、或两者取高转纯扣" row="1">
          <d-radio-group 
            v-model="form.bizEntityJson" 
            :nameList="[{label:'是',name:'rentFixedY'},
                        {label:'否',name:'rentFixedN'}]"
          />
        </d-col>
      </el-row>
      <el-row :gutter="24">
        <d-col title="是否涉及工程技术条件改造" row="1">
          <d-radio-group 
            v-model="form.bizEntityJson" 
            :nameList="[{label:'是',name:'engineeringTechnologyY'},
                        {label:'否',name:'engineeringTechnologyN'}]"
          />
        </d-col>
      </el-row>
      <el-row :gutter="24">
        <d-col title="是否涉及特殊条款" row="1">
          <d-radio-group 
            v-model="form.bizEntityJson" 
            :nameList="[{label:'是',name:'specialRulerY'},
                        {label:'否',name:'specialRulerN'}]"
          />
        </d-col>
      </el-row>
    </div>
    <!-- 商务条件变更展示结束 -->
    <el-row :gutter="24">
      <d-col title="是否收费" row="1">
        <d-radio-group 
          v-model="form.bizEntityJson" 
          :nameList="[{label:'是',name:'isMoney1'},
                      {label:'否',name:'unMoney1'}]"
        />
      </d-col>
    </el-row>
    <el-row :gutter="24">
      <d-col title="类型" row="1">
        <d-radio-group 
          v-model="form.bizEntityJson" 
          :nameList="[{label:'主次力店',name:'mainStore'},
                      {label:'非主次力店',name:'noMainStore'}]"
        />
      </d-col>
    </el-row>
    <el-row :gutter="24">
      <d-col title="十要十不要" row="1">
        <d-radio-group 
          v-model="form.bizEntityJson" 
          :nameList="[{label:'涉及',name:'tenType1'},
                      {label:'不涉及',name:'tenType2'}]"
        />
      </d-col>
    </el-row>

    <!--  主体变更 -->
    <div v-if="form.bizEntityJson.protocolType1">
      <el-row class="padding-row">
        <el-col :span="24" class="title-col topRight-col">
          <h2>主体变更</h2>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="14">
          <div class="d-min">
            <span></span>
            <h5 style="flex:1;text-align:center;line-height:36px">
              原主体信息
            </h5>
          </div>
        </el-col>
        <el-col :span="10" class="right-col">
          <h5 style="flex:1;text-align:center;line-height:36px">
            变更主体信息
          </h5>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="14">
          <div class="d-min">
            <span>承租方</span>
             <el-input v-model="form.bizEntityJson.partB1"></el-input>
          </div>
        </el-col>
        <el-col :span="10" class="right-col">
          <div class="d-min">
            <el-input v-model="form.bizEntityJson.partB2"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="14">
          <div class="d-min">
            <span>承租方地址</span>
             <el-input v-model="form.bizEntityJson.partBAddr1"></el-input>
          </div>
        </el-col>
        <el-col :span="10" class="right-col">
          <div class="d-min">
            <el-input v-model="form.bizEntityJson.partBAddr2"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="14">
          <div class="d-min">
            <span>承租方法人</span>
             <el-input v-model="form.bizEntityJson.partBPeop1"></el-input>
          </div>
        </el-col>
        <el-col :span="10" class="right-col">
          <div class="d-min">
            <el-input v-model="form.bizEntityJson.partBPeop2"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 品牌变更 -->
    <div v-if="form.bizEntityJson.protocolType2">
      <el-row class="padding-row">
        <el-col :span="24" class="title-col topRight-col">
          <h2>品牌变更</h2>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="14">
          <div class="d-min">
            <span></span>
            <h5 style="flex:1;text-align:center;line-height:36px">
              原品牌信息
            </h5>
          </div>
        </el-col>
        <el-col :span="10" class="right-col">
          <h5 style="flex:1;text-align:center;line-height:36px">
            变更品牌信息
          </h5>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="14">
          <div class="d-min">
            <span>品牌</span>
             <el-input v-model="form.bizEntityJson.shopName1"></el-input>
          </div>
        </el-col>
        <el-col :span="10" class="right-col">
          <div class="d-min">
            <!-- <el-input v-model="form.bizEntityJson.shopName2"></el-input> -->
            <el-select
              :class="{'novlaue': !form.bizEntityJson.shopName2}"
              :disabled="form.bizEntityJson.disabled"
              v-model="form.bizEntityJson.shopName2"
              filterable
              remote
              reserve-keyword
              :remote-method="zlhtQuickSearchSWTJNew"
              >
              <el-option
                v-for="(item,index) in options4"
                :key="index"
                :label="item.shopName"
                :value="item.shopName">
                <el-row type="flex" @click.native="quickSerchContJXS(item)">
                  <el-col>{{item.projectName}}</el-col>
                  <el-col>{{item.shopName}}</el-col>
                  <el-col>{{item.companyName}}</el-col>
                </el-row>
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="14">
          <div class="d-min">
            <span>商标注册名</span>
             <el-input v-model="form.bizEntityJson.registeredBrand1"></el-input>
          </div>
        </el-col>
        <el-col :span="10" class="right-col">
          <div class="d-min">
            <el-select
              :class="{'novlaue': !form.bizEntityJson.registeredBrand2}"
              :disabled="form.bizEntityJson.disabled"
              v-model="form.bizEntityJson.registeredBrand2"
              >
              <el-option
                v-for="(item,index) in zcmList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="14">
          <div class="d-min">
            <span>经销商</span>
             <el-input v-model="form.bizEntityJson.bisShopConnName1"></el-input>
          </div>
        </el-col>
        <el-col :span="10" class="right-col">
          <div class="d-min">
            <el-input v-model="form.bizEntityJson.bisShopConnName2"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="14">
          <div class="d-min">
            <span>商家性质</span>
            <d-radio-group 
            v-model="form.bizEntityJson" 
            :nameList="[{label:'主力店',name:'operTypeCd1'},
                        {label:'次主力店',name:'operTypeCd2'},
                        {label:'大商铺',name:'operTypeCd3'},
                        {label:'小商铺',name:'operTypeCd4'},
                        {label:'一般商铺',name:'operTypeCd5'},
                        {label:'中型商铺',name:'operTypeCd6'},
                        {label:'商业街',name:'operTypeCd7'}]"
          />
          </div>
        </el-col>
        <el-col :span="10" class="right-col">
          <div class="d-min">
            <d-radio-group 
            v-model="form.bizEntityJson" 
            :nameList="[{label:'主力店',name:'operTypeCd12'},
                        {label:'次主力店',name:'operTypeCd22'},
                        {label:'大商铺',name:'operTypeCd32'},
                        {label:'小商铺',name:'operTypeCd42'},
                        {label:'一般商铺',name:'operTypeCd52'},
                        {label:'中型商铺',name:'operTypeCd62'},
                        {label:'商业街',name:'operTypeCd72'}]"
          />
          </div>
        </el-col>
      </el-row>
    </div>

     <!-- 商务条件变更 -->
    <table v-if="form.bizEntityJson.protocolType4" class="border-table nobg" style="margin-top:20px;table-layout: fixed;">
      <colgroup>
        <col width="200px">
        <col>
        <col>
      </colgroup>
      <tr>
        <th class="title" colspan="3">商务条件变更</th>
      </tr>
      <tr>
        <td class="title" style="width:200px!important"></td>
        <td style="text-align:center">原商务条件信息</td>
        <td style="text-align:center">变更商务条件信息</td>
      </tr>
      <tr>
        <td class="title">1、生效时间</td>
        <td colspan="2">
          <el-input v-model="form.bizEntityJson.effectiveDate"></el-input>
        </td>
      </tr>
      <tr>
        <td class="title">2、租赁区域</td>
        <td>
          <el-input v-model="form.bizEntityJson.rentArea1"></el-input>
        </td>
        <td>
          <el-input readonly @click.native="showSpChoose =  true" v-model="form.bizEntityJson.rentArea2"></el-input>
        </td>
      </tr>
       <tr>
        <td class="title">3、业态</td>
        <td>
          <el-input v-model="form.bizEntityJson.oper1"></el-input>
        </td>
        <td>
          <el-input readonly @click.native="showYtChoose =  true" v-model="form.bizEntityJson.oper2"></el-input>
        </td>
      </tr>
       <tr>
        <td class="title">4、面积</td>
        <td>
          <p>实际计租面积(㎡)：<input style="border:1px solid #ccc !important" v-model="form.bizEntityJson.calcArea1"/></p>
          <p>实际计费面积(㎡)：<input style="border:1px solid #ccc !important" v-model="form.bizEntityJson.prMgrArea1"/></p>
        </td>
        <td>
          <p>实际计租面积(㎡)：<input style="border:1px solid #ccc !important" v-model="form.bizEntityJson.calcArea2"/></p>
          <p>实际计费面积(㎡)：<input style="border:1px solid #ccc !important" v-model="form.bizEntityJson.prMgrArea2"/></p>
        </td>
      </tr>
       <tr>
        <td class="title">5、签约时间</td>
        <td>
          <el-input v-model="form.bizEntityJson.deliveryDay1"></el-input>
        </td>
        <td>
          <el-input v-model="form.bizEntityJson.deliveryDay2"></el-input>
        </td>
      </tr>
       <tr>
        <td class="title">6、租赁起始规则</td>
        <td>
          <el-input v-model="form.bizEntityJson.leaseStartRule1"></el-input>
        </td>
        <td>
          <el-input v-model="form.bizEntityJson.leaseStartRule2"></el-input>
        </td>
      </tr>
       <tr>
        <td class="title">7、约定交付日</td>
        <td>
          <el-input v-model="form.bizEntityJson.handDate1"></el-input>
        </td>
        <td>
          <el-date-picker
            v-model="form.bizEntityJson.handDate2"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </td>
      </tr>
       <tr>
        <td class="title">8、约定最迟开业日</td>
        <td>
          <el-input v-model="form.bizEntityJson.openDate1"></el-input>
        </td>
        <td>
          <el-date-picker
            v-model="form.bizEntityJson.openDate2"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </td>
      </tr>
       <tr>
        <td class="title">9、乙方约定开业日</td>
        <td>
          <el-input v-model="form.bizEntityJson.appointLastOpenDate1"></el-input>
        </td>
        <td>
          <el-date-picker
            v-model="form.bizEntityJson.appointLastOpenDate2"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </td>
      </tr>
       <tr>
        <td class="title">10、合同开始时间</td>
        <td>
          <el-input v-model="form.bizEntityJson.conOpenDate1"></el-input>
        </td>
        <td>
          <el-date-picker
            v-model="form.bizEntityJson.conOpenDate2"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            @change="changeDate">
          </el-date-picker>
        </td>
      </tr>
       <tr>
        <td class="title">11、合同结束时间</td>
        <td>
          <el-input v-model="form.bizEntityJson.conEndDate1"></el-input>
        </td>
        <td>
          <el-date-picker
            v-model="form.bizEntityJson.conEndDate2"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            @change="changeDate('conEndDate2')">
          </el-date-picker>
        </td>
      </tr>
       <tr>
        <td class="title">12、租金起计日</td>
        <td>
          <p>第一年：<input style="border:1px solid #ccc !important" v-model="form.bizEntityJson.freePeriod11"/>个月</p>
          <p>第二年：<input style="border:1px solid #ccc !important" v-model="form.bizEntityJson.freePeriod21"/>个月</p>
          <p>第三年：<input style="border:1px solid #ccc !important" v-model="form.bizEntityJson.freePeriod31"/>个月</p>
        </td>
        <td>
          <p>第一年：<input style="border:1px solid #ccc !important" v-model="form.bizEntityJson.freePeriod211"/>个月</p>
          <p>第二年：<input style="border:1px solid #ccc !important" v-model="form.bizEntityJson.freePeriod221"/>个月</p>
          <p>第三年：<input style="border:1px solid #ccc !important" v-model="form.bizEntityJson.freePeriod231"/>个月</p>
        </td>
      </tr>
       <tr>
        <td class="title">13、租金方式</td>
        <td>
          <d-radio-group 
            v-model="form.bizEntityJson" 
            :nameList="[{label:'固定租金',name:'rentFeeType11'},
                        {label:'提成租金',name:'rentFeeType12'},
                        {label:'其他方式',name:'rentFeeType13'}]"
          />
        </td>
        <td>
          <d-radio-group 
            v-model="form.bizEntityJson" 
            :nameList="[{label:'固定租金',name:'rentFeeType21'},
                        {label:'提成租金',name:'rentFeeType22'},
                        {label:'其他方式',name:'rentFeeType23'}]"
          />
        </td>
      </tr>
       <tr>
        <td class="title">14、提成结算方式</td>
        <td>
          <d-radio-group 
            v-if="form.bizEntityJson.rentFeeType12"
            v-model="form.bizEntityJson" 
            :nameList="[{label:'月结',name:'commissionPayment11'},
                        {label:'半年结',name:'commissionPayment12'},
                        {label:'年结',name:'commissionPayment13'},
                        {label:'保底提成取高',name:'pushMoneyHight1'}]"
          />
        </td>
        <td>
          <!-- <d-radio-group 
            v-if="form.bizEntityJson.rentFeeType22"
            v-model="form.bizEntityJson" 
            :nameList="[{label:'月结',name:'commissionPayment21'},
                        {label:'半年结',name:'commissionPayment22'},
                        {label:'年结',name:'commissionPayment23'},
                        {label:'保底提成取高',name:'pushMoneyHight2'}]"
          /> -->
        </td>
      </tr>
       <tr>
        <td class="title">15、租金</td>
        <!-- 原始租金td -->
        <td style="padding:0">
          <!-- 固定租金表格 -->
          <table style="width:100%" v-if="form.bizEntityJson.rentFeeType11">
             <colgroup>
              <col width="80px">
              <col>
              <col>
             </colgroup>
             <tr>
               <td>租赁年度</td>
               <td>租金标准(元/㎡/月)</td>
               <td>年租金(元)</td>
             </tr>
            <tr v-for="(v,i) in zujinList" :key="i">
               <td>第{{i+1}}年</td>
               <td>
                 <el-input></el-input>
               </td>
              <td>
                 <el-input></el-input>
               </td>
             </tr>
             <tr>
               <td colspan="2">租金合计(元)</td>
               <td></td>
             </tr>
          </table>
          <!-- 提成租金表格 -->
          <table style="width:100%" v-if="form.bizEntityJson.rentFeeType12">
             <colgroup>
              <col width="80px">
              <col>
              <col>
              <col>
             </colgroup>
             <tr>
               <td>租赁年度</td>
               <td>预估月营业额(元)</td>
               <td>扣率(%)</td>
               <td>年租金(元)</td>
             </tr>
            <tr v-for="(v,i) in zujinList" :key="i">
               <td>第{{i+1}}年</td>
               <td>
                 <el-input></el-input>
               </td>
              <td>
                 <el-input></el-input>
              </td>
              <td>
                 <el-input></el-input>
              </td>
             </tr>
             <tr>
               <td colspan="2">租金合计(元)</td>
               <td colspan="2"></td>
             </tr>
          </table>
          <!-- 其他方式表格 -->
           <table style="width:100%" v-if="form.bizEntityJson.rentFeeType13">
             <colgroup>
              <col width="100px">
              <col>
             </colgroup>
             <tr>
               <td>租赁年度</td>
               <td>年租金(元)</td>
             </tr>
            <tr v-for="(v,i) in zujinList" :key="i">
               <td>第{{i+1}}年</td>
               <td>
                 <el-input></el-input>
               </td>
             </tr>
             <tr>
               <td>租金合计(元)</td>
               <td></td>
             </tr>
          </table>
        </td>
        <!-- 变更租金td -->
        <td style="padding:0;">
          <table style="width:100%" v-if="form.bizEntityJson.rentFeeType21">
             <colgroup>
              <col width="80px">
              <col>
              <col>
             </colgroup>
             <tr>
               <td>租赁年度</td>
               <td>租金标准(元/㎡/月)</td>
               <td>年租金(元)</td>
             </tr>
            <tr v-for="(v,i) in zujinList" :key="i">
               <td>第{{i+1}}年</td>
               <td>
                 <el-input></el-input>
               </td>
              <td>
                 <el-input></el-input>
               </td>
             </tr>
             <tr>
               <td colspan="2">租金合计(元)</td>
               <td></td>
            </tr>
          </table>
          <table style="width:100%" v-if="form.bizEntityJson.rentFeeType22">
            <colgroup>
              <col width="80px">
              <col>
              <col>
              <col>
             </colgroup>
             <tr>
               <td>租赁年度</td>
               <td>预估月营业额(元)</td>
               <td>扣率(%)</td>
               <td>年租金(元)</td>
             </tr>
            <tr v-for="(v,i) in zujinList" :key="i">
               <td>第{{i+1}}年</td>
               <td>
                 <el-input></el-input>
               </td>
              <td>
                 <el-input></el-input>
              </td>
              <td>
                 <el-input></el-input>
              </td>
             </tr>
             <tr>
               <td colspan="2">租金合计(元)</td>
               <td colspan="2"></td>
             </tr>
          </table>
          <table style="width:100%" v-if="form.bizEntityJson.rentFeeType23">
             <colgroup>
              <col width="100px">
              <col>
             </colgroup>
             <tr>
               <td>租赁年度</td>
               <td>年租金(元)</td>
             </tr>
            <tr v-for="(v,i) in zujinList" :key="i">
               <td>第{{i+1}}年</td>
               <td>
                 <el-input></el-input>
               </td>
             </tr>
             <tr>
               <td>租金合计(元)</td>
               <td></td>
             </tr>
          </table>
        </td>
      </tr>
       <tr>
        <td class="title">16、租金说明</td>
        <td>
          <el-input type="textarea" v-model="form.bizEntityJson.rentFeeAmt81"></el-input>
        </td>
        <td>
          <el-input type="textarea" v-model="form.bizEntityJson.rentFeeAmt82"></el-input>
        </td>
      </tr>
       <tr>
        <td class="title">17、预付租金(元)</td>
        <td>
          <el-input v-model="form.bizEntityJson.rateRent1"></el-input>
        </td>
        <td>
          <el-input v-model="form.bizEntityJson.rateRent2"></el-input>
        </td>
      </tr>
       <tr>
        <td class="title">18、租金支付周期</td>
        <td>
          <el-input v-model="form.bizEntityJson.rentPaymentCycle1"></el-input>
        </td>
        <td>
          <el-input v-model="form.bizEntityJson.rentPaymentCycle2"></el-input>
        </td>
      </tr>
       <tr>
        <td class="title">19、租金最迟缴费日</td>
        <td>
          <el-input v-model="form.bizEntityJson.rentLastDateRule1"></el-input>
        </td>
        <td>
          <el-input v-model="form.bizEntityJson.rentLastDateRule2"></el-input>
        </td>
      </tr>
       <tr>
        <td class="title">20、 空调使用情况\商铺类型</td>
        <td>
          <d-radio-group 
            v-model="form.bizEntityJson" 
            :nameList="[{label:'返租',name:'isSyjType1'},
                        {label:'不返租',name:'isSyjType2'},
                        {label:'底商',name:'isSyjType3'}]"
          />
        </td>
        <td>
          <d-radio-group 
            v-model="form.bizEntityJson" 
            :nameList="[{label:'返租',name:'isSyjType21'},
                        {label:'不返租',name:'isSyjType22'},
                        {label:'底商',name:'isSyjType23'}]"
          />
        </td>
      </tr>
       <tr>
        <td class="title">21、物业管理费</td>
        <td>
          <p>每平方米<input style="border:1px solid #ccc !important" v-model="form.bizEntityJson.compMgrAmt11"/>元/㎡/月</p>
          <p>合计{{form.bizEntityJson.totalManagerFee1}}元</p>
        </td>
        <td>
          <p>每平方米<input style="border:1px solid #ccc !important" v-model="form.bizEntityJson.compMgrAmt21"/>元/㎡/月</p>
          <p>合计{{form.bizEntityJson.totalManagerFee2}}元</p>
        </td>
      </tr>
       <tr>
        <td class="title">22、计费起始日</td>
        <td>
          <el-input v-model="form.bizEntityJson.billingStartDay1"></el-input>
        </td>
        <td>
          <el-input v-model="form.bizEntityJson.billingStartDay2"></el-input>
        </td>
      </tr>
       <tr>
        <td class="title">23、预付物业管理费(元)</td>
        <td>
          <el-input v-model="form.bizEntityJson.rateSynthesizeManageFee1"></el-input>
        </td>
        <td>
          <el-input v-model="form.bizEntityJson.rateSynthesizeManageFee2"></el-input>
        </td>
      </tr>
       <tr>
        <td class="title">24、物业费支付周期</td>
        <td>
          <el-input v-model="form.bizEntityJson.managerFeePaymentCycle1"></el-input>
        </td>
        <td>
          <el-input v-model="form.bizEntityJson.managerFeePaymentCycle2"></el-input>
        </td>
      </tr>
       <tr>
        <td class="title">25、物业管理费最迟缴费日</td>
        <td>
          <el-input v-model="form.bizEntityJson.synthesizeMmanagerFeeLastRule1"></el-input>
        </td>
        <td>
          <el-input v-model="form.bizEntityJson.synthesizeMmanagerFeeLastRule2"></el-input>
        </td>
      </tr>
       <tr>
        <td class="title">26、装修期开始时间</td>
        <td>
          <el-input v-model="form.bizEntityJson.fitmentStartDate1"></el-input>
        </td>
        <td>
          <el-input v-model="form.bizEntityJson.fitmentStartDate2"></el-input>
        </td>
      </tr>
       <tr>
        <td class="title">27、装修期结束时间</td>
        <td>
          <el-input v-model="form.bizEntityJson.fitmentEndDate1"></el-input>
        </td>
        <td>
          <el-input v-model="form.bizEntityJson.fitmentEndDate2"></el-input>
        </td>
      </tr>
       <tr>
        <td class="title">28、装修管理费</td>
        <td>
           <p>每平方米<input style="border:1px solid #ccc !important" v-model="form.bizEntityJson.fitmentManageStandard1"/>元/㎡/月</p>
          <p>合计{{form.bizEntityJson.totalFitmentManageStandard1}}元</p>
        </td>
        <td>
           <p>每平方米<input style="border:1px solid #ccc !important" v-model="form.bizEntityJson.fitmentManageStandard2"/>元/㎡/月</p>
          <p>合计{{form.bizEntityJson.totalFitmentManageStandard2}}元</p>
        </td>
      </tr>
       <tr>
        <td class="title">29、履约保证金-租金(元)</td>
        <td>
          <el-input v-model="form.bizEntityJson.strikeEnsureRent1"></el-input>
        </td>
        <td>
          <el-input v-model="form.bizEntityJson.strikeEnsureRent2"></el-input>
        </td>
      </tr>
       <tr>
        <td class="title">30、履约保证金-物管费(元)</td>
        <td>
          <el-input v-model="form.bizEntityJson.strikeEnsurePropertyManageFee1"></el-input>
        </td>
        <td>
          <el-input v-model="form.bizEntityJson.strikeEnsurePropertyManageFee2"></el-input>
        </td>
      </tr>
       <tr>
        <td class="title">31、履约保证金(元)</td>
        <td>
          <el-input v-model="form.bizEntityJson.strikeEnsureFee1"></el-input>
        </td>
        <td>
          <el-input v-model="form.bizEntityJson.strikeEnsureFee2"></el-input>
        </td>
      </tr>
       <tr>
        <td class="title">32、违约金(元)</td>
        <td>
          <el-input v-model="form.bizEntityJson.defaultAmt1"></el-input>
        </td>
        <td>
          <el-input v-model="form.bizEntityJson.defaultAmt2"></el-input>
        </td>
      </tr>
    </table>

    <!-- 标准合同表款 -->
    <table class="border-table nobg" style="margin-top:20px"> 
      <tr>
        <th class="title" colspan="2">标准合同条款</th>
        <th class="title" colspan="3"><el-button @click="addTk">增加条款</el-button></th>
      </tr>
      <tr>
        <td>条款项</td>
        <td>条款内容</td>
        <td>乙方反馈意见</td>
        <td>责任部门</td>
        <td class="title" style="width:50px!important">操作</td>
      </tr>
      <tr v-for="(v,i) in form.bizEntityJson.otherProperties" :key="i">
        <td><el-input v-model="v.itemNo"></el-input></td>
        <td><el-input v-model="v.itemContent"></el-input></td>
        <td><el-input v-model="v.sideBFeedback"></el-input></td>
        <td>
          <el-select
            :class="{'novlaue': !v.resDeptCd}"
            :disabled="form.bizEntityJson.disabled"
            v-model="v.resDeptCd">
            <el-option label="宝龙商业财务部负责人" value="170"/>
            <el-option label="宝龙商业招商中心总经理" value="201"/>
            <el-option label="宝龙商业租务部负责人" value="493"/>
          </el-select>
        </td>
        <td class="title" style="width:50px!important"><el-button v-if="!form.bizEntityJson.disabled" @click="delTk(i)">删除</el-button></td>
      </tr>
    </table>

    <div class="public-box" style="margin-top:20px!important">
       <el-row :gutter="24" style="margin-top: 20px !important">
        <el-col :span="24" class="title-col right-col">
          <h2>其他</h2>
        </el-col>
        <d-col row="1" title="备注说明">
          <el-input type="textarea"></el-input>
        </d-col>
      </el-row>
    </div>

    <el-dialog
      title="选择商铺"
      :visible.sync="showSpChoose"
      width="50%"
      >
      <span style="color:red">商务条件，租赁合同补充条款网批商铺只能单选，如需选多铺位，请先做合铺网批(铺位合并审批表)</span>
      <div class="zlht-zj-wrapper">
        <div style="border:1px solid;width:30%">
          <h1 class="zlht-zj-title">楼层号</h1>
          <div style="overflow-y:auto;height:470px;">
            <p :class="{'refrence-list-item': true,'active': k == checkedFloor}" v-for="(v,k) in floorList" :key="k" @click="loadStoreList(k)">{{v}}</p>
          </div>
        </div>
        <div style="border:1px solid;width:30%">
          <h1 class="zlht-zj-title">商铺</h1>
          <div style="overflow-y:auto;height:470px;cursor:pointer">
            <p :class="{'refrence-list-item': true,'active': v.storeNo == form.bizEntityJson.rentArea2}" v-for="(v,i) in storeList" :key="i" @click="setSp(v)">{{v.storeNo}}</p>
          </div>
        </div>
        <div style="border:1px solid;width:30%">
          <h1 class="zlht-zj-title">已选商铺</h1>
          <el-row style="line-height:30px;padding:0 10px;">{{form.bizEntityJson.rentArea2}}</el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showSpChoose = false">确 定</el-button>
        <el-button @click="showSpChoose = false">退出</el-button>
        <el-button @click="removeSp">清空</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="选择业态"
      :visible.sync="showYtChoose"
      width="50%"
      >
      <div class="zlht-zj-wrapper">
        <div style="width:40%;border: 1px solid;">
          <h1 class="zlht-zj-title">业态</h1>
          <div style="overflow-y:auto;height:470px;cursor:pointer">
            <el-tree
              class="filter-tree"
              :data="ytTreeList"
              node-key="id"
              :props="defaultProps"
              :highlight-current="true"
              :expand-on-click-node="false"
              :default-expand-all="true"
              @node-click="clickTreeItem"
              ref="tree">
            </el-tree>
          </div>
        </div>
        <div style="width:40%;border:1px solid">
           <h1 class="zlht-zj-title">已选业态</h1>
           <el-row style="line-height:30px;padding:0 10px;">{{form.bizEntityJson.oper2}}</el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showYtChoose = false">确 定</el-button>
        <el-button @click="showYtChoose = false">取消</el-button>
      </span>
    </el-dialog>
  
  </div>
</template>

<script>
const data = {};
const uploadUrl = '';
export default {
  data() {
    return {
      form: data,
      uploadUrl,
      // 以下为本身需要数据
      options1: [],
      options2: [],
      options3: [],
      options4: [], // 品牌下拉
      options5: [],
      ytTreeList: [],
      zcmList: [], // 注册名下拉列表
      floorList: [],
      checkedFloor: '',
      storeList: [],
      showYtChoose: false,
      showSpChoose: false,
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      zujinList: [], // 原租金list
      newzujinlist: [], // 变更租金list
      days: '' // 开始结束之间相隔时间
    }
  },
  props: ['data'],
	watch: {
		data: {
			immediate: true,
      deep: true,
			handler: function(val) {
				this.form = val;
			}
    },
    showYtChoose(val) {
      if(val) {
        this.zlhtQuickSerchContYT();
      }
    },
    showSpChoose(val) {
      if(val) {
        this.doStoreSelectWithProjectId();
      }
    }
	},
  created() {
    if(!this.$route.query.id) {
      this.$set(this.form.bizEntityJson,'otherProperties',[]);
      this.form.bizEntityJson.otherProperties.push({});
    }
  },
  methods: {
    // 改变合同开始结束时间
    changeDate(val) {
      console.log(val)
      let startDate = this.form.bizEntityJson.conOpenDate2;
      let endDate = this.form.bizEntityJson.conEndDate2;
      if(startDate && endDate) {
        var s = startDate.replace(/-/g,'');
        var e = endDate.replace(/-/g,'');
        if(s > e) {
          this.$message.error('开始时间不能大于结束时间')
          this.form.bizEntityJson[val] = '';
          return;
        }
        // 获取年数
        const params = {
          startDate,
          endDate
        }
        this.$approval.scContractQuickSearchPreBill(params).then(res => {
          if(res.code == 1 && res.data){
            var years = res.data;
            var yearArray = years.split("_");
            var yearCount = yearArray.length;
            let arr = [];
            let arr2 = this.newzujinlist;
            for(let i=0;i< yearCount;i++) {
              arr.push(arr2[0])
            }
            this.newzujinlist = arr;
          } else {
            this.$$message.error('数据异常，请重试')
          }
        });
      }
    },
    // 增加条款
    addTk() {
      this.form.bizEntityJson.otherProperties.push({});
    },
    // 删除条款
    delTk(index) {
      if(this.form.bizEntityJson.otherProperties.length == 1) {
        this.$message.error('必须至少有一条条款')
        return
      }
      this.form.bizEntityJson.otherProperties.splice(index,1);
    },
     // 模糊搜索补充协议文本库编号
    searchContract(contractNo) {
      if (contractNo !== '') {
        const params = {contractNo};
        this.$approval.quickSearchForBcxy(params).then(res => {
          if(res.code == 1 && res.data){
            this.options1 = res.data;
          } else {
            this.options1 = [];
          }
        });
      } else {
        this.options1 = [];
      }
    },
     // 模糊搜索租赁合同编号
    quickSerchCont(value) {
      if (value !== '') {
        const params = {value,projectCd:'',statusCd:''};
        this.$approval.quickSerchCont(params).then(res => {
          if(res.code == 1 && res.data){
            this.options2 = res.data;
          } else {
            this.options2 = [];
          }
        });
      } else {
        this.options2 = [];
      }
    },
    // 批量绑定字段函数
    bindValue(data) {
      const params = {
        bisContId: 'contId', contNo: 'contNo', bisProjectId: 'projectId', bisProjectName: 'projectName',
        bisProjectCd: 'projectCd', bisStoreIds: 'bisStoreIds', bisStoreNos: 'bisStoreNos', swtjResId: 'resSwtjId',
        htpsResId: 'resHtpsId', swtjDisplayNo: 'swtjDisplayNo', htpsDisplayNo: 'htpsDisplayNo', shopConnId: 'bisShopConnId1',
        bisShopId: 'bisShopId1', bisShopName: 'shopName1', shopConnName: 'bisShopConnName1', operTypeCd: 'operTypeCd',
        partA: 'partA', partAAddr: 'partAAddr', partAPeop: 'partAPeop', partB: 'partB1', partBAddr: 'partBAddr1', partBPeop: 'partBPeop1',
        proportionNames: 'oper1', proportionIds: 'oper1Ids', rentSquare: 'calcArea1', prMrgSquare: 'prMgrArea1', signDate: 'deliveryDay1',
        rentStart: 'leaseStartRule1', agreeDeliveryDate: 'handDate1', lastOpenDate: 'openDate1', actualOpenDate: 'appointLastOpenDate1',
        contStartDate: 'resBeginData1', contEndDate: 'resEndData1', freePeriod11: 'freePeriod11', freePeriod21: 'freePeriod21', freePeriod31: 'freePeriod31',
        remark: 'rentFeeAmt81', advanceRentMoney: 'rateRent1', payCycleCd: 'rentPaymentCycle1', rentLastPayDate: 'rentLastDateRule1',
        propMargFee: 'compMgrAmt11', prMrgDate: 'billingStartDay1', advanceMargMoney: 'rateSynthesizeManageFee1', propPayCycleCd: 'managerFeePaymentCycle1',
        propertyLastPayDate: 'synthesizeMmanagerFeeLastRule1', fitmentStartDate: 'fitmentStartDate1', fitmentEndDate: 'fitmentEndDate1',
        decorationMargMoney: 'fitmentManageStandard1', earnestMoney: 'strikeEnsureRent1', margSecurity: 'strikeEnsurePropertyManageFee1',
        propertySecurity: 'strikeEnsureFee1', violateMoney: 'defaultAmt1', payWay: 'rentFeeType1', commissionPayment:'commissionPayment1',
        yuanZhuJinHTML: 'rentFeeAmt11', rentFeeAmt: 'rentFeeAmt31', rentFeeTotal: 'rentFeeTotal',
        isAirConditioner: 'isAirConditioner', isSyjType: 'isSyjType',registeredBrand: 'registeredBrand1',quickSearchCont:'quickSearchCont',resApproveCounts:'resApproveCounts'
      };
      for(var key in params) {
        this.$set(this.form.bizEntityJson,params[key],data[key]);
      }
      if(this.form.bizEntityJson.rentFeeType1 == 1) {
        this.$set(this.form.bizEntityJson,'rentFeeType11',true);
      }
      if(this.form.bizEntityJson.rentFeeType1 == 2) {
        this.$set(this.form.bizEntityJson,'rentFeeType12',true);
      }
      if(this.form.bizEntityJson.rentFeeType1 == 3 || this.form.bizEntityJson.rentFeeType1 == 4) {
        this.$set(this.form.bizEntityJson,'rentFeeType13',true);
      }
    },
     // 查询合同详情
    quickSerchContDetail(bisContId) {
      const id = bisContId;
      const value = this.options2.find(e => e.contNo == id)
      bisContId = value.bisContId;
      if (bisContId !== '') {
        const params = {bisContId,resType:3};
        this.$approval.quickSerchContDetail(params).then(res => {
          if(res.code == 1 && res.data){
            const data = res.data;
            this.zujinList = data.countRent;
            this.newzujinlist = data.countRent;
            this.bindValue(data);
            return;
            this.$set(this.form.bizEntityJson,'contId',data.bisContId);
            // this.$set(this.form.bizEntityJson,'contNo',data.contNo);
            this.$set(this.form.bizEntityJson,'projectId',data.bisProjectId);
            this.$set(this.form.bizEntityJson,'projectName',data.bisProjectName);
            this.$set(this.form.bizEntityJson,'projectCd',data.bisProjectCd);
            this.$set(this.form.bizEntityJson,'bisStoreIds',data.bisStoreIds);
            this.$set(this.form.bizEntityJson,'bisStoreNos',data.bisStoreNos);
            this.$set(this.form.bizEntityJson,'resSwtjId',data.swtjResId);
            this.$set(this.form.bizEntityJson,'resHtpsId',data.htpsResId);
            this.$set(this.form.bizEntityJson,'swtjDisplayNo',data.swtjDisplayNo);
            this.$set(this.form.bizEntityJson,'htpsDisplayNo',data.htpsDisplayNo);
            this.$set(this.form.bizEntityJson,'bisShopConnId1',data.shopConnId);
            this.$set(this.form.bizEntityJson,'bisShopId1',data.bisShopId);
            this.$set(this.form.bizEntityJson,'shopName1',data.bisShopName);
            this.$set(this.form.bizEntityJson,'bisShopConnName1',data.shopConnName);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'partA',data.partA);
            this.$set(this.form.bizEntityJson,'partAAddr',data.partAAddr);
            this.$set(this.form.bizEntityJson,'partAPeop',data.partAPeop);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
            this.$set(this.form.bizEntityJson,'operTypeCd',data.operTypeCd);
          } else {
            this.options = [];
          }
        });
      } else {
        this.options = [];
      }
    },
     // 查询租金减免网批
    scContractQuickSearchPreBill(displyNo) {
      if (displyNo !== '') {
        const params = {displyNo};
        this.$approval.scContractQuickSearchPreBill(params).then(res => {
          if(res.code == 1 && res.data){
            this.options3 = res.data;
          } else {
            this.options3 = [];
          }
        });
      } else {
        this.options = [];
      }
    },
    // 品牌列表查询
    zlhtQuickSearchSWTJNew(name) {
      if (name !== '') {
        const params = {name};
        this.$approval.zlhtQuickSearchSWTJNew(params).then(res => {
          if(res.code == 1 && res.data){
            this.options4 = res.data;
          } else {
            this.options4 = [];
          }
        });
      } else {
        this.option4 = [];
      }
    },
     // 经销商列表查询
    quickSerchContJXS(item) {
      this.zcmList = [
        {label: item.shopNameCn,value: item.shopNameCn},
        {label: item.shopNameEn,value: item.shopNameEn},
      ]
      const bisShopId = item.bisShopId;
      if (bisShopId !== '') {
        // const params = {bisProjectId:'',bisShopId:'402834e5330ae861013310aab9331144'};
        const params = {bisProjectId:'',bisShopId};
        this.$approval.quickSerchContJXS(params).then(res => {
          if(res.code == 1 && res.data){
            this.options5 = res.data;
          } else {
            this.options5 = [];
          }
        });
      } else {
        this.option4 = [];
      }
    },
    // 业态查询
    zlhtQuickSerchContYT(name) {
        const params = {};
        this.$approval.zlhtQuickSerchContYT(params).then(res => {
          if(res.code == 1 && res.data){
            this.ytTreeList = res.data.children;
          } else {
            this.ytTreeList = [];
          }
        });
    },
    // 点击业态树
    clickTreeItem(v,node) {
      console.log(v,node)
      if(node.isLeaf) {
        let result = this.getTreeNode(node);
        console.log(result)
        this.$set(this.form.bizEntityJson,'oper2',result)
      }
    },
    // 递归获取业态树层级
     getTreeNode(node,result=''){
      if (node) {
        if (node.label !== undefined) {
          result = result ? node.label + '-' + result : node.label;
          return this.getTreeNode(node.parent,result); //递归
        } else {
          return result;
        }
      }
    },
    // 楼层查询
    doStoreSelectWithProjectId(name) {
        const params = {projectCd: '1030'};
        this.$approval.doStoreSelectWithProjectId(params).then(res => {
          if(res.code == 1 && res.data){
            this.floorList = res.data;
          } else {
            this.floorList = [];
          }
        });
    },
     // 根据楼层加载商铺/公寓/多经列表
    loadStoreList(bisFloorId,storeNo = '') {
        this.checkedFloor = bisFloorId;
        // const params = {floorType: '1',bisFloorId:'402834e53c5ac7c6013c5fdfec4524d4',storeNo: ''};
        const params = {floorType: '1',bisFloorId,storeNo};
        this.$approval.loadStoreList(params).then(res => {
          if(res.code == 1 && res.data){
            this.storeList = res.data.bisfollor || [];
          } else {
            this.storeList = [];
          }
        });
    },
    setSp(v) {
      console.log(v)
      this.$set(this.form.bizEntityJson,'rentArea2',v.storeNo)
      this.$set(this.form.bizEntityJson,'calcArea2',v.feeSquare)
      this.$set(this.form.bizEntityJson,'prMgrArea2',v.feeSquare)
    },
    removeSp() {
      this.$set(this.form.bizEntityJson,'rentArea2','')
      this.showSpChoose = false;
    }
  }
}
</script>
