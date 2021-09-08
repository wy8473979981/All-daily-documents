const api = {
    common: {
        mailBoxEnum: 'plpms-box/president-mailbox-main/mailBoxEnum',
        selectNoReadCount: 'plpms-box/president-mailbox-receiver/selectNoReadCount', // 查询未读数量
        selectReceiver: 'plpms-box/president-mailbox-receiver/selectReceiver', // 收件箱列表
        selectIsRead: 'plpms-box/president-mailbox-receiver/selectIsRead', // 已读列表
        selectNoRead: 'plpms-box/president-mailbox-receiver/selectNoRead', // 未读列表
        selectReply: 'plpms-box/president-mailbox-detail/selectReply', // 已回复列表
        selectNoReply: 'plpms-box/president-mailbox-detail/selectNoReply', // 未回复列表
        selectDelete: 'plpms-box/president-mailbox-delete/selectDelete', // 删除列表
        detail: 'plpms-box/president-mailbox-main/detail', // 详情
        updateIsTop: 'plpms-box/president-mailbox-receiver/updateIsTop', // 置顶
        updateIsNoTop: 'plpms-box/president-mailbox-receiver/updateIsNoTop', // 取消置顶
        fileUpload: 'merchantService_web/advise/fileUpload.htm' // 上传文件
    },
    user: {
        saveMailbox: 'plpms-box/president-mailbox-main/saveMailbox', // 保存草稿
        selectDraftBox: 'plpms-box/president-mailbox-main/selectDraftBox', // 草稿箱列表
        deleteMailBox: 'plpms-box/president-mailbox-delete/deleteMailBox', // 删除邮件
        sendMailbox: 'plpms-box/president-mailbox-main/sendMailbox', // 发送邮件
        selectSend: 'plpms-box/president-mailbox-main/selectSend', // 已发送列表
    },
    manager: {
        reply: 'plpms-box/president-mailbox-detail/reply', // 回复
        forwardMailBox: 'plpms-box/president-mailbox-detail/forwardMailBox', // 转发
    }
}

export { api }
