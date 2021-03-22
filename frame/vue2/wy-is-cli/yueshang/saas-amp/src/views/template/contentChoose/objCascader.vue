<template>
<el-cascader
      style="width: 600px;"
      size="mini"
      v-model="cascaderVal"
      :props="props"
      @change='handleChange'
      @active-item-change='achange'
    >
    </el-cascader>
</template>

<script>
import {templateDataName} from './config'
import elementGroup from '@apis/elementGroup'
export default {
  data () {
    return {
      cascaderVal: [],
      props: {
        lazy: true,
        lazyLoad: async (node, resolve) => {
          console.log(node, '-----[输出node数据]-----')
          if (node.parent && node.parent.children){
            const num = node.parent.children.findIndex( item=>{
              return item.value == node.value
            })
            let name = ""
            const vals = node.value.split('/')
            if (vals.length > 0){
              name = vals[vals.length-2]
            }
            if (this.indexNum.length >= node.level){
              this.indexNum[node.level-1].index = num
              this.indexNum[node.level-1].name = name
            }else{
              this.indexNum.push({index:num,name:name})
            }
          }else{
            if(node.level > 1){
              this.indexNum.push({index:''})
            }
          }
          const {level, value, data} = node;
          const nodes = await this.getObjCascader({nodeLevel: level, nodeValue: value, udata: data})
          if (node.level == 1){
            let name = ""
            const vals = node.value.split('/')
            if (vals.length > 0){
              name = vals[vals.length-2]
            }
            if (node.value.indexOf('List') != -1){
                const num = nodes.findIndex( item =>{
                  return item.value == node.value
                })
              this.indexNum.push({index:num,name:name})
            }else{
              this.indexNum.push({index:'',name:name})
            }
          }
          resolve(nodes)
        }
      },
      indexNum: [],
      rowNum: 0
    }
  },
  methods: {
    achange(val){
      // console.log(val,'----val优化集合')
    },
    handleChange (val) {
      const [id, key, label, type] = val[val.length - 1].split('/')
      this.headList = []
      const wholeKey = val.map(item => {
        return item.split('/')[1]
      }).join('.')
      this.$emit('setSelectedInfo', {selectedInfo: {id, key, label, type, wholeKey}, cascaderVal: val})
    },
    async getObjCascader ({nodeLevel, nodeValue, udata}) {
      if (nodeValue && nodeValue.indexOf('/List') != -1){
        const that = this
        this.$prompt('请输入第几条', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          inputPattern: /[0-9]/,
          // inputErrorMessage: '请输入下标'
        }).then(({ value }) => {
          if (this.indexNum.length >= nodeLevel) {
            const key = this.indexNum[nodeLevel-1].index + ''
            this.indexNum[nodeLevel-1].value = value
            console.log('用户输入下标与位置：',this.indexNum)
            this.$emit('inputValue', this.indexNum)
            const ppp = this.props
          }
        }).catch(() => {

        })
      }
      if (!nodeValue) {
        let resObject = []
        if (this.dataType.Object) {
          resObject = await elementGroup.findByDataType({data_type: 'Object'})
        }
        let resList = []
        if (this.dataType.List) {
          resList = await elementGroup.findByDataType({data_type: 'List'})
        }
        let arrObj = []
        let arrList = []
        if (resObject.code === 200) {
          arrObj = resObject.result.map(item => ({
            value: `${item.element_group_id}/${item.element_group_key}/${item.element_group_name}/Object`,
            label: `${item.element_group_name}/Object`,
            leaf: false,
            id: item.element_group_id
          }))
        }
        if (resList.code === 200) {
          let leaf = false
          if (this.outerStep && this.outerStep === 1) {
            leaf = true
          }
          arrList = resList.result.map(item => ({
            value: `${item.element_group_id}/${item.element_group_key}/${item.element_group_name}/List`,
            label: `${item.element_group_name}/List`,
            leaf: leaf,
            id: item.element_group_id
          }))
        }
        const filters = ['40', '50', '51', '52', '53', '54', '55', '72']
        let arr = arrObj.concat(arrList).filter(item => {
          return filters.includes(item.id)
        })
        return arr
      } else {
        const id = nodeValue.split('/')[0]
        let res = await elementGroup.findById({element_group_id: id})
        if (res.code === 200) {
          const {element = [], group = []} = res.result.members
          const eleArray = element.map(item => ({value: `${item.element_id}/${item.element_key}/${item.element_name}/Element`, label: `${item.element_name}（元素）`, leaf: true}))
          let groupArray = group.map((item,index) => {
            return {
              value: `${item.element_group_id}/${item.element_group_key}/${item.element_group_name}/${item.data_type}`,
              label: `${item.element_group_name}（${item.data_type === 'List' ? '集合': '对象'}）`,
              leaf: false,
              data_type: item.data_type,
              id: `${item.element_group_id}`
            }
          })
          groupArray = groupArray.filter(item => {
            return this.dataType[item.data_type]
          })
          return eleArray.concat(groupArray)
        } else {
          return []
        }
      }
    },
  },
  props: {
    selectedInfo: {
      type: Object
    },
    dataType: {
      type: Object,
      default: () => ({'List': true, 'Object': true})
    },
    outerStep: {
      type: Number,
      default: function () {
        return 0
      }
    }
  }
}
</script>

<style>
.el-message-box__wrapper {
  z-index: 3000!important;
}
</style>
