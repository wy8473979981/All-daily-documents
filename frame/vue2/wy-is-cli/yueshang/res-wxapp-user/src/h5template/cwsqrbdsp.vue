<template>
	<!-- 财务双签人变动审批 -->
	<div class="template-wrapper">
		<div v-for="(item, index) in form.bizEntityJson.finDoubleSignInfos" :key="index">
			<div class="template-content">
				<p>
					<span class="span-title">申请单位:</span>
					<span class="span-value">{{ item.finDoubleSignDcgsBean.companyName }}</span>
				</p>
				<p>
					<span class="span-title">申请单位全称:</span>
					<span class="span-value">{{ item.finDoubleSignDcgsBean.companyFullName }}</span>
				</p>
			</div>
			<div class="template-content">
				<h2 class="h2-title">第一双签人</h2>
				<p>
					<span class="span-title">变动前:</span>
					<span class="span-value">{{ item.firstDoubleSigner.doubleSignerName }}</span>
				</p>
				<p>
					<span class="span-title">变动后:</span>
					<span class="span-value">{{ item.firstDoubleSigner.doubleSignerAfter }}</span>
				</p>
				<p>
					<span class="span-title">职务:</span>
					<span class="span-value">{{ item.firstDoubleSigner.post }}</span>
				</p>
				<p>
					<span class="span-title">附件:</span>
					<span class="span-value">
						<download :value="showFileList(item.firstDoubleSigner.fileId)"></download>
					</span>
				</p>
				<p>
					<span class="span-title">说明:</span>
					<span class="span-value">{{ item.firstDoubleSigner.explain }}</span>
				</p>
			</div>
			<div class="template-content">
				<h2 class="h2-title">第二双签人</h2>
				<p>
					<span class="span-title">变动前:</span>
					<span class="span-value">{{ item.finSecondDoubleSigner.doubleSignerName }}</span>
				</p>
				<p>
					<span class="span-title">变动后:</span>
					<span class="span-value">{{ item.finSecondDoubleSigner.doubleSignerAfter }}</span>
				</p>
				<p>
					<span class="span-title">职务:</span>
					<span class="span-value">{{ item.finSecondDoubleSigner.post }}</span>
				</p>
				<p>
					<span class="span-title">入职时间:</span>
					<span class="span-value">{{ item.finSecondDoubleSigner.entryDate }}</span>
				</p>
				<p>
					<span class="span-title">入集团时间:</span>
					<span class="span-value">{{ item.finSecondDoubleSigner.entryCliqueDate }}</span>
				</p>
				<p>
					<span class="span-title">最后一次绩效:</span>
					<span class="span-value">{{ item.finSecondDoubleSigner.lastAchievements }}</span>
				</p>
				<p>
					<span class="span-title">变更理由:</span>
					<span class="span-value">{{ item.finSecondDoubleSigner.entryCliqueDate }}</span>
				</p>
				<p>
					<span class="span-title">推荐理由:</span>
					<span class="span-value">{{ item.finSecondDoubleSigner.entryCliqueDate }}</span>
				</p>
			</div>
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
	    form: {}
    }
	},
	methods: {
		showFileList(val) {
			let newFileList = []
			let nowFileId = val.split(',')
			nowFileId.forEach(itemId => {
				this.form.allEntityFileIds.fileId.forEach(item => {
					if (itemId == item.id) {
						newFileList.push(item)
					}
				})
			})
			return newFileList
    }
	}
}
</script>>
<style lang="scss" scoped>
@import "~@/scss/h5template.scss";
</style>