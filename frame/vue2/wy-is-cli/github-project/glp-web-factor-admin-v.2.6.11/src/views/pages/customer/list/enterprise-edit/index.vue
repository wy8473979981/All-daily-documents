<template>
  <edit-form-group @submit="submit" :disabled="type === 'detail'" :isResetBtn="false" :isCancelBtn="true">
    <glp-card title="基础信息" class="mt-4">
      <edit-form :def="baseFormDefs" :form="baseForm" :span="6" ></edit-form>
    </glp-card>
    <glp-card title="联系人" class="mt-4">
      <edit-form :def="contractFormDefs" :form="contractForm"></edit-form>
    </glp-card>
    <query-table
      :title="title"
      :columns="columns"
      :dataSource="agentList"
      :pageable="false"
      ref="tb"
      class="mt-4"
    >
      <template slot="extra" v-if="type === 'edit'">
        <el-button type="primary" size="small" @click="onRelation" plain>新增</el-button>
      </template>
      <template v-slot:proxyerType>
        <span>客户签署代理人</span>
      </template>
       <template v-slot:file>
        <p v-for="(item, index) in fileList" :key="index"><a :href="item.path">{{item.name}}</a></p>
      </template>
      <template v-slot:opt="{row}">
        <el-button type="text" :disabled="type=='detail'"  @click="onForbidden(row)">{{row.proxyerStatus === 0 ?'启用':'禁用'}}</el-button>
        <el-button type="text" :disabled="type=='detail'"  @click="onEdit(row)">编辑</el-button>
        <el-button type="text" :disabled="type=='detail'"  @click="onDelete(row)">删除</el-button>
      </template>
    </query-table>
    <glp-card title="附件" v-if="materialInfo.length > 0" class="mt-4">
      <glp-upload v-model="materialInfo" :request="request" :resp="resp" type="card" :disabled="disabled"></glp-upload>
    </glp-card>
    <add-field ref="addFieldRef"></add-field>
  </edit-form-group>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { resp, request, action } from '@/config/form'
import {
  baseFormDefs,
  contractFormDefs,
  columns,
  materialTypeMapping
} from './config'
import { fileListAdapter, customerRoleAdapter } from '@/utils/adapter'
import {
  delAgent,
  forbiddenAgent,
  queryAgent,
  getAccessBusinessDetails,
  queryEcifByCustomerProxy,
  queryCustomerProxy,
  updateBusinessDetails
} from '@/api/systemSet'
import AddField from '../components/add-field/index.vue'

@Component({ components: { AddField } })
export default class Edit extends Vue {
  @Prop(String) id!: string

  @Prop(String) type!: string

  @Ref() tb!: any

  @Ref() addFieldRef!: any

  resp = resp

  request = request

  baseFormDefs = baseFormDefs

  contractFormDefs = contractFormDefs

  baseForm: Record<string, any> = {}

  contractForm: Record<string, any> = {}

  agentList: Array<any> = []

  agentInfo: Record<string, any> = {}

  agentType = 'add'

  columns = columns

  title = '代理人'

  disabled = true

  fileList: Array<any> = []

  materialInfo = []

