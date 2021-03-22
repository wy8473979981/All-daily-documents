<template>
  <section class="editor-page">
    <main>
      <ys-rich-editor ref="editor" @toggle="toggleDialog">
        <div class="my-tool-bar">
          <el-button size="mini" type="primary" @click="toggleDialog({name: 'tempInfo', visible: true})">填写模板信息</el-button>
          <el-button size="mini" @click="saveAsTemp" type="warning">暂存</el-button>
          <el-button size="mini" @click="launch" type="success">发布</el-button>
          <el-button size="mini" @click="setPage" type="primary" style="margin-right: 15px;">设置分页</el-button>
          <el-button
            @click="noVueEdit"
            size="mini"
            type="danger"
            style="position: absolute; top: 159px; right: 40px;"
            round
          >选中/取消禁用</el-button>
        </div>
      </ys-rich-editor>
    </main>
    <content-dialog2
      :dialogVisible="dialogVisible.content"
      @closeModal='closeModal'
    >
      <!-- <choosed-result ref="notLoop" @getContractTxt="getContractTxt" @toggle="toggleDialog"></choosed-result> -->
    </content-dialog2>
    <content-choose
      :dialogVisible='dialogVisible.contentChoose'
      @getContractTxt="getContractTxt"
      @toggle="toggleDialog"
    />
    <temp-info :visible="dialogVisible.tempInfo" @toggle='toggleDialog' :isUpdate='true'
      :data='tempInfo'
      ref='tempInfo'
    />
    <preview
      :visible='dialogVisible.preview'
      @toggle="toggleDialog"
      :contractHtml='contractHtml'
      :data='previewData'
    />
  </section>
</template>
<script>
// import {vueTemp1, vueTemp2} from './vueTemp'
import {template, templateDataName, templatePlaceHolder} from './contentChoose/config'
// import contentDialog2 from "@comps/contentDialog2.vue"
import contentChoose from './contentChoose/index.vue'
import logComp from './logComp.vue'
import choosedResult from './choosedResult.vue'
import preview from './preview.vue'
import tempInfo from './tempInfo.vue'
import {previewData} from '../../apis/mock'
import contTemp from '@apis/contTemp'
import {dialog} from '@mixins'

