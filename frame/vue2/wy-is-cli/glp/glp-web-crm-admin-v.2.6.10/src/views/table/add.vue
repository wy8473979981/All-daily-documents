<template>
    <div class="content" v-loading="isLoading">
        <div class="section">
            <el-form
            class="form-section block-form"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            inline
            size="small">

                <Card :title="'仓库信息'">
                    <el-row class="row-item" :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="仓库名称" prop="name">
                                <el-input v-model="ruleForm.name" :disabled="isApprove" placeholder="请输入仓库名称" class="form-input"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="仓库产权人" prop="owner">
                                <el-input v-model="ruleForm.owner " :disabled="isApprove" placeholder="请输入仓库产权人" class="form-input"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="产权人类型" prop="ownerType">
                                <el-select v-model="ruleForm.ownerType"
                                    @change="ownerTypeChange"
                                    :disabled="isApprove" class="form-input">
                                    <el-option
                                        v-for="(item,index) in SelectionOptions.OwnerTypeArray"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.key"
                                    ></el-option>
                                </el-select>

                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="ruleForm.ownerType==20">
                            <el-form-item label="产权人身份证" prop="ownerCert">
                                <el-input v-model="ruleForm.ownerCert" :disabled="isApprove" placeholder="请输入产权人身份证" class="form-input"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="ruleForm.ownerType==10">
                            <el-form-item label="产权人统一社会信用代码" prop="ownerOrgNo">
                                <el-input v-model="ruleForm.ownerOrgNo" :disabled="isApprove" placeholder="请输入产权人统一社会信用代码" class="form-input"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="仓库编号" prop="code">
                                <el-input v-model="ruleForm.code" disabled placeholder="请输入仓库编号" class="form-input"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item :span="12" label="仓库类型" prop="type" >
                                <el-select v-model="ruleForm.type"
                                    @change="typeChange"
                                    class="form-input">
                                    
                                    <el-option
                                        v-for="(item,index) in SelectionOptions.WarehouseTypeArray"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.key"
                                    ></el-option>
                                </el-select>

                            </el-form-item>
                            
                        </el-col>
                        <el-col :span="8">
                            <el-form-item
                                v-if="ruleForm.type==10"
                                prop="typeDesc" label="仓库类型说明">
                                <el-input v-model="ruleForm.typeDesc" placeholder="请输入仓库类型说明" class="form-input"></el-input>
                            </el-form-item>
                            
                        </el-col>
                    </el-row>


                    <el-row class="row-item" :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="温控类型" prop="tempType">
                                <el-checkbox-group class="el-checkbox-group" v-model="ruleForm.tempType">
                                    <el-checkbox
                                        v-for="(item,index) in SelectionOptions.TemperatureControlTypeArray"
                                        :key="index"
                                        :label="item.key"
                                        name="tempType">
                                        {{item.name}}
                                    </el-checkbox>
                                  </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="是否保税" prop="bondedFlag" >

                                <el-select v-model="ruleForm.bondedFlag" :disabled="isApprove" class="form-input">
                                    <el-option
                                        v-for="(item,index) in SelectionOptions.BooleanTypeArray"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.key"
                                    ></el-option>
                                </el-select>

                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="历史存货品类" prop="historicalInventoryCategory">
                                <el-input v-model="ruleForm.historicalInventoryCategory" placeholder="请输入历史存货品类" class="form-input"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row class="row-item" :gutter="20">
                        
                        <el-col :span="8">
                            <el-form-item label="仓库地址（省份）" prop="provinceCode">
                                <el-select v-model="ruleForm.provinceCode"
                                    @change="getProvinceChange"
                                    :disabled="isApprove" class="form-input">
                                    <el-option
                                        v-for="item in provinceData"
                                        :key="item.provinceCode"
                                        :label="item.provinceName"
                                        :value="item.provinceCode"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="cityCode" label="市">
                                <el-select v-model="ruleForm.cityCode"
                                    @change="getCityChange"
                                    :disabled="isApprove" class="form-input">
                                    <el-option
                                        v-for="item in cityData"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="districtCode" label="区/县">
                                <el-select v-model="ruleForm.districtCode" :disabled="isApprove" class="form-input">
                                    <el-option
                                        v-for="item in districtData"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="row-item" :gutter="20">
                        
                        <el-col :span="24">
                            <el-form-item class="address-input-item" prop="address" label="详细地址">
                                <el-input v-model="ruleForm.address" :disabled="isApprove" placeholder="请输入详细地址" class="form-input"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                </Card>
                <Card :title="'仓库联系人信息'">
                    <el-row class="row-item" :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="联系人姓名" prop="contacts">
                                <el-input v-model="ruleForm.contacts" placeholder="请输入联系人姓名" class="form-input"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人职位" prop="position">
                                <el-input v-model="ruleForm.position" placeholder="请输入联系人职位" class="form-input"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="联系人电话" prop="telephone">
                                <el-input v-model="ruleForm.telephone" placeholder="请输入联系人电话" class="form-input"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="row-item" :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="联系人邮箱" prop="mail">
                                <el-input v-model="ruleForm.mail" placeholder="请输入联系人邮箱" class="form-input"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </Card>

                <Card :title="'仓库资料'"
                    :tips-txt="'上传信息将影响你的评分结果'">
                    <el-row class="row-item" :gutter="20">
                        <el-col :span="12" v-for="(item,index) in filesArray" :key="index">
                            <el-form-item :label="item.label"
                                class="block-form-item"
                                :prop="item.propKey || ''">
                                <UploadTpl
                                    class="upload-tpl"
                                    :accept="item.accept"
                                    :listType="item.listType"
                                    :multiple="item.multiple || true"
                                    :limit="item.limit || 10"
                                    :showFileList="false"
                                    :disabled="false"
                                    :handle-success="handleSuccess"
                                    :on-preview="onPreview"
                                    :on-exceed="onExceed"
                                    :file-key="item.key"
                                    :file-list="ruleForm[item.key]">
                                </UploadTpl>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>

                </Card>
                <Btns v-if="query.viewType!=3" :btnsProps="btnsProps"/>
                <Btns v-else :btnsProps="returnBackBtns"/>
            </el-form>
        </div>
    </div>
