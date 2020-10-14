<template>
  <edit-form-group @submit="onSubmit" :disabled="type === 'detail'" :isResetBtn="false" :isCancelBtn="true">
    <glp-card title="基础信息"  class="mt-4">
      <edit-form :def="baseFormDefs" :form="baseForm" :span="6"></edit-form>
    </glp-card>
    <glp-card title="联系人" class="mt-4">
      <edit-form :def="contractFormDefs" :form="contractForm"></edit-form>
    </glp-card>
    <query-table
      :columns="columns"
      :title="title"
      :data-source="agentList"
      :pageable="false"
      class="mt-4"
    >
      <template slot="extra" v-if="type==='edit'">
        <el-button type="primary" size="small" @click="onRelation" plain>新增</el-button>
      </template>
      <template v-slot:proxyerType>
        <span>客户签署代理人</span>
      </template>
      <template v-slot:file>
       <p v-for="(item, index) in fileList" :key="index"><a :href="item.path">{{item.name}}</a></p>
      </template>
      <template v-slot:opt="{row}">
        <el-button type="text" :disabled="type=='detail'" @click="onForbidden(row)">{{row.proxyerStatus === 0 ?'启用':'禁用'}}</el-button>
        <el-button type="text" :disabled="type=='detail'"  @click="onEdit(row)">编辑</el-button>
        <el-button type="text" :disabled="type=='detail'"  @click="onDelete(row)">删除</el-button>
      </template>
    </query-table>
    <add-field ref="addFieldRef"></add-field>
  </edit-form-group>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import {
  baseFormDefs,
  contractFormDefs,
  columns,
  materialTypeMapping
} from './config'
import { fileListAdapter, customerRoleAdapter } from '@/utils/adapter'
import {
  delAgent,
  queryAgent,
  getAccessPersonalDetails,
  queryCustomerProxy,
  forbiddenAgent,
  updatePersonalDetails
} from '@/api/systemSet'
import AddField from '../components/add-field/index.vue'

@Component({ components: { AddField } })
export default class Edit extends Vue {
  @Prop(String) id!: string

  @Prop(String) type!: string

  @Ref() tb: any

  @Ref() addFieldRef!: any

  baseFormDefs = baseFormDefs

  contractFormDefs = contractFormDefs

  baseForm: Record<string, any> = {}

  contractForm: Record<string, any> = {}

  columns = columns

  title = '代理人'

  disabled = true

  agentList: Array<any> = []

  agentInfo: Record<string, any> = {}

  agentType = 'add'

  fileList: Array<any> = []

  materialInfo = []

  closeModalAndinit () {
    queryCustomerProxy(this.id).then(res => {
      this.agentList = [res]
    })
  }

  loadBaseForm () {
    if (!this.id) {
      this.baseForm = {}
      this.contractForm = {}
      return
    }
    getAccessPersonalDetails({ id: this.id }).then((data: any) => {
      data.customerRole = customerRoleAdapter(data.customerRole)
      this.baseForm = data || {}
      this.contractForm = data || {}
      this.contractForm.contactAddr = [data.contactProvince, data.contactCity, data.contactCounty]
      this.agentList = (data.proxyer && [data.proxyer]) || []
      this.fileList = (data.proxyer && data.proxyer.fileList) || []
      fileListAdapter(data.materialInfo, 'materialType', 'materialUrl')
      this.materialInfo = data.materialInfo || []
    })
  }

  onForbidden (row: any) {
    const proxyerStatus = row.proxyerStatus === 0 ? 1 : 0
    forbiddenAgent(this.id, proxyerStatus).then(data => {
      this.$message({
        type: 'success',
        message: '操作成功!'
      })
      this.closeModalAndinit()
    })
  }

  onRelation () {
    this.addFieldRef.add(this.id).then(() => {
      this.closeModalAndinit()
    })
  }

  onEdit (row: any) {
    this.addFieldRef.edit(this.id, row).then(() => {
      this.closeModalAndinit()
    }).catch(() => {
      // TODO
    })
  }

  onDelete (row: any) {
    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        delAgent(this.id).then(data => {
          if (!data) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }

  onSubmit (value: any) {
    const customerRole = {
      ifSeller: value[0].customerRole.indexOf('0') > -1 ? 1 : 0,
      ifBuyer: value[0].customerRole.indexOf('1') > -1 ? 1 : 0,
      ifGuarantor: value[0].customerRole.indexOf('2') > -1 ? 1 : 0
    }

    const data = {
      baseInformation: {
        addressCity: value[0].addressCity,
        addressCounty: value[0].addressCounty,
        addressDetail: value[0].addressDetail,
        addressId: value[0].addressId,
        addressProvince: value[0].addressProvince,
        certificateId: value[0].certificateId,
        certificateType: value[0].certificateType,
        customerType: value[0].customerType,
        personalMobile: value[0].personalMobile,
        personalEmail: value[0].personalEmail,
        enterpriseNature: value[0].businessAddressDetail,
        name: value[0].name
      },
      customerRole: customerRole,
      contactInfo: {
        contactProvince: value[0].contactAddr[0],
        contactCity: value[0].contactAddr[1],
        contactCounty: value[0].contactAddr[2],
        contactAddress: value[0].contactAddress,
        contactEmail: value[0].contactEmail,
        contactMobile: value[0].contactMobile,
        contactName: value[0].contactName
      },

      id: this.id
    }
    updatePersonalDetails(data).then(res => {
      this.$message.success('更新成功')
      this.$router.push('/customer/list')
    })
  }

  mounted () {
    this.loadBaseForm()
  }
}
</script>
