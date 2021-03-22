<template>
  <div>
    <h2>基础信息录入</h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="项目名称" prop="projectId">
            <el-select v-model="ruleForm.projectId" placeholder="" class="required" filterable @change="getProjectDetail" size="mini" :disabled="disabled">
              <el-option v-for="(item, index) in projectNameList" :label="item.label" :key="index" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="版本编号" prop="version" class="required">
            <el-input v-model="ruleForm.version" size="mini" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="ruleForm.remark" size="mini" :disabled="projectStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="项目业态" prop="layoutName" class="required">
            <el-input v-model="ruleForm.layoutName" size="mini" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="事业部" prop="departName" class="required">
            <el-input v-model="ruleForm.departName" size="mini" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="开业日期" prop="openTime" class="required">
            <el-date-picker v-model="ruleForm.openTime" type="date" placeholder="选择日期" size="mini" :disabled="(!proType || proType === 3)?true:false">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <!-- </el-row> -->
        <!-- <el-row :gutter="20"> -->
        <el-col :span="4">
          <el-form-item label="所在省" prop="provinceName" class="required">
            <el-input v-if="!proType || proType === 3" v-model="ruleForm.provinceName" size="mini" :disabled="true"></el-input>
            <el-select v-else class="" v-model="ruleForm.provinceName" size="mini" filterable @change="getCity('city',$event)" placeholder="请选择">
              <el-option v-for="item in provinceList" :key="item.cityId" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="所在市" prop="cityName" class="required">
            <el-input v-if="!proType || proType === 3" v-model="ruleForm.cityName" size="mini" :disabled="true"></el-input>
            <el-select v-else class="" v-model="ruleForm.cityName" size="mini" filterable @change="getCity('county',$event)" placeholder="请选择">
              <el-option v-for="item in cityList" :key="item.cityId" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="所在区/县" prop="countyName" class="required">
            <el-input v-if="!proType || proType === 3" v-model="ruleForm.countyName" size="mini" :disabled="true"></el-input>
            <el-select v-else class="" v-model="ruleForm.countyName" size="mini" filterable @change="getCity(3,$event)" placeholder="请选择">
              <el-option v-for="item in countyList" :key="item.cityId" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="开发周期(年)" prop="devCycle" class="required">
            <el-select v-model="ruleForm.devCycle" placeholder="" filterable size="mini" :disabled="projectStatus">
              <el-option v-for="(item, index) in developmentCycleList" :label="item.label" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="退出年限(年)" prop="signOutYears" class="required">
            <el-select v-model="ruleForm.signOutYears" placeholder="" filterable size="mini" :disabled="projectStatus">
              <el-option v-for="(item, index) in exitYearList" :label="item.label" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="分摊原则" prop="sharePrinciple" class="required">
            <el-select v-model="ruleForm.sharePrinciple" placeholder="" filterable size="mini" :disabled="projectStatus">
              <el-option v-for="item in allocationConceptList" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- </el-row> -->
        <!-- <el-row :gutter="20"> -->
        <el-col :span="4">
          <el-form-item label="Mall 首年租金单价(元/㎡/月)" prop="rentPrice" title="不考虑免租期及空置率" class="required">
            <el-input v-model="ruleForm.rentPrice" v-filter-check-input size="mini" :disabled="projectStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="首年免租期(月)" prop="rentHoliday">
            <el-input v-model="ruleForm.rentHoliday" v-filter-check-input2 size="mini" :disabled="projectStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="次年免租期(月)" prop="twoRentHoliday">
            <el-input v-model="ruleForm.twoRentHoliday" v-filter-check-input2 size="mini" :disabled="projectStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="第三年免租期(月)" prop="threeRentHoliday">
            <el-input v-model="ruleForm.threeRentHoliday" v-filter-check-input2 size="mini" :disabled="projectStatus"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" style="text-align: right;" v-if="!projectStatus">
          <el-button @click="submitForm('ruleForm','save')" size="mini">保存</el-button>
          <el-button type="primary" @click="submitForm('ruleForm','next')" size="mini">下一步 项目综合指标</el-button>
        </el-col>
        <el-col :span="24" style="text-align: right;" v-else>
          <el-button type="primary" @click="next" size="mini">下一步 项目综合指标</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import CalculationApi from '@/apis/apis/income/calculation/calculationApi'
