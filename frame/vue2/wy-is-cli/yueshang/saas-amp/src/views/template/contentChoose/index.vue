<template>
  <el-dialog
    :visible="dialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    width="80%"
    top="5vh"
    center="center"
  >
    <section class="dialog-title" slot="title">
      <i class="el-icon-close btn-close" @click='$emit("toggle", { name: "contentChoose", visible: false })'></i>
      <el-steps :active="outerStep" finish-status="" simple class="steps-remind"
        style="width: 50%; margin: 0 auto;"
      >
        <el-step title="选择类型" class="pointer" @click.native="changeStep(0)"></el-step>
        <el-step title="选择数据" class="pointer" @click.native="changeStp(1)"></el-step>
        <!-- <el-step title="填充结果" class="pointer" @click.native="changeStep(2)"></el-step> -->
      </el-steps>
    </section>
    <section class="dialog-body">
      <choose-type-comp
        v-show="outerStep === 0"
        @changeStep='changeStep'
        :insertType='insertType'
        @sendInsertType='sendInsertType'
        @toggleModal='$emit("toggle", { name: "contentChoose", visible: false })'/>
      <component
        ref="insertContent"
        :outerStep='outerStep'
        v-if="outerStep === 1"
        :is='insertType'
        @getContent='getContent'
        @toggleModal='$emit("toggle", { name: "contentChoose", visible: false })'
        @goOuterStep='goOuterStep'
        @changeStep='changeStep'
        @emitContent='emitContent'
      ></component>
      <!-- <insert-result
        v-show="outerStep === 2"
        :insertInfo='insertInfo'
        @emitContent='emitContent'
        @toggleModal='$emit("toggle", { name: "contentChoose", val: false })'
      /> -->
    </section>
  </el-dialog>
</template>

<script>
import insertResult from './insertResult.vue'
import chooseTypeComp from './chooseType'
import objComp from './obj'
import htmlComp from './html'
import groupComp from './group'
import elementComp from './element'
import imageComp from './image'
import mock from "../mock2"
import element from '@apis/element'
export default {
  data() {
    return {
      insertInfo: {},
      outerStep: 0,
      curStepTwo: elementComp,
      headSelected: [],
      groupStep: 0,
      tableName: '',
      tableSelected: [],
      tableHead: [],
      tableBody: [],
      step: 0,
      insertType: '',
      insertContent: '',
      elePageInfo: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      groupList: [
        { label: "所有考试成绩", val: "scoreList", desc: "我是描述XXXXXXXXXXXXXX" },
        { label: "所有身高", val: "heightList", desc: "我是描述YYYYYYYYY" }
      ],
      elementList: [
      ],
      htmlList: [
        {
          label: "单选框",
          html: '<input type="radio"/>',
          desc: "我是一个单选框"
        },
        {
          label: "复选框",
          html: '<input type="checkbox"/>',
          desc: "我是一个复选框"
        }
      ],
      imageList: [
        {
          path: require('@images/logo.png'), name: 'vue的logo'
        },
        {
          path: require('@images/dragon.jpg'), name: '龙珠'
        },
        {
          path: require('@images/github.jpg'), name: 'github的logo'
        },
        {
          path: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png', name: '百度logo'
        }
      ]
    };
  },
  computed: {
    stepName() {
      return this.step === 2 ? "填充到页面" : "上一步";
    }
  },
  props: {
    dialogVisible: { type: Boolean, required: true }
  },
  methods: {
    emitContent (data) {
      this.goOuterStep(0)
      this.$emit("getContractTxt", { html: data })
      this.$refs.insertContent.setStep && this.$refs.insertContent.setStep(0)
    },
    goOuterStep (val) {
      this.outerStep = val
    },
    getContent (data) {
      this.goOuterStep(0)
      this.$emit("getContractTxt", { html: data })
    },
    insert () {
      if (this.insertType === 'element') {
        this.$emit("getContractTxt", { html: this.insertContent })
        this.resetStatus();
      } else if (this.insertType === 'group') {
        const head = this.tableSelected.map(item => `item.${item.key}`)
        const loopInnerHtml = head.reduce((a,c) => a+`<span>{{${c}}}</span>`, '' )
        const html = `
          <ol>
            <li v-for='item in ${this.tableName}'>
              ${loopInnerHtml}
            </li>
          </ol>
        `
        this.$emit('getContractTxt', { html })
        this.resetStatus()
      } else if (this.insertType === 'image') {
        const imgSelectedList = this.$refs.imgTable.selection.map(item => `<img src='${item.path}'/>`)
        const html =imgSelectedList.reduce((a, c) => a+c, '')
        this.$emit('getContractTxt', { html })
        this.resetStatus()
      }
    },

    closeModal() {
      this.$emit("toggle", { name: "contentChoose", val: false })
    },

    resetStatus() {
      this.step = 0;
      this.insertType = ''
      this.closeModal()
    },

    sendInsertType (val) {
      new Promise(resolve => {
        this.insertType = val
        resolve()
      }).then(res => {
        this.changeStep(1)
      })
    },

    changeStep (val) {
      this.outerStep = val
      if (val === 1) {
        if (this.insertType === '') {
          this.$message.error('请选择插入的数据类型')
          return
        } else if (this.insertType === 'elementComp') {
          this.$refs.insertContent.getCateList()
        } else if (this.insertType === 'groupComp') {
          this.$refs.insertContent.getGroupList()
        } else if (this.insertType === 'objComp') {
          this.$refs.insertContent.getGroupList()
        } else if (this.insertType === 'htmlComp') {
          // this.$refs.insertContent.initElementList()
        }
      }
    }
  },
  components: {
    elementComp,
    htmlComp,
    groupComp,
    imageComp,
    chooseTypeComp,
    insertResult,
    objComp
  }
};
</script>

<style lang="scss" scoped>
.dialog-title{
  position: relative;

}
.dialog-body {
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  .choose-type{
    display: grid;
    // grid-template-columns: 200px 200px 200px 200px;
    grid-template-columns: 200px 200px;
    grid-gap: 20px 20px;
    justify-items: center;
    align-items: center;
    strong{
      font-size: 24px;
    }
  }
  section.list {
    width: 100%;
  }
  .btn-group {
    display: flex;
    justify-content: flex-end;
  }
  .table-header2 {
    background: #333;
  }
}
</style>
