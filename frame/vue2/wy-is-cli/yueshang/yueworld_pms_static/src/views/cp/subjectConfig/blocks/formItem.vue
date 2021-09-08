<template>
  <div>
    <!-- 表单搜索组件 -->
    <ysn-seniorSearch :form="formData" :config="configData" clearable @searchResult="searchResult" />
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  data() {
    return {
      formData: {
        s1: [],
        s2: ''
      },
      configData: [ // 表单配置

        {itemType:'checkbox',label:'',prop:'s1',listName:'label',listKey:'value',list:[
                   {label:'MALL',value:'1'},
                    {label:'商业街',value:'2'},
                    {label:'写字楼',value:'4'},
                    {label:'住宅',value:'3'},
                ],isFirst: true},
        { itemType: 'input', prop: 's2', label: '', placeholder: '请选择级别', width: '200px', isFirst: true,  }
      ]
    }
  },
  methods: {
    // 搜索事件
    searchResult(data) {
      console.log(data)
      this.$emit('searchTable', data)
    }
  }
}
</script>