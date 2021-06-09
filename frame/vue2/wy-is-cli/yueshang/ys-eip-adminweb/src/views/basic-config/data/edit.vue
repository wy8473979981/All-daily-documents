<template>
  <div>
    <el-drawer
			class="serial-drawer"
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      :wrapperClosable="false"
      size="800px">
      <div class="dialog-close-icon" @click="cancel">
        <i></i>
      </div>
      <div class="drawer-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3 v-if="!id">新增数据字典</h3>
            <h3 v-else>编辑数据字典</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button plain type="success" @click="save">保存</el-button>
            <el-button plain @click="cancel">关闭</el-button>
          </el-col>
        </el-row>
        <div class="con" style="margin-top:30px">
          <el-form class="serial-form" ref="form" :model="dataObject">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="d-min">
                  <span>字典代码</span>
                  <el-form-item label=" " prop="name">
                    <el-input v-model="dataObject.dictTypeCd"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>字典名称</span>
                  <el-form-item label=" " prop="name">
                    <el-input v-model="dataObject.dictTypeName"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <div class="d-min">
                <span>备注</span>
                	<el-form-item label=" " prop="name">
                    <el-input v-model="dataObject.remark"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row> 
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="d-min">
                  <span>显示顺序</span>
                  <el-form-item label=" " prop="name">
                    <el-input v-model="dataObject.dispOrderNo" type="number"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="d-min">
                  <span></span>
                    <el-checkbox label="有效" v-model="dataObject.enableFlg"></el-checkbox>
                </div>
              </el-col>
            </el-row>
          </el-form>

          <el-row class="data-table-header" type="flex" justify="space-between">
            <el-col>
              <h3>字典数据</h3>
            </el-col>
            <el-col style="text-align:right">
              <el-button plain size="mini" @click="add">新增</el-button>
            </el-col>
          </el-row>
          <el-form :model="dataObject" :rules="tableDataRules" ref="ruleForm" class="demo-ruleForm" style="padding-bottom:40px">
            <el-table height="calc(100vh - 400px)" ref="table" :data="dataObject.bsDictDatas" size="mini" header-row-class-name="table-header">
            <!-- <el-table-column type="selection" width="60" fixed /> -->
            <el-table-column label="代码">
              <template slot-scope="scope">
                <el-input v-model="scope.row.dictCd" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.dictName" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="序号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.dispOrderNo" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="是否有效">
              <template slot-scope="scope">
                <el-select v-model="scope.row.enableFlg" placeholder="请选择" size="mini
                ">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="备注">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" plain type="danger" @click="dele(scope.row,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          </el-form>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import basicConfig from '@/apis/apis/basicConfig';
import { mapState } from 'vuex';
export default {
  name: 'Detail',
  props: ['open', 'id'],
  data() {
    return {
			options: [
				{
					label: '是',
					value: 'true'
				},
				{
					label: '否',
					value: 'false'
				}
			],
      form: {
				name: ''
      },
      dataObject: {
        bsDictDatas: [{
          enableFlg: 'true'
        }]
      },
      tableDataRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
      }
    }
  },
  created() {
    this.getDetail();
  },
  watch: {
    open(val) {
      this.getDetail();
    }
  },
  computed: {
    ...mapState(['userInfo']),
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
      // this.$refs.form.resetFields();
      Object.assign(this.$data, this.$options.data());
      this.fast = false;
    },
    async save() {
      let param = this.dataObject;
      param.operation = this.id ? 'U' : 'S';
      if(param.operation == 'S') {
        param.companyId = this.userInfo.enterpriseId;
      }
      param.userId = this.userInfo.userid;
      await basicConfig.saveData(param).then(res => {
        if(res.code == 1 && res.message == 'success'){
        this.$message.success('保存成功');
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
      await basicConfig.getDataById(id).then(res => {
        if(res.code == 1 && res.data){
          this.dataObject = res.data;
          this.dataObject.enableFlg = JSON.parse(this.dataObject.enableFlg);
        }
      })
    },
    async deleteDictDataById(val,index) {
      await basicConfig.deleteDictDataById(val).then(res => {
        if(res.code == 1){
          this.dataObject.bsDictDatas.splice(index,1)
        } else {
          this.$message.error(res.message || '系统异常，请稍后重试')
        }
      })
		},
    dele(row,index) {
      if(row.id) {
        this.deleteDictDataById(row.id,index)
      } else {
        this.dataObject.bsDictDatas.splice(index,1)
      }
    },
    add() {
      this.dataObject.bsDictDatas.push({
        enableFlg: 'true'
      })
    }
  }
}
</script>
<style lang="scss">
  .drawer-detail .con .demo-ruleForm .el-input__inner {
    border-color: #ccc !important;
    background: none;
  }
</style>
<style scoped lang="scss">
@import '~@/assets/styles/common.scss';
.serial-drawer {
  overflow-x: auto;
}
span{
  font-size: 14px;
}
.dialog-close-icon{
  right: 800px;
}
.el-form-item {
	margin-bottom: 20px;
}
.data-table {
  padding-bottom: 30px;
}
.data-table-header {
  // padding: 0 114px 0 20px;
  h3 {
    font-size: 18px;
    color: #7A8FA4
  }
}
.con {
  > div {
    > h3 {
      margin-bottom: 20px;
    }
    > .el-row {
      margin-bottom: 20px;
    }
  }
}

</style>

<style>
input[type=number] {
    -moz-appearance:textfield;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>