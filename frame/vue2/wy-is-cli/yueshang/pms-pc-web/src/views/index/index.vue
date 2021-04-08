<template>
  <div class="index">
    <div>1223</div>
    <el-select
      v-model="value"
      multiple
      filterable
      remote
      :remote-method="remoteMethod"
      placeholder="请选择文章标签">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
      <template slot="empty">
        <el-button type="primary">添加</el-button>
      </template>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'Index',
  
  data() {
    return {
      options: [],
      value: []
    }
  },

  mounted() {
  },

  methods: {
    remoteMethod(query) {
      console.log('query', query)
      if (query !== '') {
        setTimeout(() => {
          this.options.push({
            value: 1,
            label: '二姐'
          })

        }, 200);
      } else {
        this.options = [];
      }
    }
  }
}
</script>
