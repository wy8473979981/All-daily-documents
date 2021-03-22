const handlePaginator = {
  data () {
    return {
      pageInfo: {
        page: 1,
        page_size: 10
      }
    }
  },
  methods: {
    handlePaginator (data) {
      this.elePageInfo = data
    }
  }
}

export {
  handlePaginator
}
