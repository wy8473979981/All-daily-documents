<!--
 * @Author: fhj
 * @LastEditors: zengcheng
 * @Description:
-->
<template>
  <div class="ysn-upload" :style="$attrs.type==='text'?'background: unset;':''">
    <el-upload
      :action="$attrs.actionUrl||'https://jsonplaceholder.typicode.com/posts/'"
      multiple
      :limit="$attrs.limitNum"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :before-upload="handleBeforeUpload"
      :file-list="$attrs[$attrs.prop]"
      :show-file-list="false"
      v-if="$attrs.type!=='text'"
    >
      <div>
        <el-button size="small" type="primary" class="mb-12">上传</el-button>
        <span class="el-upload__tip ml-8 text-14 color-848382">{{ infoText }}</span>
      </div>
    </el-upload>
    <div v-if="form[$attrs.prop].length>0" class="flex-wrap color-848382">
      <div
        v-for="(item,index) in form[$attrs.prop]"
        :key="index"
        class=""
      >
        <file-list-item :item="item" :type="$attrs.type" @handleDelFile="handleDelFile" />
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
    },
    infoText: {
      type: String,
      default: '文件大小不可不超过50MB'
    }
  },
  data() {
    return {
      demoData: [
        {name:'CgoKl1_AaveABiPkAALEMq-CSoA1530.pdf',url:'https://pmstest.powerlong.com/group1/M00/00/1A/CgoKl1_AaveABiPkAALEMq-CSoA1530.pdf'},
        {name:'CgoKl1_AaveABiPkAALEMq-CSoA1531.jpg',url:'https://pmstest.powerlong.com/group1/M00/00/1A/CgoKl1_AaveABiPkAALEMq-CSoA1531.jpg'},
        {name:'CgoKl1_AaveABiPkAALEMq-CSoA1532.png',url:'https://pmstest.powerlong.com/group1/M00/00/1A/CgoKl1_AaveABiPkAALEMq-CSoA1532.png'},
        {name:'CgoKl1_AaveABiPkAALEMq-CSoA1533.rar',url:'https://pmstest.powerlong.com/group1/M00/00/1A/CgoKl1_AaveABiPkAALEMq-CSoA1533.rar'},
        {name:'CgoKl1_AaveABiPkAALEMq-CSoA1534.xls',url:'https://pmstest.powerlong.com/group1/M00/00/1A/CgoKl1_AaveABiPkAALEMq-CSoA1534.xls'},
        {name:'CgoKl1_AaveABiPkAALEMq-CSoA1535.docx',url:'https://pmstest.powerlong.com/group1/M00/00/1A/CgoKl1_AaveABiPkAALEMq-CSoA1535.docx'},
        {name:'CgoKl1_AaveABiPkAALEMq-CSoA1536.txt',url:'https://pmstest.powerlong.com/group1/M00/00/1A/CgoKl1_AaveABiPkAALEMq-CSoA1536.txt'}
      ]
    }
  },
  mounted() {
    // 根据传入数据得条数，随机取出相应条数得demo文件
    this.form[this.$attrs.prop] = this.getRandomArrayElements(this.demoData, this.form[this.$attrs.prop].length)
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
      // 上传成功随机push一个demo数据文件
      this.form[this.$attrs.prop].push.apply(this.form[this.$attrs.prop],this.getRandomArrayElements(this.demoData, 1))
      return
      this.form[this.$attrs.prop].push({
        name: file.name,
        url: response.object // 替换为接口返回的url字段
      })
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.$attrs.limitNum} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 上传文件之前的钩子
    handleBeforeUpload(file) {
      // if (file.name.split('.')[1] !== 'jpg' && file.name.split('.')[1] !== 'png') {
      //   this.$message({
      //     message: '只能上传jpg/png文件',
      //     type: 'warning'
      //   })
      //   return false
      // }
      if (file.size > 50 * 1024 * 1024) {
        this.$message({
          message: '文件不能超过50Mb',
          type: 'warning'
        })
        return false
      }
    },
    // 随机取出数组元素
    getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
      while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
      }
      return shuffled.slice(min);
    }
  }
}
</script>

<style scoped>
.width50{
  width: 50%;
}
</style>
