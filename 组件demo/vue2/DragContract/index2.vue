<template>
  <div class="signed-page-container">
    <div class="signed-page-content-header">
      <div class="back">
        <img src="./img/back.png" alt="">
        <span>返回</span>
      </div>
      <div class="save" @click="saveFunc()">保存</div>
    </div>
    <div class="signed-page-content-container">
      <div class="point-position-page">
        <div class="doc-mini-documents fl">
          <div class="title">导出
            <span class="main-title">用章文件</span>
            <span class="sub-title">共5份</span>
          </div>
          <el-scrollbar style="height: calc(100% - 37px)">
            <ul class="doc-mini-documents-ul">
              <li :class="currentContractIndex==index?'doc active':'doc'" @click="contractClick(item,index)" v-for="(item,index) in contracstList" :key="index">
                <div class="doc-title" :title="item.name">{{item.name}}</div>
                <div class="doc-thumbnail-container">
                  <div class="doc-thumbnail" :style="{backgroundImage: 'url(data:image/png;base64,'+item.curAbbImgBase64code+')'}"></div>
                </div>
                <div class="doc-totalPage">
                  <div :class="currentContractIndex==index?'el-input totalPage-container ':'el-input totalPage-container is-disabled'">
                    <span>转到</span>
                    <template v-if="currentContractIndex==index">
                      <input type="text" v-model="item.currentPage" placeholder="页码" class="el-input__inner" :disabled="currentContractIndex==index?false:true">
                    </template>
                    <template v-else>
                      <input type="text" placeholder="页码" class="el-input__inner" :disabled="currentContractIndex==index?false:true">
                    </template>
                    <span>/3</span>
                  </div>
                </div>
              </li>
            </ul>
          </el-scrollbar>
        </div>
        <div class="point-position-doc">
          <div class="point-position-doc-con documents-content">
            <div class="point-position-doc-title">{{currentContractName}}</div>
            <el-scrollbar style="height: calc(100% - 80px)">
              <div class="point-position-doc-list">
                <div class="point-position-doc-wrapper" :style="{width:pointPositionDocWrapperWidth+'px'}">
                  <div class="point-position-doc-pages" :style="{transform: 'scale(' + scaleSize + ')', transformOrigin: 'left top', width: qfzChecked?'913px':'793px'}">

                    <div class="point-position-doc-page" v-for="(contractDetailItem,contractDetailIndex) in contractDetailAry" :key="contractDetailIndex" @click="contractDetailClick(contractDetailIndex)">
                      <div class="point-position-doc-page-con" :style="{width:qfzChecked?'913px':'793px', height: '1121px'}">
                        <img width="793" height="1121" class="image" :src="'data:image/png;base64,' + contractDetailItem.contractDetailItemImgUrl">
                        <VueDragResize :parentLimitation="true" :isResizable="false" :isDraggable="true" v-for="(dragItem,dragIndex) in contractDetailItem.appendingSignLabels" :key="dragItem.id" :w="dragItem.w" :h="dragItem.h" :x="dragItem.x" :y="dragItem.y" :parentW="dragItem.parentW" :parentH="dragItem.parentH" @clicked="onActivated(dragItem,dragIndex,contractDetailIndex)" @dragstop="onDragstop">

                          <div class="send-label-default gz" v-if="dragItem.DragType=='gz'">
                            <div class="send-label-name">哈哈哈哈哈</div>
                            <div class="send-label-wrapper">
                              <div class="send-label-seal">
                                <div class="send-label-seal-img"></div>
                              </div>
                            </div>
                            <div class="send-label-border"></div>
                            <i class="label-close-icon" @click="deleteGzcFunc(index)"></i>
                          </div>
                          <div class="send-label-default rq" v-if="dragItem.DragType=='rq'">
                            <div class="send-label-name">签署日期处</div>
                            <i class="label-close-icon" @click="deleteGzcFunc(index)"></i>
                          </div>
                          <div class="send-label-default qm" v-if="dragItem.DragType=='qm'">
                            <div class="send-label-name">哈哈哈哈哈</div>
                            <div class="send-label-wrapper">签名处</div>
                            <i class="label-close-icon" @click="deleteGzcFunc(index)"></i>
                          </div>

                        </VueDragResize>
                        <div class="riding-seals" v-if="qfzChecked">
                          <div class="riding-seals-bg"></div>
                          <VueDragResize :parentLimitation="true" :isResizable="false" :isDraggable="true" v-for="(dragItem,dragIndex) in contractDetailItem.appendingSignLabels" :key="dragItem.id" :w="dragItem.w" :h="dragItem.h" :x="dragItem.x" :y="dragItem.y" :parentW="dragItem.parentW" :parentH="dragItem.parentH" @clicked="onActivated(dragItem,dragIndex,contractDetailIndex)" @dragstop="onDragstop">

                            <div class="send-label-default gz" v-if="dragItem.DragType=='qfz'">
                              <div class="send-label-name">哈哈哈哈哈</div>
                              <div class="send-label-wrapper">
                                <div class="send-label-seal">
                                  <div class="send-label-seal-img"></div>
                                </div>
                              </div>
                              <div class="send-label-border"></div>
                              <i class="label-close-icon" @click="deleteGzcFunc(index)"></i>
                            </div>
                          </VueDragResize>
                        </div>
                      </div>
                      <p class="point-position-doc-page-footer">
                        {{currentContractName}}
                        <span class="fr">第{{contractDetailIndex+1}}页共{{currentContractTotalPage}}页</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </el-scrollbar>
            <div class="next-doc-btn">进入下一份合同</div>
          </div>
        </div>
        <div class="point-position-site">
          <div class="title">
            <span class="main-title">操作</span>
          </div>
          <el-scrollbar style="height: calc(100% - 37px)">
            <div class="point-position-site-container">
              <div class="line" :style="{width:dottedLineHeight+'px'}"></div>
              <ul class="point-position-site-ul">
                <li class="step">
                  <div class="step-icon-left-1"></div>
                  <div class="step-box-right">
                    <p class="step-name">选择签约方</p>
                    <ul class="step-box-right-ul">
                      <li @click="qianyuefangClick(index)" v-for="(item,index) in qianyuefangAry" :key="index">
                        <template>
                          <span class="checked" v-if="qianyuefangIndex==index"></span>
                          <span class="no-check" v-else></span>
                        </template>
                        <span class="qy-name">{{item.userInfo.enterpriseName}}</span>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="step">
                  <div class="step-icon-left-2"></div>
                  <div class="step-box-right">
                    <p class="step-name">拖动签署位置</p>
                    <ul class="step-box-right-ul">
                      <li v-if="currentUserType=='ENTERPRISE'" @click="createDragFunc('gz')">
                        <span class="operation-gz"></span>
                        <span class="operation-name">盖章</span>
                      </li>
                      <li v-else @click="createDragFunc('qm')">
                        <span class="operation-qm"></span>
                        <span class="operation-name">签名</span>
                      </li>
                      <li @click="createDragFunc('rq')">
                        <span class="operation-rq"></span>
                        <span class="operation-name">签署日期</span>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="step" v-if="currentContractTotalPage>1">
                  <div class="step-icon-left-3"></div>
                  <div class="step-box-right">
                    <p class="step-name">加盖骑缝章</p>
                    <ul class="step-box-right-ul">
                      <li @click="qfzFunc()">
                        <!-- <span class="no-check"></span> -->
                        <span :class="qfzChecked?'operation-qfz operation-qfz-checked':'operation-qfz operation-qfz-check'"></span>
                        <span class="qy-name">加盖骑缝章</span>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize'
