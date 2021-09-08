<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data() {
    return {};
  },

  render() {
    return (
      <ul>
        {this.data.map((item) => (
          <li>
            {this.$scopedSlots.default(item)} //
            this.$scopedSlots.default是一个函数，通过传入参数可以将参数传送给作用域对象
          </li>
        ))}
      </ul>
    );
  },
};
</script>
