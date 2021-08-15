<template>
    <!-- 银行付款(缺票) -->
    <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
        <el-row>
            <dl-col :span="12" place="top" title="银行付款单单号" :novalue="processCode !='CHJZ_HTBZGL_57' ? !form.bizEntityJson.bankPayNo : undefined">
                <el-select v-model="form.bizEntityJson.bankPayNo" v-if="!form.bizEntityJson.disabled" filterable clearable remote :remote-method="quickSearch" @change="optionChange" :loading="loading"
                           :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled">
                    <el-option v-for="item in bankPayNoOptions" :key="item.remark" :label="item.remark" :value="item.remark">
                    </el-option>
                </el-select>
            </dl-col>
            <dl-col :span="12" place="top right" title="项目名称">
                <el-input v-model="form.bizEntityJson.projectName" readonly/>
            </dl-col>
            <dl-col :span="12" title="预计收回发票时间" :novalue="!form.bizEntityJson.estimatedReceiptInvoiceDate">
                <el-date-picker v-model="form.bizEntityJson.estimatedReceiptInvoiceDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                                :disabled="form.bizEntityJson.disabled"/>
            </dl-col>
            <dl-col :span="12" place="right" title="催收责任人" :novalue="!form.bizEntityJson.collectionPersonName">
                <el-input v-model="form.bizEntityJson.collectionPersonName" readonly @focus="showSearchUser=true"/>
            </dl-col>
            <dl-col :span="24" title="缺票原因" place="right" :novalue="!form.bizEntityJson.invoiceReason">
                <el-input v-model="form.bizEntityJson.invoiceReason" type="textarea" :autosize="{ minRows: 5}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"/>
            </dl-col>
        </el-row>
        <br>
        <el-row>
            <dl-col :span="24" place="title top right">
                <h2>合同详情</h2>
            </dl-col>
            <dl-col :span="6" place="title">
                <h2>合同编号</h2>
            </dl-col>
            <dl-col :span="6" place="title">
                <h2>合同名称</h2>
            </dl-col>
            <dl-col :span="6" place="title">
                <h2>累计付款</h2>
            </dl-col>
            <dl-col :span="6" place="title right">
                <h2>发票缺额</h2>
            </dl-col>
            <template v-for="(item, index) in tableData">
                <div :key="'bankPaymentInvoiceList['+index+']'">
                    <dl-col :span="6">
                        <el-input v-model="item.contNo" readonly/>
                    </dl-col>
                    <dl-col :span="6">
                        <el-input v-model="item.contName" readonly/>
                    </dl-col>
                    <dl-col :span="6">
                        <el-input v-model="item.countPay" readonly/>
                    </dl-col>
                    <dl-col :span="6" place="right">
                        <el-input v-model="item.invoiceLack" readonly/>
                    </dl-col>
                </div>
            </template>
        </el-row>
        <search-user :open="showSearchUser && !form.bizEntityJson.disabled" @close="closeSearhUser"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {}, // 本地form声明，不需要复制到模板内容配置
            // form: data, // 线上form声明，需要复制到模板内容配置
            tableData: [],
            loading: false,
            bankPayNoOptions: [],
            showSearchUser: false
        }
    },
    /* 本地模板编译需要的数据回传，不需要上传到后台 start */
    props: ['data'],
    watch: {
        data: {
            immediate: true,
            handler: function (val) {
                this.form = val
            }
        }
    },
    /* end */
    created() {
        this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'));
        this.processCode = this.$store.state.menuTreeItem.processCode;
        if (!this.$route.query.id) {
            this.$set(this.form.bizEntityJson, 'bankPayNo', null);
            this.$set(this.form.bizEntityJson, 'projectCd', null);
            this.$set(this.form.bizEntityJson, 'projectName', null);
            this.$set(this.form.bizEntityJson, 'estimatedReceiptInvoiceDate', null);
            this.$set(this.form.bizEntityJson, 'collectionPersonCd', null);
            this.$set(this.form.bizEntityJson, 'collectionPersonName', null);
            this.$set(this.form.bizEntityJson, 'invoiceReason', null);
            this.$set(this.form.bizEntityJson, 'invoiceLackTotal', null);
            this.$set(this.form.bizEntityJson, 'contNo', null);
            this.$set(this.form.bizEntityJson, 'contName', null);
            this.$set(this.form.bizEntityJson, 'countPay', null);
            this.$set(this.form.bizEntityJson, 'invoiceLack', null);
            this.$set(this.form.bizEntityJson, 'bankPaymentInvoiceList', []);
            this.add();
        }
    },
    methods: {
        add() {
            this.tableData = [];
            if (this.processCode == 'CHJZ_HTBZGL_57') {
                this.tableData = [{
                    contNo: this.form.bizEntityJson.contNo,
                    contName: this.form.bizEntityJson.contName,
                    countPay: this.form.bizEntityJson.countPay,
                    invoiceLack: this.form.bizEntityJson.invoiceLack
                }];
            } else {
                this.form.bizEntityJson.bankPaymentInvoiceList = this.form.bizEntityJson.bankPaymentInvoiceList || [];
                for (let bankPaymentInvoice of this.form.bizEntityJson.bankPaymentInvoiceList) {
                    const itemStr = JSON.stringify({
                        contNo: bankPaymentInvoice.contNo,
                        contName: bankPaymentInvoice.contName,
                        countPay: bankPaymentInvoice.countPay,
                        invoiceLack: bankPaymentInvoice.invoiceLack == 0 ? '此合同未缺票' : bankPaymentInvoice.invoiceLack
                    });
                    this.tableData.push(JSON.parse(itemStr));
                }
            }
        },
        quickSearch(query) {
            this.loading = true;
            try {
                if (query !== '') {
                    query = query.toString().trim();
                    const param = {
                        value: query
                    };
                    this.$approval.quickSearchGetAllPay(param).then((response) => {
                        if (response.code == 1 && response.data) {
                            this.bankPayNoOptions = response.data;
                        } else {
                            this.bankPayNoOptions = [];
                        }
                        this.loading = false;
                    }, () => {
                        this.loading = false;
                    });
                }
            } catch {
                this.loading = false;
            }
        },
        optionChange(val) {
            const param = {
                bankPayNo: val
            };
            this.tableData = [];
            this.form.bizEntityJson.bankPaymentInvoiceList = [];
            this.$approval.quickSearchGetAllPay(param).then((response) => {
                if (response.code == 1 && response.data) {
                    this.tableData = response.data;
                    this.form.bizEntityJson.bankPaymentInvoiceList = response.data;
                } else {
                    this.tableData = [];
                    this.form.bizEntityJson.bankPaymentInvoiceList = [];
                }
            });
        },
        closeSearhUser(val) {
            if (val) {
                this.form.bizEntityJson.collectionPersonName = val.userName
                this.form.bizEntityJson.collectionPersonCd = val.userCd
            }
            this.showSearchUser = false
        }
    }
}
</script>