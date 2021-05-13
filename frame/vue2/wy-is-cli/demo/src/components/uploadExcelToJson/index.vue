<template>
  <div class="upload-excel-to-json">
    <input
      type="file"
      id="input"
    />
  </div>
</template>

<script>
import { saveAs } from 'file-saver';
import XLSX from 'xlsx'
export default {
  name: 'UploadExcelToJson',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    let input = document.querySelector('input[type=file]')
    input.addEventListener('change', () => {
      this.importfile(input)
    }, false)
  },
  methods: {
    importfile (obj) { //导入文件
      debugger
      if (!obj.files) {
        alert('文件错误，请重新选择');
        return
      }
      let reader = new FileReader();
      let file = obj.files[0];

      reader.onload = (e) => {
        let data = e.target.result;

        let wb = XLSX.read(data, {
          type: 'binary'
        });

        data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) //转成 json 数据
        console.log(data)
        this.$emit('getJsonDataFunc', data)
        this.copyTxt(JSON.stringify(data))
        // this.downloadJson(data)
      };

      reader.readAsBinaryString(file) //以二进制方式读取

    },
    downloadJson (data, filename) {
      let blob = new Blob([JSON.stringify(data)], {
        type: "text/plain;charset=utf-8"
      });
      saveAs(blob, filename || 'data.json');
    },
    copyTxt (str) {
      // 使用textarea 可以保留换行，input会取消换行
      let oInput = document.createElement('textarea');
      oInput.value = str;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand('Copy'); // 执行浏览器复制命令
      oInput.className = 'oInput';
      oInput.style.display = 'none';
      this.$message.success('复制成功');
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
