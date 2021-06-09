Vue.component("drawer", {
    props: {
        //打开方式
        direction: {
            type: String,
        },
        // 是否打开
        display: {
            type: Boolean
        },
        header: {//列表内容
            type: Array,
            default: []
        },
        // 标题
        title: {
            type: String,
            default: '标题'
        },

        // 是否显示关闭按钮
        closable: {
            type: Boolean,
            default: true
        },

        // 是否显示遮罩
        mask: {
            type: Boolean,
            default: true
        },

        // 是否点击遮罩关闭
        maskClosable: {
            type: Boolean,
            default: true
        },

        // 宽度
        width: {
            type: String,
            default: '400px'
        },

        // 是否在父级元素中打开
        inner: {
            type: Boolean,
            default: false
        },
        footerBtnSave: {
            type: String,
            default: '确定'
        },
        footerBtnCancel: {
            type: String,
            default: '取消'
        }
    },
    template: `
        <el-drawer
        :visible.sync="display"
        direction="rtl"
        :append-to-body="true"
        :withHeader="false"
        size="300px" :before-close="cancelDialog">
        <div class="dialog-close-icon" @click="cancelDialog" style="right: 288px;">
            <i></i>
        </div>
        <div class="drawerBudget-detail">
            <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
            <el-col style="text-align: right;">
                <el-button type="success" @click="sure">{{footerBtnSave}}</el-button>
                <el-button plain @click="closeByButton">{{footerBtnCancel}}</el-button>
            </el-col>
            </el-row>
            <div class="con">
            <!-- <slot/> -->
                <div class="drawerBudget-newBunk header-list">
                    <div class="report-label">报表选项</div>
                    <el-checkbox :indeterminate="indeterminate" v-model="checkAll" @change="handleCheckAllChange" :class="checkAll ?  '':'unSelectedCheckbox'">全选</el-checkbox>
                    <dl v-for="(item,index) in header" :key="index" style="color: #333;">
                        <dt>
                            <el-checkbox :indeterminate="item.indeterminate" v-model="item.selected" @change="handleCheckTopAllChange(item,index,$event)" :class="item.selected ?  '':'unSelectedCheckbox'">{{item.value}}</el-checkbox>
                        </dt>
                        <dd v-for="(child, childIndex) in item.list" :key="childIndex">
                            <el-checkbox v-model="child.selected" @change="handleCheckTopChange(item,index,childIndex,$event)" :class="child.selected ? '':'unSelectedCheckbox'">{{child.value}}</el-checkbox>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        </el-drawer>
    `,
    data() {
        return {
            checkAll: true,
            indeterminate: false,
        }
    },
    computed: {
        maskClass: function () {
            return {
                'mask-show': (this.mask && this.display),
                'mask-hide': !(this.mask && this.display),
                'inner': this.inner
            }
        },
        mainClass: function () {
            return {
                'main-show': this.display,
                'main-hide': !this.display,
                'inner': this.inner
            }
        },
        mainStyle: function () {
            return {
                width: this.width,
                right: this.display ? '0' : `-${this.width}`,
                borderLeft: this.mask ? 'none' : '1px solid #eee'
            }
        }
    },
    mounted() {
        if (this.inner) {
            let box = this.$el.parentNode
            box.style.position = 'relative'
        }
        console.log(this.header, 'header');
    },
    methods: {
        //全选
        handleCheckAllChange(e) {
            this.checkAll = e;
            this.indeterminate = false;
            this.header.map(item => {
                item.selected = e;
                item.indeterminate = false;
                if (item.list) {
                    item.list.map(obj => {
                        obj.selected = e
                    })
                }
            })
        },
        handleCheckTopAllChange(item, index, e) {
            item.selected = e;
            item.indeterminate = false;
            if (!e) {
                this.indeterminate = true;
            }
            if (item.list) {
                item.list.map(obj => {
                    obj.selected = e
                })
            }
        },
        handleCheckTopChange(item, index, childIndex, e) {
            let selectedCount = item.list.filter(obj => obj.selected === true).length;
            let unSelectCont = item.list.filter(obj => obj.selected === false).length;
            if (unSelectCont == 0) {//三级全选
                item.selected = true;
                item.indeterminate = false;
            } else if (selectedCount == 0) {
                item.selected = false;
                item.indeterminate = false;
            } else {
                item.selected = true;
                item.indeterminate = true;
            }
        },
        cancelDialog() {
            this.$emit('update:display', false)
        },
        closeByMask() {
            this.maskClosable && this.$emit('update:display', false)
        },
        closeByButton() {
            this.$emit('update:display', false)
        },
        sure() {
            console.log(this.header, 'header');
            this.$emit('save', false)
        }
    }
});