<template>
  <!-- 全部组件整理，需要复制到后台模板配置  start -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <!-- el-row为最外层Layout 布局，24为空间内分为24等份 -->
    <el-row>
      <!-- dl-col为封装组件，24为占满一整行 -->
      <!-- 12为占满半行 -->
      <dl-col :span="24" place="title relative top right">
        <h2>占位100%标题</h2>
        <i v-if="isShow" class="el-icon-arrow-up put-icon" @click="isShow = !isShow"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow = !isShow"></i>
      </dl-col>
      <div v-if="isShow">
        <dl-col :span="12" place="title">
          <h2>占位50%标题，右侧带添加按钮位</h2>
        </dl-col>
        <dl-col :span="12" place="right" />
        <dl-col :span="12" title="输入框(必填)" :novalue="!form.bizEntityJson.deptName">
          <el-input v-model="form.bizEntityJson.deptName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" title="输入框(非必填)" place="right">
          <el-input v-model="form.bizEntityJson.totalOvertimeHour" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="24" title="带提醒" tip="这里是提醒文字描述" place="right">
          <el-input v-model="form.bizEntityJson.totalOvertimeHour" />
        </dl-col>
        <dl-col :span="12" title="正整数" :novalue="!form.bizEntityJson.deptName1">
          <el-input v-model="form.bizEntityJson.deptName1" v-limit-number="0" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" title="保留小数点2位" tip="补.00 并设置为千分位,限制15个字符" place="right">
          <el-input v-model="form.bizEntityJson.totalOvertimeHour2" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" title="输入框带选择中心组件" :novalue="!form.bizEntityJson.sendOrgName">
          <el-input v-model="form.bizEntityJson.sendOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
        </dl-col>
        <dl-col :span="12" title="输入框带选择人员组件" place="right" :novalue="!form.bizEntityJson.userName">
          <el-input v-model="form.bizEntityJson.userName" @focus="showSearchUser = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
        </dl-col>
        <dl-col :span="8" title="一行三个">
          <el-input v-model="form.bizEntityJson.totalOvertimeHour" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <!-- 不写文字带占位 -->
        <dl-col :span="8" title="">
          <el-input v-model="form.bizEntityJson.totalOvertimeHour" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <!-- 不写title不占位 -->
        <dl-col :span="8" place="url right">
          <p class="openUrl-p">这里是一个跳转地址</p>
        </dl-col>
        <!-- 导入台账是否成功 1待导入，2成功，3失败 -->
        <dl-col v-if="form.status == '完成'" :span="24" place="right">
          <el-input v-if="form.pmApprove.createdUserId == userInfo.userid && form.isLedgerShow != 2" v-model="form.bizEntityJson.totalOvertimeHour" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <!-- 当前审批节点cd -->
        <dl-col v-if="$route.query.id && form.currNodeCd == 2" :span="24" place="right">
          <el-input v-model="form.bizEntityJson.totalOvertimeHour" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="24" title="textarea支持回车" place="top-bold right" :novalue="!form.bizEntityJson.applyContent">
          <el-input v-model="form.bizEntityJson.applyContent" type="textarea" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="24" title="textarea默认3行高度" place="right" :novalue="!form.bizEntityJson.applyContent">
          <el-input v-model="form.bizEntityJson.applyContent" type="textarea" :autosize="{ minRows: 3}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" title="一行两个高度跟随最大" place="span-auto" :novalue="!form.bizEntityJson.applyContent">
          <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.applyContent" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </dl-col>
        <dl-col :span="12" title="一行两个高度跟随最大" place="span-auto right" :novalue="!form.bizEntityJson.applyContent">
          <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.applyContent" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </dl-col>
        <dl-col :span="12" title="下拉框写死数据">
          <el-select v-model="form.bizEntityJson.currencyAmt" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option label="人民币" value="CNY"></el-option>
            <el-option label="美元" value="USD"></el-option>
            <el-option label="港元" value="HKD"></el-option>
            <el-option label="欧元" value="EUR"></el-option>
            <el-option label="新加坡币" value="SGD"></el-option>
            <el-option label="英镑" value="GBP"></el-option>
            <el-option label="澳门币" value="MOP"></el-option>
            <el-option label="日元" value="JPY"></el-option>
          </el-select>
        </dl-col>
        <dl-col :span="12" title="下拉框请求数据" place="right">
          <el-select v-model="form.bizEntityJson.currencyAmt" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option v-for="item in currencyAmtOptions" :key="item.dictCd" :label="item.dictName" :value="item.dictCd"></el-option>
          </el-select>
        </dl-col>
        <dl-col :span="12" title="带模糊搜索下拉框" :novalue="!form.bizEntityJson.acctUnitName">
          <el-select
            v-model="form.bizEntityJson.acctUnitName"
            filterable
            remote
            clearable
            @change="acctUnitNameChange"
            :remote-method="remoteMethod"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
              v-for="item in acctUnitNameOptions"
              :key="item.companyCode"
              :label="item.companyName"
              :value="item.companyName">
            </el-option>
          </el-select>
        </dl-col>
        <dl-col :span="12" title="单选框单个字段" place="right" :novalue="!form.bizEntityJson.involvingRelatedDept">
          <el-radio-group v-model="form.bizEntityJson.involvingRelatedDept">
            <el-radio label="1">地产</el-radio>
            <el-radio label="2">事业部</el-radio>
            <el-radio label="3">商业公司</el-radio>
          </el-radio-group>
        </dl-col>
        <dl-col :span="12" title="单选多字段字符" :novalue="form.bizEntityJson.positionLevel11 != 'true' && form.bizEntityJson.positionLevel22 != 'true' && form.bizEntityJson.positionLevel33 != 'true'">
          <d-radio-group-string
            v-model="form.bizEntityJson" 
            :nameList="[{label:'地产',name:'positionLevel11'},
                        {label:'事业部',name:'positionLevel22'},
                        {label:'商业公司',name:'positionLevel33'}
                      ]"
          />
        </dl-col>
        <dl-col :span="12" title="单选多字段布尔" place="right" :novalue="!form.bizEntityJson.positionLevel44 && !form.bizEntityJson.positionLevel55 && !form.bizEntityJson.positionLevel66">
          <d-radio-group-boolean
            v-model="form.bizEntityJson" 
            :nameList="[{label:'地产',name:'positionLevel44'},
                        {label:'事业部',name:'positionLevel55'},
                        {label:'商业公司',name:'positionLevel66'}
                      ]"
          />
        </dl-col>
        <!-- 没有true-label和false-label 默认选择是Boolean类型true 未选中是false -->
        <dl-col :span="12" title="复选框单个选项" tip="Number类型0=勾选，1=未勾选">
          <el-checkbox v-model="form.bizEntityJson.urgency1" :true-label="0" :false-label="1">急</el-checkbox>
        </dl-col>
        <dl-col :span="12" title="复选框单个选项" tip="String0=勾选，1=未勾选" place="right">
          <el-checkbox v-model="form.bizEntityJson.urgency2" true-label="0" false-label="1">急</el-checkbox>
        </dl-col>
        <dl-col :span="12" title="复选框多个选项" tip="每个选项独立字段" :novalue="!form.bizEntityJson.frequency0 && !form.bizEntityJson.frequency1 && !form.bizEntityJson.frequency2">
          <el-checkbox v-model="form.bizEntityJson.frequency0">上午上班</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.frequency1">中午</el-checkbox>
          <el-checkbox v-model="form.bizEntityJson.frequency2">下午下班</el-checkbox>
        </dl-col>
        <dl-col :span="12" title="复选框多个选项" tip="所有选项一个字段，数组" place="right" :novalue="!form.bizEntityJson.frequency[0]">
          <el-checkbox-group v-model="form.bizEntityJson.frequency">
            <el-checkbox label="上午上班"></el-checkbox>
            <el-checkbox label="中午"></el-checkbox>
            <el-checkbox label="下午下班"></el-checkbox>
          </el-checkbox-group>
        </dl-col>
      </div>
      <dl-col :span="12" place="title relative">
        <h2>table表格</h2>
        <i v-if="isShow" class="el-icon-arrow-up put-icon" @click="isShow = !isShow"></i>
        <i v-else class="el-icon-arrow-down put-icon" @click="isShow = !isShow"></i>
      </dl-col>
      <dl-col :span="12" place="right">
        <div class="explain-p">
          <p class="explain-p-one">
            <span v-if="!form.bizEntityJson.disabled" class="explain-btn-add" @click="addList">添加</span>
            <span v-if="!form.bizEntityJson.disabled" class="explain-btn-add" @click="sumList">添加合计</span>
          </p>
        </div>
      </dl-col>
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.scenes" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column label="费用名称" prop="feeName">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.feeName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.feeName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </template>
          </el-table-column>
          <!-- 打印时隐藏该列 -->
          <el-table-column label="场景" prop="sceneConfigName" class-name="no-print">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.sceneConfigName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.sceneConfigName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </template>
          </el-table-column>
          <el-table-column label="费用承担部门" prop="centerName">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.centerName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.centerName" @focus="showSearchOrg = true; selectIndex = scope.$index" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </template>
          </el-table-column>
          <el-table-column label="预算科目" prop="subjectName">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.subjectName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.subjectName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </template>
          </el-table-column>
          <el-table-column label="立项金额(元)" prop="projectAmount">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.projectAmount, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.projectAmount" @change="projectAmountChange(scope.$index, $event)" v-filter-check-input :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </template>
          </el-table-column>
          <el-table-column label="审批金额(元)" prop="approveAmount" class-name="show-print" />
          <el-table-column label="审批金额(元)" prop="approveAmount" class-name="no-print">
            <template slot-scope="scope">
              <el-input v-model="scope.row.approveAmount" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" v-if="!$route.query.id">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="searchBudget(scope.row)">操作按钮</el-button>
              <el-button v-if="scope.$index > 0" type="text" size="mini" style="color: #EF2941; margin-left: 0;" @click="remove(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
      <dl-col :span="24" place="table right">
        <el-table ref="table" :data="form.bizEntityJson.scenes3" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column label="科目名称" prop="feeName" align="center">
            <template slot-scope="scope">
              <el-input v-if="scope.row.feeName != '合计'" :class="{'novalue': !scope.row.feeName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.feeName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
              <span v-else>合计</span>
            </template>
          </el-table-column>
          <el-table-column label="调整前" align="center">
            <el-table-column label="科目金额(不含税)" prop="sceneConfigName" align="center">
              <template slot-scope="scope">
                <el-input v-if="scope.row.feeName != '合计'" :class="{'novalue': !scope.row.sceneConfigName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.sceneConfigName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
                <span v-else>{{ scope.row.sceneConfigName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="科目金额(含税)" prop="centerName" align="center">
              <template slot-scope="scope">
                <el-input v-if="scope.row.feeName != '合计'" :class="{'novalue': !scope.row.centerName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.centerName" @focus="showSearchOrg = true; selectIndex = scope.$index" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
                <span v-else>{{ scope.row.centerName }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="调整后" align="center">
            <el-table-column label="科目金额(不含税)" prop="subjectName" align="center">
              <template slot-scope="scope">
                <el-input v-if="scope.row.feeName != '合计'" :class="{'novalue': !scope.row.subjectName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.subjectName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
                <span v-else>{{ scope.row.subjectName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="科目金额(含税)" prop="projectAmount" align="center">
              <template slot-scope="scope">
                <el-input v-if="scope.row.feeName != '合计'" :class="{'novalue': !scope.row.projectAmount, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.projectAmount" @change="projectAmountChange(scope.$index, $event)" v-filter-check-input :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
                <span v-else>{{ scope.row.projectAmount }}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </dl-col>
      <dl-col :span="24" place="title">
        <h2>固定表格(title文字根据span宽度适应)</h2>
      </dl-col>
      <dl-col :span="4" />
      <dl-col :span="5" place="title">
        <h2>含税</h2>
      </dl-col>
      <dl-col :span="5" place="title">
        <h2>税率(%)</h2>
      </dl-col>
      <dl-col :span="5" place="title">
        <h2>税额</h2>
      </dl-col>
      <dl-col :span="5" place="title right">
        <h2>不含税</h2>
      </dl-col>
      <dl-col :span="4" title="原合同总价" place="title-auto" />
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.taxPrice" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.taxRate" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.taxRatePrice" readonly />
      </dl-col>
      <dl-col :span="5" place="right">
        <el-input v-model="form.bizEntityJson.noTaxPrice" readonly />
      </dl-col>
      <dl-col :span="4" title="已确认合同总价（结算前）" place="title-auto" />
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.taxPrice" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.taxRate" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.taxRatePrice" readonly />
      </dl-col>
      <dl-col :span="5" place="right">
        <el-input v-model="form.bizEntityJson.noTaxPrice" readonly />
      </dl-col>
      <dl-col :span="4" title="已结算合同总价（含税预估）" place="title-auto" />
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.taxPrice" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.taxRate" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.taxRatePrice" readonly />
      </dl-col>
      <dl-col :span="5" place="right">
        <el-input v-model="form.bizEntityJson.noTaxPrice" readonly />
      </dl-col>
      <dl-col :span="4" title="已审批总额" place="title-auto" />
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.taxPrice" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.taxRate" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.taxRatePrice" readonly />
      </dl-col>
      <dl-col :span="5" place="right">
        <el-input v-model="form.bizEntityJson.noTaxPrice" readonly />
      </dl-col>
      <dl-col :span="12" place="title">
        <h2>固定表格动态添加(title文字根据span宽度适应)</h2>
      </dl-col>
      <dl-col :span="12" place="right">
        <div class="explain-p">
          <p class="explain-p-one">
            <span v-if="!form.bizEntityJson.disabled" class="explain-btn-add" @click="addList2">添加</span>
          </p>
        </div>
      </dl-col>
      <dl-col :span="4" />
      <dl-col :span="5" place="title">
        <h2>含税</h2>
      </dl-col>
      <dl-col :span="5" place="title">
        <h2>税率(%)</h2>
      </dl-col>
      <dl-col :span="5" place="title">
        <h2>税额</h2>
      </dl-col>
      <dl-col :span="5" place="title right">
        <h2>不含税</h2>
      </dl-col>
      <div v-for="(item, index) in form.bizEntityJson.scenes2" :key="index">
        <dl-col :span="4" title="原合同总价" place="title-auto" />
        <dl-col :span="5">
          <el-input v-model="item.taxPrice" readonly />
        </dl-col>
        <dl-col :span="5">
          <el-input v-model="item.taxRate" readonly />
        </dl-col>
        <dl-col :span="5">
          <el-input v-model="item.taxRatePrice" readonly />
        </dl-col>
        <dl-col :span="5" place="right">
          <el-input v-model="item.noTaxPrice" readonly />
        </dl-col>
      </div>
      <dl-col :span="24" title="单个附件上传(新)" place="right" :novalue="!form.bizEntityJson.acceptancePic1">
        <one-file :form="form" value="acceptancePic1" />
      </dl-col>
      <dl-col :span="24" title="多个附件上传(新)" place="right" :novalue="!form.bizEntityJson.fileId">
        <many-files :form="form" value="fileId" />
      </dl-col>
      <dl-col :span="12" title="日期控件" tip="日期格式为2020-01-01" :novalue="!form.bizEntityJson.noPlayCardDate">
        <el-date-picker v-model="form.bizEntityJson.noPlayCardDate" type= "month" value-format="yyyy-MM" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col :span="12" title="时间控件" tip="时间格式为11:30，限制09:00-18:00可选择" place="right" :novalue="!form.bizEntityJson.beOutEndDate">
        <el-time-select v-model="form.bizEntityJson.beOutEndDate" :picker-options="{start: '09:00', step: '00:30', end: '18:00'}" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col :span="12" title="日期时间控件" tip="日期格式为2020-01-01" :novalue="!form.bizEntityJson.noPlayCardDate">
        <el-date-picker v-model="form.bizEntityJson.noPlayCardDate2" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :default-value="new Date()" :default-time="new Date().format('hh:mm:ss')" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col :span="12" place="right"></dl-col>
    </el-row>
    <el-row class="padding-row">
      <dl-col :span="24" place="title top right">
        <h2>独立出下个分区，增加对上间距</h2>
      </dl-col>
      <dl-col :span="12" place="title">
        <h2>单行文字描述，50%占位，右侧带空行</h2>
      </dl-col>
      <dl-col :span="12" place="right" />
      <!-- 黑色字 -->
      <dl-col :span="24" place="right">
        <p class="explain-p-one">此项属于编程开发类工作，如需要调整某个模块的数据，请选择“数据调整”</p>
      </dl-col>
      <!-- 红色字 -->
      <dl-col :span="24" place="right">
        <div class="explain-p">
          <p class="explain-p-one">此项属于编程开发类工作，如需要调整某个模块的数据，请选择“数据调整”</p>
        </div>
      </dl-col>
      <dl-col :span="12" place="title">
        <h2>多行文字描述，50%占位，右侧带空行</h2>
      </dl-col>
      <dl-col :span="12" place="right" />
      <dl-col :span="24" place="right">
        <div class="explain-p">
          <p>1、已完成网批的内容修改只能选“已完成网批驳回”。</p>
          <p>2、如修改合同数据中和定标网批不一致的，必须选择“已完成网批驳回”，选定标网批。</p>
          <p>3、“相关中心总经理”必须增加申请业务相关的负责的总经理级相关审批人，如涉及多个业务条线须多选，不得遗漏。</p>
        </div>
      </dl-col>
    </el-row>
    <el-row :gutter="24" class="padding-row">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>
            <el-checkbox v-model="form.bizEntityJson.isManual" true-label="true" false-label="false">手工录入</el-checkbox>
            账号
          </span>
          <el-select v-if="form.bizEntityJson.isManual != 'true'" :class="{'novalue': !form.bizEntityJson.receiveAcctNo, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveAcctNo" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option value="62212344567898787"></el-option>
            <el-option value="62212344567898788"></el-option>
            <el-option value="62212344567898789"></el-option>
          </el-select>
          <el-input v-else :class="{'novalue': !form.bizEntityJson.receiveAcctNo, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveAcctNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </div>
      </el-col>
      <!-- 有大写金额转换建议限制输入金额为15位 -->
      <el-col :span="12">
        <div class="d-min">
          <span>输入金额转换大写</span>
          <el-input v-model="form.bizEntityJson.jine" v-filter-check-number maxlength="15" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span style="display: flex;">
            (大写)
            <el-input v-model="form.bizEntityJson.currency2" style="margin: 0 10px;" />
            币
          </span>
          <el-input :value="form.bizEntityJson.jine === '' || form.bizEntityJson.jine === undefined ? '千 佰 拾 万 仟 佰 拾 元 角 分' : convertCurrency(form.bizEntityJson.jine)" readonly />
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min" style="overflow: hidden;">
          <span class="span-auto">多个附件上传(旧)</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.fileId, 'required': !form.bizEntityJson.disabled}">
            <el-upload
              name="fileName"
              :headers="{'Authorization': userInfo.token}"
              :accept="$action"
              :action="uploadUrl"
              :data="{userName: form.userInfo.username,bizFileName: 'fileId',bizId:form.bizId}"
              :before-remove="beforeRemoveGlobal"
              :before-upload="beforeUploadGlobal"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleErrorGlobal"
              :on-preview="downLoadFileGlobal"
              :file-list="form.allEntityFileIds.fileId"
              style="display: flex;">
              <el-button v-if="!form.bizEntityJson.disabled" type="text" size="mini">上传附件</el-button>
            </el-upload>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col textBtn-col">
        <div class="d-min">
          <span>单个附件上传(旧)</span>
          <el-upload
            name="fileName"
            :headers="{'Authorization': userInfo.token}"
            :accept="$action"
            :action="uploadUrl"
            :show-file-list="false"
            :data="{userName: form.userInfo.username,bizFileName: 'fileId',bizId:form.bizId}"
            :before-remove="beforeRemoveGlobal"
            :before-upload="beforeUploadGlobal"
            :on-success="handleSuccess"
            :on-error="handleErrorGlobal"
            :on-preview="downLoadFileGlobal"
            :file-list="form.allEntityFileIds.fileId"
            style="display: flex;">
            <el-button v-if="!form.bizEntityJson.disabled" type="text" size="mini">上传附件</el-button>
          </el-upload>
          <p v-if="fileDetail" class="file-p">
            <span class="upload-title">
              <i class="el-icon-document"></i>
              <span class="fj-title">{{ fileDetail.name }}</span>
            </span>
            <span class="upload-del">
              <i class="el-icon-close" @click="delFile(1)"></i>
            </span>
          </p>
          <p v-else-if="$route.query.id && form.allEntityFileIds.fileId" class="file-p">
            <span class="upload-title">
              <i class="el-icon-document"></i>
              <span class="fj-title">{{ form.allEntityFileIds.fileId[0].name }}</span>
            </span>
            <span v-if="!form.bizEntityJson.disabled" class="upload-del">
              <i class="el-icon-close" @click="delFile(2)"></i>
            </span>
          </p>
        </div>
      </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.sendOrgCd" @close="closeSearhOrg" />
    <search-user :open="showSearchUser && !form.bizEntityJson.disabled" @close="closeSearhUser" />
  </div>
  <!-- end -->
</template>

<script>
const uploadUrl = 'api/file/uploadFile' // 本地模板变量赋值，不需要传到后台模板
export default {
  data() {
    return {
      form: {}, // 本地form声明，不需要复制到模板内容配置
      // form: data, // 线上form声明，需要复制到模板内容配置
      loading: false, // 模糊搜索下拉loading
      isShow: true,
      acctUnitNameOptions: [], // 模糊搜索下拉请求options
      currencyAmtOptions: [], // 下拉框数据请求options
      showSearchOrg: false, // 中心、部门组件打开关闭状态
      showSearchUser: false, // 人员组件打开关闭状态
      uploadUrl, // 附件上传所需变量(旧版需要)
      fileDetail: null, // 单个附件上传所需变量(旧版需要)
      selectIndex: 0, // 点击table输入框获取index
      userInfo: {},
    }
  },
  /* 本地模板编译需要的数据回传，不需要上传到后台 start */
  props: ['data'],
	watch: {
		data: {
			immediate: true,
			handler: function(val) {
				this.form = val
			}
		}
  },
  /* end */
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      // 中心名称和cd
      this.$set(this.form.bizEntityJson, 'sendOrgName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'sendOrgCd', this.userInfo.centerOrgCd)
      // 部门名称
      this.$set(this.form.bizEntityJson, 'departmentName', this.userInfo.orgName)
      // 人员名称和cd
      this.$set(this.form.bizEntityJson, 'userName', this.userInfo.username)
      this.$set(this.form.bizEntityJson, 'applyUser', this.userInfo.userid)
      // 职位名称
      this.$set(this.form.bizEntityJson, 'position', this.userInfo.positionName)
      // 职级
      this.$set(this.form.bizEntityJson, 'positionLevel', this.userInfo.permissionLevelName)
      // 入职日期
      this.$set(this.form.bizEntityJson, 'joinDate', this.userInfo.attendWorkDate)
      // 币种
      this.$set(this.form.bizEntityJson, 'currency2', '人民')
      // 单个选择复选框赋值未选中
      this.$set(this.form.bizEntityJson, 'urgency1', 1)
      this.$set(this.form.bizEntityJson, 'urgency2', '1')
      // 复选框多个选项一个字段，建立数组
      this.$set(this.form.bizEntityJson, 'frequency', [])
      // table建立数组
      this.$set(this.form.bizEntityJson, 'scenes', [])
      // 固定表格建立数组
      this.$set(this.form.bizEntityJson, 'scenes2', [])
      // 表头包含table
      this.$set(this.form.bizEntityJson, 'scenes3', [])
      this.addList()
      this.addList2()
      // 获取币种下拉框数据
      this.findByDictTypeCd()
    }
  },
  methods: {
    remoteMethod(query) {
      if (query) {
        this.loading = true
        this.$approval.postFindCompanyList({companyName: query}).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.acctUnitNameOptions = res.data
            } else {
              this.acctUnitNameOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.acctUnitNameOptions = []
      }
    },
    acctUnitNameChange(val) {
      let obj = this.acctUnitNameOptions.find(item => item.companyName == val)
      // 赋值查询到公司cd
      this.form.bizEntityJson.acctUnitCd = obj ? obj.companyCode : ''
    },
    // 获取币种下拉框数据
    findByDictTypeCd() {
      const param = {
        companyId: 1,
        dictTypeCdList: ['FIN_BZ']
      }
      this.$approval.findByDictTypeCd(param).then(res => {
        if(res.code == 1 && res.data) {
          this.currencyAmtOptions = res.data.FIN_BZ
          this.$set(this.form.bizEntityJson, 'currencyAmt', res.data.FIN_BZ[0].dictCd)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 关闭中心组建回调
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.sendOrgName = val.text
        this.form.bizEntityJson.sendOrgCd = val.id
      }
      this.showSearchOrg = false
    },
    // 关闭人员组件回调
    closeSearhUser(val) {
      if (val) {
        this.form.bizEntityJson.userName = val.userName
        this.form.bizEntityJson.userCd = val.userCd
      }
      this.showSearchUser = false
    },
    /* 多个附件上传方法(旧版需要) start */
    handleRemove(file, fileList) {
      this.handleRemoveGlobal.bind(this, file)()
    },
    handleSuccess(res, file, fileList) {
      this.handleSuccessGlobal.bind(this, res, file)()
    },
    /* end */
    /* 单个附件上传方法(旧版需要) start */
    delFile(index) {
      if (index == 1) {
        this.fileDetail = ''
        this.form.bizEntityJson.fileId = ''
      } else {
        this.form.allEntityFileIds.fileId = []
        this.form.bizEntityJson.fileId = ''
      }
    },
    handleSuccess(res, file, fileList) {
      this.handleSuccessGlobal.bind(this, res, file, 1)()
    },
    /* end */
    // 添加table行数据
    addList() {
      let newData = {
        feeName: '',
        sceneConfigName: '',
        centerName: '',
        centerCd: '',
        subjectName: '',
        projectAmount: '',
        approveAmount: '',
      }
      this.form.bizEntityJson.scenes.push(newData)
      this.form.bizEntityJson.scenes3.push(newData)
    },
    sumList() {
      let newData = {
        feeName: '合计',
        sceneConfigName: '70000万元',
        centerName: '77679万元',
        subjectName: '80000万元',
        projectAmount: '95358万元'
      }
      this.form.bizEntityJson.scenes3.push(newData)
    },
    // 计算
    projectAmountChange(index, val) {
      this.form.bizEntityJson.scenes[index].approveAmount = val
      let sum = 0
      for (let key in this.form.bizEntityJson.scenes) {
        sum += Number(this.form.bizEntityJson.scenes[key].projectAmount)
      }
      this.$set(this.form.bizEntityJson, 'totalProjectAmount', sum)
    },
    // 操作按钮点击事件
    searchBudget(val) {
      console.log(val)
    },
    // 删除
    remove(index) {
      if (this.form.bizEntityJson.scenes.length > 0) {
        this.form.bizEntityJson.scenes.splice(index, 1)
      }
    },
    // 添加table行数据
    addList2() {
      let newData = {
        taxPrice: '',
        taxRate: '',
        taxRatePrice: '',
        noTaxPrice: ''
      }
      this.form.bizEntityJson.scenes2.push(newData)
    },
    // 删除
    remove2(index) {
      if (this.form.bizEntityJson.scenes2.length > 0) {
        this.form.bizEntityJson.scenes2.splice(index, 1)
      }
    },
  }
}
</script>
/* 本地模板编译需要的css，不需要上传到后台 */
<style type="text/css" lang="scss">
@import '../publicSheet/publicSheet.scss';
</style>
