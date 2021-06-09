<template>
  <ui-main class="sp-detail-wrapper">
    <div class="sticky-header-container" ref="fixedBox">
      <headerButtonList />
      <div class="detail-content">
        <template v-if="!useScroll">
          <div class="main-detail">
            <div class="title">商业公司发起的商务条件</div>
            <div class="number"><span>查询号:</span> 5009626</div>
          </div>
          <div class="sub-detail">
            <div class="company-name">杭州下沙商业公司</div>
            <div class="info-status">
              <span>张三</span>
              <span>于05-08发起</span>
              <span>审批中</span>
            </div>
          </div>
          <div class="tag-detail">
            <customTags :data="{mainText:'M1-L2-2041'}" :type="'vertical'" />
            <div class="for-sale">
              <span>大商铺</span>
              <span>续签</span>
              <span>零售配套</span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="second-detail">
            <div class="company-name">杭州下沙商业公司</div>
            <customTags :data="{mainText:'M1-L2-2041',subText:'MUJI无印良品'}" :type="'horizontal'" />
            <div class="number"><span>查询号:</span> 5009626</div>
          </div>
        </template>
        <!-- <template>
          <hr>
          <customTags :data="{mainText:'承租',subText:'九优文具礼品生活馆',secondText:'零售配套'}" :type="'horizontal'" :secondTextStyle="{color:'#787878FF'}" />
          <hr>
          <customTags :data="{mainText:'M1-L2-2041',subText:'',secondText:'零售配套'}" :type="'horizontal'" />
          <hr>
          <customTags :data="{mainText:'商务条件',subText:'',secondText:'对比上一份合同单价'}" :type="'horizontal'" link />
          <hr>
          <customTags :data="{mainText:'167,356.00',subText:'93% / 148,264.00',secondText:''}" :type="'vertical'" :className="'red'" />
          <hr>
          <customTags :data="{mainText:'167,356.00',subText:'',secondText:''}" :type="'vertical'" />
          <hr>
          <customTags :data="{mainText:'无意见',subText:'点击查看审批流',secondText:''}" :type="'vertical'" :className="'blue'" :subTextStyle="{color:'#575757FF'}" />
          <hr>
          <customTags :data="{mainText:'1,257,960.00',subText:'104% / 1,112,318.00',secondText:''}" :type="'vertical'" :className="'blue'" />
          <hr>
          <customTags :data="{mainText:'MUJI无印良品',subText:'',secondText:'优衣库'}" :type="'horizontal'" :className="'red'" />
          <hr>
          <customTags :data="{mainText:'有批注',subText:'',secondText:''}" :type="'horizontal'" :className="'gray'" :mianTextStyle="{color:'#333333FF'}" />
          <hr>
          <customTags :data="{mainText:'有批注',subText:'',secondText:''}" :type="'horizontal'" />
          <hr>
        </template> -->
      </div>
    </div>

    <div class="content-box" style="padding: 0; border: 0;" :style="{'padding-top': contentTop}">
      <!-- <van-skeleton title :row="6" :loading="isSkeleton"> -->
        <!-- todo   模板组件渲染 -->
        <!-- <component ref="tempComponent" v-if="showTest && !tempMode" :is="CName"></component>
        <templateDemo v-if="templateData && tempMode" :data="templateData"></templateDemo>
      </van-skeleton> -->
	  <templateDemo :data="templateData"></templateDemo>
    </div>
   
    <!-- 申请延期组件 -->
    <delay-module v-if="form.approveDelay" @submit="submitDelay"></delay-module>
    <!-- 其他附件组件 -->
    <annex />
    <!-- 图片附件组件 -->
    <img-preview />

    <!-- 审批记录 -->
    <sp-record v-show="form.approveStepList" :recordList="form.approveStepList" @showRepDialog="showRepDialog" @showRepDialogZ="showRepDialogZ"></sp-record>

    <!-- 总裁意见副本组件 -->
    <boss-annex @bossFile="bossFile" />

    <!-- 审批意见 -->
    <approve-record v-if="psv.agreeBtnFlg || psv.disAgreeBtnFlg || psv.denyBtnFlg || psv.meetingBtnFlg" :approveAdmin="psv" @approve="approveMessage"></approve-record>

    <!-- 推送人员 -->
    <push-user></push-user>

    <!-- 推送人员 -->
    <shared-user></shared-user>

    <!-- 留言记录 -->
    <msg-record :currApproveStepId="form.currApproveStepId" />

    <!-- 微信群弹框组件 -->
    <start-wechat :isOpenWechat="isOpenWechat" @closeWechat="isOpenWechat = false"></start-wechat>

    <!-- 分享留言回复弹框 -->
    <confirmDialog :show="shareMessageDialog" @close="shareMessageDialog=false">
      <div class="wechat-dialog">
        <p class="wechat-dialog-title">{{ shareMessageDialogZ ? '请输入追加内容' : '请输入回复内容' }}</p>
        <van-field v-model="replayContent" rows="4" autosize type="textarea" maxlength="300" show-word-limit />
        <p class="wechat-dialog-confirm" @click="replay">确定</p>
      </div>
    </confirmDialog>
    <!-- 驳回弹窗组件 -->
    <reject :open="openReject" :currApproveStepId="form.currApproveStepId" @close="closeReject"></reject>
    <!-- 延期意见录入弹窗 -->
    <delay-remark :open="openDelayRemark" @close="closeDelayRemark" :approveOptionCd="approveOptionCd"></delay-remark>
    <!-- 推送退回意见录入弹窗 -->
    <push-back :open="openPushBack" @close="closePushBack"></push-back>
    <!-- 审批历史弹窗 -->
    <approvalHistory v-model="showApprovalHistory"></approvalHistory>
    <!-- 查看流程弹窗 -->
    <allflows v-model="showAllflows"></allflows>
  </ui-main>
