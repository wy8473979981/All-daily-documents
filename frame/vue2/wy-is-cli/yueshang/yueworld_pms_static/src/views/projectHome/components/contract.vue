<template>
  <div>
    <div class="flex-ju-between mt-20">
      <div class="w537">
        <div class="project-title">
          <div class="title"><span class="pb pl-16 border-b1">合同信息(元)</span></div>
        </div>
        <el-row class="mt-8 text-14">
          <el-col :span="6">合同编号</el-col>
          <el-col :span="12">合同起止日期</el-col>
        </el-row>
        <el-row class="mt-8 text-20">
          <el-col :span="6">HT-8653826</el-col>
          <el-col :span="12">2018.04.16 至 2021.04.15</el-col>
        </el-row>
        <el-row class="mt-16 text-14">
          <el-col :span="6">品牌</el-col>
          <el-col :span="6">租金</el-col>
          <el-col :span="6">租金方式</el-col>
          <el-col :span="6">租金支付周期</el-col>
        </el-row>
        <el-row class="mt-8 text-20">
          <el-col :span="6">7分甜</el-col>
          <el-col :span="6">3年</el-col>
          <el-col :span="6">固定租金</el-col>
          <el-col :span="6">季付</el-col>
        </el-row>
        <el-row class="mt-16 text-14">
          <el-col :span="6">物管支付周期</el-col>
          <el-col :span="6">销售总额(元)</el-col>
          <el-col :span="6">租售比</el-col>
          <el-col :span="6">租金达成率(标准)</el-col>
        </el-row>
        <el-row class="mt-8 text-20">
          <el-col :span="6">季付</el-col>
          <el-col :span="6">1,100,000<svg-icon icon-class="detail" class="icon svg-icon14" @click="handleCheckDetail" /></el-col>
          <el-col :span="6">8%</el-col>
          <el-col :span="6">200%</el-col>
        </el-row>
        <el-row class="mt-16 text-14">
          <el-col :span="6">租金达成率(预算)</el-col>
          <el-col :span="6">物管费达成率(标准)</el-col>
          <el-col :span="6">物管费达成率(预算)</el-col>
          <el-col :span="6">欠费金额(元)</el-col>
        </el-row>
        <el-row class="mt-8 text-20">
          <el-col :span="6">100%</el-col>
          <el-col :span="6">200%</el-col>
          <el-col :span="6">100%</el-col>
          <el-col :span="6" class="text-20 color-6F120C">800</el-col>
        </el-row>
      </div>
      <div class="w537">
        <div class="project-title">
          <div class="title"><span class="pb pl-16 border-b1">对比信息</span></div>
          <div class="mt-12 info-t text-14 flex-al-center pr-28 pl-20">
            <div class="flex1" />
            <div class="flex1 text-right text-weight-bold">标准</div>
            <div class="flex1 text-right">预算</div>
            <div class="flex1 text-right">实际</div>
          </div>
          <div class="text-14 flex-al-center info-item">
            <div class="flex1 text-left text-weight-bold">业态</div>
            <div class="flex1 text-right">餐饮</div>
            <div class="flex1 text-right">餐饮</div>
            <div class="flex1 text-right">餐饮</div>
          </div>
          <div class="text-14 flex-al-center info-item">
            <div class="flex1 text-left text-weight-bold">租金单价</div>
            <div class="flex1 text-right color-0c66ff">12.5</div>
            <div class="flex1 text-right color-0c66ff">12.5</div>
            <div class="flex1 text-right color-0c66ff">12.5<svg-icon icon-class="detail" class="icon svg-icon14 cursor-pointer" @click="showRentUnitDia()" /></div>
          </div>
          <div class="text-14 flex-al-center info-item">
            <div class="flex1 text-left text-weight-bold">租金合计</div>
            <div class="flex1 text-right color-0c66ff">12,954</div>
            <div class="flex1 text-right color-0c66ff">12,954</div>
            <div class="flex1 text-right color-0c66ff">12,954<svg-icon icon-class="detail" class="icon svg-icon14" @click="showRentDia()" /></div>
          </div>
          <div class="text-14 flex-al-center info-item">
            <div class="flex1 text-left text-weight-bold">物管费单价</div>
            <div class="flex1 text-right color-0c66ff">1.32</div>
            <div class="flex1 text-right color-0c66ff">1.32</div>
            <div class="flex1 text-right color-0c66ff">1.32</div>
          </div>
          <div class="text-14 flex-al-center info-item">
            <div class="flex1 text-left text-weight-bold">物管费合计</div>
            <div class="flex1 text-right color-0c66ff">13,635</div>
            <div class="flex1 text-right color-0c66ff">13,635</div>
            <div class="flex1 text-right color-0c66ff">13,635</div>
          </div>
          <div class="text-14 flex-al-center info-item">
            <div class="flex1 text-left text-weight-bold">免租期</div>
            <div class="flex1 text-right">
              <div>第一年：30天</div>
              <div>第二年：30天</div>
            </div>
            <div class="flex1 text-right">
              <div>第一年：30天</div>
              <div>第二年：30天</div>
            </div>
            <div class="flex1 text-right">
              <div>第一年：30天</div>
              <div>第二年：30天</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <<<<<<< HEAD
    <rent-dia ref="rentDia" :table-column="tableColumn" :table-data="tableData" :title="diaTitle" />
    <DefineDialog
      ref="salesVolume"
      :width="dialogWidth"
      title="销售额(元)"
      :table-column="tableColumn"
      :table-data="tableData"
    >
      <div slot="dailogContent">
        <div class="dailog-table">
          <el-table
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              v-for="(item,index) in tableColumn"
              :key="index"
              :prop="item.prop"
              :label="item.name"
              :align="item.align"
              :width="item.width"
            />
          </el-table>
        </div>
      </div>
    </DefineDialog>
    <rent-dia ref="rentDia" :table-column="tableColumn" :table-data="tableData" :title="diaTitle" />
  </div>
