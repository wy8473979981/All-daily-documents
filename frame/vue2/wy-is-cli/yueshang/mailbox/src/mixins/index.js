var Mixin = {
    data: function() {
        return {
            query: {
                current: 1, // 当前页
                size: 10, // 显示条数
                userId: '',
                userName: '',
                createrId: '',
                createrName: '',
                functionCode: '', // // 职能
                type: null
            },
            quser: {
                userId: '',
                userName: ''
            },
            dutys: [],
            status: [
                {text: '全部',value: 0},
                {text: '未读',value: 1},
                {text: '已读',value: 2},
                {text: '未回复',value: 3},
                {text: '已回复',value: 4}
            ],
            status2: [
                {text: '收件箱',value: 0},
                {text: '已发送',value: 1},
                {text: '已删除',value: 2}
            ],
            status3: [
                {text: '收件箱',value: '5'},
                {text: '已发送',value: '2'},
                {text: '草稿箱',value: '1'}
            ],
            status4: [
                {text: '收件箱',value: '5'},
                {text: '已发送',value: '2'}
            ],
            refreshing: false,
            dePartOptions: [], // 职能列表
            userType: null,
            title2: '涉及职能'
        }
    },
    watch: {
        '$store.state.userInfo'(n) {
            this.query.createrId = n.uiid
            this.query.createrName = n.userName
            this.query.senderId = n.uiid
            this.query.senderName = n.userName
            this.query.userId = n.uiid
            this.query.userName = n.userName
            this.quser.userId = n.uiid
            this.quser.userName = n.userName
            try {
                this.initData()
            }catch(e){}
        },
        '$store.state.userType'(n) {
            this.userType = n
        }
    },
    created() {
        // 赋值职能列表
        try {
            if(this.$store && this.$store.state.opList) {
                const depart = this.$store.state.opList.depart
                if(depart) {
                    const _this = this
                    Object.keys(depart).forEach(key => {
                        _this.dePartOptions.push({text: depart[key], value: key})
                    })
                }
            }
            if(this.$store && this.$store.state.userInfo) {
                // console.log("this.$store.state.userInfo",this.$store.state.userInfo)
                const {uiid, userName } = this.$store.state.userInfo
                this.query.userId = uiid
                this.query.userName = userName
                this.query.createrId = uiid
                this.query.createrName = userName
                this.quser.userId = uiid
                this.quser.userName = userName
            }
            if(this.$store && this.$store.state.opList) {
                this.dutys = this.$store.state.opList.options || []
            }
            if(this.$store && this.$store.state.userType) {
                this.userType = this.$store.state.userType
            }
            if(this.$store && this.$store.state.dutyIndex) {
                this.title2 = this.$store.state.dutyIndex.text
                this.query.functionCode = this.$store.state.dutyIndex.index
            }
        }catch(e) {
            console.log('error:', e)
        }
    },
    methods: {
        reset() {
            this.query.current = 1
            this.initData()
        },
        onLoad() {
            this.query.current ++
            this.initData()
        },
        // 职能切换
        dutySelect(data) {
            // console.log("dropdown-menu涉及职能:",data)
            this.title2 = this.dutys.find(item => item.value === data).text
            this.query.current = 1
            this.query.functionCode = data
            this.$store.commit('setDutyIndex',{index: data,text: this.title2})
            this.initData(this.tabIndex)
        }
    }
}

export default Mixin
