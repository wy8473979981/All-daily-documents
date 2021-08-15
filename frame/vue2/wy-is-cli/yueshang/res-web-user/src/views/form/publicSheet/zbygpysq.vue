<template>
  <!-- 总部员工聘用申请 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row>
      <dl-col :span="24" v-if="processCode=='SYGS_YGPY'" title="项目类型：" place="top right" :novalue="!form.bizEntityJson.isProjectTypeB1 && !form.bizEntityJson.isProjectTypeB2">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'B类项目',name:'isProjectTypeB1'},
                        {label:'非B类项目',name:'isProjectTypeB2'}
                      ]" />
      </dl-col>
      <dl-col :span="24" v-if="processCode=='ZB_YGRZSQ'">
        <dl-col :span="12" v-if="form.bizEntityJson.positionLevel2 !=null" title="选择" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'M9及以上',name:'positionLevel1'},
                        {label:'其他人员',name:'positionLevel2'}
                      ]" />
        </dl-col>
        <dl-col :span="12" v-else title="选择" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.newRank1 && !form.bizEntityJson.newRank2">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'M9及以上',name:'positionLevel1'},
                        {label:'其他M序列',name:'newRank1'},
                        {label:'P序列',name:'newRank2'}
                      ]" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" v-else-if="processCode=='SYB_YGRZSQ'">
        <dl-col :span="12" v-if="form.bizEntityJson.company5 !=null" title="选择" place="top right" :novalue="!form.bizEntityJson.company1 && !form.bizEntityJson.company2 && !form.bizEntityJson.company3 && !form.bizEntityJson.company4 && !form.bizEntityJson.company5 && !form.bizEntityJson.company6">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'事业一部',name:'company1'},
                        {label:'事业二部',name:'company2'},
                        {label:'置地',name:'company3'},
                        {label:'事业三部',name:'company5'},
                        {label:'浙江事业部',name:'company4'},
                        {label:'广东事业部',name:'company6'}
                      ]" />
        </dl-col>
        <dl-col :span="12" v-if="form.bizEntityJson.company5 ==null" title="选择" place="top right" :novalue="!form.bizEntityJson.company1 && !form.bizEntityJson.company2 && !form.bizEntityJson.company3 && !form.bizEntityJson.company4 && !form.bizEntityJson.company6 && !form.bizEntityJson.company7">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'事业一部',name:'company1'},
                        {label:'事业二部',name:'company2'},
                        {label:'置地',name:'company3'},
                        {label:'安徽事业部',name:'company7'},
                        {label:'浙江事业部',name:'company4'},
                        {label:'广东事业部',name:'company6'}
                      ]" />
        </dl-col>
        <dl-col :span="12" v-if="form.bizEntityJson.positionLevel7 !=null || form.bizEntityJson.positionLevel1!=null || form.bizEntityJson.positionLevel2!=null || form.bizEntityJson.positionLevel4!=null" title="选择" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2 && !form.bizEntityJson.positionLevel4 && !form.bizEntityJson.positionLevel7">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'M9及以上',name:'positionLevel7'},
                        {label:'M4-M8;P9-P11',name:'positionLevel1'},
                        {label:'双线职能P7-P8及出纳',name:'positionLevel2'},
                        {label:'其他人员',name:'positionLevel4'}
                      ]" />
        </dl-col>
        <dl-col :span="12" v-else title="选择" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2 && !form.bizEntityJson.positionLevel3 && !form.bizEntityJson.positionLevel4">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'M9及以上',name:'positionLevel1'},
                        {label:'其他M序列',name:'positionLevel2'},
                        {label:'P9及以上',name:'positionLevel3'},
                        {label:'其他P序列',name:'positionLevel4'}
                      ]" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" v-else-if="processCode=='DCGS_YGRZSQ'">
        <dl-col :span="12" v-if="form.bizEntityJson.company5 !=null" title="选择" place="top right" :novalue="!form.bizEntityJson.company1 && !form.bizEntityJson.company2 && !form.bizEntityJson.company3 && !form.bizEntityJson.company4 && !form.bizEntityJson.company5 && !form.bizEntityJson.company6">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'事业一部',name:'company1'},
                        {label:'事业二部',name:'company2'},
                        {label:'置地',name:'company3'},
                        {label:'事业三部',name:'company5'},
                        {label:'浙江事业部',name:'company4'},
                        {label:'广东事业部',name:'company6'}
                      ]" />
        </dl-col>
        <dl-col :span="12" v-if="form.bizEntityJson.company5 ==null" title="选择" place="top right" :novalue="!form.bizEntityJson.company1 && !form.bizEntityJson.company2 && !form.bizEntityJson.company3 && !form.bizEntityJson.company4 && !form.bizEntityJson.company6 && !form.bizEntityJson.company7">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'事业一部',name:'company1'},
                        {label:'事业二部',name:'company2'},
                        {label:'置地',name:'company3'},
                        {label:'安徽事业部',name:'company7'},
                        {label:'浙江事业部',name:'company4'},
                        {label:'广东事业部',name:'company6'}
                      ]" />
        </dl-col>
        <dl-col :span="12" v-if="form.bizEntityJson.positionLevel4 !=null || form.bizEntityJson.positionLevel1!=null || form.bizEntityJson.positionLevel2!=null || form.bizEntityJson.positionLevel4!=null" title="选择" place="top right" :novalue="!form.bizEntityJson.positionLevel1 && !form.bizEntityJson.positionLevel2 && !form.bizEntityJson.positionLevel4 && !form.bizEntityJson.positionLevel7">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'M5-M8;P9-P11',name:'positionLevel1'},
                        {label:'双线职能M1-M4;P7-P8及出纳',name:'positionLevel2'},
                        {label:'非双线职能M1-M4;P7-P8',name:'positionLevel3'},
                        {label:'其他人员',name:'positionLevel4'}
                      ]" />
        </dl-col>
        <dl-col :span="12" v-else title="选择" place="top right" :novalue="!form.bizEntityJson.newPositionLevel1 && !form.bizEntityJson.newPositionLevel2 && !form.bizEntityJson.newPositionLevel3 && !form.bizEntityJson.newPositionLevel4 && !form.bizEntityJson.newPositionLevel5">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'城市公司总经理',name:'newPositionLevel1'},
                        {label:'双线M序列及出纳',name:'newPositionLevel2'},
                        {label:'其他M序列',name:'newPositionLevel5'},
                        {label:'P7及以上',name:'newPositionLevel3'},
                        {label:'其他P序列',name:'newPositionLevel4'}
                      ]" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" v-else-if="processCode=='JDJT_RLZY_YGPY'">
        <dl-col :span="12" title="选择" place="top right" :novalue="!form.bizEntityJson.company1 && !form.bizEntityJson.company2 && !form.bizEntityJson.company3 && !form.bizEntityJson.company4">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'集团总经理',name:'company1'},
                        {label:'总经理级',name:'company2'},
                        {label:'副总经理级',name:'company3'},
                        {label:'其他人员',name:'company4'}
                      ]" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" v-else-if="processCode=='XSJD_XZRS_YGPY'">
        <dl-col :span="12" title="选择" place="top right" :novalue="!form.bizEntityJson.company1 && !form.bizEntityJson.company2 && !form.bizEntityJson.company3 && !form.bizEntityJson.company4">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总经理级',name:'company1'},
                        {label:'部门负责人/总经理助理',name:'company2'},
                        {label:'双线管理部门第一负责人及出纳',name:'company3'},
                        {label:'其他人员',name:'company4'}
                      ]" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" v-else-if="processCode=='WHZB_RLZY_YGPY'">
        <dl-col :span="12" v-if="form.bizEntityJson.company1 !=null || form.bizEntityJson.company2 !=null || form.bizEntityJson.company3 !=null" title="选择" place="top right" :novalue="!form.bizEntityJson.company1 && !form.bizEntityJson.company2 && !form.bizEntityJson.company3">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'执行董事/宝龙艺术中心总经理',name:'company1'},
                        {label:'总经理级/副总经理级/财务负责人/库房负责人',name:'company2'},
                        {label:'其他人员',name:'company3'}
                      ]" />
        </dl-col>
        <dl-col :span="12" v-else title="选择" place="top right" :novalue="!form.bizEntityJson.company11 && !form.bizEntityJson.company22 && !form.bizEntityJson.company33 && !form.bizEntityJson.company44 && !form.bizEntityJson.company55">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'文化集团总经理',name:'company1'},
                        {label:'总经理级/副总经理级/财务负责人',name:'company2'},
                        {label:'书藏楼、典藏部负责人',name:'company3'},
                        {label:'书藏楼、典藏部其他人员',name:'company3'},
                        {label:'其他人员',name:'company3'}
                      ]" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" v-else-if="processCode=='WHJT_RLZY_YGPY'">
        <dl-col :span="12" v-if="form.bizEntityJson.company1 !=null || form.bizEntityJson.company2 !=null || form.bizEntityJson.company3 !=null || form.bizEntityJson.company4 !=null" title="选择" place="top right" :novalue="!form.bizEntityJson.company1 && !form.bizEntityJson.company2 && !form.bizEntityJson.company3 && !form.bizEntityJson.company4">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'艺术中心总经理级/副总经理级/财务负责人/库房负责人',name:'company1'},
                        {label:'艺术中心部门负责人/财务/库房/采购人员',name:'company2'},
                        {label:'美术馆总经理级/副总经理级/财务负责人/库房负责人',name:'company3'},
                        {label:'其他人员',name:'company4'}
                      ]" />
        </dl-col>
        <dl-col :span="12" v-else title="选择" place="top right" :novalue="!form.bizEntityJson.company11 && !form.bizEntityJson.company22 && !form.bizEntityJson.company44">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总经理级/副总经理级/财务负责人',name:'company11'},
                        {label:'部门负责人/双线人员',name:'company22'},
                        {label:'其他人员',name:'company44'}
                      ]" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" title="选择" v-else-if="processCode=='SYJT_YGPY'">
        <dl-col :span="24" title="商业总部：" place="top right" :novalue="!form.bizEntityJson.positionGrade1 && !form.bizEntityJson.positionGrade2 && !form.bizEntityJson.positionGrade3 && !form.bizEntityJson.positionGrade4 && !form.bizEntityJson.positionGrade5 && !form.bizEntityJson.positionGrade6 && !form.bizEntityJson.positionGrade7">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总裁',name:'positionGrade1'},
                        {label:'副总裁',name:'positionGrade2'},
                        {label:'助理总裁',name:'positionGrade3'},
                        {label:'中心总经理',name:'positionGrade4'},
                        {label:'部门总经理',name:'positionGrade5'},
                        {label:'专业总经理',name:'positionGrade6'},
                        {label:'其他人员',name:'positionGrade7'}
                      ]" />
        </dl-col>
        <dl-col :span="24" title="区域公司：" place="top right" :novalue="!form.bizEntityJson.positionGrade8 && !form.bizEntityJson.positionGrade9 && !form.bizEntityJson.positionGrade10 && !form.bizEntityJson.positionGrade11 && !form.bizEntityJson.positionGrade12 && !form.bizEntityJson.positionGrade13 && !form.bizEntityJson.positionGrade14">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总经理',name:'positionGrade8'},
                        {label:'部门总经理',name:'positionGrade9'},
                        {label:'专业总经理',name:'positionGrade10'},
                        {label:'部门总监',name:'positionGrade11'},
                        {label:'专业总监',name:'positionGrade12'},
                        {label:'其他人员(双线)',name:'positionGrade13'},
                        {label:'其他人员(非双线)',name:'positionGrade14'}
                      ]" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" v-else-if="processCode=='SYGS_YGPY'">
        <dl-col :span="12" title="选择" place="top right" :novalue="!form.bizEntityJson.positionGrade1 && !form.bizEntityJson.positionGrade2 && !form.bizEntityJson.positionGrade3 && !form.bizEntityJson.positionGrade4 && !form.bizEntityJson.positionGrade5 && !form.bizEntityJson.positionGrade6 && !form.bizEntityJson.positionGrade7">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总裁',name:'positionGrade1'},
                        {label:'副总经理',name:'positionGrade2'},
                        {label:'专业总监',name:'positionGrade3'},
                        {label:'部门负责人/专业经理(双线)',name:'positionGrade4'},
                        {label:'部门负责人(非双线)',name:'positionGrade5'},
                        {label:'其他人员(双线)',name:'positionGrade6'},
                        {label:'其他人员(非双线)',name:'positionGrade7'}
                      ]" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" v-else-if="processCode=='GGGS_RLZY_YGPY'">
        <dl-col :span="12" title="选择" place="top right" :novalue="!form.bizEntityJson.positionGrade1 && !form.bizEntityJson.positionGrade2 && !form.bizEntityJson.positionGrade3">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'部门负责人',name:'positionGrade1'},
                        {label:'高级经理及以上人员（非部门负责人）',name:'positionGrade2'},
                        {label:'经理级及以下人员',name:'positionGrade3'}
                      ]" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" v-else-if="processCode=='WYGL_RLZY_YGPY'">
        <dl-col :span="12" title="选择" place="top right" :novalue="!form.bizEntityJson.positionGrade1 && !form.bizEntityJson.positionGrade2">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'助理总裁/中心总经理',name:'positionGrade1'},
                        {label:'其他人员',name:'positionGrade2'}
                      ]" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" title="选择" v-else-if="processCode=='WYGS_RLZY_YGPY'">
        <dl-col :span="24" title="城市公司：" place="top right" :novalue="!form.bizEntityJson.positionGrade1 && !form.bizEntityJson.positionGrade2 && !form.bizEntityJson.positionGrade3 && !form.bizEntityJson.positionGrade4 && !form.bizEntityJson.positionGrade5">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总经理',name:'positionGrade1'},
                        {label:'部门总监',name:'positionGrade2'},
                        {label:'部门经理（双线）',name:'positionGrade3'},
                        {label:'部门经理（非双线）、专业经理',name:'positionGrade4'},
                        {label:'其他人员',name:'positionGrade5'}
                      ]" />
        </dl-col>
        <dl-col :span="24" title="物业项目：" place="top right" :novalue="!form.bizEntityJson.positionGrade8 && !form.bizEntityJson.positionGrade9 && !form.bizEntityJson.positionGrade10">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'负责人、部门经理、专业经理',name:'positionGrade8'},
                        {label:'高级专员',name:'positionGrade9'},
                        {label:'专员',name:'positionGrade10'}
                      ]" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" v-else-if="processCode=='GH_XZRS_RLZY_YGPY'">
        <dl-col :span="12" title="选择" place="top right" :novalue="!form.bizEntityJson.positionGrade1 && !form.bizEntityJson.positionGrade2 && !form.bizEntityJson.positionGrade3">
          <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'总经理级以上',name:'positionGrade1'},
                        {label:'部门负责人',name:'positionGrade2'},
                        {label:'其他人员',name:'positionGrade3'}
                      ]" />
        </dl-col>
      </dl-col>
      <dl-col :span="24" v-if="processCode=='SYGS_YGPY'" title="" place="top right" :novalue="!form.bizEntityJson.positionScope1 && !form.bizEntityJson.positionScope2 && !form.bizEntityJson.positionScope3">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'营运期（储备）',name:'positionScope1'},
                        {label:'筹备期（储备）',name:'positionScope2'},
                        {label:'其他',name:'positionScope3'}
                      ]" />
      </dl-col>
    </el-row>

    <el-row>
      <dl-col :span="24" place="title relative top right">
        <h2>基本信息</h2>
      </dl-col>
      <dl-col :span="24" title="招聘编码" place="right" :novalue="!form.bizEntityJson.cadIdDateId">
        <el-select v-model="form.bizEntityJson.cadIdDateId" filterable remote clearable @change="employeeChange" :remote-method="remoteMethod2" :loading="loading">
          <el-option v-for="(item, index) in contractNoOptions" :key="index" :label="item.contNo" :value="item.contNo">
          </el-option>
        </el-select>
      </dl-col>
      <dl-col :span="8" title="姓名" place="right" :novalue="!form.bizEntityJson.name">
        <el-input v-model="form.bizEntityJson.name" readonly />
      </dl-col>
      <dl-col :span="8" title="性别" place="right" :novalue="!form.bizEntityJson.gender">
        <el-input v-model="form.bizEntityJson.gender" readonly />
      </dl-col>
      <dl-col :span="8" title="出生日期" place="right" :novalue="!form.bizEntityJson.birthday">
        <el-input v-model="form.bizEntityJson.birthday" readonly />
      </dl-col>
      <dl-col :span="8" title="籍贯" place="right" :novalue="!form.bizEntityJson.nativePlace">
        <el-input v-model="form.bizEntityJson.nativePlace" readonly />
      </dl-col>
      <dl-col :span="8" title="民族" place="right" :novalue="!form.bizEntityJson.nation">
        <el-input v-model="form.bizEntityJson.nation" readonly />
      </dl-col>
      <dl-col :span="8" title="婚姻状况" place="right" :novalue="!form.bizEntityJson.maritalStatus">
        <el-input v-model="form.bizEntityJson.maritalStatus" readonly />
      </dl-col>
      <dl-col :span="8" title="第一学历" place="right" :novalue="!form.bizEntityJson.educationFirst">
        <el-input v-model="form.bizEntityJson.educationFirst" readonly />
      </dl-col>
      <dl-col :span="8" title="所学专业" place="right" :novalue="!form.bizEntityJson.major">
        <el-input v-model="form.bizEntityJson.major" readonly />
      </dl-col>
      <dl-col :span="8" title="第一学历是否为全日制" place="right" :novalue="!form.bizEntityJson.fullTimeOfFirst">
        <el-input v-model="form.bizEntityJson.fullTimeOfFirst" readonly />
      </dl-col>
      <dl-col :span="8" title="最高学历" place="right" :novalue="!form.bizEntityJson.educationLevel">
        <el-input v-model="form.bizEntityJson.educationLevel" readonly />
      </dl-col>
      <dl-col :span="8" title="最高学位" place="right" :novalue="!form.bizEntityJson.highestDegree">
        <el-input v-model="form.bizEntityJson.highestDegree" readonly />
      </dl-col>
      <dl-col :span="8" title="最高学历是否为全日制" place="right" :novalue="!form.bizEntityJson.fullTimeOfLevel">
        <el-input v-model="form.bizEntityJson.fullTimeOfLevel" readonly />
      </dl-col>
      <dl-col :span="8" title="原公司" place="right" :novalue="!form.bizEntityJson.company">
        <el-input v-model="form.bizEntityJson.company" readonly />
      </dl-col>
      <dl-col :span="8" title="原岗位" place="right" :novalue="!form.bizEntityJson.jobTitle">
        <el-input v-model="form.bizEntityJson.jobTitle" readonly />
      </dl-col>
    </el-row>
    <el-row>
      <dl-col :span="24" place="title relative top right">
        <h2>聘用信息</h2>
      </dl-col>
      <dl-col :span="12" title="中心/公司" place="right" :novalue="!form.bizEntityJson.center">
        <el-input v-model="form.bizEntityJson.center" />
      </dl-col>
      <dl-col :span="12" title="部门" place="right" :novalue="!form.bizEntityJson.department">
        <el-input v-model="form.bizEntityJson.department" />
      </dl-col>
      <dl-col :span="12" title="职位" place="right" :novalue="!form.bizEntityJson.position">
        <el-input v-model="form.bizEntityJson.position" />
      </dl-col>
      <dl-col :span="12" title="职级" place="right" :novalue="!form.bizEntityJson.gender">
        <el-select v-model="form.bizEntityJson.rank" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
          <el-option v-for="item in currencyAmtOptions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </dl-col>
      <dl-col :span="12" title="是否在编制内" place="right" :novalue="!form.bizEntityJson.organizationInner && !form.bizEntityJson.organizationOuter">
        <d-radio-group-string v-model="form.bizEntityJson" :nameList="[{label:'是',name:'organizationInner'},
                        {label:'否',name:'organizationOuter'}
                      ]" />
      </dl-col>
      <dl-col :span="12" title="试用期薪资" place="right" :novalue="!form.bizEntityJson.probationCapital">
        <el-input v-model="form.bizEntityJson.probationCapital" />
      </dl-col>
      <dl-col :span="12" title="试用期月份" place="right" :novalue="!form.bizEntityJson.probationMonth">
        <el-input v-model="form.bizEntityJson.probationMonth" />
      </dl-col>
      <dl-col :span="12" title="转正后薪资" place="right" :novalue="!form.bizEntityJson.formalCapital">
        <el-input v-model="form.bizEntityJson.formalCapital" />
      </dl-col>
      <dl-col :span="12" title="福利" place="right" :novalue="!form.bizEntityJson.welfare">
        <el-input v-model="form.bizEntityJson.welfare" />
      </dl-col>
      <dl-col :span="12" title="简历链接" place="url right">
        <p class="openUrl-p">点击查看简历</p>
      </dl-col>
    </el-row>
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
      loading: false,
      currencyAmtOptions: [],
      employeeOptions: [],
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
      this.remoteMethod("PLAS_PERM_LEVEL");
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== "") {
        query = query.trim();
        this.$approval.quickSearchRank(query).then((response) => {
          if (response.code == 1 && response.data) {
            this.currencyAmtOptions = response.data;
          } else {
            this.currencyAmtOptions = [];
          }
        });
      }
    },
    remoteMethod2(query) {
      if (query) {
        this.loading = true;
        this.$approval.quickSearchEmployee(query).then((res) => {
          if (res.code == 1) {
            this.loading = false;
            if (res.data.length > 0) {
              this.employeeOptions = res.data;
            } else {
              this.employeeOptions = [];
            }
          }
        });
      } else {
        this.employeeOptions = [];
      }
    },
    employeeChange(val) {
      let obj = this.employeeOptions.find((item) => item.contNo == val);
      this.form.bizEntityJson.name = obj ? obj.name : "";
      this.form.bizEntityJson.gender = obj ? obj.gender : "";
      this.form.bizEntityJson.birthday = obj ? obj.birthday : "";
      this.form.bizEntityJson.nativePlace = obj ? obj.nativePlace : "";
      this.form.bizEntityJson.nation = obj ? obj.nation : "";
      this.form.bizEntityJson.maritalStatus = obj ? obj.maritalStatus : "";
      this.form.bizEntityJson.educationFirst = obj ? obj.educationFirst : "";
      this.form.bizEntityJson.major = obj ? obj.major : "";
      this.form.bizEntityJson.fullTimeOfFirst = obj ? obj.fullTimeOfFirst : "";
      this.form.bizEntityJson.educationLevel = obj ? obj.educationLevel : "";
      this.form.bizEntityJson.highestDegree = obj ? obj.highestDegree : "";
      this.form.bizEntityJson.fullTimeOfLevel = obj ? obj.fullTimeOfLevel : "";
      this.form.bizEntityJson.company = obj ? obj.company : "";
      this.form.bizEntityJson.jobTitle = obj ? obj.jobTitle : "";
    },
  },
};
</script>