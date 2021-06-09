<template>
	<div class="tool-bar" type="flex" justify="space-between" align="middle">
		<div>
			<el-row>
				<el-col :span="20">
					<ysNSearch :searchList="searchList" :params="searchParams" @getList="getList" @searchDic="searchDic"></ysNSearch>
				</el-col>
				<el-col :span="4" style="float: right;" align="right">
					<ysNButton :className="'button-bg-main'" @click="newDic" :text="'新增'" />
				</el-col>
			</el-row>
			<ysNTable :tableList="tableList" :tableHeight="this.$store.state.tableHeight" :column="column" class="table"
				@deleteSure="deleteSure" @switchOpen="switchOpen" @checkSubmit="addDic"
				@changeRowSelect="changeRowSelect" @checkDelete="checkDelete"></ysNTable>
			<ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
		</div>
		<ysNDialog ref="dialogDelete" title="是否删除当前数据" :width="'400px'" :buttonList="buttonList" @deleteDic="deleteDic"
			@cancel="deleteDicCancle">
		</ysNDialog>
	</div>
</template>

<script>
	import {
		handle_paginator,
		tableData
	} from '@/mixins';
	import columnList from './config/column.js'
	import searchList from './config/search.js'
	export default {
		mixins: [handle_paginator, tableData],
		data() {
			return {
				dicTypes: [],
				buttonList: [{
					name: '取消,暂不删除',
					function: 'cancel',
					className: 'button-bg-common'
				}, {
					name: '确定,继续删除',
					function: 'deleteDic',
					className: 'button-bg-main'
				}, ],
				dicForm: {},
				centerDialogVisible: false,
				searchParams: {
					configType: '',
					statusFlag: '',
					configValue: ''
				},
				pageInfo:{
					"page": 1,
					"rows": 20,
					"sort": "",
					sum_num: 0
				},
				column: columnList.dataDicList,
				tableList: [],
				searchList: searchList.dataDicList,
				deleteRow: ''
			}
		},
		mounted() {
			setTimeout(() => {
				this.$Utils.getDynamicTableHeight(this)
			}, 0)
			console.log(columnList.timeTotalList, '111111')
			this.getList()
			this.getDicTypes()
		},
		watch: {
			/* 'params.searchParams.configType': function(newValue, oldVlaue) {
				this.getDicName(newValue)
			} */
		},
		methods: {
			checkDelete (item, index) {
			  try {
			    this.addRowBtnDisabled = false
			    this.tableList.splice(index, 1)
			  } catch (e) {
			    console.log(e)
			  }
			},
			async searchDic (keyword){
				let searchParams = this.searchParams
				searchParams.configValue = keyword
				let pageInfo = this.pageInfo
				pageInfo.rows = 1000
				let res = await this.$axios.systemManageServe.getDicList({...pageInfo,searchParams:searchParams})
				if (res.code == 200) {
					searchList.dataDicList[1].selectList = res.data.result
				}
			},
			async getDicName(newValue) {
				let res = await this.$axios.systemManageServe.getDicName({
					configType: newValue
				})
				searchList.dataDicList[1].selectList = res.data
			},
			async switchOpen(row) {
				let res = await this.$axios.systemManageServe.switchOpen(row)
				if (res.code == 200) {
					if (row.statusFlag) {
						this.$Utils.successFc('开启')
					} else {
						this.$Utils.successFc('关闭')
					}
				}
				this.getList()
			},
			changeRowSelect(row) {
				this.dicTypes.map(item => {
					if (item.configType === row.configType) {
						row.configName = item.configName
					}
				})
			},
			async addDic(row) {
				let res = await this.$axios.systemManageServe.addDic(row)
				if (res.code == 200) {
					/* this.$Utils.successFc('新增成功') */
					this.getList()
				} else {
					/* this.$Utils.errorFc('新增失败') */
				}
			},
			newDic() {
				this.tableList.push({
					configKey: '',
					configName: '',
					configType: '',
					sort: '',
					statusFlag: true,
					showInput: true,
					selectList: this.dicTypes
				})
			},
			async getDicTypes() {
				let res = await this.$axios.systemManageServe.getDicTypes()
				if (res.code == 200) {
					this.dicTypes = res.data
					searchList.dataDicList[0].selectList = res.data
				}
			},
			async getList() {
				let res = await this.$axios.systemManageServe.getDicList({...this.pageInfo,searchParams:this.searchParams})
				if (res.code == 200) {
					this.tableList = res.data.result
					this.pageInfo.sum_num = res.data.total
					this.tableList.map(item => {
						item.statusFlag = item.statusFlag
					})
				}
			},
			deleteSure(row) {
				this.$refs.dialogDelete.centerDialogVisible = true
				this.deleteRow = row
			},
			deleteDicCancle() {
				this.$refs.dialogDelete.centerDialogVisible = false
			},
			async deleteDic() {
				let res = await this.$axios.systemManageServe.deleteDic(this.deleteRow)
				if (res.code == 200) {
					/* this.$Utils.successFc('删除成功') */
					this.getList()
				} else {
					/* this.$Utils.errorFc('删除失败') */
				}
				this.$refs.dialogDelete.centerDialogVisible = false
			},
			confirmDilog(title, content, btn1, btn2, func1, fun2) {
				this.$confirm(title, content, {
						distinguishCancelAndClose: true,
						confirmButtonText: btn1,
						cancelButtonText: btn2,
						center: true,
						showClose: false
					})
					.then(() => {
						//func1()
						this.$message({
							type: 'info',
							message: '保存修改'
						});
					})
					.catch(action => {
						//fun2()
						this.$message({
							type: 'info',
							message: action === 'cancel' ?
								'放弃保存并离开页面' : '停留在当前页面'
						})
					});
			}
		}
	}
</script>

<style>
	.table {
		/* margin-top: 16px; */
	}
</style>
