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
                  <el-input class="required" v-model="info.name" :disabled="id?true:false" placeholder="请输入项目名称"></el-input>
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
<!--              <el-col :span="12">-->
<!--                <div class="d-min">-->
<!--                  <span>建筑总面积（不含车库）(㎡)</span>-->
<!--                  <el-input class="" v-model="info.build_area" v-filter-check-input2 placeholder="请输入"></el-input>-->
<!--                </div>-->
<!--              </el-col>-->
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
        layout: null // 业态
      },
      estate_devlop_divisionList: [], // 事业部列表
      selectLayoutList: [] // 业态列表
    }
  },
  created () {
    this.getLayoutList()// 业态
    this.getDictionary(1)// 事业部
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
        const { name, depart, layout, id } = JSON.parse(JSON.stringify(this.row))
        this.info = { name, depart, layout, id }
      } else {
        this.info = {
          name: null, // 存量项目
          depart: null, // 地产开发事业部
          layout: null // 业态
        }
      }
    }
  },
  mounted () {
  },
  beforeDestroy () {

  },
  methods: {
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
