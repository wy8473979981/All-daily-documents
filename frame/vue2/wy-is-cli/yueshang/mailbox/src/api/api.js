const api = {
    common: {
        mailBoxEnum: 'plpms-box/president-mailbox-main-new/mailBoxEnum', // 数据字典
        selectNoReadCount: 'plpms-box/president-mailbox-unread-new/selectUnReadCount', // 查询未读数量
        selectReceiver: 'plpms-box/president-mailbox-inbox-new/selectReceiver', // 收件箱列表
        selectIsRead: 'plpms-box/president-mailbox-read-new/selectRead', // 已读列表
        selectNoRead: 'plpms-box/president-mailbox-unread-new/selectNoRead', // 未读列表
        selectReply: 'plpms-box/president-mailbox-replied-new/selectReply', // 已回复列表
        selectNoReply: 'plpms-box/president-mailbox-unreplied-new/selectNoReply', // 未回复列表
        selectDelete: 'plpms-box/president-mailbox-delete-new/selectDelete', // 删除列表
        detail: 'plpms-box/president-mailbox-detail-new/detail', // 详情
        updateIsTop: 'plpms-box/president-mailbox-top-new/updateTop', // 置顶
        updateIsNoTop: 'plpms-box/president-mailbox-top-new/cancelTop', // 取消置顶
        fileUpload: 'merchantService_web/advise/fileUpload.htm' // 上传文件
    },
    user: {
        saveMailbox: 'plpms-box/president-mailbox-drafts-new/saveDrafts', // 保存草稿
        selectDraftBox: 'plpms-box/president-mailbox-drafts-new/selectDraftBox', // 草稿箱列表
        deleteMailBox: 'plpms-box/president-mailbox-delete-new/delete', // 删除邮件
        cancelDelete: 'plpms-box/president-mailbox-delete-new/cancelDelete', // 恢复删除邮件
        sendMailbox: 'plpms-box/president-mailbox-main-new/sendMailbox', // 发送邮件
        selectSend: 'plpms-box/president-mailbox-outbox-new/selectSend', // 已发送列表
    },
    manager: {
        reply: 'plpms-box/president-mailbox-replied-new/reply', // 回复
        forwardMailBox: 'plpms-box/president-mailbox-replied-new/forward', // 转发
    }
}

export { api }
