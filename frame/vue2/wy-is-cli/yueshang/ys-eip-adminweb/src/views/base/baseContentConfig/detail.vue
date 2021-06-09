<template>
  <div>
    <el-drawer
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      :wrapperClosable="false"
      size="576px">
      <div class="dialog-close-icon" @click="cancel">
        <i></i>
      </div>
      <div class="drawer-detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3 v-show="!this.id">新增内容模板</h3>
            <h3 v-show="this.id">编辑内容模板</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-button type="success" @click="save">保存</el-button>
            <el-button plain @click="cancel">取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="d-min">
                  <span>内容模板分类</span>
                  <el-input class="required" v-model="form.templateCat" placeholder="请输入"></el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>内容模板代码</span>
                  <el-input class="required" v-model="form.templateCd" placeholder="请输入"></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="d-min">
                  <span>内容模板标识</span>
                  <el-input class="required" v-model="form.templateTag" placeholder="请输入"></el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="d-min">
                  <span>内容模板名称</span>
                  <el-input class="required" v-model="form.templateName" placeholder="请输入"></el-input>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                 <div class="d-min">
                  <span>语言代码</span>
                  <el-input class="required" v-model="form.lang" placeholder="请输入"></el-input>
                </div>
              </el-col>
            </el-row>
            <el-form label-position="right" label-width="100px" style="margin-bottom: 20px;">
              <!-- <el-row v-if="status==='add'" :gutter="20">
                <el-col :span="12">
                  <el-form-item label="创建人：">
                    <span>哈哈哈</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="更新人：">
                    <span>嘿嘿嘿</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="status==='add'" :gutter="20">
                <el-col :span="12">
                  <el-form-item label="创建时间：">
                    <span>2020-07-08 12:30:56</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="更新时间：">
                    <span>2020-07-08 12:30:56</span>
                  </el-form-item>
                </el-col>
              </el-row> -->
            </el-form>
            <el-row :gutter="20">
                <el-col :span="24">
                <div class="d-min">
                  <span>内容信息</span>
                  <el-input
                    class="required"
                    type="textarea"
                    :rows="15"
                    placeholder="请输入"
                    v-model="form.content">
                  </el-input>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import basicConfig from '@/apis/apis/basicConfig';
import { mapState } from 'vuex';
export default {
  name: "Detail",
  props: ["open", "id"],
  components: {},
  data() {
    return {
      status: "add", // add 新增， edit 编辑
      queryNameList: [
        {
          id: 1,
          name: "分类A"
        },
        {
          id: 2,
          name: "分类B"
        }
      ],
      form: {
        enterpriseId: 1
      }
    };
  },
  created() {
    // this.getDetail();
  },
  computed: {
    ...mapState(['userInfo']),
    fast: {
      get() {
        return this.open;
      },
      set(val) {
        this.$emit("close", { fast: false });
      }
    }
  },
  watch: {
    id(nv, v) {
      if (nv) {
        this.status = "edit";
      } else {
        this.status = "add";
        // this.resetData()
      }
    },
    open(val) {
      this.getDetail();
    }
  },
  methods: {
    cancel() {
      Object.assign(this.$data, this.$options.data());
      this.fast = false;
    },
    resetData() {},
    async getDetail() {
      if(!this.id || !this.fast) {
        return;
      }
      const configId = this.id;
      await basicConfig.getBaseContentById(configId).then(res => {
        if(res.code == 1 && res.data){
          this.form = res.data;
        }
      })
    },
    async save() {
      let param = this.form;
      param.operation = this.id ? 'U' : 'S';
      param.userId = this.userInfo.userid;
      param.updatedUserId = this.userInfo.userid;
      await basicConfig.saveBaseContent(param).then(res => {
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
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/common.scss";
span {
  font-size: 14px;
}
.dialog-close-icon {
  right: 562px;
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