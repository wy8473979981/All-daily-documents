<template>
<div>
<modal :title="title" :before-confirm="beforeConfirmFn" width="1080px" ref="modal">
  <div class="mb-3 text-right">
    <el-link type="warning" @click="onView">中登登记信息提取......</el-link>
  </div>
  <edit-form-group ref="efg" v-if="loaded">
    <template v-slot:action><span></span></template>
    <edit-form :def="formDefs" :form="form" :span="12" :xl="12"></edit-form>
  </edit-form-group>
</modal>
<extra-info ref="extraInfo"></extra-info>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch, Emit } from 'vue-property-decorator'
import { initFormDefs, changeFormDefs, extendFormDefs, cancelFormDefs } from './config'
import ExtraInfo from './extra-info/index.vue'

type RegisterType = 'init' | 'change' | 'extend' | 'cancel'

const titleMap = {
  init: '初始登记',
  change: '变更登记',
  extend: '展期登记',
  cancel: '注销登记'
}

const defMap = {
  init: initFormDefs,
  change: changeFormDefs,
  extend: extendFormDefs,
  cancel: cancelFormDefs
}

@Component({
  components: { ExtraInfo }
})
export default class ZdwRegister extends Vue {
  @Ref() modal!: any

  @Ref() efg!: any

  @Ref() extraInfo!: ExtraInfo

  type: RegisterType = 'init'

  row: any = null

  form: any = {}

  loaded = false

  get title () {
    return titleMap[this.type]
  }

  get formDefs () {
    return defMap[this.type]
  }

  onView () {
    this.extraInfo.view({ type: this.type, data: this.row })
  }

  beforeConfirmFn () {
    const vm = this as any
    return this.efg.forSubmit().then(([params]: any) => {
      const req = genReq(this.type, Object.assign({}, params))
      return this.$http.post(getUrl(this.type), req)
    })

    function getUrl (type: RegisterType) {
      if (type === 'init') return '/backend/zdw/submit/init'
      if (['change', 'extend'].includes(type)) return '/backend/zdw/submit/change'
      if (type === 'cancel') return '/backend/zdw/submit/cancel'
      return ''
    }

    function genReq (type: RegisterType, data: any) {
      if (type === 'init') {
        const req = {
          debtReceiveId: vm.row,
          registerType: data?.registerType,
          dueTime: data?.dueTime,
          registerDueTime: data?.registerDueTime,
          registerCertificateNo: data?.registerCertificateNo,
          fileName: data.files[0]?.name,
          filePath: data.files[0]?.url,
          registerModifiedCode: data?.registerModifiedCode,
          registerRemark: data?.registerRemark
        }
        return req
      }
      if (['change', 'extend'].includes(type)) {
        const req = {
          batchId: vm.row,
          registerType: data?.registerType,
          dueTime: data?.dueTime,
          registerDueTime: data?.registerDueTime,
          registerCertificateNo: data?.registerCertificateNo,
          fileName: data.files[0]?.name,
          filePath: data.files[0]?.url,
          registerRemark: data?.registerRemark,
          registerStatus: type === 'change' ? '3' : '4'
        }
        return req
      }
      if (type === 'cancel') {
        const req = {
          batchId: vm.row,
          registerCertificateNo: data?.registerCertificateNo,
          fileName: data.files[0]?.name,
          filePath: data.files[0]?.url,
          cancelType: data?.cancelType,
          cancelRemark: data?.cancelRemark
        }
        return req
      }
    }
  }

  register (type: RegisterType, row: any) {
    this.row = row
    this.type = type
    return this.loadData().then(() => {
      this.loaded = true
      return this.modal.open()
    }).finally(() => {
      this.loaded = false
    })
  }

  loadData (): Promise<any> {
    if (this.type === 'init') {
      return this.$http.post('/backend/zdw/show/init', { debtReceiveId: this.row }).then(data => {
        this.form = fromResp(data)
      })
    } else if (['change', 'extend'].includes(this.type)) {
      return this.$http.post('/backend/zdw/show/change', { batchId: this.row }).then(data => {
        this.form = fromResp(data)
      })
    } else if (this.type === 'cancel') {
      return this.$http.post('/backend/zdw/show/cancel', { batchId: this.row }).then(data => {
        this.form = fromResp(data)
      })
    } else {
      this.form = {}
      return Promise.reject(new Error('unknown type: ' + this.type))
    }

    function fromResp (data: any = {}) {
      return {
        contractNumber: data?.contractNumber || '',
        debtReceivableNumber: data?.debtReceivableNumber || '',
        registerType: String(data?.registerType),
        dueTime: Number(data?.dueTime),
        registerDueTime: data?.registerDueTime || '',
        id: data?.id
      }
    }
  }
}
</script>
