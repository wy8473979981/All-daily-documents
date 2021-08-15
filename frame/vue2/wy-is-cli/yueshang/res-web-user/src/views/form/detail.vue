<template>
  <el-container 
    class="content-wrapper"
    element-loading-text="正在查看明细"
    v-loading="loading">
    <el-header style="padding-left:0;padding-right:0;height:40px">
      <el-row v-if="editMode" type="flex" justify="end" class="btn-box">
        <el-button @click="back(1)" plain size="mini">返回</el-button>
        <el-button v-dis-dbclick @click="preSave('draft')" type="primary" size="mini">存草稿</el-button>
        <el-button v-if="form.approveId" @click="dealDel" type="danger" plain size="mini">删除</el-button>
        <!-- <el-button type="primary" plain size="mini">附件</el-button> -->
        <el-button @click="showUploadDialog = true" type="primary" plain size="mini">其他附件</el-button>
        <el-button @click="showFlowDialog = true" type="primary" plain size="mini">查看流程</el-button>
        <el-button v-if="psv.signatureFlg" @click="showSignatureDialog = true" type="success" plain size="mini">总裁签字</el-button>
        <span style="line-height:30px;color:red" v-if="signFiles.length > 0 && psv.signatureFlg">总裁签字已上传</span>
        <!-- <el-button type="success" plain size="mini">微信群</el-button> -->
      </el-row>
      <el-row v-else type="flex" justify="end" class="btn-box">
        <el-button @click="back(1)" plain size="mini">返回</el-button>
        <el-button v-if="psv.saveDraftBtnFlg" v-dis-dbclick @click="preSave('draftDetail')" type="primary" size="mini">存草稿</el-button>
        <el-button v-if="psv.pushBtnFlg" @click="showSearchUser = true;isPush = true; pushShare = false" type="primary" size="mini">推送</el-button>
        <el-button v-if="psv.pushBackBtnFlg" @click="showPushBackDialog = true" type="primary" size="mini">推送退回</el-button>
        <el-button v-if="psv.importFlg && isLedgerShow != 2" @click="Ledger" type="primary" plain size="mini">导入台账</el-button>
        <el-button @click="showHistoryDialog = true" type="primary" plain size="mini">审批历史</el-button>
        <!-- <el-button type="primary" plain size="mini">附件</el-button> -->
        <el-button @click="showUploadDialog = true" type="primary" plain size="mini">其他附件</el-button>
        <el-button @click="showFlowDialog = true" type="primary" plain size="mini">查看流程</el-button>
        <el-button v-if="psv.delayBtnFlg" @click="fastDelay = true" type="danger" plain size="mini">申请延期</el-button>
        <el-button v-if="psv.cancelDelayBtnFlg" @click="cancelDelay" type="danger" plain size="mini">取消延期申请</el-button>
        <el-button v-if="psv.viewDelayBtnFlg" @click="fastLookDelay = true" type="primary" plain size="mini">延期历史</el-button>
        <el-button @click="print" type="primary" plain size="mini">打印</el-button>
        <el-button v-if="psv.giveMeFlg" @click="giveMe" type="primary" plain size="mini">给我</el-button>
        <el-button v-if="psv.deleteBtnFlg" @click="dealDel" type="danger" plain size="mini">删除</el-button>
        <el-button v-if="psv.topDenyBtnFlg" @click="showRejectDialog = true" type="danger" plain size="mini">驳回</el-button>
        <!-- 未审批追回 -->
        <el-button v-if="psv.retrieveBtnFlg" type="danger" @click="recall('1')" plain size="mini">撤回</el-button>
        <el-button v-if="psv.retrieveCompleteBtnFlg" type="danger" @click="recall('2')" plain size="mini">追回完成</el-button>
        <!-- 追回当前审批 -->
        <el-button v-if="psv.retrieveApproveBtnFlg" type="danger" @click="recall('3')" plain size="mini">追回</el-button>
        <el-button v-if="psv.retrieveDenyBtnFlg" type="danger" @click="recall('4')" plain size="mini">追回驳回</el-button>
        <el-button v-if="psv.shareBtnFlg" @click="showSearchUser = true; pushShare = true" type="primary" plain size="mini">共享</el-button>
        <!-- <el-button @click="showWechatDialog = true" type="success" plain size="mini">微信群</el-button> -->
        <el-button v-if="psv.signatureFlg" @click="showSignatureDialog = true" type="success" plain size="mini">总裁签字</el-button>
        <!-- <el-button v-if="psv.pushMonitorFlg" type="success" plain size="mini">推送监审部</el-button> -->
        <el-button @click="fastAccountable = true" plain size="mini">问责</el-button>
        <el-button @click="showSuggestionDialog = true" plain size="mini">意见箱</el-button>
        <span style="line-height:30px;color:red" v-if="signFiles.length > 0 && psv.signatureFlg">总裁签字已上传</span>
      </el-row>
    </el-header>
    <!-- 打印区域开始 -->
    <div ref="printForm" class="print-form" id="print-form">
      <!-- <el-row  style="margin-bottom: 5px">
        <span v-show="breadStr" class="header-crumb">  位置：{{breadStr}} </span>
      </el-row> -->
      <el-row style="margin-bottom: 15px" :gutter="0">
        <el-col :span="24">位置：{{ formPath }}</el-col>
      </el-row>
      <el-row v-if="printInfo" style="margin-bottom:8px;">
        <span class="header-crumb">打印人：{{printInfo.printUserName}}，</span>
        <span class="header-crumb">{{printInfo.updatedDate}}，</span>
        <span class="header-crumb">版本号：{{printInfo.printNum}}</span>
      </el-row>
      <el-row style="line-height: 20px" :gutter="0">
        <el-col :span="4" style="min-width:150px">查询号：{{pmApprove.approveNo}}</el-col>
        <el-col :span="4">发起人：<span v-show="!loading">{{pmApprove.createdUserName || userInfo.username}}</span></el-col>
        <el-col v-show="!editMode" :span="4" style="min-width:250px">
          <span v-if="pmApprove.status != '草稿'">发起日期：{{pmApprove.startDate ? pmApprove.startDate.slice(0,16) : pmApprove.startDate}}</span>
          <span v-else>创建日期：{{pmApprove.createdDate.slice(0,16)}}</span>
        </el-col>
        <el-col :span="3">状态：<span v-show="!loading">{{pmApprove.status || '草稿'}}</span><span v-if="isLedgerShow == 2">(数据已导出)</span><span v-if="isLedgerShow == 3">(执行失败)</span></el-col>
        <el-col v-if="pmApprove.stepEndDate" :span="4">
          <span style="color: #EF2941;" v-if="new Date(pmApprove.stepEndDate.replace(/-/g, '/')).valueOf() - Date.now() < 0">{{pmApprove.stepEndDate | computedTime}}</span>
          <span style="color: #F6B03C;" v-else>{{pmApprove.stepEndDate | computedTime}}</span>
        </el-col>
        <el-col v-if="pmApprove.randomNo" :span="4" style="float: right;">
          <p style="text-align: right;">{{ pmApprove.randomNo }}</p>
        </el-col>
      </el-row>
      <!-- <p>{{ pmApprove.randomNo }}</p> -->
      <el-row style="margin-top: 30px; font-size: 22px; color: #333; text-align: center;">
        <span v-if="loading" style="font-size: 22px; color: transparent;">加载中</span>
        <span v-else class="no-print" style="font-size: 22px;">{{formTitle || (form.pmApprove && form.pmApprove.processName) || menuTreeItem.text || ptext}}</span>
        <span class="sign-area" style="font-size: 26pt;" v-html="printTitle"></span>
      </el-row>
      <remind class="no-print" :pid="$route.query.processId || pid"></remind>
      <!-- 渲染数据 -->
      <component class="template-comp-wrapper" id="tempComponent" ref="tempComponent" @hook:updated="handleDomDetail" @hook:mounted="handleDomDetail" v-if="showTest && !tempMode" :is="CName"></component>
      <!-- 模板数据 -->
      <templateDemo v-if="templateData && tempMode" :data="templateData"></templateDemo>
      <electronicSignature :data="templateData" ref="signature"></electronicSignature>
			<el-row v-if="editMode || psv.canApplyFlg" style="margin-bottom: 30px;margin-top:30px">
        <el-button v-if="!showPre" v-dis-dbclick type="primary" size="mini" @click="preSave('')">保存并填写审批人</el-button>
        <el-button v-if="showPre" type="primary" size="mini" @click="edit">编辑</el-button>
        <el-button v-if="showPre" v-dis-dbclick type="primary" size="mini" @click="save">发起</el-button>
      </el-row>
      <el-row v-if="showPre" style="margin-bottom: 30px; margin-top:30px; color: #EF2941;">
        <span>如需修改表单，请点击‘编辑’按钮</span>
      </el-row>
      <!-- 审批步骤列表 -->
      <div v-if="showPre" class="step-list">
        <el-form label-width="auto" size="mini">
        <el-row v-for="(v,i) in stepList" :key="i">
          <el-col :span="12">
            <el-form-item
              :label="(v.displayNumber == null ? '' : v.displayNumber) + (v.displayNumber != null ? '. ' : '') + v.stepName"
              >
              <div style="display: flex;">
                <el-input v-if="v.lockFlg" :disabled="true" v-model="v.approveUserName" class="lock-input" size="mini"></el-input>
                <el-input v-else @click.native="checkApproveUser(v)" v-model="v.approveUserName" readonly size="mini" placeholder="请选择审批人"></el-input>
                <i v-if="v.canAddCooperationFlg && stepList[i == 0 ? 0 : i - 1].stepName != '合作项目附加节点'" class="el-icon-circle-plus" @click="addCooperationFlg(v, i)" style="font-size: 24px; color: #409EFF;line-height: 30px; position: absolute; right: -30px;"></i>
                <i v-if="v.stepName == '合作项目附加节点'" class="el-icon-remove" @click="removeCooperationFlg(i)" style="font-size: 24px; color: #EF2941;line-height: 30px; position: absolute; right: -30px;"></i>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <span class="step-group" v-if="v.stepGroupName">{{v.stepGroupName}}</span>
          </el-col>
        </el-row>
        </el-form>
      </div>
      
      <xshtfj :xshtFjList="xshtFjList" class="no-print"></xshtfj>
      <div class="otherFileWrapper no-print" v-if="allUploadFiles.length > 0">
        <el-row class="min-title">附件</el-row>
        <el-row class="allfj-row">
          <div class="allfj-show" v-for="(item, index) in allUploadFiles" :key="index">
            <p>
              <span class="upload-title">
                <i class="el-icon-document"></i>
                <span class="allfj-title" @click="downLoadFileGlobal(item)">{{ item.originalFilename }}</span>
              </span>
              <span class="upload-del">
                <span>{{ item.createdUserName }}</span>
                <span class="allfj-date">{{ item.createdDate }}</span>
              </span>
            </p>
          </div>
        </el-row>
      </div>
      <div class="otherFileWrapper no-print" v-if="uploadFilesIMG.length > 0">
        <el-row class="min-title">附件预览</el-row>
        <el-row class="fj-row">
          <viewer class="imgPreview-viewer" :images="uploadFilesIMG">
            <div class="fj-showImg" v-for="(item, index) in uploadFilesIMG" :key="index">
              <img :src="item.showUrl" :alt="item.originalFilename">
            </div>
          </viewer>
        </el-row>
      </div>
      <!-- 审批流程审批历史组件 -->
      <flow v-if="form.approveStepList && form.approveStepList.length > 0" :status="pmApprove.status" :stepList="form.approveStepList" @showRepDialog="showRepDialog" @showRepDialogZ="showRepDialogZ"></flow>
      <div class="sign-area">
        <el-row class="title">签字区域:</el-row>
        <div class="content">
          <p>{{ptext || pmApprove.processName}}（查询号：{{pmApprove.approveNo}}）</p>
          <p>此网批{{pmApprove.status}}</p>
        </div>
      </div>
    </div>
    <!-- 打印区域结束 -->
    <!-- 延期申请组件 -->
    <delay-box v-if="form.approveDelay" :delayList="form.approveDelay" @submit="submitDelay"></delay-box>
    <!-- 保存并填写审批人后审批步骤责任人下拉框 -->
    <sp-search-user :key="1" :multiple="nowStep.mutiFlg" :nowStep="nowStep" :open="showSpSearchUser" @close="closeSpSearhUser"></sp-search-user>
    <!-- 审批意见 -->
    <div>
      <div v-show="psv.agreeBtnFlg || psv.disAgreeBtnFlg || psv.denyBtnFlg">
        <el-row class="gray-title">
        审批意见<span class="red-color">(请在这里填写有效审核/审批意见)</span>
        </el-row>
        <div style="display: flex;">
          <el-row style="width: 100%;">
            <el-input
              type="textarea"
              :rows="3"
              resize="none"
              v-model="approveRemark">
            </el-input>
          </el-row>
          <el-row type="flex" justify="end" class="btn-box btn-height">
            <el-button v-if="psv.agreeBtnFlg" @click="doStepFlow('A')" type="primary" size="mini">{{ form.approveStepList[form.approveStepList.length - 1].approveUserId == '|' + userInfo.userid + '|' ? '完成' : '同意' }}</el-button>
            <el-button v-if="psv.disAgreeBtnFlg" @click="doStepFlow('B')" type="danger" plain size="mini">不同意</el-button>
            <el-button v-if="psv.denyBtnFlg" @click="showRejectDialog = true" type="danger" plain size="mini">驳回</el-button>
            <el-button style="border-color: #b3d8ff; background-color: #edf4fd;" v-if="psv.shareBtnFlg" @click="showSearchUser = true; pushShare = true" type="primary" plain size="mini">共享</el-button>
            <el-button v-if="psv.meetingBtnFlg" @click="startMeeting" type="success" plain size="mini">上会</el-button>
          </el-row>
        </div>
      </div>
    </div>
    <signature :signFiles="signFiles" class="no-print"></signature>
    <div class="footer" v-show="!editMode">
      <el-row class="notprint-title"><i class="notprint-icon"/>以下内容属于不打印区域</el-row>
      <el-row class="btn-title" v-show="pushCheckedList.length > 0">已推送给</el-row>
      <div class="share-list" v-show="pushCheckedList.length > 0">
        <span class="name" v-for="(i, index) in pushCheckedList" :key="index">{{i.userName}};</span>
      </div>
      <el-row class="btn-title" v-show="shareCheckedList.length > 0 && psv.agreeBtnFlg">已共享给</el-row>
      <div class="share-list" v-show="shareCheckedList.length > 0 && psv.agreeBtnFlg">
        <span class="name" v-for="(i, index) in shareCheckedList" :key="index">{{i.userName}};</span>
      </div>
      <el-row class="btn-title">沟通记录</el-row>
      <el-row class="btn-title">留言记录</el-row>
      <el-row>
        <div class="message-list" v-for="i in messageList" :key="i.id">
          <p><span class="user">{{i.createdUserName}}</span> <span>({{i.updatedDate}})</span></p>
          <p>{{i.content}}</p>
        </div>
      </el-row>
      <el-row class="btn-title" style="margin-top: 20px">发表留言<span class="red-color">(这里填写的内容不具审批效力也不会被打印)</span></el-row>
      <el-row>
        <el-input
          v-model="content"
          type="textarea"
          :rows="3"
          maxlength="300"
          show-word-limit>
        </el-input>  
      </el-row>
      <el-row type="flex" justify="end" style="margin-top:10px">
        <el-button @click="message" type="primary" size="mini">留言</el-button>
      </el-row>
    </div>
    <!-- 责任人下拉框多人选择 -->
    <search-user :key="2" :open="showSearchUser" :multiple="true" :pushShare="pushShare" @close="closeSearhUser"></search-user>
    <!-- 共享留言弹框 -->
    <el-dialog
      title="共享原因录入"
      :visible.sync="showShareDialog"
      width="450px"
      v-dialogDrag
      >
      <el-input v-model="shareContent" type="textarea" :rows="3" placeholder="留言给被共享人"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showShareDialog = false">取 消</el-button>
        <el-button type="primary" @click="share" v-dis-dbclick>确 定</el-button>
      </span>
    </el-dialog>
    <!-- 回复共享弹框 -->
    <el-dialog
      :title="showReplayDialogZ ? '输入追加内容' : '输入回复内容'"
      :visible.sync="showReplayDialog"
      width="450px"
      v-dialogDrag
      >
      <el-input v-model="replayContent" type="textarea" :rows="3"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showReplayDialog = false">取 消</el-button>
        <el-button type="primary" @click="replay">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看审批历史弹框 -->
    <el-dialog
      title="审批历史"
      :visible.sync="showHistoryDialog"
      width="600px"
      v-dialogDrag
      >
      <history :historyList="form.approveHistoryList"></history>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showHistoryDialog = false">关闭</el-button>
      </span>
    </el-dialog>

      <!-- 总裁签字弹框 -->
    <el-dialog class="upload-dialog yjx" title="总裁签字" :visible.sync="showSignatureDialog" width="50%" v-dialogDrag>
      <p class="upload-h1">上传</p>
      <div class="upload-show" v-for="(item, index) in waitSignatureList" :key="index">
        <p>
          <span class="upload-title">
            <i class="el-icon-document"></i>
            <span class="fj-title">{{ item.name }}</span>
          </span>
        </p>
      </div>
      <div class="upload-box">
        <el-upload
          ref="upload"
          class="upload-demo"
          :action="otherFjUrl"
          :headers="{'Authorization': userInfo.token}"
          :accept="$action"
          :data="{bizId, bizFileName:'signFileId', userName: userInfo.username, userId: userInfo.userid}"
          :on-success="handleSignSuccess"
          :on-error="handleErrorGlobal"
          :on-change="handleSignChange"
          :show-file-list="false"
          :auto-upload="false"
          style="text-align:center;margin-top:10px"
          >
          <el-button slot="trigger" type="text">选择文件</el-button>
        </el-upload>
        <span>
        </span>
      </div>
      <el-button class="bg-btn upload" size="small" type="primary" style="margin-left: 20px;" v-dis-dbclick @click="submitSign">上传</el-button>
    </el-dialog>

     <!-- 其他附件弹框 -->
    <el-dialog class="upload-dialog yjx" title="其他附件" :visible.sync="showUploadDialog" width="50%" v-dialogDrag>
      <p class="upload-h1">上传</p>
      <div class="upload-show" v-for="(item, index) in waitUploadList" :key="index">
        <p>
          <span class="upload-title">
            <i class="el-icon-document"></i>
            <span class="fj-title">{{ item.name }}</span>
          </span>
          <span class="upload-del">
            <i class="el-icon-close" @click="deleteUploading(index)"></i>
          </span>
        </p>
      </div>
      <p v-if="isUploading" class="upload-ing">正在上传...</p>
      <div class="upload-box">
        <el-upload
          ref="upload"
          class="upload-demo"
          :action="otherFjUrl"
          :headers="{'Authorization': userInfo.token}"
          :accept="$action"
          :data="{bizId, bizFileName:'otherFileId', userName: userInfo.username, userId: userInfo.userid}"
          :on-success="handleUploadSuccess"
          :on-error="handleErrorGlobal"
          :on-change="handleChange"
          :show-file-list="false"
          :auto-upload="false"
          style="text-align:center;margin-top:10px"
          >
          <el-button slot="trigger" type="text">选择文件</el-button>
          <!-- <el-button class="bg-btn upload" size="small" type="primary">其他附件上传</el-button> -->
        </el-upload>
        <span>
          <!-- <i class="el-icon-close"></i> -->
        </span>
      </div>
      <el-button class="bg-btn upload" size="small" type="primary" style="margin-left: 20px;" v-dis-dbclick @click="submitUpload">上传</el-button>
      <div class="content">
        <p class="fj-h1">下载</p>
        <el-row v-if="uploadFiles.length < 1" style="text-align:center">暂无</el-row>
        <div v-else>
          <div class="fj-show" v-for="(item, index) in uploadFiles" :key="index">
            <p>
              <span class="upload-title">
                <i class="el-icon-document"></i>
                <span v-if="editMode" class="fj-title" @click="downLoadFileGlobal(item)">{{ item.originalFilename }}</span>
                <span v-else class="fj-title" @click="downLoadFileGlobal(item)">{{ item.originalFilename }}</span>
              </span>
              <span class="upload-del">
                <span>{{ item.createdUserName }}</span>
                <span class="fj-date">{{ item.createdDate }}</span>
                <span v-if="editMode" class="fj-del"><i class="el-icon-close" @click="deleteFileCache(item, index)"></i></span>
                <span v-if="!editMode && item.createdUserId == userInfo.userid" class="fj-del"><i class="el-icon-close" @click="deleteFile(item, index)"></i></span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 查看流程弹框 -->
    <el-dialog
      class="lc-dialog"
      :visible.sync="showFlowDialog"
      width="50%"
      v-dialogDrag
      >
      <allFlow :pid="pid || $route.query.processId" :showAllFlow="showFlowDialog"></allFlow>
    </el-dialog>
    <!-- 微信群弹框 -->
    <wechatGroup :showWechatDialog = "showWechatDialog" @close="showWechatDialog = false"></wechatGroup>
    <!-- 意见箱弹框 -->
    <el-dialog
      class="yjx"
      title="意见箱"
      :visible.sync="showSuggestionDialog"
      width="450px"
      v-dialogDrag
      >
      <span class="yjx-title">问题描述（请针对本单进行描述）</span>
      <el-input v-model="suggestionContent" type="textarea" :rows="3"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSuggestionDialog = false">取 消</el-button>
        <el-button type="primary" @click="suggest">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 驳回弹框 -->
    <reject-dialog :showRejectDialog="showRejectDialog" :currApproveStepId="form.currApproveStepId" @confirm="rejectTo" @close="showRejectDialog = false"></reject-dialog>
     <!-- 推送退回 -->
    <push-back-dialog :showPushBackDialog="showPushBackDialog" @confirm="pushBackSucc" @close="showPushBackDialog = false"></push-back-dialog>
    <!-- 延期申请 -->
    <delay :open="fastDelay" @close="closeDelay"></delay>
    <!-- 延期历史 -->
    <look-delay :open="fastLookDelay" @close="closeLookDelay"></look-delay>
    <!-- 问责 -->
    <accountable :open="fastAccountable" @close="closeAccountable"></accountable>
    <!-- 推送时输入意见 -->
    <el-dialog
      class="lc-dialog"
      title="推送意见录入"
      :visible.sync="showPushMsgDialog"
      width="450px"
      v-dialogDrag
      >
      <p></p>
      <el-input v-model="pushMsg" type="textarea" :rows="3" placeholder="请输入推送意见"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addApprovePush">确 定</el-button>
        <el-button @click="showPushMsgDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 延期时输入意见 -->
    <el-dialog
      class="lc-dialog"
      title="延期意见录入"
      :visible.sync="showDelayMsgDialog"
      width="450px"
      v-dialogDrag
      >
      <p></p>
      <el-input v-model="delayMsg" type="textarea" :rows="3" placeholder="请输入"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doDelayFlow">确 定</el-button>
        <el-button @click="showDelayMsgDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
