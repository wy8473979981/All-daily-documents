<template>
	<div class="project-list">
		<van-index-bar :index-list="indexList" highlight-color="#3a96bd">
			<div v-for="item in projectList" :key="item.key">
				<van-index-anchor :index="item.key">{{ item.key }}</van-index-anchor>
				<van-cell :title="child.shortName" v-for="child in item.children" :key="child.bisProjectId" @click="projeSelected(child)"> </van-cell>
			</div>
		</van-index-bar>
	</div>
</template>
<script>
export default {
	data() {
		return {
			projectList: [],
			indexList: [],
		};
	},
	methods: {
		async getProjectList() {
			let data = [];
			let projectList = localStorage.getItem("projectList") && JSON.parse(localStorage.getItem("projectList"));
			if (projectList && projectList.length > 0) {
				data = projectList;
			} else {
				let res = await this.$axios.getProjectList({ operStatus: 2 });
				data = res.data;
				localStorage.setItem("projectList", JSON.stringify(data));
				// this.$store.commit(("projectList", data));
			}

			this.getProjectListFormat(data);
		},
		getProjectListFormat(data) {
			let result = [
				{
					key: "#",
					children: [
						{
							shortName: "全部",
						},
					],
				},
			];
			data.forEach((item) => {
				let key = item.projectShortName.slice(0, 1);
				let temp = result.find((v) => v.key === key);
				if (temp) {
					temp.children.push(item);
				} else {
					result.push({
						key: key,
						children: [item],
					});
				}
			});
			this.indexList = result.map((item) => item.key);
			this.projectList = result;
		},
		projeSelected(item) {
			this.$emit("projeSelected", item);
		},
	},
	mounted() {
		this.getProjectList();
	},
};
</script>
<style lang="scss" scoped>
.project-list {
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: #fff;
	color: #333;
}
/deep/.van-index-anchor {
	width: 100%;
	height: 46px;
	line-height: 46px;
	font-size: 16px;
	font-weight: bold;
	padding: 0 10px;
	border-bottom: 1px solid #e5e5e5;
	background: #eee;
}
</style>
