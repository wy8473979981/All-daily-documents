<template>
  <div class="signed-page-container">
    <div class="signed-page-content-header">
      <div class="back" @click="backFunc()">
        <img src="./img/back.png" alt="">
        <span>返回</span>
      </div>
      <div class="save" @click="saveFunc()">保存</div>
    </div>
    <div class="signed-page-content-container">
      <div class="point-position-page">
        <div class="doc-mini-documents fl">
          <div class="title">
            <span class="main-title">用章文件</span>
            <span class="sub-title">共5份</span>
          </div>
          <el-scrollbar style="height: calc(100% - 37px)">
            <ul class="doc-mini-documents-ul">
              <li :class="attachmentIndex==index?'doc active':'doc'" @click="attachmentClick(item,index)" v-for="(item,index) in attachmentList " :key="index">
                <div class="doc-title" :title="item.fileName">{{item.fileName}}</div>
                <div class="doc-thumbnail-container">
                  <div class="doc-thumbnail" :style="{backgroundImage: 'url(data:image/png;base64,'+item.curAbbImgBase64code+')'}"></div>
                  <i :class="item.success?'doc-success':''"></i>
                </div>
                <div class="doc-totalPage">
                  <div :class="attachmentIndex==index?'totalPage-container ':'totalPage-container is-disabled'">
                    <span>转到</span>
                    <template v-if="attachmentIndex==index">
                      <el-input v-inputNumber v-model="currentPage" @change="pageInputChangeFunc($event)" placeholder="页码" :disabled="attachmentIndex==index?false:true"></el-input>
                    </template>
                    <template v-else>
                      <el-input placeholder="页码" :disabled="attachmentIndex==index?false:true"></el-input>
                    </template>
                    <span>/{{item.totalPage}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </el-scrollbar>
        </div>
        <div class="point-position-doc">
          <div class="point-position-doc-con documents-content">
            <div class="point-position-doc-title">{{currentAttachmentName}}</div>
            <el-scrollbar ref="scroll" :wrap-class="'wrapClass'" :style="nextAttachmentDisplay?'height: calc(100% - 80px)':'height: 100%'">
              <div class="point-position-doc-list read-con">
                <div class="point-position-doc-wrapper" :style="{width:pointPositionDocWrapperWidth+'px'}">
                  <div class="point-position-doc-pages" :style="{transform: 'scale(' + scaleSize + ')', transformOrigin: 'left top', width: useQfzDrag?'913px':'793px',height: pointPositionDocPagesHeight+'px'}">

                    <div class="point-position-doc-page" v-for="(attachmentItemDetail,attachmentDetailIndex) in attachmentDetailList" :key="attachmentDetailIndex" @click="attachmentDetailClick(attachmentItemDetail)">

                      <div class="point-position-doc-page-con" :style="{width:useQfzDrag?'913px':'793px', height: '1121px'}">
                        <img width="793" height="1121" class="image" :src="'data:image/png;base64,' + attachmentItemDetail.attachmentDetailItemImgUrl">

                        <template v-for="(dragItem,dragIndex) in attachmentItemDetail.dragList">
                          <VueDragResize :parentLimitation="true" :isResizable="false" :isDraggable="true" :key="dragItem.id" :w="dragItem.w" :h="dragItem.h" :x="dragItem.x" :y="dragItem.y" :parentW="dragItem.parentW" :parentH="dragItem.parentH" @clicked="onActivated(dragItem,dragIndex,attachmentItemDetail)" @dragstop="onDragstop" v-if="dragItem.type!=='qfz'">
                            <div class="send-label-default gz" v-if="dragItem.type=='gz'">
                              <div class="send-label-name">{{dragItem.currentQyfName}}</div>
                              <div class="send-label-wrapper">
                                <div class="send-label-seal">
                                  <div class="send-label-seal-img"></div>
                                </div>
                              </div>
                              <div class="send-label-border"></div>
                              <i class="label-close-icon" @click="deleteGzcFunc(dragItem,dragIndex)"></i>
                            </div>
                            <div class="send-label-default rq" v-if="dragItem.type=='rq'">
                              <div class="send-label-name">签署日期处</div>
                              <i class="label-close-icon" @click="deleteGzcFunc(dragItem,dragIndex)"></i>
                            </div>
                            <div class="send-label-default qm" v-if="dragItem.type=='qm'">
                              <div class="send-label-name">{{dragItem.currentQyfName}}</div>
                              <div class="send-label-wrapper">签名处</div>
                              <i class="label-close-icon" @click="deleteGzcFunc(dragItem,dragIndex)"></i>
                            </div>
                          </VueDragResize>
                        </template>
                        <div class="riding-seals" v-if="useQfzDrag">
                          <div class="riding-seals-bg"></div>
                          <template v-for="(dragItem,dragIndex) in attachmentItemDetail.dragList">
                            <VueDragResize :parentLimitation="true" :isResizable="false" :isDraggable="true" :key="dragItem.id" :w="dragItem.w" :h="dragItem.h" :x="dragItem.x" :y="dragItem.y" :parentW="dragItem.parentW" :parentH="dragItem.parentH" @clicked="onActivated(dragItem,dragIndex,attachmentItemDetail)" @dragstop="onDragstop" v-if="dragItem.type=='qfz'">
                              <div class="send-label-default gz">
                                <div class="send-label-name">{{dragItem.currentQyfName}}</div>
                                <div class="send-label-wrapper">
                                  <div class="send-label-seal">
                                    <div class="send-label-seal-img"></div>
                                  </div>
                                </div>
                                <div class="send-label-border"></div>
                                <i class="label-close-icon" @click="deleteGzcFunc(dragItem,dragIndex)"></i>
                              </div>
                            </VueDragResize>
                          </template>
                        </div>
                      </div>
                      <p class="point-position-doc-page-footer">
                        <span class="fr">第{{attachmentDetailIndex+1}}页共{{currentAttachmentTotalPage}}页</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </el-scrollbar>
            <div @click="nextAttachmentFunc()" class="next-doc-btn " v-if="nextAttachmentDisplay">进入下一份合同</div>
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
                      <li v-for="(item,index) in currentQyfList" :key="index" @click="qyfClick(item,index)">
                        <template>
                          <span class="checked" v-if="currentQyfIndex==index"></span>
                          <span class="no-check" v-else></span>
                        </template>
                        <span class="qy-name">{{item.qyfName}}</span>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="step">
                  <div class="step-icon-left-2"></div>
                  <div class="step-box-right">
                    <p class="step-name">拖动签署位置</p>
                    <ul class="step-box-right-ul">
                      <li v-if="currentUserType.endsWith('ENTERPRISE')" @click="createDragFunc('gz')">
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
                <li class="step" v-if="currentAttachmentTotalPage>1 && currentUserType.endsWith('ENTERPRISE')">
                  <div class="step-icon-left-3"></div>
                  <div class="step-box-right">
                    <p class="step-name">加盖骑缝章</p>
                    <ul class="step-box-right-ul">
                      <li @click="createQfzFunc('qfz')">
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
  directives: {
    inputNumber: {
      bind: function (el, binding, vnode) {
        el.handler = function (e) {
          let val = e.target.value
          // 清除"数字"以外的字符
          val = val.replace(/[^\d]/g, '')
          val = val.replace(/,/g, '')
          e.target.value = val
          if (vnode.componentInstance) {
            vnode.componentInstance.$emit('input', val)
          } else {
            vnode.elm.dispatchEvent(new CustomEvent('input', val))
          }
        }
        el.addEventListener('input', el.handler)
      },
      unbind: function (el) {
        el.removeEventListener('input', el.handler)
      }
    }
  },
  watch: {
    params: {
      handler: function (newValue) {
        let attachmentList = [];
        newValue.map((item) => {
          let newRoles = [];
          let newAttachments = [];
          item.roles.map((roleItem) => {
            let roleObj = { ...roleItem, stampChecked: roleItem.stampChecked || false, qfzChecked: roleItem.qfzChecked || false }
            newRoles.push(roleObj);
          });
          item.attachmentDetailList.map((attachmentItem, attachmentIndex) => {
            let dragList = [];
            attachmentItem.dragList && attachmentItem.dragList.map((dragItem) => {
              let x = 0;
              let y = 0;
              let type = dragItem.type;
              if (type == 'qm' || type == 'gz' || type == 'rq') {
                x = this.numberTransition(dragItem.x, 793, 2);
                y = this.numberTransition(dragItem.y, 1121, 2);
              } else if (type == 'qfz') {
                y = this.numberTransition(dragItem.y, 1121, 2);
              }
              let obj = { ...dragItem, x: x, y: y }
              dragList.push(obj);
            })
            let attachmentObj = { ...attachmentItem, order: attachmentIndex + 1, dragList: dragList }
            newAttachments.push(attachmentObj);
          });

          attachmentList.push({ ...item, currentPage: 1, totalPage: item.totalPage || item.attachmentDetailList.length, success: item.success || false, roles: newRoles, attachmentDetailList: newAttachments });
        })
        this.attachmentList = JSON.parse(JSON.stringify(attachmentList));
        if (this.attachmentList.length > 1) {
          this.nextAttachmentDisplay = true;
        } else {
          this.nextAttachmentDisplay = false;
        }
        console.log("1111111111", attachmentList)
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
      useQfzDrag: false,//当前附件 是否有签约方使用 骑缝章
      pointPositionDocWrapperWidth: null,
      pointPositionDocPagesHeight: 0,
      dottedLineHeight: null,
      scaleSize: null,// 缩放比例
      currentPage: 1, // 当前附件第几页
      currentAttachmentName: '',// 当前附件文件名称
      currentUserType: null,// 当前附件选择的签约方类型 ENTERPRISE：企业
      currentAttachmentTotalPage: 0,// 当前附件总页数
      currentQyfIndex: 0, // 当前附件签约方下标
      currentQyfName: 0, // 当前附件签约方名称
      attachmentIndex: 0, // 当前操作附件列表下标
      currentPageDragIndex: null, // 当前附件，当前页，拖拽项下标
      currentPageDragType: null, // 当前附件，当前页，拖拽项类型
      currentQyfList: [],// 当前附件签约方
      attachmentDetailList: [],// 当前选择附件的详情
      attachmentList: [],// 附件集合
      nextAttachmentDisplay: true,// 进入下一份合同 按钮状态
    }
  },
  computed: {},
  created () {

    console.log('this.attachmentList >>>', this.attachmentList);


    this.openComponentDefaultData();


  },
  mounted () {
    this.computedStyle()
    window.onresize = () => {
      return (() => {
        this.computedStyle()
      })()
    }
    this.handleScroll()
  },
  methods: {
    openComponentDefaultData () {
      this.currentAttachmentName = this.attachmentList[0].fileName;                     // 默认第一个附件 文件名称
      this.attachmentDetailList = this.attachmentList[0].attachmentDetailList;          // 默认第一个附件 附件详情
      this.currentQyfList = this.attachmentList[0].roles;                               // 默认第一个附件 签约方数组
      this.currentQyfName = this.attachmentList[0].roles[0].qyfName;                    // 默认第一个附件 签约方数组的第一个签约方名称
      this.qfzChecked = this.attachmentList[0].roles[0].qfzChecked;                     // 默认第一个附件 第一个签约方 是否勾选骑缝章
      this.currentUserType = this.currentQyfList[0].userType;                           // 默认第一个附件 第一个签约方的类型
      this.currentAttachmentTotalPage = this.attachmentList[0].totalPage;               // 默认第一个附件 总页数
      this.computedCurrentAttachmentUseQfzDrag();
      console.log('this.currentUserType', this.currentUserType)
    },
    handleScroll () {
      // 监听滚动条
      let scrollbarEl = this.$refs['scroll'].wrap
      scrollbarEl.onscroll = () => {
        let scrollTop = scrollbarEl.scrollTop;
        let pointPositionDocPageHeight = document.querySelector('.point-position-doc-pages .point-position-doc-page:nth-child(1)').offsetHeight * this.scaleSize;
        this.currentPage = parseInt(scrollTop / pointPositionDocPageHeight) + 1;
      }
    },
    computedStyle () {
      this.pointPositionDocWrapperWidth = document.querySelector('.point-position-doc-con').offsetWidth - 100;
      if (this.useQfzDrag) {
        this.scaleSize = this.pointPositionDocWrapperWidth / 913;
      } else {
        this.scaleSize = this.pointPositionDocWrapperWidth / 793;
      }
      if (this.currentAttachmentTotalPage == 1 || !this.currentUserType.endsWith('ENTERPRISE')) {
        this.dottedLineHeight = document.querySelector('.point-position-site-ul .step:nth-child(1)').offsetHeight - 10
      } else {
        this.dottedLineHeight = document.querySelector('.point-position-site-ul .step:nth-child(1)').offsetHeight + document.querySelector('.point-position-site-ul .step:nth-child(2)').offsetHeight - 10;
      }

      setTimeout(function () {
        this.pointPositionDocPagesHeight = ocument.querySelector('.point-position-doc-pages').offsetHeight * this.scaleSize;
      }, 0)

    },
    qyfClick (item, index) {
      this.currentQyfIndex = index;
      this.currentQyfName = item.qyfName;
      this.currentUserType = item.userType;// 签约方 类型
      this.qfzChecked = item.qfzChecked;//当前签约方 骑缝章是否勾选
      this.computedCurrentAttachmentUseQfzDrag();
      this.computedStyle();
    },
    computedCurrentAttachmentUseQfzDrag () {
      // 判断当前附件 下的 签约方是否 有使用 骑缝章
      let currentAttachment = this.attachmentList[this.attachmentIndex];//当前操作附件
      this.useQfzDrag = currentAttachment.roles.some((item, index) => {
        return item.qfzChecked
      })
      console.log('this.useQfzDrag>>>', this.useQfzDrag);
    },
    getFinishResult () {
      // 1.判断对当前附件  当前签约方 是否完成盖章 至少 同时有  章+日期、签名+日期
      let result = false;
      let gzNumber = 0;
      let qmNumber = 0;
      let rqNumber = 0;
      let currentAttachment = this.attachmentList[this.attachmentIndex];//当前操作附件
      let currentQyf = currentAttachment.roles[this.currentQyfIndex];//当前操作附件 操作中的签约方
      currentAttachment.attachmentDetailList.map((item, index) => {
        item.dragList.map((itemSon, indexSon) => {
          if (itemSon.currentQyfIndex == this.currentQyfIndex) {
            if (itemSon.type == 'gz') {
              gzNumber = gzNumber + 1;
            } else if (itemSon.type == 'rq') {
              rqNumber = rqNumber + 1;
            } else if (itemSon.type == 'qm') {
              qmNumber = qmNumber + 1;
            }
          }
        })
      });
      if (currentQyf.userType.endsWith('ENTERPRISE')) {
        if (gzNumber >= 1 && rqNumber >= 1) {
          result = true;
        } else {
          result = false;
        }
      } else {
        if (rqNumber >= 1 && qmNumber >= 1) {
          result = true;
        } else {
          result = false;
        }
      }
      currentAttachment.roles[this.currentQyfIndex]['stampChecked'] = result;
      // 2.判断当前附件下 的签约方 是否 都完成 盖章
      let success = false;
      success = currentAttachment.roles.every((item, index) => {
        return item.stampChecked;
      });
      this.attachmentList[this.attachmentIndex]['success'] = success;
      // console.log('success>>>', success);
      // console.log('currentAttachment>>>', currentAttachment);
      console.log('attachmentList>>>', this.attachmentList);
      // console.log('this.attachmentIndex>>>', this.attachmentIndex);
      // console.log('this.currentQyfIndex>>>', this.currentQyfIndex);
    },
    attachmentClick (item, index) {
      // 切换附件列表
      let attachmentLength = this.attachmentList.length;
      if (this.attachmentIndex != index) {
        this.currentPage = 1;
        this.$refs['scroll'].wrap.scrollTop = 0//重置滚动条的位置
      }
      this.currentQyfIndex = 0; // 当前附件签约方下标
      this.attachmentIndex = index;

      this.currentAttachmentName = item.fileName;
      this.currentQyfList = item.roles;
      this.qfzChecked = this.currentQyfList[this.currentQyfIndex]['qfzChecked'];    // 当前签约方 是否使用骑缝章
      this.attachmentDetailList = item.attachmentDetailList
      this.currentAttachmentTotalPage = item.totalPage;

      if (this.attachmentIndex == attachmentLength - 1) {
        this.nextAttachmentDisplay = false;
      } else {
        this.nextAttachmentDisplay = true;
      }

      this.computedCurrentAttachmentUseQfzDrag();
      this.computedStyle();
      // console.log('当前操作附件列表下标>>>', this.attachmentIndex);
      // console.log('当前操作附件列表下的附件详情>>>', this.attachmentDetailList);
    },
    attachmentDetailClick (attachmentItemDetail) {
      // order:表示附件详情的页数，从1开始计算,在操作数据时需要 -1 ， 
      this.currentPage = attachmentItemDetail.order;
      // console.log('当前操作附件详情的页码>>>', this.currentPage);
    },
    onActivated (item, dragIndex, attachmentItemDetail) {
      // order:表示附件详情的页数，从1开始计算,在操作数据时需要 -1 
      this.currentPage = attachmentItemDetail.order;
      this.currentPageDragIndex = dragIndex;
      this.currentPageDragType = item.type;

      console.log('当前操作拖拽项>>>', item);
      console.log('当前操作拖拽项的下标>>>', this.currentPageDragIndex);
      console.log('当前操作附件详情的页码>>>', this.currentPage);
    },
    deleteGzcFunc (dragItem, dragIndex) {
      let currentAttachment = this.attachmentList[this.attachmentIndex];//当前操作附件
      if (dragItem.type == 'qfz') {
        currentAttachment.attachmentDetailList.map((item, index) => {
          item.dragList.splice(dragIndex, 1);
        })
        currentAttachment.roles[dragItem.currentQyfIndex]['qfzChecked'] = false;
        if (this.currentQyfIndex == dragItem.currentQyfIndex) {
          this.qfzChecked = false;
        }
      } else {
        currentAttachment.attachmentDetailList[this.currentPage - 1]['dragList'].splice(dragIndex, 1);
        // currentAttachment.roles.map((item, index) => {
        //   item.stampChecked = false;
        // })
      }
      this.computedCurrentAttachmentUseQfzDrag();
      this.computedStyle();
      this.getFinishResult()
      // console.log('this.attachmentList>>>', this.attachmentList);
    },
    onDragstop (newRect) {
      let currentAttachment = this.attachmentList[this.attachmentIndex];//当前操作附件
      if (this.currentPageDragType == 'qfz') {
        currentAttachment.attachmentDetailList.map((item, index) => {
          item.dragList.map((itemSon, indexSon) => {
            if (itemSon.type == 'qfz' && indexSon == this.currentPageDragIndex) {
              itemSon.y = newRect.top;
            }
          })
        })
      } else {
        let currentItem = this.attachmentDetailList[this.currentPage - 1]['dragList'][this.currentPageDragIndex];// 当前拖拽的DOM节点
        let newDragItem = { ...currentItem, x: newRect.left, y: newRect.top };// 当前拖拽项节点的新坐标
        this.attachmentDetailList[this.currentPage - 1]['dragList'].splice(this.currentPageDragIndex, 1, newDragItem);// 替换当前节点
        currentAttachment.attachmentDetailList = this.attachmentDetailList;
      }
      console.log('newRect >>>', newRect)
      console.log('currentPageDragIndex >>>', this.currentPageDragIndex)
      console.log('this.attachmentList >>>', this.attachmentList)
    },
    createDragFunc (type) {
      // 点击盖章 ,数字为固定值
      let w, h;
      let parentW = 793;
      let parentH = 1121;
      if (type == 'gz') {
        w = 140;
        h = 152;
      } else if (type == 'rq') {
        w = 80;
        h = 20;
      } else if (type == 'qm') {
        w = 92;
        h = 72;
      }
      let obj = {
        id: Math.random().toString().substr(2),
        roleName: this.currentUserType,
        currentQyfIndex: this.currentQyfIndex,
        currentQyfName: this.currentQyfName,
        pageNumber: this.currentPage,
        type: type,
        x: 0,
        y: 0,
        w: w,//宽
        h: h,//高
        parentW: parentW,
        parentH: parentH
      }
      this.attachmentDetailList[this.currentPage - 1]['dragList'].push(obj);
      this.getFinishResult();
    },
    createQfzFunc (type) {
      // 数字为固定值
      this.qfzChecked = !this.qfzChecked;
      let currentAttachment = this.attachmentList[this.attachmentIndex];//当前操作附件
      if (this.qfzChecked) {
        let w = 140;
        let h = 152;
        let parentW = 140;
        let parentH = 1121;
        let obj = {
          id: Math.random().toString().substr(2),
          roleName: this.currentUserType,
          currentQyfIndex: this.currentQyfIndex,
          currentQyfName: this.currentQyfName,
          pageNumber: this.currentPage,
          type: type,
          x: 0,
          y: 0,
          w: w,//宽
          h: h,//高
          parentW: parentW,
          parentH: parentH
        }
        this.attachmentDetailList.map((item, index) => {
          item.dragList.push(obj)
        })
      } else {
        currentAttachment.attachmentDetailList.map((item, index) => {
          item.dragList.map((dragItem, dragIndex) => {
            if (dragItem.type == 'qfz' && dragItem.currentQyfIndex == this.currentQyfIndex) {
              item.dragList.splice(dragIndex, 1)
            }
          })
        })
      }
      // 记录当前签约方 是否勾选 骑缝章
      currentAttachment.roles[this.currentQyfIndex]['qfzChecked'] = this.qfzChecked;
      this.computedCurrentAttachmentUseQfzDrag();
      this.computedStyle();
      // console.log('this.attachmentDetailList >>>', this.attachmentDetailList)
      console.log('this.attachmentList >>>', this.attachmentList)
    },
    nextAttachmentFunc () {
      this.$refs['scroll'].wrap.scrollTop = 0//重置滚动条的位置
      this.currentQyfIndex = 0;
      this.attachmentIndex = this.attachmentIndex + 1;
      let attachmentLength = this.attachmentList.length;

      let currentAttachment = this.attachmentList[this.attachmentIndex];//当前操作附件
      this.currentAttachmentName = currentAttachment.fileName;                      // 默认第一个附件 文件名称
      this.attachmentDetailList = currentAttachment.attachmentDetailList;           // 默认第一个附件 附件详情
      this.currentQyfList = currentAttachment.roles;                                // 默认第一个附件 签约方数组
      this.qfzChecked = this.currentQyfList[this.currentQyfIndex]['qfzChecked'];    // 当前签约方 是否使用骑缝章
      this.currentQyfName = currentAttachment.roles[0].qyfName;     // 默认第一个附件 签约方数组的第一个签约方名称
      this.currentUserType = this.currentQyfList[0].userType;                       // 默认第一个附件 第一个签约方的类型
      this.currentAttachmentTotalPage = currentAttachment.totalPage;                // 默认第一个附件 总页数

      if (this.attachmentIndex == attachmentLength - 1) {
        this.nextAttachmentDisplay = false;
      }
      this.computedCurrentAttachmentUseQfzDrag();
      this.computedStyle();
    },
    pageInputChangeFunc (value) {
      let currentPage = Number(value);
      if (currentPage > this.currentAttachmentTotalPage) {
        currentPage = this.currentAttachmentTotalPage;
      } else if (currentPage <= 1) {
        currentPage = 1;
      }
      this.currentPage = currentPage;
      let pointPositionDocPageHeight = document.querySelector('.point-position-doc-pages .point-position-doc-page:nth-child(1)').offsetHeight * this.scaleSize;
      let scrollTop = pointPositionDocPageHeight * (this.currentPage - 1);
      this.$refs['scroll'].wrap.scrollTop = scrollTop + 20;//指定滚到第几页
      // console.log('this.currentPage >>>', this.currentPage)
    },
    backFunc () {
      this.$emit('close', false)
    },
    saveFunc () {

      let saveData = [];
      let attachmentList = JSON.parse(JSON.stringify(this.attachmentList));
      attachmentList.map((item, index) => {
        let newAttachmentDetailList = [];

        item.attachmentDetailList.map((attachmentItem, attachmentIndex) => {
          let dragList = [];
          attachmentItem.dragList && attachmentItem.dragList.map((dragItem, dragIndex) => {
            let type = dragItem.type;
            let x = 0;
            let y = 0;
            if (type == 'qm' || type == 'gz' || type == 'rq') {
              x = this.numberTransition(dragItem.x, 793, 1);
              y = this.numberTransition(dragItem.y, 1121, 1);
            } else if (type == 'qfz') {
              y = this.numberTransition(dragItem.y, 1121, 1);
            }
            let obj = { ...dragItem, x: x, y: y }
            dragList.push(obj);
          })
          let attachmentDetailObj = { ...attachmentItem, dragList: dragList }
          newAttachmentDetailList.push(attachmentDetailObj);
        });
        saveData.push({ ...item, roles: item.roles, attachmentDetailList: newAttachmentDetailList })
      })

      localStorage.setItem('save', JSON.stringify(saveData))

      this.$emit('save', saveData)
      // console.log("保存 saveData >>> ", saveData)
    },
    numberTransition (value, base, type) {
      if (type == 1) {
        return Number((value / base).toFixed(6))
      } else {
        return Number((value * base).toFixed(0))
      }
    }
  }

}
</script>
<style lang="scss" scoped>
.signed-page-container {
  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  position: relative;
  height: 100%;
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
              background-image: url("./img/thumbnail.png");
              background-position: 0 0;
              background-repeat: no-repeat;
              background-size: 79px 112px;
              cursor: pointer;
              position: relative;
              .doc-thumbnail {
                width: 71px;
                height: 102px;
                background-image: url("./img/20210806154455.png");
                background-repeat: no-repeat;
                background-size: 71px 102px;
                background-position: 4px 4px;
              }
              .doc-success {
                position: absolute;
                top: 36px;
                left: 22px;
                width: 32px;
                height: 32px;
                background-image: url("./img/success.png");
                background-repeat: no-repeat;
                background-size: 32px;
                background-position: center;
                z-index: 1;
              }
            }
            .doc-totalPage {
              .totalPage-container {
                display: flex;
                align-items: center;
                justify-content: center;
                color: #a5aab6;
                font-size: 12px;
                ::v-deep .el-input {
                  width: 44px !important;
                  height: 22px !important;
                  margin: 0 4px 0 8px !important;
                  border-radius: 0 !important;
                  .el-input__inner {
                    width: 44px !important;
                    height: 22px !important;
                    color: #a5aab6 !important;
                    font-size: 12px !important;
                    padding: 0 5px !important;
                    border-radius: 0 !important;
                  }
                }
                .el-input__inner {
                  width: 44px !important;
                  height: 22px !important;
                  color: #a5aab6 !important;
                  font-size: 12px !important;
                  padding: 0 5px !important;
                  border-radius: 0 !important;
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
                      position: absolute;
                      top: 0;
                      bottom: 0;
                      right: 4px;
                      height: 100%;
                      width: 140px;
                      padding-top: 1px;
                      z-index: 100;
                      .riding-seals-bg {
                        margin-left: 25px;
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
          .next-attachment-display {
            cursor: not-allowed;
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
              background-image: url("./img/step-1.png");
            }
            .step-icon-left-2 {
              background-image: url("./img/step-2.png");
            }
            .step-icon-left-3 {
              background-image: url("./img/step-3.png");
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
                    background-image: url("./img/no-check.png");
                  }
                  .checked {
                    background-image: url("./img/checked.png");
                  }
                  .operation-qm {
                    background-image: url("./img/operation-qm.png");
                  }
                  .operation-gz {
                    background-image: url("./img/operation-gz.png");
                  }
                  .operation-rq {
                    background-image: url("./img/operation-rq.png");
                  }
                  .operation-qfz-check {
                    background-image: url("./img/no-gouxuan.png");
                  }
                  .operation-qfz-checked {
                    background-image: url("./img/gouxuan.png");
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
  content: "";
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
    width: 126px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    top: 14px;
    right: -8px;
    display: block;
    width: 18px;
    height: 18px;
    cursor: pointer;
    background-image: url("./img/delete.png");
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
    width: 66px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    background-image: url("./img/delete.png");
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
    width: 78px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    background-image: url("./img/delete.png");
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 18px;
  }
}
</style>
