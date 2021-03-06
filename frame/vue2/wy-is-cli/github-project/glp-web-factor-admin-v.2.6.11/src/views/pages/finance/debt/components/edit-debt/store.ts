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
  buyerContact: any = initBuyerContact()

  sellerContact: any = initSellerContact()

  clearAll () {
    this.clearBuyerContact()
    this.clearSellerContact()
  }

  clearBuyerContact () {
    this.buyerContact = initBuyerContact()
  }

  clearSellerContact () {
    this.sellerContact = initSellerContact()
  }
}

export const store = new DataStore()
