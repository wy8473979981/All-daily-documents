<script>
const Functional = {
  name: "functional",
  functional: true,
  // props: ["value"],
  render (h, context) {
    return (
      <div style={{ marginTop: "10px" }}>{JSON.stringify(context.props)}</div>
    );
  }
};
export default {
  name: "functional-container",
  render () {
    const functionalProps = {
      props: { value: "来自props" },
      attrs: { value1: "来自attrs" }
    };
    return (
      <div>
        <Functional {...functionalProps} />
        <Functional value="归属于attrs" />
      </div>
    );
  }
};
</script>
<style>
</style>