// import templateDemo from './demo/demo';
import electronicSignature from './components/electronicSignature'
import templateDemo from './publicSheet/sybyykfybxd';
import moduleTree from '@/apis/apis/tree';
import reference from '@/apis/apis/reference';
import file from '@/apis/apis/file';
import approval from '@/apis/apis/approval';
import remind from './components/remind';
import flow from './components/flow';
import allFlow from './components/allFlow';
import history from './components/history';
import delay from './components/delay';
import lookDelay from './components/lookDelay';
import delayBox from './components/delayBox';
import wechatGroup from './components/wechatGroup';
import rejectDialog from './components/reject';
import pushBackDialog from './components/pushBack';
import accountable from './components/accountable';
import spSearchUser from './components/spSearchUser';
import xshtfj from './components/xshtfj';
import signature from './components/signature';
import { mapState, mapMutations } from 'vuex';
import Vue from 'vue';
import $ from 'jquery';
import html2canvas from 'html2canvas';
import { get } from '../../apis/interceptor';

export default {
  name: 'Detail',
  props: ['pid','ptext','templateContentId','breadStr'],
  components: {templateDemo,remind,flow,allFlow,history,delay,lookDelay,delayBox,wechatGroup,rejectDialog,pushBackDialog,accountable,spSearchUser,xshtfj,signature,electronicSignature},
  data() {
    return {
      tempMode: false, // 编译模板模式
      templateData: null, // 模板数据
      psv: {}, //按钮权限及可编辑字段
      printInfo: null, // 打印人信息
      bizId: '', // 提供给上传用的实体id
      isPush: false, //是否是推送
      showTest: false,
      isLedgerShow: '', // 是否可导入台账
      stepList: [],
      nowStep: {},
      showSpSearchUser: false,
      showPre: false,
      CName: '',
      formForEdit: {
        bizEntityJson: {
          fileId: ''
        },
        userId: '',
        enterpriseId: 1,
        approvalId: 0,
        deptId: '',
        mode: "A",
        processId: this.pid,
        status: "A",
        userName: ''
      },
      form: {},
      entity: {},
      editForm: {
        bizEntityJson: {}
      },
      pmApprove: {},
      approveRemark: '',
      content: '', //留言内容,
      replayContent: '',//回复内容
      repalyQuery: {},//回复参数
      shareContent: '',
      messageList: [], //留言列表
      userList: [], //共享留言接收人数组
      suggestionContent: '', //意见箱内容
      pushShare: false,
      showSearchUser: false,
      showShareDialog: false,
      showHistoryDialog: false,
      showFlowDialog: false,
      showReplayDialog: false,
      showReplayDialogZ: false,
      showSuggestionDialog: false,
      showWechatDialog: false,
      showUploadDialog: false,
      showSignatureDialog: false,
      waitSignatureList: [], // 待上传签字
      otherFjUrl: window.location.href.search(/8066/) != -1 ? 'api/file/uploadFile' : process.env.VUE_APP_URL + '/api/file/uploadFile', // 其他附件地址
      uploadFiles: [], // 其他附件
      allUploadFiles: [], // 全部附件
      uploadFilesIMG: [], // 附件预览
      waitUploadList: [], // 待上传附件列表
      waitShowList: [], // 待显示附件
      isUploading: false,
      showRejectDialog: false,
      showPushBackDialog: false,
      rejectStepId: '',
      shareList: [], //分享列表
      pushCheckedList: [], //已推送人员列表
      shareCheckedList: [], //已共享人员列表
      showPushMsgDialog: false,
      showDelayMsgDialog: false,
      pushMsg: '', //推送时输入意见
      delayMsg: '', //延期时输入意见
      approveOptionCd: '', //延期同意/拒绝
      fastDelay: false,
      fastLookDelay: false,
      fastAccountable: false,
      otherFileId: '', //新建表单时其他附件id集合
      signFileId: '', //新建表单时总裁签字id集合
      signFiles: [], //总裁签字文件集合
      loading: true,
      formPath: '',
      formTitle: '',
      printTitle: '',
      xshtFjList: [], // 销售合同表附件列表
      approveStepId: ''
    }
  },
  computed: {
    ...mapState(['userInfo', 'menuTreeItem']),
    editMode() {
      return this.$route.query.type
    }
  },
  filters: {
    filterStatus(val) {
      if(!val) return '新增';
      const param = {N: '新增',A: '审批中',B: '驳回',D: '完成',C: '作废'}
      return param[val];
    },
    computedTime(val) {
      if(!val) return;
      const time = new Date(val.replace(/-/g, '/')).valueOf();
      const now = Date.now();
      let computedTime = now - time;
      const desc = computedTime < 0 ? '剩余' : '已过期';
      let second = Math.abs(computedTime) / 1000;
      var day = 0;
      var hour = 0;
      var minute = 0;
      minute = Math.floor(second / (60))
      if (parseInt(minute) > 60) {
        hour = parseInt(minute / 60);
        minute %= 60; //算出有多分钟
      }
      if (parseInt(hour) >= 24) {
        day = parseInt(hour / 24);
        hour %= 24; //算出有多分钟
      }
      const daydesc = day > 0 ? day + '天' : '';
      const hourdesc = hour > 0 ? hour + '小时' : '';
      const minudesc = minute > 0 ? minute + '分钟' : '';
      return `${desc}: ${daydesc}${hourdesc}${minudesc}`
    }
  },
  created() {
    this.resetInfo();
    this.getDetail();
    this.pushFindUserByApproveId();
    this.shareFindUserByApproveId();
    this.getMessages();
    this.getOtherFileDetail();
  },
  mounted() {
    window.onunload = () => {
      console.log('刷新 || 退出了')
    }
    console.log(window.frames.length, parent.frames.length)
    console.log(self != top)
    console.log(this.$route.query.type)
  },
  methods: {
    pushBackSucc() {
      this.showPushBackDialog = false;
      this.psv.pushBackBtnFlg = false;
      this.pushFindUserByApproveId();
    },
     // 公共校验方法
    validateDom() {
      let result = false;
      let requires = document.getElementById("tempComponent");
      requires.classList.add('submit-validate-dom');
      const notValiDoms = requires.querySelectorAll('.novalue');
      if(notValiDoms.length > 0) {
        result = true;
        // 视图滚动到首个校验不通过元素
        const element = notValiDoms[0];
        var realTop = element.offsetTop;
        var parent = element.offsetParent;
        while (parent !== null) {
          realTop += parent.offsetTop;
          parent = parent.offsetParent;
        }
        const elMain = document.querySelector('.el-main');
        elMain.scrollTop = realTop - 50;
      }
      console.log(result,7777)
      return result;
    },
     // 公共审批时可编辑校验方法
    doStepValidateDom() {
      let result = false;
      let requires = document.getElementById("tempComponent");
      requires.classList.add('dostep-validate-dom');
      const notValiDoms = requires.querySelectorAll('.novalue-dostep');
      if(notValiDoms.length > 0) {
        result = true;
        // 视图滚动到首个校验不通过元素
        const element = notValiDoms[0];
        var realTop = element.offsetTop;
        var parent = element.offsetParent;
        while (parent !== null) {
          realTop += parent.offsetTop;
          parent = parent.offsetParent;
        }
        const elMain = document.querySelector('.el-main');
        elMain.scrollTop = realTop - 50;
      }
      return result;
    },
    // 处理dom以在disable状态时不可编辑
    handleDomDetail() {
      if(!this.editForm.bizEntityJson || !this.editForm.bizEntityJson.disabled) {
        return;
      }
      this.handleDom();
    },
    handleDom() {
      this.$nextTick(() => {
        let dom = document.getElementById("tempComponent");
        let inputs = dom.querySelectorAll('input');
        let textarea = dom.querySelectorAll('textarea');
        let checkbox = dom.querySelectorAll('label');
        // 循环input添加readonly，disabled属性
        inputs.forEach(el => {
          // 有预控会计节点输入框可输入
          if (el.getAttribute('yykReadonly')) return
          // 有预控会计节点复选框可选中
          if (el.getAttribute('name') == 'yykReadonly') return
          // 上传文件掠过
           if (el.getAttribute('name') == 'fileName') return
          el.setAttribute('readonly', 'readonly')
          // 有预控审批中输入框可获取焦点
          if (el.getAttribute('yykDisabled')) return
          el.setAttribute('disabled', 'disabled')
          el.onclick=function(event){
            if(event && event.preventDefault){
              event.preventDefault();
            }else{
              window.event.returnValue = false;//注意加window
            }
          }
        })
        // 循环textarea添加readonly，disabled属性
        textarea.forEach(el => {
          el.setAttribute('readonly', 'readonly')
          el.setAttribute('disabled', 'disabled')
        })
      })
    },
    handleDomEdit() {
      this.$nextTick(() => {
        let dom = document.getElementById("tempComponent");
        let inputs = dom.querySelectorAll('input');
        let textarea = dom.querySelectorAll('textarea');
        inputs.forEach(el => {
          if (el.getAttribute('filterdom')) return
          el.removeAttribute('readonly')
          el.removeAttribute('disabled')
          el.onclick=function(e){}
        })
        textarea.forEach(el => {
          el.removeAttribute('readonly')
        })
      })
    },
    // 通过后台跳转时重置用户信息
    resetInfo() {
      let info = this.$route.query.info;
      if(info) {
        info = JSON.parse(info);
        this.saveUserInfo(info)
      }
    },
    ...mapMutations(['saveUserInfo', 'saveApproveDetail']),
    // 获取全部附件列表
    async getAllFileDetail() {
      let approveId
      if (this.$route.query.id) {
        approveId = this.$route.query.id;
      }
      if (this.form.approveId) {
        approveId = this.form.approveId;
      }
      console.log(approveId)
      if(!approveId) return;
      await file.getAllFileDetail({approveId: approveId}).then(res => {
        if(res.code == 1){
          this.allUploadFiles = []
          this.uploadFilesIMG = []
          if (res.data && res.data.length > 0) {
            this.allUploadFiles = res.data
            res.data.forEach(item => {
              if (/(png|jpg|jpeg|gif|bmp)/i.test(item.contentType)) {
                this.uploadFilesIMG.push(item)
              }
            })
          }
        } else {
          this.$message.error(res.message)
        }
      });
      this.getSignFile();
    },
    // 获取总裁签字附件接口
    async getSignFile() {
      let approveId
      if (this.$route.query.id) {
        approveId = this.$route.query.id;
      }
      if (this.form.approveId) {
        approveId = this.form.approveId;
      }
      console.log(approveId)
      if(!approveId) return;
      await file.getSignFile(approveId).then(res => {
        if(res.code == 1){
          if (res.data && res.data.length > 0) {
            res.data.forEach(item => {
              if (/(png|jpg|jpeg|gif|bmp)/i.test(item.contentType)) {
                this.uploadFilesIMG.push(item)
              }
            })
            // 取总裁签字最后一项
            this.signFiles = [res.data[res.data.length - 1]];
          }
        } else {
          this.$message.error(res.message)
        }
      });
    },
    // 获取销售合同对应附件
    async loadResAttachList() {
      const scContractId = this.formForEdit.bizEntityJson.contractTempletInfoId || this.editForm.bizEntityJson.contractTempletInfoId;
      if(!scContractId) return;
      await approval.loadResAttachList(scContractId).then(res => {
        if(res.code == 1){
          this.xshtFjList = res.data || [];
          this.xshtFjList = this.xshtFjList.filter(e => e.url != '')
        } else {
          this.$message.error(res.message || '获取销售合同附件错误，请稍后重试')
        }
      });
    },
    // 获取其他附件列表
    async getOtherFileDetail() {
      const approveId = this.$route.query.id;
      if(!approveId) return;
      await file.getOtherFileDetail(approveId).then(res => {
        if(res.code == 1){
          this.uploadFiles = []
          if (res.data && res.data.length > 0) {
            this.uploadFiles = res.data
          }
        } else {
          this.$message.error(res.message)
        }
      });
      this.getAllFileDetail();
      this.isUploading = false
    },
    // 上会
    startMeeting() {
      this.$confirm(`确认发起决策会？`,{center: true,}).then(() => {
        const param = {
          approveId:this.$route.query.id,
          approveUserId:this.userInfo.userid,
          approveRemark: this.approveRemark
        }
        approval.startMeeting(param).then(res => {
          if (res.code == 1) {
            this.$message.closeAll()
            this.$message.success('发起决策会成功')
            this.back(this.$route.query.id)
          } else {
            if(res.message) {
              this.$message.closeAll()
              this.$message.error(res.message)
            }
          }
        })
      }).catch(err => console.log(err));
    },
    // 下载其他附件方法
    downloadFile(file) {
      if(file.showUrl) {
        window.open(file.showUrl, '_blank');
        return;
      }
      const fileIds = file.response.data.fileId;
      this.$file.loadFiles({fileIds}).then(res => {
        if(res.code ==1 && res.data) {
          const showUrl = res.data.fileShowVoList[0].showUrl;
          window.open(showUrl, '_blank');
        }
      })
    },
    // 新建表单删除其他附件
    deleteFileCache(item, index) {
      this.uploadFiles.splice(index, 1)
      let nowfile = item.response.data.fileId
      let fileId = this.otherFileId
      this.otherFileId = fileId.replace(nowfile, '')
    },
    // 删除其他附件方法
    deleteFile(f,index) {
      let id;
      if(f.showUrl) {
        id = f.showUrl.split('show/')[1];
      } else {
        id = f.response.data.fileId;
      }
      this.$confirm(`您确定删除吗？`,{type: 'warning'}).then(() => {
        file.deleteFile({bizId:this.bizId,fileId: id}).then(res => {
          if(res.code == 1) {
            this.$message.closeAll()
            this.$message.success('删除成功');
            this.getOtherFileDetail()
            this.uploadFiles.splice(index,1);
            this.formForEdit.bizEntityJson.fileId = this.formForEdit.bizEntityJson.fileId.replace(id + ',','');
          } else {
            if(res.message) {
              this.$message.closeAll()
              this.$message.error(res.message)
            }
          }
      })
      }).catch(err => console.log(err));
    },
    // 其他附件上传成功后回调
    handleUploadSuccess(res,file) {
      if (res.code == 403) {
        this.$router.push({ name: 'login' })
        this.$message.error('登录已失效，请重新登录')
        return
      }
      if (res.code != 1 && res.code != 403) {
        this.isUploading = false
        this.$message.error('仅支持.jpg, .gif, .png, .bmp, .pdf, .docx, .doc, .docx, .jpeg, .ppt, .xlsx, .xls, .txt, .zip, .html格式文件')
        return
      }
      const fileId = res.data.fileId;
      // 编辑态的情况下需要将上传文件赋值
      if (this.editMode) {
        this.otherFileId += fileId
        this.uploadFiles.push(file)
        this.uploadFiles[this.uploadFiles.length - 1].originalFilename = file.name
        this.uploadFiles[this.uploadFiles.length - 1].createdDate = new Date().format('yyyy-MM-dd')
        this.uploadFiles[this.uploadFiles.length - 1].createdUserName = this.userInfo.username
        this.isUploading = false
      }
    },
    // 上传数据变化时回调
    handleChange(file, fileList) {
      if (file.status == 'ready') {
        this.waitUploadList = fileList
      }
      if (fileList[fileList.length - 1].status == 'success') {
        if (this.editMode) {
          setTimeout(() => {
            this.$refs.upload.clearFiles()
          }, 500)
        } else {
          this.$refs.upload.clearFiles()
        }
        setTimeout(() => {
          this.getOtherFileDetail()
        }, 500)
        if (this.form.approveId) {
          setTimeout(() => {
            this.getAllFileDetail()
          }, 500)
        }
        // if (this.editMode) {
        //   this.uploadFiles = fileList
        //   this.uploadFiles.forEach(item => {
        //     item.originalFilename = item.name
        //     item.createdDate = new Date().format('yyyy-MM-dd')
        //     item.createdUserName = this.userInfo.username
        //   })
        //   this.isUploading = false
        // }
      }
    },
    // 删除待上传附件
    deleteUploading(index) {
      this.$refs.upload.uploadFiles.splice(index, 1)
    },
    // 提交待上传附件
    submitUpload() {
      if (this.waitUploadList[0]) {
        this.isUploading = true
        this.$refs.upload.submit()
        // this.waitShowList = this.waitUploadList
        this.waitUploadList = []
      } else {
        this.$message.error('请选择需要上传的附件')
      }
    },
     // 总裁签字上传成功后回调
    handleSignSuccess(res,file) {
      if (res.code == 403) {
        this.$router.push({ name: 'login' })
        this.$message.error('登录已失效，请重新登录')
        return
      }
      if (res.code != 1 && res.code != 403) {
        this.$message.error('仅支持.jpg, .gif, .png, .bmp, .pdf, .docx, .doc, .docx, .jpeg, .ppt, .xlsx, .xls, .txt, .zip, .html格式文件')
        return
      }
      const fileId = res.data.fileId;
      // 编辑态的情况下需要将上传文件赋值
      if (this.editMode) {
        this.signFileId += fileId
        this.isUploading = false
      }
      this.getSignFile();
    },
    // 总裁签字上传变化时回调
    handleSignChange(file, fileList) {
      if (file.status == 'ready') {
        this.waitSignatureList = [file]
      }
      if (fileList[fileList.length - 1].status == 'success') {
        if (this.editMode) {
          setTimeout(() => {
            this.$refs.upload.clearFiles()
          }, 500)
        } else {
          this.$refs.upload.clearFiles()
        }
        setTimeout(() => {
          // this.getOtherFileDetail()
          // 获取总裁签字文件
        }, 500)
        if (this.form.approveId) {
          setTimeout(() => {
            this.getAllFileDetail()
          }, 500)
        }
        this.showSignatureDialog = false;
      }
    },
    // 提交待上传总裁签字
    submitSign() {
      if (this.waitSignatureList[0]) {
        this.$refs.upload.submit()
        this.waitSignatureList = []
      } else {
        this.$message.error('请选择需要上传的附件')
      }
    },
    // 过滤审批历史已完成审批
    filterStepListDone() {
      if(!this.form.approveStepList) return [];
      return this.form.approveStepList.filter( e => {
        return e.approveOpinion && e.approveOpinion != '拒绝'
      })
    },
    print() {
      // console.log(this.$refs.printsss.outerHTML.class)
      // 先显示打印人的相关信息
      file.addApprovePrint({approveId:this.$route.query.id,printUserId: this.userInfo.userid,enterpriseId:this.userInfo.enterpriseId}).then(res => {
        if(res.code == 1) {
          this.printInfo = res.data
          this.$nextTick(() => {
            //    $('.no-print').hide()
            //    $('span').css({'font-size':'17px'})
            //    $('p').css({'font-size':'17px'})
            //    $('h2').css({'font-size':'17px'})
            //    $('.cell').css({'font-size':'17px'})
            //    $('.el-input').css({'font-size':'17px'})
            //    $('input').css({'font-size':'17px'})
            //    // $('textarea').css({'font-size':'17px'})
            //    // $('#print-form').css({'font-size':'19px'})
            //    setTimeout(()=>{
            //      // $('#print-form').css({'font-size':'14px'})
            //      $('span').css({'font-size':'14px'})
            //      $('p').css({'font-size':'14px'})
            //      $('h2').css({'font-size':'14px'})
            //      $('.cell').css({'font-size':'14px'})
            //      $('.el-input').css({'font-size':'14px'})
            //      $('input').css({'font-size':'14px'})
            //      $('.no-print').show()
            //    }, 1000)
            //     console.log(this.$refs.printForm,this.$refs.printForm.scrollHeight)
            //    // $('#app').html(
            //    html2canvas(this.$refs.printForm, {
            //      backgroundColor: 'white',
            //      useCORS: true, //支持图片跨域
            //      scale: 3, //设置放大的倍数
            //      dpi: 1700,
            //      height: this.$refs.printForm.scrollHeight,
            //      windowHeight: this.$refs.printForm.scrollHeight
            //    }).then((canvas) => {
            //      let dataURL = canvas.toDataURL('image/png')
            //      var newImg = document.createElement('img')
            //      newImg.src = dataURL
            //      var printWindow = window.open(newImg.src)
            //      // if (this.$refs.printForm.scrollHeight >= 1754) {
            //        printWindow.document.write('<img style="width: 100%;" src="'+newImg.src+'" />')
            //      // } else {
            //      //   printWindow.document.write('<img style="width: 100%;height: 1048px;" src="'+newImg.src+'" />')	
            //      // }
            //      setTimeout(()=>{
            //        printWindow.print()
            //        printWindow.close()
            //      }, 100)
            //    })
      
            // console.log($("input"))
            // $("input").each(function(e){
            //    console.log($(this).attr("type"))
            // })
            // return
            // $(".el-table__header").css("width","auto")
            // $(".el-table__body").css("width","auto")
		 
            this.$print(this.$refs.printForm) // 调用打印方法
            // printJS({printable: 'print-form', type: 'html', targetStyles: ['*'] })
          })
        }
      })
    },
    recall(type) {
      // 追回
      const obj = {1: '撤回',2: '追回完成',3:'追回',4:'追回驳回'};
      const msg = obj[type];
      this.$confirm(`确认要${msg}吗？`,{type: 'warning'}).then(() => {
        const param = {
          userId: this.userInfo.userid,
          userName: this.userInfo.username,
          approveStepId: this.form.approveStepId,
          retrieveType: type,
          approveId: this.$route.query.id
        }
        approval.doRetrieve(param).then(res => {
          if(res.code == 1 && res.message == 'success'){
            this.$message.closeAll()
            this.$message.success(`${msg}成功`);
            this.back(this.$route.query.id)
          } else {
            this.$message.error(res.message || '系统异常，请稍后重试'); 
          }
        });
      }).catch(err => console.log(err));
    },
    checkApproveUser(v) {
      this.nowStep = v;
      console.log(v)
      this.showSpSearchUser = true;
    },
    closeSpSearhUser(val) {
      this.showSpSearchUser = false
      console.log(val)
      if (val) {
        if (this.nowStep.mutiFlg) {
          // 多选人员回传
          this.nowStep.approveUserId = val.map(e => e.userCd).join('|')
          this.nowStep.approveUserName = val.map(e => e.userName).join('|')
          this.nowStep.approvePositionName = val.map(e => e.positionName).join('|')
        } else {
          // 单选人员回传
          this.nowStep.approveUserId = '|' + val.userCd + '|'
          this.nowStep.approveUserName = val.userName
        }
        if (this.nowStep.nodeCode == '180') {
          approval.getAutoLoadCenterManager(this.nowStep.approveUserId).then(res => {
            if(res.code == 1 && res.message == 'success'){
              if (this.nowStep.mutiFlg) {
                this.nowStep.approveUserId = res.data.map(e => e.userCd).join('|')
                this.nowStep.approveUserName = res.data.map(e => e.userName).join('|')
                this.nowStep.approvePositionName = res.data.map(e => e.positionName).join('|')
              } else {
                this.nowStep.approveUserId = '|' + res.data.userCd + '|'
                this.nowStep.approveUserName = res.data.userName
              }
            } else {
              this.$message.error(res.message || '系统异常，请稍后重试')
            }
          })
        }
      }
    },
     // 发起
    async save() {
      const valiList = this.stepList.filter(e => e.displayNumber);
      const flag = valiList.every(e => e.approveUserName);
      // 只校验一级审批人必填
      if(!flag) {
        this.$message.closeAll()
        this.$message.error('各审批步骤的对应审批人不能为空，请先选择审批人');
        return;
      }
      let bizEntityJson;
      if(this.editMode) {
        const form = JSON.parse(JSON.stringify(this.formForEdit));
        bizEntityJson = JSON.stringify(form.bizEntityJson);
      } else {
        let form = this.editForm;
        bizEntityJson = JSON.stringify(form.bizEntityJson);
      }

      const param = {
        enterpriseId: this.userInfo.enterpriseId,
        bizEntityJson,
        processId: this.pid || this.$route.query.processId || this.menuTreeItem.id,
        templateContentId: this.form.templateContentId || this.templateContentId || this.$route.query.templateContentId || this.menuTreeItem.attributes.templateContentPcId,
        userId: this.userInfo.userid,
        userName: this.userInfo.username,
        approveId: this.form.approveId || this.$route.query.id,
        status: "A",
        stepList: this.stepList,
        mode: 'A',
        otherFileId: this.otherFileId,
        signFileId: this.signFileId
      }
      await approval.startFlow(param).then(res => {
        if(res.code == 1 && res.message == 'success'){
          this.$message.closeAll()
          this.$message.success('发起成功');
          this.back(3)
          // if (this.$route.query.id) {
          //   this.back(3)
          // } else {
          //   this.back(2)
          // }
        } else {
          if(res.message) {
            this.$message.closeAll()
            this.$message.error(res.message); 
          }
        }
      });
    },
    // 保存并获取审批人
    async preSave(draft) {
      let vli = false;
      if(!draft) {
        vli = this.validateDom();
      }
      if(vli) {
        return;
      }
      // 审批单修复数据函数支持存草稿时使用
      let repairData;
      if (this.$refs.tempComponent.repairData) {
        repairData = this.$refs.tempComponent.repairData();
      }
      if(repairData === false) {
        return;
      }
      // 审批单发起前数据操作
      let valiResult;
      if(this.$refs.tempComponent.validate && !draft) {
        valiResult = this.$refs.tempComponent.validate();
      }
      if(valiResult === false) {
        return;
      }
      // 审批单发起前接口校验
      let yykCheck;
      if(this.$refs.tempComponent.yykCheck && !draft) {
        yykCheck = await this.$refs.tempComponent.yykCheck();
      }
      if(yykCheck === false) {
        return;
      }
      let bizEntityJson;
      if(this.editMode) {
        const form = JSON.parse(JSON.stringify(this.formForEdit));
        bizEntityJson = JSON.stringify(form.bizEntityJson);
      } else {
        let form = this.editForm;
        bizEntityJson = JSON.stringify(form.bizEntityJson);
      }

      const param = {
        enterpriseId: this.userInfo.enterpriseId,
        bizEntityJson,
        processId: this.pid || this.$route.query.processId || this.menuTreeItem.id,
        templateContentId: this.form.templateContentId || this.templateContentId || this.$route.query.templateContentId || this.menuTreeItem.attributes.templateContentPcId,
        userId: this.userInfo.userid,
        userName: this.userInfo.username,
        approveId: this.$route.query.id || this.form.approveId,
        otherFileId: this.otherFileId,
        signFileId: this.signFileId,
        mode: draft ? 'S' : '',
      }
      approval.getProcessStepByProcessId(param).then(res => {
        if(res.code == 1 && res.message == 'success'){
					this.$refs.signature.sendContractsSync()
          if(draft) {
            this.$message.closeAll()
            this.$message.success('草稿保存成功');
            if (draft == 'draftDetail') {
              this.back(3)
            } else {
              this.back(2)
            }
            return;
          }
          this.stepList = res.data.stepVoList;
          this.form.approveId = res.data.approveId;
          this.pmApprove.approveNo = res.data.pmApprove.approveNo;
          this.bizId = res.data.pmApprove.bizId;
          this.showPre = true;
          this.$store.state.showPre = true;
          this.getAllFileDetail();
          if(!this.editMode) {
            this.$set(this.editForm.bizEntityJson,'disabled', true)
          } else {
            this.$set(this.formForEdit.bizEntityJson,'disabled', true)
          }
          this.handleDom();
        } else {
          this.$message.error(res.message || '系统错误,请稍后重试'); 
        }
      });
    },
    edit() {
      if(!this.editMode) {
        this.$set(this.editForm.bizEntityJson,'disabled', false)
      } else {
        this.$set(this.formForEdit.bizEntityJson,'disabled', false)
      }
      this.handleDomEdit();
      this.showPre = false;
      this.$store.state.showPre = false;
      this.loadResAttachList();
    },
    addCooperationFlg(val, index) {
      let newData = {
        stepName: '合作项目附加节点',
        processStepId: val.processStepId,
        approveUserName: '',
        approveUserId: '',
        cooperationFlg: true,
        mutiFlg: true
      }
      this.stepList.splice(index, 0, newData)
    },
    removeCooperationFlg(index) {
      this.stepList.splice(index, 1)
    },
    // 获取审批单模板
    async getTemplateContentText() {
      const param = !this.editMode ? {
        approveId: this.$route.query.id,
        processId: this.pid || this.$route.query.processId || this.menuTreeItem.id,
      } : {
        templateContentId: this.$route.query.templateContentId || this.templateContentId || this.menuTreeItem.attributes.templateContentPcId,
        processId: this.pid || this.$route.query.processId || this.menuTreeItem.id,
      }
      await approval.getTemplateContentText(param).then(res => {
        if(res.code == 1 && res.data){
          const fileIds = res.data.entity && res.data.entity.fileId || null;
          let fileList = [];
          // 未拆分
          // const template = res.data.templateContent.content.split('%%%')[0];
          // let comp = res.data.templateContent.content.split('%%%')[1];
          // 已拆分
          const template = res.data.templateContent.content;
          let comp = res.data.templateContent.contentJs;
          if(!comp) {
            this.showTest = false;
            this.loading = false;
            this.$message.error('表单模板配置错误，请检查后台模板配置')
            return;
          }
          let newPathArr = res.data.modulePath.split('/')
          newPathArr.pop()
          this.formPath = newPathArr.join('/');
          this.formTitle = res.data.processName;
          this.printTitle = res.data.displayName;
          comp = eval('(' + comp + ')');
          const uploadBaseUrl = window.location.href.search(/8066/) != -1 ? '' : process.env.VUE_APP_URL + '/';
          console.log(uploadBaseUrl,'baseUrl')
          const uploadUrl = uploadBaseUrl + 'api/file/uploadFile'
          const CName = 'test';
          this.CName = CName;
          if(!this.editMode) {
            this.bizId = this.pmApprove.bizId;
            this.editForm = {
              bizEntityJson: this.form.entity,
              mapEdit: this.psv.mapEdit,
              status: this.pmApprove.status,
              userInfo: this.userInfo,
              pid: this.pid,
              bizId: this.pmApprove.bizId,
              allEntityFileIds: this.form.allEntityFileIds,
              MYAuthorization: this.form.MYAuthorization,
              psv: this.psv,
              pmApprove: this.pmApprove,
              isLedgerShow: '', // 导入台账状态
              currNodeCd: this.form.currNodeCd // 当前审批节点cd
            };
            if(!this.psv.canApplyFlg) {
              this.$set(this.editForm.bizEntityJson,'disabled', true)
            }
          }
          const data = this.editMode ? {...this.formForEdit, userInfo: this.userInfo, pid: this.pid, mapEdit: {}, bizId: 0, allEntityFileIds: {}} : this.editForm;
          this.templateData = data;
          Vue.component(CName,comp);
          if (!this.tempMode) {
            this.$nextTick(() => {
              let dom = document.getElementById("tempComponent");
              let inputs = dom.querySelectorAll('input');
              // 循环input对readonly，disabled属性的输入框增加class
              inputs.forEach(el => {
                if (el.getAttribute('readonly') || el.getAttribute('disabled')) {
                  el.setAttribute('filterDom', 'filterDom')
                }
              })
            })
          }
          this.loadResAttachList();
          if (this.pmApprove.status == '完成' && this.psv.existImportFlg) {
            this.getLedgerStatus();
          }
          this.showTest = true;
          this.loading = false;
        } else {
          this.$message.error(res.message || '系统异常,请稍后重试');
          this.loading = false;
        }
      }).catch(err => {this.$message.error('系统异常,请稍后重试');this.loading = false;});
    },
    dealDel() {
      this.$confirm(`确认要删除吗？`,{type: 'warning'}).then(() => {
        const params = this.$route.query.id || this.form.approveId;
        approval.deleteApproveById(params).then(res => {
          if(res.code == 1 && res.message == 'success'){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.back(this.$route.query.id)
          }
        })

      }).catch(err => console.log(err));
    },
    showRepDialog(i) {
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
      this.showReplayDialog = true;
    },
    showRepDialogZ(item) {
      this.showReplayDialog = true
      this.showReplayDialogZ = true
      this.approveStepId = item.approveStepId
    },
    closeSearhUser(val) {
      this.showSearchUser = false;
      if(val && val.length > 0) {
        this.userList = val.map(e => e.userCd);
        if(!this.isPush) {
          this.showShareDialog = true;
          return
        }
        this.isPush = false;
        this.showPushMsgDialog = true;
        // this.addApprovePush();
      }
    },
    async addApprovePush() {
      if(!this.pushMsg) {
        this.$message.closeAll()
        this.$message.error('请输入推送意见');
        return;
      }
      const param = {
        pushUserIdList: this.userList,
        createdUserId: this.userInfo.userid,
        enterpriseId: this.userInfo.enterpriseId,
        approveId: this.$route.query.id,
        pushMsg: this.pushMsg
      }
      await approval.addApprovePush(param).then(res => {
        if(res.code == 1 && res.message == 'success'){
          this.$message.closeAll()
          this.$message.success('推送成功');
          this.pushMsg = '';
          this.showPushMsgDialog = false;
          this.pushFindUserByApproveId();
        } else {
          if(res.message) {
            this.$message.closeAll()
            this.$message.error(res.message);
          }
        }
      });
    },
    async share() {
      if(!this.shareContent) {
        this.$message.closeAll()
        this.$message.error('请先填写留言');
        return;
      }
      const param = {
        content: this.shareContent,
        createdUserCd: this.userInfo.userid,
        approveId: this.$route.query.id,
        msgType: 'S',
        userList: this.userList,
        currApproveStepId: this.form.currApproveStepId
      }
      await approval.saveApproveMessage(param).then(res => {
        if(res.code == 1 && res.message == 'success'){
          this.$message.closeAll()
          this.$message.success('共享成功');
          this.shareContent = '';
          this.showShareDialog = false;
          this.shareFindUserByApproveId();
          this.getDetail();
        } else {
          if(res.message) {
            this.$message.closeAll()
            this.$message.error(res.message);
          }
        }
      });
    },
    async suggest() {
      if(!this.suggestionContent) {
        this.$message.closeAll()
        this.$message.error('请先填写意见');
        return;
      }
      const param = {
        enterpriseId: this.userInfo.enterpriseId,
        message: this.suggestionContent,
        resApproveInfoId: this.$route.query.id
      }
      await approval.suggesTionBox(param).then(res => {
        if(res.code == 1 && res.message == 'success'){
          this.$message.closeAll()
          this.$message.success('发送意见成功');
          this.suggestionContent = '';
          this.showSuggestionDialog = false;
        } else {
          this.$message.error(res.message || '系统异常,请稍后重试');
        }
      }).catch(err => this.$message.error(err.message || '系统异常，请稍后重试'));
    },
    back(num) {
      // if(this.$route.query.source || !this.editMode) {
      //   window.close();
      //   return;
      // }
      // this.$router.go(-1);
      // if (self != top) {
      //   // iframe环境
      //   if (num == 1) {
      //     // 普通返回
      //     window.parent.postMessage({type: 'refresh'}, '*')
      //   } else if (num == 2) {
      //     // 新建存草稿返回
      //     window.parent.postMessage({type: 'add'}, '*')
      //   } else if (num == 3) {
      //     // 详情存草稿返回
      //     window.parent.postMessage({type: 'draftDetail', id: this.$route.query.id}, '*')
      //   } else {
      //     // 操作返回
      //     window.parent.postMessage({type: 'done', id: num}, '*')
      //   }
      // } else {
        // 浏览器标签页
        if (num == 1) {
          // 普通返回
          window.close()
        } else if (num == 2) {
          // 无id存草稿
          window.close()
        } else if (num == 3) {
          // 发起或带id存草稿返回到我的待办
          if (window.opener) window.opener.postMessage({type: 'upcoming'}, '*')
          window.close()
        } else {
          // 操作返回，老网批列表删除该条数据
          if (window.opener) window.opener.postMessage({type: 'done', id: num}, '*')
          window.close()
        }
      // }
      console.log(num, this.$route.query.type)
    },
    refreshList(id) {
      // if(window.opener) {
      //   const obj = id ? {type: 'done', id} : {type: 'refresh'};
      //   window.opener.postMessage(obj, '*');
      // }
      const obj = id ? {type: 'done', id} : {type: 'refresh'};
      window.parent.postMessage(obj, '*');
      console.log('返回')
    },
    // 获取其他附件 
    getFj(fileIds) {
       file.loadFiles({fileIds}).then(res => {
        if(res.code == 1 && res.data) {
          let fileList = res.data.fileShowVoList;
          fileList.forEach(e => {
            e.name = e.originalFilename;
          })
          this.uploadFiles = fileList;
        }
      }).catch(err => console.log(err))
    },
    // 获取审批详情
    async getDetail() {
      if(this.editMode) {
        this.getTemplateContentText();
        return;
      }
      const param = {
        userId: this.userInfo.userid,
        approveId: this.$route.query.id
      }
      await approval.getApproveDetail(param).then(res => {
        this.saveApproveDetail(res.data);
        if(res.code == 1 && res.data){
          this.form = res.data;
          this.entity = res.data.entity;
          this.pmApprove = res.data.pmApprove;
          this.psv = res.data.psv;
          this.getTemplateContentText();
          // 新标签页赋值title
          document.title = this.pmApprove.processName || this.form.pmApprove.processName
        } else {
          this.$message.error(res.message || '系统异常，请稍后重试')
          this.loading = false;
        }
      }).catch(err => {this.$message.error(err.message || '系统异常，请稍后重试');this.loading = false;});
    },
    // 查询已添加审批单推送人员
    async pushFindUserByApproveId() {
      const approveId = this.$route.query.id
      const enterpriseId = this.userInfo.enterpriseId
      if (approveId) {
        await approval.pushFindUserByApproveId({approveId, enterpriseId}).then(res => {
          if(res.code == 1){
            this.pushCheckedList = res.data || [];
          }
        }).catch(err => console.log(err));
      }
    },
    // 查询已添加审批单共享人员
    async shareFindUserByApproveId() {
      const param = {
        approveId: this.$route.query.id,
        enterpriseId: this.userInfo.enterpriseId,
        userId: this.userInfo.userid
      }
      if (param.approveId) {
        await approval.shareFindUserByApproveId(param).then(res => {
          if(res.code == 1 && res.data){
            this.shareCheckedList = res.data
          }
        }).catch(err => console.log(err));
      }
    },
    rejectTo(val) {
      this.rejectStepId = val.rejectStepId;
      this.doStepFlow('D');
    },
     // 执行审批步骤
    async doStepFlow(type) {
      // 审批中支持必填校验
      let approveCheck
      if (this.$refs.tempComponent.approveCheck) {
        approveCheck = this.$refs.tempComponent.approveCheck()
      }
      if(approveCheck === false) {
        return
      }
      let stopDoStep = false;
      if(this.psv.mapEdit && type == "A") {
        stopDoStep = this.doStepValidateDom();
      }
      if(stopDoStep) return;
      if(this.userInfo.userid == 'xujk' && this.psv.signatureFlg && this.signFiles.length == 0 && type == 'A') {
        this.$message.error('请上传总裁签字')
        return;
      }
      if(this.psv.mapEdit.letterattachment && type == 'A') {
        // 证照办理（设立、注销）节点校验
        if (!this.form.entity.letterattachment) return this.$message.error('请上传工商申请材料')
        if (!this.form.entity.companyNameNew) return this.$message.error('请输入公司名称')
      }
      if(this.psv.mapEdit.letterattachmentFile && type == 'A') {
        // 证照办理（信息变更，任职变更）节点校验
        if (!this.form.entity.letterattachmentFile) return this.$message.error('请上传工商申请材料')
      }
      if((type == 'A' || type == 'B') && !this.approveRemark) {
        this.$confirm(`您的意见为空，将默认填写${type == 'A' ?  '同意发起人意见' : '不同意'}，请问是否继续？`,{type: 'warning'}).then(() => {
          const param = {
            approveOpinion: type,
            approveId: this.$route.query.id,
            approveRemark: type == 'A' ? '同意发起人意见' : '不同意',
            approveUserId: this.userInfo.userid,
            approveUserName: this.userInfo.username,
            bizEntityJson: JSON.stringify(this.form.entity),
            approveStepId: this.form.currApproveStepId,
          }
          approval.doStepFlow(param).then(res => {
            if(res.code == 1 && res.message == 'success'){
              this.$message.closeAll()
              this.$message.success('审批已' + (type == 'A' ? '完成' : '不同意'));
              // this.getDetail();
              setTimeout(() => {
                this.back(this.$route.query.id)
              }, 500)
            } else {
              this.$message.closeAll()
              this.$message.error(res.message)
              if(res.code == 205) {
                setTimeout(() => {
                  this.back(this.$route.query.id)
                }, 500)
              }
            }
          });
        }).catch(err => console.log(err));
      } else if(type == 'D') {
        this.showRejectDialog = false;
        if(!this.approveRemark) {
          this.$confirm(`您的意见为空，将默认填写不同意，请问是否继续？`,{type: 'warning'}).then(() => {
            const param = {
              approveOpinion: type,
              approveId: this.$route.query.id,
              approveRemark: '不同意',
              approveUserId: this.userInfo.userid,
              approveUserName: this.userInfo.username,
              bizEntityJson: JSON.stringify(this.form.entity),
              denyApproveStepId: this.rejectStepId,
              approveStepId: this.form.currApproveStepId,
            }
            approval.doStepFlow(param).then(res => {
              if(res.code == 1 && res.message == 'success'){
                this.$message.closeAll()
                this.$message.success('审批已驳回');
                // this.getDetail();
                setTimeout(() => {
                  this.back(this.$route.query.id)
                }, 500)
              } else {
                this.$message.closeAll()
                this.$message.error(res.message);
                if(res.code == 205) {
                  setTimeout(() => {
                    this.back(2)
                  }, 500)
                }
              }
            });
          }).catch(err => console.log(err));
        } else {
          const param = {
            approveOpinion: type,
            approveId: this.$route.query.id,
            approveRemark: this.approveRemark,
            approveUserId: this.userInfo.userid,
            approveUserName: this.userInfo.username,
            bizEntityJson: JSON.stringify(this.form.entity),
            denyApproveStepId: this.rejectStepId,
            approveStepId: this.form.currApproveStepId,
          }
          approval.doStepFlow(param).then(res => {
            if(res.code == 1 && res.message == 'success'){
              this.$message.closeAll()
              this.$message.success('审批已驳回');
              // this.getDetail();
              setTimeout(() => {
                this.back(this.$route.query.id)
              }, 500)
            } else {
              this.$message.closeAll()
              this.$message.error(res.message);
              if(res.code == 205) {
                setTimeout(() => {
                  this.back(2)
                }, 500)
              }
            }
          });
        }
       
      } else  {
        const param = {
          approveOpinion: type,
          approveId: this.$route.query.id,
          approveRemark: this.approveRemark,
          approveUserId: this.userInfo.userid,
          approveUserName: this.userInfo.username,
          bizEntityJson: JSON.stringify(this.form.entity),
          approveStepId: this.form.currApproveStepId,
        }
        approval.doStepFlow(param).then(res => {
          if(res.code == 1 && res.message == 'success'){
            const obj = {A:'同意',B:'不同意',D:'驳回'}
            this.$message.closeAll()
            this.$message.success('审批已' + (obj[type]))
            // this.getDetail();
            setTimeout(() => {
              this.back(this.$route.query.id)
            }, 500)
          } else {
            this.$message.closeAll()
            this.$message.error(res.message)
            if(res.code == 205) {
              setTimeout(() => {
                this.back(this.$route.query.id)
              }, 500)
            }
          }
        });
      }
    },
    // 留言
    async message() {
      if(!this.content) {
        this.$message.closeAll()
        this.$message.error('请先填写留言');
        return;
      }
      const param = {
        content: this.content,
        createdUserCd: this.userInfo.userid,
        approveId: this.$route.query.id,
        msgType: 'N',
        currApproveStepId: this.form.currApproveStepId
      }
      await approval.saveApproveMessage(param).then(res => {
        if(res.code == 1 && res.message == 'success'){
          this.$message.closeAll()
          this.$message.success('留言成功');
          this.content = '';
          this.getMessages();
        } else {
          this.$message.closeAll()
          this.$message.error(res.message || '留言失败，请稍后重试');
        }
      });
    },
    // 回复、追加
    replay() {
      if(!this.replayContent) {
        this.$message.closeAll()
        this.$message.error(this.showReplayDialogZ ? '请先输入追加内容' : '请先输入回复内容');
        return;
      }
      if (this.showReplayDialogZ) {
        var query = {
          approveId: this.$route.query.id,
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
        if(res.code == 1 && res.message == 'success'){
          this.$message.closeAll()
          this.$message.success(this.showReplayDialogZ ? '追加成功' : '留言成功')
          this.showReplayDialog = false
          this.showReplayDialogZ = false
          this.replayContent = ''
          this.getDetail()
        } else {
          this.$message.closeAll()
          this.$message.error(res.message || '操作失败，请稍后重试')
        }
      })
    },
    // 获取留言列表
    async getMessages() {
      const approveId = this.$route.query.id;
      if(!approveId) return;
      const param = {
        approveId,
        msgType: 'N'
      }
      await approval.getApproveMessageList(param).then(res => {
        if(res.code == 1 && res.message == 'success'){
          this.messageList = res.data;
        } else {
          this.$message.closeAll()
          this.$message.error(res.message);
        }
      });
    },
    // 给我
    giveMe() {
      const param = {
        approveId: this.$route.query.id,
        approveUserId: this.userInfo.userid,
        approveUserName: this.userInfo.username,
      }
      this.$confirm(`点击确定将跳过所有流程直接到我，确定吗？`,{type: 'warning'}).then(() => {
        approval.giveMe(param).then(res => {
          if(res.code == 1 && res.message == 'success'){
            this.$message.closeAll()
            this.$message.success('操作成功');
            this.getDetail();
          } else {
            this.$message.closeAll()
            this.$message.error(res.message || '操作失败，请稍后重试');
          }
        })
      }).catch(err => console.log(err));
    },
    // 同意/拒绝延期申请
    submitDelay(res) {
      this.approveOptionCd = res
      this.showDelayMsgDialog = true
    },
    // 取消延期申请
    cancelDelay() {
      this.$confirm('确定取消延期申请吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          id: this.form.approveDelayId,
          approveOptionCd: 'C',
          approveUserId: this.userInfo.userid,
        }
        approval.doDelayFlow(param).then(res => {
          if(res.code == 1 && res.message == 'success'){
            this.$message.closeAll()
            this.$message.success('取消延期成功');
            this.getDetail();
          } else {
            if(res.message) {
              this.$message.closeAll()
              this.$message.error(res.message);
            }
          }
        })
      }).catch(() => {
      })
    },
    async doDelayFlow() {
      this.$message.closeAll()
      if(!this.delayMsg) return this.$message.error('请输入意见！')
      const param = {
        id: this.form.approveDelayId,
        approveOptionCd: this.approveOptionCd,
        approveUserId: this.userInfo.userid,
        approveRemark: this.delayMsg
      }
      await approval.doDelayFlow(param).then(res => {
        if(res.code == 1 && res.message == 'success'){
          this.$message.closeAll()
          this.$message.success('操作成功');
          this.showDelayMsgDialog = false;
          this.delayMsg = '';
          this.getDetail();
        } else {
          if(res.message) {
            this.$message.closeAll()
            this.$message.error(res.message);
          }
        }
      })
    },
    closeDelay(res) {
      this.fastDelay = res.fast;
      if(res.reload) {
        this.getDetail()
      }
    },
    closeLookDelay(res) {
      this.fastLookDelay = res.fast;
      if(res.reload) {
        this.getDetail()
      }
    },
    closeAccountable(res) {
      this.fastAccountable = res.fast;
      if(res.reload) {
        this.getDetail()
      }
    },
    // 台账
    Ledger() {
      this.$message.closeAll()
      if (this.isLedgerShow == 2) return this.$message.success('该表单已导入台账')
      if (this.isLedgerShow == 1 || this.isLedgerShow == 3) {
        const param = {
          pmApprove: this.form.pmApprove,
          pmApproveContent: this.form.approveHistoryList[this.form.approveHistoryList.length - 1],
          templateEntityStr: JSON.stringify(this.form.entity)
        }
        if ((this.form.pmApprove.processName.search(/有预控/) != -1) 
        || (this.form.pmApprove.processName.search(/无预控/) != -1)
        || (this.form.pmApprove.processName.search(/探亲费/) != -1)){
          approval.yykImport(param).then(res => {
            if(res.code == 200){
              this.$message.closeAll()
              if (res.data == 2) {
                this.$message.success('导入成功')
              } else if (res.data == 3) {
                this.$message.error('导入失败')
              } else {
                this.$message.success(res.message)
              }
            } else {
              if(res.message) {
                this.$message.closeAll()
                this.$message.error(res.message)
              }
            }
            this.getLedgerStatus()
          })
        } else {
          approval.importLedger(param).then(res => {
            if(res.code == 200){
              this.$message.closeAll()
              if (res.data == 2) {
                this.$message.success('导入成功')
              } else if (res.data == 3) {
                this.$message.error('导入失败')
              } else {
                this.$message.success(res.message)
              }
            } else {
              if(res.message) {
                this.$message.closeAll()
                this.$message.error(res.message)
              }
            }
            this.getLedgerStatus()
          })
        }
      }
    },
    // 导入台账是否成功 1待导入，2成功，3失败
    getLedgerStatus() {
      const param = {
        approveNo: this.form.pmApprove.approveNo
      }
      approval.getLedgerStatus(param).then(res => {
        if (res.code == 1) {
          if (!res.data) {
            // 未导入过台账
            this.isLedgerShow = 1
          } else {
            if (res.data == 2) {
              // 导入成功
              this.isLedgerShow = 2
            } else {
              // 导入失败
              this.isLedgerShow = 3
            }
          }
          this.editForm.isLedgerShow = this.isLedgerShow
          console.log(this.editForm)
        } else {
          if (res.message) {
            this.$message.error(res.message)
          }
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/common.scss';
.step-list {
  .step-group {
    display: inline;
    line-height: 30px;
    margin-left: 20px;
    color: #606266;
  }
}
.btn-box {
  .el-button {
    margin-left: 5px !important;
  }
}
.print-form.disabled {
  height: auto !important;
  overflow: visible !important;
  .sign-area {
    display: block !important;
  }
}
.print-form {
  .sign-area {
    display: none;
    .title {
      color: #676767;
    }
    .content {
      margin-top: 10px;
      height: 200px;
      border: 1px solid #BBBBBB;
      p {
        text-align: center;
        font-size: 20px;
        margin-top: 20px;
        color: #DBDBDB;
      }
      p:nth-child(1) {
        margin-top: 60px;
      }
    }
  }
}
.content-wrapper {
  padding: 0 20px;
}
.header-crumb {
  vertical-align: sub;
  font-size: 14px;
  color: #9B9B9B;
}
span{
  font-size: 14px;
}
.dialog-close-icon{
  right: 562px;
}
.con{
  >div{
    >h3{
      margin-bottom: 20px;
    }
    >.el-row{
      margin-bottom: 20px;
    }
  }
}
.amount {
  color: #A9A9A9;
  .mr-30 {
    margin-right: 30px;
  }
  .cb {
    color: #333;
    margin: 0 10px;
  }
}

.notprint-title {
  margin-bottom: 10px;
  color: red !important;
  .notprint-icon{
    display: inline-block;
    background: url('../../assets/images/notprint.png') no-repeat center top;
    background-size: auto 100%;
    background-origin: content-box;
    width: 16px;
    height: 16px;
    margin: 0 10px 0 0;
    vertical-align: middle;
    cursor: pointer;
  }
}
.red-color {
  color: red;
}
.gray-title {
  margin-bottom: 10px;
  color: #A9A9A9;
}
.btn-title {
  margin-bottom: 8px;
  cursor: pointer;
  color: #333;
}
.el-button--primary.is-plain:hover, .el-button--primary.is-plain:focus {
  color: #409EFF;
}
.message-list {
  border-bottom: 1px solid #BFC4C8;
  padding: 10px;
  p {
    line-height: 25px;
    color: #5a5a5a;
    span {
      color: #000;
    }
    .user {
      color: #5a5a5a;
      font-weight: 600;
    }
  }
}
.share-list {
  margin: 20px 0 20px 10px;
  p {
    line-height: 20px;
  }
  .name {
    color: #0167a2;
  }
  .replay {
    color: #0693e3;
    cursor: pointer;
  }
  .content {
    margin: 0 8px;
  }
  .content.color {
    color: #5a5a5a;
  }
}
// 附件展示样式
.otherFileWrapper {
  .other-title {
    line-height: 40px;
    border-top: 1px solid #ccc;
    color: #676767;
  }
  .el-row.allfj-row {
    .allfj-show {
      p {
        display: flex;
        justify-content: space-between;
        height: 30px;
        line-height: 30px;
        background-color: #F3F3F3;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        margin-bottom: 6px;
        .upload-title {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        i {
          padding: 0 10px;
          color: #468CEB;
        }
        .allfj-title {
          cursor: pointer;
        }
        .allfj-title:hover {
          text-decoration: underline;
          color: #468CEB;
        }
        .allfj-date {
          padding: 0 20px;
        }
      }
    }
  }
  .el-row.fj-row {
    .imgPreview-viewer {
      display: flex;
      flex-wrap: wrap;
      .fj-showImg {
        margin: 0 10px 10px 0;
        border: 1px dashed #D1D4D8;
        img {
          // width: 150px;
          height: 100px;
        }
      }
    }
  }
}
.footer {
  border-top: 1px solid #ccc;
  padding-top: 10px;
}
</style>

<style lang="scss">
@import './publicSheet/publicSheet.scss';
@import './style/print.scss';
@import './style/template.scss';
@import './style/table.scss';
@import './style/newTable.scss';
// 覆盖element样式
  .lock-input input{
    color: #333 !important;
 }
.print-form.disabled {
  height: auto !important;
  overflow: visible !important;
  .sign-area {
    display: block !important;
    .content {
      height: 200px !important;
    }
  }
  .el-button {
    display: none !important;
  }
}
.upload-dialog {
    .el-upload {
      width: 100%;
    }
    .el-dialog__body {
      padding: 5px 5px 20px;
    }
    .upload-h1 {
      margin: 10px 20px;
      color: #676767;
    }
    .upload-show {
      p {
        display: flex;
        justify-content: space-between;
        height: 30px;
        line-height: 30px;
        background-color: #F3F3F3;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        margin: 0 20px 6px;
        .upload-title {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          i {
            padding: 0 10px;
            color: #468CEB;
          }
        }
        .upload-del {
          i {
            cursor: pointer;
            color: #EF2941;
            padding-right: 10px;
          }
        }
      }
    }
    .upload-ing {
      text-align: center;
      height: 30px;
      line-height: 30px;
      background-color: #F3F3F3;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      margin: 0 20px 6px;
    }
    .upload-box {
      display: flex;
      justify-content: space-between;
      height: 30px;
      line-height: 30px;
      background-color: #F3F3F3;
      margin: 0 20px 6px;
      .upload-demo {
        margin: 0 !important;
        .el-button--text {
          font-size: 14px;
          font-weight: 400;
          color: #468CEB;
        }
      }
      span {
        i {
          color: #EF2941;
          cursor: pointer;
          padding-right: 10px;
        }
      }
    }
    .content {
      padding: 10px 20px;
      .fj-h1 {
        margin-bottom: 10px;
        color: #676767;
      }
      .fj-show {
        p {
          display: flex;
          justify-content: space-between;
          height: 30px;
          line-height: 30px;
          background-color: #F3F3F3;
          font-size: 14px;
          font-weight: 400;
          color: #333333;
          margin-bottom: 6px;
          .upload-title {
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          i {
            padding: 0 10px;
            color: #468CEB;
          }
          .fj-title {
            cursor: pointer;
          }
          .fj-title:hover {
            text-decoration: underline;
            color: #468CEB;
          }
          .fj-date {
            padding: 0 10px 0 20px;
          }
          .fj-del {
            i {
              color: #EF2941;
              cursor: pointer;
              padding: 0 10px 0 0;
            }
          }
        }
      }
    }
  }
.yjx {
  .yjx-title {
    display: inline-block;
    margin-bottom: 10px;
  }
}
.lc-dialog {
  .el-dialog__body {
    padding: 0 20px;
  }
}
.test-textarea {
  width: 400px;
  min-height: 26px;
  line-height: 20px;
  _height: 30px;
  /* max-height: 150px;*/
  margin-left: auto;
  margin-right: auto;
  padding: 3px;
  outline: 0;
  border: 1px solid #ccc;
  font-size: 12px;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-user-modify: read-write-plaintext-only;
  border-radius: 4px;
}

.mt-30 {
  margin-top: 30px;
}
.amount {
  color: #676767;
  .inline-input {
    border: 1px solid #D1D4D8;
    width: 100px;
    height: 25px;
    margin: 0 2px;
  }
}

.sp-temp.disabled {
  // pointer-events: none;
  input::-webkit-input-placeholder {
    color: transparent;
  }
  input::-moz-placeholder {
     color: transparent;
  }
  input:-ms-input-placeholder {
    color: transparent;
  }
  input {
    border: none !important;
    font-size: 15px;
    color: #000;
  }
  textarea {
    border: none !important;
  }
  .el-form-item__label::before {
    content: '' !important;
  }
  .el-select__caret.el-input__icon.el-icon-arrow-up {
    display: none !important;
  }
  td {
    border: 1px solid #ccc;
  }
  .el-upload-list {
    pointer-events: auto;
  }
  .el-icon-close {
    display: none;
  }
}
.wd-20 {
  // width: 20% !important;
  max-width: 200px !important;
}
.wd-30 {
  width: 40%;
}
.el-icon-close-tip {
  display: none !important;
}

.zhaobiao {
  .el-row {
    padding: 2px 0;
    margin-top: 10px;
    .el-col:nth-child(1) {
      min-width: 190px;
      max-width: 190px;
    }
    textarea {
      min-height: 54px !important;
      // padding-bottom: 30px !important;
      // font-size: 15px !important;
      // vertical-align: text-bottom;
    }
  }
  .el-row:nth-child(1) {
    .el-col:nth-child(1) {
      min-width: auto;
      max-width: auto;
    }
  }
  .ht-30 {
    line-height: 30px;
    height: 30px;
  }
  .title {
    background: #f0f7ff;
    margin-top: 20px;
    margin-bottom: 10px;
  }
}
.zhaobiao.disabled {
  .el-icon-close {
    display: none;
  }
}

/* 公共模板样式 */
.public-box.disabled {
  // pointer-events: none;
}

// 保存公共校验类
.submit-validate-dom {
  .novalue {
    border: 1px solid #F63F42;
    box-sizing: border-box;
  }
}
// 审批公共校验类
.dostep-validate-dom {
  .novalue-dostep {
    border: 1px solid #F63F42;
    box-sizing: border-box;
  }
}
// 搜索建议有表头首行不可选中
.autocomplete-header.el-autocomplete-suggestion li:nth-child(1) {
  pointer-events: none;
}
.select-header.el-select-dropdown li:nth-child(1) {
  pointer-events: none;
}
// 审批按钮样式 
.btn-height .el-button {
  width: 75px !important;
  height: 100% !important;
  border-radius: 4px !important;
  font-size: 14px !important;
}

.el-loading-mask {
  height: 100vh;
}
.el-table__header, .el-table__body, .el-table__footer{
	table-layout: auto;
}
</style>