export default {
  mixins: [dialog],
  data() {
    return {
      tempForm: {
        contract_mould_id: '',
        company_contract_id: '',
        contract_mould_descr: '',
        contract_mould_content: ''
      },
      launchForm: {

      },
      contract_mould_content: '',
      tempInfo: {},
      previewData,
      dialogVisible: {
        tempInfo: false,
        content: false,
        contentChoose: false,
        preview: false
      },
      contractHtml: "",
      originInsert: '',
      logList: [
      ]
    }
  },
  components: {
    // contentDialog2, 
    contentChoose, 
    logComp, 
    choosedResult, 
    preview, 
    tempInfo
  },
  methods: {
    checkParams () {
      const isEmpty = JSON.stringify(this.$refs.editor.getRichContent('add')) === '[{"insert":"\\n"}]'
      const {company_id, contract_mould_cate_id, contract_mould_name=''} = this.tempInfo
      // console.log(company_id, '---机构id')
      if (!company_id) {
        this.$message.error('请选择机构类型')
        return false
      } else if (!contract_mould_cate_id) {
        this.$message.error('请选择模板分类')
        return false
      }
      else if (isEmpty) {
        this.$message.error('请输入模板内容')
        return false
      }
      return true
    },

    async saveAsTemp () {
      if (!this.checkParams()) return
      const params = {
        contract_mould_id: this.$route.params.id,
        company_contract_id: this.tempInfo.company_contract_id,
        contract_mould_descr: this.tempInfo.contract_mould_descr,
        contract_mould_content: JSON.stringify(this.$refs.editor.getRichContent('add'))
      }
      // console.log(params.contract_mould_content, '----[输出params.contract_mould_content数据 start]----')
      const res = await contTemp.updateScript(params)
      if (res.code === 200) {
        // this.$timeoutRouter.push({name: 'templateList'})
      }
    },
    async launch () {
      if (!this.checkParams()) return
      const [fore, aft] = template.split(templatePlaceHolder)
      const params = Object.assign(
        this.tempInfo,
        {
          contract_mould_id: this.$route.params.id,
          contract_mould_content: JSON.stringify(this.$refs.editor.getRichContent('add')),
          contract_mould_view: `${fore}${this.$refs.editor.getInnerText('add')}${aft}`
        }
      )
      const res = await contTemp.updateLaunch(params)
      if (res.code === 200) {
        // this.$message.error('发布成功')
        this.$timeoutRouter.push({name: 'templateList'})
      }
    },

    getEditorInnerText () {
      console.log(this.$refs.editor.getInnerText('add'), '----inner txt')
    },

    handlePreview () {
      let html = `<div class="ql-editor">${this.$refs.editor.getInnerText('add')}</div>`
      html = html.replace(/{{\w+}}/, (val) => {
        const code = val.substring(2, val.length - 2)
        return previewData[code]
      })
      this.contractHtml = html
      this.toggleDialog({name: 'preview', visible: true})
    },

    // 列表插入 start
    insertList () {
      const arr = [
        {"insert":"abcdefg"},
        {"attributes":{"align":"center"},"insert":"\n"},

        {"insert":"不是循环\n开始循环"},
        {"attributes":{"list":"ordered"},"insert":"\n"},
        {"insert":"<ol><li v-for='(item, index) in 10' :key='index'>{{item}}</li></ol>"},
        {"attributes":{"list":"ordered"},"insert":"\n"},

        {"insert":"循环外面\n"}
      ]
      this.$refs.editor.setContents(arr)
    },

    closeModal () {
      for (let i in this.dialogVisible) {
        this.toggleDialog({name: i, visible: false})
      }
    },

    getContractTxt(val) {
      let richContent = this.$refs.editor.richContent
      const updatedContent = richContent.map((item, index) => {
        const remained1 = item.insert.substr(0, this.$refs.editor.selectedIndexAtGroup)
        const remained2 = item.insert.substr(
          this.$refs.editor.selectedIndexAtGroup + this.$refs.editor.selectedLength,
          item.insert.length
        )
        const updated = remained1 + val.html.code + remained2
        return {
          ...item,
          insert: index === this.$refs.editor.selectedGroupIndex ? updated : item.insert
        }
      })
      this.$refs.editor.setContents(updatedContent)
    },

    // 获取循环数据
    getLoopData (loopData) {
      if (this.selectedGroupIndex === -1) return
      const selectedInsert = this.richContent[this.selectedGroupIndex].insert
      const insertArr = selectedInsert.split('\n')
      const lengthArr = insertArr.map(item => item.length)

      const position = this.findPosition(lengthArr, this.selectedIndexAtGroup)
      const forePart = {insert: `${insertArr[position - 1]}\n${loopData[0]}`}
      let middlePart = loopData.slice(1).map((item) => {
        return {insert: item}
      })

      const aftPart = {insert: `${insertArr[position + 1]}\n`}

      let loopPart = middlePart
      loopPart.unshift(forePart)
      let arrPosition = []
      for (let i = 0; i < middlePart.length; i++) {
        arrPosition.push(i*2+1)
      }
      for (let i = 0; i<arrPosition.length; i++) {
        loopPart.splice(arrPosition[i], 0, {"attributes":{"list":"ordered"},"insert":"\n"})
      }
      loopPart.push(aftPart)
      let richContent = this.richContent
      richContent.splice(this.selectedGroupIndex, 1)
      richContent = richContent.concat(loopPart)
      this.$refs.editor.setContents(richContent)
    },

    recordLog (substituted) {
      const originInsert = this.richContent.find((item, index) => {
        return index === this.selectedGroupIndex
      }).insert.substr(this.selectedIndexAtGroup, this.selectedIndexAtGroup + this.selectedLength)

      this.logList.push({
        origin: originInsert, substituted
      })
    },

    insertNoList () {
      const arr = [
        {"insert":"abcdefg"},
        {"attributes":{"align":"center"},"insert":"\n"},
        {"insert":"不是循环\n将被循环替代的\n循环外面\n"}
      ]
      this.$refs.editor.setContents(arr)
    },

    getTempInfo (data) {
      this.tempInfo = data
      this.toggleDialog({name: 'tempInfo', visible: false})
    },

    async getData () {
      const res = await contTemp.findById({contract_mould_id: this.tempForm.contract_mould_id})
      const {code, result} = res
      if (code === 200) {
        this.tempInfo = {
          company_contract_id: result.company_contract_id,
          company_id: result.company_id,
          contract_mould_cate_id: result.contract_mould_cate_id,
          contract_mould_descr: result.contract_mould_descr,
          contract_mould_content: result.contract_mould_content
        }
        // console.log(this.tempInfo.contract_mould_content, '----[输出this.tempInfo.contract_mould_content数据 start]----')
        this.$refs.tempInfo.loadData(this.tempInfo)
        // console.log(this.tempInfo, '----[输出this.tempInfo数据 start]----')
        this.$refs.editor.setContents(JSON.parse(result.contract_mould_content))
      }
    },

    // 新增 禁用选中区域创建class="noVueEdit"功能 start
    noVueEdit () {
      const selContent = tinymce.activeEditor.selection.getContent()
      // 获取编辑区域文本Html
      const html = tinymce.activeEditor.dom.doc.activeElement.innerHTML
      if (selContent == 0) {
        this.$message.error('请选择禁用的内容')
      } else {
        const strs = html.split(selContent)
        const strl = strs.length - 1
        let res = '<span class="noVueEdit">' + `${selContent}` + '</span>'
        // 符合处理条件，取消选中
        if (strs[0].indexOf('<span class=') != -1 && strs[strl].indexOf('</span>') != -1){
          console.log('当前文字有被禁用，取消禁用：')
          res = `</span></span>${selContent}`
        }
        tinymce.execCommand('mceInsertRawHTML', false, res)
      }
    },

    // 设置模板分页 start
    setPage () {
      const set = tinymce.activeEditor.selection.getContent()
      let res = '<div style="page-break-after: always;">' + `${set}` + '</div>'
      tinymce.execCommand('mceReplaceContent', false, res)
    }
  },

  mounted () {
    this.tempForm.contract_mould_id = this.$route.params.id
    // this.$refs.editor.toSelectionChange()
    this.$refs.editor.initTinymce()
    this.getData()
  }
};
</script>

<style lang='scss' scoped>
section.editor-page{
  main{
    background: white;
    min-height: 400px;
    padding: 20px;
  }
}
.el-menu-item {
  border-left: 2px solid #ceb367!important;
  background-color: #34353e!important;
}
</style>

