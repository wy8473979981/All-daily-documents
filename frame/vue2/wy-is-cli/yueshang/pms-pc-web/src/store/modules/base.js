import {
	baseApi
} from 'api/base'

export default {
	namespaced: true,

	state: {
		userId: 0,
		enumList: {}, // 字典表处理后的数据
		enumKeys: [], // 字典表中包含的key
		allDit: {}, // 字典表原始数据
	},

	mutations: {
		modifyEnum(state, data) {
			state.allDit = data;
			let enumList = {}
			let enumKeys = []
			for (const [key, obj] of Object.entries(data)) {
				enumList[key] = obj.children.map(item => {
					return {
						...item,
						key: item.code === '' ? 'empty' : item.code,
						label: item.detail,
					}
				})
				enumKeys.push(obj.key)
			}
			
			state.enumList = enumList
			state.enumKeys = enumKeys
		},
	},

	actions: {
		async getToken() {
			let params = {
				"uiid": "wangjt2",
				"pwd": "0aac4e6a54c170b06e2bd3848d2b735e",
				"sing": "aa488217894e38730728946b34a7d3a6",
				"device": "",
				"product": "pdm",
				"command": "eMail"
			}
			let res = await baseApi.getTokenApi(params) || {}
			// this.setCookie("uiid", res.userId)
			// this.setCookie("token", res.token)

			console.log('token', res)

			var Days = 30;
			var exp = new Date();
			exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 30);
			document.cookie = 'uiid' + "=" + escape(res.userId) + ";expires=" + exp.toGMTString();
			document.cookie = 'token' + "=" + escape(res.token) + ";expires=" + exp.toGMTString();
		},
	}
}
