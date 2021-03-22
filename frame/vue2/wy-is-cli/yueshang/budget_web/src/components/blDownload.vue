<template>
  <div class="page-title">
    <el-row class="" type="flex" justify="space-between" align="">
      <el-col class="down" align="right" v-if="showDown" >
        <span v-if="permission.indexOf('clzc_import') > -1" @click="dealLoad" style="margin-right: 20px;">导入数据</span>
        <span @click="dealDown">下载模板</span>
      </el-col>
    </el-row>
    <div>
      <!-- 上传 -->
      <up-load :open="fast" :downLayout="downLayout" @close="close"></up-load>
    </div>
  </div>
</template>

<script>
import UpLoad from '@views/stockAssets/upLoad'
export default {
  props: {
    showDown: {
      type: Boolean,
      default: true
    },
    downUrl: {
      type: String,
      default: ''
    },
    downLayout: {
      type: Number,
      default: ''
    }
  },
  data () {
    return {
      fast: false,
      permission: `${localStorage.getItem('ys_contract_permission')}`
    }
  },
  components: {
    UpLoad
  },
  methods: {
    dealLoad () {
      this.fast = true
    },
    close (res) {
      this.fast = res.fast
      if (res.project_config_id) {
        this.$emit('uploadClose', {
          project_config_id: res.project_config_id,
          // small_layout: res.small_layout,
          report_time: res.report_time
        })
      }
    },
    dealDown () {
      const text = '<p>1. 禁止插入列，且表头信息不可更改；</p>' +
        '<p>2. 按模板添加对应数据，保证对应单元格数据格式正确； </p>' +
        '<p>3. 蓝色列为必填项，需要填入数据；</p>' +
        '<p>4. 蓝色列为必填项，如一条数据有任何必填项未填值，该行数据即为错误数据，应当删除；</p>' +
        '<p>5. 面积、收入、个数等，应填入数值型数据；</p>' +
        '<p>6. 不可更改日期格式，仅一种格式，即“2020/07/28”；</p>' +
        '<p>7. 不可在模板文档中复制或移动工作表；</p>' +
        '<p>8. 不可插入图片、艺术字、视频、连接等；</p>' +
        '<p>9. 不可对表格进行单元格合并；</p>' +
        '<p>10. 不可设置公式、不可复制带公式的数据；</p>' +
        '<p>11. 业态、资产类别按照规则选择填入数据；</p>' +
        '<p>12. 填写数字时，不可填写单位或者“ % ”符号，如：“100%” 填 100 即可；</p>' +
        '<p>13. 已经上报的数据不可再上报（被驳回除外）；</p>' +
        '<p>14. 项目被驳回后，商业下的要上报的数据（Mall、商业街、地下商业、底商、其他）均需要重新提交上报；</p>' +
        '<p>15. 商业分5个小业态，小业态数据全部提交后再上报。</p>'

      this.$alert(text, '模板填写规则', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        callback: action => {
          this.toDealDown()
        }
      })
    },
    toDealDown () {
      const token = localStorage.getItem('ys_contract_token')
      if (token) {
        // window.location.href = `../${this.downUrl}?down_excel=${this.downLayout}&token=${token}`
        if (this.downLayout == 1) {
          window.location.href = `../${this.$baseURL}/down/商业.zip`
        }
        if (this.downLayout == 2) {
          window.location.href = `../${this.$baseURL}/down/酒店.xls`
        }
        if (this.downLayout == 3) {
          window.location.href = `../${this.$baseURL}/down/办公.xls`
        }
        if (this.downLayout == 4) {
          window.location.href = `../${this.$baseURL}/down/公寓.xls`
        }
        if (this.downLayout == 5) {
          window.location.href = `../${this.$baseURL}/down/车库.xls`
        }
        if (this.downLayout == 6) {
          window.location.href = `../${this.$baseURL}/down/其他.xls`
        }
      } else {
        router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-title{
  padding-bottom: 12px;
  .title{
    font-size: 18px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(119,140,162,1);
  }
  .down{
    font-size: 14px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #468CEB;
    padding-left: 20px;
    text-align: right;
    &:hover{
      cursor:pointer
    }
  }
}
</style>
