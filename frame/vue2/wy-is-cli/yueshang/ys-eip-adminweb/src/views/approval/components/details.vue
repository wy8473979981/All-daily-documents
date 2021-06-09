<template>
  <div>
    <el-drawer
			class="serial-drawer"
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      :wrapperClosable="true"
      size="980px">
      <div class="dialog-close-icon" @click="cancel">
        <i></i>
      </div>
      <div class="drawer-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col style="text-align: right;">
            <el-button plain @click="cancel">关闭</el-button>
          </el-col>
        </el-row>
        <div class="con" style="margin-top:30px">
          <!-- iframe内容 -->
					<!-- <iframe src="http://10.10.10.175:83/#/form/detail?id=838&processId=45" frameborder="0"></iframe> -->
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>

export default {
  name: 'Detail',
  props: ['open', 'id'],
  data() {
    return {
			options: [
				{
					label: '有效',
					value: 1
				},
				{
					label: '无效',
					value: 0
				}
			],
      form: {
				name: ''
			}
    }
  },
  created() {
    
  },
  computed: {
    fast: {
      get() {
        return this.open
      },
      set(val) {
        this.$emit('close', {fast: false})
      }
    }
  },
  methods: {
    cancel() {
      this.fast = false;
    },
    save() {

    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/common.scss';
span{
  font-size: 14px;
}
.dialog-close-icon{
  right: 980px;
}
// .serial-form {
// 	width: 80%;
// }
.el-form-item {
	margin-bottom: 20px;
}
.con {
	iframe {
		width: 100%;
		height: calc(100% - 50px);
	}
}
</style>