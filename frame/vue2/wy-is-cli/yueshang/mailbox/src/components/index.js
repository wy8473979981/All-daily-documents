import appYsnList from "./ysn-list/index.vue"
import appYsnNavBar from "./ysn-nav-bar/index.vue"
import appYsnHolder from "./ysn-holder"
import appYsnPopup from "./ysn-popup"
import appYsnPopupWrite from "./ysn-popup-write"
import appYsnSearch from "./ysn-search"
import appYsnDropDownMenu from "./ysn-dropdown-menu"
import appYsnTabs from "./ysn-tabs"
import appYsnPageList from "./ysn-page-list"
import appYsnCommonType from "./ysn-common-type"
import appYsnAddFile from "./ysn-add-file"
import appYsnAddUpload from "./ysn-add-upload"
import appYsnButtons from "./ysn-buttons"
import appYsnMessage from "./ysn-message"
import appYsnContact from "./ysn-contact"
import appYsnPopupUser from "./ysn-popup-user"
import appYsnPageDetail from "./ysn-page-detail"

const Plugin = {
	install: function (Vue) {
		Vue.component("appYsnList", appYsnList)
		Vue.component("appYsnNavBar", appYsnNavBar)
		Vue.component("appYsnHolder", appYsnHolder)
		Vue.component("appYsnPopup", appYsnPopup)
		Vue.component("appYsnPopupWrite", appYsnPopupWrite)
		Vue.component("appYsnSearch", appYsnSearch)
		Vue.component("appYsnDropDownMenu", appYsnDropDownMenu)
		Vue.component("appYsnTabs", appYsnTabs)
		Vue.component("appYsnPageList", appYsnPageList)
		Vue.component("appYsnCommonType", appYsnCommonType)
		Vue.component("appYsnAddFile", appYsnAddFile)
		Vue.component("appYsnAddUpload", appYsnAddUpload)
		Vue.component("appYsnButtons", appYsnButtons)
		Vue.component("appYsnMessage", appYsnMessage)
		Vue.component("appYsnContact", appYsnContact)
		Vue.component("appYsnPopupUser", appYsnPopupUser)
		Vue.component("appYsnPageDetail", appYsnPageDetail)
	}
};
export default Plugin;
