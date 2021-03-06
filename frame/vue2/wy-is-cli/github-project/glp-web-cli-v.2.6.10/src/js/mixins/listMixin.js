/**
 * author   lut000
 * date     2019/08/21
 * purpose  表格公用js
 * */


import tableTemplate from '@/components/tableTpl'
import paginationTemplate from '@/components/paginationTpl'
import commonDialogTemplate from '@/components/CommonDialogTpl'
import DataApi from '@/api/common'
import bsFn from '@/js/common/businessLayer'
export default {
    data (){
        return {
            isGetList:false,
            serachParm:{                                    //查询字段
            },
            dateTypeString:'yyyy/MM/dd',                    //时间格式
            
            pageInfo:{
                total:0,
                size:10,
                page:1
            },
            tableData:[],                                   //表格数据
            lastName:'',
            theadData:[                                     //表格头部信息
                
            ],

            deleteItem:null,                                //当前要删除的列表项
            showWidth:'420px',                      //设置弹出框宽度
            dialogVisible:false,                    //设置弹出框显示
            dialogTitle:'提示',                       //设置弹出框标题
            dialogTxt:'',                           //设置弹出框提示内容
            delKeyword:'仓库',                        //设置弹出框提示关键词

            localDataParentName:'global_table_list',        //本地存储列表数据键名
            tableListName:'',                               //列表名字

            getListUrl:''                                   //列表接口url地址
        }
    },

    components:{
        tableTemplate,
        paginationTemplate,
        commonDialogTemplate
    },
    created (){


        this.setTheadCheckbox();
    },
    methods:{

        setTheadCheckbox (){                        //设置表格简化数据
            let routePath=this.$route.path || '';
            // 定义本地存储名称
            this.tableListName=routePath;

            let hideTheadData=[];
            if(routePath!=''){
                let localThead=bsFn.getLocalData(this.localDataParentName,this.tableListName);
                hideTheadData=localThead || [];
            }
            this.theadData.forEach(item => {
                let checkItem=hideTheadData.find((nitem) => {
                    return nitem.key==item.key;
                });
                if(checkItem){
                    item.checked=false;
                }
            })
        },
        getTheadItem (data){                            //监听表格列变化
            this.theadData=data;
        },

        getList (){                                     //获取列表数据
            if(this.isGetList==true){return}
            this.isGetList=true;
            let params={
                ...this.serachParm,
                pageNum:this.pageInfo.page,
                pageSize:this.pageInfo.size
            }
            
            DataApi.post(this.getListUrl,params).then(
                res => {
                    if(res.code==200){
                        let ndata=res.data || {};
                        this.tableData=ndata.list || [];
                        this.pageInfo.total=ndata.total || 0;
                        
                    }else{
                        this.$message({
                            type:'warning',
                            message:res.message?res.message:'系统异常请联系管理员！'
                        })
                    }
                    this.isGetList=false;
                },
                err => {
                    this.isGetList=false;
                }
            )
        },

        mockData (){
            let arr=[];
            for(let i=0,len=2;i<len;i++){
                let obj={};
                this.theadData.forEach((item,index) => {
                    obj[item.key]=item.val+i
                });
                arr.push(obj);
            };
            this.tableData=arr;

            this.pageInfo.total=30;
        },

        getPageChange (data){
            this.pageInfo.page=data.currentPage;
            this.getList();
        },
        
        toSearch (){                        //搜索
            this.pageInfo.page=1;
            this.pageInfo.total=0;
            this.getList();
        },

        clearData (formName){                       //重置
            this.$refs[formName].resetFields();
        },

        addFunc (){                         //新增列表
            this.$router.push({
                path: this.editPath,
                query:{
                    viewType:1              //1=新增
                }
            })
        },
        editFunc (item){                                  //编辑
            this.$router.push({
                path: this.editPath,
                query:{
                    id:item.id,
                    viewType:2,
                    isApprove:item.readOnly==1?1:2                //readOnly=1,审批中
                }
            })
        },
        detailFunc (item){                  //查看详情
            this.$router.push({
                path: this.detailPath,
                query:{
                    id:item.id
                }
            })
        },
        getDelItem (data){                              //监听删除事件
            this.dialogVisible=false;
            if(data.type==true){
                // 确定删除
                let params={
                    id:this.deleteItem.id
                }
                this.saveDelete(params);
            }
        },
        saveDelete (params){                                  //删除列表数据
            if(this.isGetList==true){return}
            this.isGetList=true;
            DataApi.post(this.delListUrl,params).then(
                res => {
                    this.isGetList=false;
                    if(res.code==200){
                        this.$message({
                            type:'success',
                            message:'删除成功！'
                        })
                        this.pageInfo.page=1;
                        this.getList();
                    }else{
                        this.$message({
                            type:'warning',
                            message:res.message?res.message:'系统异常请联系管理员！'
                        })
                    }
                },
                err => {
                    // this.$message({
                    //     type:'error',
                    //     message:'网络似乎出现了问题，请稍后再试'
                    // })
                    this.isGetList=false;
                }
            )
        },
        deleteFunc (item){                                //获取删除对象
            this.dialogVisible=true;
            this.dialogTxt='确定要删除'+this.delKeyword+'“'+item.name+'”吗？';
            this.deleteItem=item;
        }
    }
}