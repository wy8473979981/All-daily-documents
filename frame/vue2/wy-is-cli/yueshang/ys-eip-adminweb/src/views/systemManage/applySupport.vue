<template>
	<div class="tool-bar" type="flex" justify="space-between" align="middle">
		<div>
			<el-row :span="24" class="search-top">
				<el-col :span="20">
					<ysNSearch :searchList="searchList" :params="searchParams" @searchList="getServeMenu" @getList="getList"></ysNSearch>
				</el-col>
				<el-col :span="4" align="right">
					<ysNButton :className="'button-bg-main'" @click="newApply" :text="'新增'"></ysNButton>
				</el-col>
			</el-row>
			<ysNTable ref="table" :tableList="tableList" :tableHeight="this.$store.state.tableHeight" :column="column"
				class="table" @editName="editName" @serveSupport="serveSupport" @deleteSupport="deleteSupport"
				@secretKey="secretKey" @checkSubmit="addApp" @checkDelete="checkDelete"></ysNTable>
			<ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
		</div>
		<ysNDialog ref="dialog" :width="'445px'" :buttonList="buttonScreetList" @updateSecretKey="updateSecretKey" @save="save"
			@cancel="cancel">
			<el-form slot="content" class="form">
				<el-form-item label="密钥:">
					<el-input size="mini" v-model="secretKeyValue"></el-input>
					<!-- <span class="copy-btn" v-clipboard:copy="f" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span> -->
					<img src="../../assets/images/copy.png" width="24px" height="24px" v-clipboard:copy="secretKeyValue"
						v-clipboard:success="onCopy" v-clipboard:error="onError" />
				</el-form-item>
			</el-form>
		</ysNDialog>
		<ysNDialog  ref="dialogDelete" title="是否删除当前数据" :width="'400px'" :buttonList="buttonList" @deleteApp="deleteApp" @deleteAppCancle="deleteAppCancle">
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
				secretKeyValue:'',
				copyWord: 'sdsds',
				buttonList: [{
						name: '取消,暂不删除',
						function: 'deleteAppCancle',
						className:'button-bg-common'
					}, {
						name: '确定,继续删除',
						function: 'deleteApp',
						className:'button-bg-main'
					},
				],
				buttonScreetList:[
					{
						name: '更新',
						function: 'updateSecretKey',
						className:'button-bg-main'
					},
					/* {
						name: '保存',
						function: 'save',
						className:'button-bg-common'
					}, */
					{
						name: '取消',
						function: 'cancel',
						className:'button-bg-common'
					},
				],
				pageInfo: {
					rows: 10,
					page: 1,
					sum_num: 0
				},
				searchParams: {
					appName: ''
				},
				column: columnList.applySupport,
				tableList: [],
				searchList: searchList.applySupport,
				currentRow:''
			}
		},
		mounted() {
			this.getList()
			this.getServeMenu()
		},
		methods: {
			async addApp(row) {
				let params = {
					appName:row.appName
				}
				let res = await this.$axios.systemManageServe.addApp(params)
				if (res.code == 200) {
					this.getList()
				}
			},
			async getServeMenu(appName) {
				let params = {
					appName:appName ? appName : ''
				}
				let res = await this.$axios.systemManageServe.getServeMenu(params)
				if (res.code == 200) {
					searchList.applySupport[0].selectList = res.data
				}
			},
			async getList() {
				let res = await this.$axios.systemManageServe.getAppSuportList({...this.pageInfo,searchParams:this.searchParams})
				if (res.code == 200) {
					this.tableList = res.data.result
					this.pageInfo.sum_num = res.data.total
				}
			},
			newApply() {
				/* this.$refs.dialogNew.centerDialogVisible = true */
				this.tableList.push({
					appCode: '',
					appName: '',
					createdName: '',
					showInput: true
				})
			},
			sure() {

			},
			onCopy(e) {
				this.$message({
					message: '复制成功',
					type: 'success',
					customClass: 'successDialog',
					offset: 360,
				});
			},
			// 复制失败时的回调函数
			onError(e) {
				this.$message.error("抱歉，复制失败！")
			},
			updateSecretKey(row) {
				this.$confirm('', '是否确认更新密钥', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'success',
					callback: action => {
					  if (action === 'confirm') {
						this.updateOperate(row)
					  }
					}
				})
				
			},
			async updateOperate(row) {
				let params = JSON.parse(JSON.stringify(this.currentRow))
				params.secretKey = this.secretKeyValue
				let res = await this.$axios.systemManageServe.getUpdateSecretUrl()
				if(res.code == 200) {
					/* this.$message({
						message: '更新成功',
						type: 'success',
						customClass: 'successDialog',
						offset: 360,
					});
					this.$refs.dialog.centerDialogVisible = false
					this.currentRow.secretKey = this.secretKeyValue
					this.getList() */
					this.secretKeyValue = res.data
					this.getList()
				}
			},
			save() {
				this.$message({
					message: '保存成功',
					type: 'success',
					customClass: 'successDialog',
					offset: 360,
				});
			},
			cancel() {
				this.$refs.dialog.centerDialogVisible = false
				this.$refs.dialogDelete.centerDialogVisible = false
			},
			async editName(item) {
				let key = item.key
				item.row[key] = item.editeName
				let res = await this.$axios.systemManageServe.updataApp(item.row)
				if(res.code == 200) {
					this.$set(item.row, item.key, item.editeName)
					this.$set(item.row, 'editeShow', false)
					this.getList()
				}
			},
			serveSupport(row) {
                this.$router.push({path:'/appManage/fwwf',query:{appId:row.id}})
			},
			async secretKey(row) {
				// 
				/* this.$refs.dialog.centerDialogVisible = true
				let res = await this.$axios.systemManageServe.getSecretKey({id:row.id})
				if(res.code == 200) {
					this.secretKeyValue = res.data
				} */
				this.currentRow= row
				this.$refs.dialog.centerDialogVisible = true
				this.secretKeyValue = row.secretKey
			},
			deleteSupport(row) {
				this.$refs.dialogDelete.centerDialogVisible = true
				this.currentRow= row
			},
			deleteAppCancle() {
				this.$refs.dialogDelete.centerDialogVisible = false
			},
			async deleteApp() {
				let res = await this.$axios.systemManageServe.deleteApp(this.currentRow)
				if(res.code == 200) {
					this.getList()
					this.$refs.dialogDelete.centerDialogVisible = false
				}
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
			},
			checkDelete (item, index) {
			  try {
			    this.addRowBtnDisabled = false
			    this.tableList.splice(index, 1)
			  } catch (e) {
			    console.log(e)
			  }
			},
		}
	}
</script>

<style lang="scss" scoped>
	.table {
		// margin-top: 16px;
	}

	.form {
		label {
			color: #1c1c1c !important;
			padding-right: 16px;
		}

		.el-form-item {
			margin-bottom: 0;
			display: flex;
			justify-content: center;

			.el-input {
				width: 265px !important;

				.el-input__inner {
					background-color: #e0e5eb;
					border: none;
					line-height: 32px;
					height: 32px;
				}
			}

			img {
				vertical-align: middle;
				margin-left: 40px;
			}
		}
	}

	.formNew {
		.el-form-item {
			.el-input {
				width: 242px !important;

				.el-input__inner {
					background-color: #fff;
					border: 1px solid #e0e5eb !important;
				}
			}
		}
	}
</style>