import TypeApi from '@/apis/apis/typeApi'
import { mapState } from 'vuex'
export default {
  props: {
    formData: {
      type: Object,
      default: {}
    },
    projectStatus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const checkValue = (rule, value, callback) => {
      var ary = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      if (ary.includes(Number(value))) {
        callback()
      } else {
        callback(new Error('仅能输入0-12的整数'))
      }
    }
    return {
      projectNameList: [], // 项目名称
      developmentCycleList: [], // 开发周期
      exitYearList: [], // 退出年限
      businessList: [], // 事业部
      layoutList: [], // 业态
      routerQuery: this.$route.query,
      disabled: false,
      allocationConceptList: [
        {
          label: '全地价',
          value: 1
        }, {
          label: '1/4地价',
          value: 2
        }, {
          label: '0地价',
          value: 3
        }
      ], // 分摊原则
      ruleForm: {
        projectId: null,
        version: null,
        remark: null,
        layout: null,
        layoutName: null,
        depart: null,
        departName: null,
        openTime: null,
        province: null,
        provinceName: null,
        city: null,
        cityName: null,
        county: null,
        countyName: null,
        devCycle: '2',
        signOutYears: '10',
        sharePrincipleName: null,
        sharePrinciple: null,
        rentPrice: null,
        rentHoliday: '0',
        twoRentHoliday: '0',
        threeRentHoliday: '0'
      },
      oldFormData: {},
      rules: {
        projectId: [
          { required: true, message: '请选择项目名称', trigger: ['blur', 'change'] }
        ],
        version: [
          { required: true, message: '版本号必填', trigger: ['blur', 'change'] }
        ],
        remark: [
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: ['blur', 'change'] }
        ],
        layoutName: [
          { required: true, message: '项目业态必填', trigger: ['blur', 'change'] }
        ],
        departName: [
          { required: true, message: '事业部必填', trigger: ['blur', 'change'] }
        ],
        openTime: [
          { required: true, message: '开业日期必填', trigger: ['blur', 'change'] }
        ],
        provinceName: [
          { required: true, message: '所在省必填', trigger: ['blur', 'change'] }
        ],
        cityName: [
          { required: true, message: '所在市必填', trigger: ['blur', 'change'] }
        ],
        countyName: [
          { required: true, message: '所在区/县必填', trigger: ['blur', 'change'] }
        ],
        devCycle: [
          { required: true, message: '开发周期(年)必填', trigger: ['blur', 'change'] }
        ],
        signOutYears: [
          { required: true, message: '退出年限(年)必填', trigger: ['blur', 'change'] }
        ],
        sharePrinciple: [
          { required: true, message: '分摊原则必填', trigger: ['blur', 'change'] }
        ],
        rentPrice: [
          { required: true, message: '请输入Mall 首年租金单价(元/㎡/月)', trigger: ['blur', 'change'] }
        ],
        rentHoliday: [
          { validator: checkValue, trigger: ['blur', 'change'] }
        ],
        twoRentHoliday: [
          { validator: checkValue, trigger: ['blur', 'change'] }
        ],
        threeRentHoliday: [
          { validator: checkValue, trigger: ['blur', 'change'] }
        ]
      },
      virtualWardData: [],
      proType: null, // 项目类型 3投前
      provinceList: [], // 省
      cityList: [], // 市
      countyList: [] // 区
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    this.developmentCycleList = [1, 2, 3, 4, 5, 6].map(item => {
      return { value: item, label: item }
    })
    this.exitYearList = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(item => {
      return { value: item, label: item }
    })
    this.getProvince() // 省
    // this.getCity() // 市、区
  },
  mounted() {
    try {
      this.getProjectList()
      if (this.routerQuery.flag === 'add') {
        this.ruleForm = this.formData
      } else {
        this.ruleForm = this.formData
        this.disabled = true
      }
      this.oldFormData = JSON.parse(JSON.stringify(this.ruleForm));
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async getProjectList() {
      // 项目列表
      try {
        await CalculationApi.getProjectList().then(res => {
          if (res.code === 200) {
            const { result } = res
            this.projectNameList = result.list.map(item => {
              return { label: item.name + (item.layoutName ? ('-' + item.layoutName) : ''), value: item.projectId, type: item.type }
            })
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getProjectDetail(data) {
      try {
        const proObj = this.projectNameList.find(item => item.value === data)
        this.proType = proObj.type
      } catch (e) { }
      // this.proType = result.type
      // 项目-详情
      try {
        const params = {
          projectId: this.ruleForm.projectId
        }
        await CalculationApi.getProjectDetail(params).then(res => {
          if (res.code === 200) {
            const { result } = res
            this.ruleForm = {
              ...this.ruleForm,
              ...result,
              name: result.name, // 项目名称
              projectId: result.projectId, // 项目ID
              version: `V${Number(result.version) + 1}`, // 版本
              layout: result.layout, // 项目业态
              depart: result.depart, // 事业部
              openTime: result.openTime, // 项目开业日期
              province: result.province, // 省
              city: result.city, // 市
              county: result.county// 区，县
            }
            if (result.type) this.proType = result.type
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    submitForm(formName, type) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (type === 'save') {
            const res = await this.saveCreate()
            if (res.code === 200) {
              const { result: { projectResultId } } = res
              this.ruleForm = { ...this.ruleForm, projectResultId: projectResultId }
              this.$message.success('保存成功')
              this.$emit('update:formData', this.ruleForm)
            } else {
              this.$message.error(res.msg)
            }
          } else {
            let oldFormData = JSON.stringify(this.oldFormData);
            let ruleForm = JSON.stringify(this.ruleForm);
            console.log(this.formData.step, 'this.formData.step')
            if (oldFormData == ruleForm) {// 判断当前页面没有修改，step属于当前值时
              let res = await this.saveCreate();
              if (res.code === 200) {
                const { result: { projectResultId } } = res;
                this.ruleForm = { ...this.ruleForm, projectResultId: projectResultId };
                this.$message.success('保存成功');
                this.$emit('update:step', 2)
                this.$emit('update:formData', this.ruleForm)
              } else {
                this.$message.error(res.msg);
              }
            } else {
              this.$confirm('是否保存当前页面录入数据?', '提示', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async () => {
                const res = await this.saveCreate()
                if (res.code === 200) {
                  const { result: { projectResultId } } = res
                  this.ruleForm = { ...this.ruleForm, projectResultId: projectResultId }
                  this.$message.success('保存成功')
                  this.$emit('update:step', 2)
                  this.$emit('update:formData', this.ruleForm)
                } else {
                  this.$message.error(res.msg)
                }
              }).catch(() => {
                return false
              })
            }
          }
        } else {
          return false
        }
      })
    },
    async saveCreate() {
      try {
        const params = {
          ...this.ruleForm,
          projectId: this.ruleForm.projectId,
          version: this.ruleForm.version.replace('V', ''),
          remark: this.ruleForm.remark,
          devCycle: this.ruleForm.devCycle,
          signOutYears: this.ruleForm.signOutYears,
          sharePrinciple: this.ruleForm.sharePrinciple,
          rentPrice: this.ruleForm.rentPrice,
          rentHoliday: this.ruleForm.rentHoliday,
          twoRentHoliday: this.ruleForm.twoRentHoliday,
          threeRentHoliday: this.ruleForm.threeRentHoliday
        }
        return await CalculationApi.saveCreate(params)
      } catch (e) {
        console.log(e)
      }
    },
    next() {
      this.$emit('update:step', 2)
    },
    async getProvince() {
      await TypeApi.getProvince().then(res => {
        if (res.code === 200) {
          this.provinceList = res.result.list
        }
      })
    },
    async getCity(type, name) {
      let proObj = null
      if (type === 3) {
        proObj = this.countyList.find(item => item.name === name)
        this.ruleForm.county = proObj.cityId
        return
      }
      if (type === 'county' || type === 'county2') {
        proObj = this.cityList.find(item => item.name === name)
        this.ruleForm.city = proObj.cityId
      }
      if (type === 'county') {
        this.ruleForm.county = null
        this.ruleForm.countyName = null
      }
      if (type === 'city') {
        proObj = this.provinceList.find(item => item.name === name)
        this.ruleForm.city = null
        this.ruleForm.county = null
        this.ruleForm.cityName = null
        this.ruleForm.countyName = null
        this.ruleForm.province = proObj.cityId
        this.countyList = []
      }
      await TypeApi.getCity({ pid: proObj.cityId }).then(res => {
        if (res.code === 200) {
          if (type === 'county' || type === 'county2') {
            this.countyList = res.result.list
          } else {
            this.cityList = res.result.list
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@styles/common.scss";
::v-deep
  .el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:before {
  display: none;
}
h2 {
  text-align: left;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #222222;
  line-height: 28px;
  margin-bottom: 15px;
}
.el-button--default {
  border: 1px solid #468ceb;
}
.el-button--default:hover {
  background: linear-gradient(298deg, #468ceb 0%, #35abff 100%);
}
.el-button--primary {
  background: linear-gradient(298deg, #468ceb 0%, #35abff 100%);
}
// ::v-deep .el-row {
//   display: flex;
//   justify-content: center;
// }
.demo-ruleForm {
  .el-form-item {
    margin-bottom: 22px;
  }
  .el-input,
  .el-select {
    position: relative;
    font-size: 12px;
    display: inline-block;
    width: 100%;
  }
  ::v-deep .el-form-item__label {
    color: #000;
    line-height: 12px;
  }
  .special-line-height {
    ::v-deep .el-form-item__label {
      line-height: 16px;
    }
  }
}
</style>
