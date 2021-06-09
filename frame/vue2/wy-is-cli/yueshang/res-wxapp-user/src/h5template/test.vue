<template>
	<!-- 测试模板 -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title">累计欠收收电费:</span>
				<span class="span-value">0.00</span>
			</p>
      <p>
				<span class="span-title">申报原因及后续调整安排:</span>
				<span class="span-value">S3-F1-097~098道野鹅屋正常解约98道野鹅屋正常解约98道野鹅屋正常解约</span>
			</p>
    </div>
		<div class="template-content">
			<h2 class="h2-title">预售卡充值费用</h2>
			<p>
				<span class="span-title">累计欠收收电费:</span>
				<span class="span-value">0.00</span>
			</p>
      <p>
				<span class="span-title">申报原因及后续调整安排:</span>
				<span class="span-value">S3-F1-097~098道野鹅屋正常解约98道野鹅屋正常解约98道野鹅屋正常解约</span>
			</p>
    </div>
		<div class="template-content">
			<el-table>
				<el-table-column width="80" prop="applyUserName" label="申请人"></el-table-column>
				<el-table-column width="80" prop="applyUserName" label="申请人"></el-table-column>
				<el-table-column width="80" prop="applyUserName" label="申请人"></el-table-column>
				<el-table-column width="80" prop="applyUserName" label="申请人"></el-table-column>
				<el-table-column width="80" prop="applyUserName" label="申请人"></el-table-column>
				<el-table-column width="80" prop="applyUserName" label="申请人"></el-table-column>
				<el-table-column width="80" prop="applyUserName" label="申请人"></el-table-column>
			</el-table>
			<data-table :data="listData" :columns="columns"></data-table>
		</div>
  </div>
</template>
<script>

// {
//   template,
//   data: function() {
//     return{
//       form: data,
//       disabled: true,
//       uploadUrl,
//       fileList: fileList || []
//     }
//   }
// }

export default {
	props: ['data'],
	watch: {
		data: {
			immediate: true,
			handler: function(val) {
				this.form = val;
			}
		}
	},
  data() {
    return {
			form: {},
			listData: [
				{
					name: 123,
					sex: 'nan',
					age: '78'
				},
				{
					name: 456,
					sex: 'nv',
					age: '22'
				},
			],
			columns: [
				{label: '名称', prop: 'name'},
				{label: '性别', prop: 'sex'},
				{label: '年龄', prop: 'age'},
				{label: '名称', prop: 'name'},
				{label: '性别', prop: 'sex'},
				{label: '年龄', prop: 'age'},
			],
    }
  },
}
</script>>
<style lang="scss" scoped>
@import "~@/scss/h5template.scss";
</style>