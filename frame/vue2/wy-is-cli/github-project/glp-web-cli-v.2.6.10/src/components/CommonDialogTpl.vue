<template>
    <el-dialog
        :class="'common-dialog'"
        :title="dialogTitle"
        :visible.sync="isShow"
        :append-to-body="appendToBody"
        :show-close="showClose"
        :width="showWidth"
        center
        @close="handleClose">
        <div v-html="dialogTxt"></div>
        <div slot="footer" class="dialog-footer">
            <el-button class="footer-btn" @click="emitFunc(false)">取 消</el-button>
            <el-button class="footer-btn" type="primary" @click="emitFunc(true)">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name:'commonDialogTpl',
    props:{
        'dialogVisible':{
            type:Boolean,
            default:false
        },'appendToBody':{          //是否追加到body元素上
            type:Boolean,
            default:false
        },'dialogTitle':{
            type:String,
            default:'提示'
        },'dialogTxt':{             //提示内容
            type:String,
            default:'确定要删除吗？'
        },'showWidth':{
            type:String,
            default:'420px'
        },'showClose':{             //是否显示关闭按钮
            type:Boolean,
            default:true
        },
    },
    data: function() {
        return {
            
        };
    },
    computed:{
        isShow:{
            get () {
                return this.dialogVisible;
            },
            set () {
                
            }
        }
    },
    created (){
        
    },
    methods: {
        emitFunc (type){
            this.handleClose(type);
        },
        handleClose (type){
            this.$emit('eventDelItem',{
                type,
                data:{}
            });
        }
    }
};
</script>
<style lang='scss' scoped>
    .common-dialog{
        .footer-btn{
            width: 54px;
            height: 32px;
            padding: 0px;
            font-size: 14px;
        }
        .footer-btn:first-child{
            margin-right: 30px;
        }
    }
</style>