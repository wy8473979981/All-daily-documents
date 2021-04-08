import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/);

const business = require.context('./svg/business', false, /\.svg$/);

const requireAll = requireContext => {
	requireContext.keys().map(requireContext)
};

requireAll(req);
requireAll(business);
