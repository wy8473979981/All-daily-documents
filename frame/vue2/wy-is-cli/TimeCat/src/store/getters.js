//
//
//
//
//
//
//有时候我们需要从store中的state中派生出一些状态
//Vuex中getters对象，可以方便我们在store中做集中的处理。Getters接受state作为第一个参数
export const headerTitle = state => state.pageArray[state.pageIndex].headerTitle //决定头部名字显示数组中的哪一个，state.pageIndex默认为0
export const isSlideBarShow = state => state.isSlideBarShow //是否显示个人菜单栏，默认false不显示
export const isDetailHeader = state => state.isDetailHeader //是否显示详情页头部，默认false不显示
export const detailHeaderNickName = state => state.detailHeaderNickName //详情页头部显示的名称，默认为空
export const isAudioPlay = state => state.isAudioPlay //是否显示音频播放器，默认false不显示
export const currentPlayerUrl = state => state.currentPlayerUrl //当前音频播放链接，默认为空

//mockx下临时模拟的数据，正常情况下没有该方法
export const isfollow = state => state.isfollow //是否关注， 默认false不关注
export const followcount = state => state.followcount //关注数量
export const isLove = state => state.isLove //是否喜爱，默认false不喜爱
export const lovecount = state => state.lovecount //喜爱数量