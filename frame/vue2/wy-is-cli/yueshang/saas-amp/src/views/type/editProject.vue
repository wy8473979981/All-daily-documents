<template>
  <div>
    <el-drawer
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      :wrapperClosable="false"
      size="576px">
      <div class="dialog-close-icon" @click="cancel">
        <i></i>
      </div>
      <div class="drawer-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col :span="6">
            <h3 v-show="!id">新增</h3>
            <h3 v-show="id">编辑</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button type="success" @click="submit">提交</el-button>
            <el-button plain @click="cancel">取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div>
            <!-- <h3 class="min-title">存量资产</h3> -->
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="d-min">
                  <span>投前项目</span>
                  <el-input v-model="info.name" :disabled="(projectType && projectType !== 3)?true:false" placeholder="请输入项目名称"></el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>业态</span>
                  <el-select class="required" v-model="info.layout" :disabled="id?true:false" filterable placeholder="请选择">
                    <el-option
                      v-for="item in selectLayoutList"
                      :key="item.layoutId"
                      :label="item.name"
                      :value="item.layoutId">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="12">
                <div class="d-min">
                  <span>地产开发事业部</span>
                  <el-select class="required" v-model="info.depart" filterable placeholder="请选择">
                    <el-option
                      v-for="item in estate_devlop_divisionList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>省</span>
                  <el-select class="required" v-model="info.province" filterable @change="getCity('city')" placeholder="请选择">
                    <el-option
                      v-for="item in provinceList"
                      :key="item.cityId"
                      :label="item.name"
                      :value="item.cityId">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="12">
                <div class="d-min">
                  <span>市</span>
                  <el-select class="required" v-model="info.city" filterable @change="getCity('county')" placeholder="请选择">
                    <el-option
                      v-for="item in cityList"
                      :key="item.cityId"
                      :label="item.name"
                      :value="item.cityId">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>区</span>
                  <el-select class="required" v-model="info.county" filterable placeholder="请选择">
                    <el-option
                      v-for="item in countyList"
                      :key="item.cityId"
                      :label="item.name"
                      :value="item.cityId">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="12">
                <div class="d-min">
                  <span>开业日期</span>
                  <el-date-picker
                    class="required"
                    v-model="openTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择">
                  </el-date-picker>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import TypeApi from '@/apis/apis/typeApi'
import CalculationApi from '@/apis/apis/income/calculation/calculationApi'
import Global from '@/apis/apis/global'
export default {
  name: 'createStock',
  props: ['open', 'id', 'row'],
  data () {
    return {
      projectList: [],
      info: {
        name: null, // 存量项目
        depart: null, // 地产开发事业部
        layout: null, // 业态
        province: null, // 省
        city: null, // 市
        county: null, // 区
        openTime: null
      },
      estate_devlop_divisionList: [], // 事业部列表
      selectLayoutList: [], // 业态列表
      provinceList: [], // 省
      cityList: [], // 市
      countyList: [], // 区
      openTime: null,
      projectType: null // 项目类型
    }
  },
  created () {
    this.getLayoutList()// 业态
    this.getDictionary(1)// 事业部
    this.getProvince() // 省
    this.getCity() // 市、区
  },
  computed: {
    fast: {
      get () {
        return this.open
      },
      set (val) {
        this.$emit('close', { fast: false })
      }
    }
  },
  watch: {
    id (nv, v) {
      if (nv) {
        const { name, depart, layout, id, province, city, county, openTime, type } = JSON.parse(JSON.stringify(this.row))
        this.info = { name, depart, layout, id, province, city, county, openTime }
        this.openTime = openTime
        this.projectType = type
        this.getCity('county2')
        this.getCity()
      } else {
        this.info = {
          name: null, // 存量项目
          depart: null, // 地产开发事业部
          layout: null, // 业态
          province: null, // 省
          city: null, // 市
          county: null // 区
        }
      }
    }
  },
  mounted () {
  },
  beforeDestroy () {

  },
  methods: {
    async getProvince () {
      await TypeApi.getProvince().then(res => {
        if (res.code === 200) {
          this.provinceList = res.result.list
        }
      })
    },
    async getCity (type) {
      let pid = this.info.province
      if (type === 'county' || type === 'county2')pid = this.info.city
      if (type === 'county') this.info.county = null
      if (type === 'city') {
        this.info.city = null
        this.info.county = null
      }
      await TypeApi.getCity({ pid: pid }).then(res => {
        if (res.code === 200) {
          if (type === 'county' || type === 'county2') {
            this.countyList = res.result.list
          } else {
            this.cityList = res.result.list
          }
        }
      })
    },
    async getLayoutList () {
      // 业态集合
      try {
        await CalculationApi.getLayoutList().then(res => {
          if (res.code === 200) {
            this.selectLayoutList = res.result.list
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getDictionary (type) {
      // 字典表
      const params = { type: type }
      await Global.getDictionary(params).then(res => {
        if (res && res.result) {
          this.estate_devlop_divisionList = res.result.list
        }
      })
    },
    resetData () {
      this.info = {
        name: null, // 存量项目
        depart: null, // 地产开发事业部
        layout: null // 业态
      }
    },
    submit () {
      if (!this.info.name) return this.$message.error('请选择输入项目名称')
      if (!this.info.layout) return this.$message.error('请选择业态')
      if (!this.info.depart) return this.$message.error('请选择地产开发事业部')
      if (!this.openTime) return this.$message.error('请选择开业时间')
      this.info.openTime = new Date(this.openTime)
      if (!this.id) {
        TypeApi.addProject(this.info).then(res => {
          if (res.code === 200) {
            this.resetData()
            this.$emit('close', {
              fast: false,
              reload: true
            })
          }
        })
      } else {
        TypeApi.addProject({ id: this.id, ...this.info }).then(res => {
          if (res.code === 200) {
            this.resetData()
            this.$emit('close', {
              fast: false,
              reload: true
            })
          }
        })
      }
    },
    cancel () {
      this.resetData()
      this.fast = false
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@styles/common.scss';
.dialog-close-icon{
  right: 562px;
}
</style>
<style>
.city-cascader .el-input {
  display: flex;
}
.city-popper .el-cascader-panel .el-cascader-menu__wrap {
  height: 400px;
}
</style>
