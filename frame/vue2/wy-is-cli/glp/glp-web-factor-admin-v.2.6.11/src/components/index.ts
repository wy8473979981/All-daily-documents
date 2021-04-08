import Vue from 'vue'

import MenuTabs from './menu-tabs/index.vue'
import Breadcrumb from './breadcrumb/index.vue'
import QueryForm from './query-form/index.vue'
import DetailForm from './detail-form/index.vue'
import EditFormGroup from './edit-form-group/index.vue'
import EditForm from './edit-form/index.vue'
import QueryTable from './query-table/index.vue'
import Modal from './modal/index.vue'
import DictOptions from './dict-options/index.vue'
import RadioOptions from './radio-options/index.vue'
import CheckboxOptions from './checkbox-options/index.vue'
import AuditForm from './audit-form/index.vue'
import AuditSteps from './audit-steps/index.vue'
import ProcessSteps from './process-steps/index.vue'

const components: Record<string, any> = {
  MenuTabs,
  Breadcrumb,
  QueryForm,
  DetailForm,
  EditFormGroup,
  EditForm,
  QueryTable,
  Modal,
  DictOptions,
  RadioOptions,
  CheckboxOptions,
  AuditForm,
  AuditSteps,
  ProcessSteps
}

Object.keys(components).forEach((key: string) => {
  Vue.component(key, components[key])
})