</template>

<script>
import RentDia from './rentDia'
import DefineDialog from './defineDialog'
export default {
  name: 'ProjectContract',
  components: { RentDia, DefineDialog },
  data() {
    return {
      diaTitle: '',
      isShowDialog: false,
      tableColumn: [],
      tableData: [],
      dialogWidth: '',
      rentTableData: [
        { t1: '第1月（2018.04.16 ~ 2018.04.30）', t2: '2020.04.16', t3: '3000', t4: '6000', t5: '6000', t6: '已支付' },
        { t1: '第2月（2018.05.01 ~ 2018.05.31）', t2: '2020.04.16', t3: '3000', t4: '6000', t5: '6000', t6: '已支付' },
        { t1: '第3月（2018.06.01 ~ 2018.06.30）', t2: '2020.04.16', t3: '3000', t4: '6000', t5: '6000', t6: '已支付' },
        { t1: '第4月（2018.07.01 ~ 2018.04.31）', t2: '2020.04.16', t3: '3000', t4: '6000', t5: '6000', t6: '已支付' },
        { t1: '第5月（2018.08.01 ~ 2018.08.31）', t2: '2020.04.16', t3: '3000', t4: '6000', t5: '6000', t6: '已支付' }
      ],
      rentTableColumn: [
        { name: '账期(权责口径)', width: '240', align: 'left', prop: 't1' },
        { name: '应付日期', align: 'left', prop: 't2' },
        { name: '标准', align: 'right', prop: 't3' },
        { name: '预算', align: 'right', prop: 't4' },
        { name: '实际', align: 'right', prop: 't5' },
        { name: '支付状态', align: 'right', prop: 't6' }
      ],
      saleVolumeTableColumn: [
        { name: '年度', align: 'left', prop: 't1' },
        { name: '合计', align: 'right', prop: 't2' },
        { name: '1月', align: 'right', prop: 't3' },
        { name: '2月', align: 'right', prop: 't4' },
        { name: '3月', align: 'right', prop: 't5' },
        { name: '4月', align: 'right', prop: 't6' },
        { name: '5月', align: 'right', prop: 't7' },
        { name: '6月', align: 'right', prop: 't8' },
        { name: '7月', align: 'right', prop: 't9' },
        { name: '8月', align: 'right', prop: 't10' },
        { name: '9月', align: 'right', prop: 't11' },
        { name: '10月', align: 'right', prop: 't12' },
        { name: '11月', align: 'right', prop: 't13' },
        { name: '12月', align: 'right', prop: 't14' }
      ],
      saleVolumeTableData: [
        { t1: '2018', t2: '900,000', t3: '/', t4: '/', t5: '/', t6: '/', t7: '/', t8: '/', t9: '/', t10: '/', t11: '/', t12: '/', t13: '/', t14: '/' },
        { t1: '2019', t2: '200,000', t3: '100,000', t4: '100,000', t5: '100,000', t6: '100,000', t7: '100,000', t8: '100,000', t9: '100,000', t10: '100,000', t11: '100,000', t12: '100,000', t13: '100,000', t14: '100,000' },
        { t1: '2020', t2: '200,000', t3: '100,000', t4: '100,000', t5: '100,000', t6: '100,000', t7: '100,000', t8: '100,000', t9: '100,000', t10: '100,000', t11: '100,000', t12: '100,000', t13: '100,000', t14: '100,000' },
        { t1: '2021', t2: '200,000', t3: '100,000', t4: '100,000', t5: '100,000', t6: '100,000', t7: '100,000', t8: '100,000', t9: '100,000', t10: '100,000', t11: '100,000', t12: '100,000', t13: '100,000', t14: '100,000' }
      ],
      rentUnitTableColumn: [
        { name: '', align: 'left', prop: 't1' },
        { name: '标准', align: 'right', prop: 't2' },
        { name: '预算', align: 'right', prop: 't3' },
        { name: '合计', align: 'right', prop: 't4' }
      ],
      rentUnitTableData: [
        { t1: '2018.04.16 ~ 2018.08.31', t2: '10', t3: '20', t4: '20' },
        { t1: '2018.09.01 ~ 2019.04.15', t2: '12.5', t3: '25', t4: '20' },
        { t1: '2019.04.16 ~ 2019.08.31', t2: '12.5', t3: '25', t4: '25' },
        { t1: '2019.08.31 ~ 2020.04.15', t2: '15', t3: '25', t4: '25' },
        { t1: '2020.04.16 ~ 2020.08.31', t2: '15', t3: '30', t4: '30' },
        { t1: '2020.09.01 ~ 2021.04.15', t2: '17.5', t3: '30', t4: '30' }
      ]
    }
  },
  methods: {
    // 显示租金单间弹框
    showRentUnitDia() {
      this.dialogWidth = '700px'
      this.tableColumn = this.rentUnitTableColumn
      this.tableData = this.rentUnitTableData
      this.diaTitle = '租金(元)'
      this.$refs.salesVolume.isShow = true
    },
    // 显示租金合计弹框
    showRentDia() {
      this.dialogWidth = '798px'
      this.tableColumn = this.rentTableColumn
      this.tableData = this.rentTableData
      this.diaTitle = '租金(元)'
      this.$refs.salesVolume.isShow = true
    },
    // 显示销售额弹框
    handleCheckDetail() {
      this.dialogWidth = '1175px'
      this.tableColumn = this.saleVolumeTableColumn
      this.tableData = this.saleVolumeTableData
      this.diaTitle = '销售额(元)'
      this.$refs.salesVolume.isShow = true
    }
  }
}
</script>

<style scoped lang="scss">
  .svg-icon14{
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  .info-t{
    height: 36px;
    line-height: 36px;
    background: #E0DFDD;
    border-radius: 20px;
  }
  .info-item{
    padding: 10px 28px 10px 20px;
    border-bottom: 1px solid #E0DFDD;;
  }
  .flex1{
    flex: 1;
  }
  .w537{
    width: 537px;
  }
  .color-6F120C{
    color: #6F120C;
  }
  .project-title{
    .title {
      font-size: 16px;
      font-weight: bold;
      color: #050101;
      line-height: 24px;
      border-bottom: 1px solid #D1CEC9;
    }
    .border-b1{
      position: relative;
      display: inline-block;
      min-width: 140px;
      /*border-bottom:1px solid #050101;*/
    }
    .border-b1::after {
      height: 1px;
      width: 100%;
      transform: scaleY(0.5);
      left: 0;
      content: '';
      position: absolute;
      background-color: #050101;
      bottom: -1px;
    }
  }
</style>
