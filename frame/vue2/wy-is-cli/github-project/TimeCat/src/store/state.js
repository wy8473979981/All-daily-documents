// 定义初始状态
const state = {
    pageIndex: 0,
    pageArray: [
        { headerTitle: "此处留白", routename: "home" },
        { headerTitle: "片刻留白", routename: "daily" },
        { headerTitle: "回音留白", routename: "vocality" },
        { headerTitle: "字符留白", routename: "essay" },
        { headerTitle: "半步留白", routename: "travels" }
    ],
    isSlideBarShow: false, //是否显示个人菜单栏，默认false不显示
    isDetailHeader: false, //是否显示详情页头部，默认false不显示
    detailHeaderNickName: '', //详情页头部显示的名称，默认为空
    personalInfo: {
        avatar: 'http://p1.wmpic.me/article/2017/03/06/1488780213_usvFXYIl.jpg',
        nickname: '李留白',
        uid: 9001
    },
    isAudioPlay: false, //是否显示音频播放器，默认false不显示
    currentPlayerUrl: '', //当前音频播放链接，默认为空
    isfollow: false, //mockx下临时模拟的数据，正常情况下没有该字段，是否关注，默认false不关注
    followcount: 101, //mockx下临时模拟的数据，正常情况下没有该字段，关注数量
    isLove: false, //mockx下临时模拟的数据，正常情况下没有该字段，是否喜爱，默认false不喜爱
    lovecount: 12 //mockx下临时模拟的数据，正常情况下没有该字段，喜爱数量
}

export default state