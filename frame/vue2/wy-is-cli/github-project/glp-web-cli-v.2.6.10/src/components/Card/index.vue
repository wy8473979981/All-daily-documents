<template>
  <el-card class="card-section">
      <div class="card-header" v-if="showHeader">
        <span class="title">{{title}}
            <span v-if="required" class="required-color">*</span>
            <span v-if="tipsTxt" class="tips">{{tipsTxt}}</span>
            <span v-if="num" class="total-span">（共
              <span class="color-primary-main">{{num}}</span>
            条）</span>
        </span>
        <div>
          <el-button
          v-if="btnOpt"
          @click="btnOpt.func"
          size="small"
          type="primary"
          class="btn-button"
        >
          <span :class="btnOpt.className?btnOpt.className:'icon iconfont'" v-html="btnOpt.icon"></span>
          {{btnOpt.name || '新增'}}</el-button>
            <!-- 表格项简化 -->
            <el-dropdown v-if="checkboxData" :hide-on-click="false" trigger="click">
                <el-button class="el-dropdown-link" size="small" title="勾选显示列">
                    筛选列<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">
                        <el-checkbox :indeterminate="isIndeterminate"
                            v-model="checkAll"
                            @change="handleCheckAllChange">全选</el-checkbox>
                    </el-dropdown-item>
                    <el-dropdown-item v-for="(item,index) in theadData"
                        :command="item.key"
                        :key="index">
                        <el-checkbox @change="handleCheckChange($event,item)"
                            v-model="item.checked"
                            :label="item.val">{{item.val}}</el-checkbox>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
      </div>
      <slot></slot>
    </el-card>
</template>

<script>
import bsFn from '@/js/common/businessLayer'
export default {
  props: {
    title: String,
    num:Number,
    tipsTxt: String,                            //提示信息
    required: Boolean,                          //是否必须
    btnOpt: Object,
    checkboxData:Array,                         //表头数据
    tableListName:String,                       //表格名称
    startUsing: Function,
    showHeader:{
      type:Boolean,
      default:true
    },
  },
  data() {
    return {
        checkAll:true,
        isIndeterminate:false,
    };
  },
  computed: {
        theadData (){
            return this.checkboxData?this.checkboxData:[]
        }
  },
  created() {},
  mounted() {
        if(this.theadData){
            this.theadData.forEach(item => {
                if(item.checked==false){
                    this.checkAll=false;
                }
            })
        }
        
  },
  methods: {


        handleCheckAllChange(val) {             //监听全选
            this.isIndeterminate = false;
            this.theadData.forEach(item => {
                item.checked=val;
            });
            let hideTheadData=val?[]:this.theadData;

            bsFn.setLocalData('global_table_list',this.tableListName,hideTheadData);
            
            this.$emit('setTheadItem',this.theadData)
        },

        handleCheckChange (val,item){
            
            let checkAll=true,hideTheadData=[];
            this.theadData.forEach(nitem => {
                if(nitem.key==item.key){
                    nitem.checked=val;
                }
                if(nitem.checked==false){
                    checkAll=false;

                    hideTheadData.push(nitem);
                }
            });
            bsFn.setLocalData('global_table_list',this.tableListName,hideTheadData);
            this.checkAll=checkAll;
            this.$emit('setTheadItem',this.theadData)
        }

  },
  components: {}
};
</script>

<style lang="scss" scoped >
    .card-section{
        margin-bottom: 20px;
    }
.card-header {
  display: flex;
  justify-content: space-between;
  color: #000;
  background: #fafafa;
  font-size: 16px;
  margin: -20px -20px 10px -20px;
  padding: 10px;
  border-top-left-radius: 5px;
  margin-bottom: 20px;
  margin-top: -20px;
  margin-left: -20px;
  margin-right: -20px;
  border-top-right-radius: 5px;
}
.title {
    font-size: 16px;
    font-weight: bold;
    line-height: 30px;
}
.tips{
    font-size: 12px;
    margin-left: 10px;
    color: #F56C6C;
    font-weight: normal;
}
.total-span{
  font-size: 14px;
  font-weight: normal;
  color: #666;
}
.btn-button{
    margin-right: 20px;
}
.required-color{
    color: #F56C6C;
}
</style>