</template>
<script type="text/javascript">
    import UploadTpl from "@/components/Upload/index"
    import {SelectionOptions} from '@/js/common/consts'
    import CommonApi from '@/api/common'
    import DataApi from '@/api/business'
    import businessFn from '@/js/common/businessLayer'
    import {regex,checkFn} from '@/utils/formCheck'
    export default {
        data (){
            return {

                SelectionOptions,

                query:{                         //查询参数

                },
                isLoading:false,                //是否正在加载

                isSubmitting:false,             //是否正在提交

                ruleForm:{
                    name:'',
                    owner :'',
                    ownerType:'',
                    ownerCert:'',
                    ownerOrgNo:'',
                    code:'dyhbb1883838991hasg',
                    type:'',
                    typeDesc:'',
                    tempType:[],
                    bondedFlag:'',
                    historicalInventoryCategory:'',
                    provinceCode:'',
                    cityCode:'',
                    districtCode:'',
                    address:'',

                    contacts:'',
                    position:'',
                    telephone:'',
                    mail:'',


                    houseCerts:[
                        
                    ],
                    eiaReports:[],
                    fireAcceptReports:[]

                },              //表单字段
                rules:{
                    name: [
                      { required: true, message: "请输入仓库名称", trigger: "blur" }
                      
                    ],
                    owner:[
                        {required:true,message:'请输入仓库产权人',trigger:'blur'}
                    ],
                    ownerType:[
                        {required:true,message:'请选择产权人类型',trigger:['blur','change']}
                    ],
                    ownerCert:[
                        {pattern:regex.idCard,message:'请输入正确的身份证号',trigger:'blur'}
                    ],
                    ownerOrgNo:[
                        {validator:checkFn.validateCreditCode,msg:'请输入正确的统一社会信用代码',trigger:'blur'}
                    ],
                    code :[
                        {required:true,message:'请输入仓库编号',trigger:'blur'}
                    ],
                    type :[
                        {required:true,message:'请选择仓库类型',trigger:['blur','change']}
                    ],
                    typeDesc :[
                        {required:true,message:'请输入仓库类型说明',trigger:'blur'}
                    ],
                    tempType :[
                        {required:true,message:'请选择温控类型',trigger:['blur','change']}
                    ],
                    bondedFlag :[
                        {required:true,message:'请选择是否保税',trigger:['blur','change']}
                    ],
                    historicalInventoryCategory :[
                        {required:true,message:'请输入历史存货品类',trigger:'blur'}
                    ],
                    // provinceCode :[
                    //     {required:true,message:'请选择省份',trigger:['blur','change']}
                    // ],
                    // cityCode :[
                    //     {required:true,message:'请选择城市',trigger:['blur','change']}
                    // ],
                    // districtCode :[
                    //     {required:true,message:'请选择区县',trigger:['blur','change']}
                    // ],
                    address :[
                        {required:true,message:'请输入详细地址',trigger:'blur'}
                    ],

                    telephone :[
                        {pattern:regex.mobile,message:'请输入正确的手机号',trigger:'blur'}
                    ],
                    mail :[
                        {pattern:regex.email,message:'请输入正确的邮箱号',trigger:'blur'}
                    ],

                    houseCerts :[
                        {required:true,validator: this.checkUpload,message:'请上传仓库房产证',trigger: 'blur'}
                    ],

                },                  //校验规则

                filesArray:[                                //附件数组
                    {
                        label:'仓库房产证',
                        key:'houseCerts',
                        propKey:'houseCerts',
                        accept:'.pdf, .word, .xls, .xlsx,image/*',
                    },
                    {
                        label:'仓库环评报告',
                        key:'eiaReports',
                        accept:'.pdf, .word, .xls, .xlsx',
                    },
                    {
                        label:'仓库消防验收报告',
                        key:'fireAcceptReports',
                        accept:'.pdf, .word, .xls, .xlsx',
                        limit:10
                    }
                ],


                btnsProps:{
                    submit:{
                        text:'确定',
                        func:this.submitForm,
                        isSubmitting:false
                    },
                    cancel:{
                        text:'取消',
                        func:this.cancelFunc
                    },
                },
                returnBackBtns:{
                    cancel:{
                        text:'返回',
                        func:this.cancelFunc
                    }
                },


                provinceData:[
                ],          //省份
                cityData:[
                    
                ],              //城市
                districtData:[
                    
                ],          //区县


                isDownload:false,                                           //是否正在上传文件

                addUrl:'/warehouse/add',                                        //新增url
                editUrl:'/warehouse/update',                                    //修改url
                saveDetailUrl:'',                                               //保存数据地址
                ListPath:'/table/index',                       //列表路由地址
            }
        },
        computed:{
            isApprove () {
                return this.query.isApprove==1?true:false
            }
        },
        components:{
            UploadTpl
        },
        created (){

            this.query=this.$route.query;

            // 生成仓库编号
            if(this.query.viewType==1){
                this.initData();
            }else if(this.query.viewType==2){
                this.getDetailData();
            }else if(this.query.viewType==3){
                this.getDetailData();
            }
        },
        mounted (){
            this.saveDetailUrl=this.query.viewType==1?this.addUrl:this.editUrl;
            this.getProvinceData();
        },
        methods:{

            initData (){                                    //初始化数据

                DataApi.initDetailWarehouse().then(
                    res => {
                        if(res.code==200){
                            let ndata=res.data || {};
                            this.ruleForm.code=ndata.code || '';
                            if(!this.ruleForm.code){
                                this.$message({
                                    type:'warning',
                                    message:'仓库编码为空，请刷新页面，重新生成仓库编码！'
                                })
                            }
                        }else{
                            this.$message({
                                type:'warning',
                                message:res.message?res.message:'系统异常请联系管理员！'
                            })
                        }
                        this.isLoading=false;
                    },
                    err => {
                        this.isLoading=false;
                    }
                )
            },

            getDetailData (){                                   //请求详情
                let params={
                    id:this.query.id
                };
                DataApi.getDetailWarehouse(params).then(
                    res => {
                        if(res.code==200){
                            let ndata=res.data || {};
                            // this.ruleForm=ndata;
                            Object.assign(this.ruleForm,ndata);
                            this.getCityfn();
                            this.getDistrictfn();

                            businessFn.setShowFile(this.ruleForm.houseCerts);
                            businessFn.setShowFile(this.ruleForm.eiaReports);
                            businessFn.setShowFile(this.ruleForm.fireAcceptReports);
                        }else{
                            this.$message({
                                type:'warning',
                                message:res.message?res.message:'系统异常请联系管理员！'
                            })
                        }
                        this.isLoading=false;
                    },
                    err => {
                        this.isLoading=false;
                    }
                )
            },

            getProvinceData (){                                         //获取省份

                let localData=businessFn.getLocalData('global_static_data','province');
                let localDataUpdate=businessFn.getLocalData('global_static_data','province_update') || 0;
                let nowTimes=new Date().getTime();
                if(localData && localDataUpdate && (nowTimes-localDataUpdate)<7*24*3600*1000){
                    this.provinceData=localData;
                }else {
                    this.getProvincefn();
                }
                
            },
            getProvincefn (){                                               //请求省份数据
                CommonApi.getProvince().then(
                    res => {

                        if(res.code==200){
                            let ndata=res.data || [];
                            this.provinceData=ndata;
                            businessFn.setLocalData('global_static_data','province',ndata);
                            businessFn.setLocalData('global_static_data','province_update',new Date().getTime());
                        }else{
                            this.$message({
                                type:'warning',
                                message:res.message?res.message:'系统异常请联系管理员！'
                            })
                        }
                        this.isLoading=false;
                    },
                    err => {
                        this.isLoading=false;
                    }
                )
            },
            getProvinceChange (){                                               //监听省份变化
                this.ruleForm.cityCode='';
                this.ruleForm.districtCode='';
                this.districtData=[];
                this.cityData=[];
                if(this.ruleForm.provinceCode){
                    this.getCityfn();
                }
            },
            getCityfn (){                                               //请求城市数据
                let params={
                    provinceCode:this.ruleForm.provinceCode
                };
                CommonApi.getCitys(params).then(
                    res => {
                        if(res.code==200){
                            let ndata=res.data || [];
                            this.cityData=ndata;
                        }else{
                            this.$message({
                                type:'warning',
                                message:res.message?res.message:'系统异常请联系管理员！'
                            })
                        }
                        this.isLoading=false;
                    },
                    err => {
                        this.isLoading=false;
                    }
                )
            },
            getCityChange (){                                               //监听城市变化
                this.ruleForm.districtCode='';
                this.districtData=[];
                if(this.ruleForm.cityCode){
                    this.getDistrictfn();
                }
            },
            getDistrictfn (){                                               //请求地区数据
                let params={
                    provinceCode:this.ruleForm.provinceCode,
                    cityCode:this.ruleForm.cityCode
                };
                CommonApi.getCitys(params).then(
                    res => {
                        if(res.code==200){
                            let ndata=res.data || [];
                            this.districtData=ndata;
                        }else{
                            this.$message({
                                type:'warning',
                                message:res.message?res.message:'系统异常请联系管理员！'
                            })
                        }
                        this.isLoading=false;
                    },
                    err => {
                        this.isLoading=false;
                    }
                )
            },
            submitForm (){                              //前端校验表单
                this.$refs['ruleForm'].validate((valid) => {
                    if (!valid) {
                        console.log('前端校验失败！');
                        // 页面滚动到错误位置
                        businessFn.setInputFocus();
                    } else {
                        this.subFunc();
                    }
                });
            },
            cancelFunc (){                              //返回
                this.$router.push({
                    path: this.ListPath
                })
            },


            subFunc (){                                 //提交表单
                
                if(this.isSubmitting==true){return}
                this.isSubmitting=true;
                this.btnsProps.submit.isSubmitting=this.isSubmitting;
                let params={
                    ...this.ruleForm
                };
                // 文件处理
                let houseCerts=[],eiaReports=[],fireAcceptReports=[];
                houseCerts=businessFn.setFileParams(params.houseCerts,'houseCerts',10);
                params.houseCerts=houseCerts;
                eiaReports=businessFn.setFileParams(params.eiaReports,'eiaReports',10);
                params.eiaReports=eiaReports;
                fireAcceptReports=businessFn.setFileParams(params.fireAcceptReports,'fireAcceptReports',10);
                params.fireAcceptReports=fireAcceptReports;

                // params.tempType=params.tempType.join('')*1;
                // params.provinceCode=params.provinceCode*1;
                // params.cityCode=params.cityCode*1;
                // params.districtCode=params.districtCode*1;
                // params.type=params.type*1;
                console.log('要提交的数据是：',params);

                DataApi.post(this.saveDetailUrl,params).then(
                    res => {
                        if(res.code==200){
                            // let ndata=res.data || {};

                            this.$message({
                                type:'success',
                                message:'保存成功！',
                                onClose:() => {
                                    this.isSubmitting=false;
                                    this.btnsProps.submit.isSubmitting=this.isSubmitting;
                                }
                            })
                            // 跳转路由
                            this.$router.push({
                                path: this.ListPath
                            })
                        }else{
                            this.$message({
                                type:'warning',
                                message:res.message?res.message:'系统异常请联系管理员！'
                            })
                            this.isSubmitting=false;
                            this.btnsProps.submit.isSubmitting=this.isSubmitting;
                        }
                        
                    },
                    err => {
                        
                        this.isSubmitting=false;
                        this.btnsProps.submit.isSubmitting=this.isSubmitting;

                        this.$router.push({
                            path:this.ListPath
                        })
                    }
                )
            },



            handleSuccess (data,files,key){                          //监听上传对象赋值
                this.ruleForm[key]=files;
                if(key=='houseCerts'){
                    this.$refs['ruleForm'].clearValidate('houseCerts');
                }
            },


            onPreview (a,b,c){
                console.log(a,b,c)
            },
            onExceed (files,fileList){                      //监听超出限制

                this.$message({
                    type:'warning',
                    message:'最多可以上传'+this.limit+'个文件'
                })
            },



            ownerTypeChange (){                             //检测仓库产权人类型
                this.ruleForm.ownerCert='';
                this.ruleForm.ownerOrgNo='';
                this.$refs['ruleForm'].clearValidate('ownerCert');
                this.$refs['ruleForm'].clearValidate('ownerOrgNo');
            },
            typeChange (){                              //检测仓库类型
                if(this.ruleForm.type!=10){
                    this.$refs['ruleForm'].clearValidate('typeDesc')
                }
            },
            checkUpload (rule,val,callback){            //检测仓库房产证
                if(val.length<=0){
                    callback(rule.message);
                }else {
                    callback(); 
                }
            }

        }
    }
</script>

<style lang="scss" scoped>
    .el-checkbox-group{
        margin-left: 10px;
    }
</style>