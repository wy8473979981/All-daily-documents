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
                  <span>存量项目</span>
                  <el-select class="required" v-model="info.project_name" filterable placeholder="请选择">
                    <el-option
                      v-for="(item, index) in projectListBL"
                      :key="index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>权益类型</span>
                  <el-select class="required" v-model="info.type_config_id" placeholder="请选择">
                    <el-option
                      v-for="item in type_config_idList"
                      :key="item.type_config_id"
                      :label="item.name"
                      :value="item.type_config_id">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="12">
                <div class="d-min">
                  <span>地产开发事业部</span>
                  <el-select class="required" v-model="info.estate_devlop_division" filterable placeholder="请选择">
                    <el-option
                      v-for="item in estate_devlop_divisionList"
                      :key="item.type_config_id"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>委托管理公司</span>
                  <el-select class="required" v-model="info.business_area_company" filterable placeholder="请选择">
                    <el-option
                      v-for="item in business_area_companyList"
                      :key="item.type_config_id"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="12">
                <div class="d-min">
                  <span>建筑总面积（不含车库）(㎡)</span>
                  <el-input class="" v-model="info.build_area" v-filter-check-input2 :disabled="true" placeholder="请输入"></el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>车库面积(㎡)</span>
                  <el-input class="" v-model="info.garage_area" v-filter-check-input2 :disabled="true" placeholder="请输入"></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="12">
                <div class="d-min">
                  <span>城市</span>
                  <!-- <el-select class="required" v-model="info.city" filterable placeholder="请选择">
                    <el-option-group
                      v-for="group in cityList.city"
                      :key="group.title"
                      :label="group.title">
                      <el-option
                        v-for="(item, index) in group.lists"
                        :key="index"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-option-group>
                  </el-select> -->
                  <el-cascader
                    class="required city-cascader"
                    popper-class="city-popper"
                    style="width: 258px;"
                    v-model="cityValue"
                    :options="cityList"
                    :show-all-levels="false"
                    :props="{ expandTrigger: 'hover', label: 'name', value: 'name' }"
                    filterable
                    placeholder="请选择">
                  </el-cascader>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>标签</span>
                  <el-select class="required" v-model="info.project_label" filterable placeholder="请选择">
                    <el-option
                      v-for="item in project_labelList"
                      :key="item.type_config_id"
                      :label="item.name"
                      :value="item.type_config_id">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="12">
                <div class="d-min">
                  <span>业态</span>
                  <el-select class="required" v-model="selectLayout" multiple collapse-tags placeholder="请选择">
                    <el-option
                      v-for="item in selectLayoutList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>同步</span>
                  <el-select v-model="info.sync_month_data_status" collapse-tags clearable placeholder="请选择">
                    <el-option
                      v-for="item in synchronization"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
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
export default {
  name: 'createStock',
  props: ['open', 'id', 'row'],
  data () {
    return {
      projectList: [],
      info: {
        project_name: null, // 存量项目
        type_config_id: null, // 权益类型
        estate_devlop_division: null, // 地产开发事业部
        business_area_company: null, // 委托管理公司
        build_area: null, // 建筑总面积（不含车库）
        garage_area: null, // 车库面积
        province: null, // 省
        city: null, // 城市
        project_label: null, // 标签
        layout: null, // 业态
        sync_month_data_status: null// 是否同步
      },
      projectListBL: [],
      type_config_idList: [],
      estate_devlop_divisionList: [],
      business_area_companyList: [],
      // cityList: require("./city.json"),
      cityValue: [],
      cityList: [],
      project_labelList: [],
      selectLayout: [],
      selectLayoutList: [
        {
          value: '1',
          label: '商业'
        },
        {
          value: '2',
          label: '酒店'
        },
        {
          value: '3',
          label: '办公'
        },
        {
          value: '4',
          label: '公寓'
        },
        {
          value: '5',
          label: '车库'
        }
      ],
      synchronization: [{ id: '0', name: '否' }, { id: '1', name: '是' }]
    }
  },
  created () {
    this.getTypeList()
  },
  computed: {
    fast: {
      get () {
        // if (this.row) {
        //   this.info = JSON.parse(JSON.stringify(this.row))
        //   this.cityValue.push(this.info.province, this.info.city)
        //   for (let key in this.cityList) {
        //     for (let i in this.cityList[key].children) {
        //       if (this.info.city == this.cityList[key].children[i].name) {
        //         this.cityValue.push(this.cityList[key].name, this.info.city)
        //       }
        //     }
        //   }
        // }
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
        this.info = JSON.parse(JSON.stringify(this.row))
        if (this.info.layout) {
          this.selectLayout = this.info.layout.split(',')
        } else {
          this.selectLayout = []
        }
        this.cityValue = []
        // this.$nextTick(() => {
        if (this.info.city == '北京市') {
          this.info.province = '北京市'
        }
        if (this.info.city == '上海市') {
          this.info.province = '上海市'
        }
        if (this.info.city == '天津市') {
          this.info.province = '天津市'
        }
        if (this.info.city == '重庆市') {
          this.info.province = '重庆市'
        }
        this.cityValue.push(this.info.province, this.info.city)
        // })
        // for (let key in this.cityList) {
        //   for (let i in this.cityList[key].children) {
        //     if (this.info.city == this.cityList[key].children[i].name) {
        //       this.cityValue.push(this.cityList[key].name, this.info.city)
        //     }
        //   }
        // }
        // this.getList()
      } else {
        this.info = {
          project_name: null,
          type_config_id: null,
          build_area: null,
          garage_area: null,
          estate_devlop_division: null,
          business_area_company: null,
          province: null,
          city: null,
          project_label: null,
          layout: null
        }
        this.cityValue = []
        this.selectLayout = []
      }
    }
  },
  mounted () {
  },
  beforeDestroy () {

  },
  methods: {
    getTypeList () {
      TypeApi.projectBl().then(res => {
        if (res.code === 200 && res.result) {
          this.projectListBL = res.result
        }
      })
      TypeApi.typeDropDown({ project_type: 1 }).then(res => {
        if (res.code === 200 && res.result) {
          this.type_config_idList = res.result.equity
          this.estate_devlop_divisionList = res.result.estate_devlop_division
          this.business_area_companyList = res.result.business_area_company
          this.project_labelList = res.result.project_label
        }
      })
      TypeApi.cityList().then(res => {
        if (res.code === 200 && res.result) {
          for (var key in res.result) {
            this.cityList.push(res.result[key])
          }
        }
      })
    },
    cityChange (val) {
      // this.info.city = val[1]
      // JSON.parse(JSON.stringify(this.row))
      console.log(this.info.city)
      console.log(this.info)
    },
    resetData () {
      this.info = {
        project_name: null, // 存量项目
        type_config_id: null, // 权益类型
        build_area: null, // 建筑总面积（不含车库）
        garage_area: null, // 车库面积
        estate_devlop_division: null, // 地产开发事业部
        business_area_company: null, // 委托管理公司
        province: null, // 省
        city: null, // 城市
        project_label: null, // 标签
        layout: null, // 业态
        sync_month_data_status: null // 是否同步
      }
      this.cityValue = []
      this.selectLayout = []
    },
    submit () {
      if (!this.info.project_name) return this.$message.error('请选择存量项目')
      if (!this.info.type_config_id) return this.$message.error('请选择权益类型')
      // if(!this.info.build_area) return this.$message.error('请输入建筑总面积（不含车库）')
      // if(!this.info.garage_area) return this.$message.error('请输入车库面积')
      if (!this.info.estate_devlop_division) return this.$message.error('请选择地产开发事业部')
      if (!this.info.business_area_company) return this.$message.error('请选择委托管理公司')
      if (this.cityValue[0]) {
        this.info.city = this.cityValue[1]
      } else {
        if (!this.info.city) return this.$message.error('请输入城市')
      }
      if (!this.info.project_label) return this.$message.error('请选择标签')
      if (!this.selectLayout[0]) return this.$message.error('请选择业态')
      this.info.layout = this.selectLayout.join(',')
      this.info.project_type = 1
      if (!this.id) {
        TypeApi.add(this.info).then(res => {
          if (res.code === 200) {
            this.syncData()
            this.resetData()
            this.$emit('close', {
              fast: false,
              reload: true
            })
          }
        })
      } else {
        console.log(this.info)
        TypeApi.edit({ id: this.id, ...this.info }).then(res => {
          if (res.code === 200) {
            this.syncData()
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
    },
    syncData () {
      if (this.info.sync_month_data_status == '1') {
        TypeApi.syncMonth().then(res => {

        })
      }
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
