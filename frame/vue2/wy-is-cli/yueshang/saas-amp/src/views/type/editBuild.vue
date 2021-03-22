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
            <h3>编辑</h3>
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
                  <span>在建项目</span>
                  <el-input class="required" v-model="info.project_name" disabled></el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>汇总业态</span>
                  <el-input class="required" v-model="info.layout" disabled></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="12">
                <div class="d-min">
                  <span>经营期操盘类型</span>
                  <el-select v-model="info.type_config_id" placeholder="请选择">
                    <el-option
                      v-for="item in type_config_idList"
                      :key="item.type_config_id"
                      :label="item.name"
                      :value="item.type_config_id">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>地产开发事业部</span>
                  <el-input class="required" v-model="info.estate_devlop_division" disabled></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="12">
                <div class="d-min">
                  <span>委托管理公司</span>
                  <el-select v-model="info.business_area_company" filterable clearable placeholder="请选择">
                    <el-option
                      v-for="item in business_area_companyList"
                      :key="item.type_config_id"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>城市</span>
                  <el-select class="required" v-model="info.city" filterable disabled>
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
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="12">
                <div class="d-min">
                  <span>建筑总面积(㎡)</span>
                  <el-input class="required" v-model="info.build_area" disabled></el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>委管状态</span>
                  <el-select class="required" v-model="info.entrust_manage_status" placeholder="请选择">
                    <el-option
                      v-for="item in entrust_idList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
<!--              <el-col :span="12">-->
<!--                <div class="d-min">-->
<!--                  <span>标签</span>-->
<!--                  <el-select class="required" v-model="info.project_label" filterable placeholder="请选择">-->
<!--                    <el-option-->
<!--                      v-for="item in project_labelList"-->
<!--                      :key="item.type_config_id"-->
<!--                      :label="item.name"-->
<!--                      :value="item.type_config_id">-->
<!--                    </el-option>-->
<!--                  </el-select>-->
<!--                </div>-->
<!--              </el-col>-->
              <!-- <el-col :span="12">
                <div class="d-min">
                  <span>车库面积</span>
                  <el-input class="required" v-model="info.garage_area" placeholder="请输入" disabled></el-input>
                </div>
              </el-col> -->
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="12">
                <div class="d-min">
                  <span>委托面积(㎡)</span>
                  <el-input v-model="info.entrust_manage_area" placeholder="请输入"></el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>未委托原因</span>
                  <el-input v-model="info.not_entrust_reason" placeholder="请输入" max-length="500"></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:15px;">
              <el-col :span="12">
                <div class="d-min">
                  <span>未分配原因</span>
                  <el-input v-model="info.not_allocation_reason" placeholder="请输入" max-length="500"></el-input>
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
  name: 'editBuild',
  props: ['open', 'id', 'row'],
  data () {
    return {
      projectList: [],
      info: {
        project_name: null, // 存量项目
        layout: null, // 业态
        type_config_id: null, // 权益类型
        estate_devlop_division: null, // 地产开发事业部
        business_area_company: null, // 委托管理公司
        city: null, // 城市
        build_area: null, // 建筑面积
        garage_area: null, // 车库面积
        project_label: null, // 标签
        entrust_manage_status: null, // 委管状态
        entrust_manage_area: null, // 委管面积
        not_entrust_reason: null, // 未委托原因
        not_allocation_reason: null // 未分配原因
      },
      type_config_idList: [],
      business_area_companyList: [],
      cityList: require('./city.json'),
      project_labelList: [],
      entrust_idList: [{ id: '1', name: '是' }, { id: '2', name: '否' }, { id: '3', name: '/' }]
    }
  },
  created () {
    this.getTypeList()
  },
  computed: {
    fast: {
      get () {
        if (this.row) {
          this.info = JSON.parse(JSON.stringify(this.row))
        }
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
        // this.getList()
      } else {
        this.info = {
          project_name: null, // 存量项目
          layout: null, // 业态
          type_config_id: null, // 权益类型
          estate_devlop_division: null, // 地产开发事业部
          business_area_company: null, // 委托管理公司
          city: null, // 城市
          build_area: null, // 建筑面积
          garage_area: null, // 车库面积
          project_label: null, // 标签
          entrust_manage_status: null, // 委管状态
          entrust_manage_area: null, // 委管面积
          not_entrust_reason: null, // 未委托原因
          not_allocation_reason: null // 未分配原因
        }
      }
    }
  },
  mounted () {

  },
  methods: {
    // 获取权益类型列表
    getTypeList () {
      TypeApi.typeDropDown().then(res => {
        if (res.code === 200 && res.result) {
          this.type_config_idList = res.result.equity // res.result.operating_period
          this.business_area_companyList = res.result.business_area_company
          this.project_labelList = res.result.project_label
        }
      })
    },
    resetData () {
      this.info = {
        project_name: null, // 存量项目
        layout: null, // 业态
        type_config_id: null, // 权益类型
        estate_devlop_division: null, // 地产开发事业部
        business_area_company: null, // 委托管理公司
        city: null, // 城市
        build_area: null, // 建筑面积
        garage_area: null, // 车库面积
        project_label: null, // 标签
        entrust_manage_status: null, // 委管状态
        entrust_manage_area: null, // 委管面积
        not_entrust_reason: null, // 未委托原因
        not_allocation_reason: null // 未分配原因
      }
    },
    submit () {
      // if(!this.info.type_config_id) return this.$message.error('请选择经营期操盘类型')
      // if(!this.info.business_area_company) return this.$message.error('请输入委托管理公司')
      // if(!this.info.city) return this.$message.error('请输入城市')
      this.info.project_type = 2
      TypeApi.edit({ id: this.id, ...this.info }).then(res => {
        if (res.code === 200) {
          this.resetData()
          this.$emit('close', {
            fast: false,
            reload: true
          })
        }
      })
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
