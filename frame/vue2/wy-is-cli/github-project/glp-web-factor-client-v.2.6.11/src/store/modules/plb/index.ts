import { Module } from 'vuex'

import { validInvoiceInfo, getInvoiceOrderUpStatus } from '@/api/plb-invoice'
import { State } from 'vuex-class'

class PlbState {
  initInvoiceList: Array<any> = []
  invoiceItem: Record<string, any> = {}
  currentStep: any = 5
  orderId: any = 7
  actionUrl: any
  noteList: Array<any> = []
  noteListWidthAttachment: Array<any> = []
  paperContract: Record<string, any> = {}
  noteAmount: Record<string, any> = {}
}

const app: Module<PlbState, unknown> = {
  namespaced: true,
  state: new PlbState(),
  mutations: {
    setInitInvoiceList(state: PlbState, items: Array<any> = []) {
      state.initInvoiceList = items
    },
    setInvoiceItem(state: PlbState, item: Record<string, any> = {}) {
      state.invoiceItem = item
    },
    setCurrentStep(state: PlbState, num: number) {
      state.currentStep = num
    },
    setOrderId(state: PlbState, num: number) {
      state.orderId = num
      state.actionUrl = '/clientend/plb/step1/import?orderId=' + num
    },
    setNoteList(state: PlbState, tempPapers: Record<string, any> = {}) {
      state.noteList = tempPapers.tempPapers
      state.noteAmount = {
        allAmount: tempPapers.allAmount,
        num: tempPapers.num
      }
    },
    setNoteListWidthAttachment(state: PlbState, data: any) {
      state.noteListWidthAttachment = data
    },
    setPaperContract(state: PlbState, item: Record<string, any> = {}) {
      state.paperContract = item
    },
    initState(state: PlbState, data: any) {
      state = new PlbState()
    }
  },
  getters: {

  },
  actions: {
    checkInvoiceList({ commit, state }, items: Record<string, any> = {}) {
      validInvoiceInfo(state.orderId).then(res => {
        getInvoiceOrderUpStatus(state.orderId).then(res => {
          commit('setInitInvoiceList', res)
        })
      })
    }
  }
}

export default app
