<template>
    <div class="content">
        <div class="section search-section">
            <Card :show-header="false">
                <el-form class="form-section block-form" ref="searchForm" :model="serachParm" :inline="true" size="small">
                    <el-row class="row-item" :gutter="0">
                        <el-col :span="8">
                            <el-form-item class="form-item-div" label="仓库名称" prop="name">
                                <el-input class="form-item" v-model="serachParm.name" placeholder="请输入仓库名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="form-item-div" label="仓库产权人" prop="owner">
                                <el-input class="form-item" v-model="serachParm.owner" placeholder="请输入仓库产权人"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="form-item-div" label="仓库编号" prop="code">
                                <el-input class="form-item" v-model="serachParm.code" placeholder="请输入仓库编号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="form-item-div" label="客户经理" prop="createUser">
                                <el-input class="form-item" v-model="serachParm.createUser" placeholder="请输入客户经理"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item class="form-item-div"
                                label="创建时间起始日" prop="createTimeStart">
                                <el-date-picker
                                    type="date"
                                    placeholder="选择起始日期"
                                    :value-format="dateTypeString"
                                    v-model="serachParm.createTimeStart"
                                     class="form-input"

                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item class="form-item-div"
                                label="创建时间截止日" prop="createTimeEnd">
                                <el-date-picker
                                    :picker-options="endPickerOptions"
                                    type="date"
                                    placeholder="选择截止日期"
                                    :value-format="dateTypeString"
                                    v-model="serachParm.createTimeEnd"
                                    class="form-input"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="row-item" :gutter="0">
                        <el-col :span="24" align="center">
                            <el-button
                              type="primary"
                              @click="submitSearch"
                              size="small"
                              class="btn-twofont"
                            >查询</el-button>
                            <el-button @click="clearData('searchForm')"  class="btn-twofont" size="small">重置</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </Card>
        </div>

        <div class="section table-section">
            <Card
                :btn-opt="operateOption"
                :el-icon-class="'el-icon-plus'"
                @setTheadItem="getTheadItem"
                :checkbox-data="theadData"
                :table-list-name="tableListName"
                :num="this.pageInfo.total"
                :title="'仓库列表'">
                <!-- 表格插件 -->
                <tableTemplate
                    v-loading="isGetList"
                    :thead-data="theadData"
                    :table-data="tableData"
                ></tableTemplate>   
                <!-- 分页插件 -->
                <paginationTemplate :pageInfo="pageInfo" @getPageChange="getPageChange"></paginationTemplate>
            </Card>
          
        </div>


        <!-- 删除插件 -->
        <commonDialogTemplate
            v-on:eventDelItem="getDelItem"
            :appendToBody="false"
            :show-width="showWidth" :dialog-visible="dialogVisible" 
            :dialog-title="dialogTitle" :dialog-txt="dialogTxt">
        </commonDialogTemplate>
    </div>
</template>
<script type="text/javascript">
    import listMixin from '@/js/mixins/listMixin'
    export default {
        mixins:[listMixin],
        data (){
            let self=this;
            return {
                theadData:[
                    {checked:true,key:'name',val:'仓库名称'},
                    {checked:true,key:'owner',val:'仓库产权人'},
                    {checked:true,key:'code',val:'仓库编号'},
                    {checked:true,key:'historicalInventoryCategory',val:'历史品类'},
                    {checked:true,key:'createUser',val:'客户经理'},
                    {checked:true,key:'provinceName',val:'地址（省份）'},
                    {checked:true,key:'cityName',val:'地址（城市）'},
                    {checked:true,key:'createTime',val:'创建时间',isFormat:true,formatFn:this.formatFn},
                    {checked:true,key:'isBtns',val:'操作',checkRight:false,btnItems:this.setBtnItems(),width:'150px'},
                    //checkRight=true  需要对按钮做权限校验    btnItems 所有按钮集合
                ],
                

                serachParm:{                    //查询参数
                    name:'',
                    owner:'',
                    code:'',
                    createUser:'',
                    createTimeStart:'',
                    createTimeEnd:''
                },

                startPickerOptions:{
                    disabledDate (time){
                        let nowDate=new Date();
                        return time.getTime()<nowDate.getTime()-24*3600*1000;
                    } 
                },
                endPickerOptions:{
                    disabledDate (time){
                        let createTimeStart=self.serachParm.createTimeStart || '';
                        if(createTimeStart){
                            let sdTime=new Date(createTimeStart).getTime();
                            return time.getTime()+ 24 * 3600 * 1000<sdTime;
                        }
                        
                    } 
                },
                addPath:'/table/add',
                operateOption:{
                    className:'el-icon-plus',
                    name:'新增',
                    func:this.addFunc
                },


                getListUrl:'/warehouse/list',                       //列表数据地址
                delListUrl:'/warehouse/del',                        //删除数据地址
                detailPath:'/detail/view',              //详情页路由地址
                editPath:'/table/add',                  //修改页路由地址
            }
        },
        components:{
        },
        created (){

            this.getList();

            this.mockData();
        },
        methods:{
            setBtnItems (){                                 //设置有权限的按钮
                
                let items=[
                        
                    ];

                items.push({
                    name:'查看',
                    type:'text',
                    func:this.detailFunc,
                    
                });
                items.push({
                    name:'修改',
                    type:'text',
                    func:this.editFunc
                });
                items.push({
                    name:'删除',
                    type:'text',
                    className:'delete-btn',
                    func:this.deleteFunc,
                    checkFunc:(row) => {
                        console.log(111111)
                        return true;
                    }
                });

                return items;
            },
            submitSearch (){                            //提交搜索按钮
                if(this.serachParm.createTimeStart && this.serachParm.createTimeEnd){
                    if(this.serachParm.createTimeStart>this.serachParm.createTimeEnd){
                        this.$message({
                            type:'warning',
                            message:'开始时间必须大于结束时间'
                        })
                    }else{
                        this.toSearch();
                    }
                }else{
                    this.toSearch();
                }
                
            },
            formatFn(item){
                return item;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search-section{
        .form-section{
        }

        .form-item-div{
            margin-bottom: 20px;
        }

        .search-btn-item{
            margin-bottom: 0px;
        }
    }
</style>