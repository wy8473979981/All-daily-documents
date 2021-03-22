<template>
  <!-- 资产盘点系统-平面图 -->
  <div class="page">
    <div class="logo-title">
      <img src="../../../static/img/bl/bl_sy_logo.svg">
      <h3>资产盘点系统</h3>
    </div>
    <div class="list-page">
      <div class="page-condition">
        <!-- 条件 -->
        <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
          <el-col :span="3" style="display: flex; align-items: center;" v-if="false">
            <el-select placeholder="项目" size="mini" v-model="query.project_config_id" @change="getListChange"  filterable>
              <el-option
                v-for="item in projectList"
                :key="item.project_config_id"
                :label="item.project_name"
                :value="item.project_config_id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="20" style="display: flex; align-items: flex-start;">
            <div class="tool-floor">
              <span :class="checkActive === 'B2'?'floor-active':''" @click="checkFloor('B2')">B2</span>
              <el-divider direction="vertical"></el-divider>
              <span :class="checkActive === 'B1'?'floor-active':''" @click="checkFloor('B1')">B1</span>
              <el-divider direction="vertical"></el-divider>
              <span :class="checkActive === '1F'?'floor-active':''" @click="checkFloor('1F')">1F</span>
              <el-divider direction="vertical"></el-divider>
              <span :class="checkActive === '2F'?'floor-active':''" @click="checkFloor('2F')">2F</span>
              <el-divider direction="vertical"></el-divider>
              <span :class="checkActive === '3F'?'floor-active':''" @click="checkFloor('3F')">3F</span>
              <el-divider direction="vertical"></el-divider>
              <span :class="checkActive === '4F'?'floor-active':''" @click="checkFloor('4F')">4F</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
          <el-col :span="24">
            <el-radio disabled v-model="checked1" label="1">
              <span style="color: #333333!important;">资产类别</span>
              <span style="width:13px;height:13px;border:1px solid #134365;display: inline-block;margin-left: 26px;margin-right: 4px;"></span>
              <span class="wordc">有产证</span>
              <span style="width:13px;height:13px;border:1px solid #ED7070;display: inline-block;margin-left: 26px;margin-right: 4px;"></span>
              <span class="wordc">无产证</span>
            </el-radio>
          </el-col>
        </el-row>
        <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
          <el-col :span="24">
            <el-radio v-model="checked2" label="2" @click.native.prevent="changeCheck('2')">
              <span style="color: #333333!important;">物业类型</span>
              <span class="square" style="background: #3B90CE;"></span>
              <span class="wordc">自持</span>
              <span class="square" style="background: #7AEBEF;"></span>
              <span class="wordc">已售</span>
              <span class="square" style="background: #DAE4EA;"></span>
              <span class="wordc">未售</span>
              <span class="square" style="background: #1F557C;"></span>
              <span class="wordc">转自持</span>
            </el-radio>
          </el-col>
        </el-row>
        <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
          <el-col :span="24">
            <el-radio v-model="checked2" label="3" @click.native.prevent="changeCheck('3')">
              <span style="color: #333333!important;">租约情况</span>
              <span class="square" style="background: #D7DEE3;"></span>
              <span class="wordc">出租</span>
              <span class="square" style="background: #E0572D;"></span>
              <span class="wordc">欠费</span>
              <span class="square" style="background: #FFB755;"></span>
              <span class="wordc">到期</span>
            </el-radio>
          </el-col>
        </el-row>
        <el-row class="tool-bar" type="flex" justify="space-between" align="middle">
          <el-col :span="24">
            <el-radio v-model="checked2" label="5" disabled>
              <span style="color: #C0C3C6;">停车场</span>
            </el-radio>
          </el-col>
        </el-row>
      </div>
      <!-- 内容 - svg -->
      <svg width="100%" id="svgObj" :class="changeSvg?'fade':''" v-html="mySvg" preserveAspectRatio="xMidYMid meet"></svg>
      <!-- 测试数据-弹框信息 -->
      <img v-show="s1" src="../../../static/img/s1.png" id="img1" style="position: fixed;top: 39%;left: 45%;width: 316px;z-index: 100;">
      <img v-show="s2" src="../../../static/img/s2.png" id="img2" style="position: fixed;top: 38%;left: 51%;width: 316px;z-index: 100;">
      <img v-show="s3" src="../../../static/img/s3.png" id="img3" style="position: fixed;top: 58%;left: 47%;width: 316px;z-index: 100;">
      <!-- 提示 -->
      <div class="tool-floor tip-Box">
        <p>
          <span style="width:13px;height:13px;border:1px solid #134365;display: inline-block;margin-left: 26px;margin-right: 4px;"></span>
          <span class="wordc">有产证</span>
        </p>
        <p>
          <span style="width:13px;height:13px;border:1px solid #ED7070;display: inline-block;margin-left: 26px;margin-right: 4px;"></span>
          <span class="wordc">无产证</span>
        </p>
        <p v-show="checked2 === '2'">
          <span class="square" style="background: #3B90CE;"></span>
          <span class="wordc">自持</span>
        </p>
        <p v-show="checked2 === '2'">
          <span class="square" style="background: #7AEBEF;"></span>
          <span class="wordc">已售</span>
        </p>
        <p v-show="checked2 === '2'">
          <span class="square" style="background: #DAE4EA;"></span>
          <span class="wordc">未售</span>
        </p>
        <p v-show="checked2 === '2'">
          <span class="square" style="background: #1F557C;"></span>
          <span class="wordc">转自持</span>
        </p>
        <p v-show="checked2 === '3'">
          <span class="square" style="background: #D7DEE3;"></span>
          <span class="wordc">出租</span>
        </p>
        <p v-show="checked2 === '3'">
          <span class="square" style="background: #E0572D;"></span>
          <span class="wordc">欠费</span>
        </p>
        <p v-show="checked2 === '3'">
          <span class="square" style="background: #FFB755;"></span>
          <span class="wordc">到期</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { handlePaginator } from '@mixins'
