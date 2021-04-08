<template>
  <transition-group
    tag="ul"
    :class="[
      'el-upload-list',
      'el-upload-list--' + listType,
      { 'is-disabled': disabled }
    ]"
    name="el-list"
  >
    <li
      v-for="file in files"
      :class="['el-upload-list__item', 'is-' + file.status, focusing ? 'focusing' : '']"
      :key="file.uid"
      tabindex="0"
      @keydown.delete="!disabled && $emit('remove', file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
    >
      <slot :file="file">
        <img
          class="el-upload-list__item-thumbnail"
          v-if="file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1"
          :src="file[urlKeyName]"
          alt
        />
        <div class="flex-between-ele">
            <label>{{file.name}}</label>
            <span
                v-if="file.originType===1"
                @click="downloadFile(file)" style="margin-right: 30px;cursor: pointer;">
              <i class="el-icon-download"></i>
              
            </span>
        </div>
        
        <label class="el-upload-list__item-status-label">
          <i
            :class="{
            'el-icon-upload-success': true,
            'el-icon-circle-check': listType === 'text',
            'el-icon-check': ['picture-card', 'picture'].indexOf(listType) > -1
          }"
          ></i>
        </label>
        <i class="el-icon-close" v-if="!disabled" @click="$emit('remove', file)"></i>
        <i class="el-icon-close-tip" v-if="!disabled">{{ t('el.upload.deleteTip') }}</i>
        <!--因为close按钮只在li:focus的时候 display, li blur后就不存在了，所以键盘导航时永远无法 focus到 close按钮上-->
        <el-progress
          v-if="file.status === 'uploading'"
          :type="listType === 'picture-card' ? 'circle' : 'line'"
          :stroke-width="listType === 'picture-card' ? 6 : 2"
          :percentage="parsePercentage(file.percentage)"
        ></el-progress>
        <span class="el-upload-list__item-actions" v-if="listType === 'picture-card'">
          <span
            class="el-upload-list__item-preview"
            v-if=" listType === 'picture-card'"
            @click="handlePreview(file,files)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="$emit('remove', file)">
            <i class="el-icon-delete"></i>
          </span>
          <span
              v-if="!disabled && file.originType===1"
              class="el-upload-list__item-delete"
              @click="downloadFile(file)"
            >
              <i class="el-icon-download"></i>
            </span>
        </span>
      </slot>
    </li>
    <ImageViewer v-if="showViewer" :current-url="currentUrl" :url-list="srcList" :on-close="onClose" key="ImageViewer"></ImageViewer>
  </transition-group>
</template>
<script>
import Locale from "element-ui/src/mixins/locale";
import ElProgress from "element-ui/packages/progress";
import ImageViewer from "@/components/ImageViewer";
export default {
  name: "ElUploadList",

  mixins: [Locale],

  data() {
    return {
      focusing: false,
      showViewer: false,
      srcList: [],
      currentUrl:'',

      urlKeyName:'url',                        //文件数据url字段key
      keyOfName:'name',                        //文件名字段key
    };
  },
  components: { ElProgress, ImageViewer },

  props: {
    files: {
      type: Array,
      default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    listType: String
  },
  methods: {
    parsePercentage(val) {
      return parseInt(val, 10);
    },
    handlePreview(file, files) {
      let srcList = [];
      files.map((item, index) => {
        if(item[this.urlKeyName]){
            srcList.push(item[this.urlKeyName]);
        }
      });
      this.showViewer = true;
      this.srcList = srcList;
      this.currentUrl=file[this.urlKeyName] || '';
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
    onClose() {
      this.showViewer = false;
      this.srcList = [];
    }
  }
};
</script>

<style lang="scss" scoped>
    .el-upload-list{
    }
    .flex-between-ele{
        display: flex;
        justify-content:space-between;
        align-items:center;
    }
</style>
