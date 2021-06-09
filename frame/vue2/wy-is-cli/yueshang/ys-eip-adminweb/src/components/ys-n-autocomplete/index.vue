<template>
  <el-autocomplete ref="elautocomplete" clearable :class="className" style="width:100%;" :size="size" v-model="autocompleteValue" :fetch-suggestions="querySearch" :placeholder="placeholder" @select="handleSelect" @clear="handleClear">
  </el-autocomplete>
</template>

<script>
export default {
  model: {
    prop: "inputValue",
    event: "setValue"
  },
  watch: {
    inputValue: {
      handler: function (newValue, oldValue) {
        this.autocompleteValue = newValue ? this.autocompleteValue : ''
      },
      immediate: true,
      deep: true,
    },
  },
  props: {
    inputValue: [String, Number],
    size: {
      type: String,
      default: 'mini'
    },
    serveApi: {
      type: Function
    },
    params: {
      type: Object,
      default: null
    },
    className: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'appId'
    },
    placeholder: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      autocompleteValue: ''
    }
  },
  mounted () {
  },
  methods: {
    async querySearch (queryString, cb) {
      try {
        let req = null
        let res = null
        let restaurants = []
        this.$refs.elautocomplete.activated = true || this.$refs.elautocomplete.handleFocus()

        if (this.type == 'appId') {
          req = { appName: queryString }
          res = await this.serveApi(req)
          if (res.code == 200) {
            let { data } = res
            restaurants = data.map((item, index) => {
              return { 'value': item.appName, 'id': item.id }
            })
          }
        } else if (this.type == 'businessId' || this.type == 'businessName') {

          req = { appId: this.params['appId'], businessName: queryString }

          res = await this.serveApi(req)
          if (res.code == 200) {
            let { data } = res
            restaurants = data.map((item, index) => {
              return { 'value': item.businessName, 'id': item.id }
            })
          }
        } else if (this.type == 'reqBusinessId' || this.type == 'callBackBusinessId') {

          req = { businessType: this.params['businessType'], businessName: queryString }

          res = await this.serveApi(req)
          if (res.code == 200) {
            let { data } = res
            restaurants = data.map((item, index) => {

              return { 'value': item.businessName, 'id': item.id }

            })
          }
        }

        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);

      } catch (e) {
        console.log(e)
      }
    },
    createFilter (queryString) {
      return (autocompleteValue) => {
        return (autocompleteValue.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
      };
    },
    handleSelect (item) {
      this.$emit("setValue", item.id);
      this.$emit('handleSelect', this.type)
    },
    handleClear () {
      this.$emit("setValue", null)
      this.autocompleteValue = null
      this.$emit('handleSelect', this.type)
    },
  }
}
</script>

<style lang="scss" scoped>
.search-icon:before {
  content: "";
  background: url("../../assets/images/input-search-icon.png") no-repeat center
    top;
  background-size: auto 100%;
  background-origin: content-box;
  width: 20px;
  height: 24px;
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
}
</style>


