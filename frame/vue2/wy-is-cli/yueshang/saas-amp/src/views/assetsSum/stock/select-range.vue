<template>
  <div>
    <el-dialog
      class="rang-dialog"
      title="选择范围"
      :visible.sync="dialogVisible"
      width="620px"
      :before-close="submit">
      <div class="rang-con">
        <div>
          <p>地产开发事业部</p>
          <el-checkbox-group v-model="estate_devlop_division">
            <el-checkbox v-for="(item, index) in estate_devlop_divisionList" :key="index" :label="item">{{ item }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <p>委托管理公司</p>
          <el-checkbox-group v-model="business_area_company">
            <el-checkbox v-for="(item, index) in business_area_companyList" :key="index" :label="item">{{ item }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <p>城市</p>
          <el-checkbox-group v-model="city">
            <el-checkbox v-for="(item, index) in cityList" :key="index" :label="item">{{ item }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="submit(2)">取 消</el-button>
        <el-button size="mini" type="primary" @click="submit(1)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AssetsSum from '@/apis/apis/assetsSum'
export default {
  name: 'SelectRange',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // dialogVisible: false,
      estate_devlop_division: [],
      estate_devlop_divisionList: [],
      business_area_company: [],
      business_area_companyList: [],
      city: [],
      cityList: [],
    }
  },
  watch: {
  },
  created() {
    this.getDownList()
  },
  mounted() {
  },
  methods: {
    // 资产汇总下拉数据
    getDownList() {
      AssetsSum.dropDown().then(res => {
        if(res.code === 200 && res.result){
          this.estate_devlop_divisionList = res.result.estate_devlop_division
          this.business_area_companyList = res.result.business_area_company
          this.cityList = res.result.city
        }
      })
    },
    submit(index) {
      if (index === 1) {
        this.$emit('close', {
          estate_devlop_division: this.estate_devlop_division,
          business_area_company: this.business_area_company,
          city: this.city
        })
      } else {
        this.estate_devlop_division = []
        this.business_area_company = []
        this.city = []
        this.$emit('close', {
          estate_devlop_division: [],
          business_area_company: [],
          city: []
        })
      }
    }
  },
}
</script>
<style type="text/css" lang="scss" scoped>
@import '~@styles/common.scss';
.rang-dialog{
  .rang-con{
    >div{
      margin-bottom: 30px;
      >p{
        margin-bottom: 10px;
      }
    }
  }
}
</style>
<style>
.rang-con .el-checkbox__label {
  width: 120px;
}
</style>
