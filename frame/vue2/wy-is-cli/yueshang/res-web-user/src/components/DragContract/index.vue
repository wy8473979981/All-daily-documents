<template>
  <div class="signed-page-container">
    <div class="signed-page-content-header">
      <div class="back" @click="backFunc()">
        <img src="./img/back.png" alt="" />
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
              <li
                :class="attachmentIndex == index ? 'doc active' : 'doc'"
                v-for="(item, index) in attachmentList"
                :key="index"
              >
                <div class="doc-title" :title="item.fileName">
                  {{ item.fileName }}
                </div>
                <div
                  class="doc-thumbnail-container"
                  @click="attachmentClick(item, index)"
                >
                  <div
                    class="doc-thumbnail"
                    :style="{
                      backgroundImage: 'url(' + item.curAbbImgBase64code + ')',
                    }"
                  ></div>
                  <i :class="item.success ? 'doc-success' : ''"></i>
                </div>
                <div class="doc-totalPage">
                  <div
                    :class="
                      attachmentIndex == index
                        ? 'totalPage-container '
                        : 'totalPage-container is-disabled'
                    "
                  >
                    <span>转到</span>
                    <template v-if="attachmentIndex == index">
                      <el-input
                        v-inputNumber
                        v-model="currentPage"
                        @change="pageInputChangeFunc($event)"
                        placeholder="页码"
                        :disabled="attachmentIndex == index ? false : true"
                      ></el-input>
                    </template>
                    <template v-else>
                      <el-input
                        placeholder="页码"
                        :disabled="attachmentIndex == index ? false : true"
                      ></el-input>
                    </template>
                    <span>/{{ item.totalPage }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </el-scrollbar>
        </div>
        <div class="point-position-doc">
          <div class="point-position-doc-con documents-content">
            <div class="point-position-doc-title">
              {{ currentAttachmentName }}
            </div>
            <el-scrollbar
              ref="scroll"
              :wrap-class="'wrapClass'"
              :style="
                nextAttachmentDisplay
                  ? 'height: calc(100% - 80px)'
                  : 'height: 100%'
              "
            >
              <div class="point-position-doc-list read-con">
                <div
                  class="point-position-doc-wrapper"
                  :style="{ width: pointPositionDocWrapperWidth + 'px' }"
                >
                  <div
                    class="point-position-doc-pages"
                    :style="{
                      transform: 'scale(' + scaleSize + ')',
                      transformOrigin: 'left top',
                      width: useQfzDrag ? '913px' : '793px',
                      height: pointPositionDocPagesHeight + 'px',
                    }"
                  >
                    <div
                      class="point-position-doc-page"
                      v-for="(attachmentItemDetail,
                      attachmentDetailIndex) in attachmentDetailList"
                      :key="attachmentDetailIndex"
                      @click="attachmentDetailClick(attachmentItemDetail)"
                    >
                      <div
                        class="point-position-doc-page-con"
                        @mousemove="
                          moveFun(
                            $event,
                            attachmentItemDetail,
                            attachmentDetailIndex
                          )
                        "
                        @mouseleave="
                          leaveFun(
                            $event,
                            attachmentItemDetail,
                            attachmentDetailIndex
                          )
                        "
                        :style="{
                          width: useQfzDrag ? '913px' : '793px',
                          height: '1121px',
                          pointerEvents: status ? 'none' : 'initial',
                        }"
                      >
                        <img
                          width="793"
                          height="1121"
                          class="detail-image"
                          :src="attachmentItemDetail.attachmentDetailItemImgUrl"
                        />

                        <template
                          v-for="(dragItem,
                          dragIndex) in attachmentItemDetail.dragList"
                        >
                          <VueDragResize
                            :parentLimitation="true"
                            :isResizable="false"
                            :isDraggable="true"
                            :key="dragItem.id"
                            :w="dragItem.w"
                            :h="dragItem.h"
                            :x="dragItem.x"
                            :y="dragItem.y"
                            :parentW="dragItem.parentW"
                            :parentH="dragItem.parentH"
                            :parentScaleX="scaleSize"
                            :parentScaleY="scaleSize"
                            @clicked="
                              onActivated(
                                dragItem,
                                dragIndex,
                                attachmentItemDetail
                              )
                            "
                            @dragging="onDragging"
                            v-if="dragItem.type !== 'qfz'"
                          >
                            <div
                              class="send-label-default gz"
                              v-if="dragItem.type == 'gz'"
                            >
                              <div
                                class="send-label-name"
                                :title="dragItem.currentQyName"
                              >
                                {{ dragItem.currentQyName }}
                              </div>
                              <div class="send-label-wrapper">
                                <div class="send-label-seal">
                                  <div class="send-label-seal-img"></div>
                                </div>
                              </div>
                              <i
                                class="label-close-icon"
                                @click="deleteGzcFunc(dragItem, dragIndex)"
                              ></i>
                            </div>
                            <div
                              class="send-label-default rq"
                              v-if="dragItem.type == 'rq'"
                            >
                              <div class="send-label-name">签署日期处</div>
                              <i
                                class="label-close-icon"
                                @click="deleteGzcFunc(dragItem, dragIndex)"
                              ></i>
                            </div>
                            <div
                              class="send-label-default qm"
                              v-if="dragItem.type == 'qm'"
                            >
                              <div
                                class="send-label-name"
                                :title="dragItem.currentQyName"
                              >
                                {{ dragItem.currentQyName }}
                              </div>
                              <div class="send-label-wrapper">签名处</div>
                              <i
                                class="label-close-icon"
                                @click="deleteGzcFunc(dragItem, dragIndex)"
                              ></i>
                            </div>
                          </VueDragResize>
                        </template>
                        <template
                          v-for="(dragItem, dragIndex) in cursorDragList"
                        >
                          <VueDragResize
                            :parentLimitation="true"
                            :isResizable="false"
                            :isDraggable="true"
                            :key="dragItem.id"
                            :w="dragItem.w"
                            :h="dragItem.h"
                            :x="dragItem.x"
                            :y="dragItem.y"
                            :parentW="dragItem.parentW"
                            :parentH="dragItem.parentH"
                            :parentScaleX="scaleSize"
                            :parentScaleY="scaleSize"
                            contentClass="cursorDrag"
                            @clicked="
                              onActivated(
                                dragItem,
                                dragIndex,
                                attachmentItemDetail
                              )
                            "
                            v-if="dragItem.type !== 'qfz'"
                          >
                            <div
                              class="send-label-default gz"
                              v-if="dragItem.type == 'gz'"
                            >
                              <div
                                class="send-label-name"
                                :title="dragItem.currentQyName"
                              >
                                {{ dragItem.currentQyName }}
                              </div>
                              <div class="send-label-wrapper">
                                <div class="send-label-seal">
                                  <div class="send-label-seal-img"></div>
                                </div>
                              </div>
                              <!-- <div class="send-label-border"></div> -->
                              <i
                                class="label-close-icon"
                                @click="deleteGzcFunc(dragItem, dragIndex)"
                              ></i>
                            </div>
                            <div
                              class="send-label-default rq"
                              v-if="dragItem.type == 'rq'"
                            >
                              <div class="send-label-name">签署日期处</div>
                              <i
                                class="label-close-icon"
                                @click="deleteGzcFunc(dragItem, dragIndex)"
                              ></i>
                            </div>
                            <div
                              class="send-label-default qm"
                              v-if="dragItem.type == 'qm'"
                            >
                              <div
                                class="send-label-name"
                                :title="dragItem.currentQyName"
                              >
                                {{ dragItem.currentQyName }}
                              </div>
                              <div class="send-label-wrapper">签名处</div>
                              <i
                                class="label-close-icon"
                                @click="deleteGzcFunc(dragItem, dragIndex)"
                              ></i>
                            </div>
                          </VueDragResize>
                        </template>
                        <div class="riding-seals" v-if="useQfzDrag">
                          <div class="riding-seals-bg"></div>
                          <template
                            v-for="(dragItem,
                            dragIndex) in attachmentItemDetail.dragList"
                          >
                            <VueDragResize
                              :parentLimitation="true"
                              :isResizable="false"
                              :isDraggable="true"
                              :key="dragItem.id"
                              :w="dragItem.w"
                              :h="dragItem.h"
                              :x="dragItem.x"
                              :y="dragItem.y"
                              :parentW="dragItem.parentW"
                              :parentH="dragItem.parentH"
                              :parentScaleX="scaleSize"
                              :parentScaleY="scaleSize"
                              @clicked="
                                onActivated(
                                  dragItem,
                                  dragIndex,
                                  attachmentItemDetail
                                )
                              "
                              @dragging="onDragging"
                              v-if="dragItem.type == 'qfz'"
                            >
                              <div class="send-label-default gz">
                                <div
                                  class="send-label-name"
                                  :title="dragItem.currentQyName"
                                >
                                  {{ dragItem.currentQyName }}
                                </div>
                                <div class="send-label-wrapper">
                                  <div class="send-label-seal">
                                    <div class="send-label-seal-img"></div>
                                  </div>
                                </div>
                                <!-- <div class="send-label-border"></div> -->
                                <i
                                  class="label-close-icon"
                                  @click="deleteGzcFunc(dragItem, dragIndex)"
                                ></i>
                              </div>
                            </VueDragResize>
                          </template>
                        </div>
                      </div>
                      <p class="point-position-doc-page-footer">
                        <span class="fr"
                          >第{{ attachmentDetailIndex + 1 }}页共{{
                            currentAttachmentTotalPage
                          }}页</span
                        >
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </el-scrollbar>
            <div
              @click="nextAttachmentFunc()"
              class="next-doc-btn "
              v-if="nextAttachmentDisplay"
            >
              进入下一份合同
            </div>
          </div>
        </div>
        <div class="point-position-site">
          <div class="title">
            <span class="main-title">操作</span>
          </div>
          <el-scrollbar style="height: calc(100% - 37px)">
            <div class="point-position-site-container">
              <div
                class="line"
                :style="{ width: dottedLineHeight + 'px' }"
              ></div>
              <ul class="point-position-site-ul">
                <li class="step">
                  <div class="step-icon-left-1"></div>
                  <div class="step-box-right">
                    <p class="step-name">选择签约方</p>
                    <ul class="step-box-right-ul">
                      <li
                        v-for="(item, index) in currentQyfList"
                        :key="index"
                        @click="qyfClick(item, index)"
                      >
                        <template>
                          <span
                            class="checked"
                            v-if="currentQyfIndex == index"
                          ></span>
                          <span class="no-check" v-else></span>
                        </template>
                        <span class="qy-name" :title="item.qyfName">{{
                          item.qyfName
                        }}</span>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  class="step"
                  :style="{ pointerEvents: status ? 'none' : 'initial' }"
                >
                  <div class="step-icon-left-2"></div>
                  <div class="step-box-right">
                    <p class="step-name">拖动签署位置</p>
                    <ul class="step-box-right-ul">
                      <li
                        v-if="currentUserType.endsWith('ENTERPRISE')"
                        class="gz"
                        @click.stop="onSaveDragType('gz')"
                      >
                        <span class="operation-gz"></span>
                        <span class="operation-name">盖章</span>
                      </li>
                      <li v-else @click.stop="onSaveDragType('qm')" class="qm">
                        <span class="operation-qm"></span>
                        <span class="operation-name">签名</span>
                      </li>
                      <li @click.stop="onSaveDragType('rq')" class="rq">
                        <span class="operation-rq"></span>
                        <span class="operation-name">签署日期</span>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  class="step"
                  v-if="
                    currentAttachmentTotalPage > 1 &&
                      currentUserType.endsWith('ENTERPRISE')
                  "
                  :style="{ pointerEvents: status ? 'none' : 'initial' }"
                >
                  <div class="step-icon-left-3"></div>
                  <div class="step-box-right">
                    <p class="step-name">加盖骑缝章</p>
                    <ul class="step-box-right-ul">
                      <li @click="createDragFunc('qfz', 0, 485)">
                        <span
                          :class="
                            qfzChecked
                              ? 'operation-qfz operation-qfz-checked'
                              : 'operation-qfz operation-qfz-check'
                          "
                        ></span>
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
    <div id="cursor-icon" :class="cursorIcon" v-if="useCursorDragIconBol">
      <div class="icon-box"></div>
    </div>
  </div>