  loadBaseForm () {
    if (!this.id) {
      this.baseForm = {}
      return
    }
    getAccessBusinessDetails({ id: this.id }).then((data: any) => {
      data.customerRole = customerRoleAdapter(data.customerRole)
      this.baseForm = data || {}
      if (data.lawPersonCertificateType === '1') {
        this.baseForm.lawPersonCertificateId1 = data.lawPersonCertificateId
      }
      if (data.actualControllerCertificateType === '1') {
        this.baseForm.actualControllerCertificateId1 = data.actualControllerCertificateId
      }
      fileListAdapter(data.materialInfo, 'materialType', 'materialUrl')
      this.materialInfo = data.materialInfo || []
      this.contractForm = data || {}
      this.contractForm.contactAddr = [data.contactProvince, data.contactCity, data.contactCounty]
      this.agentList = (data.proxyer && [data.proxyer]) || []
      this.fileList = (data.proxyer && data.proxyer.fileList) || []
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

  closeModalAndinit () {
    queryCustomerProxy(this.id)
      .then(res => {
        this.agentList = [res]
        this.fileList = res.fileList || []
      })
      .catch(e => {
        this.agentList = []
        this.fileList = []
      })
  }

  submit (value: any) {
    console.log(value)
    const customerRole = {
      ifSeller: value[0].customerRole.indexOf('0') > -1 ? 1 : 0,
      ifBuyer: value[0].customerRole.indexOf('1') > -1 ? 1 : 0,
      ifGuarantor: value[0].customerRole.indexOf('2') > -1 ? 1 : 0
    }
    if (value[0].lawPersonCertificateType === '1') {
      value[0].lawPersonCertificateId = value[0].lawPersonCertificateId1
    } else if (value[0].lawPersonCertificateType === '') {
      value[0].lawPersonCertificateId = ''
    }
    if (value[0].actualControllerCertificateType === '1') {
      value[0].actualControllerCertificateId = value[0].actualControllerCertificateId1
    } else if (value[0].actualControllerCertificateId === '') {
      value[0].actualControllerCertificateId = ''
    }

    const data = {
      baseInformation: {
        actualControllerCertificateType: value[0].actualControllerCertificateType,
        actualControllerCertificateId: value[0].actualControllerCertificateId,
        actualControllerMobile: value[0].actualControllerMobile,
        businessAddressId: value[0].businessAddressId,
        addressId: value[0].addressId,
        certificateType: value[0].certificateType,
        certificateId: value[0].certificateId,
        customerType: value[0].customerType,
        actualControllerName: value[0].actualControllerName,
        addressCity: value[0].addressCity,
        addressCounty: value[0].addressCounty,
        addressDetail: value[0].addressDetail,
        addressProvince: value[0].addressProvince,
        enterpriseEmail: value[0].enterpriseEmail,
        enterpriseFax: value[0].enterpriseFax,
        lawPersonMobile: value[0].lawPersonMobile,
        lawPersonName: value[0].lawPersonName,
        lawPersonCertificateId: value[0].lawPersonCertificateId,
        lawPersonCertificateType: value[0].lawPersonCertificateType,
        businessAddressProvince: value[0].businessAddressProvince,
        businessAddressCity: value[0].businessAddressCity,
        businessAddressCounty: value[0].businessAddressCounty,
        businessAddressDetail: value[0].businessAddressDetail,
        enterpriseNature: value[0].businessAddressDetail,
        name: value[0].name
      },

      contactInfo: {
        contactProvince: value[0].contactAddr[0],
        contactCity: value[0].contactAddr[1],
        contactCounty: value[0].contactAddr[2],
        contactAddress: value[0].contactAddress,
        contactEmail: value[0].contactEmail,
        contactMobile: value[0].contactMobile,
        contactName: value[0].contactName
      },
      customerRole: customerRole,
      id: this.id
    }
    updateBusinessDetails(data).then(res => {
      this.$message({
        type: 'success',
        message: '操作成功!'
      })
      this.$router.push('/customer/list')
    })
  }

  onForbidden (row: any) {
    const proxyerStatus = row?.proxyerStatus === 0 ? 1 : 0
    forbiddenAgent(this.id, proxyerStatus).then(data => {
      this.$message({
        type: 'success',
        message: '操作成功!',
        onClose: () => {
          this.closeModalAndinit()
        },
        duration: 1500
      })
    })
  }

  onDelete (row: any) {
    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      delAgent(this.id).then(data => {
        if (!data) {
          this.$message({
            type: 'success',
            message: '删除成功!',
            onClose: () => {
              this.closeModalAndinit()
            },
            duration: 1500
          })
        }
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }

  mounted () {
    this.loadBaseForm()
  }
}
</script>
