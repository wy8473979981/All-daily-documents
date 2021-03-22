const hidden = `<el-col :span="6" class="hidden-sm-and-down">
<ys-contractbar @save='toPdf'/>
</el-col>`

const vueTemp1 = `
<template>
  <div class="contract-page">
    <el-row type="flex">
      <el-col :span="24">
        <div class="contract-content" id='contract-content' contenteditable="true" data-test='合同具体内容'>
`
const vueTemp2 = `
</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {data} from '../mixins/index'
export default {
mixins: [data]
};
</script>
<style lang="scss" scoped>
@import '@styles/temp.scss'
</style>
`
const vueTemp0 = `
</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async toPdf () {
      try {
        await this.$confirm('确定保存吗？')
        this.$print('contract-content', 'html')
      } catch (error) {

      }
    },
    async getData () {
      const res = await util.getContractData()
      const {code, result} = res
      if (code === 200) {
        this.data = result
      }
    }
  }
};
</script>`

export {
  vueTemp1,
  vueTemp2
}