import { getDynamicTableHeight } from '@/utils/index';
let a = require('../../../static/img/A.svg')
let b = require('../../../static/img/B.svg')
let c = require('../../../static/img/C.svg')
// import Snap from 'snapsvg';
export default {
  mixins: [handlePaginator],
  data() {
    return {
      pageInfo: {
        page_size: 50,
        page: 1,
        sum_num: 0
      },
      query: {
        project_config_id: 1
      },
      projectList: [{project_config_id:1,project_name: '七宝宝龙城'}],
      checkActive: '1F',
      checked1: '1',
      checked2: '2',
      mySvg: '',
      svgObj: null,
      s1: false,
      s2: false,
      s3: false,
      changeSvg: false,
      screenW: window.screen.width
    }
  },
  components: {
  },
  watch: {
    checked2(n,o) {
      let src = '../../../static/img/A.svg'
      if(n == 1) {
        src = '../../../static/img/A.svg'
      }else if(n == 2) {
        src = '../../../static/img/B.svg'
      }else if(n == 3) {
        src = '../../../static/img/C.svg'
      }else if(n == 4) {

      }else if(n == 5) {

      }
      this.initData(src)
      this.changeSvg = true
    }
  },
  created() {
    this.initData('../../../static/img/B.svg')
  },
  mounted() {

  },
  // 日期转换格式
  filters: {
    formatDate(time) {
      return time ? new Date(parseInt(time)).format('yyyy-MM-dd') : ''
    }
  },
  methods: {
    initData(src) {
      this.$axios.get(src).then(res => {
        // console.log("svg===",res)
        this.mySvg = res.data
        setTimeout(() => {
          this.changeSvg = false
        },1010)
        const _this = this
        setTimeout(() => {
          const svgEl = document.getElementById("svgObj").querySelector('svg')
          svgEl.setAttribute("width","100%")
          svgEl.setAttribute("height","100%")

          const c1 = document.getElementById("路径-44")
          c1.onclick = function(e){
            e.stopPropagation()
            e.preventDefault()
            const img1 = document.getElementById("img1")
            img1.style.left = _this.getMousePos().x + 'px'
            img1.style.top = _this.getMousePos().y + 'px'
            const ratio = _this.ChangeRatio() / 100
            let width = new Number(img1.style.width.split('px')[0])
            if(img1.getAttribute('data-width')){
              width = new Number(img1.getAttribute('data-width'))
            }else{
              img1.setAttribute('data-width',width)
            }
            if(_this.screenW == 1920){
              img1.style.width = ( width / ratio) + 'px'
            }else if(_this.screenW < 1440){
              img1.style.width = ( width / ratio * 0.8) + 'px'
            }else if(_this.screenW >= 1440 || _this.screenW <= 1536){
              img1.style.width = ( width / ratio * 2) + 'px'
            }else if(_this.screenW * ratio == 1707){
              img1.style.width = ( width / ratio * 2.25) + 'px'
            }
            _this.s2 = false
            _this.s3 = false
            _this.s1 = !_this.s1
          }
          const c2 = document.getElementById("路径-33")
          c2.onclick = function(e){
            e.stopPropagation()
            e.preventDefault()
            const img2 = document.getElementById("img2")
            img2.style.left = _this.getMousePos().x + 'px'
            img2.style.top = _this.getMousePos().y + 'px'
            const ratio = _this.ChangeRatio() / 100
            let width = new Number(img2.style.width.split('px')[0])
            if(img2.getAttribute('data-width')){
              width = new Number(img2.getAttribute('data-width'))
            }else{
              img2.setAttribute('data-width',width)
            }
            if(_this.screenW == 1920){
              img2.style.width = ( width / ratio) + 'px'
            }else if(_this.screenW < 1440){
              img2.style.width = ( width / ratio * 0.8) + 'px'
            }else if(_this.screenW >= 1440 || _this.screenW <= 1536){
              img2.style.width = ( width / ratio * 2) + 'px'
            }else if(_this.screenW * ratio == 1707){
              img2.style.width = ( width / ratio * 2.25) + 'px'
            }
            _this.s1 = false
            _this.s3 = false
            _this.s2 = !_this.s2
          }
          const c3 = document.getElementById("路径-17")
          c3.onclick = function(e){
            e.stopPropagation()
            e.preventDefault()
            const img3 = document.getElementById("img3")
            img3.style.left = _this.getMousePos().x + 'px'
            img3.style.top = _this.getMousePos().y + 'px'
            const ratio = _this.ChangeRatio() / 100
            let width = new Number(img3.style.width.split('px')[0])
            if(img3.getAttribute('data-width')){
              width = new Number(img3.getAttribute('data-width'))
            }else{
              img3.setAttribute('data-width',width)
            }
            if(_this.screenW == 1920){
              img3.style.width = ( width / ratio) + 'px'
            }else if(_this.screenW < 1440){
              img3.style.width = ( width / ratio * 0.8) + 'px'
            }else if(_this.screenW >= 1440 || _this.screenW <= 1536){
              img3.style.width = ( width / ratio * 2) + 'px'
            }else if(_this.screenW * ratio == 1707){
              img3.style.width = ( width / ratio * 2.25) + 'px'
            }
            _this.s1 = false
            _this.s2 = false
            _this.s3 = !_this.s3
          }
          const body = document.body
          body.onclick = function(e){
            _this.s1 = false
            _this.s2 = false
            _this.s3 = false
          }
          const paths = document.getElementById("svgObj").querySelectorAll('path')
          paths.forEach(item => {
            item.onmouseover = function(){
              if(this.getAttribute('stroke') !== "#468CEB"){
                this.setAttribute("data-stroke",this.getAttribute('stroke'))
                this.setAttribute("data-fill",this.getAttribute('fill'))
                this.setAttribute("stroke","#26CEFF")
                this.setAttribute("fill","#A8DAFF")
                this.setAttribute("stroke-width","6")
              }
            }
            item.onmouseout = function(){
              this.setAttribute("stroke",this.getAttribute('data-stroke'))
              this.setAttribute("fill",this.getAttribute('data-fill'))
              this.removeAttribute("stroke-width")
            }
          })
          const polygons = document.getElementById("svgObj").querySelectorAll('polygon')
          polygons.forEach(item => {
            item.onmouseover = function(){
              if(this.getAttribute('stroke') !== "#26CEFF"){
                this.setAttribute("data-stroke",this.getAttribute('stroke'))
                this.setAttribute("data-fill",this.getAttribute('fill'))
                this.setAttribute("stroke","#26CEFF")
                this.setAttribute("fill","#A8DAFF")
                this.setAttribute("stroke-width","6")
              }
            }
            item.onmouseout = function(){
              this.setAttribute("stroke",this.getAttribute('data-stroke'))
              this.setAttribute("fill",this.getAttribute('data-fill'))
              this.removeAttribute("stroke-width")
            }
          })
          const rects = document.getElementById("svgObj").querySelectorAll('rect')
          rects.forEach(item => {
            item.onmouseover = function(){
              if(this.getAttribute('stroke') !== "#26CEFF"){
                this.setAttribute("data-stroke",this.getAttribute('stroke'))
                this.setAttribute("data-fill",this.getAttribute('fill'))
                this.setAttribute("stroke","#26CEFF")
                this.setAttribute("fill","#A8DAFF")
                this.setAttribute("stroke-width","6")
              }
            }
            item.onmouseout = function(){
              this.setAttribute("stroke",this.getAttribute('data-stroke'))
              this.setAttribute("fill",this.getAttribute('data-fill'))
              this.removeAttribute("stroke-width")
            }
          })
        },20)
      })
    },
    changeCheck(type) {
      console.log("this.checked2==" + this.checked2 +"-----"+type)
      if(this.checked2 != '1' && this.checked2 == type) {
        this.checked2 = '1'
      }else{
        this.checked2 = type
      }
    },
    // 获取鼠标点击位置x,y信息
    getMousePos(event) {
      var e = event || window.event;
      const ratio = this.ChangeRatio() / 100
      console.log("window.screen.width=" + window.screen.width)
      console.log("ratio=" + ratio)
      const numx = 10 / ratio
      let numy = 66 / ratio
      if(this.screenW != 1920 && ratio < 1){
        numy = 146 / ratio
        if(window.screen.width < 1440){
          numy = 54 / ratio
        }
      }else if(this.screenW != 1920 && ratio >= 1 && ratio <= 2){
        numy = 34 * ratio
        if(window.screen.width < 1440){
          numy = (54 + 6) / ratio
        }
      }else if(this.screenW != 1920 && ratio > 2 && ratio <= 2.25){
        numy = 30 * ratio
      }else if(this.screenW != 1920 && ratio > 2.25){
        numy = 146 / ratio
      }
      return {'x':e.clientX + numx,'y':e.clientY - numy}
    },
    // 获取浏览器缩放比
    ChangeRatio() {
      var ratio=0;
      var screen=window.screen;
      var ua=navigator.userAgent.toLowerCase();

      if(window.devicePixelRatio !== undefined)
      {
        ratio=window.devicePixelRatio;
      }
      else if(~ua.indexOf('msie'))
      {
        if(screen.deviceXDPI && screen.logicalXDPI)
        {
          ratio=screen.deviceXDPI/screen.logicalXDPI;
        }

      }
      else if(window.outerWidth !== undefined && window.innerWidth !== undefined)
      {
        ratio=window.outerWidth/window.innerWidth;
      }

      if(ratio)
      {
        ratio=Math.round(ratio*100);
      }
      return ratio;
    },
    // 查询
    async getList() {
      const params = {
        ...this.pageInfo,
        ...this.query
      }
      await OperateLog.find(params).then(res => {
        if(res.code === 200 && res.result){
          this.tableData = res.result.data
          this.pageInfo.sum_num = res.result.sum_num
          getDynamicTableHeight(this)
        }
      })
    },
    // 重新选择搜索项重置页码
    getListChange() {
      this.pageInfo.page = 1
    },
    // 选择结束时间
    selectToTime(e) {
      if(!this.query.start_time){
        this.query.end_time = ''
        this.$message.error('请选择开始时间')
        return
      }
      const dateNum = new Date(this.query.start_time).getTime()
      const toNum = new Date(e).getTime()
      if(toNum < dateNum){
        this.query.end_time = ''
        this.$message.error('结束时间小于开始时间')
      }
      this.getListChange()
    },
    reset() {
      this.query = {
      }
      this.getList()
    },
    // 选择楼层
    checkFloor(floor) {
      this.checkActive = floor
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
  .page{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .list-page {
    width: 100%;
    flex: 1;
    padding: 20px 20px;
    overflow-y: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .tool-floor {
      span{
        cursor: pointer;
        color: #333333;
        &:active,&:hover {
          color: #26CEFF!important;
          font-size: 20px;
        }
      }

    }
    .floor-active {
      color: #26CEFF!important;
      font-size: 20px;
    }
    svg {
      flex: 1;
    }
  }
  .logo-title{
    padding: 0 35px;
    height: 44px;
    background-color: #E3E7E9;
    display: flex;
    align-items: center;
    >img{
      width: 75px;
      height: 30px;
      margin-right: 25px;
    }
    >h3{
      font-size: 18px;
      color: #333;
    }
  }
  .tool-bar {
    padding-bottom: 14px;
    width: 32%;
    .word {
      display: inline-block;
      width: 12px;
    }
    .wordc{
      color: #9B9B9B;
      width: 3em;
    }
    .square {
      width:15px;height:15px;display: inline-block;margin-left: 26px;margin-right: 4px;
    }
  }
  /* overwrite el-radio */
  /deep/ .el-radio {
    display: flex;
    .el-radio__label {
      display: flex;
      align-items: center;
    }
  }
  /deep/ .el-radio:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner {
    box-shadow: unset;
  }
  /* svg change css */
  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0; /*初始状态 透明度为0*/
    }
    40% {
      opacity: 0.4; /*中间状态 透明度为0.4*/
    }
    80% {
      opacity: 0.8; /*中间状态 透明度为0.8*/
    }
    100% {
      opacity: 1; /*结尾状态 透明度为1*/
    }
  }
  .fade {
    animation: fadeIn 1s 1 linear;
    -webkit-animation: fadeIn 1s 1 linear;
  }
  /* 提示窗 */
  .tip-Box {
    display: flex;
    position: fixed;
    left: 44px;
    top: 50%;
    z-index: 999;
    flex-direction: column;
    justify-content: center;
    width: 248px;
    min-height: 100px;
    padding: 24px 0 24px 47px;
    background: rgba(255,255,255,0.94);
    box-shadow: 0px 4px 6px 0px rgba(92,150,192,1);
    border: 2px solid rgba(75,190,255,1);
    box-sizing: border-box;
    p {
      display: flex;
      align-items: center;
      line-height: 36px;
      span {
        font-size: 20px;
        font-weight: 400;
        &:first-child{
          margin-top: 2px;
          margin-right: 10px!important;
          margin-left: 0!important;
        }
      }
      .square {
        width:15px;height:15px;display: inline-block;margin-left: 26px;margin-right: 4px;
      }
    }
  }
</style>
