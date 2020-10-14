import * as types from './mutation-types.js'
import VueRouter from '../router/routes.js'

export default {
    // 首页各个模块跳转
    [types.UPDATE_NEXT_PAGE](state) {
        if (state.pageIndex < state.pageArray.length - 1) {
            state.pageIndex++
        } else {
            state.pageIndex = 0
        }
        VueRouter.push({
            path: '/' + state.pageArray[state.pageIndex].routename
        })

    },

    // 点击用户头像进入个人页面
    [types.GO_PERSONAL_PAGES](state, { userId }) {
        VueRouter.push({ name: 'personal', params: { userId: userId } })
    },

    // 切换关注用户
    [types.TOGGLE_FOLLOW_PERSON](state) {
        // 正常的逻辑应该是将是否关注提交到数据库，更改数据库的字段并返回前端，现在是mock环境，只能在state中加了一个临时变量
        if (state.isfollow) {
            state.followcount--
        } else {
            state.followcount++
        }
        state.isfollow = !state.isfollow
    },

    // 切换侧边栏显示
    [types.TOGGLE_SLIDE_BAR](state) {
        state.isSlideBarShow = !state.isSlideBarShow
    },

    // 切换header
    [types.TOGGLE_HEADER](state) {
        state.isDetailHeader = !state.isDetailHeader
    },

    // 切换header,改变名称
    [types.ADD_DETAIL_HEADER_NICKNAME](state, { nickname }) {
        state.detailHeaderNickName = nickname
    },

    // 切换header,清空名称
    [types.DELEATE_DETAIL_HEADER_NICKNAME](state) {
        state.detailHeaderNickName = ''
    },
    // 切换音乐播放
    [types.TOGGLE_PLAYER_STATUS](state, { currentPlayerUrl }) {
        debugger
        if (!state.isAudioPlay) {
            state.currentPlayerUrl = currentPlayerUrl
            state.isAudioPlay = true
        } else {
            state.currentPlayerUrl = currentPlayerUrl
        }
    },
    // 点击列表项进入详情页面
    [types.GO_DETAIL_PAGES](state, { id }) {
        VueRouter.push({ name: 'detail', params: { id: id } })
    },
    // 点击关注
    [types.TOGGLE_LOVE](state) {
        // 正常的逻辑应该是将是否关注提交到数据库，更改数据库的字段并返回前端，现在是mock环境，只能在state中加了一个临时变量
        if (state.isLove) {
            state.lovecount--
        } else {
            state.lovecount++
        }
        state.isLove = !state.isLove
    },

}