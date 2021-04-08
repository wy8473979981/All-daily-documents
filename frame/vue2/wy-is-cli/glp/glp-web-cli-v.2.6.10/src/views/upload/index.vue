<template>
    <div class="content">
        <Card :title="'图片上传'">
            <UploadTpl
                class="upload-tpl"
                :accept="'image/*'"
                :listType="'picture-card'"
                :multiple="true"
                :limit="limit"
                :showFileList="true"
                :disabled="false"
                :handle-success="handleSuccess"
                :on-exceed="onExceed"
                :file-key="'imgList'"
                :file-list="imgList">
            </UploadTpl>
        </Card>

        <Card :title="'文件上传'">
            <UploadTpl
                class="upload-tpl"
                :accept="'*'"
                :listType="'text'"
                :multiple="true"
                :limit="limit"
                :showFileList="true"
                :disabled="false"
                :handle-success="handleSuccess"
                :on-exceed="onExceed"
                :file-list="fileList">
                <!-- 改变上传按钮 -->
                <!-- <el-button slot="upload-btn">
                    isButton
                </el-button> -->
            </UploadTpl>
        </Card>

        <Card :title="'多文件上传'">
            <UploadTpl
                class="upload-tpl"
                :accept="'*'"
                :listType="'text'"
                :multiple="true"
                :limit="limit"
                :showFileList="false"
                :disabled="false"
                :handle-success="handleSuccess"
                :on-exceed="onExceed"
                :file-list="moreFilesList">
                <!-- <el-button slot="upload-btn">
                    isButton
                </el-button> -->
            </UploadTpl>
        </Card>
    </div>
</template>

<script>
import UploadTpl from "@/components/Upload/index"

export default {
    props: {},
    data() {
    return {
        imgList:[],
        fileList:[],
        moreFilesList:[],
        isDownload:false,
        limit:5,
    };
    },
    methods: {

    },

    computed: {},
    created() {
        this.imgList.push({
            name: "QQ截图20190508154547.png",
            path: "tmp",
            size: 86638,
            status: "success",
            suffix: "png",
            type: "image/png",
            uid: 1572516957871,
            url: "http://glp-common.oss-cn-shanghai.aliyuncs.com/tmp/27117BCA-B945-41E3-8FA4-E903245F968F.png",
            uuid: "27117BCA-B945-41E3-8FA4-E903245F968F",
            originType:1
        });

        this.fileList.push({"status":"success","url":"http://glp-common.oss-cn-shanghai.aliyuncs.com/tmp/BFB87B7E-CFC2-4450-B1E7-806731794DF9.xlsx","uuid":"BFB87B7E-CFC2-4450-B1E7-806731794DF9","path":"tmp","uid":1572517331662,"name":"工时填报-模板.xlsx","size":12963,"type":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","suffix":"xlsx",originType:1});
        this.moreFilesList.push({"status":"success","url":"http://glp-common.oss-cn-shanghai.aliyuncs.com/tmp/BFB87B7E-CFC2-4450-B1E7-806731794DF9.xlsx","uuid":"BFB87B7E-CFC2-4450-B1E7-806731794DF9","path":"tmp","uid":1572517331662,"name":"工时填报-模板.xlsx","size":12963,"type":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","suffix":"xlsx",originType:1});
    },
    mounted() {},
    watch: {},
    components: {
        UploadTpl,
    },

    methods:{
        handleSuccess (data,files,key){                          //监听上传对象赋值
            this[key]=files;
        },
        onExceed (files,fileList){                              //监听超出限制

            this.$message({
                type:'warning',
                message:'最多可以上传'+this.limit+'个文件'
            })
        },
    }
};
</script>

<style scoped >
.container {
  padding: 20px 30px 30px;
}
.upload-container {
  width: 500px;
}
.upload-title {
  margin: 10px auto 20px;
}
</style>
