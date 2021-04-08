<template>
    <el-dialog
        class="list-dialog"
        :title="title"
        :visible.sync="isShow"
        :show-close="true"
        :width="ow"
        center
        @close="handleClose">
        
        <el-row class="row-item" :gutter="0">
            <el-col class="line-item" :span="8">
                <ul class="list">
                    <li v-for="(item,index) in listData"
                        :key="index"
                        @click="showImg(item)"
                        >
                        <span :title="item[keyOfName]">{{formatText(item[keyOfName])}}</span>   

                        <div>
                            <el-button v-if="setIsImgFn(item)" class="detail-btn icon el-icon-view" type="text" title="查看">
                            </el-button>
                            <template v-if="disabled || item.originType===1">
                                <el-button class="icon el-icon-download download-btn"
                                    @click.stop="downloadFile(item)"
                                    type="text" title="下载">
                                </el-button>
                            </template>
                            
                            <template v-if="!disabled">
                                <el-button  class="delte-btn icon iconfont"
                                    v-if="!disabled"
                                    @click.stop="deleteFunc(item)" type="text" title="删除">
                                    &#xe61e;
                                </el-button>
                            </template>
                        </div>
                    </li>
                    <li v-if="listData.length<1">
                        暂无数据
                    </li>
                </ul>
            </el-col>
            <el-col :span="16">
                <div class="view-img">
                    <img v-if="showItem[urlKeyName]" :src="showItem[urlKeyName]" alt="img"/>
                </div>
                <div class="view-btn" align="right">
                    <el-button v-show="showItem[urlKeyName]" @click="viewDetailImg" type="primary">
                        查看原图
                    </el-button>
                </div>
            </el-col>
        </el-row>
        <ImageViewer v-if="viewImg" :current-url="showItem[urlKeyName]" :url-list="srcList" :on-close="onClose" key="ImageViewer"></ImageViewer>
    </el-dialog>
</template>

<script>
    import methodsFn from '@/js/common/methods'
    import ImageViewer from "@/components/ImageViewer";
    export default {

        name:'deletetpl',
        props:{
            disabled:{
                type:Boolean,
                default:false
            },
            dialogVisible:{
                type:Boolean,
                default:false
            },
            isView:{
                type:Boolean,
                default:false
            },
            showWidth:{
                type:String,
                default:'800px'
            },
            listData:{
                type:Array,
                default:[]
            },
            toDelete:{              //删除
                type:Function
            },
            onCloseList:{           //关闭文件管理
                type:Function
            }
        },
        data (){
            return {
                viewImg:false,          //是否显示浏览原图
                srcList:[],             //查看列表
                showItem:{              //当前显示的对象
                },
                isGetUrls:false,        //是否已经加载urls
                isDownload:false,       //是否正在下载文件

                urlKeyName:'url',                        //文件数据url字段key
                keyOfName:'name',                        //文件名字段key
            };
        },
        computed:{
            ow (){                      //弹出框宽度
                return this.showWidth;
            },
            title (){                   //弹出框标题
                return '管理文件'
            },
            isShow :{                   //弹出框是否显示
                get (){
                    return this.dialogVisible
                },
                set (){

                }
            }
        },
        components:{
            ImageViewer
        },
        created (){
        },
        methods: {
            
            handleClose (){
                this.showItem={};
                this.isGetUrls=false;
                this.srcList=[];
                this.$emit('eventClose',{});
            },

            showImg (item){                  //查看缩略图   
                if(item.isImg){
                    this.showItem=item;
                }        
            },
            viewDetailImg (){                   //浏览器大图
                if(this.isGetUrls==false){
                    this.listData.forEach(item => {
                        if(item[this.urlKeyName]){
                            this.srcList.push(item[this.urlKeyName]);
                        }
                    });
                    this.isGetUrls=true;
                }
                this.viewImg = true;
            },

            downloadFile (item){                        //下载文件
                let url=item[this.urlKeyName] || '';
                if(url){
                    methodsFn.downloadFileFn({
                        url,
                        name:item[this.keyOfName]
                    },this.downloadCallback);
                }else {
                    this.$message({
                        type:'warning',
                        message:'文件url为空，无法下载。'
                    })
                }
            },
            downloadCallback (res){                         //下载文件回调
                if(res){
                    console.log('下载返回：',res)
                }else{

                }
                this.isDownload=false;
            },

            deleteFunc (item){                  //删除文件
                if(item.isImg){
                    if(item.uuid===this.showItem.uuid){
                        this.showItem={};
                    }
                }
                this.$emit('eventDelete',item);
            },
            onClose (){                         //关闭浏览大图
                this.viewImg = false;
                // this.srcList = [];
            },



            formatText (txt){              //格式化文件名
                if(txt){
                    let re=/\.[a-z]+$/i;
                    // let arr=txt.split(re);
                    let obj=txt.match(re);
                    if(obj && obj.index>10){
                        txt=txt.substr(0,10)+'...'+obj[0];
                    }
                }

                return txt;
            },


            setIsImgFn (file){                         //通过后缀名判断文件是否为图片
                let re=/.+\.(png|jpg|jpeg|gif|bmp)$/i;
                file.isImg=re.test(file.name);
                return file.isImg;
            }
        }
    };
</script>
<style lang='scss' scoped>
    .list-dialog{
        .view-img{
            width: 80%;
            margin: auto;
            height: 400px;
            overflow: auto;
            img{
                width: 100%;
            }
        }
        .view-btn{
            width: 80%;
            margin: 20px auto 0;
        }
    }
    .list{
        padding-right: 20px;
        &>li{
            display: flex;
            justify-content:space-between;
            align-items:center;

        }
    }
    .line-item{
        border-right: 1px solid #e8e8e8;
    }
    .row-item .line-item{
        .download-btn,.delte-btn{
            margin-left: 10px;
        }
    }
</style>