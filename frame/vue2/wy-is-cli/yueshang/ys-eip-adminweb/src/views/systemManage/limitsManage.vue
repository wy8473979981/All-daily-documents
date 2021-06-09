<template>
	<div class="tool-bar" type="flex" justify="space-between" align="middle">
		<div>
			<ysNSearch :searchList="searchList" :params="params" @searchList="searchApp" @getList="init"></ysNSearch>
		</div>
		<el-row class="tac" :span="24">
			<el-col :span="4" :style="{height: maxHeight + 'px'}">
				<h5>应用列表</h5>
				<el-menu class="el-menu-vertical-demo" :unique-opened="true" :default-active="activeNum" :default-openeds="activeIndex" @select="appSelect" @open="appSelect">
					<div v-for="(item, i) in menuList" :key="i">
						<!-- <el-submenu :key="i" :index="i.toString()" v-if="item.businessesList">
							<template slot="title">
								<span>{{item.appName}}</span>
							</template>
							<el-menu-item-group>
								<el-menu-item v-for="(secItem, index) in item.businessesList" :key="i+'-'+index"
									:index="i+'-'+index">
									{{secItem.businessName}}
								</el-menu-item>
							</el-menu-item-group>
						</el-submenu> -->
						<el-menu-item  :key="i" :index="i.toString()">
							<template slot="title">
								<span>{{item.appName}}</span>
							</template>
						</el-menu-item>
					</div>
					<!-- <el-submenu v-for="(item, i) in menuList" :key="i" :index="i.toString()" @click="appSelect(item)" v-if="item.businessesList.length > 0">
						<template slot="title">
							<span>{{item.appName}}</span>
						</template>
						<el-menu-item-group>
							<el-menu-item v-for="(secItem, index) in item.businessesList" :key="index"
								:index="index.toString()">
								{{secItem.businessName}}
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-menu-item v-else>
						<template slot="title">
							<span>{{item.appName}}</span>
						</template>
					</el-menu-item> -->
				</el-menu>
			</el-col>

			<router-view></router-view>
			<el-col :span="18" :style="{height: maxHeight + 'px'}">
				<h5>用户列表
					<!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
				</h5>
				<el-tree :data="secMenuList" show-checkbox node-key="id" :default-expanded-keys="expandedList"  :props="defaultProps" ref="tree"  :check-strictly="false" :expand-on-click-node='true' @check="check" @check-change="handleCheckChange"></el-tree>
				<!-- <el-menu class="el-menu-vertical-demo">
					<el-checkbox-group v-model="checkedList" @change="handleCheckedCitiesChange">
						<template v-for="(item, i) in secMenuList">
							<el-submenu  :key="i" :index="i.toString()" v-if="item.childrenList">
								<template slot="title">
									<span>{{item.text}}</span>
								</template> 
								<template v-for="(secItem, index) in item.childrenList">
									<el-submenu   v-if="secItem.childrenList" :key="i+'-'+index" :index="i+'-'+index">
										<template slot="title">
											<span>{{secItem.text}}</span>
										</template> 
										<template v-for="(treeItem, k) in secItem.childrenList">
											<el-submenu   v-if="treeItem.childrenList" :key="i+'-'+index+'-'+ k" :index="i+'-'+index+'-'+ k">
												<template slot="title">
													<span>{{treeItem.text}}</span>
												</template>
												<el-menu-item-group>
													<el-menu-item v-for="(fourItem, q) in treeItem.childrenList" :key="i+'-'+index+'-'+ k +'-'+q"
														:index="i+'-'+index+'-'+ k +'-'+q">
														<el-checkbox :label="fourItem.text" :checked="fourItem.isCheck ? true : false" @change="checkSelect(fourItem,q)">{{fourItem.text}} {{fourItem.isCheck}}   
														</el-checkbox>
													</el-menu-item>
												</el-menu-item-group>
											</el-submenu>
											<el-menu-item :key="i+'-'+index+'-'+ k" :index="i+'-'+index+'-'+ k" v-else>
												<el-checkbox :label="treeItem.text" :checked="treeItem.isCheck ? true : false" @change="checkSelect(treeItem,k)">{{treeItem.text}} {{treeItem.isCheck}}  
												</el-checkbox>
											</el-menu-item>
										</template>
									</el-submenu>
									<el-menu-item v-else :key="i+'-'+index" :index="i+'-'+index">
										<el-checkbox :label="secItem.text" :checked="secItem.isCheck ? true : false" @change="checkSelect(secItem,index)">{{secItem.text}} {{secItem.isCheck}} 
										</el-checkbox>
									</el-menu-item>
								</template>
							</el-submenu>
							<el-menu-item v-else :key="i" :index="i.toString()">
								<el-checkbox :label="item.text" :checked="item.isCheck ? true : false"  @change="checkSelect(item,index)">{{item.text}}{{item.isCheck}}
								</el-checkbox>
							</el-menu-item>
						</template>
						
					</el-checkbox-group>
				</el-menu> -->
			</el-col>
			<!-- <el-col :span="11" style="width: 56%;" :style="{height: maxHeight + 'px'}">
				<h5>已选用户<el-button type="text" @click="clear">清除</el-button>
				</h5>
				<ul class="checked-list">
					<li v-for="(item, i) in checkedList" :key="i">
						{{item.userName}}
						<i class="el-icon-close" @click="deleteUser(item,i)"></i>
					</li>
				</ul>
			</el-col> -->
		</el-row>
	</div>
