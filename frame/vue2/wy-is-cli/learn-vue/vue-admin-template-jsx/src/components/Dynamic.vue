<script>
const Dynamic = {
  name: "dynamic",
  props: ["value", "onXXX"],
  methods: {
    onClick() {
      this.$emit("change");
    }
  },
  render() {
    return (
      <div style={{ marginTop: "10px" }}>
        <button onClick={this.onClick}>dynamic {this.value}</button>
        {this.onXXX}
      </div>
    );
  }
};
export default {
  name: "dynamic-container",
  data() {
    return {
      count: 0
    };
  },
  methods: {
    onChange1(val) {
      console.log(1);
    },
    onChange2() {
      console.log(2);
    },
    onChange3() {
      console.log(3);
    }
  },
  render() {
    const { onChange1, onChange2, onChange3 } = this;
    const dynamicProps1 = { props: {}, on: {} };
    if (true) dynamicProps1.props.value = "console 1";
    if (true) dynamicProps1.on.change = onChange1;
    const dynamicProps2 = { on: { change: onChange2 } };
    return (
      <div>
        <Dynamic {...dynamicProps1} />
        <Dynamic
          value="console 1 2 3"
          {...{ on: { change: onChange1 } }}
          {...dynamicProps2}
          onChange={onChange3}
        />
        <Dynamic value="获取到value，然而并不能获取到onXXX" onXXX="😶" />
        <Dynamic {...{ props: { onXXX: "获取到onXXX，但不建议使用" } }} />
      </div>
    );
  }
};
</script>
<style>

</style>