</template>

<script>
import templateDemo from '@/h5template/syswtjsp'
import headerButtonList from './components/headerButtonList' // 头部按钮组件
import confirmDialog from '@/components/confirmDialog'; // 公共确认框
import startWechat from './components/startWechat'; // 发起微信群组件
import approveRecord from './components/approveRecord'; // 留言记录组件
import msgRecord from './components/msgRecord'; // 留言记录组件
import spRecord from './components/spRecord' // 审批记录组件
import delayModule from './components/delayModule' // 申请延期组件
import annex from './components/annex' // 其他附件组件
import imgPreview from './components/imgPreview' // 图片附件组件
import bossAnnex from './components/bossAnnex'
import reject from './components/reject' // 驳回弹窗组件
import delayRemark from './components/delayRemark' // 延期意见录入弹窗组件
import pushBack from './components/pushBack' // 推送退回意见录入弹窗组件
import pushUser from './components/pushUser' // 推送人员列表组件
import sharedUser from './components/sharedUser' // 共享人员列表组件
import approvalHistory from './approvalHistory' // 审批历史组件
import allflows from './allflows' // 查看流程组件
import { Toast, Dialog } from 'vant'
import approval from '@/apis/apis/approval'
import file from '@/apis/apis/file'
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import Allflows from './allflows.vue';
export default {
  components: {
    confirmDialog,
    spRecord,
    delayModule,
    annex,
    imgPreview,
    bossAnnex,
    reject,
    delayRemark,
    pushBack,
    startWechat,
    approveRecord,
    msgRecord,
    pushUser,
    sharedUser,
    templateDemo,
    approvalHistory,
    allflows,
    headerButtonList,
  },
  data () {
    return {
      count: 0,
      isLoading: false,
      isSkeleton: false,
      isOpenWechat: false,
      messageList: [], // 留言列表
      wechatUserList: [], // 企业微信群成员列表
      showConfirm: false,
      pmApprove: {}, // 审批单详情公共数据
      form: {}, // 审批单详情完整数据
      replayContent: '', // 回复共享留言内容
      repalyQuery: {}, // 回复共享留言参数
      shareMessageDialog: false, // 共享留言回复框dialog
      shareMessageDialogZ: false,
      openReject: false, // 驳回弹窗
      approveOptionCd: '', // 同意/拒绝延期申请
      openDelayRemark: false, // 延期意见录入弹窗
      openPushBack: false, // 推送退回意见录入弹窗
      rejectStepId: null, // 驳回节点id,
      psv: {}, // 详情权限相关数据
      CName: '',
      tempMode: true, // 模板本地开发模式
      templateData: {}, // 模板数据
      showTest: false,
      showApprovalHistory: false,
      showAllflows: false,
      approveStepId: '',
      bossFileDetail: [],
      contentTop: '',
      useScroll: false,
      
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    this.getDetail()
  },
  mounted () {

    // this.findBlOrgTree()


    this.$nextTick(() => {
      this.contentTop = this.$refs.fixedBox.offsetHeight + 'px'
      let uiMainScroll = document.querySelector(".ui-main-scroll");
      uiMainScroll.addEventListener("scroll", this.handleScroll); // 监听（绑定）滚轮滚动事件
    });


  },
  beforeDestroy () {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    ...mapMutations(['saveApproveDetail', 'saveBlOrgTreeList']),
    handleScroll () {
      this.contentTop = this.$refs.fixedBox.offsetHeight + 'px'
      let uiMainScroll = document.querySelector(".ui-main-scroll");
      var scrollTop = uiMainScroll.pageYOffset || uiMainScroll.scrollTop || uiMainScroll.scrollTop;
      console.log(scrollTop, 'scrollTop')
      if (scrollTop > 10) {
        this.useScroll = true;
      } else {
        this.useScroll = false;
      }
    },
    // 返回(关闭详情页)
    back (state) {
      // window.history.go(-1)
      // 返回列表清理组织架构数据
      this.saveBlOrgTreeList()
      const href = window.location.href;
      const source = this.getQueryString('source')
      const code = this.getQueryString('code')
      if (process.env.NODE_ENV === 'development') {
        try {
          // window.parent.doReturn()
          if (state == 1) {
            window.parent.postMessage({ type: 'refresh' }, '*')
          } else {
            window.parent.postMessage({ type: 'refresh', id: this.userInfo.approveId }, '*')
          }
        } catch (e) {
          console.log("can not found parent fun doReturn!!", e)
          window.location.href = `http://demo.powerlong.com/PowerDesk/wap/wap-approve-info.action?source=${source}&code=${code}`
        }
        return
      } else {
        // window.history.go(-2)
        // window.location.href = `https://wt.powerlong.com/wap/wap-approve-info.action?source=${source}&code=${code}`
        // 调用父容器函数
        try {
          // window.parent.doReturn()
          if (state == 1) {
            window.parent.postMessage({ type: 'refresh' }, '*')
          } else {
            window.parent.postMessage({ type: 'refresh', id: this.userInfo.approveId }, '*')
          }
        } catch (e) {
          console.log("can not found parent fun doReturn!!", e)
          window.location.href = `https://wt.powerlong.com/wap/wap-approve-info.action?source=${source}&code=${code}`
        }
        return;
      }
      // window.location.href = 'http://demo.powerlong.com/PowerDesk/wap/wap-approve-info.action'
    },
    // 获取审批模板
    async getTemplateContentText () {
      const param = {
        approveId: this.userInfo.approveId,
        templateContentCat: 'WAP'
      };
      await approval.getTemplateContentText(param).then(res => {
        if (res.code == 1 && res.data) {
          const fileIds = res.data.entity && res.data.entity.fileId || null;
          let fileList = [];
          // 未拆分
          // const template = res.data.templateContent.content.split('%%%')[0];
          // let comp = res.data.templateContent.content.split('%%%')[1];
          // 已拆分
          const template = res.data.templateContent.content;
          let comp = res.data.templateContent.contentJs;
          if (!comp) {
            this.showTest = false;
            Toast('表单模板配置错误，请检查后台模板配置')
            return;
          }
          comp = eval('(' + comp + ')');
          const uploadUrl = 'api/file/uploadFile'
          const CName = 'test';
          this.CName = CName;
          const data = {
            bizEntityJson: this.form.entity,
            allEntityFileIds: this.form.allEntityFileIds,
          };
          this.templateData = data;
          if (fileIds) {
            file.loadFiles({ fileIds }).then(res => {
              if (res.code == 1 && res.data) {
                fileList = res.data.fileShowVoList;
                fileList.forEach(e => {
                  e.name = e.originalFilename;
                })
                Vue.component(CName, comp);
                this.showTest = true;
              }
            }).catch(err => console.log(err))
          } else {
            Vue.component(CName, comp);
            this.showTest = true;
          }
        }
      });
    },
    // 回复共享留言
    replay () {
      if (!this.replayContent) {
        Toast(this.shareMessageDialogZ ? '请先输入追加内容' : '请先输入回复内容');
        return;
      }
      if (this.shareMessageDialogZ) {
        var query = {
          approveId: this.userInfo.approveId,
          content: this.replayContent,
          msgType: 'Z',
          createdUserCd: this.userInfo.userid,
          currApproveStepId: this.approveStepId
        }
      } else {
        var query = {
          ...this.repalyQuery,
          content: this.replayContent,
          msgType: 'S',
          createdUserCd: this.userInfo.userid,
          currApproveStepId: this.form.currApproveStepId
        }
      }
      approval.saveApproveMessage(query).then(res => {
        if (res.code == 1 && res.message == 'success') {
          Toast(this.shareMessageDialogZ ? '追加成功' : '留言成功');
          this.shareMessageDialog = false;
          this.shareMessageDialogZ = false;
          this.replayContent = '';
          this.getDetail();
        } else {
          Toast(res.message || '操作失败，请稍后重试')
        }
      }).catch();
    },
    // 打开回复留言dialog
    showRepDialog (i) {
      // 回复给除登录人以外的所有人
      let newArr = i.userIds.split('|')
      newArr.push(i.createdUserId)
      for (let key in newArr) {
        if (this.userInfo.userid == newArr[key]) {
          newArr.splice(key, 1)
        }
      }
      this.repalyQuery = {
        referMsgId: i.id,
        userList: [newArr.join('|')],
        approveId: i.approveId
      };
      this.shareMessageDialog = true;
    },
    showRepDialogZ (item) {
      this.shareMessageDialog = true
      this.shareMessageDialogZ = true
      this.approveStepId = item.approveStepId
    },
    // 获取审批详情
    async getDetail () {
      this.isSkeleton = true
      const param = {
        userId: this.userInfo.userid,
        approveId: this.userInfo.approveId
      }
      await approval.getApproveDetail(param).then(res => {
        this.saveApproveDetail(res.data);
        if (res.code == 1 && res.data) {
          this.form = res.data;
          this.entity = res.data.entity;
          this.pmApprove = res.data.pmApprove;
          this.psv = res.data.psv;
          this.getTemplateContentText();
        } else {
          this.$toast.fail(res.message)
        }
        this.isSkeleton = false
        this.$nextTick(() => {
          console.log(this.$refs.fixedBox.offsetHeight, '置顶头部高度')
          this.contentTop = this.$refs.fixedBox.offsetHeight + 'px'
        })
      });
    },
    // 查看流程
    viewAllflows () {
      this.$router.push({ path: '/allflows', query: { pid: this.form.pmApprove.processId } });
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    // 获取宝龙机构人员树
    findBlOrgTree () {
      if (!this.$store.state.bljtOrgTreeList.text) {
        approval.findBlOrgTree().then(res => {
          if (res.code == 1) {
            this.saveBlOrgTreeList(res.data)
          } else {
            this.$toast.fail(res.message)
          }
        })
      }
    },
    bossFile (res) {
      console.log(res)
      this.bossFileDetail = res
    },
    // 执行审批步骤
    doStepFlow (type) {
      if (this.userInfo.userid == 'xujk' && this.psv.signatureFlg && this.bossFileDetail.length == 0 && type == 'A') {
        this.$toast.fail('请到网页版PD上传总裁签字')
        return
      }
      if ((type == 'A' || type == 'B') && !this.approveRemark) {
        this.$dialog.confirm({
          message: `您的意见为空，将默认填写${type == 'A' ? '同意发起人意见' : '不同意'}，请问是否继续？`
        })
          .then(() => {
            const param = {
              approveOpinion: type,
              approveId: this.userInfo.approveId,
              approveRemark: type == 'A' ? '同意发起人意见' : '不同意',
              approveUserId: this.userInfo.userid,
              approveUserName: this.userInfo.username,
              bizEntityJson: JSON.stringify(this.form.entity),
              approveStepId: this.form.currApproveStepId,
              operation: 2, // 手机端
            }
            approval.doStepFlow(param).then(res => {
              if (res.code == 1) {
                this.$toast.success('审批已' + (type == 'A' ? '完成' : '驳回'))
                this.getDetail()
                setTimeout(() => {
                  this.back()
                }, 500)
              } else {
                if (res.code == 205) {
                  this.$toast(res.message)
                  setTimeout(() => {
                    this.back()
                  }, 1000)
                } else {
                  this.$toast.fail(res.message)
                }
              }
            })
          })
          .catch(() => {
            // on cancel
          })
      } else if (type == 'D' && !this.approveRemark) {
        this.openReject = false
        this.$dialog.confirm({
          message: '您的意见为空，将默认填写驳回，请问是否继续？'
        })
          .then(() => {
            const param = {
              approveOpinion: type,
              approveId: this.userInfo.approveId,
              approveRemark: '驳回',
              approveUserId: this.userInfo.userid,
              approveUserName: this.userInfo.username,
              bizEntityJson: JSON.stringify(this.form.entity),
              denyApproveStepId: this.rejectStepId,
              approveStepId: this.form.currApproveStepId,
              operation: 2, // 手机端
            }
            approval.doStepFlow(param).then(res => {
              if (res.code == 1) {
                this.$toast.success('审批已驳回')
                this.getDetail()
                setTimeout(() => {
                  this.back()
                }, 500)
              } else {
                if (res.code == 205) {
                  this.$toast(res.message)
                  setTimeout(() => {
                    this.back()
                  }, 1000)
                } else {
                  this.$toast.fail(res.message)
                }
              }
            })
          })
          .catch(() => {
            // on cancel
          })
      } else {
        const param = {
          approveOpinion: type,
          approveId: this.userInfo.approveId,
          approveRemark: this.approveRemark,
          approveUserId: this.userInfo.userid,
          approveUserName: this.userInfo.username,
          bizEntityJson: JSON.stringify(this.form.entity),
          denyApproveStepId: this.rejectStepId,
          approveStepId: this.form.currApproveStepId,
          operation: 2, // 手机端
        }
        approval.doStepFlow(param).then(res => {
          if (res.code == 1) {
            this.$toast.success('审批已' + (type == 'A' ? '完成' : '驳回'))
            this.getDetail()
            setTimeout(() => {
              this.back()
            }, 500)
          } else {
            if (res.code == 205) {
              this.$toast(res.message)
              setTimeout(() => {
                this.back()
              }, 1000)
            } else {
              this.$toast.fail(res.message)
            }
          }
        })
      }
    },
    // 追回
    recover (type) {
      const obj = { 1: '撤回', 2: '追回完成', 3: '追回', 4: '追回驳回' }
      const msg = obj[type]
      this.$dialog.confirm({
        message: `确认要${msg}吗？`,
      })
        .then(() => {
          const param = {
            userId: this.userInfo.userid,
            userName: this.userInfo.username,
            approveStepId: this.form.approveStepId,
            retrieveType: type,
            approveId: this.userInfo.approveId
          }
          approval.doRetrieve(param).then(res => {
            if (res.code == 1) {
              this.$toast.success(`${msg}成功`)
              setTimeout(() => {
                this.back()
              }, 500)
            } else {
              this.$toast.fail(res.message)
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    // 给我
    giveMe () {
      this.$dialog.confirm({
        message: '点击确定将跳过所有流程直接到我，确定吗？',
      })
        .then(() => {
          const param = {
            approveId: this.userInfo.approveId,
            approveUserId: this.userInfo.userid,
            approveUserName: this.userInfo.username,
          }
          approval.giveMe(param).then(res => {
            if (res.code == 1) {
              this.$toast.success('操作成功')
              this.getDetail()
            } else {
              this.$toast.fail(res.message)
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    // 上会
    goMeeting () {
      this.$dialog.confirm({
        message: '确定发起决策会？',
      })
        .then(() => {
          const param = {
            approveUserId: this.userInfo.userid,
            approveId: this.userInfo.approveId
          }
          approval.startMeeting(param).then(res => {
            if (res.code == 1) {
              this.$toast.success('成功发起决策会')
              setTimeout(() => {
                this.back()
              }, 500)
            } else {
              this.$toast.fail(res.message)
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    // 驳回弹窗回调
    closeReject (res) {
      if (res.submit) {
        this.rejectStepId = res.rejectStepId;
        this.doStepFlow('D')
      }
      this.openReject = res.fast
    },
    // 取消申请延期
    cancelDelay () {
      this.$dialog.confirm({
        message: '确定取消申请延期吗？'
      }).then(() => {
        const param = {
          id: this.form.approveDelayId,
          approveOptionCd: 'C',
          approveUserId: this.userInfo.userid,
        }
        approval.doDelayFlow(param).then(res => {
          if (res.code == 1) {
            this.$toast.success('取消申请延期成功')
            this.getDetail()
          } else {
            this.$toast.fail(res.message)
          }
        })
      }).catch(() => {
      })
    },
    // 同意/拒绝延期操作回调
    submitDelay (res) {
      this.openDelayRemark = true
      this.approveOptionCd = res
    },
    // 延期意见录入弹窗回调
    closeDelayRemark (res) {
      if (res.fast) {
        this.getDetail()
      }
      this.openDelayRemark = false
    },
    // 推送退回意见录入弹窗回调
    closePushBack (res) {
      if (res.fast) {
        this.getDetail()
      }
      this.openPushBack = false
    },
    // 审批意见回调
    approveMessage (status, message) {
      this.approveRemark = message
      if (status == 1) {
        this.doStepFlow('A')
      }
      if (status == 2) {
        this.doStepFlow('B')
      }
      if (status == 3) {
        if (!this.approveRemark) return this.$toast.fail('请填写驳回原因')
        this.openReject = true
      }
      if (status == 4) {
        this.goMeeting()
      }
    },
    // 删除审批单
    dealDel () {
      this.$dialog.confirm({
        message: '确认要删除吗？',
      })
        .then(() => {
          approval.deleteApproveById(this.userInfo.approveId).then(res => {
            if (res.code == 1) {
              this.$toast.success('删除成功')
              setTimeout(() => {
                this.back()
              }, 500)
            } else {
              this.$toast.fail(res.message)
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    getQueryString (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      // console.log(window.location.search,'-----window.location.search');
      var r = window.location.search.substr(1).match(reg);
      var context = "";
      if (r != null)
        context = r[2];
      reg = null;
      r = null;
      return context == null || context == "" || context == "undefined" ? "" : context;
    }
  }
};
</script>

<style lang="scss">
@import "~@/scss/h5template.scss";
</style>

<style lang="scss" scoped>
@import "~@/scss/variables.scss";
$color: #26a2ff;
.sp-detail-wrapper {
  // padding: 5px 0 10px;
  padding: 0 0 10px;
  .ui-main-scroll {
    position: relative;
  }
  .detail-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
  .detail-title-info {
    margin-top: 10px;
    line-height: 20px;
    font-size: 12px;
    color: #333;
  }
  .fixed-box {
    width: 100%;
    position: fixed;
    background-color: #ffffff;
    z-index: 999;
    pointer-events: none;
  }
  .btn-box {
    padding: 0 10px;
    pointer-events: auto;
  }
  .content-box {
    padding: 10px;
    border-bottom: 10px solid #ecf0f2;
  }
  .content-box.noborder {
    border: 0;
  }

  .wechat-dialog {
    .wechat-dialog-title {
      font-size: 16px;
      color: #333;
      margin: 10px 0 10px 0;
    }
    .wechat-dialog-confirm {
      height: 34px;
      line-height: 34px;
      text-align: center;
      color: #fff;
      margin-top: 10px;
      background: linear-gradient(298deg, #468ceb 0%, #35abff 100%);
    }
  }
}
</style>
<style lang="scss" scoped>
.sticky-header-container {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 999;
  background: #f6f6ee;
  padding: 10px 15px 22px 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  .detail-content {
    .main-detail {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 6px;
      .title {
        flex: 0 0 220px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 20px;
        color: #020b14;
        line-height: 24px;
      }
      .number {
        font-size: 10px;
        color: #575757;
        line-height: 10px;
      }
    }
    .sub-detail {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
      .company-name {
        width: 125px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #0071c1;
        line-height: 24px;
      }
      .info-status {
        font-size: 14px;
        color: #575757;
        line-height: 24px;
        span {
          margin-right: 5px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
      .number {
        font-size: 10px;
        color: #575757;
        line-height: 10px;
        white-space: nowrap;
      }
    }
    .second-detail {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
      .company-name {
        width: 125px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #0071c1;
        line-height: 24px;
      }
      .number {
        font-size: 10px;
        color: #575757;
        line-height: 10px;
        white-space: nowrap;
      }
    }
    .tag-detail {
      display: flex;
      align-items: center;
      .for-sale {
        display: flex;
        font-size: 14px;
        color: #0071c1;
        line-height: 14px;
        margin-left: 15px;
        justify-content: space-between;
        span {
          margin-right: 10px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>


<style lang="scss">
@import "~@/scss/h5template.scss";
</style>