</template>

<script>
	import searchList from './config/search.js'
	export default {
		data() {
			return {
				expandedList:[],
				activeNum:'',
				activeIndex:['0'],
				arr:[],
				defaultProps: {
					children: 'childrenList',
					label: 'text',
				},
				menu: [],
				maxHeight: '',
				checkAll: false,
				isIndeterminate: false,
				pageInfo: {
					rows: 10,
					page: 1,
					sum_num: 0
				},
				params: {
					"count": 1,
					"order": "",
					"page": 1,
					"rows": 1000,
					"searchParams": {
						"appId": '',
						"userName": ''
					},
					"sort": "",

				},
				appId: '',
				checkedList: [],
				checkedSureList: [],
				checked:'',
				searchList: searchList.limitsManage,
				menuList: [{
						'name': '应用名称1',
						children: [{
								name: '1-1'
							},
							{
								name: '1-2'
							}
						]
					},
					{
						'name': '应用名称2',
						children: [{
								name: '2-1'
							},
							{
								name: '2-2'
							}
						]
					}
				],
				secMenuList: [{
						'name': '开发组1',
						children: [{
								name: '1-1'
							},
							{
								name: '1-2'
							}
						]
					},
					{
						'name': '开发组2',
						children: [{
								name: '2-1'
							},
							{
								name: '2-2'
							}
						]
					}
				]
			}
		},
		mounted() {
			this.maxHeight = document.documentElement.offsetHeight - 200
		},
		watch: {
			'params.searchParams.appId': function(newValue, oldValue) {
				let arr = this.menu.find(item => item.appId == newValue)
				if (arr) {
					this.menuList.splice(0, this.menuList.length)
					this.menuList.push(arr)
				}
				//this.$set([],this.menuList,this.menu.find(item => item.appId == newValue))
			},
			'params.searchParams.name': function(newValue, oldValue) {
				this.getUserList()
			},
			'arr':function(newValue,oldValue) {
				let arr = JSON.parse(JSON.stringify(this.arr))
				this.$nextTick(function() {
				    this.$refs.tree.setCheckedKeys(arr)
				 })
			}
		},
		created() {
			this.init()
		},
		methods: {
			handleCheckChange(data, checked, indeterminate) {
				if(data.childrenList) {
					this.checked = checked
				}
			},
			check(data,checked) {
				this.handAll(data)
			},
			handAll(obj) {
				if(obj.childrenList) {
					obj.childrenList.map(item => {
						this.handAll(item)
					})
				}else {
					this.checkSelect(obj)
				}
			},
			appSelect(key, keyPath) {
				this.appId = this.menuList[key].appId
				if(this.menuList[key].businessesList) {
					this.activeIndex = [key]
					this.activeNum = ''
				}else {
					this.activeIndex = []
					this.activeNum = key
				}
				
				this.getUserList()
			},
			async checkSelect(row) {
				row.isCheck = !row.isCheck
				let params = {
					appId: this.appId,
					typeIsAdd:this.checked == '' ? row.isCheck : this.checked,
					userId: row.userCd
				}
				let res = await this.$axios.systemManageServe.checkSelect(params)
				if (res.code == 200) {
					console.log('勾选成功')
				}
			},
			async searchApp(appName) {
				let res = await this.$axios.systemManageServe.searchApp({
					appName: appName
				})
				if (res.code == 200) {
					searchList.limitsManage[0].selectList = res.data
				}
			},
			async getList(type) {
				let res = await this.$axios.systemManageServe.getAppList(this.params)
				if (res.code == 200) {
					res.data.dataList.map(item => {
						if (item.businessesList.length == 0) {
							item.businessesList = ''
						}
					})
					this.menuList = res.data.dataList
					this.menu = res.data.dataList
					if (type == 'init') {
						this.appId = res.data.dataList[0].appId
					}
				}
			},
			async init() {
				await this.getList('init')
				this.getUserList()
				/* let arr = this.secMenuList.map(item => {
					if(item.isCheck) {
						return {
							id:item.id,
							isCheck: item.isCheck,
							label: item.label,
							text: item.text,
							userCd: item.userCd,
							...item.childrenList,
						};
					}
				}); */
			},
			findKey(list) {
				list.map(item => {
					if(item.isCheck && !item.childrenList) {
						this.arr.push(item.id)
					}
					if(item.childrenList) {
						this.findKey(item.childrenList)
						let userIndex = item.childrenList.find(obj => obj.userCd)
						if(!userIndex) {
							item.disabled = true
						}
					}else {
						if(!item.userCd) {
							item.disabled = true
						}
					}
				})
			},
			async getUserList() {
				this.arr.splice(0,this.arr.length)
				let params = JSON.parse(JSON.stringify(this.params))
				params.searchParams.appId = this.appId
				let res = await this.$axios.systemManageServe.getUser(params, true)
				if (res.code == 200) {
					this.secMenuList = res.data
					this.findKey(this.secMenuList)
					console.log(this.arr,'arr')
					this.expandedList = []
					res.data.map(item => {
						this.expandedList.push(item.id)
					})
					/* let arr = JSON.parse(JSON.stringify(this.arr))
					this.$nextTick(function() {
					    this.$refs.tree.setCheckedKeys(arr)
					 }) */
					
				}
			},
			deleteUser(item, i) {
				this.checkedList.splice(i, 1)
				this.checkAll = false
				this.isIndeterminate = this.checkedList.length != 0
				this.checkSelect(item, i)
			},
			clear() {
				this.checkedList.map(item => {
					this.checkSelect(item)
				})
				this.checkedList.splice(0, this.checkedList.length)
				this.checkAll = false
				this.isIndeterminate = false

			},
			handleCheckAllChange(val) {
				let list = []
				this.secMenuList.map(item => {
					item.positionList.map(obj => {
						list.push(obj)
						this.checkSelect(obj)
					})
				})
				this.checkedList = val ? list : [];
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				/* let list = []
				this.secMenuList.map(item => {
					item.children.map(obj => {
						list.push(obj.name)
					})

				}) */
				let checkedCount = value.length;
				this.checkAll = checkedCount === list.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < list.length;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.el-menu-vertical-demo {
		overflow-y: auto;
		height: 698px;
	}

	.table {
		// margin-top: 16px;
	}
    .el-tree {
		height: 698px;
		overflow-y: auto;
	}
	.tac {
		margin-top: 10px;
		display: flex;
		justify-content: flex-start;

		h5 {
			display: flex;
			justify-content: space-between;
			line-height: 35px;
			border-bottom: solid 1px #F0F2F7;
			padding: 0 20px;
			color: #8893A3;
		}

		.el-col {
			border: 1px solid #F0F2F7;
			box-sizing: border-box;
		}

		.el-col:first-child {
			margin-right: 14px;
		}

		.el-submenu__title {
			text-align: left;
		}

		.el-menu {
			border: none;
            .is-opened {
				background-color: #F3F5F7; 
			}
			.el-menu-item {
				line-height: 32px;
				height: 32px;
				text-align: left;
				color: #1C1C1C;

				&:hover {
					background-color: #F3F5F7;
				}
				&.is-active {
					background-color: #F3F5F7;
				}
			}

			.el-submenu__title {
				color: #1C1C1C;
				height: 30px;
				line-height: 30px;

				&:hover {
					background-color: #F3F5F7;
				}
				&.is-active {
					background-color: #F3F5F7;
				}
			}
		}

		.checked-list {
			padding: 20px;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;

			li {
				line-height: 24px;
				font-size: 12px;
				color: #1C1C1C;
				padding: 0 6px;
				border: 1px solid #E0E5EB;
				margin-right: 10px;
				min-width: 100px;
				text-align: left;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
</style>