export default {
  name: 'DragContract',
  props: {
    params: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  watch: {
    params: {
      handler: function (newValue) {
        // this.contracstList = newValue
      },
      immediate: true,
      deep: true
    },
  },
  components: { VueDragResize },
  data () {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      qfzChecked: false,// 骑缝章选择
      pointPositionDocWrapperWidth: null,
      dottedLineHeight: null,
      scaleSize: null,// 缩放比例
      currentPage: 1, // 当前合同第几页
      currentContractName: '',// 当前合同文件名称
      currentUserType: null,// 当前合同选择的签约方类型 ENTERPRISE：企业
      currentContractTotalPage: 0,// 当前合同总页数
      qianyuefangIndex: 0, // 签约方下标
      currentContractIndex: 0, // 当前操作合同列表下标
      currentContractDetailPage: 0, // 当前操作合同详情的页码
      currentDragModuleIndex: null, // 当前操作拖拽项的下标
      qianyuefangAry: [],// 签约方
      contractDetailAry: [],// 当前选择合同的详情
      contracstList: [],// 合同集合


      allList: [],
    }
  },

  computed: {

  },
  created () {
    // localStorage.setItem('params', JSON.stringify(this.params))

    let params = JSON.parse(localStorage.getItem('params'))

    params.map((item, index) => {
      let { documents, roles } = item
      let documentsAry = []
      let rolesAry = []

      documents.map((docItem, docIndex) => {
        let documentsDetailItem = []
        docItem.imgList.map((imgItem, imgIndex) => {
          let obj = { index: imgIndex, contractDetailItemImgUrl: imgItem, appendingSignLabels: [] }
          documentsDetailItem.push(obj)
        })
        let contractItem = {
          pkid: docItem.pkid, name: docItem.title, contractDetailAry: documentsDetailItem, currentPage: docItem.curPage, totalPage: docItem.totalPage, suffix: documents.suffix, riginalFilename: docItem.riginalFilename, signingStatus: docItem.signingStatus, curAbbImgBase64code: docItem.curAbbImgBase64code, roles: roles
        }
        documentsAry.push(contractItem)
      })
      roles.map((roleItem, roleIndex) => {
        // ridingSealY  骑缝章坐标,数据跟着签约方
        let obj = { index: index, roleName: roleItem.roleName, sealName: roleItem.sealName, signOrderly: roleItem.signOrderly, userInfo: roleItem.userInfo, enterpriseName: roleItem.enterpriseName, userAccount: roleItem.userAccount, userType: roleItem.userType, ridingSealY: '' }
        rolesAry.push(obj)
      })
      this.contracstList.push({ documents: documentsAry, roles: rolesAry })
    })

    console.log('this.contracstList>>>', this.contracstList)

    this.currentContractName = this.contracstList[0].name
    this.qianyuefangAry = this.contracstList[0].roles
    this.contractDetailAry = this.contracstList[0].contractDetailAry
    this.currentUserType = this.qianyuefangAry[0].userType
    this.currentContractTotalPage = this.contracstList[0].totalPage

    localStorage.setItem('contracstList', JSON.stringify(this.contracstList))

  },
  mounted () {
    this.computedStyle()
    window.onresize = () => {
      return (() => {
        this.computedStyle()
      })()
    }

  },

  methods: {
    computedStyle () {
      this.pointPositionDocWrapperWidth = document.querySelector('.point-position-doc-con').offsetWidth - 100
      if (this.qfzChecked) {
        this.scaleSize = this.pointPositionDocWrapperWidth / 913
      } else {
        this.scaleSize = this.pointPositionDocWrapperWidth / 793
      }
      this.dottedLineHeight = document.querySelector('.point-position-site-ul .step:nth-child(1)').offsetHeight + document.querySelector('.point-position-site-ul .step:nth-child(2)').offsetHeight - 10
    },
    qianyuefangClick (item, index) {
      this.qianyuefangIndex = index
      this.currentUserType = item.userType
      console.log('已选签约方下标>>>', this.qianyuefangIndex)
    },
    contractClick (item, index) {
      this.currentContractName = item.name
      this.currentContractIndex = index
      this.qianyuefangAry = item.roles
      this.contractDetailAry = this.contracstList[index].contractDetailAry
      this.currentContractTotalPage = this.contracstList[index].totalPage

      console.log('当前操作合同列表下标>>>', this.currentContractIndex)
      console.log('当前操作合同列表下的合同详情>>>', this.contractDetailAry)
    },
    contractDetailClick (contractDetailIndex) {
      this.currentContractDetailPage = contractDetailIndex
      console.log('当前操作合同详情的页码>>>', this.currentContractDetailPage)
    },
    onActivated (item, dragIndex, contractDetailIndex) {
      this.currentDragModuleIndex = dragIndex
      this.currentContractDetailPage = contractDetailIndex
      console.log('当前操作拖拽项的下标>>>', this.currentDragModuleIndex)
      console.log('当前操作合同详情的页码>>>', this.currentContractDetailPage)
    },
    deleteGzcFunc (index) {
      this.contractDetailAry[this.currentContractDetailPage]['appendingSignLabels'].splice(index, 1)

      this.contracstList[this.currentContractIndex].contractDetailAry = this.contractDetailAry

      localStorage.setItem('contracstList', JSON.stringify(this.contracstList))
    },
    onDragstop (newRect) {

      console.log(newRect, 'newRect')

      let currentItem = this.contractDetailAry[this.currentContractDetailPage]['appendingSignLabels'][this.currentDragModuleIndex]// 当前拖拽的DOM节点

      let newDragItem = { ...currentItem, qyf: this.qianyuefangIndex, x: newRect.left, y: newRect.top }// 当前节点的新坐标

      this.contractDetailAry[this.currentContractDetailPage]['appendingSignLabels'].splice(this.currentDragModuleIndex, 1, newDragItem)// 替换当前节点

      this.contracstList[this.currentContractIndex].contractDetailAry = this.contractDetailAry

      // localStorage.setItem('contracstList', JSON.stringify(this.contracstList));

      // this.top = this.numberTransition(newRect.top, 1121, 1);
      // this.left = this.numberTransition(newRect.left, 793, 1);
    },
    createDragFunc (DragType) {
      // 点击盖章
      let x, y
      if (DragType == 'gz') {
        x = 140
        y = 152
      } else if (DragType == 'rq') {
        x = 80
        y = 20
      } else if (DragType == 'qm') {
        x = 92
        y = 72
      }
      let obj = {
        id: Math.random().toString().substr(2),
        roleName: this.currentUserType,
        pageNumber: this.currentContractDetailPage,
        DragType: DragType,
        x: 0,
        y: 0,
        w: x,//宽
        h: y,//高
        parentW: 793,
        parentH: 1121
      }
      this.contractDetailAry[this.currentContractDetailPage]['appendingSignLabels'].push(obj)
    },
    qfzFunc () {
      this.qfzChecked = !this.qfzChecked
      // 点击骑缝章
      let obj = {
        id: Math.random().toString().substr(2),
        roleName: this.currentUserType,
        pageNumber: this.currentContractDetailPage,
        DragType: 'qfz',
        x: 0,
        y: 0,
        w: 140,//宽
        h: 152,//高
        parentW: 116,
        parentH: 1121
      }
      this.contractDetailAry[this.currentContractDetailPage]['appendingSignLabels'].push(obj)
      this.computedStyle()
    },
    saveFunc () {
      // {
      //   contractsList: [
      //     {
      //       roles: [],
      //       documents: []
      //     },
      //     {
      //       roles: [],
      //       documents: []
      //     },
      //   ]
      // }


      this.contracstList.map((item, index) => {
        if (item.index == 0) {
          console.log('contracstList-item', item)
        }
      })




    },
    numberTransition (value, base, type) {
      if (type == 1) {
        return (value / base * 100).toFixed(4)
      } else {
        return (value / 100 * base).toFixed(4)
      }
    }
  }

}
</script>
<style lang="scss">
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.signed-page-container {
  position: relative;
  min-height: calc(100vh - 44px);
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .signed-page-content-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 20px;
    background-color: #e3e7e9;
    font-size: 12px;
    position: relative;
    z-index: 100;
    .back {
      display: flex;
      align-items: center;
      cursor: pointer;
      img {
        width: 24px;
        margin-right: 5px;
      }
      span {
        font-size: 14px;
        color: #333333;
      }
    }
    .save {
      width: 80px;
      height: 30px;
      cursor: pointer;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      color: #ffffff;
      background: linear-gradient(298deg, #468ceb 0%, #35abff 100%);
    }
  }
  .signed-page-container {
    height: 100%;
  }
  .signed-page-content-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 63px 20px 20px;
    background: #f6f6f6;
    font-size: 12px;
    box-sizing: border-box;
    .point-position-page {
      position: relative;
      height: 100%;

      .doc-mini-documents {
        width: 200px;
        border: 1px solid #dcdfe2;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        height: 100%;
        overflow: hidden;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        .title {
          display: flex;
          justify-content: space-between;
          height: 36px;
          line-height: 36px;
          padding: 0 20px;
          font-size: 16px;
          color: #333;
          border-bottom: 1px solid #dcdfe2;
          .sub-title {
            font-size: 12px;
            color: #757f98;
          }
        }
        .doc-mini-documents-ul {
          list-style: none;
          margin: 0;
          padding: 20px;
          .doc {
            margin-bottom: 20px;
            padding: 14px 14px 10px 14px;
            background: #ffffff;
            border: 1px solid #dcdfe2;
            cursor: pointer;
            &:last-child {
              margin-bottom: 0;
            }
            .doc-title {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .doc-thumbnail-container {
              margin: 8px auto;
              width: 79px;
              height: 112px;
              background-image: url('./img/thumbnail.png');
              background-position: 0 0;
              background-repeat: no-repeat;
              background-size: 79px 112px;
              cursor: pointer;
              .doc-thumbnail {
                width: 71px;
                height: 102px;
                background-image: url('./img/20210806154455.png');
                background-repeat: no-repeat;
                background-size: 71px 102px;
                background-position: 4px 4px;
              }
            }
            .doc-totalPage {
              .totalPage-container {
                display: flex;
                align-items: center;
                justify-content: center;
                color: #a5aab6;
                font-size: 12px;
                .el-input__inner {
                  width: 44px;
                  height: 22px;
                  color: #a5aab6;
                  font-size: 12px;
                  margin: 0 4px 0 8px;
                  padding: 0 5px;
                  border-radius: inherit;
                }
              }
              .is-disabled {
                .el-input__inner {
                  background-color: #f8f8f8;
                  border-color: #ddd;
                  color: #ccc;
                  cursor: not-allowed;
                }
              }
            }
          }
          .active {
            border: 1px solid #468ceb;
          }
        }
      }
      .point-position-doc {
        height: 100%;
        overflow: auto;
        margin-left: 220px;
        margin-right: 240px;
        border: 1px solid #dcdfe2;
        .point-position-doc-con {
          overflow: auto;
          background: #f8f8f8;
          display: flex;
          flex-direction: column;
          height: 100%;
          .point-position-doc-title {
            height: 36px;
            line-height: 36px;
            text-align: center;
            border-bottom: 1px solid #dcdfe2;
            font-size: 16px;
            color: #333333;
          }
          .point-position-doc-list {
            width: 100%;
            // flex: 1;
            // overflow-y: auto;
            // overflow-x: hidden;
            // position: relative;
            // display: flex;
            // flex-direction: column;
            .point-position-doc-wrapper {
              height: auto;
              margin: 0 auto;
              padding: 20px 10px 10px 10px;
              .point-position-doc-pages {
                .point-position-doc-page {
                  .point-position-doc-page-con {
                    position: relative;
                    // .box {
                    //   width: 50px;
                    //   height: 50px;
                    //   position: absolute;
                    //   top: 0;
                    //   left: 0;
                    //   background: red;
                    // }
                    .riding-seals {
                      padding-top: 1px;
                      width: 160px;
                      // background: rgba(18, 127, 210, 0.05);
                      position: absolute;
                      top: 0;
                      bottom: 0;
                      right: 0;
                      z-index: 100;
                      height: 100%;
                      .riding-seals-bg {
                        margin-left: 26px;
                        width: 116px;
                        height: 100%;
                        background: #fbfbfb;
                        background-image: linear-gradient(
                          270deg,
                          hsla(0, 0%, 100%, 0.5),
                          hsla(0, 0%, 85.1%, 0.5)
                        );
                        background-size: 23px;
                      }
                    }
                  }
                  .point-position-doc-page-footer {
                    height: 30px;
                    line-height: 30px;
                  }
                }
              }
            }
          }
          .next-doc-btn {
            height: 42px;
            line-height: 42px;
            background: #ffffff;
            border-top: 1px solid #dcdfe2;
            color: #127fd2;
            text-align: center;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
      .point-position-site {
        width: 220px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        overflow: auto;
        font-size: 12px;
        box-shadow: 6px 0 6px -6px #ddd;
        border: 1px solid #dcdfe2;
        .point-position-site-container {
          padding-top: 20px;
        }
        .title {
          display: flex;
          justify-content: space-between;
          height: 36px;
          line-height: 36px;
          padding: 0 20px;
          font-size: 16px;
          color: #333;
          border-bottom: 1px solid #dcdfe2;
        }
        .line {
          height: 2px;
          width: 230px;
          background-image: linear-gradient(
            to right,
            #dcdfe2 0%,
            #dcdfe2 50%,
            transparent 0%
          );
          background-size: 10px 2px;
          background-repeat: repeat-x;
          transform: rotate(90deg);
          transform-origin: 2px 32px;
        }
        .point-position-site-ul {
          list-style: none;
          margin: 0;
          padding-left: 0;
          margin-left: 20px;
          position: absolute;
          left: 0;
          top: 20px;
          .step {
            display: flex;
            .step-icon-left-1,
            .step-icon-left-2,
            .step-icon-left-3 {
              width: 26px;
              height: 26px;
              background-repeat: no-repeat;
              background-size: 26px 26px;
              background-position: center;
            }
            .step-icon-left-1 {
              background-image: url('./img/step-1.png');
            }
            .step-icon-left-2 {
              background-image: url('./img/step-2.png');
            }
            .step-icon-left-3 {
              background-image: url('./img/step-3.png');
            }
            .step-box-right {
              flex: 1;
              .step-name {
                font-size: 14px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
                line-height: 20px;
                margin: 3px 5px;
              }
              .step-box-right-ul {
                list-style: none;
                margin: 0;
                padding-left: 0;
                li {
                  display: flex;
                  align-items: center;
                  font-size: 14px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #333333;
                  margin: 8px 0;
                  cursor: pointer;
                  .no-check,
                  .checked,
                  .operation-qm,
                  .operation-gz,
                  .operation-rq,
                  .operation-qfz {
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    background-repeat: no-repeat;
                    background-size: 24px 24px;
                    background-position: center;
                  }
                  .no-check {
                    background-image: url('./img/no-check.png');
                  }
                  .checked {
                    background-image: url('./img/checked.png');
                  }
                  .operation-qm {
                    background-image: url('./img/operation-qm.png');
                  }
                  .operation-gz {
                    background-image: url('./img/operation-gz.png');
                  }
                  .operation-rq {
                    background-image: url('./img/operation-rq.png');
                  }
                  .operation-qfz-check {
                    background-image: url('./img/no-gouxuan.png');
                  }
                  .operation-qfz-checked {
                    background-image: url('./img/gouxuan.png');
                  }
                  .qy-name {
                    display: inline-block;
                    width: 140px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    height: 24px;
                    line-height: 24px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.vdr.active:before {
  content: '';
  width: 0;
  height: 0;
  top: 0;
  left: 0;
  outline: 0;
}
.gz {
  cursor: move;
  position: relative;
  width: 100%;
  height: 100%;
  .send-label-name {
    height: 20px;
    line-height: 18px;
    padding: 0 6px;
    background: rgba(242, 244, 246, 0.8);
    border: 1px solid #dcdfe2;
    font-size: 10px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
  .send-label-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 126px;
    margin-top: 2px;
    background: rgba(242, 244, 246, 0.8);
    border: 1px solid #dcdfe2;
    .send-label-seal {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 110px;
      height: 110px;
      background: rgba(220, 223, 226, 0.5);
      border-radius: 55px;
      .send-label-seal-img {
        width: 75px;
        height: 75px;
        background-image: url(img/gzc.png);
        background-position: 0 0;
        background-repeat: no-repeat;
        background-size: 75px;
      }
    }
  }
  // .send-label-border {
  //   position: absolute;
  //   left: 0;
  //   z-index: 0;
  //   top: 0;
  //   width: 136px;
  //   height: 128px;
  //   border: 2px solid rgb(18, 127, 210);
  //   margin-top: 18px;
  // }
  .label-close-icon {
    position: absolute;
    top: 10px;
    right: -8px;
    display: block;
    width: 18px;
    height: 18px;
    cursor: pointer;
    background-image: url('./img/delete.png');
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 18px;
  }
}
.rq {
  cursor: move;
  position: relative;
  width: 100%;
  height: 100%;
  .send-label-name {
    height: 20px;
    line-height: 18px;
    padding: 0 6px;
    background: rgba(242, 244, 246, 0.8);
    border: 1px solid #dcdfe2;
    font-size: 10px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #468ceb;
  }
  .label-close-icon {
    position: absolute;
    top: -8px;
    right: -8px;
    display: block;
    width: 18px;
    height: 18px;
    cursor: pointer;
    background-image: url('./img/delete.png');
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 18px;
  }
}
.qm {
  cursor: move;
  position: relative;
  width: 100%;
  height: 100%;
  .send-label-name {
    height: 20px;
    line-height: 18px;
    padding: 0 6px;
    background: rgba(242, 244, 246, 0.8);
    border: 1px solid #dcdfe2;
    font-size: 10px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
  .send-label-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    margin-top: 2px;
    background: rgba(242, 244, 246, 0.8);
    border: 1px solid #dcdfe2;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #468ceb;
  }
  .label-close-icon {
    position: absolute;
    top: -8px;
    right: -8px;
    display: block;
    width: 18px;
    height: 18px;
    cursor: pointer;
    background-image: url('./img/delete.png');
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 18px;
  }
}
</style>
