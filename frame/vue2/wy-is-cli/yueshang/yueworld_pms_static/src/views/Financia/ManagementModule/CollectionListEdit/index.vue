<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:收款单-新增/编辑页面
-->

<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      @comChange="comChange"
    >
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn v-if="showCollection" class="mr-8" @click="collection">核销</ysn-btn>
        <ysn-btn v-if="showCollection" type="info" @click="save(2)">保存</ysn-btn>
        <ysn-btn v-if="!showCollection" class="ml-8" @click="save(1)">保存</ysn-btn>
        <ysn-confirm
          title="提示"
          width="484px"
          top="120px"
          :content="`是否确认删除?`"
          tip="此操作将永久删除,不可撤回,请谨慎操作"
          @confirm="deleteBox"
        >
          <ysn-btn v-if="showCollection" class="mr-12" type="delete" style="margin-left: 8px;">删除</ysn-btn>
        </ysn-confirm></template>
    </ysn-pageAccorDetail>
  </div>
</template>

<script>
import { collectionList, processingApi } from '@/api'
import { pageConfig } from './config'
export default {
  name: 'CollectionListEdit',
  data() {
    return {
      // 子组件传过来的数据
      childData: {},
      // 是否为编辑页
      showCollection: true,
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      id: 0,
      // 判断是编辑页面还是新增页面
      editOrAddStatus: false,
      // 表数据
      formData: {
        // 基本信息 数据
        form: {
          applicableItems: '', // 适用项目
          receivedId: '', // 收款编号
          unknownType: '', // 未名款项
          tenantName: '', // 商家/企业
          programName: '', // 项目名称
          brandName: '', // 品牌名
          rentalArea: '' // 租赁区域
        },
        // 收款信息 数据
        collectionFome: {
          baseInfo: {
            receivedAmount: '', // 收款金额
            paymentTypeName: '', // 收款方式
            bankFlowNumber: '', // 银行流水号
            accountName: '', // 收款单位
            bankName: '', // 收款银行
            bankAccount: '', // 收款账号
            receivedPerson: '张三', // 收款人
            receivedDate: '', // 收款日期
            draweeName: '', // 付款人姓名
            draweeBank: '', // 付款人银行
            draweeBankAccount: '', // 付款人账号
            remark: '' // 备注
          }
        }
      }
    }
  },
  created() {
    this.formData.collectionFome.baseInfo.receivedDate = new Date()
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      const datas = {
        id: this.$route.query.id
      }
      // 详情数据接口
      this.collectionListEdit(datas)
    } else {
      // 按钮展示判断
      this.showCollection = false
      this.formData.form.unknownType = 2
    }
  },
  methods: {
    // 点击保存
    async save(type) {
      const that = this
      // 校验是否符合规则
      const res = await this.$refs.pageDetail.valiFormDate()
      if (res) {
        that.saveDecorationEnterBox(type)
      }
    },
    // 保存的请求
    saveDecorationEnterBox(type) {
      const that = this
      if (type === 1) {
        that.$router.push({ name: 'CollectionListEdit', query: { id: this.formData.form.unknownType }})
      } else {
        that.$router.push({ name: 'CollectionList' })
      }
      that.$message({ message: '保存成功', type: 'success' }, 1000)
    },
    // 点击核销
    async collection() {
      // 校验是否符合规则
      const res = await this.$refs.pageDetail.valiFormDate()
      if (res) {
        this.collectionBox(this.formData)
      }
    },
    // 核销的请求
    collectionBox(datas) {
      const that = this
      that.$router.push({ name: 'CollectionVerificationForm', query: { unknownType: this.formData.form.unknownType }})
    },
    // 删除
    deleteBox() {
      const that = this
      const datas = {
        id: this.id
      }
      processingApi.processing(datas).then(res => {
        that.$message({ message: '删除成功', type: 'success' })
        setTimeout(() => {
          that.$router.push({ name: 'CollectionList' })
        }, 1000)
      })
    },
    // 数据接口
    collectionListEdit(datas) {
      const that = this
      collectionList.collectionListEdit(datas).then(res => {
        that.formData.collectionFome.baseInfo = res.list.collectionFome
        that.formData.form = res.list.form
        that.update++
      })
    },
    comChange(val) {
      this.formData.form.unknownType = val
    }
  }
}
</script>
