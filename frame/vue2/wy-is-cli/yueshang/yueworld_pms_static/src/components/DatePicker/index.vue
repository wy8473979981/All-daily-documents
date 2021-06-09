<template>
  <div class="my-date-picker">
    <div class="text-center yy">{{ selectData.yy }}年</div>
    <div class="text-center">
      <div class="mm">{{ selectData.mm }}
        <el-date-picker
          v-model="dateValue"
          :type="datType"
          placeholder="选择日期"
          class="my-date"
          :clearable="false"
          @change="dateChange"
        />
      </div>
    </div>
    <div class="text-center dd">
      <img v-if="selectMM" src="../../assets/image/circle-select.png" @click="changMM()">
      <img v-else src="../../assets/image/circle.png" @click="changMM()">
      {{ selectData.dd }}</div>
  </div>
</template>

<script>
import moment from 'moment/moment'
moment.locale('zh-cn')
export default {
  name: 'MyDatePicker',
  data() {
    return {
      datType: 'date',
      selectMM: false,
      dateValue: '',
      selectData: {
        yy: '',
        mm: '',
        dd: ''
      }
    }
  },
  mounted() {
    this.initDate(new Date())
  },
  methods: {
    changMM() {
      this.selectMM = !this.selectMM
      // this.datType = this.selectMM ? 'month' : 'date'
    },
    dateChange(e) {
      console.log('change', e)
      this.selectMM = false
      if (e) {
        this.initDate(e)
        const date = this.selectMM ? moment(e).format('YYYY-MM') : moment(e).format('YYYY-MM-DD')
        this.$emit('selectDateResult', date)
      }
    },
    initDate(val) {
      let today = moment(val).format('YYYY-MM-DD')
      today = today.split('-')
      this.selectData = {
        yy: today[0],
        mm: today[1],
        dd: today[2]
      }
    }
  }
}
</script>
<style>
  .el-picker-panel,.el-picker-panel__sidebar{
    background: #EFEDEA;
  }
  .el-date-picker__header-label{
    font-size: 14px;
    font-weight: bold;
    color: #050101;
  }
  .el-date-table td span{
    border-radius: 0;
  }
</style>
<style scoped lang="scss">
.my-date-picker{
  width: 135px;
  height: 135px;
  border-radius: 135px;
  background-color: white;
  padding-top: 31px;
  .yy{
    font-size: 24px;
    color: #050101;
    line-height: 24px;
  }
  .mm{
    position: relative;
    display: inline-block;
    padding: 5px 12px;
    background: #E5E2DE;
    border-radius: 16px;
    font-size: 18px;
    color: #050101;
    line-height: 18px;
    margin-top: 8px;
    margin-bottom: 6px;
    cursor: pointer;
    .my-date{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
      input{
        cursor: pointer;
      }
    }
  }
  .dd{
    font-size: 14px;
    color: #848382;
    line-height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 25px;
      height: 25px;
      cursor: pointer;
    }
  }
}
</style>
