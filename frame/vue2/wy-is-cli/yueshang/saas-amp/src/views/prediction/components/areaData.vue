<template>
  <div class="project_msg">
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>地上楼层经营面积(GLA)</span>
            <el-input v-if="type == 1" class="required" v-model="survey.ground_floor_area" v-filter-check-input @input="ground_floor_areaInput" placeholder="请输入"></el-input>
            <p v-else style="font-size:20px;">
              <span v-if="!survey.ground_floor_area || survey.ground_floor_area == '0.00'">/</span>
              <span v-else>{{ survey.ground_floor_area }}</span>
            </p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>总建筑面积(GLA)</span>
            <el-input v-if="type == 1" class="required" v-model="survey.total_building_area" v-filter-check-input @input="total_building_areaInput" placeholder="请输入"></el-input>
            <p v-else style="font-size:20px;">
              <span v-if="!survey.total_building_area || survey.total_building_area == '0.00'">/</span>
              <span v-else>{{ survey.total_building_area }}</span>
            </p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>地下楼层经营面积(GLA)</span>
            <el-input v-if="type == 1" class="required" v-model="survey.oper_area_ungd_floor" v-filter-check-input @input="oper_area_ungd_floorInput" placeholder="请输入"></el-input>
            <p v-else style="font-size:20px;">
              <span v-if="!survey.oper_area_ungd_floor || survey.oper_area_ungd_floor == '0.00'">/</span>
              <span v-else>{{ survey.oper_area_ungd_floor }}</span>
            </p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>使用率</span>
            <el-input v-if="type == 1" class="required" v-model="survey.utilization_rate" disabled></el-input>
            <p v-else style="font-size:20px;">
              <span v-if="!survey.utilization_rate || survey.utilization_rate == '0.00'">/</span>
              <span v-else>{{ survey.utilization_rate }}</span>
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 类别 -->
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="d-min">
            <span>停车场面积</span>
            <el-input class="required" v-model="survey.parking_area" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="d-min">
            <span>总租赁面积(GRA)</span>
            <el-input class="required" v-model="survey.total_rental_area" v-filter-check-input placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'type', 'parkingArea', 'totalRentalArea'],
  data() {
    return {
      survey: {
        ground_floor_area: null, //地上楼层经营面积
        total_building_area: null, //总建筑面积
        oper_area_ungd_floor: null, //地下楼层经营面积
        utilization_rate: null, //使用率
        parking_area: null, //停车场面积
        total_rental_area: null //总租赁面积
      },
    }
  },
  created() {
    
  },
  watch: {
    data: {
      handler(nv, ov) {
        console.log(nv)
        if(nv) {
          this.loadData(nv)
        }else{
          this.resetData()
        }
      },
      deep: true
    },
    type(nv) {
      console.log(nv)
    },
    parkingArea(nv) {
      this.survey.parking_area = nv
    },
    totalRentalArea(nv) {
      this.survey.total_rental_area = nv
    }
  },
  methods: {
    // 地上楼层经营面积
    ground_floor_areaInput() {
      if (!this.survey.total_building_area) {
        this.survey.utilization_rate = null
      } else {
        this.survey.utilization_rate = ((Number(this.survey.ground_floor_area) + Number(this.survey.oper_area_ungd_floor)) / Number(this.survey.total_building_area)).toFixed(2)
      }
    },
    // 总建筑面积
    total_building_areaInput() {
      if (!this.survey.total_building_area) {
        this.survey.utilization_rate = null
      } else {
        this.survey.utilization_rate = ((Number(this.survey.ground_floor_area) + Number(this.survey.oper_area_ungd_floor)) / Number(this.survey.total_building_area)).toFixed(2)
      }
    },
    // 地下楼层经营面积
    oper_area_ungd_floorInput() {
      if (!this.survey.total_building_area) {
        this.survey.utilization_rate = null
      } else {
        this.survey.utilization_rate = ((Number(this.survey.ground_floor_area) + Number(this.survey.oper_area_ungd_floor)) / Number(this.survey.total_building_area)).toFixed(2)
      }
    },
    // 加载详情数据
    loadData(data) {
      // this.survey = data
      this.survey.ground_floor_area = data.ground_floor_area
      this.survey.total_building_area = data.total_building_area
      this.survey.utilization_rate = data.utilization_rate
      this.survey.oper_area_ungd_floor = data.oper_area_ungd_floor
      this.survey.parking_area = data.parking_area
      this.survey.total_rental_area = data.total_rental_area
    },
    // 数据复位（清除）
    resetData() {
      for(let key in this.survey) {
        this.survey[key] = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.project_msg{
  .el-select{
    width: 100%;
  }
  >div{
    margin-bottom: 13px;
    >p{
      margin-bottom: 15px;
    }
  }
}
.el-row{
  margin-bottom: 20px;
}
.d-min{
  >span{
    display: block;
    font-size: 14px;
    color: #98A9BC;
    margin-bottom: 10px;
  }
}
</style>
