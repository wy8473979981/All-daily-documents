<template>
  <section class="html-list list" style="height: 500px; overflow-y:scroll;">
    <article>
      <h3>HTML选择</h3>
      <el-table
        @row-click="handleRowClick"
        :data="htmlList"
        v-show="step === 0"
      >
        <el-table-column label="标签类型" prop="code"></el-table-column>
        <el-table-column label="描述" prop="descr"></el-table-column>
        <el-table-column label="是否选中">
          <template slot-scope="scope">
            <i v-show="scope.row.selected" class="el-icon-check" style="color: #67c23a; font-weight: bold;"></i>
          </template>
        </el-table-column>
      </el-table>
    </article>
    <p>&nbsp;</p>
    <!-- <hr style="height:1px; border:none; border-top:1px solid #efefef;"> -->
    <article>
      <h3>数据设置</h3>
      <div class="input-config">
        <div v-show="isShow">
          <label style="font-size: 14px; color: #333;">周期数据：</label>
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="item in checkListNameMap" :key="item.value" 
            :label="item.value" style="font-weight: normal;">{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <label style="font-size: 14px; color: #333;">数据类型：</label>
          <el-radio-group v-model="inputDataType">
            <el-radio label="">没有数据</el-radio>
            <!-- <el-radio label="ele">元素</el-radio> -->
            <el-radio label="obj">对象</el-radio>
            <el-radio label="list">集合</el-radio>
          </el-radio-group>
          <!-- <el-switch
            v-model="isDataInput.obj"
            active-color="#13ce66">
          </el-switch> -->
        </div>
        <!-- <div>
          <label>元素数据的文本框</label>
          <el-switch
            v-model="isDataInput.ele"
            active-color="#13ce66">
          </el-switch>
        </div> -->
        <!--[显示下标 start]-->
        <div v-show="indexNum && indexNum.length > 0">
          <label style="font-size: 14px; color: #333;">显示下标：</label>
          <ul class="inputValue">
            <li v-for="(item,index) in indexNum" :key="index">
              <p v-if="!item.value">第{{index + 1}}列： 非集合，下标值：空</p>
              <p v-else>第{{index + 1}}列： {{item.name}}，第 <strong style="color: #0f96ff;">{{item.value==0?1:item.value}}</strong> 个</p>
            </li>
          </ul>
        </div>
        <!--[显示下标 end]-->
        <div>
          <label style="font-size: 14px; color: #333;">组合数据：</label>
          <obj-cascader style="width: 50%;"
            :dataType="{'List': true, 'Object': true}"
            :selectedInfo='selectedInfo' @setSelectedInfo = 'setSelectedInfo' 
            @inputValue= 'inputValue'
          />
        </div>
        <!-- <div style="padding-left: 6px;">
          <label style="font-size: 14px; color: #333;">元素数据：</label>
          <element-list ref="elementList" style="width: 100%;" :isHtmlComp='true'
            @getElementCode='getElementCode'
          />
        </div> -->
      </div>
    </article>
    <ys-modal-btn-group @goStep="goStep" @toggleModal="closeModal" :step="step" />
  </section>
</template>

<script>
import {templateDataName} from './config'
import objCascader from './objCascader'
import elementList from './element'
export default {
  data () {
    return {
      inputDataType: '',
      selectedInfo: {
        id: -1,
        key: '',
        label: '',
        type: '',
        wholeKey: ''
      },
      step: 0,
      htmlList: [
        { code: '<input type="text" class="edit-input" />', type: 'input', descr: "单行文本框", selected: false },
        { code: '<input type="radio" name="radio" value="radio" />', descr: "单选框", type: 'radio', selected: false },
        { code: '<input type="checkbox" />', descr: "复选框", type: 'checkbox', selected: false },
        { code: '<input type="textarea" />', descr: "多行文本框", type: 'textarea', selected: false },
        { code: '<img src="" alt="" />', descr: "选择图片", type: 'img', selected: false },
      ],
      htmlInfo: {
        code: ''
      },
      cascaderVal: [],
      dataEleKey: '',
      checkList: [],
      checkListNameMap: [
        {value: '1001',value2: 'Monthly', label: '月付'},
        {value: '1002',value2: 'Two monthly', label: '2月付'},
        {value: '1003',value2: 'Quarterly', label: '季付'},
        {value: '1004',value2: 'Half', label: '半年付'},
        {value: '1005',value2: 'Annual', label: '年付'},
        {value: '1006',value2: 'Two years', label: '2年付'},
        {value: '1007',value2: 'Three years', label: '3年付'},
        {value: '1008',value2: 'One-time pay', label: '一次性付'}
      ],
      isShow: false,
      indexNum: [], // 用户输入的集合下标
    }
  },
  methods: {
    // getElementCode (val) {
    //   console.log(val, '---元素code')
    //   this.dataEleKey = val
    // },
    // initElementList () {
    //   this.$refs.elementList.getCateList()
    // },
    setSelectedInfo (val) {
      this.selectedInfo = val.selectedInfo
      this.cascaderVal = val.cascaderVal
    },
    inputValue (val){
      this.indexNum = []
      this.indexNum = val
    },
    parseKey (str) {
      let arr = str.split('.')
      var arr2 = []
      for (let i = 0; i< arr.length; i++) {
        if (i === arr.length - 1) {
          break;
        }
        var reStr = new Array(i+1).fill(null).reduce((a, c) => {
          return a+ '\.[^((?!\.).)*$]+'
        }, '\\w+')
        var regExp = new RegExp(reStr)
        var matched = str.match(regExp)[0]
        arr2.push(matched)
      }
      arr2.push(str + ".toString().length > 0")
      arr2.push(str + "!==null")
      return arr2.join(' && ')
    },
    goStep (val) {
      console.log(this.selectedInfo,'----this.selectedInfo')
      if (val > 0) {
        if (this.step === 0){
          const selected = this.htmlList.filter(item => item.selected)
          if (selected.length === 0) {
            this.$message.error('请选择插入的HTML')
            return
          }
          this.htmlInfo.code = selected[0].code
          this.htmlInfo.type = selected[0].type
        }
        const indexNum = this.indexNum
        let dataObj = this.cascaderVal.map((item,index) => {
          if (item.split('/')[3] == 'List'){
            return item.split('/')[1]+`[${(indexNum[index].value - 1) <= 0?0:(indexNum[index].value - 1)}]`
          }else{
            return item.split('/')[1]
          }
        }).join('.')
        let data = ''
        // if (this.inputDataType === 'ele') {
        //   data = `${templateDataName}.${this.dataEleKey}`
        // } else if (this.inputDataType === 'obj') {
        //   data = `${templateDataName}.${dataObj}`
        // }

        if (this.inputDataType === 'obj' || this.inputDataType === 'list') {
          data = `${templateDataName}.${dataObj}`
        }

        if (data === '' && this.inputDataType !== '') {
          this.$message.error('请选择插入的数据类型')
          return
        } else if (this.inputDataType !== '' && data === '') {
          this.$message.error('请选择正确的数据')
          return
        }
        if (this.htmlInfo.type === 'input') {
          if (!this.inputDataType) {
            // <span input-edit class="input-comm" style="min-width:280px;" len="60" index="1" id="13"></span>
            this.htmlInfo.code = `<span input-edit class='input-comm' style='min-width:280px;' len='60' index='${Date.now()}' id='${Date.now()}'>默认值</span>`
          } else {
            // this.html欧氏Info.code = `<input type='text' class='edit-input' v-model='${data}' id='${Date.now()}'/>`
            console.log(data, '----[输出data数据 start]----')
            const parsedKey = this.parseKey(data)
            console.log(parsedKey, '----[输出parsedKey数据 start]----')
            this.htmlInfo.code = `<span v-if='${parsedKey}' input-edit class='input-comm' style='min-width:280px;' len='60' index='${Date.now()}' id='${Date.now()}'>{{${data}}}</span><span v-else-if='!(${parsedKey})' input-edit class='input-comm' style='min-width:280px;' len='60' index='${Date.now()}' id='${Date.now()}'>/</span>`
          }
        } else if (this.htmlInfo.type === 'checkbox') {
            if (this.inputDataType === 'list') {
              let html = ''
              this.checkListNameMap.forEach(item => {
                this.checkList.forEach(item2 => {
                  if(item2 === item.value) {
                    const check = `TEMPLATE_DATA.${this.selectedInfo.wholeKey} == ${item.value}`
                    const check2 = `typeof TEMPLATE_DATA.${this.selectedInfo.wholeKey} == string`
                    html = `${html}<label><input type='checkbox' v-if='${check2}' /><el-checkbox v-model='${check}' id='${Date.now()}' value='${item.value}' name='${item.value}'>${item.label}</el-checkbox>&nbsp;</label>`
                  }
                })
              })
              this.htmlInfo.code = html
            } else {
              this.htmlList.selected = true
              const parsedKey = this.parseKey(data)
              console.log(parsedKey, '----[输出parsedKey数据 start]----')
              this.htmlInfo.code = `<input type='checkbox' id='${Date.now()}' value='${data}' />` + ' ' + `<span v-if='${parsedKey}' input-edit class='input-comm' index='${Date.now()}' id='${Date.now()}'>{{${data}}}</span>`
            }
        } else if (this.htmlInfo.type === 'textarea') {
          if (!this.inputDataType) {
            this.htmlInfo.code = `<input type='textarea' />`
          } else {
            this.htmlInfo.code = `<input type='textarea' v-model='${data}' />`
          }
        } else if (this.htmlInfo.type === 'img') {
            console.log(`${data}`, '-----[输出data数据]-----')
            if (`${data}` === 'TEMPLATE_DATA.partyPluginObject.companyObject.ibCompanyLicenseList[0].attachmentName') {
              this.htmlInfo.code = `<div v-for="(item, index) in TEMPLATE_DATA.partyPluginObject.licenseList" :key="index"><img v-bind:src="item.attachmentPath" style="max-width:100%;" /></div>`
            } else if (`${data}` === 'TEMPLATE_DATA.contentObject.attachmentObject.coversList[0].path') {
              this.htmlInfo.code = `<div v-for="(item, index) in TEMPLATE_DATA.contentObject.attachmentObject.coversList" :key="index"><img v-bind:src="'/'+item.path" style="max-width:100%;" /></div>`
            } else if (`${data}` === 'TEMPLATE_DATA.contentObject.attachmentObject.deliveryRecoverStandardsList[0].path') {
              this.htmlInfo.code = `<div v-for="(item, index) in TEMPLATE_DATA.contentObject.attachmentObject.deliveryRecoverStandardsList" :key="index"><img v-bind:src="'/'+item.path" style="max-width:100%;" /></div>`
            } else {
              this.htmlInfo.code = `<div v-for="(item, index) in ${data}" :key="index"><img v-bind:src="'/'+item.path" style="max-width:100%;" /></div>`
            }
        }
        if (this.step < 2) {
          this.step = this.step + 1
        }
        this.step = 0
        this.$emit('getContent', {code: this.htmlInfo.code, type: 'html'})
        this.$emit('toggleModal')
      } else {
        if (this.step > 0) {
          this.step = this.step - 1
        }
      }
    },
    handleRowClick (row) {
      this.htmlList.forEach(item => {
        item.selected = false
        if (row.code === item.code) {
          item.selected = !item.selected
          if (item.type === 'checkbox') {
            this.isShow = true
          } else {
            this.isShow = false
          }
        }
      })
    },
    closeModal () {
      this.$emit("toggleModal")
      this.$emit('goOuterStep', 0)
    }
  },
  components: {
    objCascader,
    elementList
  }
}
</script>

<style lang='scss' scoped>
article{
  h3{
    font-size: 20px;
    font-weight: bolder;
    margin: 30px 0 50px;
  }
  .input-config{
    display: flex;
    flex-direction: column;
    >div{
      display: flex;
      margin-bottom: 20px;
      label{
        font-size: 16px;
        // color: blue;
        width: 120px;
      }
    }
  }
}
article .input-config > div label[data-v-e309fb16] {
  width: 90px!important;
}
/* 用户输入下标 li-css */
.inputValue{
  text-align: left;
  max-height: 140px;
  overflow-y: auto;

  li{
    padding: 7px 6px;
  }
}
</style>
