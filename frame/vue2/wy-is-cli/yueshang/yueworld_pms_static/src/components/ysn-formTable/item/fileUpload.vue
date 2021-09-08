<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="ysn-upload d-flex">
    <el-upload
      v-if="$attrs.type!=='text'"
      :action="$attrs.actionUrl||'https://jsonplaceholder.typicode.com/posts/'"
      multiple
      :limit="$attrs.limitNum"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :file-list="form[$attrs.prop]"
      :show-file-list="false"
    >
      <div>
        <ysn-btn v-if="$attrs['can-operate']" type="text" class="mr-12">上传</ysn-btn>
      </div>
    </el-upload>
    <div v-if="form[$attrs.prop].length>0" class="d-flex-column color-848382">
      <div
        v-for="(item,index) in form[$attrs.prop]"
        :key="index"
      >
        <file-list-item :item="item" :type="$attrs.type" :can-operate="item.canOperate" @handleDelFile="handleDelFile" />
      </div>
    </div>
  </div>
</template>

<script>
import FileListItem from './fileListItem'
export default {
  name: 'ItemFileupload',
  components: { FileListItem },
  inheritAttrs: false,
  props: {
    form: {
      type: Object, default: () => {
      }
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    console.log(this.$attrs)
  },
  methods: {
    // 删除文件
    handleDelFile(item) {
      this.form[this.$attrs.prop].forEach((item1, index) => {
        if (item1.url === item.url) {
          this.form[this.$attrs.prop].splice(index, 1)
        }
      })
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.form[this.$attrs.prop].push({
        name: file.name,
        url: response.object, // 替换为接口返回的url字段
        canOperate: true // 上传完后可以删除
      })
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.$attrs.limitNum} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    }
  }
}
</script>

<style lang="scss" scoped>
.ysn-upload{
  background: none;
  min-height: 1px;
  padding: 0;
}
</style>
