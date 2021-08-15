<template>
  <!-- 总部人事变动表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row v-if="processCode!='MSG_XZGL_RL_30'">
      <dl-col :span="24" v-if="processCode=='RLZY_ZBRS_10'" title="选择" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2 && !form.bizEntityJson.positionLevel3
       && !form.bizEntityJson.positionLevel4 && !form.bizEntityJson.positionLevel6">
        <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[{label:'文化集团总经理',name:'positionLevel1'},
                        {label:'总经理级/副总经理级/财务负责人',name:'positionLevel2'},
                        {label:'书藏楼、典藏部负责人',name:'positionLevel3'},
                        {label:'书藏楼、典藏部其他人员',name:'positionLevel4'},
                        {label:'其他人员',name:'positionLevel6'}
                      ]" />
      </dl-col>
      <dl-col :span="24" v-else-if="processCode=='MSG_XZGL_RL_70'" title="选择" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2 && !form.bizEntityJson.positionLevel3
       && !form.bizEntityJson.positionLevel4 && !form.bizEntityJson.positionLevel5 && !form.bizEntityJson.positionLevel6">
        <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[{label:'业务体系内部人员',name:'positionLevel1'},
                        {label:'业务体系部门负责人',name:'positionLevel2'},
                        {label:'业务体系内副总级',name:'positionLevel3'},
                        {label:'业务体系财务人员',name:'positionLevel4'},
                        {label:'业务体系总经理级',name:'positionLevel5'},
                        {label:'库房负责人',name:'positionLevel6'}
                      ]" />
      </dl-col>
      <dl-col :span="24" v-else-if="processCode=='ZXGS_RSBD'" title="选择" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2 && !form.bizEntityJson.positionLevel3">
        <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[{label:'总经理级及以上',name:'positionLevel1'},
                        {label:'经理级及以上',name:'positionLevel2'},
                        {label:'主管级及以下',name:'positionLevel3'}
                      ]" />
      </dl-col>
      <dl-col :span="24" v-else-if="processCode=='XZRS_RLZY_8'" title="选择" place="top right">
        <d-radio-group-boolean v-if="form.bizEntityJson.positionLevel2 != null" v-model="form.bizEntityJson" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2" :nameList="[{label:'M9及以上',name:'positionLevel1'},
                        {label:'其他人员',name:'positionLevel2'}
                      ]" />
        <d-radio-group-boolean v-else v-model="form.bizEntityJson" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.newRank1 && !form.bizEntityJson.newRank2" :nameList="[{label:'M9及以上',name:'positionLevel1'},
                        {label:'其他M序列',name:'newRank1'},
                        {label:'P序列',name:'newRank2'}
                      ]" />
      </dl-col>
      <dl-col :span="24" v-else-if="processCode=='XZRS_RLZY_3100'" title="选择" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2 && !form.bizEntityJson.positionLevel3">
        <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[{label:'部门负责人',name:'positionLevel1'},
                        {label:'高级经理及以上人员（非部门负责人）',name:'positionLevel2'},
                        {label:'经理级及以下人员',name:'positionLevel3'}
                      ]" />
      </dl-col>
      <dl-col :span="24" v-else-if="processCode=='XZRS_RLZY_80'" title="选择" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2 && !form.bizEntityJson.positionLevel3">
        <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[{label:'总经理级及以上',name:'positionLevel1'},
                        {label:'部门负责人',name:'positionLevel2'},
                        {label:'其他人员',name:'positionLevel3'}
                      ]" />
      </dl-col>
      <dl-col :span="24" v-else title="选择" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2 && !form.bizEntityJson.positionLevel7
       && !form.bizEntityJson.positionLevel8">
        <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[{label:'总经理级及以上',name:'positionLevel1'},
                        {label:'副总经理级及以下人员',name:'positionLevel2'},
                        {label:'副总监(含)及以上(创想实验室)',name:'positionLevel7'},
                        {label:'副总监以下(创想实验室)',name:'positionLevel8'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-if="processCode!='MSG_XZGL_RL_30' && processCode!='MSG_XZGL_RL_70' && processCode!='RLZY_ZBRS_10' &&
			processCode!='XZRS_RLZY_8'&& processCode!='XZRS_RLZY_3100' && processCode!='XZRS_RLZY_80' && processCode!='XZRS_RLZYSY_30' && processCode!='XZRS_RLZY_30' && processCode!='CHJZ_RLZYGL_A_1_5'">
      <dl-col :span="24" title="专业条线" place="right" :novalue="!form.bizEntityJson.positionCategory1 && !form.bizEntityJson.positionCategory2 && !form.bizEntityJson.positionCategory3">
        <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[{label:'成本、技术',name:'positionCategory1'},
                        {label:'运营',name:'positionCategory2'},
                        {label:'其他人员',name:'positionCategory3'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row v-else-if="processCode=='MSG_XZGL_RL_30'">
      <dl-col :span="24" title="选择" place="right" :novalue="!form.bizEntityJson.positionLevel4 && !form.bizEntityJson.positionLevel3 && !form.bizEntityJson.positionLevel5">
        <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[{label:'总经理级/副总经理级/财务负责人',name:'positionLevel4'},
                        {label:'部门负责人/双线人员',name:'positionLevel3'},
                        {label:'其他人员',name:'positionLevel5'}
                      ]" />
      </dl-col>
    </el-row>
    <el-row>
      <dl-col :span="24" title="中心" :novalue="!form.bizEntityJson.centerName">
        <el-input v-if="resApproveInfoId==null" v-model="form.bizEntityJson.centerName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
        <el-input v-else v-model="form.bizEntityJson.centerName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
      </dl-col>
      <dl-col v-if="form.bizEntityJson.adjustItem11" :span="8" title="姓名" place="right" :novalue="!form.bizEntityJson.userName">
        <el-input v-model="form.bizEntityJson.userName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col v-else :span="8" title="姓名" place="right" :novalue="!form.bizEntityJson.userName">
        <el-input v-model="form.bizEntityJson.userName" @focus="showSearchUser = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
      </dl-col>
      <dl-col :span="16">
      </dl-col>
      <dl-col :span="8" title="职位" :novalue="!form.bizEntityJson.positionName">
        <el-input v-model="form.bizEntityJson.positionName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="8" title="入职日期" :novalue="!form.bizEntityJson.enterDate">
        <el-date-picker v-model="form.bizEntityJson.enterDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col :span="8" title="生效日期" :novalue="!form.bizEntityJson.effectDate">
        <el-date-picker v-model="form.bizEntityJson.effectDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col v-if="processCode=='XZRS_RLZY_30' || processCode=='XZRS_RLZYSY_30' || processCode=='XZRS_RLZY_8' || processCode=='XZRS_RLZY_80' || processCode=='XZRS_RLZY_3100'" :span="24" title="用工类别" place="right" :novalue="!form.bizEntityJson.userKind1 && !form.bizEntityJson.userKind2 && !form.bizEntityJson.userKind3">
        <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[{label:'正式工',name:'userKind1'},
                        {label:'临时工',name:'userKind2'},
                        {label:'实习生',name:'userKind3'}
                      ]" />
      </dl-col>
      <dl-col v-else :span="24" title="用工类别" place="right" :novalue="!form.bizEntityJson.userKind1 && !form.bizEntityJson.userKind2 && !form.bizEntityJson.userKind3 
      && !form.bizEntityJson.userKind4 && !form.bizEntityJson.userKind5 && !form.bizEntityJson.userKind6">
        <dl-col :span="24">
          <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[{label:'正式工',name:'userKind1'},
                        {label:'临时工',name:'userKind2'},
                        {label:'实习生',name:'userKind3'}
                      ]" />
        </dl-col>
        <dl-col :span="24">
          <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[{label:'外聘',name:'userKind4'},
                        {label:'外派',name:'userKind5'},
                        {label:'外籍',name:'userKind6'}
                      ]" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" title="调整项目" place="right" id="table_chk">
        <dl-col :span="24">
          <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[{label:'新聘',name:'adjustItem11'},
                        {label:'提前转正',name:'adjustItem2_2'},
                        {label:'转正',name:'adjustItem2_1'},
                        {label:'工资变动',name:'adjustItem6'}
                      ]" />
          <div class="explain-p" v-if="processCode=='XZRS_RLZY_30' || processCode=='XZRS_RLZYSY_30' || processCode=='XZRS_RLZY_8' || processCode=='XZRS_RLZY_80'">
            <p class="explain-p-one">(仅适用于①跨城市调动 ②职位变动)</p>
          </div>
        </dl-col>
        <dl-col :span="24" v-if="processCode!='XZRS_RLZY_30' && processCode!='XZRS_RLZY_30_SH'">
          <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[{label:'临时借调',name:'adjustItem8'},
                        {label:'升职',name:'adjustItem3'},
                        {label:'降职',name:'adjustItem4'},
                        {label: processCode=='XZRS_RLZY_30' || processCode=='XZRS_RLZY_30_SH' ? '内部调动(公司与公司)' : processCode=='XZRS_RLZY_8'|| processCode=='XZRS_RLZY_80' ? '内部调动(平调)' : '内部调动(中心与中心)',name:'adjustItem5'},
                        {label: processCode=='BLSY_XZRL_RLZY_10' || processCode=='SYGS_XZRL_RLZY_40' ? '内部调动(总部与公司)' : processCode=='XZRS_RLZY_8'|| processCode=='XZRS_RLZY_80' ? '内部调动(异地调动)' : '内部调动(中心与公司)' ,name:'adjustItem13'}
                      ]" />
        </dl-col>
        <dl-col :span="24" v-else>
          <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[{label:'临时借调',name:'adjustItem8'},
                        {label:'升职',name:'adjustItem3'},
                        {label:'降职',name:'adjustItem4'},
                        {label: processCode=='XZRS_RLZY_30' || processCode=='XZRS_RLZY_30_SH' ? '内部调动(公司与公司)' : processCode=='XZRS_RLZY_8'|| processCode=='XZRS_RLZY_80' ? '内部调动(平调)' : '内部调动(中心与中心)',name:'adjustItem5'}
                      ]" />
        </dl-col>
        <dl-col :span="24">
          <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[{label:'奖励',name:'adjustItem9'},
                        {label:'惩罚',name:'adjustItem10'},
                        {label:'退休返聘',name:'adjustItem23'},
                        {label: processCode!='XZRS_RLZY_30' &&  processCode!='XZRS_RLZYSY_30' &&  processCode!='XZRS_RLZY_8' || processCode!='XZRS_RLZY_80' ? '其他' : '兼职',name:'adjustItem7'}
                      ]" />
          <dl-col :span="6" v-if="processCode!='XZRS_RLZY_30' &&  processCode!='XZRS_RLZYSY_30' &&  processCode!='XZRS_RLZY_8' || processCode!='XZRS_RLZY_80'">
            <el-input v-model="form.bizEntityJson.adjustOther" :disabled="!form.bizEntityJson.adjustItem7" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
          </dl-col>
        </dl-col>
      </dl-col>
      <dl-col v-if="form.bizEntityJson.adjustItem23" :span="8" title="退休日期" :novalue="!form.bizEntityJson.tireDate">
        <el-date-picker v-model="form.bizEntityJson.tireDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col v-if="form.bizEntityJson.adjustItem23" :span="8" title="最后工作日期" :novalue="!form.bizEntityJson.lastDate" place="right">
        <el-date-picker v-model="form.bizEntityJson.lastDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col v-if="form.bizEntityJson.adjustItem8" :span="24" title="调回日期" id="table_abc">
        <dl-col :span="12" title="" :novalue="!form.bizEntityJson.backTime" place="right">
          <el-date-picker v-model="form.bizEntityJson.backTime" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
        </dl-col>
      </dl-col>
      <dl-col v-if="form.bizEntityJson.adjustItem6 || form.bizEntityJson.adjustItem3" :span="24" title="上传简历" place="right" id="table_popAble" :novalue="!form.bizEntityJson.resumeId">
        <one-file :form="form" value="resumeId" />
      </dl-col>
      <dl-col v-if="form.bizEntityJson.adjustItem6 || form.bizEntityJson.adjustItem3" :span="24" title="上次调薪" place="right">
        <dl-col :span="12" title="调薪时间" :novalue="!form.bizEntityJson.lastSalaAdjuDate">
          <el-date-picker v-model="form.bizEntityJson.lastSalaAdjuDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
        </dl-col>
        <dl-col :span="12" title="调薪幅度" :novalue="!form.bizEntityJson.lastSalaAdjuRage">
          <el-input v-model="form.bizEntityJson.lastSalaAdjuRage" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />

        </dl-col>
      </dl-col>
      <dl-col v-if="processCode=='XZRS_RLZY_30' || processCode=='XZRS_RLZY_30_SH' || processCode=='XZRS_RLZYSY_30'" :span="24" title="本次调薪">
        <dl-col :span="12" title="调薪等级" :novalue="!form.bizEntityJson.salaAdjuLevel1 && !form.bizEntityJson.salaAdjuLevel3">
          <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[{label:'一级',name:'salaAdjuLevel1'},
                        {label:'一级以上',name:'salaAdjuLevel3'}
                      ]" />
        </dl-col>
        <dl-col :span="12" title="调薪幅度" :novalue="!form.bizEntityJson.salaAdjuLevel1 && !form.bizEntityJson.salaAdjuLevel2">
          <d-radio-group-boolean v-model="form.bizEntityJson" :nameList="[{label:'15%以内',name:'salaAdjuLevel1'},
                        {label:'15%以上',name:'salaAdjuLevel2'}
                      ]" />
        </dl-col>
      </dl-col>
      <dl-col v-if="processCode=='XZRS_RLZY_80' || processCode=='XZRS_RLZY_8_SH'" :span="24" title="360考核结果" place="right">
        <dl-col :span="4" title="上级：">
          <el-select v-model="form.bizEntityJson.upSelect" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option label="优秀" value="1"></el-option>
            <el-option label="良好" value="2"></el-option>
            <el-option label="一般" value="3"></el-option>
            <el-option label="较差" value="4"></el-option>
          </el-select>
        </dl-col>
        <dl-col :span="4" title="下级：">
          <el-select v-model="form.bizEntityJson.downSelect" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option label="优秀" value="1"></el-option>
            <el-option label="良好" value="2"></el-option>
            <el-option label="一般" value="3"></el-option>
            <el-option label="较差" value="4"></el-option>
          </el-select>
        </dl-col>
        <dl-col :span="4" title="同事：">
          <el-select v-model="form.bizEntityJson.mateSelect" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option label="优秀" value="1"></el-option>
            <el-option label="良好" value="2"></el-option>
            <el-option label="一般" value="3"></el-option>
            <el-option label="较差" value="4"></el-option>
          </el-select>
        </dl-col>
        <dl-col :span="4" title="客户：">
          <el-select v-model="form.bizEntityJson.custSelect" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option label="优秀" value="1"></el-option>
            <el-option label="良好" value="2"></el-option>
            <el-option label="一般" value="3"></el-option>
            <el-option label="较差" value="4"></el-option>
          </el-select>
        </dl-col>
        <dl-col :span="4" title="素质测评结果" :novalue="!form.bizEntityJson.qualityTest">
          <el-input v-model="form.bizEntityJson.qualityTest" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="4" title="人资中心面谈" :novalue="!form.bizEntityJson.hrTalk">
          <el-input v-model="form.bizEntityJson.hrTalk" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </dl-col>
      <dl-col v-if="processCode!='JD_XZRS_45' && processCode!='BLPM_XZRS_10' && (form.bizEntityJson.adjustItem6 || form.bizEntityJson.adjustItem3)" :span="24" title="绩效考核" place="right">
        <dl-col :span="12" title="上季度成绩" :novalue="!form.bizEntityJson.last1QuarScore">
          <el-input v-model="form.bizEntityJson.last1QuarScore" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" title="上上季度成绩" :novalue="!form.bizEntityJson.last2QuarScore">
          <el-input v-model="form.bizEntityJson.last2QuarScore" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" title="调整内容" place="right">
        <dl-col :span="12" place="title">
          <h2>调整前</h2>
        </dl-col>
        <dl-col :span="12" place="title">
          <h2>调整后</h2>
        </dl-col>
      </dl-col>
      <dl-col :span="24" title="中心/公司" place="right">
        <dl-col :span="12" :novalue="!form.bizEntityJson.centerCdBefore">
          <el-input v-model="form.bizEntityJson.centerCdBefore" @focus="showSearchOrgBefore = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
        </dl-col>
        <dl-col :span="12" :novalue="!form.bizEntityJson.centerCdAfter">
          <el-input v-model="form.bizEntityJson.centerCdAfter" @focus="showSearchOrgAfter = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" title="部门" place="right">
        <dl-col :span="12" :novalue="!form.bizEntityJson.deptCdBefore">
          <el-input v-model="form.bizEntityJson.deptCdBefore" @focus="showSearchDepBefore = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
        </dl-col>
        <dl-col :span="12" :novalue="!form.bizEntityJson.deptCdAfter">
          <el-input v-model="form.bizEntityJson.deptCdAfter" @focus="showSearchDepAfter = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" title="职位" place="right">
        <dl-col :span="12" :novalue="!form.bizEntityJson.positionCdBefore">
          <el-input v-model="form.bizEntityJson.positionCdBefore" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" :novalue="!form.bizEntityJson.positionCdAfter">
          <el-input v-model="form.bizEntityJson.positionCdAfter" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" title="职级" place="right">
        <dl-col :span="12">
          <el-select v-model="form.bizEntityJson.levelBefore" :remote-method="remoteMethod" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option v-for="item in currencyAmtOptions" :key="item.levelBefore" :label="item.levelBefore" :value="item.levelBefore"></el-option>
          </el-select>
        </dl-col>
        <dl-col :span="12">
          <el-select v-model="form.bizEntityJson.levelAfter" :remote-method="remoteMethod" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option v-for="item in currencyAmtOptions" :key="item.levelAfter" :label="item.levelAfter" :value="item.levelAfter"></el-option>
          </el-select>
        </dl-col>
      </dl-col>
      <dl-col :span="24" title="职务" place="right">
        <dl-col :span="12" :novalue="!form.bizEntityJson.positionNameBefore">
          <el-input v-model="form.bizEntityJson.positionNameBefore" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" :novalue="!form.bizEntityJson.positionNameAfter">
          <el-input v-model="form.bizEntityJson.positionNameAfter" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" title="工资" place="right">
        <dl-col :span="12" :novalue="!form.bizEntityJson.salaryBefore">
          <el-input v-model="form.bizEntityJson.salaryBefore" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" :novalue="!form.bizEntityJson.salaryAfter">
          <el-input v-model="form.bizEntityJson.salaryAfter" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" title="外派补贴(元)" place="right">
        <dl-col :span="12">
          <el-input v-model="form.bizEntityJson.foreSubsidyBefore" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12">
          <el-input v-model="form.bizEntityJson.foreSubsidyAfter" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </dl-col>
      <dl-col v-if="processCode=='XZRS_RLZY_8' || processCode=='XZRS_RLZY_80'|| processCode=='XZRS_RLZY_30' || processCode=='XZRS_RLZYSY_30'" :span="24" title="住房补贴(元)" place="right">
        <dl-col :span="12" :novalue="!form.bizEntityJson.houseSubsidyBefore">
          <el-input v-model="form.bizEntityJson.houseSubsidyBefore" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" :novalue="!form.bizEntityJson.houseSubsidyAfter">
          <el-input v-model="form.bizEntityJson.houseSubsidyAfter" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </dl-col>
      <dl-col v-else :span="24" title="住房补贴(元)" place="right">
        <dl-col :span="12">
          <el-input v-model="form.bizEntityJson.houseSubsidyBefore" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12">
          <el-input v-model="form.bizEntityJson.houseSubsidyAfter" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </dl-col>
      <dl-col v-if="processCode=='XZRS_RLZY_8' || processCode=='XZRS_RLZY_80'|| processCode=='XZRS_RLZY_30' || processCode=='XZRS_RLZYSY_30'" :span="24" title="交通补贴(元)" place="right">
        <dl-col :span="12" :novalue="!form.bizEntityJson.trafficSubsidyBefore">
          <el-input v-model="form.bizEntityJson.trafficSubsidyBefore" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" :novalue="!form.bizEntityJson.trafficSubsidyAfter">
          <el-input v-model="form.bizEntityJson.trafficSubsidyAfter" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </dl-col>
      <dl-col v-else :span="24" title="交通补贴(元)" place="right">
        <dl-col :span="12">
          <el-input v-model="form.bizEntityJson.trafficSubsidyBefore" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12">
          <el-input v-model="form.bizEntityJson.trafficSubsidyAfter" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </dl-col>
      <dl-col v-if="processCode=='XZRS_RLZY_8' || processCode=='XZRS_RLZY_80'|| processCode=='XZRS_RLZY_30' || processCode=='XZRS_RLZYSY_30'" :span="24" title="通讯补贴(元)" place="right">
        <dl-col :span="12" :novalue="!form.bizEntityJson.commuSubsidyBefore">
          <el-input v-model="form.bizEntityJson.commuSubsidyBefore" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12" :novalue="!form.bizEntityJson.commuSubsidyAfter">
          <el-input v-model="form.bizEntityJson.commuSubsidyAfter" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </dl-col>
      <dl-col v-else :span="24" title="通讯补贴(元)" place="right">
        <dl-col :span="12">
          <el-input v-model="form.bizEntityJson.commuSubsidyBefore" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12">
          <el-input v-model="form.bizEntityJson.commuSubsidyAfter" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" title="兼职补贴(元)" place="right">
        <dl-col :span="12">
          <el-input v-model="form.bizEntityJson.specialSubsidyBefore" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12">
          <el-input v-model="form.bizEntityJson.specialSubsidyAfter" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" title="其他" place="right">
        <dl-col :span="12">
          <el-input v-model="form.bizEntityJson.otherBefore" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
        <dl-col :span="12">
          <el-input v-model="form.bizEntityJson.otherAfter" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" title="备注" place="right">
        <el-input v-model="form.bizEntityJson.remark" type="textarea" :autosize="{ minRows: 5}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.sendOrgCd" @close="closeSearhOrg" />
    <search-org :open="showSearchOrgBefore && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.sendOrgCdBefore" @close="closeSearhOrgBefore" />
    <search-org :open="showSearchOrgAfter && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.sendOrgCdAfter" @close="closeSearhOrgAfter" />
    <search-org :open="showSearchDepBefore && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.sendDepCdBefore" @close="closeSearhDepBefore" />
    <search-org :open="showSearchDepAfter && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.sendDepCdAfter" @close="closeSearhDepAfter" />
    <search-user :open="showSearchUser && !form.bizEntityJson.disabled" @close="closeSearhUser" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}, // 本地form声明，不需要复制到模板内容配置
      // form: data, // 线上form声明，需要复制到模板内容配置
      userInfo: {},
      processCode: null,
      showSearchOrg: false, // 中心、部门组件打开关闭状态
      showSearchUser: false, // 人员组件打开关闭状态
      showSearchOrgBefore: false, // 中心组件打开关闭状态(调整前)
      showSearchOrgAfter: false, // 中心组件打开关闭状态(调整后)
      showSearchDepBefore: false, // 部门组件打开关闭状态(调整前)
      showSearchDepAfter: false, // 部门组件打开关闭状态(调整后)
      currencyAmtOptions: []
    };
  },
  /* 本地模板编译需要的数据回传，不需要上传到后台 start */
  props: ["data"],
  watch: {
    data: {
      immediate: true,
      handler: function (val) {
        this.form = val;
      },
    },
  },
  /* end */
  created() {
    this.processCode = this.$store.state.menuTreeItem.processCode;
    this.userInfo = JSON.parse(localStorage.getItem("ys_contract_token"));
    if (!this.$route.query.id) {
      // 中心名称和cd
      this.$set(
        this.form.bizEntityJson,
        "centerName",
        this.userInfo.centerOrgName
      );
      this.$set(
        this.form.bizEntityJson,
        "sendOrgCd",
        this.userInfo.centerOrgCd
      );
      this.$set(
        this.form.bizEntityJson,
        "centerCdBefore",
        this.userInfo.centerOrgName
      );
      this.$set(
        this.form.bizEntityJson,
        "sendOrgCdBefore",
        this.userInfo.centerOrgCd
      );
      this.$set(
        this.form.bizEntityJson,
        "centerCdAfter",
        this.userInfo.centerOrgName
      );
      this.$set(
        this.form.bizEntityJson,
        "sendOrgCdAfter",
        this.userInfo.centerOrgCd
      );
      // 部门名称
      this.$set(this.form.bizEntityJson, "deptCdBefore", this.userInfo.orgName);
      this.$set(
        this.form.bizEntityJson,
        "sendDepCdBefore",
        this.userInfo.orgCd
      );
      this.$set(this.form.bizEntityJson, "deptCdAfter", this.userInfo.orgName);
      this.$set(this.form.bizEntityJson, "sendDepCdAfter", this.userInfo.orgCd);
      // 人员名称和cd
      this.$set(this.form.bizEntityJson, "userName", this.userInfo.username);
      this.$set(this.form.bizEntityJson, "applyUser", this.userInfo.userid);
    }
  },
  methods: {
    remoteMethod(query) {
      if (query) {
        Approval.quickSearchRank(query).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.currencyAmtOptions = res.data
            } else {
              this.currencyAmtOptions = []
            }
          }
        })
      } else {
        this.currencyAmtOptions = []
      }
    },
    // 关闭中心组建回调
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerName = val.text;
        this.form.bizEntityJson.sendOrgCd = val.id;
      }
      this.showSearchOrg = false;
    },
    // 关闭中心组建回调(调整前)
    closeSearhOrgBefore(val) {
      if (val) {
        this.form.bizEntityJson.centerCdBefore = val.text;
        this.form.bizEntityJson.sendOrgCdBefore = val.id;
      }
      this.showSearchOrgBefore = false;
    },
    // 关闭中心组建回调(调整后)
    closeSearhOrgAfter(val) {
      if (val) {
        this.form.bizEntityJson.centerCdAfter = val.text;
        this.form.bizEntityJson.sendOrgCdAfter = val.id;
      }
      this.showSearchOrgAfter = false;
    },
    // 关闭部门组建回调(调整前)
    closeSearhDepBefore(val) {
      if (val) {
        this.form.bizEntityJson.deptCdBefore = val.text;
        this.form.bizEntityJson.sendDepCdBefore = val.id;
      }
      this.showSearchDepBefore = false;
    },
    // 关闭部门组建回调(调整后)
    closeSearhDepAfter(val) {
      if (val) {
        this.form.bizEntityJson.deptCdAfter = val.text;
        this.form.bizEntityJson.sendDepCdAfter = val.id;
      }
      this.showSearchDepAfter = false;
    },
    // 关闭人员组件回调
    closeSearhUser(val) {
      if (val) {
        this.form.bizEntityJson.userName = val.userName;
        this.form.bizEntityJson.userCd = val.userCd;
      }
      this.showSearchUser = false;
    },
  },
};
</script>