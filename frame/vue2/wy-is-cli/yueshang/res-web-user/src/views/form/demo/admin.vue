<template>
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row>
      <dl-col :span="24" title="标题名称">
        <el-input v-model="form.bizEntityJson.deptName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}, // 本地form声明，不需要复制到模板内容配置
      // form: data, // 线上form声明，需要复制到模板内容配置
    }
  },
  /* 本地模板编译需要的数据回传，不需要上传到后台 start */
  props: ['data'],
	watch: {
		data: {
			immediate: true,
			handler: function(val) {
				this.form = val
			}
		}
  },
  /* end */
  created() {

  },
  methods: {
    
  }
}
</script>