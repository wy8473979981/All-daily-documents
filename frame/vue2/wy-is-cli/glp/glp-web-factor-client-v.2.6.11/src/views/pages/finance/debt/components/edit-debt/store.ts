import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'

function initSellerContact () {
  return {
    sellerContact: '',
    sellerLawAddress: '',
    sellerNoticeMobile: '',
    sellerNoticeEmail: ''
  }
}

function initBuyerContact () {
  return {
    buyerContact: '',
    buyerLawAddress: '',
    buyerNoticeMobile: '',
    buyerNoticeEmail: ''
  }
}

@Component
export default class DataStore extends Vue {
  transferType = ''

  sellerName = ''

  buyerName = ''

  buyerContact: any = initBuyerContact()

  sellerContact: any = initSellerContact()

  clearAll () {
    this.transferType = ''
    this.clearBuyerContact()
    this.clearSellerContact()
    this.sellerName = ''
    this.buyerName = ''
  }

  clearBuyerContact () {
    // Object.assign(this.buyerContact, initBuyerContact())
    this.buyerContact = initBuyerContact()
  }

  clearSellerContact () {
    // Object.assign(this.sellerContact, initSellerContact())
    this.sellerContact = initSellerContact()
  }
}

export const store = new DataStore()
