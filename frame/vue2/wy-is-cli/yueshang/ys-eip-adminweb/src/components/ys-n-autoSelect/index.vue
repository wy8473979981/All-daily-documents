<template>
  <!-- <el-select v-model="autocompleteValue" filterable remote reserve-keyword :placeholder="placeholder" :size="size" :remote-method="remoteMethod" :loading="loading" @change="handleSelect">
    <el-option v-for="item in resOption" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select> -->

  <el-select v-model="autocompleteValue" filterable :placeholder="placeholder" :size="size" @change="handleSelect">
    <el-option v-for="item in restaurants" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>

</template>

<script>
export default {
  model: {
    prop: "inputValue",
    event: "setValue"
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
      restaurants: [],
      resOption: [],
      list: [],
      loading: false,
      states: [],
    }
  },
  computed: {
    autocompleteValue: {
      get: function () {
        return this.inputValue
      },
      set: function (newVal) {
      }
    },
  },
  mounted () {
    this.getData()
  },
  methods: {
    // async remoteMethod (queryString) {
    //   try {

    //     if (queryString) {
    //       this.loading = true;
    //       setTimeout(() => {
    //         this.loading = false;
    //         this.resOption = this.restaurants.filter(item => {
    //           return item.label && item.label.toLowerCase()
    //             .indexOf(queryString.toLowerCase()) > -1;
    //         });
    //       }, 200);
    //     } else {
    //       this.resOption = this.restaurants
    //     }

    //   } catch (e) {
    //     console.log(e)
    //   }
    // },
    async getData (queryString = '') {
      try {
        let req = null
        let res = null
        let restaurants = []

        if (this.type == 'appId') {
          req = { appName: queryString }
          res = await this.serveApi(req)
          if (res.code == 200) {
            let { data } = res
            restaurants = data.map((item, index) => {
              return { 'value': item.id, 'label': item.appName }
            })
          }
        } else if (this.type == 'businessId' || this.type == 'businessName') {

          req = { appId: this.params['appId'], businessName: queryString }

          res = await this.serveApi(req)
          if (res.code == 200) {
            let { data } = res
            restaurants = data.map((item, index) => {
              return { 'value': item.id, 'label': item.businessName }
            })
          }
        } else if (this.type == 'reqBusinessId' || this.type == 'callBackBusinessId') {

          req = { businessType: this.params['businessType'], businessName: queryString }

          res = await this.serveApi(req)
          if (res.code == 200) {
            let { data } = res
            restaurants = data.map((item, index) => {

              return { 'value': item.id, 'label': item.businessName }

            })
          }
        }
        console.log(this.restaurants,'restaurants')
        this.restaurants = restaurants

      } catch (e) {
        console.log(e)
      }
    },
    handleSelect (value) {
      this.$emit("setValue", value);
      this.$emit('handleSelect')
    }
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
  top: 7px;
  left: 13px;
  z-index: 100;
}
</style>


