<template>
  <div>
    <el-drawer
			class="serial-drawer"
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      :wrapperClosable="false"
      size="580px">
      <div class="dialog-close-icon" @click="cancel">
        <i></i>
      </div>
      <div class="drawer-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3 v-if="!id">新增序列号规则</h3>
            <h3 v-else>编辑序列号规则</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button plain @click="save">保存</el-button>
            <el-button plain @click="cancel">关闭</el-button>
          </el-col>
        </el-row>
        <div class="con" style="margin-top:30px">
          <el-form class="serial-form" ref="form" :model="form">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="d-min">
                  <span>分类</span>
                  <el-form-item label=" " prop="keyCategory">
                    <el-input v-model="form.keyCategory">
                    </el-input>
                    <!-- <el-select v-model="form.keyCategory" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                      </el-option>
                    </el-select> -->
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>前缀</span>
                  <el-form-item label=" " prop="keyPrefix">
                    <el-input v-model="form.keyPrefix"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="d-min">
                  <span>生成规则</span>
                  <el-form-item label=" " prop="dateRule">
                    <el-input v-model="form.dateRule"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>当前最大值</span>
                  <el-form-item label=" " prop="maxValue">
                    <el-input v-model="form.maxValue"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="d-min">
                <span>顺序号长度</span>
                <el-form-item label=" " prop="seqLenth">
                  <el-input v-model="form.seqLenth"></el-input>
                </el-form-item>
                </div>
              </el-col>
            </el-row> 
          </el-form>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import basicConfig from '../../../apis/apis/basicConfig';
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
        keyCategory:'',
        keyPrefix: '',
        dateRule: '',
        maxValue: '',
        seqLenth: '',
        enterpriseId: '1'
			}
    }
  },
  created() {
    // this.getDetail();
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
  watch: {
    open(val) {
      this.getDetail();
    }
  },
  methods: {
    cancel() {
      // this.$refs.form.resetFields();
      // this.id = '';
      Object.assign(this.$data, this.$options.data());
      this.fast = false;
    },
    async save() {
      const params = this.form;
      await basicConfig.saveSerial(params).then(res => {
        if(res.code == 1 && res.message == 'success'){
          this.$message.success('保存成功');
          // this.$refs.form.resetFields();
          Object.assign(this.$data, this.$options.data());
          this.fast = false;
          this.$emit('refresh')
        } else {
          if(res.message) {
            this.$message.error(res.message); 
          }
        }
      })
    },
    async getDetail() {
      if(!this.id || !this.fast) {
        return;
      }
      const id = this.id;
      await basicConfig.getSerialById(id).then(res => {
        if(res.code == 1 && res.data){
          this.form = res.data;
        }
      })
		},
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/common.scss';
span{
  font-size: 14px;
}
.dialog-close-icon{
  right: 580px;
}
.con {
     h3 {
      margin-bottom: 20px;
    }
     .el-row {
      margin-bottom: 20px;
    }
}
</style>