</template>

<script>
import { config } from "./config";
import VueDragResize from "vue-drag-resize";
export default {
  name: "DragContract",
  props: {
    params: {
      type: Array,
      default: function() {
        return [];
      },
    },
    status: {
      //是否可以修改盖章信息
      type: Boolean,
      default: false,
    },
  },
  directives: {
    inputNumber: {
      bind: function(el, binding, vnode) {
        el.handler = function(e) {
          let val = e.target.value;
          val = val.replace(/[^\d]/g, ""); // 清除"数字"以外的字符
          val = val.replace(/,/g, "");
          e.target.value = val;
          if (vnode.componentInstance) {
            vnode.componentInstance.$emit("input", val);
          } else {
            vnode.elm.dispatchEvent(new CustomEvent("input", val));
          }
        };
        el.addEventListener("input", el.handler);
      },
      unbind: function(el) {
        el.removeEventListener("input", el.handler);
      },
    },
  },
  watch: {
    params: {
      handler: function(newValue) {
        console.log("watch-数据初始化-开始：", newValue);
        let attachmentList = newValue && newValue.map((item) => {
          let newRoles = item.roles && item.roles.map((roleItem) => ({
            ...roleItem,
            stampChecked: roleItem.stampChecked || false,
            qfzChecked: roleItem.qfzChecked || false,
          }));
          let newAttachments = item.attachmentDetailList && item.attachmentDetailList.map((attachmentItem, attachmentIndex) => {
              let dragList = attachmentItem.dragList && attachmentItem.dragList.map((dragItem) => {
                let x = 0;
                let y = 0;
                let coordsY = 0;
                let type = dragItem.type;// 章的类型
                // 转化x,y坐标轴数据
                if(type === 'gz') {
                  x = this.numberTransition(dragItem.x, this.config[type].parentW, 2) + 50;// 50是和上上签约定值
                  y = this.numberTransition(dragItem.y, this.config[type].parentH, 2);
                  coordsY = this.config[type].parentH - y - this.config[type].h + 17; // y 轴坐标需要 减去拖拽项自身高度;17是和上上签约定值
                } else {
                  x = type === "qfz" ? 0 : this.numberTransition(dragItem.x, this.config[type].parentW, 2);
                  y = this.numberTransition(dragItem.y, this.config[type].parentH, 2);
                  coordsY = this.config[type].parentH - y - this.config[type].h; // y 轴坐标需要 减去拖拽项自身高度
                }
                return { ...dragItem, x: x, y: coordsY };
              });
              return {...attachmentItem, order: attachmentIndex + 1, dragList: dragList || []};
            }
          );
          return {
            ...item,
            currentPage: 1,
            totalPage: item.totalPage || item.attachmentDetailList.length,
            success: item.success || false,// 附件是否完成签章
            roles: newRoles,
            attachmentDetailList: newAttachments,
          };
        });
        this.attachmentList = JSON.parse(JSON.stringify(attachmentList));
        this.nextAttachmentDisplay = this.attachmentList.length > 1 ? true : false;
        console.log("watch-数据初始化-完成：", this.attachmentList);
      },
      immediate: true,
      deep: true,
    },
  },
  components: { VueDragResize },
  data() {
    return {
      config: config.call(this),
      qfzChecked: false, // 骑缝章选择
      useQfzDrag: false, //当前附件 是否有签约方使用 骑缝章
      pointPositionDocWrapperWidth: null,
      pointPositionDocPagesHeight: null,
      dottedLineHeight: null,
      scaleSize: 1, // 缩放比例
      currentPage: 1, // 当前附件第几页
      currentAttachmentName: "", // 当前附件文件名称
      currentUserType: null, // 当前附件选择的签约方类型 ENTERPRISE：企业
      currentRoleName: null, // 当前附件选择的签约方角色名称
      currentAttachmentTotalPage: 0, // 当前附件总页数
      currentQyfIndex: 0, // 当前附件签约方下标
      currentQyName: 0, // 当前附件签约方名称
      attachmentIndex: 0, // 当前操作附件列表下标
      currentPageDragIndex: null, // 当前附件，当前页，拖拽项下标
      currentPageDragType: null, // 当前附件，当前页，拖拽项类型
      currentQyfList: [], // 当前附件签约方
      attachmentDetailList: [], // 当前选择附件的详情
      attachmentList: [], // 附件集合
      nextAttachmentDisplay: true, // 进入下一份合同 按钮状态
      currentClickDragType: null, // 当前点击 ，准备生产的章的类型
      cursorDragList: [], // 跟随鼠标移动的拖拽项数组，数组中只会存在一条数据
      useCursorDragBol: false, // 控制是否在附件详情上方生成跟随鼠标移动的拖拽项，默认false,不生成
      useCursorDragIconBol: false, // 控制是否在点击 盖章、日期、签名后，生成一个跟随鼠标的icon，默认false,不生成
      cursorIcon: "", // 跟随鼠标的icon的class name
    };
  },
  computed: {},
  created() {
    this.openComponentDefaultData();
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.computedStyle();
      that.handleScroll();
      document.onclick = function(ev) {
        let e = ev || window.event;
        let className = e.target.className;
        let classArry = ["gz", "qm", "rq"];
        if (!classArry.includes(className)) {
          that.useCursorDragIconBol = false; // 关闭，跟随鼠标的icon
        }
      };
    });
    window.onresize = () => {
      return (() => {
        this.computedStyle();
      })();
    };
  },
  methods: {
    openComponentDefaultData() {
      this.currentAttachmentName = this.attachmentList[0].fileName; // 默认第一个附件 文件名称
      this.attachmentDetailList = this.attachmentList[0].attachmentDetailList; // 默认第一个附件 附件详情
      this.currentQyfList = this.attachmentList[0].roles; // 默认第一个附件 签约方数组
      this.currentQyName = this.attachmentList[0].roles[0].qyfName; // 默认第一个附件 签约方数组的第一个签约方名称
      this.qfzChecked = this.attachmentList[0].roles[0].qfzChecked; // 默认第一个附件 第一个签约方 是否勾选骑缝章
      this.currentUserType = this.currentQyfList[0].userType; // 默认第一个附件 第一个签约方的类型
      this.currentRoleName = this.currentQyfList[0].roleName; // 当前附件选择的签约方角色名称
      this.currentAttachmentTotalPage = this.attachmentList[0].totalPage; // 默认第一个附件 总页数
      this.computedCurrentAttachmentUseQfzDrag();
    },
    handleScroll() {
      // 监听滚动条
      let scrollbarEl = this.$refs["scroll"].wrap;
      scrollbarEl.onscroll = () => {
        let scrollTop = scrollbarEl.scrollTop;
        let pointPositionDocPageFirst = document.querySelector(".point-position-doc-pages .point-position-doc-page:nth-child(1)");
        let pointPositionDocPageHeight = pointPositionDocPageFirst.offsetHeight * this.scaleSize;
        this.currentPage = parseInt(scrollTop / pointPositionDocPageHeight) + 1;
      };
    },
    computedStyle() {
      this.pointPositionDocWrapperWidth = document.querySelector(".point-position-doc-con").offsetWidth - 100;
      if (this.useQfzDrag) {
        this.scaleSize = this.pointPositionDocWrapperWidth / 913;
      } else {
        this.scaleSize = this.pointPositionDocWrapperWidth / 793;
      }
      if (this.currentAttachmentTotalPage == 1 ||!this.currentUserType.endsWith("ENTERPRISE")) {
        this.dottedLineHeight =document.querySelector(".point-position-site-ul .step:nth-child(1)").offsetHeight - 10;
      } else {
        this.dottedLineHeight = document.querySelector(".point-position-site-ul .step:nth-child(1)").offsetHeight + document.querySelector(".point-position-site-ul .step:nth-child(2)").offsetHeight - 10;
      }
      this.$nextTick(() => {
        this.pointPositionDocPagesHeight = document.querySelector(".point-position-doc-pages").offsetHeight * this.scaleSize;
      });
    },
    qyfClick(item, index) {
      this.currentQyfIndex = index;
      this.currentQyName = item.qyfName;
      this.currentUserType = item.userType; // 签约方 类型
      this.currentRoleName = item.roleName; // 当前附件选择的签约方角色名称
      this.qfzChecked = item.qfzChecked; //当前签约方 骑缝章是否勾选
      this.computedCurrentAttachmentUseQfzDrag();
      this.computedStyle();
    },
    computedCurrentAttachmentUseQfzDrag() {
      // 判断当前附件 下的 签约方是否 有使用 骑缝章
      let currentAttachment = this.attachmentList[this.attachmentIndex]; //当前操作附件
      this.useQfzDrag = currentAttachment.roles.some((item) => {
        return item.qfzChecked;
      });
    },
    getFinishResult() {
      // 1.判断对当前附件  当前签约方 是否完成盖章 至少 同时有  章+日期、签名+日期
      let result = false;
      let gzNumber = 0;
      let qmNumber = 0;
      let rqNumber = 0;
      let currentAttachment = this.attachmentList[this.attachmentIndex]; //当前操作附件
      let currentQyf = currentAttachment.roles[this.currentQyfIndex]; //当前操作附件 操作中的签约方
      currentAttachment.attachmentDetailList.map((item) => {
        item.dragList.map((itemSon) => {
          if (itemSon.currentQyfIndex == this.currentQyfIndex) {
            if (itemSon.type == "gz") {
              gzNumber = gzNumber + 1;
            } else if (itemSon.type == "rq") {
              rqNumber = rqNumber + 1;
            } else if (itemSon.type == "qm") {
              qmNumber = qmNumber + 1;
            }
          }
        });
      });
      if (currentQyf.userType.endsWith("ENTERPRISE")) {
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
      currentAttachment.roles[this.currentQyfIndex]["stampChecked"] = result;
      // 2.判断当前附件下 的签约方 是否 都完成 盖章
      let success = false;
      success = currentAttachment.roles.every((item) => {
        return item.stampChecked;
      });
      this.attachmentList[this.attachmentIndex]["success"] = success;
    },
    attachmentClick(item, index) {
      // 切换附件列表
      let attachmentLength = this.attachmentList.length; // 附件总个数
      if (this.attachmentIndex != index) {
        this.currentPage = 1;
        this.$refs["scroll"].wrap.scrollTop = 0; //重置滚动条的位置
      }
      this.currentQyfIndex = 0; // 当前附件签约方下标
      this.attachmentIndex = index; // 当前附件下标
      this.currentAttachmentName = item.fileName; // 当前附件名称
      this.currentQyfList = item.roles; // 当前附件 签约方
      this.qfzChecked = this.currentQyfList[this.currentQyfIndex]["qfzChecked"]; // 当前签约方 是否使用骑缝章
      this.currentUserType = this.currentQyfList[this.currentQyfIndex].userType; // 当前签约方 的类型
      this.attachmentDetailList = item.attachmentDetailList; // 当前附件 详情
      this.currentAttachmentTotalPage = item.totalPage; // 当前附件 总页数
      if (this.attachmentIndex == attachmentLength - 1) {
        this.nextAttachmentDisplay = false;
      } else {
        this.nextAttachmentDisplay = true;
      }
      this.computedCurrentAttachmentUseQfzDrag();
      this.computedStyle();
    },
    pageInputChangeFunc(value) {
      let currentPage = Number(value); // 输入框 当前输入的数字
      if (currentPage > this.currentAttachmentTotalPage) {
        // 输入的数字大于当前附件总页数
        currentPage = Number(this.currentAttachmentTotalPage);
      } else if (currentPage <= 1) {
        currentPage = 1;
      }
      this.currentPage = currentPage;
      //计算当前缩放下 ，一页的高度
      let pointPositionDocPageHeight = document.querySelector(".point-position-doc-pages .point-position-doc-page:nth-child(1)").offsetHeight * this.scaleSize;
      let scrollTop = pointPositionDocPageHeight * (this.currentPage - 1);
      this.$refs["scroll"].wrap.scrollTop = scrollTop + 20; //指定滚到第几页
    },
    attachmentDetailClick(attachmentItemDetail) {
      // order:表示附件详情的页数，从1开始计算,在操作数据时需要 -1 ，
      this.currentPage = attachmentItemDetail.order; // 当前操作附件详情的页码
      if(this.cursorDragList.length > 0){
        // 取出跟随鼠标移动拖拽项数据，push到对应附件对应的详情页下的拖拽项数组中
        attachmentItemDetail.dragList.push(JSON.parse(JSON.stringify(this.cursorDragList[0])));
        this.cursorDragList.splice(0, 1); // 删除跟随鼠标移动拖拽项数据
      }
      this.useCursorDragBol = false; // 关闭，移动鼠标生成新的跟随鼠标移动拖拽项数据
      this.useCursorDragIconBol = false; // 关闭，跟随鼠标的icon
      this.getFinishResult();
    },
    onActivated(dragItem, dragIndex, attachmentItemDetail) {
      // order:表示附件详情的页数，从1开始计算,在操作数据时需要 -1
      this.currentPage = attachmentItemDetail.order; // 当前操作附件详情的页码
      this.currentPageDragIndex = dragIndex; // 当前操作拖拽项的下标
      this.currentPageDragType = dragItem.type; // 当前附件，当前页，拖拽项类型
    },
    deleteGzcFunc(dragItem, dragIndex) {
      let currentAttachment = this.attachmentList[this.attachmentIndex]; //当前操作附件
      if (dragItem.type == "qfz") {
        currentAttachment.attachmentDetailList.map((item) => {
          item.dragList.splice(dragIndex, 1);
        });
        currentAttachment.roles[dragItem.currentQyfIndex]["qfzChecked"] = false;
        if (this.currentQyfIndex == dragItem.currentQyfIndex) {
          this.qfzChecked = false;
        }
      } else {
        currentAttachment.attachmentDetailList[this.currentPage - 1]["dragList"].splice(dragIndex, 1);
      }
      this.computedCurrentAttachmentUseQfzDrag();
      this.computedStyle();
      this.getFinishResult();
    },
    onDragging(newRect) {
      let currentAttachment = this.attachmentList[this.attachmentIndex]; //当前操作附件
      if (this.currentPageDragType == "qfz") {
        currentAttachment.attachmentDetailList.map((item) => {
          item.dragList.map((itemSon, indexSon) => {
            if (itemSon.type == "qfz" && indexSon == this.currentPageDragIndex) {
              itemSon.y = newRect.top;
            }
          });
        });
      } else {
        let currentItem = this.attachmentDetailList[this.currentPage - 1]["dragList"][this.currentPageDragIndex]; // 当前拖拽项
        let newDragItem = { ...currentItem, x: newRect.left, y: newRect.top }; // 当前拖拽项的新坐标
        this.attachmentDetailList[this.currentPage - 1]["dragList"].splice(this.currentPageDragIndex, 1, newDragItem); // 替换当前附件拖拽项集合中的数据
        currentAttachment.attachmentDetailList = this.attachmentDetailList;
      }
    },
    createDragFunc(type, x, y) {
      let obj = this.createDragItemFunc(type, x, y)
      this.qfzChecked = !this.qfzChecked;
      let currentAttachment = this.attachmentList[this.attachmentIndex]; //当前操作附件
      if (this.qfzChecked) {
        this.attachmentDetailList.map((item) => {
          item.dragList.push(obj);// 勾选骑缝章时，向当前附件的详情，每一页下的拖拽项集合添加 骑缝章 数据
        });
      } else {
        currentAttachment.attachmentDetailList.map((item) => {
          // 当前签约方 取消 骑缝章时，查找当前附件的详情，删除每一页下的拖拽项集合中的 骑缝章 数据
          item.dragList.map((dragItem, dragIndex) => {
            if (dragItem.type == "qfz" && dragItem.currentQyfIndex === this.currentQyfIndex) {
              item.dragList.splice(dragIndex, 1);// 查找类型是 骑缝章，当前拖拽项 currentQyfIndex 等于当前签约方 的下标
            }
          });
        });
      }
      currentAttachment.roles[this.currentQyfIndex]["qfzChecked"] = this.qfzChecked; // 记录当前签约方 是否勾选 骑缝章
      this.computedCurrentAttachmentUseQfzDrag();
      this.computedStyle();
    },
    nextAttachmentFunc() {
      // 点击 进入下一份合同
      this.$refs["scroll"].wrap.scrollTop = 0; // 重置滚动条的位置
      this.currentQyfIndex = 0; // 重置当前签约方下标
      this.attachmentIndex = this.attachmentIndex + 1; // 当前附件下标加 1
      let attachmentLength = this.attachmentList.length; // 计算附件总个数
      let currentAttachment = this.attachmentList[this.attachmentIndex]; // 当前操作附件
      let {
        fileName,
        attachmentDetailList,
        roles,
        totalPage,
      } = currentAttachment;
      this.currentAttachmentName = fileName; // 默认第一个附件 文件名称
      this.attachmentDetailList = attachmentDetailList; // 默认第一个附件 附件详情
      this.currentQyfList = roles; // 默认第一个附件 签约方数组
      this.qfzChecked = this.currentQyfList[this.currentQyfIndex]["qfzChecked"]; // 当前签约方 是否使用骑缝章
      this.currentQyName = roles[0].qyfName; // 默认第一个附件 签约方数组的第一个签约方名称
      this.currentUserType = this.currentQyfList[0].userType; // 默认第一个附件 第一个签约方的类型
      this.currentRoleName = this.currentQyfList[0].roleName; // 当前附件选择的签约方角色名称
      this.currentAttachmentTotalPage = totalPage; // 默认第一个附件 总页数
      if (this.attachmentIndex == attachmentLength - 1) {// 当前 是最后一个附件 ，隐藏 进入下一份合同 按钮
        this.nextAttachmentDisplay = false;
      }
      this.computedCurrentAttachmentUseQfzDrag();
      this.computedStyle();
    },
    onSaveDragType(type) {
      this.currentClickDragType = type; // 保存 当前选择的章的类型
      this.useCursorDragIconBol = true; // 开启，跟随鼠标的icon
      this.useCursorDragBol = true; // 开启，在合同上移动鼠标，可以生成跟随鼠标移动的拖拽项
      this.cursorIcon = "cursor-icon-" + type;
      this.addListenerCursor();
    },
    moveFun(ev) {
      // 获取鼠标的位置
      // 生成一个占位的章
      // 在点击的时候，再生成真正的章
      let e = ev || window.event;
      let that = this;
      this.useCursorDragIconBol = false; // 关闭，跟随鼠标的icon
      if (that.currentClickDragType && e.target.localName == "img" && this.useCursorDragBol) {
        let offsetX = e.offsetX;
        let offsetY = e.offsetY;
        let maxOffsetX = that.config[that.currentClickDragType].parentW - that.config[that.currentClickDragType].w;
        let maxOffsetY = that.config[that.currentClickDragType].parentH - that.config[that.currentClickDragType].h;
        if (offsetX >= maxOffsetX) {
          offsetX = maxOffsetX;
        }
        if (offsetY >= maxOffsetY) {
          offsetY = maxOffsetY;
        }
        that.createCursorDragListFunc(that.currentClickDragType, offsetX, offsetY);
      }
    },
    leaveFun(ev) {
      let e = ev || window.event;
      let className = e.target.className;
      let classArry = ['detail-image', 'send-label-name', 'send-label-wrapper'];
      if (!classArry.includes(className)) {
        if (this.useCursorDragBol) {
          this.useCursorDragIconBol = true; // 开启，跟随鼠标的icon
          this.cursorDragList.splice(0, 1); // 删除跟随鼠标移动拖拽项数据
          this.addListenerCursor();
        } else {
          this.useCursorDragIconBol = false; // 关闭，跟随鼠标的icon
        }
      }
    },
    addListenerCursor() {
      // 跟随鼠标移动的icon监听事件
      this.$nextTick(() => {
        let oTop = document.getElementById("cursor-icon");
        document.onmousemove = function(evt) {
          let oEvent = evt || window.event;
          oTop.style.left = oEvent.clientX + "px";
          oTop.style.top = oEvent.clientY + "px";
        };
      });
    },
    createCursorDragListFunc(type, offsetX, offsetY) {
      let cursorDragItem = this.createDragItemFunc(type, offsetX, offsetY);
      this.cursorDragList = [cursorDragItem];
    },
    createDragItemFunc(type, x, y) {
      let item = {
        // 新的拖拽项 数据组成
        id: Math.random()
          .toString()
          .substr(2), // 数据ID
        roleName: this.currentRoleName, // 当前签约方名称
        userType: this.currentUserType, // 当前签约方类型
        currentQyfIndex: this.currentQyfIndex, // 当前签约方数据下标
        currentQyName: this.currentQyName, // 当前企业名称
        pageNumber: this.currentPage, // 当前附件详情当前页数
        type: type, // 当前拖拽项类型
        x: x, // x轴
        y: y, // y轴
        w: this.config[type].w, // 当前拖拽项宽
        h: this.config[type].h, // 当前拖拽项高
        parentW: this.config[type].parentW, // 当前拖拽项 x轴移动范围
        parentH: this.config[type].parentH, // 当前拖拽项 y轴移动范围
      };
      return item;
    },
    backFunc() {
      this.$emit("close", false);
    },
    saveFunc() {
      let saveData = [];
      let attachmentList = JSON.parse(JSON.stringify(this.attachmentList));
      attachmentList.map((item) => {
        let newAttachmentDetailList = [];
        item.attachmentDetailList.map((attachmentItem) => {
          let dragList = [];
          attachmentItem.dragList &&
            attachmentItem.dragList.map((dragItem) => {
              let type = dragItem.type;
              let x = 0;
              let y = 0;
              let coordsY = 0;
              if(type === 'gz') {
                x = this.numberTransition(dragItem.x - 50, this.config[type].parentW, 1);// 50是和上上签约定值
                coordsY = 1121 - dragItem.y - this.config[type].h - 17; // y 轴坐标需要 加上拖拽项自身高度; 17是和上上签约定值
                y = this.numberTransition(coordsY, this.config[type].parentH, 1);
              } else {
                x = type === "qfz" ? 1 : this.numberTransition(dragItem.x, this.config[type].parentW, 1);
                coordsY = 1121 - dragItem.y - this.config[type].h; // y 轴坐标需要 加上拖拽项自身高度
                y = this.numberTransition(coordsY, this.config[type].parentH, 1);
              }
              let obj = { ...dragItem, x: x, y: y };
              dragList.push(obj);
            });
          let attachmentDetailObj = { ...attachmentItem, dragList: dragList };
          newAttachmentDetailList.push(attachmentDetailObj);
        });
        saveData.push({...item,attachmentDetailList: newAttachmentDetailList});
      });
      this.$root.$params = JSON.parse(JSON.stringify(saveData));
      this.$emit("save", saveData);
    },
    numberTransition(value, base, type) {
      if (type == 1) {
        return Number((value / base).toFixed(6));
      } else {
        return Number((value * base).toFixed(0));
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss'
</style>
