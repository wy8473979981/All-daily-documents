<template>
  <div class="list-page">
    <!-- 楼层 -->
    <div>
      <h3 class="min-title">楼层</h3>
      <el-table
        size="mini"
        :data="floorData"
        style="width: 100%"
        class="in-table total-b">
        <el-table-column label="项目名称" width="180" fixed>
          <el-table-column prop="project_name" width="180" fixed/>
        </el-table-column>
        <el-table-column label="楼栋" width="100" fixed>
          <el-table-column prop="building_name" width="150" fixed/>
        </el-table-column>
        <el-table-column label="楼层" width="80" fixed>
          <el-table-column prop="floor_name" width="80" fixed/>
        </el-table-column>
        <el-table-column label="套内面积(GLA)" width="120" fixed>
          <el-table-column prop="inner_area" width="120" fixed>
            <template slot-scope="scope">
              <span>{{ scope.row.inner_area | formatVal }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <!-- 列遍历-->
        <el-table-column v-show="floorData[0].data.length > 0"  v-for="(item, index) in floorData[0].data" :label="item.year" :key="index" align="center">
          <el-table-column align="right" label="总租金(万元)" width="110">
            <template slot-scope="scope">
              <span v-if="!scope.row.data[index]">/</span>
              <span v-else>{{ scope.row.data[index]['total_rental'] | formatVal }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="实际租金(万元)" width="110">
            <template slot-scope="scope">
              <span v-if="!scope.row.data[index]">/</span>
              <span v-else>{{ scope.row.data[index]['real_rental'] | formatVal }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="平均租金 (元/m²/月)" width="140">
            <template slot-scope="scope">
              <span v-if="!scope.row.data[index]">/</span>
              <span v-else>{{ scope.row.data[index]['avg_rental'] | formatVal }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="实际平均租金 (元/m²/月)" width="160">
            <template slot-scope="scope">
              <span v-if="!scope.row.data[index]">/</span>
              <span v-else>{{ scope.row.data[index]['real_avg_rental'] | formatVal }}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- 业态 -->
    <div>
      <h3 class="min-title">业态</h3>
      <el-table
        size="mini"
        :data="formatData"
        style="width: 100%"
        class="in-table total-b">
        <el-table-column label="项目名称" width="180" fixed>
          <el-table-column prop="project_name" width="180" fixed/>
        </el-table-column>
        <el-table-column label="一级业态" width="100" fixed>
          <el-table-column prop="first_layout_name" width="100" fixed/>
        </el-table-column>
        <el-table-column label="二级业态" width="100" fixed>
          <el-table-column prop="second_layout_name" width="100" fixed/>
        </el-table-column>
        <el-table-column label="三级业态" width="100" fixed>
          <el-table-column prop="third_layout_name" width="100" fixed/>
        </el-table-column>
        <!-- 列遍历-->
        <el-table-column v-show="formatData[0].data.length > 0" v-for="(item, index) in formatData[0].data" :label="item.year" :key="index" align="center">
          <el-table-column align="right" label="总租金(万元)" width="110">
            <template slot-scope="scope">
              <span v-if="!scope.row.data[index]">/</span>
              <span v-else>{{ scope.row.data[index]['total_rental'] | formatVal }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="实际租金(万元)" width="110">
            <template slot-scope="scope">
              <span v-if="!scope.row.data[index]">/</span>
              <span v-else>{{ scope.row.data[index]['real_rental'] | formatVal }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="平均租金 (元/m²/月)" width="140">
            <template slot-scope="scope">
              <span v-if="!scope.row.data[index]">/</span>
              <span v-else>{{ scope.row.data[index]['avg_rental'] | formatVal }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="实际平均租金 (元/m²/月)" width="160">
            <template slot-scope="scope">
              <span v-if="!scope.row.data[index]">/</span>
              <span v-else>{{ scope.row.data[index]['real_avg_rental'] | formatVal }}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import Rent from '@/apis/apis/rent';
  import { toThousands } from '@/utils/index';
  export default {
    components: {

    },
    data() {
      return {
        project_id: null,
        floorData: [{data:[]}],
        formatData: [{data:[]}]
      }
    },
    watch: {},
    created() {
      this.project_id = this.$route.query.project_id;
      this.getLoad()
    },
    mounted() {

    },
    filters: {
      formatVal(val) {
        return toThousands(val) && toThousands(val)!=='0.00' ? toThousands(val) : '/'
      }
    },
    methods: {
      getLoad() {
        Rent.getLoad({project_id: this.project_id}).then(res => {
          console.log("Load:",res)
          if(res.code === 200 && res.result){
            if(res.result.floor.length > 0) {
              const lastFloor = {project_name: '共计', inner_area: 0.00,data: []}
              // res.result.floor.forEach((item,index) => {
              //   item.data.forEach((son,indey) => {
              //     if(index === 0){
              //       let obj = {total_rental: 0.00,real_rental: 0.00,avg_rental: 0.00,real_avg_rental: 0.00}
              //       lastFloor.data.push(obj)
              //     }
              //     if (son.total_rental == '/') son.total_rental = 0
              //     if (son.real_rental == '/') son.real_rental = 0
              //     if (son.avg_rental == '/') son.avg_rental = 0
              //     if (son.real_avg_rental == '/') son.real_avg_rental = 0
              //     lastFloor.data[indey].total_rental += parseFloat(son.total_rental)
              //     lastFloor.data[indey].real_rental += parseFloat(son.real_rental)
              //     lastFloor.data[indey].avg_rental += parseFloat(son.avg_rental)
              //     lastFloor.data[indey].real_avg_rental += parseFloat(son.real_avg_rental)
              //   })
              //   lastFloor.inner_area += parseFloat(item.inner_area)
              // })
              res.result.floor_sum.forEach((item,index) => {
                let obj = {total_rental: 0.00,real_rental: 0.00,avg_rental: 0.00,real_avg_rental: 0.00}
                lastFloor.data.push(obj)
                lastFloor.data[index].total_rental = item.total_rental
                lastFloor.data[index].real_rental = item.real_rental
                lastFloor.data[index].avg_rental = item.avg_rental
                lastFloor.data[index].real_avg_rental = item.real_avg_rental
              })
              res.result.floor.forEach((item,index) => {
                lastFloor.inner_area += parseFloat(item.inner_area)
                // item.data.forEach((son,indey) => {
                //   this.dealObj(lastFloor.data[indey])
                // })
              })

              lastFloor.inner_area = lastFloor.inner_area.toFixed(2)
              res.result.floor.push(lastFloor)
              this.floorData = res.result.floor
            }
            if(res.result.layout.length > 0) {
              const lastFormat = {project_name: '共计',data: []}
              // res.result.layout.forEach((item,index) => {
              //   item.data.forEach((son,indey) => {
              //     if(index === 0){
              //       let obj = {total_rental: 0.00,real_rental: 0.00,avg_rental: 0.00,real_avg_rental: 0.00}
              //       lastFormat.data.push(obj)
              //     }
              //     if (son.total_rental == '/') son.total_rental = 0
              //     if (son.real_rental == '/') son.real_rental = 0
              //     if (son.avg_rental == '/') son.avg_rental = 0
              //     if (son.real_avg_rental == '/') son.real_avg_rental = 0
              //     lastFormat.data[indey].total_rental += parseFloat(son.total_rental)
              //     lastFormat.data[indey].real_rental += parseFloat(son.real_rental)
              //     lastFormat.data[indey].avg_rental += parseFloat(son.avg_rental)
              //     lastFormat.data[indey].real_avg_rental += parseFloat(son.real_avg_rental)
              //   })
              // })
              // res.result.layout.forEach((item,index) => {
              //   item.data.forEach((son,indey) => {
              //     this.dealObj(lastFormat.data[indey])
              //   })
              // })
              res.result.layout_sum.forEach((item,index) => {
                let obj = {total_rental: 0.00,real_rental: 0.00,avg_rental: 0.00,real_avg_rental: 0.00}
                lastFormat.data.push(obj)
                lastFormat.data[index].total_rental = item.total_rental
                lastFormat.data[index].real_rental = item.real_rental
                lastFormat.data[index].avg_rental = item.avg_rental
                lastFormat.data[index].real_avg_rental = item.real_avg_rental
              })
              res.result.layout.push(lastFormat)
              this.formatData = res.result.layout
              console.log(this.formatData)
            }
          }
        })
      },
      dealObj(x){
        for(let key in x){
          console.log("key=="+key+"--x[key]"+x[key])
          x[key] = parseFloat(x[key]).toFixed(2)
        }
        return x;
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
  .list-page{
    >div{
      margin-bottom: 30px;
    }
  }
  .min-title{
    margin-bottom: 10px;
  }
</style>
