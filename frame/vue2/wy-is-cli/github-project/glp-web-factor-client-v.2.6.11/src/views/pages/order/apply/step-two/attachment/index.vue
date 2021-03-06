<template>
  <glp-section title="基础合同附件" class="mt-4 mb-4">
    <div :class="[$style.contentcoan]">
      <el-form
        :model="form"
        status-icon
        ref="form"
        label-width="100px"
        label-position="top"
        class="demo-form"
      >
        <el-form-item prop="supFiles">
          <glp-upload
            v-model="form.conFiles"
            :request="request"
            type="list"
            :limit="20"
            max-size="30M"
          >
            <div slot="tip">支持JPG/JPEG/BMP/PNG/PDF/GIF/压缩包(ZIP)文件，最大30MB</div>
          </glp-upload>
        </el-form-item>
      </el-form>
      <div class="clear"></div>
    </div>
  </glp-section>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { resp, request, action } from '@/config/form'
@Component
export default class Attachment extends Vue {
  @Prop() form!: any

  request = request
}
</script>
<style lang="scss" module>
.contentcoan {
  width: 700px;
  margin: auto;
}
.hide {
  visibility: hidden;
}
.label {
  width: 70px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 20px;
  margin-right: 5px;
}

.label-tips {
  width: 187px;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 144, 42, 1);
  line-height: 17px;
}
</style>
